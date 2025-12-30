import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Edit Modal State
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", username: "", userType: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  // 1️⃣ Fetch All Users
  const fetchUsers = async () => {
    try {
      const res = await api.get("/users/all");
      setUsers(res.data);
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  // 2️⃣ Delete User
  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await api.delete(`/users/${id}`);
        toast.success("User deleted");
        fetchUsers(); // Refresh list
      } catch (error) {
        toast.error(error.response?.data?.message || "Delete failed");
      }
    }
  };

  // 3️⃣ Reset Password (Prompt se)
  const handleResetPass = async (id) => {
    const newPass = window.prompt("Enter new password for this user:");
    if (!newPass) return;
    if (newPass.length < 6) return toast.error("Password must be 6+ chars");

    try {
      await api.put(`/users/reset-password/${id}`, { newPassword: newPass });
      toast.success("Password reset successfully");
    } catch (error) {
      toast.error("Failed to reset password");
    }
  };

  // 4️⃣ Open Edit Modal
  const handleEditClick = (user) => {
    setEditingUser(user);
    setEditForm({
      name: user.name,
      email: user.email,
      username: user.username,
      userType: user.userType
    });
  };

  // 5️⃣ Save Edited User
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/users/${editingUser._id}`, editForm);
      toast.success("User updated");
      setEditingUser(null); // Close modal
      fetchUsers(); // Refresh list
    } catch (error) {
      toast.error("Update failed");
    }
  };

  return (
    <div style={styles.container}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <div style={{display: "flex", alignItems: "center", gap: "15px"}}>
           <button onClick={() => navigate("/dashboard")} style={styles.backBtn}>⬅ Back</button>
           <h2 style={{margin: 0, fontSize: "20px", color: "#333"}}>User Management</h2>
        </div>
        <button onClick={() => navigate("/create-user")} style={styles.createBtn}>
          ➕ Create New User
        </button>
      </div>

      {/* TABLE */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Username</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Role</th>
              <th style={{...styles.th, textAlign: "right"}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" style={{padding: "20px", textAlign: "center"}}>Loading users...</td></tr>
            ) : users.map((u) => (
              <tr key={u._id} style={styles.row}>
                <td style={styles.td}><b>{u.name}</b></td>
                <td style={styles.td}>{u.username}</td>
                <td style={styles.td}>{u.email}</td>
                <td style={styles.td}>
                   <span style={{
                      ...styles.roleBadge,
                      background: u.userType === "admin" ? "#e3f2fd" : u.userType === "superuser" ? "#fff3e0" : "#f5f5f5",
                      color: u.userType === "admin" ? "#1976D2" : u.userType === "superuser" ? "#f57c00" : "#666"
                   }}>
                     {u.userType.toUpperCase()}
                   </span>
                </td>
                <td style={{...styles.td, textAlign: "right"}}>
                  <button onClick={() => handleEditClick(u)} style={styles.editBtn}>Edit</button>
                  <button onClick={() => handleResetPass(u._id)} style={styles.keyBtn} title="Reset Password">🔑</button>
                  <button onClick={() => handleDelete(u._id, u.name)} style={styles.delBtn}>🗑</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL (Simple Overlay) */}
      {editingUser && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3 style={{marginTop: 0}}>Edit User</h3>
            <form onSubmit={handleUpdateUser} style={{display: "flex", flexDirection: "column", gap: "10px"}}>
              <input 
                value={editForm.name} 
                onChange={(e) => setEditForm({...editForm, name: e.target.value})} 
                placeholder="Name" style={styles.input} required 
              />
              <input 
                value={editForm.username} 
                onChange={(e) => setEditForm({...editForm, username: e.target.value})} 
                placeholder="Username" style={styles.input} required 
              />
              <input 
                value={editForm.email} 
                onChange={(e) => setEditForm({...editForm, email: e.target.value})} 
                placeholder="Email" style={styles.input} required 
              />
              <select 
                value={editForm.userType} 
                onChange={(e) => setEditForm({...editForm, userType: e.target.value})} 
                style={styles.input}
              >
                <option value="user">User</option>
                <option value="superuser">Superuser</option>
                <option value="admin">Admin</option>
              </select>
              
              <div style={{display: "flex", gap: "10px", marginTop: "10px"}}>
                <button type="submit" style={styles.saveBtn}>Save Changes</button>
                <button type="button" onClick={() => setEditingUser(null)} style={styles.cancelBtn}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

// ✨ COMPACT & CLEAN STYLES
const styles = {
  container: { padding: "20px", maxWidth: "1000px", margin: "0 auto", fontFamily: "'Segoe UI', sans-serif" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
  
  backBtn: { background: "none", border: "1px solid #ddd", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" },
  createBtn: { background: "#2e7d32", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", fontWeight: "600", cursor: "pointer" },

  tableWrapper: { border: "1px solid #e0e0e0", borderRadius: "8px", overflow: "hidden", background: "#fff" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { padding: "10px 15px", background: "#f8f9fa", textAlign: "left", fontSize: "13px", color: "#555", borderBottom: "1px solid #ddd" },
  td: { padding: "10px 15px", borderBottom: "1px solid #eee", fontSize: "14px", color: "#333" },
  row: { background: "#fff" },

  roleBadge: { padding: "2px 8px", borderRadius: "12px", fontSize: "11px", fontWeight: "bold" },

  // Action Buttons
  editBtn: { marginRight: "5px", padding: "4px 8px", background: "#2196F3", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "12px" },
  keyBtn: { marginRight: "5px", padding: "4px 8px", background: "#FF9800", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "12px" },
  delBtn: { padding: "4px 8px", background: "#ef5350", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "12px" },

  // Modal
  modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center" },
  modalContent: { background: "#fff", padding: "25px", borderRadius: "8px", width: "300px", boxShadow: "0 4px 10px rgba(0,0,0,0.2)" },
  input: { padding: "8px", borderRadius: "4px", border: "1px solid #ccc", width: "100%", boxSizing: "border-box" },
  saveBtn: { flex: 1, background: "#1976D2", color: "#fff", border: "none", padding: "8px", borderRadius: "4px", cursor: "pointer" },
  cancelBtn: { flex: 1, background: "#ddd", color: "#333", border: "none", padding: "8px", borderRadius: "4px", cursor: "pointer" }
};
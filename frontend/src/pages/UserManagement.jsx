// import React, { useEffect, useState } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import Header from "../components/Header";

// export default function UserManagement() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // --- MODAL STATES ---
//   const [editingUser, setEditingUser] = useState(null); // Edit Form ke liye
//   const [deleteModal, setDeleteModal] = useState(null); // Delete Confirmation ke liye (User Object store karega)
//   const [freezeModal, setFreezeModal] = useState(null); // Freeze Confirmation ke liye (User Object store karega)

//   // Edit Form State
//   const [editForm, setEditForm] = useState({
//     name: "", email: "", username: "", userType: "", password: ""
//   });

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const res = await api.get("/users/all");
//       setUsers(res.data);
//     } catch (error) {
//       toast.error("Failed to load users");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- 1. FREEZE / UNFREEZE LOGIC ---

//   // Step A: Modal Kholo
//   const openFreezeModal = (user) => {
//     setFreezeModal(user);
//   };

//   // Step B: Confirm karne par API call
//   const confirmFreezeToggle = async () => {
//     if (!freezeModal) return;
//     try {
//       await api.put(`/users/toggle-freeze/${freezeModal._id}`);
//       toast.success(freezeModal.isFrozen ? "User Unfrozen Successfully" : "User Frozen Successfully");
//       fetchUsers();
//     } catch (error) {
//       toast.error("Action failed");
//     }
//     setFreezeModal(null); // Close Modal
//   };

//   // --- 2. DELETE LOGIC ---

//   // Step A: Modal Kholo
//   const openDeleteModal = (user) => {
//     setDeleteModal(user);
//   };

//   // Step B: Confirm delete
//   const confirmDelete = async () => {
//     if (!deleteModal) return;
//     try {
//       await api.delete(`/users/${deleteModal._id}`);
//       toast.success("User deleted");
//       fetchUsers();
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Delete failed");
//     }
//     setDeleteModal(null); // Close Modal
//   };

//   // --- 3. EDIT LOGIC (Existing) ---
//   const handleEditClick = (user) => {
//     setEditingUser(user);
//     setEditForm({
//       name: user.name,
//       email: user.email,
//       username: user.username,
//       userType: user.userType,
//       password: ""
//     });
//   };

//   const handleUpdateUser = async (e) => {
//     e.preventDefault();
//     try {
//       await api.put(`/users/${editingUser._id}`, {
//         name: editForm.name,
//         email: editForm.email,
//         username: editForm.username,
//         userType: editForm.userType
//       });

//       if (editForm.password && editForm.password.trim() !== "") {
//         if (editForm.password.length < 6) return toast.error("Password too short");
//         await api.put(`/users/reset-password/${editingUser._id}`, { newPassword: editForm.password });
//       }

//       toast.success("User updated");
//       setEditingUser(null);
//       fetchUsers();
//     } catch (error) {
//       toast.error("Update failed");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <Header />
//       <div style={styles.mainContent}>

//         {/* HEADER */}
//         <div style={styles.pageHeader}>
//           <div>
//             <h2 style={styles.pageTitle}>User Management</h2>
//             <p style={styles.pageSubtitle}>Manage access and freeze accounts</p>
//           </div>
//           <button onClick={() => navigate("/create-user")} style={styles.createBtn}>
//             ➕ Create New User
//           </button>
//         </div>

//         {/* TABLE */}
//         <div style={styles.tableCard}>
//           <table style={styles.table}>
//             <thead>
//               <tr>
//                 <th style={styles.th}>Name / Username</th>
//                 <th style={styles.th}>Role</th>
//                 <th style={styles.th}>Status</th>
//                 <th style={{ ...styles.th, textAlign: "right" }}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr><td colSpan="4" style={{ padding: "30px", textAlign: "center" }}>Loading...</td></tr>
//               ) : (
//                 users.map((u) => (
//                   <tr key={u._id} style={styles.row}>
//                     <td style={styles.td}>
//                       <div style={{ fontWeight: "600", color: "#333" }}>{u.name}</div>
//                       <div style={{ fontSize: "12px", color: "#666" }}>@{u.username}</div>
//                     </td>

//                     <td style={styles.td}>
//                       <span style={{
//                         ...styles.roleBadge,
//                         background: u.userType === "admin" ? "#e0f2fe" : "#f3f4f6",
//                         color: u.userType === "admin" ? "#0284c7" : "#4b5563"
//                       }}>{u.userType.toUpperCase()}</span>
//                     </td>

//                     {/* ✅ STATUS BADGE */}
//                     <td style={styles.td}>
//                       <span style={{
//                         ...styles.statusBadge,
//                         backgroundColor: u.isFrozen ? "#fee2e2" : "#dcfce7",
//                         color: u.isFrozen ? "#dc2626" : "#166534"
//                       }}>
//                         {u.isFrozen ? "❄️ Frozen" : "● Active"}
//                       </span>
//                     </td>

//                     <td style={{ ...styles.td, textAlign: "right" }}>
//                       {/* Toggle Freeze Button */}
//                       <button
//                         onClick={() => openFreezeModal(u)}
//                         style={u.isFrozen ? styles.unfreezeBtn : styles.freezeBtn}
//                         title={u.isFrozen ? "Unfreeze Account" : "Freeze Account"}
//                       >
//                         {u.isFrozen ? "Unfreeze" : " Freeze"}
//                       </button>

//                       <button onClick={() => handleEditClick(u)} style={styles.editBtn}> Edit</button>
//                       <button onClick={() => openDeleteModal(u)} style={styles.deleteBtn}>Delete</button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* --- MODAL 1: EDIT FORM --- */}
//       {editingUser && (
//         <div style={styles.modalOverlay}>
//           <div style={styles.modalContent}>
//             <h3 style={styles.modalTitle}>Edit User</h3>
//             <form onSubmit={handleUpdateUser} style={styles.formStack}>
//               <input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} style={styles.input} required placeholder="Name" />
//               <input value={editForm.username} onChange={(e) => setEditForm({ ...editForm, username: e.target.value })} style={styles.input} required placeholder="Username" />
//               <input value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} style={styles.input} required placeholder="Email" />
//               <select value={editForm.userType} onChange={(e) => setEditForm({ ...editForm, userType: e.target.value })} style={styles.input}>
//                 <option value="user">User</option>
//                 <option value="superuser">Superuser</option>
//                 <option value="admin">Admin</option>
//               </select>
//               <div style={styles.passwordBox}>
//                 <label style={{ fontSize: "11px", color: "#ef4444", fontWeight: "bold" }}>Reset Password (Optional)</label>
//                 <input type="text" placeholder="New Password" value={editForm.password} onChange={(e) => setEditForm({ ...editForm, password: e.target.value })} style={styles.input} />
//               </div>
//               <div style={styles.modalActions}>
//                 <button type="submit" style={styles.saveBtn}>Save</button>
//                 <button type="button" onClick={() => setEditingUser(null)} style={styles.cancelBtn}>Cancel</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* --- MODAL 2: DELETE CONFIRMATION --- */}
//       {deleteModal && (
//         <div style={styles.modalOverlay}>
//           <div style={{ ...styles.modalContent, width: '350px', textAlign: 'center' }}>
//             <div style={{ fontSize: '40px', marginBottom: '10px' }}>🗑️</div>
//             <h3 style={{ margin: '0 0 10px 0', color: '#dc2626' }}>Delete User?</h3>
//             <p style={{ fontSize: '14px', color: '#555' }}>Are you sure you want to delete <b>{deleteModal.name}</b>?</p>
//             <div style={styles.modalActions}>
//               <button onClick={confirmDelete} style={{ ...styles.saveBtn, background: '#dc2626' }}>Yes, Delete</button>
//               <button onClick={() => setDeleteModal(null)} style={styles.cancelBtn}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* --- MODAL 3: FREEZE/UNFREEZE CONFIRMATION --- */}
//       {freezeModal && (
//         <div style={styles.modalOverlay}>
//           <div style={{ ...styles.modalContent, width: '350px', textAlign: 'center' }}>
//             <div style={{ fontSize: '40px', marginBottom: '10px' }}>
//               {freezeModal.isFrozen ? "🔓" : "❄️"}
//             </div>
//             <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>
//               {freezeModal.isFrozen ? "Unfreeze Account?" : "Freeze Account?"}
//             </h3>
//             <p style={{ fontSize: '14px', color: '#555' }}>
//               {freezeModal.isFrozen
//                 ? `Allow ${freezeModal.name} to login again?`
//                 : `Block ${freezeModal.name} from logging in?`
//               }
//             </p>
//             <div style={styles.modalActions}>
//               <button onClick={confirmFreezeToggle} style={styles.saveBtn}>
//                 {freezeModal.isFrozen ? "Yes, Unfreeze" : "Yes, Freeze"}
//               </button>
//               <button onClick={() => setFreezeModal(null)} style={styles.cancelBtn}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }

// // ✨ STYLES
// const styles = {
//   container: { minHeight: "100vh", backgroundColor: "#f3f4f6", fontFamily: "'Segoe UI', sans-serif", display: "flex", flexDirection: "column" },
//   mainContent: { padding: "30px 20px", maxWidth: "1000px", margin: "0 auto", width: "100%", boxSizing: "border-box" },
//   pageHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" },
//   pageTitle: { margin: "0", fontSize: "24px", color: "#1e293b", fontWeight: "700" },
//   pageSubtitle: { margin: "5px 0 0 0", color: "#64748b", fontSize: "14px" },
//   createBtn: { backgroundColor: "#16a34a", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "8px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" },
//   tableCard: { backgroundColor: "#ffffff", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)", overflow: "hidden", border: "1px solid #e2e8f0" },
//   table: { width: "100%", borderCollapse: "collapse" },
//   th: { padding: "15px 20px", backgroundColor: "#f8fafc", textAlign: "left", fontSize: "13px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", borderBottom: "1px solid #e2e8f0" },
//   td: { padding: "15px 20px", borderBottom: "1px solid #f1f5f9", fontSize: "14px", color: "#334155", verticalAlign: "middle" },
//   row: { transition: "background-color 0.1s" },

//   // Badges
//   roleBadge: { padding: "4px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "700", display: "inline-block" },
//   statusBadge: { padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "600", display: "inline-block" },

//   // Buttons in Row
//   unfreezeBtn: { background: "#fff", border: "1px solid #22c55e", color: "#16a34a", padding: "5px 10px", borderRadius: "6px", fontSize: "12px", cursor: "pointer", fontWeight: "600", marginRight: "8px" },
//   freezeBtn: { background: "#fff", border: "1px solid #cbd5e1", color: "#64748b", padding: "5px 10px", borderRadius: "6px", fontSize: "12px", cursor: "pointer", fontWeight: "600", marginRight: "8px" },
//   editBtn: { background: "#eff6ff", color: "#2563eb", border: "none", padding: "6px 10px", borderRadius: "6px", fontSize: "14px", cursor: "pointer", marginRight: "8px" },
//   deleteBtn: { background: "#fef2f2", color: "#dc2626", border: "none", padding: "6px 10px", borderRadius: "6px", fontSize: "14px", cursor: "pointer" },

//   // Modal Styles
//   modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(15, 23, 42, 0.6)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 },
//   modalContent: { background: "#fff", padding: "30px", borderRadius: "12px", width: "400px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" },
//   modalTitle: { marginTop: 0, marginBottom: "20px", color: "#1e293b" },
//   formStack: { display: "flex", flexDirection: "column", gap: "15px" },
//   input: { width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "14px", boxSizing: "border-box", outline: "none" },
//   passwordBox: { background: "#f8fafc", padding: "10px", borderRadius: "8px", border: "1px dashed #cbd5e1" },
//   modalActions: { display: "flex", gap: "10px", marginTop: "10px" },
//   saveBtn: { flex: 1, backgroundColor: "#2563eb", color: "#fff", border: "none", padding: "10px", borderRadius: "6px", cursor: "pointer", fontWeight: "600" },
//   cancelBtn: { flex: 1, backgroundColor: "#f1f5f9", color: "#475569", border: "1px solid #cbd5e1", padding: "10px", borderRadius: "6px", cursor: "pointer", fontWeight: "600" },
// };





// import React, { useEffect, useState } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import Header from "../components/Header";

// export default function UserManagement() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate();

//   // --- MODAL STATES ---
//   const [editingUser, setEditingUser] = useState(null);
//   const [deleteModal, setDeleteModal] = useState(null);
//   const [freezeModal, setFreezeModal] = useState(null);
//   const [historyModal, setHistoryModal] = useState(null);
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");


//   // History & Form States
//   const [userLogs, setUserLogs] = useState([]);
//   const [logsLoading, setLogsLoading] = useState(false);
//   const [editForm, setEditForm] = useState({
//     name: "", email: "", username: "", userType: "", password: ""
//   });

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const res = await api.get("/users/all");
//       setUsers(res.data);
//     } catch (error) {
//       toast.error("Failed to load users");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- HISTORY LOGIC ---
//   // --- UPDATED HISTORY LOGIC ---
//   const openHistoryModal = async (user, sDate = "", eDate = "") => {
//     setHistoryModal(user);
//     setLogsLoading(true);
//     try {
//       // URL mein dates bhej rahe hain
//       const res = await api.get(`/logs/user/${user._id}?startDate=${sDate}&endDate=${eDate}`);
//       setUserLogs(res.data);
//     } catch (error) {
//       toast.error("Failed to load user history");
//     } finally {
//       setLogsLoading(false);
//     }
//   };

//   // Modal ke andar button ke liye function
//   const handleFilterHistory = () => {
//     openHistoryModal(historyModal, startDate, endDate);
//   };
//   // const openHistoryModal = async (user) => {
//   //   setHistoryModal(user);
//   //   setLogsLoading(true);
//   //   try {
//   //     const res = await api.get(`/logs/user/${user._id}`);
//   //     setUserLogs(res.data);
//   //   } catch (error) {
//   //     toast.error("Failed to load user history");
//   //   } finally {
//   //     setLogsLoading(false);
//   //   }
//   // };

//   // --- FREEZE / UNFREEZE LOGIC ---
//   const confirmFreezeToggle = async () => {
//     if (!freezeModal) return;
//     try {
//       await api.put(`/users/toggle-freeze/${freezeModal._id}`);
//       toast.success(freezeModal.isFrozen ? "User Unfrozen Successfully" : "User Frozen Successfully");
//       fetchUsers();
//     } catch (error) {
//       toast.error("Freeze action failed");
//     } finally {
//       setFreezeModal(null);
//     }
//   };

//   // --- DELETE LOGIC ---
//   const confirmDelete = async () => {
//     if (!deleteModal) return;
//     try {
//       await api.delete(`/users/${deleteModal._id}`);
//       toast.success("User deleted");
//       fetchUsers();
//     } catch (error) {
//       toast.error("Delete failed");
//     } finally {
//       setDeleteModal(null);
//     }
//   };

//   // --- EDIT LOGIC ---
//   const handleUpdateUser = async (e) => {
//     e.preventDefault();
//     try {
//       await api.put(`/users/${editingUser._id}`, {
//         name: editForm.name,
//         email: editForm.email,
//         username: editForm.username,
//         userType: editForm.userType
//       });

//       if (editForm.password && editForm.password.trim() !== "") {
//         await api.put(`/users/reset-password/${editingUser._id}`, { newPassword: editForm.password });
//       }

//       toast.success("User updated");
//       setEditingUser(null);
//       fetchUsers();
//     } catch (error) {
//       toast.error("Update failed");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <Header />
//       <div style={styles.mainContent}>
//         <div style={styles.pageHeader}>
//           <div>
//             <h2 style={styles.pageTitle}>User Management</h2>
//             <p style={styles.pageSubtitle}>Monitor activity and manage access</p>
//           </div>
//           <button onClick={() => navigate("/create-user")} style={styles.createBtn}>➕ New User</button>
//         </div>

//         <div style={styles.tableCard}>
//           <table style={styles.table}>
//             <thead>
//               <tr>
//                 <th style={styles.th}>Name / Username</th>
//                 <th style={styles.th}>Role</th>
//                 <th style={styles.th}>Status</th>
//                 <th style={{ ...styles.th, textAlign: "right" }}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr><td colSpan="4" style={{ padding: "30px", textAlign: "center" }}>Loading...</td></tr>
//               ) : (
//                 users.map((u) => (
//                   <tr key={u._id} style={styles.row}>
//                     <td style={styles.td}>
//                       <div style={{ fontWeight: "600" }}>{u.name}</div>
//                       <div style={{ fontSize: "12px", color: "#64748b" }}>@{u.username}</div>
//                     </td>
//                     <td style={styles.td}>
//                       <span style={{ ...styles.roleBadge, background: u.userType === "admin" ? "#e0f2fe" : "#f1f5f9", color: u.userType === "admin" ? "#0284c7" : "#475569" }}>
//                         {u.userType.toUpperCase()}
//                       </span>
//                     </td>
//                     <td style={styles.td}>
//                       <span style={{ ...styles.statusBadge, backgroundColor: u.isFrozen ? "#fee2e2" : "#dcfce7", color: u.isFrozen ? "#dc2626" : "#166534" }}>
//                         {u.isFrozen ? "❄️ Frozen" : "● Active"}
//                       </span>
//                     </td>
//                     <td style={{ ...styles.td, textAlign: "right" }}>
//                       <button onClick={() => openHistoryModal(u)} style={styles.historyBtn}>📜 History</button>
//                       <button
//                         onClick={() => setFreezeModal(u)}
//                         style={u.isFrozen ? styles.unfreezeBtn : styles.freezeBtn}
//                       >
//                         {u.isFrozen ? "Unfreeze" : "Freeze"}
//                       </button>
//                       <button onClick={() => { setEditingUser(u); setEditForm({ ...u, password: "" }); }} style={styles.editBtn}>Edit</button>
//                       <button onClick={() => setDeleteModal(u)} style={styles.deleteBtn}>Delete</button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* --- MODAL 1: HISTORY --- */}
//       {/* {historyModal && (
//         <div style={styles.modalOverlay}>
//           <div style={{ ...styles.modalContent, width: '700px' }}>
//             <h3 style={styles.modalTitle}>Activity Log: {historyModal.name}</h3>
//             <div style={styles.logsList}>
//               {logsLoading ? <p>Loading...</p> : userLogs.length === 0 ? <p>No logs found.</p> : (
//                 <table style={{width:'100%', fontSize:'13px', borderCollapse: 'collapse'}}>
//                   <thead>
//                     <tr style={{background:'#f8fafc'}}><th style={styles.thMini}>Time</th><th style={styles.thMini}>Action</th><th style={styles.thMini}>Details</th></tr>
//                   </thead>
//                   <tbody>
//                     {userLogs.map(l => (
//                       <tr key={l._id} style={{borderBottom:'1px solid #f1f5f9'}}><td style={styles.tdMini}>{new Date(l.timestamp).toLocaleString()}</td><td style={styles.tdMini}><b>{l.action}</b></td><td style={styles.tdMini}>{l.details}</td></tr>
//                     ))}
//                   </tbody>
//                 </table>
//               )}
//             </div>
//             <button onClick={() => setHistoryModal(null)} style={styles.cancelBtn}>Close</button>
//           </div>
//         </div>
//       )} */}
//       {/* --- MODAL: INDIVIDUAL HISTORY --- */}
//       {/* --- MODAL: INDIVIDUAL HISTORY --- */}
//       {historyModal && (
//         <div style={styles.modalOverlay}>
//           <div style={{ ...styles.modalContent, width: '750px' }}>
//             <h3 style={styles.modalTitle}>Activity Log: {historyModal.name}</h3>

//             {/* 📅 DATE FILTER SECTION */}
//             <div style={styles.modalFilterBar}>
//               <div style={{ display: 'flex', flex: 1, gap: '10px' }}>
//                 <input
//                   type="date"
//                   value={startDate}
//                   onChange={(e) => setStartDate(e.target.value)}
//                   style={styles.modalDateInput}
//                 />
//                 <input
//                   type="date"
//                   value={endDate}
//                   onChange={(e) => setEndDate(e.target.value)}
//                   style={styles.modalDateInput}
//                 />
//               </div>
//               <div style={{ display: 'flex', gap: '5px' }}>
//                 <button onClick={handleFilterHistory} style={styles.applyBtn}>🔍 Filter</button>
//                 <button 
//                   onClick={() => { setStartDate(""); setEndDate(""); openHistoryModal(historyModal, "", ""); }} 
//                   style={styles.resetBtnSmall}
//                 >
//                   🔄 Reset
//                 </button>
//               </div>
//             </div>

//             <div style={styles.logsList}>
//               {logsLoading ? (
//                 <p style={{ textAlign: 'center', padding: '20px' }}>Loading logs...</p>
//               ) : userLogs.length === 0 ? (
//                 <p style={{ textAlign: 'center', padding: '20px' }}>No logs found for this period.</p>
//               ) : (
//                 /* 👇 Table code jo tune galti se uda diya tha */
//                 <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse' }}>
//                   <thead>
//                     <tr style={{ background: '#f8fafc' }}>
//                       <th style={styles.thMini}>Time</th>
//                       <th style={styles.thMini}>Action</th>
//                       <th style={styles.thMini}>Details</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {userLogs.map((l) => (
//                       <tr key={l._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
//                         <td style={styles.tdMini}>{new Date(l.timestamp).toLocaleString()}</td>
//                         <td style={styles.tdMini}><b style={{ color: '#2563eb' }}>{l.action}</b></td>
//                         <td style={styles.tdMini}>{l.details}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               )}
//             </div>
            
//             <div style={{ marginTop: '15px' }}>
//               <button 
//                 onClick={() => { setHistoryModal(null); setStartDate(""); setEndDate(""); }} 
//                 style={{ ...styles.cancelBtn, width: '100%' }}
//               >
//                 Close Window
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* --- MODAL 2: FREEZE CONFIRMATION (Ye missing tha!) --- */}
//       {freezeModal && (
//         <div style={styles.modalOverlay}>
//           <div style={{ ...styles.modalContent, width: '350px', textAlign: 'center' }}>
//             <div style={{ fontSize: '40px', marginBottom: '10px' }}>{freezeModal.isFrozen ? "🔓" : "❄️"}</div>
//             <h3>{freezeModal.isFrozen ? "Unfreeze Account?" : "Freeze Account?"}</h3>
//             <p style={{ fontSize: '14px', color: '#555' }}>
//               Are you sure you want to {freezeModal.isFrozen ? "unfreeze" : "freeze"} <b>{freezeModal.name}</b>?
//             </p>
//             <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
//               <button onClick={confirmFreezeToggle} style={styles.saveBtn}>Yes, Confirm</button>
//               <button onClick={() => setFreezeModal(null)} style={styles.cancelBtn}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* --- MODAL 3: DELETE CONFIRMATION --- */}
//       {deleteModal && (
//         <div style={styles.modalOverlay}>
//           <div style={{ ...styles.modalContent, width: '350px', textAlign: 'center' }}>
//             <div style={{ fontSize: '40px', marginBottom: '10px' }}>🗑️</div>
//             <h3 style={{ color: '#dc2626' }}>Delete User?</h3>
//             <p style={{ fontSize: '14px', color: '#555' }}>Are you sure you want to delete <b>{deleteModal.name}</b>?</p>
//             <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
//               <button onClick={confirmDelete} style={{ ...styles.saveBtn, background: '#dc2626' }}>Yes, Delete</button>
//               <button onClick={() => setDeleteModal(null)} style={styles.cancelBtn}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* --- MODAL 4: EDIT FORM --- */}
//       {editingUser && (
//         <div style={styles.modalOverlay}>
//           <div style={styles.modalContent}>
//             <h3 style={styles.modalTitle}>Edit User</h3>
//             <form onSubmit={handleUpdateUser} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
//               <input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} style={styles.input} required placeholder="Name" />
//               <input value={editForm.username} onChange={(e) => setEditForm({ ...editForm, username: e.target.value })} style={styles.input} required placeholder="Username" />
//               <input value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} style={styles.input} required placeholder="Email" />
//               <select value={editForm.userType} onChange={(e) => setEditForm({ ...editForm, userType: e.target.value })} style={styles.input}>
//                 <option value="user">User</option>
//                 <option value="superuser">Superuser</option>
//                 <option value="admin">Admin</option>
//               </select>
//               <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
//                 <label style={{ fontSize: "11px", color: "#ef4444", fontWeight: "bold" }}>Reset Password (Optional)</label>
//                 <input type="text" placeholder="New Password" value={editForm.password} onChange={(e) => setEditForm({ ...editForm, password: e.target.value })} style={styles.input} />
//               </div>
//               <div style={{ display: 'flex', gap: '10px' }}>
//                 <button type="submit" style={styles.saveBtn}>Save</button>
//                 <button type="button" onClick={() => setEditingUser(null)} style={styles.cancelBtn}>Cancel</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// const styles = {
//   container: { minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "'Inter', sans-serif" },
//   mainContent: { padding: "20px", maxWidth: "1100px", margin: "0 auto" },
//   pageHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
//   pageTitle: { fontSize: "22px", fontWeight: "800", color: "#0f172a", margin: 0 },
//   pageSubtitle: { fontSize: "14px", color: "#64748b", margin: 0 },
//   createBtn: { background: "#16a34a", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontWeight: "600" },
//   tableCard: { background: "#fff", borderRadius: "10px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", overflow: "hidden", border: "1px solid #e2e8f0" },
//   table: { width: "100%", borderCollapse: "collapse" },
//   th: { padding: "12px 15px", background: "#f8fafc", textAlign: "left", fontSize: "11px", color: "#64748b", textTransform: "uppercase", borderBottom: "1px solid #e2e8f0" },
//   td: { padding: "12px 15px", borderBottom: "1px solid #f1f5f9", fontSize: "14px" },
//   roleBadge: { padding: "3px 8px", borderRadius: "12px", fontSize: "10px", fontWeight: "700" },
//   statusBadge: { padding: "3px 8px", borderRadius: "12px", fontSize: "11px", fontWeight: "600" },
//   historyBtn: { background: "#fff", border: "1px solid #cbd5e1", padding: "5px 10px", borderRadius: "6px", fontSize: "12px", cursor: "pointer", marginRight: "5px" },
//   freezeBtn: { background: "#fff", color: "#64748b", border: "1px solid #cbd5e1", padding: "5px 10px", borderRadius: "6px", cursor: "pointer", fontSize: "12px", marginRight: "5px" },
//   unfreezeBtn: { background: "#fff", color: "#16a34a", border: "1px solid #16a34a", padding: "5px 10px", borderRadius: "6px", cursor: "pointer", fontSize: "12px", marginRight: "5px" },
//   editBtn: { background: "#e0f2fe", color: "#0369a1", border: "none", padding: "5px 10px", borderRadius: "6px", cursor: "pointer", fontSize: "12px", marginRight: "5px" },
//   deleteBtn: { background: "#fee2e2", color: "#b91c1c", border: "none", padding: "5px 10px", borderRadius: "6px", cursor: "pointer", fontSize: "12px" },
//   modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 },
//   modalContent: { background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)" },
//   logsList: { maxHeight: "300px", overflowY: "auto", margin: "15px 0", border: "1px solid #f1f5f9" },
//   thMini: { textAlign: "left", padding: "8px", color: "#64748b" },
//   tdMini: { padding: "8px" },
//   input: { width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "14px", boxSizing: "border-box" },
//   saveBtn: { flex: 1, backgroundColor: "#2563eb", color: "#fff", border: "none", padding: "10px", borderRadius: "6px", cursor: "pointer", fontWeight: "600" },
//   cancelBtn: { flex: 1, backgroundColor: "#f1f5f9", color: "#475569", border: "1px solid #cbd5e1", padding: "10px", borderRadius: "6px", cursor: "pointer", fontWeight: "600" },
//   modalFilterBar: { display: 'flex', gap: '10px', marginBottom: '15px', background: '#f8fafc', padding: '10px', borderRadius: '8px' },
//   modalDateInput: { padding: '5px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '12px' },
//   applyBtn: { background: '#2563eb', color: '#fff', border: 'none', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' },
//   resetBtnSmall: { background: '#fff', color: '#64748b', border: '1px solid #cbd5e1', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' },
// };




















// import React, { useEffect, useState } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import Header from "../components/Header";

// export default function UserManagement() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate();

//   // --- MODAL STATES ---
//   const [editingUser, setEditingUser] = useState(null);
//   const [deleteModal, setDeleteModal] = useState(null);
//   const [freezeModal, setFreezeModal] = useState(null);
//   const [historyModal, setHistoryModal] = useState(null);
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   // History & Form States
//   const [userLogs, setUserLogs] = useState([]);
//   const [logsLoading, setLogsLoading] = useState(false);
  
//   // --- 📄 PAGINATION STATES (NEW) ---
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10; // Har page par 5 logs dikhenge

//   const [editForm, setEditForm] = useState({
//     name: "", email: "", username: "", userType: "", password: ""
//   });

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const res = await api.get("/users/all");
//       setUsers(res.data);
//     } catch (error) {
//       toast.error("Failed to load users");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- HISTORY LOGIC ---
//   const openHistoryModal = async (user, sDate = "", eDate = "") => {
//     setHistoryModal(user);
//     setLogsLoading(true);
//     setCurrentPage(1); // Jab bhi modal khule, page 1 se start karein
//     try {
//       const res = await api.get(`/logs/user/${user._id}?startDate=${sDate}&endDate=${eDate}`);
//       setUserLogs(res.data);
//     } catch (error) {
//       toast.error("Failed to load user history");
//     } finally {
//       setLogsLoading(false);
//     }
//   };

//   // Modal ke andar button ke liye function
//   const handleFilterHistory = () => {
//     openHistoryModal(historyModal, startDate, endDate);
//   };

//   // --- 📄 PAGINATION LOGIC (CALCULATION) ---
//   const indexOfLastLog = currentPage * itemsPerPage;
//   const indexOfFirstLog = indexOfLastLog - itemsPerPage;
//   const currentLogs = userLogs.slice(indexOfFirstLog, indexOfLastLog);
//   const totalPages = Math.ceil(userLogs.length / itemsPerPage);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   // --- FREEZE / UNFREEZE LOGIC ---
//   const confirmFreezeToggle = async () => {
//     if (!freezeModal) return;
//     try {
//       await api.put(`/users/toggle-freeze/${freezeModal._id}`);
//       toast.success(freezeModal.isFrozen ? "User Unfrozen Successfully" : "User Frozen Successfully");
//       fetchUsers();
//     } catch (error) {
//       toast.error("Freeze action failed");
//     } finally {
//       setFreezeModal(null);
//     }
//   };

//   // --- DELETE LOGIC ---
//   const confirmDelete = async () => {
//     if (!deleteModal) return;
//     try {
//       await api.delete(`/users/${deleteModal._id}`);
//       toast.success("User deleted");
//       fetchUsers();
//     } catch (error) {
//       toast.error("Delete failed");
//     } finally {
//       setDeleteModal(null);
//     }
//   };

//   // --- EDIT LOGIC ---
//   const handleUpdateUser = async (e) => {
//     e.preventDefault();
//     try {
//       await api.put(`/users/${editingUser._id}`, {
//         name: editForm.name,
//         email: editForm.email,
//         username: editForm.username,
//         userType: editForm.userType
//       });

//       if (editForm.password && editForm.password.trim() !== "") {
//         await api.put(`/users/reset-password/${editingUser._id}`, { newPassword: editForm.password });
//       }

//       toast.success("User updated");
//       setEditingUser(null);
//       fetchUsers();
//     } catch (error) {
//       toast.error("Update failed");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <Header />
//       <div style={styles.mainContent}>
//         <div style={styles.pageHeader}>
//           <div>
//             <h2 style={styles.pageTitle}>User Management</h2>
//             <p style={styles.pageSubtitle}>Monitor activity and manage access</p>
//           </div>
//           <button onClick={() => navigate("/create-user")} style={styles.createBtn}>➕ New User</button>
//         </div>

//         <div style={styles.tableCard}>
//           <table style={styles.table}>
//             <thead>
//               <tr>
//                 <th style={styles.th}>Name / Username</th>
//                 <th style={styles.th}>Role</th>
//                 <th style={styles.th}>Status</th>
//                 <th style={{ ...styles.th, textAlign: "right" }}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr><td colSpan="4" style={{ padding: "30px", textAlign: "center" }}>Loading...</td></tr>
//               ) : (
//                 users.map((u) => (
//                   <tr key={u._id} style={styles.row}>
//                     <td style={styles.td}>
//                       <div style={{ fontWeight: "600" }}>{u.name}</div>
//                       <div style={{ fontSize: "12px", color: "#64748b" }}>@{u.username}</div>
//                     </td>
//                     <td style={styles.td}>
//                       <span style={{ ...styles.roleBadge, background: u.userType === "admin" ? "#e0f2fe" : "#f1f5f9", color: u.userType === "admin" ? "#0284c7" : "#475569" }}>
//                         {u.userType.toUpperCase()}
//                       </span>
//                     </td>
//                     <td style={styles.td}>
//                       <span style={{ ...styles.statusBadge, backgroundColor: u.isFrozen ? "#fee2e2" : "#dcfce7", color: u.isFrozen ? "#dc2626" : "#166534" }}>
//                         {u.isFrozen ? "❄️ Frozen" : "● Active"}
//                       </span>
//                     </td>
//                     <td style={{ ...styles.td, textAlign: "right" }}>
//                       <button onClick={() => openHistoryModal(u)} style={styles.historyBtn}>📜 History</button>
//                       <button
//                         onClick={() => setFreezeModal(u)}
//                         style={u.isFrozen ? styles.unfreezeBtn : styles.freezeBtn}
//                       >
//                         {u.isFrozen ? "Unfreeze" : "Freeze"}
//                       </button>
//                       <button onClick={() => { setEditingUser(u); setEditForm({ ...u, password: "" }); }} style={styles.editBtn}>Edit</button>
//                       <button onClick={() => setDeleteModal(u)} style={styles.deleteBtn}>Delete</button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* --- MODAL: INDIVIDUAL HISTORY --- */}
//       {historyModal && (
//         <div style={styles.modalOverlay}>
//           <div style={{ ...styles.modalContent, width: '750px' }}>
//             <h3 style={styles.modalTitle}>Activity Log: {historyModal.name}</h3>

//             {/* 📅 DATE FILTER SECTION */}
//             <div style={styles.modalFilterBar}>
//               <div style={{ display: 'flex', flex: 1, gap: '10px' }}>
//                 <input
//                   type="date"
//                   value={startDate}
//                   onChange={(e) => setStartDate(e.target.value)}
//                   style={styles.modalDateInput}
//                 />
//                 <input
//                   type="date"
//                   value={endDate}
//                   onChange={(e) => setEndDate(e.target.value)}
//                   style={styles.modalDateInput}
//                 />
//               </div>
//               <div style={{ display: 'flex', gap: '5px' }}>
//                 <button onClick={handleFilterHistory} style={styles.applyBtn}>🔍 Filter</button>
//                 <button 
//                   onClick={() => { setStartDate(""); setEndDate(""); openHistoryModal(historyModal, "", ""); }} 
//                   style={styles.resetBtnSmall}
//                 >
//                   🔄 Reset
//                 </button>
//               </div>
//             </div>

//             <div style={styles.logsList}>
//               {logsLoading ? (
//                 <p style={{ textAlign: 'center', padding: '20px' }}>Loading logs...</p>
//               ) : userLogs.length === 0 ? (
//                 <p style={{ textAlign: 'center', padding: '20px' }}>No logs found for this period.</p>
//               ) : (
//                 <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse' }}>
//                   <thead>
//                     <tr style={{ background: '#f8fafc' }}>
//                       <th style={styles.thMini}>Time</th>
//                       <th style={styles.thMini}>Action</th>
//                       <th style={styles.thMini}>Details</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {/* 👇 Updated to use currentLogs (sliced data) */}
//                     {currentLogs.map((l) => (
//                       <tr key={l._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
//                         <td style={styles.tdMini}>{new Date(l.timestamp).toLocaleString()}</td>
//                         <td style={styles.tdMini}><b style={{ color: '#2563eb' }}>{l.action}</b></td>
//                         <td style={styles.tdMini}>{l.details}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               )}
//             </div>

//             {/* 👇 PAGINATION CONTROLS */}
//             {!logsLoading && userLogs.length > itemsPerPage && (
//                 <div style={styles.paginationWrapper}>
//                     <button 
//                         onClick={() => paginate(currentPage - 1)} 
//                         disabled={currentPage === 1}
//                         style={currentPage === 1 ? styles.disabledBtn : styles.pageBtn}
//                     >
//                         Previous
//                     </button>

//                     <span style={styles.pageInfo}>
//                         Page {currentPage} of {totalPages}
//                     </span>

//                     <button 
//                         onClick={() => paginate(currentPage + 1)} 
//                         disabled={currentPage === totalPages}
//                         style={currentPage === totalPages ? styles.disabledBtn : styles.pageBtn}
//                     >
//                         Next
//                     </button>
//                 </div>
//             )}
            
//             <div style={{ marginTop: '15px' }}>
//               <button 
//                 onClick={() => { setHistoryModal(null); setStartDate(""); setEndDate(""); }} 
//                 style={{ ...styles.cancelBtn, width: '100%' }}
//               >
//                 Close Window
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* --- MODAL 2: FREEZE CONFIRMATION --- */}
//       {freezeModal && (
//         <div style={styles.modalOverlay}>
//           <div style={{ ...styles.modalContent, width: '350px', textAlign: 'center' }}>
//             <div style={{ fontSize: '40px', marginBottom: '10px' }}>{freezeModal.isFrozen ? "🔓" : "❄️"}</div>
//             <h3>{freezeModal.isFrozen ? "Unfreeze Account?" : "Freeze Account?"}</h3>
//             <p style={{ fontSize: '14px', color: '#555' }}>
//               Are you sure you want to {freezeModal.isFrozen ? "unfreeze" : "freeze"} <b>{freezeModal.name}</b>?
//             </p>
//             <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
//               <button onClick={confirmFreezeToggle} style={styles.saveBtn}>Yes, Confirm</button>
//               <button onClick={() => setFreezeModal(null)} style={styles.cancelBtn}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* --- MODAL 3: DELETE CONFIRMATION --- */}
//       {deleteModal && (
//         <div style={styles.modalOverlay}>
//           <div style={{ ...styles.modalContent, width: '350px', textAlign: 'center' }}>
//             <div style={{ fontSize: '40px', marginBottom: '10px' }}>🗑️</div>
//             <h3 style={{ color: '#dc2626' }}>Delete User?</h3>
//             <p style={{ fontSize: '14px', color: '#555' }}>Are you sure you want to delete <b>{deleteModal.name}</b>?</p>
//             <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
//               <button onClick={confirmDelete} style={{ ...styles.saveBtn, background: '#dc2626' }}>Yes, Delete</button>
//               <button onClick={() => setDeleteModal(null)} style={styles.cancelBtn}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* --- MODAL 4: EDIT FORM --- */}
//       {editingUser && (
//         <div style={styles.modalOverlay}>
//           <div style={styles.modalContent}>
//             <h3 style={styles.modalTitle}>Edit User</h3>
//             <form onSubmit={handleUpdateUser} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
//               <input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} style={styles.input} required placeholder="Name" />
//               <input value={editForm.username} onChange={(e) => setEditForm({ ...editForm, username: e.target.value })} style={styles.input} required placeholder="Username" />
//               <input value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} style={styles.input} required placeholder="Email" />
//               <select value={editForm.userType} onChange={(e) => setEditForm({ ...editForm, userType: e.target.value })} style={styles.input}>
//                 <option value="user">User</option>
//                 <option value="superuser">Superuser</option>
//                 <option value="admin">Admin</option>
//               </select>
//               <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
//                 <label style={{ fontSize: "11px", color: "#ef4444", fontWeight: "bold" }}>Reset Password (Optional)</label>
//                 <input type="text" placeholder="New Password" value={editForm.password} onChange={(e) => setEditForm({ ...editForm, password: e.target.value })} style={styles.input} />
//               </div>
//               <div style={{ display: 'flex', gap: '10px' }}>
//                 <button type="submit" style={styles.saveBtn}>Save</button>
//                 <button type="button" onClick={() => setEditingUser(null)} style={styles.cancelBtn}>Cancel</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// const styles = {
//   container: { minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "'Inter', sans-serif" },
//   mainContent: { padding: "20px", maxWidth: "1100px", margin: "0 auto" },
//   pageHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
//   pageTitle: { fontSize: "22px", fontWeight: "800", color: "#0f172a", margin: 0 },
//   pageSubtitle: { fontSize: "14px", color: "#64748b", margin: 0 },
//   createBtn: { background: "#16a34a", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontWeight: "600" },
//   tableCard: { background: "#fff", borderRadius: "10px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", overflow: "hidden", border: "1px solid #e2e8f0" },
//   table: { width: "100%", borderCollapse: "collapse" },
//   th: { padding: "12px 15px", background: "#f8fafc", textAlign: "left", fontSize: "11px", color: "#64748b", textTransform: "uppercase", borderBottom: "1px solid #e2e8f0" },
//   td: { padding: "12px 15px", borderBottom: "1px solid #f1f5f9", fontSize: "14px" },
//   roleBadge: { padding: "3px 8px", borderRadius: "12px", fontSize: "10px", fontWeight: "700" },
//   statusBadge: { padding: "3px 8px", borderRadius: "12px", fontSize: "11px", fontWeight: "600" },
//   historyBtn: { background: "#fff", border: "1px solid #cbd5e1", padding: "5px 10px", borderRadius: "6px", fontSize: "12px", cursor: "pointer", marginRight: "5px" },
//   freezeBtn: { background: "#fff", color: "#64748b", border: "1px solid #cbd5e1", padding: "5px 10px", borderRadius: "6px", cursor: "pointer", fontSize: "12px", marginRight: "5px" },
//   unfreezeBtn: { background: "#fff", color: "#16a34a", border: "1px solid #16a34a", padding: "5px 10px", borderRadius: "6px", cursor: "pointer", fontSize: "12px", marginRight: "5px" },
//   editBtn: { background: "#e0f2fe", color: "#0369a1", border: "none", padding: "5px 10px", borderRadius: "6px", cursor: "pointer", fontSize: "12px", marginRight: "5px" },
//   deleteBtn: { background: "#fee2e2", color: "#b91c1c", border: "none", padding: "5px 10px", borderRadius: "6px", cursor: "pointer", fontSize: "12px" },
//   modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 },
//   modalContent: { background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)" },
//   logsList: { maxHeight: "300px", overflowY: "auto", margin: "15px 0", border: "1px solid #f1f5f9" },
//   thMini: { textAlign: "left", padding: "8px", color: "#64748b" },
//   tdMini: { padding: "8px" },
//   input: { width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "14px", boxSizing: "border-box" },
//   saveBtn: { flex: 1, backgroundColor: "#2563eb", color: "#fff", border: "none", padding: "10px", borderRadius: "6px", cursor: "pointer", fontWeight: "600" },
//   cancelBtn: { flex: 1, backgroundColor: "#f1f5f9", color: "#475569", border: "1px solid #cbd5e1", padding: "10px", borderRadius: "6px", cursor: "pointer", fontWeight: "600" },
//   modalFilterBar: { display: 'flex', gap: '10px', marginBottom: '15px', background: '#f8fafc', padding: '10px', borderRadius: '8px' },
//   modalDateInput: { padding: '5px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '12px' },
//   applyBtn: { background: '#2563eb', color: '#fff', border: 'none', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' },
//   resetBtnSmall: { background: '#fff', color: '#64748b', border: '1px solid #cbd5e1', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' },

//   // 👇 New Styles for Pagination
//   paginationWrapper: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '15px' },
//   pageBtn: { background: '#2563eb', border: '1px solid #2563eb', padding: '6px 14px', borderRadius: '4px', cursor: 'pointer', color: '#fff', fontSize: '12px', fontWeight: '600' },
//   disabledBtn: { background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '6px 14px', borderRadius: '4px', cursor: 'not-allowed', color: '#94a3b8', fontSize: '12px' },
//   pageInfo: { fontSize: '13px', fontWeight: '600', color: '#334155' },
// };




















// import React, { useEffect, useState } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import Header from "../components/Header";

// export default function UserManagement() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate();

//   // --- MODAL STATES ---
//   const [editingUser, setEditingUser] = useState(null);
//   const [deleteModal, setDeleteModal] = useState(null);
//   const [freezeModal, setFreezeModal] = useState(null);
//   const [historyModal, setHistoryModal] = useState(null);
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   // History & Form States
//   const [userLogs, setUserLogs] = useState([]);
//   const [logsLoading, setLogsLoading] = useState(false);
  
//   // --- 📄 PAGINATION STATES (NEW) ---
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5; // Har page par 5 logs dikhenge

//   const [editForm, setEditForm] = useState({
//     name: "", email: "", username: "", userType: "", password: ""
//   });

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const res = await api.get("/users/all");
//       setUsers(res.data);
//     } catch (error) {
//       toast.error("Failed to load users");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- HISTORY LOGIC ---
//   const openHistoryModal = async (user, sDate = "", eDate = "") => {
//     setHistoryModal(user);
//     setLogsLoading(true);
//     setCurrentPage(1); 
//     try {
//       const res = await api.get(`/logs/user/${user._id}?startDate=${sDate}&endDate=${eDate}`);
//       setUserLogs(res.data);
//     } catch (error) {
//       toast.error("Failed to load user history");
//     } finally {
//       setLogsLoading(false);
//     }
//   };

//   // Modal ke andar button ke liye function
//   const handleFilterHistory = () => {
//     openHistoryModal(historyModal, startDate, endDate);
//   };

//   // --- 📄 PAGINATION LOGIC (CALCULATION) ---
//   const indexOfLastLog = currentPage * itemsPerPage;
//   const indexOfFirstLog = indexOfLastLog - itemsPerPage;
//   const currentLogs = userLogs.slice(indexOfFirstLog, indexOfLastLog);
//   const totalPages = Math.ceil(userLogs.length / itemsPerPage);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   // --- FREEZE / UNFREEZE LOGIC ---
//   const confirmFreezeToggle = async () => {
//     if (!freezeModal) return;
//     try {
//       await api.put(`/users/toggle-freeze/${freezeModal._id}`);
//       toast.success(freezeModal.isFrozen ? "User Unfrozen Successfully" : "User Frozen Successfully");
//       fetchUsers();
//     } catch (error) {
//       toast.error("Freeze action failed");
//     } finally {
//       setFreezeModal(null);
//     }
//   };

//   // --- DELETE LOGIC ---
//   const confirmDelete = async () => {
//     if (!deleteModal) return;
//     try {
//       await api.delete(`/users/${deleteModal._id}`);
//       toast.success("User deleted");
//       fetchUsers();
//     } catch (error) {
//       toast.error("Delete failed");
//     } finally {
//       setDeleteModal(null);
//     }
//   };

//   // --- EDIT FORM CHANGE HANDLER (New Validation Logic) ---
//   const handleEditChange = (e) => {
//     const { name, value } = e.target;

//     // 👇 VALIDATION: Full Name (Sirf Alphabets)
//     if (name === "name") {
//       if (value === "") {
//         setEditForm({ ...editForm, [name]: value });
//         return;
//       }
//       if (!/^[a-zA-Z\s]*$/.test(value)) {
//         toast.error("Name should only contain Alphabets!");
//         return;
//       }
//     }

//     // 👇 VALIDATION: Username (No Spaces)
//     if (name === "username") {
//        if (/\s/.test(value)) {
//          toast.error("Username cannot contain spaces!");
//          return;
//        }
//     }

//     setEditForm({ ...editForm, [name]: value });
//   };

//   // --- EDIT SUBMIT LOGIC ---
//   const handleUpdateUser = async (e) => {
//     e.preventDefault();

//     // 🔒 STRONG PASSWORD VALIDATION (Only if password is entered)
//     const pwd = editForm.password;
//     if (pwd && pwd.trim() !== "") {
//         if (pwd.length < 6) return toast.error("Password must be at least 6 characters long!");
//         if (!/\d/.test(pwd)) return toast.error("Password must contain at least one Number (0-9)!");
//         if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) return toast.error("Password must contain at least one Special Character (@, #, $, etc.)!");
//     }

//     try {
//       await api.put(`/users/${editingUser._id}`, {
//         name: editForm.name,
//         email: editForm.email,
//         username: editForm.username,
//         userType: editForm.userType
//       });

//       if (editForm.password && editForm.password.trim() !== "") {
//         await api.put(`/users/reset-password/${editingUser._id}`, { newPassword: editForm.password });
//       }

//       toast.success("User updated");
//       setEditingUser(null);
//       fetchUsers();
//     } catch (error) {
//       toast.error("Update failed");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <Header />
//       <div style={styles.mainContent}>
//         <div style={styles.pageHeader}>
//           <div>
//             <h2 style={styles.pageTitle}>User Management</h2>
//             <p style={styles.pageSubtitle}>Monitor activity and manage access</p>
//           </div>
//           <button onClick={() => navigate("/create-user")} style={styles.createBtn}>➕ New User</button>
//         </div>

//         <div style={styles.tableCard}>
//           <table style={styles.table}>
//             <thead>
//               <tr>
//                 <th style={styles.th}>Name / Username</th>
//                 <th style={styles.th}>Role</th>
//                 <th style={styles.th}>Status</th>
//                 <th style={{ ...styles.th, textAlign: "right" }}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr><td colSpan="4" style={{ padding: "30px", textAlign: "center" }}>Loading...</td></tr>
//               ) : (
//                 users.map((u) => (
//                   <tr key={u._id} style={styles.row}>
//                     <td style={styles.td}>
//                       <div style={{ fontWeight: "600" }}>{u.name}</div>
//                       <div style={{ fontSize: "12px", color: "#64748b" }}>@{u.username}</div>
//                     </td>
//                     <td style={styles.td}>
//                       <span style={{ ...styles.roleBadge, background: u.userType === "admin" ? "#e0f2fe" : "#f1f5f9", color: u.userType === "admin" ? "#0284c7" : "#475569" }}>
//                         {u.userType.toUpperCase()}
//                       </span>
//                     </td>
//                     <td style={styles.td}>
//                       <span style={{ ...styles.statusBadge, backgroundColor: u.isFrozen ? "#fee2e2" : "#dcfce7", color: u.isFrozen ? "#dc2626" : "#166534" }}>
//                         {u.isFrozen ? "❄️ Frozen" : "● Active"}
//                       </span>
//                     </td>
//                     <td style={{ ...styles.td, textAlign: "right" }}>
//                       <button onClick={() => openHistoryModal(u)} style={styles.historyBtn}>📜 History</button>
//                       <button
//                         onClick={() => setFreezeModal(u)}
//                         style={u.isFrozen ? styles.unfreezeBtn : styles.freezeBtn}
//                       >
//                         {u.isFrozen ? "Unfreeze" : "Freeze"}
//                       </button>
//                       <button onClick={() => { setEditingUser(u); setEditForm({ ...u, password: "" }); }} style={styles.editBtn}>Edit</button>
//                       <button onClick={() => setDeleteModal(u)} style={styles.deleteBtn}>Delete</button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* --- MODAL: INDIVIDUAL HISTORY --- */}
//       {historyModal && (
//         <div style={styles.modalOverlay}>
//           <div style={{ ...styles.modalContent, width: '750px' }}>
//             <h3 style={styles.modalTitle}>Activity Log: {historyModal.name}</h3>

//             <div style={styles.modalFilterBar}>
//               <div style={{ display: 'flex', flex: 1, gap: '10px' }}>
//                 <input
//                   type="date"
//                   value={startDate}
//                   onChange={(e) => setStartDate(e.target.value)}
//                   style={styles.modalDateInput}
//                 />
//                 <input
//                   type="date"
//                   value={endDate}
//                   onChange={(e) => setEndDate(e.target.value)}
//                   style={styles.modalDateInput}
//                 />
//               </div>
//               <div style={{ display: 'flex', gap: '5px' }}>
//                 <button onClick={handleFilterHistory} style={styles.applyBtn}>🔍 Filter</button>
//                 <button 
//                   onClick={() => { setStartDate(""); setEndDate(""); openHistoryModal(historyModal, "", ""); }} 
//                   style={styles.resetBtnSmall}
//                 >
//                   🔄 Reset
//                 </button>
//               </div>
//             </div>

//             <div style={styles.logsList}>
//               {logsLoading ? (
//                 <p style={{ textAlign: 'center', padding: '20px' }}>Loading logs...</p>
//               ) : userLogs.length === 0 ? (
//                 <p style={{ textAlign: 'center', padding: '20px' }}>No logs found for this period.</p>
//               ) : (
//                 <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse' }}>
//                   <thead>
//                     <tr style={{ background: '#f8fafc' }}>
//                       <th style={styles.thMini}>Time</th>
//                       <th style={styles.thMini}>Action</th>
//                       <th style={styles.thMini}>Details</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {currentLogs.map((l) => (
//                       <tr key={l._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
//                         <td style={styles.tdMini}>{new Date(l.timestamp).toLocaleString()}</td>
//                         <td style={styles.tdMini}><b style={{ color: '#2563eb' }}>{l.action}</b></td>
//                         <td style={styles.tdMini}>{l.details}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               )}
//             </div>

//             {/* 👇 PAGINATION CONTROLS */}
//             {!logsLoading && userLogs.length > itemsPerPage && (
//                 <div style={styles.paginationWrapper}>
//                     <button 
//                         onClick={() => paginate(currentPage - 1)} 
//                         disabled={currentPage === 1}
//                         style={currentPage === 1 ? styles.disabledBtn : styles.pageBtn}
//                     >
//                         Previous
//                     </button>

//                     <span style={styles.pageInfo}>
//                         Page {currentPage} of {totalPages}
//                     </span>

//                     <button 
//                         onClick={() => paginate(currentPage + 1)} 
//                         disabled={currentPage === totalPages}
//                         style={currentPage === totalPages ? styles.disabledBtn : styles.pageBtn}
//                     >
//                         Next
//                     </button>
//                 </div>
//             )}
            
//             <div style={{ marginTop: '15px' }}>
//               <button 
//                 onClick={() => { setHistoryModal(null); setStartDate(""); setEndDate(""); }} 
//                 style={{ ...styles.cancelBtn, width: '100%' }}
//               >
//                 Close Window
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* --- MODAL 2: FREEZE CONFIRMATION --- */}
//       {freezeModal && (
//         <div style={styles.modalOverlay}>
//           <div style={{ ...styles.modalContent, width: '350px', textAlign: 'center' }}>
//             <div style={{ fontSize: '40px', marginBottom: '10px' }}>{freezeModal.isFrozen ? "🔓" : "❄️"}</div>
//             <h3>{freezeModal.isFrozen ? "Unfreeze Account?" : "Freeze Account?"}</h3>
//             <p style={{ fontSize: '14px', color: '#555' }}>
//               Are you sure you want to {freezeModal.isFrozen ? "unfreeze" : "freeze"} <b>{freezeModal.name}</b>?
//             </p>
//             <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
//               <button onClick={confirmFreezeToggle} style={styles.saveBtn}>Yes, Confirm</button>
//               <button onClick={() => setFreezeModal(null)} style={styles.cancelBtn}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* --- MODAL 3: DELETE CONFIRMATION --- */}
//       {deleteModal && (
//         <div style={styles.modalOverlay}>
//           <div style={{ ...styles.modalContent, width: '350px', textAlign: 'center' }}>
//             <div style={{ fontSize: '40px', marginBottom: '10px' }}>🗑️</div>
//             <h3 style={{ color: '#dc2626' }}>Delete User?</h3>
//             <p style={{ fontSize: '14px', color: '#555' }}>Are you sure you want to delete <b>{deleteModal.name}</b>?</p>
//             <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
//               <button onClick={confirmDelete} style={{ ...styles.saveBtn, background: '#dc2626' }}>Yes, Delete</button>
//               <button onClick={() => setDeleteModal(null)} style={styles.cancelBtn}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* --- MODAL 4: EDIT FORM (Validated) --- */}
//       {editingUser && (
//         <div style={styles.modalOverlay}>
//           <div style={styles.modalContent}>
//             <h3 style={styles.modalTitle}>Edit User</h3>
//             <form onSubmit={handleUpdateUser} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              
//               {/* Name (With Validation) */}
//               <input 
//                   name="name" 
//                   value={editForm.name} 
//                   onChange={handleEditChange} 
//                   style={styles.input} 
//                   required 
//                   placeholder="Name" 
//               />
              
//               {/* Username (With Validation) */}
//               <input 
//                   name="username" 
//                   value={editForm.username} 
//                   onChange={handleEditChange} 
//                   style={styles.input} 
//                   required 
//                   placeholder="Username" 
//               />
              
//               {/* Email */}
//               <input 
//                   name="email" 
//                   value={editForm.email} 
//                   onChange={handleEditChange} 
//                   style={styles.input} 
//                   required 
//                   placeholder="Email" 
//               />
              
//               {/* Role */}
//               <select 
//                   name="userType" 
//                   value={editForm.userType} 
//                   onChange={handleEditChange} 
//                   style={styles.input}
//               >
//                 <option value="user">User</option>
//                 <option value="superuser">Superuser</option>
//                 <option value="admin">Admin</option>
//               </select>
              
//               {/* Password (With Validation) */}
//               <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
//                 <label style={{ fontSize: "11px", color: "#ef4444", fontWeight: "bold" }}>Reset Password (Optional)</label>
//                 <input 
//                     type="text" 
//                     name="password" 
//                     placeholder="New Password (Strong)" 
//                     value={editForm.password} 
//                     onChange={handleEditChange} 
//                     style={styles.input} 
//                 />
//               </div>

//               <div style={{ display: 'flex', gap: '10px' }}>
//                 <button type="submit" style={styles.saveBtn}>Save</button>
//                 <button type="button" onClick={() => setEditingUser(null)} style={styles.cancelBtn}>Cancel</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// const styles = {
//   container: { minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "'Inter', sans-serif" },
//   mainContent: { padding: "20px", maxWidth: "1100px", margin: "0 auto" },
//   pageHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
//   pageTitle: { fontSize: "22px", fontWeight: "800", color: "#0f172a", margin: 0 },
//   pageSubtitle: { fontSize: "14px", color: "#64748b", margin: 0 },
//   createBtn: { background: "#16a34a", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontWeight: "600" },
//   tableCard: { background: "#fff", borderRadius: "10px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", overflow: "hidden", border: "1px solid #e2e8f0" },
//   table: { width: "100%", borderCollapse: "collapse" },
//   th: { padding: "12px 15px", background: "#f8fafc", textAlign: "left", fontSize: "11px", color: "#64748b", textTransform: "uppercase", borderBottom: "1px solid #e2e8f0" },
//   td: { padding: "12px 15px", borderBottom: "1px solid #f1f5f9", fontSize: "14px" },
//   roleBadge: { padding: "3px 8px", borderRadius: "12px", fontSize: "10px", fontWeight: "700" },
//   statusBadge: { padding: "3px 8px", borderRadius: "12px", fontSize: "11px", fontWeight: "600" },
//   historyBtn: { background: "#fff", border: "1px solid #cbd5e1", padding: "5px 10px", borderRadius: "6px", fontSize: "12px", cursor: "pointer", marginRight: "5px" },
//   freezeBtn: { background: "#fff", color: "#64748b", border: "1px solid #cbd5e1", padding: "5px 10px", borderRadius: "6px", cursor: "pointer", fontSize: "12px", marginRight: "5px" },
//   unfreezeBtn: { background: "#fff", color: "#16a34a", border: "1px solid #16a34a", padding: "5px 10px", borderRadius: "6px", cursor: "pointer", fontSize: "12px", marginRight: "5px" },
//   editBtn: { background: "#e0f2fe", color: "#0369a1", border: "none", padding: "5px 10px", borderRadius: "6px", cursor: "pointer", fontSize: "12px", marginRight: "5px" },
//   deleteBtn: { background: "#fee2e2", color: "#b91c1c", border: "none", padding: "5px 10px", borderRadius: "6px", cursor: "pointer", fontSize: "12px" },
//   modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 },
//   modalContent: { background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)" },
//   logsList: { maxHeight: "300px", overflowY: "auto", margin: "15px 0", border: "1px solid #f1f5f9" },
//   thMini: { textAlign: "left", padding: "8px", color: "#64748b" },
//   tdMini: { padding: "8px" },
//   input: { width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "14px", boxSizing: "border-box" },
//   saveBtn: { flex: 1, backgroundColor: "#2563eb", color: "#fff", border: "none", padding: "10px", borderRadius: "6px", cursor: "pointer", fontWeight: "600" },
//   cancelBtn: { flex: 1, backgroundColor: "#f1f5f9", color: "#475569", border: "1px solid #cbd5e1", padding: "10px", borderRadius: "6px", cursor: "pointer", fontWeight: "600" },
//   modalFilterBar: { display: 'flex', gap: '10px', marginBottom: '15px', background: '#f8fafc', padding: '10px', borderRadius: '8px' },
//   modalDateInput: { padding: '5px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '12px' },
//   applyBtn: { background: '#2563eb', color: '#fff', border: 'none', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' },
//   resetBtnSmall: { background: '#fff', color: '#64748b', border: '1px solid #cbd5e1', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' },

//   // 👇 New Styles for Pagination
//   paginationWrapper: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '15px' },
//   pageBtn: { background: '#2563eb', border: '1px solid #2563eb', padding: '6px 14px', borderRadius: '4px', cursor: 'pointer', color: '#fff', fontSize: '12px', fontWeight: '600' },
//   disabledBtn: { background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '6px 14px', borderRadius: '4px', cursor: 'not-allowed', color: '#94a3b8', fontSize: '12px' },
//   pageInfo: { fontSize: '13px', fontWeight: '600', color: '#334155' },
// };























import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Header from "../components/Header";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // --- MODAL STATES ---
  const [editingUser, setEditingUser] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [freezeModal, setFreezeModal] = useState(null);
  const [historyModal, setHistoryModal] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // History & Form States
  const [userLogs, setUserLogs] = useState([]);
  const [logsLoading, setLogsLoading] = useState(false);
  
  // --- 📄 PAGINATION STATES (NEW) ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Har page par 5 logs dikhenge

  const [editForm, setEditForm] = useState({
    name: "", email: "", username: "", userType: "", password: "", confirmPassword: "" // 👈 Added confirmPassword here
  });

  useEffect(() => {
    fetchUsers();
  }, []);

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

  // --- HISTORY LOGIC ---
  const openHistoryModal = async (user, sDate = "", eDate = "") => {
    setHistoryModal(user);
    setLogsLoading(true);
    setCurrentPage(1); 
    try {
      const res = await api.get(`/logs/user/${user._id}?startDate=${sDate}&endDate=${eDate}`);
      setUserLogs(res.data);
    } catch (error) {
      toast.error("Failed to load user history");
    } finally {
      setLogsLoading(false);
    }
  };

  // Modal ke andar button ke liye function
  const handleFilterHistory = () => {
    openHistoryModal(historyModal, startDate, endDate);
  };

  // --- 📄 PAGINATION LOGIC (CALCULATION) ---
  const indexOfLastLog = currentPage * itemsPerPage;
  const indexOfFirstLog = indexOfLastLog - itemsPerPage;
  const currentLogs = userLogs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(userLogs.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // --- FREEZE / UNFREEZE LOGIC ---
  const confirmFreezeToggle = async () => {
    if (!freezeModal) return;
    try {
      await api.put(`/users/toggle-freeze/${freezeModal._id}`);
      toast.success(freezeModal.isFrozen ? "User Unfrozen Successfully" : "User Frozen Successfully");
      fetchUsers();
    } catch (error) {
      toast.error("Freeze action failed");
    } finally {
      setFreezeModal(null);
    }
  };

  // --- DELETE LOGIC ---
  const confirmDelete = async () => {
    if (!deleteModal) return;
    try {
      await api.delete(`/users/${deleteModal._id}`);
      toast.success("User deleted");
      fetchUsers();
    } catch (error) {
      toast.error("Delete failed");
    } finally {
      setDeleteModal(null);
    }
  };

  // --- EDIT FORM CHANGE HANDLER (New Validation Logic) ---
  const handleEditChange = (e) => {
    const { name, value } = e.target;

    // 👇 VALIDATION: Full Name (Sirf Alphabets)
    if (name === "name") {
      if (value === "") {
        setEditForm({ ...editForm, [name]: value });
        return;
      }
      if (!/^[a-zA-Z\s]*$/.test(value)) {
        toast.error("Name should only contain Alphabets!");
        return;
      }
    }

    // 👇 VALIDATION: Username (No Spaces)
    if (name === "username") {
       if (/\s/.test(value)) {
         toast.error("Username cannot contain spaces!");
         return;
       }
    }

    setEditForm({ ...editForm, [name]: value });
  };

  // --- EDIT SUBMIT LOGIC ---
  const handleUpdateUser = async (e) => {
    e.preventDefault();

    // 🔒 STRONG PASSWORD VALIDATION (Only if password is entered)
    const pwd = editForm.password;
    const confirmPwd = editForm.confirmPassword; // 👈 Get confirm password

    if (pwd && pwd.trim() !== "") {
        // 👇 Check 0: Match Passwords
        if (pwd !== confirmPwd) {
            return toast.error("Passwords do not match!");
        }

        if (pwd.length < 6) return toast.error("Password must be at least 6 characters long!");
        if (!/\d/.test(pwd)) return toast.error("Password must contain at least one Number (0-9)!");
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) return toast.error("Password must contain at least one Special Character (@, #, $, etc.)!");
    }

    try {
      await api.put(`/users/${editingUser._id}`, {
        name: editForm.name,
        email: editForm.email,
        username: editForm.username,
        userType: editForm.userType
      });

      if (editForm.password && editForm.password.trim() !== "") {
        await api.put(`/users/reset-password/${editingUser._id}`, { newPassword: editForm.password });
      }

      toast.success("User updated");
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      toast.error("Update failed");
    }
  };

  return (
    <div style={styles.container}>
      <Header />
      <div style={styles.mainContent}>
        <div style={styles.pageHeader}>
          <div>
            <h2 style={styles.pageTitle}>User Management</h2>
            <p style={styles.pageSubtitle}>Monitor activity and manage access</p>
          </div>
          <button onClick={() => navigate("/create-user")} style={styles.createBtn}>➕ New User</button>
        </div>

        <div style={styles.tableCard}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name / Username</th>
                <th style={styles.th}>Role</th>
                <th style={styles.th}>Status</th>
                <th style={{ ...styles.th, textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="4" style={{ padding: "30px", textAlign: "center" }}>Loading...</td></tr>
              ) : (
                users.map((u) => (
                  <tr key={u._id} style={styles.row}>
                    <td style={styles.td}>
                      <div style={{ fontWeight: "600" }}>{u.name}</div>
                    </td>
                    <td style={styles.td}>
                      <span style={{ ...styles.roleBadge, background: u.userType === "admin" ? "#e0f2fe" : "#f1f5f9", color: u.userType === "admin" ? "#0284c7" : "#475569" }}>
                        {u.userType.toUpperCase()}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <span style={{ ...styles.statusBadge, backgroundColor: u.isFrozen ? "#fee2e2" : "#dcfce7", color: u.isFrozen ? "#dc2626" : "#166534" }}>
                        {u.isFrozen ? "❄️ Frozen" : "● Active"}
                      </span>
                    </td>
                    <td style={{ ...styles.td, textAlign: "right" }}>
                      <button onClick={() => openHistoryModal(u)} style={styles.historyBtn}>📜 History</button>
                      <button
                        onClick={() => setFreezeModal(u)}
                        style={u.isFrozen ? styles.unfreezeBtn : styles.freezeBtn}
                      >
                        {u.isFrozen ? "Unfreeze" : "Freeze"}
                      </button>
                      {/* 👇 Update: Reset password & confirmPassword fields on click */}
                      <button onClick={() => { setEditingUser(u); setEditForm({ ...u, password: "", confirmPassword: "" }); }} style={styles.editBtn}>Edit</button>
                      <button onClick={() => setDeleteModal(u)} style={styles.deleteBtn}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MODAL: INDIVIDUAL HISTORY --- */}
      {historyModal && (
        <div style={styles.modalOverlay}>
          <div style={{ ...styles.modalContent, width: '750px' }}>
            <h3 style={styles.modalTitle}>Activity Log: {historyModal.name}</h3>

            <div style={styles.modalFilterBar}>
              <div style={{ display: 'flex', flex: 1, gap: '10px' }}>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  style={styles.modalDateInput}
                />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  style={styles.modalDateInput}
                />
              </div>
              <div style={{ display: 'flex', gap: '5px' }}>
                <button onClick={handleFilterHistory} style={styles.applyBtn}>🔍 Filter</button>
                <button 
                  onClick={() => { setStartDate(""); setEndDate(""); openHistoryModal(historyModal, "", ""); }} 
                  style={styles.resetBtnSmall}
                >
                  🔄 Reset
                </button>
              </div>
            </div>

            <div style={styles.logsList}>
              {logsLoading ? (
                <p style={{ textAlign: 'center', padding: '20px' }}>Loading logs...</p>
              ) : userLogs.length === 0 ? (
                <p style={{ textAlign: 'center', padding: '20px' }}>No logs found for this period.</p>
              ) : (
                <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc' }}>
                      <th style={styles.thMini}>Time</th>
                      <th style={styles.thMini}>Action</th>
                      <th style={styles.thMini}>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentLogs.map((l) => (
                      <tr key={l._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={styles.tdMini}>{new Date(l.timestamp).toLocaleString()}</td>
                        <td style={styles.tdMini}><b style={{ color: '#2563eb' }}>{l.action}</b></td>
                        <td style={styles.tdMini}>{l.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* 👇 PAGINATION CONTROLS */}
            {!logsLoading && userLogs.length > itemsPerPage && (
                <div style={styles.paginationWrapper}>
                    <button 
                        onClick={() => paginate(currentPage - 1)} 
                        disabled={currentPage === 1}
                        style={currentPage === 1 ? styles.disabledBtn : styles.pageBtn}
                    >
                        Previous
                    </button>

                    <span style={styles.pageInfo}>
                        Page {currentPage} of {totalPages}
                    </span>

                    <button 
                        onClick={() => paginate(currentPage + 1)} 
                        disabled={currentPage === totalPages}
                        style={currentPage === totalPages ? styles.disabledBtn : styles.pageBtn}
                    >
                        Next
                    </button>
                </div>
            )}
            
            <div style={{ marginTop: '15px' }}>
              <button 
                onClick={() => { setHistoryModal(null); setStartDate(""); setEndDate(""); }} 
                style={{ ...styles.cancelBtn, width: '100%' }}
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 2: FREEZE CONFIRMATION --- */}
      {freezeModal && (
        <div style={styles.modalOverlay}>
          <div style={{ ...styles.modalContent, width: '350px', textAlign: 'center' }}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>{freezeModal.isFrozen ? "🔓" : "❄️"}</div>
            <h3>{freezeModal.isFrozen ? "Unfreeze Account?" : "Freeze Account?"}</h3>
            <p style={{ fontSize: '14px', color: '#555' }}>
              Are you sure you want to {freezeModal.isFrozen ? "unfreeze" : "freeze"} <b>{freezeModal.name}</b>?
            </p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button onClick={confirmFreezeToggle} style={styles.saveBtn}>Yes, Confirm</button>
              <button onClick={() => setFreezeModal(null)} style={styles.cancelBtn}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 3: DELETE CONFIRMATION --- */}
      {deleteModal && (
        <div style={styles.modalOverlay}>
          <div style={{ ...styles.modalContent, width: '350px', textAlign: 'center' }}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>🗑️</div>
            <h3 style={{ color: '#dc2626' }}>Delete User?</h3>
            <p style={{ fontSize: '14px', color: '#555' }}>Are you sure you want to delete <b>{deleteModal.name}</b>?</p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button onClick={confirmDelete} style={{ ...styles.saveBtn, background: '#dc2626' }}>Yes, Delete</button>
              <button onClick={() => setDeleteModal(null)} style={styles.cancelBtn}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 4: EDIT FORM (Validated) --- */}
      {editingUser && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3 style={styles.modalTitle}>Edit User</h3>
            <form onSubmit={handleUpdateUser} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              
              {/* Name (With Validation) */}
              <input 
                  name="name" 
                  value={editForm.name} 
                  onChange={handleEditChange} 
                  style={styles.input} 
                  required 
                  placeholder="Name" 
              />
              
              {/* Username (With Validation) */}
              <input 
                  name="username" 
                  value={editForm.username} 
                  onChange={handleEditChange} 
                  style={styles.input} 
                  required 
                  placeholder="Username" 
              />
              
              {/* Email */}
              <input 
                  name="email" 
                  value={editForm.email} 
                  onChange={handleEditChange} 
                  style={styles.input} 
                  required 
                  placeholder="Email" 
              />
              
              {/* Role */}
              <select 
                  name="userType" 
                  value={editForm.userType} 
                  onChange={handleEditChange} 
                  style={styles.input}
              >
                <option value="user">User</option>
                <option value="superuser">Superuser</option>
                <option value="admin">Admin</option>
              </select>
              
              {/* Password Section */}
              <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px dashed #cbd5e1', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ fontSize: "11px", color: "#ef4444", fontWeight: "bold" }}>Reset Password (Optional)</label>
                
                {/* 1. New Password */}
                <input 
                    type="text" 
                    name="password" 
                    placeholder="New Password (Strong)" 
                    value={editForm.password} 
                    onChange={handleEditChange} 
                    style={styles.input} 
                />

                {/* 2. Confirm Password (ADDED) */}
                <input 
                    type="text" 
                    name="confirmPassword" 
                    placeholder="Confirm New Password" 
                    value={editForm.confirmPassword} 
                    onChange={handleEditChange} 
                    style={styles.input} 
                />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" style={styles.saveBtn}>Save</button>
                <button type="button" onClick={() => setEditingUser(null)} style={styles.cancelBtn}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "'Inter', sans-serif" },
  mainContent: { padding: "20px", maxWidth: "1100px", margin: "0 auto" },
  pageHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
  pageTitle: { fontSize: "22px", fontWeight: "800", color: "#0f172a", margin: 0 },
  pageSubtitle: { fontSize: "14px", color: "#64748b", margin: 0 },
  createBtn: { background: "#16a34a", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontWeight: "600" },
  tableCard: { background: "#fff", borderRadius: "10px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", overflow: "hidden", border: "1px solid #e2e8f0" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { padding: "12px 15px", background: "#f8fafc", textAlign: "left", fontSize: "11px", color: "#64748b", textTransform: "uppercase", borderBottom: "1px solid #e2e8f0" },
  td: { padding: "12px 15px", borderBottom: "1px solid #f1f5f9", fontSize: "14px" },
  roleBadge: { padding: "3px 8px", borderRadius: "12px", fontSize: "10px", fontWeight: "700" },
  statusBadge: { padding: "3px 8px", borderRadius: "12px", fontSize: "11px", fontWeight: "600" },
  historyBtn: { background: "#fff", border: "1px solid #cbd5e1", padding: "5px 10px", borderRadius: "6px", fontSize: "12px", cursor: "pointer", marginRight: "5px" },
  freezeBtn: { background: "#fff", color: "#64748b", border: "1px solid #cbd5e1", padding: "5px 10px", borderRadius: "6px", cursor: "pointer", fontSize: "12px", marginRight: "5px" },
  unfreezeBtn: { background: "#fff", color: "#16a34a", border: "1px solid #16a34a", padding: "5px 10px", borderRadius: "6px", cursor: "pointer", fontSize: "12px", marginRight: "5px" },
  editBtn: { background: "#e0f2fe", color: "#0369a1", border: "none", padding: "5px 10px", borderRadius: "6px", cursor: "pointer", fontSize: "12px", marginRight: "5px" },
  deleteBtn: { background: "#fee2e2", color: "#b91c1c", border: "none", padding: "5px 10px", borderRadius: "6px", cursor: "pointer", fontSize: "12px" },
  modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 },
  modalContent: { background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)" },
  logsList: { maxHeight: "300px", overflowY: "auto", margin: "15px 0", border: "1px solid #f1f5f9" },
  thMini: { textAlign: "left", padding: "8px", color: "#64748b" },
  tdMini: { padding: "8px" },
  input: { width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "14px", boxSizing: "border-box" },
  saveBtn: { flex: 1, backgroundColor: "#2563eb", color: "#fff", border: "none", padding: "10px", borderRadius: "6px", cursor: "pointer", fontWeight: "600" },
  cancelBtn: { flex: 1, backgroundColor: "#f1f5f9", color: "#475569", border: "1px solid #cbd5e1", padding: "10px", borderRadius: "6px", cursor: "pointer", fontWeight: "600" },
  modalFilterBar: { display: 'flex', gap: '10px', marginBottom: '15px', background: '#f8fafc', padding: '10px', borderRadius: '8px' },
  modalDateInput: { padding: '5px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '12px' },
  applyBtn: { background: '#2563eb', color: '#fff', border: 'none', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' },
  resetBtnSmall: { background: '#fff', color: '#64748b', border: '1px solid #cbd5e1', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' },

  // 👇 New Styles for Pagination
  paginationWrapper: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '15px' },
  pageBtn: { background: '#2563eb', border: '1px solid #2563eb', padding: '6px 14px', borderRadius: '4px', cursor: 'pointer', color: '#fff', fontSize: '12px', fontWeight: '600' },
  disabledBtn: { background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '6px 14px', borderRadius: '4px', cursor: 'not-allowed', color: '#94a3b8', fontSize: '12px' },
  pageInfo: { fontSize: '13px', fontWeight: '600', color: '#334155' },
};

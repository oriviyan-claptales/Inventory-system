import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Header from "../components/Header";

export default function TemplateManagement() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  // Filter States
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Modal States
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [viewModal, setViewModal] = useState(null);
  const [duplicateModal, setDuplicateModal] = useState(null);

  // Edit Form State
  const [editForm, setEditForm] = useState({
    templateName: "",
    templateType: "",
    description: "",
    isActive: true
  });

  // Duplicate Form State
  const [duplicateName, setDuplicateName] = useState("");

  useEffect(() => {
    fetchTemplates();
    fetchStats();
  }, []);

  const fetchTemplates = async () => {
    try {
      const params = {};
      if (typeFilter) params.type = typeFilter;
      if (statusFilter) params.isActive = statusFilter;
      if (searchTerm) params.search = searchTerm;

      const res = await api.get("/templates", { params });
      setTemplates(res.data.templates);
    } catch (error) {
      toast.error("Failed to load templates");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await api.get("/templates/stats/overview");
      setStats(res.data.stats);
    } catch (error) {
      console.error("Failed to load stats:", error);
    }
  };

  // ==================== SEARCH & FILTER ====================
  const handleSearch = () => {
    setLoading(true);
    fetchTemplates();
  };

  const resetFilters = () => {
    setTypeFilter("");
    setStatusFilter("");
    setSearchTerm("");
    setLoading(true);
    fetchTemplates();
  };

  // ==================== EDIT LOGIC ====================
  const handleEditClick = (template) => {
    setEditingTemplate(template);
    setEditForm({
      templateName: template.templateName,
      templateType: template.templateType,
      description: template.description || "",
      isActive: template.isActive
    });
  };

  const handleUpdateTemplate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/templates/${editingTemplate._id}`, editForm);
      toast.success("Template updated successfully");
      setEditingTemplate(null);
      fetchTemplates();
      fetchStats();
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  // ==================== DELETE LOGIC ====================
  const openDeleteModal = (template) => {
    setDeleteModal(template);
  };

  const confirmDelete = async () => {
    if (!deleteModal) return;
    try {
      await api.delete(`/templates/${deleteModal._id}`);
      toast.success("Template deleted successfully");
      fetchTemplates();
      fetchStats();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
    setDeleteModal(null);
  };

  // ==================== TOGGLE STATUS ====================
  const toggleStatus = async (templateId) => {
    try {
      await api.patch(`/templates/${templateId}/toggle`);
      toast.success("Template status updated");
      fetchTemplates();
      fetchStats();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  // ==================== DUPLICATE LOGIC ====================
  const openDuplicateModal = (template) => {
    setDuplicateModal(template);
    setDuplicateName(`${template.templateName} (Copy)`);
  };

  const confirmDuplicate = async () => {
    if (!duplicateModal || !duplicateName.trim()) {
      return toast.error("Please enter a name for the duplicate");
    }
    try {
      await api.post(`/templates/${duplicateModal._id}/duplicate`, {
        newName: duplicateName
      });
      toast.success("Template duplicated successfully");
      setDuplicateModal(null);
      setDuplicateName("");
      fetchTemplates();
      fetchStats();
    } catch (error) {
      toast.error(error.response?.data?.message || "Duplication failed");
    }
  };

  // ==================== VIEW DETAILS ====================
  const openViewModal = (template) => {
    setViewModal(template);
  };

  // ==================== USE TEMPLATE ====================
  const useTemplate = async (templateId) => {
    try {
      await api.post(`/templates/${templateId}/use`);
      toast.success("Template usage recorded");
      fetchTemplates();
      fetchStats();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to use template");
    }
  };

  return (
    <div style={styles.container}>
      <Header />
      <div style={styles.mainContent}>

        {/* PAGE HEADER */}
        <div style={styles.pageHeader}>
          <div>
            <h2 style={styles.pageTitle}>📋 Template Management</h2>
            <p style={styles.pageSubtitle}>Manage label and print templates</p>
          </div>
          <button onClick={() => navigate("/create-template")} style={styles.createBtn}>
            ➕ Create New Template
          </button>
        </div>

        {/* STATS CARDS */}
        {stats && (
          <div style={styles.statsContainer}>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>{stats.total}</div>
              <div style={styles.statLabel}>Total Templates</div>
            </div>
            <div style={styles.statCard}>
              <div style={{...styles.statNumber, color: "#10b981"}}>{stats.active}</div>
              <div style={styles.statLabel}>Active</div>
            </div>
            <div style={styles.statCard}>
              <div style={{...styles.statNumber, color: "#ef4444"}}>{stats.inactive}</div>
              <div style={styles.statLabel}>Inactive</div>
            </div>
            <div style={styles.statCard}>
              <div style={{...styles.statNumber, color: "#3b82f6"}}>
                {stats.byType.reduce((sum, t) => sum + t.totalUsage, 0)}
              </div>
              <div style={styles.statLabel}>Total Usage</div>
            </div>
          </div>
        )}

        {/* FILTERS */}
        <div style={styles.filterSection}>
          <div style={styles.filterRow}>
            <input
              type="text"
              placeholder="🔍 Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              style={styles.filterSelect}
            >
              <option value="">All Types</option>
              <option value="Product Label">Product Label</option>
              <option value="Barcode Label">Barcode Label</option>
              <option value="Shipping Label">Shipping Label</option>
              <option value="Thank You Card">Thank You Card</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={styles.filterSelect}
            >
              <option value="">All Status</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>

            <button onClick={handleSearch} style={styles.searchBtn}>
              Search
            </button>
            <button onClick={resetFilters} style={styles.resetBtn}>
              Reset
            </button>
          </div>
        </div>

        {/* TEMPLATES TABLE */}
        <div style={styles.tableCard}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Template Name</th>
                <th style={styles.th}>Type</th>
                <th style={styles.th}>Usage Count</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Last Used</th>
                <th style={{...styles.th, textAlign: "right"}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" style={{padding: "30px", textAlign: "center"}}>
                    Loading templates...
                  </td>
                </tr>
              ) : templates.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{padding: "30px", textAlign: "center", color: "#666"}}>
                    No templates found. Create your first template!
                  </td>
                </tr>
              ) : (
                templates.map((template) => (
                  <tr key={template._id} style={styles.row}>
                    <td style={styles.td}>
                      <div style={{fontWeight: "600", color: "#333"}}>
                        {template.templateName}
                      </div>
                      {template.description && (
                        <div style={{fontSize: "12px", color: "#666", marginTop: "4px"}}>
                          {template.description.substring(0, 50)}
                          {template.description.length > 50 ? "..." : ""}
                        </div>
                      )}
                    </td>

                    <td style={styles.td}>
                      <span style={getTypeBadge(template.templateType)}>
                        {template.templateType}
                      </span>
                    </td>

                    <td style={styles.td}>
                      <div style={{fontWeight: "600", color: "#3b82f6"}}>
                        {template.usageCount}
                      </div>
                    </td>

                    <td style={styles.td}>
                      <span style={template.isActive ? styles.activeBadge : styles.inactiveBadge}>
                        {template.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td style={styles.td}>
                      {template.lastUsedAt 
                        ? new Date(template.lastUsedAt).toLocaleDateString()
                        : "Never"
                      }
                    </td>

                    <td style={{...styles.td, textAlign: "right"}}>
                      <div style={styles.actionBtns}>
                        <button
                          onClick={() => openViewModal(template)}
                          style={styles.viewBtn}
                          title="View Details"
                        >
                          👁️
                        </button>
                        <button
                          onClick={() => useTemplate(template._id)}
                          style={styles.useBtn}
                          title="Use Template"
                          disabled={!template.isActive}
                        >
                          ▶️
                        </button>
                        <button
                          onClick={() => handleEditClick(template)}
                          style={styles.editBtn}
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => toggleStatus(template._id)}
                          style={template.isActive ? styles.deactivateBtn : styles.activateBtn}
                          title={template.isActive ? "Deactivate" : "Activate"}
                        >
                          {template.isActive ? "⏸️" : "▶️"}
                        </button>
                        <button
                          onClick={() => openDuplicateModal(template)}
                          style={styles.duplicateBtn}
                          title="Duplicate"
                        >
                          📋
                        </button>
                        <button
                          onClick={() => openDeleteModal(template)}
                          style={styles.deleteBtn}
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ==================== EDIT MODAL ==================== */}
        {editingTemplate && (
          <div style={styles.modalOverlay} onClick={() => setEditingTemplate(null)}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
              <div style={styles.modalHeader}>
                <h3 style={styles.modalTitle}>✏️ Edit Template</h3>
                <button onClick={() => setEditingTemplate(null)} style={styles.closeBtn}>
                  ✖
                </button>
              </div>

              <form onSubmit={handleUpdateTemplate} style={styles.form}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Template Name *</label>
                  <input
                    type="text"
                    value={editForm.templateName}
                    onChange={(e) => setEditForm({...editForm, templateName: e.target.value})}
                    style={styles.input}
                    required
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Template Type *</label>
                  <select
                    value={editForm.templateType}
                    onChange={(e) => setEditForm({...editForm, templateType: e.target.value})}
                    style={styles.input}
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Product Label">Product Label</option>
                    <option value="Barcode Label">Barcode Label</option>
                    <option value="Shipping Label">Shipping Label</option>
                    <option value="Thank You Card">Thank You Card</option>
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Description</label>
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                    style={{...styles.input, minHeight: "80px"}}
                    rows="3"
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={editForm.isActive}
                      onChange={(e) => setEditForm({...editForm, isActive: e.target.checked})}
                      style={{marginRight: "8px"}}
                    />
                    Active
                  </label>
                </div>

                <div style={styles.modalActions}>
                  <button type="button" onClick={() => setEditingTemplate(null)} style={styles.cancelBtn}>
                    Cancel
                  </button>
                  <button type="submit" style={styles.submitBtn}>
                    Update Template
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ==================== DELETE MODAL ==================== */}
        {deleteModal && (
          <div style={styles.modalOverlay} onClick={() => setDeleteModal(null)}>
            <div style={styles.confirmModal} onClick={(e) => e.stopPropagation()}>
              <div style={styles.confirmIcon}>🗑️</div>
              <h3 style={styles.confirmTitle}>Delete Template?</h3>
              <p style={styles.confirmText}>
                Are you sure you want to delete "<strong>{deleteModal.templateName}</strong>"?
                <br />This action cannot be undone.
              </p>
              <div style={styles.confirmActions}>
                <button onClick={() => setDeleteModal(null)} style={styles.cancelBtn}>
                  Cancel
                </button>
                <button onClick={confirmDelete} style={styles.confirmDeleteBtn}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== DUPLICATE MODAL ==================== */}
        {duplicateModal && (
          <div style={styles.modalOverlay} onClick={() => setDuplicateModal(null)}>
            <div style={styles.confirmModal} onClick={(e) => e.stopPropagation()}>
              <div style={styles.confirmIcon}>📋</div>
              <h3 style={styles.confirmTitle}>Duplicate Template</h3>
              <p style={styles.confirmText}>
                Create a copy of "<strong>{duplicateModal.templateName}</strong>"
              </p>
              <div style={styles.formGroup}>
                <label style={styles.label}>New Template Name</label>
                <input
                  type="text"
                  value={duplicateName}
                  onChange={(e) => setDuplicateName(e.target.value)}
                  style={styles.input}
                  placeholder="Enter new template name"
                />
              </div>
              <div style={styles.confirmActions}>
                <button onClick={() => setDuplicateModal(null)} style={styles.cancelBtn}>
                  Cancel
                </button>
                <button onClick={confirmDuplicate} style={styles.submitBtn}>
                  Duplicate
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== VIEW MODAL ==================== */}
        {viewModal && (
          <div style={styles.modalOverlay} onClick={() => setViewModal(null)}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
              <div style={styles.modalHeader}>
                <h3 style={styles.modalTitle}>👁️ Template Details</h3>
                <button onClick={() => setViewModal(null)} style={styles.closeBtn}>
                  ✖
                </button>
              </div>

              <div style={styles.viewContent}>
                <div style={styles.viewRow}>
                  <strong>Name:</strong> {viewModal.templateName}
                </div>
                <div style={styles.viewRow}>
                  <strong>Type:</strong> <span style={getTypeBadge(viewModal.templateType)}>{viewModal.templateType}</span>
                </div>
                <div style={styles.viewRow}>
                  <strong>Status:</strong>{" "}
                  <span style={viewModal.isActive ? styles.activeBadge : styles.inactiveBadge}>
                    {viewModal.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
                <div style={styles.viewRow}>
                  <strong>Usage Count:</strong> {viewModal.usageCount} times
                </div>
                <div style={styles.viewRow}>
                  <strong>Last Used:</strong>{" "}
                  {viewModal.lastUsedAt 
                    ? new Date(viewModal.lastUsedAt).toLocaleString()
                    : "Never used"
                  }
                </div>
                <div style={styles.viewRow}>
                  <strong>Created:</strong> {new Date(viewModal.createdAt).toLocaleString()}
                </div>
                <div style={styles.viewRow}>
                  <strong>Created By:</strong> {viewModal.createdBy?.name || "Unknown"}
                </div>
                {viewModal.description && (
                  <div style={styles.viewRow}>
                    <strong>Description:</strong>
                    <div style={{marginTop: "8px", padding: "10px", background: "#f9fafb", borderRadius: "6px"}}>
                      {viewModal.description}
                    </div>
                  </div>
                )}
                {viewModal.tags && viewModal.tags.length > 0 && (
                  <div style={styles.viewRow}>
                    <strong>Tags:</strong>
                    <div style={{marginTop: "8px"}}>
                      {viewModal.tags.map((tag, idx) => (
                        <span key={idx} style={styles.tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div style={styles.modalActions}>
                <button onClick={() => setViewModal(null)} style={styles.submitBtn}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// ==================== HELPER FUNCTION ====================
const getTypeBadge = (type) => {
  const colors = {
    "Product Label": { bg: "#dbeafe", color: "#1e40af" },
    "Barcode Label": { bg: "#fef3c7", color: "#92400e" },
    "Shipping Label": { bg: "#d1fae5", color: "#065f46" },
    "Thank You Card": { bg: "#fce7f3", color: "#9f1239" }
  };

  const style = colors[type] || { bg: "#e5e7eb", color: "#374151" };

  return {
    padding: "4px 12px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600",
    backgroundColor: style.bg,
    color: style.color,
    display: "inline-block"
  };
};

// ==================== STYLES ====================
const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f3f4f6"
  },
  mainContent: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "20px"
  },
  pageHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px"
  },
  pageTitle: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1f2937",
    margin: 0
  },
  pageSubtitle: {
    fontSize: "14px",
    color: "#6b7280",
    marginTop: "4px"
  },
  createBtn: {
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s"
  },
  statsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginBottom: "30px"
  },
  statCard: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    textAlign: "center"
  },
  statNumber: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: "8px"
  },
  statLabel: {
    fontSize: "14px",
    color: "#6b7280",
    fontWeight: "500"
  },
  filterSection: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    marginBottom: "20px"
  },
  filterRow: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap"
  },
  searchInput: {
    flex: "1",
    minWidth: "250px",
    padding: "10px 14px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "14px"
  },
  filterSelect: {
    padding: "10px 14px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "14px",
    backgroundColor: "white",
    cursor: "pointer"
  },
  searchBtn: {
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer"
  },
  resetBtn: {
    backgroundColor: "#6b7280",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer"
  },
  tableCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    overflow: "hidden"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse"
  },
  th: {
    padding: "16px",
    textAlign: "left",
    fontSize: "13px",
    fontWeight: "600",
    color: "#374151",
    backgroundColor: "#f9fafb",
    borderBottom: "2px solid #e5e7eb"
  },
  td: {
    padding: "16px",
    fontSize: "14px",
    color: "#4b5563",
    borderBottom: "1px solid #e5e7eb"
  },
  row: {
    transition: "background-color 0.2s"
  },
  activeBadge: {
    padding: "4px 12px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600",
    backgroundColor: "#d1fae5",
    color: "#065f46"
  },
  inactiveBadge: {
    padding: "4px 12px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600",
    backgroundColor: "#fee2e2",
    color: "#991b1b"
  },
  actionBtns: {
    display: "flex",
    gap: "8px",
    justifyContent: "flex-end"
  },
  viewBtn: {
    padding: "6px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    backgroundColor: "#dbeafe",
    transition: "all 0.2s"
  },
  useBtn: {
    padding: "6px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    backgroundColor: "#d1fae5",
    transition: "all 0.2s"
  },
  editBtn: {
    padding: "6px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    backgroundColor: "#fef3c7",
    transition: "all 0.2s"
  },
  deactivateBtn: {
    padding: "6px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    backgroundColor: "#fee2e2",
    transition: "all 0.2s"
  },
  activateBtn: {
    padding: "6px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    backgroundColor: "#d1fae5",
    transition: "all 0.2s"
  },
  duplicateBtn: {
    padding: "6px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    backgroundColor: "#e0e7ff",
    transition: "all 0.2s"
  },
  deleteBtn: {
    padding: "6px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    backgroundColor: "#fee2e2",
    transition: "all 0.2s"
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: "20px"
  },
  modal: {
    backgroundColor: "white",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "600px",
    maxHeight: "90vh",
    overflow: "auto",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
  },
  confirmModal: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "30px",
    width: "100%",
    maxWidth: "500px",
    textAlign: "center",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 24px",
    borderBottom: "1px solid #e5e7eb"
  },
  modalTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#1f2937",
    margin: 0
  },
  closeBtn: {
    background: "none",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    color: "#6b7280",
    padding: "4px 8px"
  },
  form: {
    padding: "24px"
  },
  formGroup: {
    marginBottom: "20px"
  },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "8px"
  },
  input: {
    width: "100%",
    padding: "10px 14px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "14px",
    boxSizing: "border-box"
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
    fontWeight: "500",
    color: "#374151",
    cursor: "pointer"
  },
  modalActions: {
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end",
    padding: "20px 24px",
    borderTop: "1px solid #e5e7eb"
  },
  confirmActions: {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
    marginTop: "24px"
  },
  cancelBtn: {
    padding: "10px 20px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    backgroundColor: "white",
    color: "#374151",
    cursor: "pointer"
  },
  submitBtn: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    backgroundColor: "#3b82f6",
    color: "white",
    cursor: "pointer"
  },
  confirmDeleteBtn: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    backgroundColor: "#ef4444",
    color: "white",
    cursor: "pointer"
  },
  confirmIcon: {
    fontSize: "48px",
    marginBottom: "16px"
  },
  confirmTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: "12px"
  },
  confirmText: {
    fontSize: "14px",
    color: "#6b7280",
    lineHeight: "1.6"
  },
  viewContent: {
    padding: "24px"
  },
  viewRow: {
    marginBottom: "16px",
    fontSize: "14px",
    color: "#374151",
    lineHeight: "1.6"
  },
  tag: {
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "500",
    backgroundColor: "#e0e7ff",
    color: "#3730a3",
    marginRight: "8px",
    marginBottom: "8px"
  }
};
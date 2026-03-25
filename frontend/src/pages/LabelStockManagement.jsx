import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Header from "../components/Header";

export default function LabelStockManagement() {
  const [labelStocks, setLabelStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  // Filter States
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Modal States
  const [editingLabel, setEditingLabel] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [addStockModal, setAddStockModal] = useState(null);
  const [useStockModal, setUseStockModal] = useState(null);
  const [adjustStockModal, setAdjustStockModal] = useState(null);
  const [viewLogsModal, setViewLogsModal] = useState(null);

  // Form States
  const [editForm, setEditForm] = useState({
    labelName: "",
    labelType: "",
    customTypeName: "",
    minimumStock: 100,
    description: "",
    size: "",
    isActive: true
  });

  const [addStockForm, setAddStockForm] = useState({ quantity: "", reason: "" });
  const [useStockForm, setUseStockForm] = useState({ quantity: "", reason: "" });
  const [adjustStockForm, setAdjustStockForm] = useState({ newQuantity: "", reason: "" });

  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLabelStocks();
    fetchStats();
  }, []);

  const fetchLabelStocks = async () => {
    try {
      const params = {};
      if (typeFilter) params.type = typeFilter;
      if (statusFilter) params.status = statusFilter;
      if (searchTerm) params.search = searchTerm;

      const res = await api.get("/label-stocks", { params });
      setLabelStocks(res.data.labelStocks);
    } catch (error) {
      toast.error("Failed to load label stocks");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await api.get("/label-stocks/stats/overview");
      setStats(res.data.stats);
    } catch (error) {
      console.error("Failed to load stats:", error);
    }
  };

  const handleSearch = () => {
    setLoading(true);
    fetchLabelStocks();
  };

  const resetFilters = () => {
    setTypeFilter("");
    setStatusFilter("");
    setSearchTerm("");
    setLoading(true);
    fetchLabelStocks();
  };

  // ==================== EDIT ====================
  const handleEditClick = (label) => {
    setEditingLabel(label);
    setEditForm({
      labelName: label.labelName,
      labelType: label.labelType,
      customTypeName: label.customTypeName || "",
      minimumStock: label.minimumStock,
      description: label.description || "",
      size: label.size || "",
      isActive: label.isActive
    });
  };

  const handleUpdateLabel = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/label-stocks/${editingLabel._id}`, editForm);
      toast.success("Label stock updated successfully");
      setEditingLabel(null);
      fetchLabelStocks();
      fetchStats();
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  // ==================== DELETE ====================
  const confirmDelete = async () => {
    if (!deleteModal) return;
    try {
      await api.delete(`/label-stocks/${deleteModal._id}`);
      toast.success("Label stock deleted successfully");
      fetchLabelStocks();
      fetchStats();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
    setDeleteModal(null);
  };

  // ==================== ADD STOCK ====================
  const openAddStockModal = (label) => {
    setAddStockModal(label);
    setAddStockForm({ quantity: "", reason: "" });
  };

  const handleAddStock = async (e) => {
    e.preventDefault();
    if (!addStockForm.quantity || addStockForm.quantity <= 0) {
      return toast.error("Please enter valid quantity");
    }
    try {
      await api.post(`/label-stocks/${addStockModal._id}/add`, addStockForm);
      toast.success("Stock added successfully");
      setAddStockModal(null);
      setAddStockForm({ quantity: "", reason: "" });
      fetchLabelStocks();
      fetchStats();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add stock");
    }
  };

  // ==================== USE STOCK ====================
  const openUseStockModal = (label) => {
    setUseStockModal(label);
    setUseStockForm({ quantity: "", reason: "" });
  };

  const handleUseStock = async (e) => {
    e.preventDefault();
    if (!useStockForm.quantity || useStockForm.quantity <= 0) {
      return toast.error("Please enter valid quantity");
    }
    try {
      await api.post(`/label-stocks/${useStockModal._id}/use`, useStockForm);
      toast.success("Stock reduced successfully");
      setUseStockModal(null);
      setUseStockForm({ quantity: "", reason: "" });
      fetchLabelStocks();
      fetchStats();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to use stock");
    }
  };

  // ==================== ADJUST STOCK ====================
  const openAdjustStockModal = (label) => {
    setAdjustStockModal(label);
    setAdjustStockForm({ newQuantity: label.currentStock, reason: "" });
  };

  const handleAdjustStock = async (e) => {
    e.preventDefault();
    if (adjustStockForm.newQuantity === undefined || adjustStockForm.newQuantity < 0) {
      return toast.error("Please enter valid quantity");
    }
    try {
      await api.post(`/label-stocks/${adjustStockModal._id}/adjust`, adjustStockForm);
      toast.success("Stock adjusted successfully");
      setAdjustStockModal(null);
      setAdjustStockForm({ newQuantity: "", reason: "" });
      fetchLabelStocks();
      fetchStats();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to adjust stock");
    }
  };

  // ==================== VIEW LOGS ====================
  const openLogsModal = async (label) => {
    setViewLogsModal(label);
    try {
      const res = await api.get(`/label-stocks/${label._id}/logs`);
      setLogs(res.data.logs);
    } catch (error) {
      toast.error("Failed to load logs");
    }
  };

  // ==================== TOGGLE STATUS ====================
  const toggleStatus = async (labelId) => {
    try {
      await api.patch(`/label-stocks/${labelId}/toggle`);
      toast.success("Status updated");
      fetchLabelStocks();
      fetchStats();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div style={styles.container}>
      <Header />
      <div style={styles.mainContent}>

        {/* PAGE HEADER */}
        <div style={styles.pageHeader}>
          <div>
            <h2 style={styles.pageTitle}>🏷️ Label Stock Management</h2>
            <p style={styles.pageSubtitle}>Manage label and sticker inventory</p>
          </div>
          <button onClick={() => navigate("/add-label-stock")} style={styles.createBtn}>
            ➕ Add New Label Stock
          </button>
        </div>

        {/* STATS CARDS */}
        {stats && (
          <div style={styles.statsContainer}>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>{stats.total}</div>
              <div style={styles.statLabel}>Total Types</div>
            </div>
            <div style={styles.statCard}>
              <div style={{...styles.statNumber, color: "#10b981"}}>{stats.totalStockQuantity}</div>
              <div style={styles.statLabel}>Total Stock</div>
            </div>
            <div style={styles.statCard}>
              <div style={{...styles.statNumber, color: "#ef4444"}}>{stats.lowStock}</div>
              <div style={styles.statLabel}>Low Stock Items</div>
            </div>
            <div style={styles.statCard}>
              <div style={{...styles.statNumber, color: "#3b82f6"}}>{stats.active}</div>
              <div style={styles.statLabel}>Active</div>
            </div>
          </div>
        )}

        {/* LOW STOCK ALERTS */}
        {stats && stats.lowStockItems && stats.lowStockItems.length > 0 && (
          <div style={styles.alertBox}>
            <div style={styles.alertHeader}>
              <span style={styles.alertIcon}>⚠️</span>
              <strong>Low Stock Alert!</strong>
            </div>
            <div style={styles.alertContent}>
              {stats.lowStockItems.map((item, idx) => (
                <span key={idx} style={styles.alertItem}>
                  {item.labelName} ({item.currentStock}/{item.minimumStock})
                </span>
              ))}
            </div>
          </div>
        )}

        {/* FILTERS */}
        <div style={styles.filterSection}>
          <div style={styles.filterRow}>
            <input
              type="text"
              placeholder="🔍 Search labels..."
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
              <option value="Barcode Sticker">Barcode Sticker</option>
              <option value="Shipping Label">Shipping Label</option>
              <option value="Thank You Card">Thank You Card</option>
              <option value="Custom">Custom</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={styles.filterSelect}
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="low">Low Stock</option>
            </select>

            <button onClick={handleSearch} style={styles.searchBtn}>
              Search
            </button>
            <button onClick={resetFilters} style={styles.resetBtn}>
              Reset
            </button>
          </div>
        </div>

        {/* LABELS TABLE */}
        <div style={styles.tableCard}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Label Name</th>
                <th style={styles.th}>Type</th>
                <th style={styles.th}>Current Stock</th>
                <th style={styles.th}>Min Stock</th>
                <th style={styles.th}>Status</th>
                <th style={{...styles.th, textAlign: "right"}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" style={{padding: "30px", textAlign: "center"}}>
                    Loading...
                  </td>
                </tr>
              ) : labelStocks.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{padding: "30px", textAlign: "center", color: "#666"}}>
                    No label stocks found. Add your first one!
                  </td>
                </tr>
              ) : (
                labelStocks.map((label) => (
                  <tr key={label._id} style={styles.row}>
                    <td style={styles.td}>
                      <div style={{fontWeight: "600", color: "#333"}}>
                        {label.labelName}
                      </div>
                      {label.size && (
                        <div style={{fontSize: "12px", color: "#666", marginTop: "4px"}}>
                          Size: {label.size}
                        </div>
                      )}
                    </td>

                    <td style={styles.td}>
                      <span style={getTypeBadge(label.labelType)}>
                        {label.labelType === "Custom" && label.customTypeName 
                          ? label.customTypeName 
                          : label.labelType}
                      </span>
                    </td>

                    <td style={styles.td}>
                      <div style={{
                        fontWeight: "700",
                        fontSize: "18px",
                        color: label.isLowStock ? "#ef4444" : "#10b981"
                      }}>
                        {label.currentStock}
                      </div>
                    </td>

                    <td style={styles.td}>
                      <div style={{color: "#6b7280"}}>
                        {label.minimumStock}
                      </div>
                    </td>

                    <td style={styles.td}>
                      <div style={{display: "flex", flexDirection: "column", gap: "4px"}}>
                        <span style={label.isActive ? styles.activeBadge : styles.inactiveBadge}>
                          {label.isActive ? "Active" : "Inactive"}
                        </span>
                        {label.isLowStock && (
                          <span style={styles.lowStockBadge}>
                            Low Stock
                          </span>
                        )}
                      </div>
                    </td>

                    <td style={{...styles.td, textAlign: "right"}}>
                      <div style={styles.actionBtns}>
                        <button
                          onClick={() => openAddStockModal(label)}
                          style={styles.addBtn}
                          title="Add Stock"
                        >
                          ➕
                        </button>
                        <button
                          onClick={() => openUseStockModal(label)}
                          style={styles.useBtn}
                          title="Use Stock"
                        >
                          ➖
                        </button>
                        <button
                          onClick={() => openAdjustStockModal(label)}
                          style={styles.adjustBtn}
                          title="Adjust Stock"
                        >
                          ⚖️
                        </button>
                        <button
                          onClick={() => openLogsModal(label)}
                          style={styles.logsBtn}
                          title="View Logs"
                        >
                          📊
                        </button>
                        <button
                          onClick={() => handleEditClick(label)}
                          style={styles.editBtn}
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => toggleStatus(label._id)}
                          style={label.isActive ? styles.deactivateBtn : styles.activateBtn}
                          title={label.isActive ? "Deactivate" : "Activate"}
                        >
                          {label.isActive ? "⏸️" : "▶️"}
                        </button>
                        <button
                          onClick={() => setDeleteModal(label)}
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
        {editingLabel && (
          <div style={styles.modalOverlay} onClick={() => setEditingLabel(null)}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
              <div style={styles.modalHeader}>
                <h3 style={styles.modalTitle}>✏️ Edit Label Stock</h3>
                <button onClick={() => setEditingLabel(null)} style={styles.closeBtn}>✖</button>
              </div>

              <form onSubmit={handleUpdateLabel} style={styles.form}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Label Name *</label>
                  <input
                    type="text"
                    value={editForm.labelName}
                    onChange={(e) => setEditForm({...editForm, labelName: e.target.value})}
                    style={styles.input}
                    required
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Label Type *</label>
                  <select
                    value={editForm.labelType}
                    onChange={(e) => setEditForm({...editForm, labelType: e.target.value})}
                    style={styles.input}
                    required
                  >
                    <option value="Product Label">Product Label</option>
                    <option value="Barcode Sticker">Barcode Sticker</option>
                    <option value="Shipping Label">Shipping Label</option>
                    <option value="Thank You Card">Thank You Card</option>
                    <option value="Custom">Custom</option>
                  </select>
                </div>

                {editForm.labelType === "Custom" && (
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Custom Type Name</label>
                    <input
                      type="text"
                      value={editForm.customTypeName}
                      onChange={(e) => setEditForm({...editForm, customTypeName: e.target.value})}
                      style={styles.input}
                    />
                  </div>
                )}

                <div style={styles.formGroup}>
                  <label style={styles.label}>Minimum Stock Level *</label>
                  <input
                    type="number"
                    value={editForm.minimumStock}
                    onChange={(e) => setEditForm({...editForm, minimumStock: parseInt(e.target.value)})}
                    style={styles.input}
                    min="0"
                    required
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Size</label>
                  <input
                    type="text"
                    value={editForm.size}
                    onChange={(e) => setEditForm({...editForm, size: e.target.value})}
                    style={styles.input}
                    placeholder="e.g., 10cm x 5cm, A4"
                  />
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
                  <button type="button" onClick={() => setEditingLabel(null)} style={styles.cancelBtn}>
                    Cancel
                  </button>
                  <button type="submit" style={styles.submitBtn}>
                    Update
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
              <h3 style={styles.confirmTitle}>Delete Label Stock?</h3>
              <p style={styles.confirmText}>
                Are you sure you want to delete "<strong>{deleteModal.labelName}</strong>"?
                <br />This will also delete all associated logs.
              </p>
              <div style={styles.confirmActions}>
                <button onClick={() => setDeleteModal(null)} style={styles.cancelBtn}>Cancel</button>
                <button onClick={confirmDelete} style={styles.confirmDeleteBtn}>Delete</button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== ADD STOCK MODAL ==================== */}
        {addStockModal && (
          <div style={styles.modalOverlay} onClick={() => setAddStockModal(null)}>
            <div style={styles.confirmModal} onClick={(e) => e.stopPropagation()}>
              <div style={styles.confirmIcon}>➕</div>
              <h3 style={styles.confirmTitle}>Add Stock</h3>
              <p style={styles.confirmText}>
                Current Stock: <strong>{addStockModal.currentStock}</strong>
              </p>
              <form onSubmit={handleAddStock}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Quantity to Add *</label>
                  <input
                    type="number"
                    value={addStockForm.quantity}
                    onChange={(e) => setAddStockForm({...addStockForm, quantity: e.target.value})}
                    style={styles.input}
                    min="1"
                    required
                    autoFocus
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Reason</label>
                  <input
                    type="text"
                    value={addStockForm.reason}
                    onChange={(e) => setAddStockForm({...addStockForm, reason: e.target.value})}
                    style={styles.input}
                    placeholder="e.g., New purchase"
                  />
                </div>
                <div style={styles.confirmActions}>
                  <button type="button" onClick={() => setAddStockModal(null)} style={styles.cancelBtn}>Cancel</button>
                  <button type="submit" style={styles.submitBtn}>Add Stock</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ==================== USE STOCK MODAL ==================== */}
        {useStockModal && (
          <div style={styles.modalOverlay} onClick={() => setUseStockModal(null)}>
            <div style={styles.confirmModal} onClick={(e) => e.stopPropagation()}>
              <div style={styles.confirmIcon}>➖</div>
              <h3 style={styles.confirmTitle}>Use Stock</h3>
              <p style={styles.confirmText}>
                Available Stock: <strong>{useStockModal.currentStock}</strong>
              </p>
              <form onSubmit={handleUseStock}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Quantity to Use *</label>
                  <input
                    type="number"
                    value={useStockForm.quantity}
                    onChange={(e) => setUseStockForm({...useStockForm, quantity: e.target.value})}
                    style={styles.input}
                    min="1"
                    max={useStockModal.currentStock}
                    required
                    autoFocus
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Reason</label>
                  <input
                    type="text"
                    value={useStockForm.reason}
                    onChange={(e) => setUseStockForm({...useStockForm, reason: e.target.value})}
                    style={styles.input}
                    placeholder="e.g., Used for products"
                  />
                </div>
                <div style={styles.confirmActions}>
                  <button type="button" onClick={() => setUseStockModal(null)} style={styles.cancelBtn}>Cancel</button>
                  <button type="submit" style={styles.submitBtn}>Use Stock</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ==================== ADJUST STOCK MODAL ==================== */}
        {adjustStockModal && (
          <div style={styles.modalOverlay} onClick={() => setAdjustStockModal(null)}>
            <div style={styles.confirmModal} onClick={(e) => e.stopPropagation()}>
              <div style={styles.confirmIcon}>⚖️</div>
              <h3 style={styles.confirmTitle}>Adjust Stock</h3>
              <p style={styles.confirmText}>
                Current Stock: <strong>{adjustStockModal.currentStock}</strong>
              </p>
              <form onSubmit={handleAdjustStock}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>New Quantity *</label>
                  <input
                    type="number"
                    value={adjustStockForm.newQuantity}
                    onChange={(e) => setAdjustStockForm({...adjustStockForm, newQuantity: parseInt(e.target.value)})}
                    style={styles.input}
                    min="0"
                    required
                    autoFocus
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Reason *</label>
                  <input
                    type="text"
                    value={adjustStockForm.reason}
                    onChange={(e) => setAdjustStockForm({...adjustStockForm, reason: e.target.value})}
                    style={styles.input}
                    placeholder="e.g., Physical count correction"
                    required
                  />
                </div>
                <div style={styles.confirmActions}>
                  <button type="button" onClick={() => setAdjustStockModal(null)} style={styles.cancelBtn}>Cancel</button>
                  <button type="submit" style={styles.submitBtn}>Adjust</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ==================== VIEW LOGS MODAL ==================== */}
        {viewLogsModal && (
          <div style={styles.modalOverlay} onClick={() => setViewLogsModal(null)}>
            <div style={{...styles.modal, maxWidth: "800px"}} onClick={(e) => e.stopPropagation()}>
              <div style={styles.modalHeader}>
                <h3 style={styles.modalTitle}>📊 Stock Movement Logs</h3>
                <button onClick={() => setViewLogsModal(null)} style={styles.closeBtn}>✖</button>
              </div>

              <div style={{padding: "24px", maxHeight: "500px", overflow: "auto"}}>
                <h4 style={{margin: "0 0 16px", fontSize: "16px"}}>
                  {viewLogsModal.labelName}
                </h4>
                {logs.length === 0 ? (
                  <p style={{color: "#666", textAlign: "center", padding: "20px"}}>
                    No activity logs yet
                  </p>
                ) : (
                  <table style={{...styles.table, width: "100%"}}>
                    <thead>
                      <tr>
                        <th style={{...styles.th, fontSize: "12px"}}>Date</th>
                        <th style={{...styles.th, fontSize: "12px"}}>Action</th>
                        <th style={{...styles.th, fontSize: "12px"}}>Qty</th>
                        <th style={{...styles.th, fontSize: "12px"}}>Before</th>
                        <th style={{...styles.th, fontSize: "12px"}}>After</th>
                        <th style={{...styles.th, fontSize: "12px"}}>By</th>
                        <th style={{...styles.th, fontSize: "12px"}}>Reason</th>
                      </tr>
                    </thead>
                    <tbody>
                      {logs.map((log) => (
                        <tr key={log._id}>
                          <td style={{...styles.td, fontSize: "12px"}}>
                            {new Date(log.createdAt).toLocaleDateString()}
                          </td>
                          <td style={{...styles.td, fontSize: "12px"}}>
                            <span style={getActionBadge(log.actionType)}>
                              {log.actionType}
                            </span>
                          </td>
                          <td style={{...styles.td, fontSize: "12px", fontWeight: "600"}}>
                            {log.quantity}
                          </td>
                          <td style={{...styles.td, fontSize: "12px"}}>{log.stockBefore}</td>
                          <td style={{...styles.td, fontSize: "12px", fontWeight: "600"}}>
                            {log.stockAfter}
                          </td>
                          <td style={{...styles.td, fontSize: "11px"}}>
                            {log.performedBy?.name || log.performedByName}
                          </td>
                          <td style={{...styles.td, fontSize: "11px", color: "#666"}}>
                            {log.reason || "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              <div style={styles.modalActions}>
                <button onClick={() => setViewLogsModal(null)} style={styles.submitBtn}>
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

// ==================== HELPER FUNCTIONS ====================
const getTypeBadge = (type) => {
  const colors = {
    "Product Label": { bg: "#dbeafe", color: "#1e40af" },
    "Barcode Sticker": { bg: "#fef3c7", color: "#92400e" },
    "Shipping Label": { bg: "#d1fae5", color: "#065f46" },
    "Thank You Card": { bg: "#fce7f3", color: "#9f1239" },
    "Custom": { bg: "#e0e7ff", color: "#3730a3" }
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

const getActionBadge = (action) => {
  const colors = {
    "ADD": { bg: "#d1fae5", color: "#065f46" },
    "USE": { bg: "#fee2e2", color: "#991b1b" },
    "ADJUST": { bg: "#fef3c7", color: "#92400e" }
  };

  const style = colors[action] || { bg: "#e5e7eb", color: "#374151" };

  return {
    padding: "2px 8px",
    borderRadius: "8px",
    fontSize: "11px",
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
    cursor: "pointer"
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
  alertBox: {
    backgroundColor: "#fef3c7",
    border: "2px solid #fbbf24",
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "20px"
  },
  alertHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "12px",
    color: "#92400e",
    fontSize: "14px",
    fontWeight: "600"
  },
  alertIcon: {
    fontSize: "20px"
  },
  alertContent: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px"
  },
  alertItem: {
    backgroundColor: "white",
    padding: "6px 12px",
    borderRadius: "8px",
    fontSize: "13px",
    color: "#78350f",
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
    color: "#065f46",
    display: "inline-block"
  },
  inactiveBadge: {
    padding: "4px 12px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600",
    backgroundColor: "#fee2e2",
    color: "#991b1b",
    display: "inline-block"
  },
  lowStockBadge: {
    padding: "4px 12px",
    borderRadius: "12px",
    fontSize: "11px",
    fontWeight: "600",
    backgroundColor: "#fef3c7",
    color: "#92400e",
    display: "inline-block"
  },
  actionBtns: {
    display: "flex",
    gap: "6px",
    justifyContent: "flex-end",
    flexWrap: "wrap"
  },
  addBtn: {
    padding: "6px 10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    backgroundColor: "#d1fae5",
    transition: "all 0.2s"
  },
  useBtn: {
    padding: "6px 10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    backgroundColor: "#fee2e2",
    transition: "all 0.2s"
  },
  adjustBtn: {
    padding: "6px 10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    backgroundColor: "#fef3c7",
    transition: "all 0.2s"
  },
  logsBtn: {
    padding: "6px 10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    backgroundColor: "#e0e7ff",
    transition: "all 0.2s"
  },
  editBtn: {
    padding: "6px 10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    backgroundColor: "#dbeafe",
    transition: "all 0.2s"
  },
  deactivateBtn: {
    padding: "6px 10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    backgroundColor: "#fee2e2",
    transition: "all 0.2s"
  },
  activateBtn: {
    padding: "6px 10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    backgroundColor: "#d1fae5",
    transition: "all 0.2s"
  },
  deleteBtn: {
    padding: "6px 10px",
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
    lineHeight: "1.6",
    marginBottom: "16px"
  }
};
// // // // import React, { useEffect, useState } from "react";
// // // // import api from "../api/axios";
// // // // import { useNavigate } from "react-router-dom";
// // // // import toast from "react-hot-toast";
// // // // import Header from "../components/Header";

// // // // export default function PackZoneManagement() {
// // // //   const [items, setItems] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [stats, setStats] = useState(null);
// // // //   const navigate = useNavigate();

// // // //   // Filter States
// // // //   const [categoryFilter, setCategoryFilter] = useState("");
// // // //   const [subCategoryFilter, setSubCategoryFilter] = useState("");
// // // //   const [statusFilter, setStatusFilter] = useState("");
// // // //   const [searchTerm, setSearchTerm] = useState("");

// // // //   // Modal States
// // // //   const [editingItem, setEditingItem] = useState(null);
// // // //   const [deleteModal, setDeleteModal] = useState(null);
// // // //   const [addStockModal, setAddStockModal] = useState(null);
// // // //   const [useStockModal, setUseStockModal] = useState(null);
// // // //   const [adjustStockModal, setAdjustStockModal] = useState(null);
// // // //   const [viewLogsModal, setViewLogsModal] = useState(null);

// // // //   // Form States
// // // //   const [editForm, setEditForm] = useState({
// // // //     itemName: "",
// // // //     size: "",
// // // //     category: "",
// // // //     subCategory: "",
// // // //     unit: "",
// // // //     minimumStock: 50,
// // // //     status: "Active",
// // // //     description: ""
// // // //   });

// // // //   const [addStockForm, setAddStockForm] = useState({ quantity: "", reason: "" });
// // // //   const [useStockForm, setUseStockForm] = useState({ quantity: "", reason: "" });
// // // //   const [adjustStockForm, setAdjustStockForm] = useState({ newQuantity: "", reason: "" });

// // // //   const [logs, setLogs] = useState([]);

// // // //   // Sub-category options based on category
// // // //   const subCategoryOptions = {
// // // //     "Label": ["Thank You Card", "Brand Tag", "Product Label"],
// // // //     "Wrapping": ["Packaging Tape", "Poly Bags", "Box"]
// // // //   };

// // // //   useEffect(() => {
// // // //     fetchItems();
// // // //     fetchStats();
// // // //   }, []);

// // // //   const fetchItems = async () => {
// // // //     try {
// // // //       const params = {};
// // // //       if (categoryFilter) params.category = categoryFilter;
// // // //       if (subCategoryFilter) params.subCategory = subCategoryFilter;
// // // //       if (statusFilter) params.status = statusFilter;
// // // //       if (searchTerm) params.search = searchTerm;

// // // //       const res = await api.get("/packzone", { params });
// // // //       setItems(res.data.items);
// // // //     } catch (error) {
// // // //       toast.error("Failed to load items");
// // // //       console.error(error);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const fetchStats = async () => {
// // // //     try {
// // // //       const res = await api.get("/packzone/stats/overview");
// // // //       setStats(res.data.stats);
// // // //     } catch (error) {
// // // //       console.error("Failed to load stats:", error);
// // // //     }
// // // //   };

// // // //   const handleSearch = () => {
// // // //     setLoading(true);
// // // //     fetchItems();
// // // //   };

// // // //   const resetFilters = () => {
// // // //     setCategoryFilter("");
// // // //     setSubCategoryFilter("");
// // // //     setStatusFilter("");
// // // //     setSearchTerm("");
// // // //     setLoading(true);
// // // //     fetchItems();
// // // //   };

// // // //   // ==================== EDIT ====================
// // // //   const handleEditClick = (item) => {
// // // //     setEditingItem(item);
// // // //     setEditForm({
// // // //       itemName: item.itemName,
// // // //       size: item.size,
// // // //       category: item.category,
// // // //       subCategory: item.subCategory,
// // // //       unit: item.unit,
// // // //       minimumStock: item.minimumStock,
// // // //       status: item.status,
// // // //       description: item.description || ""
// // // //     });
// // // //   };

// // // //   const handleUpdateItem = async (e) => {
// // // //     e.preventDefault();
// // // //     try {
// // // //       await api.put(`/packzone/${editingItem._id}`, editForm);
// // // //       toast.success("Item updated successfully");
// // // //       setEditingItem(null);
// // // //       fetchItems();
// // // //       fetchStats();
// // // //     } catch (error) {
// // // //       toast.error(error.response?.data?.message || "Update failed");
// // // //     }
// // // //   };

// // // //   // ==================== DELETE ====================
// // // //   const confirmDelete = async () => {
// // // //     if (!deleteModal) return;
// // // //     try {
// // // //       await api.delete(`/packzone/${deleteModal._id}`);
// // // //       toast.success("Item deleted successfully");
// // // //       fetchItems();
// // // //       fetchStats();
// // // //     } catch (error) {
// // // //       toast.error(error.response?.data?.message || "Delete failed");
// // // //     }
// // // //     setDeleteModal(null);
// // // //   };

// // // //   // ==================== ADD STOCK ====================
// // // //   const openAddStockModal = (item) => {
// // // //     setAddStockModal(item);
// // // //     setAddStockForm({ quantity: "", reason: "" });
// // // //   };

// // // //   const handleAddStock = async (e) => {
// // // //     e.preventDefault();
// // // //     if (!addStockForm.quantity || addStockForm.quantity <= 0) {
// // // //       return toast.error("Please enter valid quantity");
// // // //     }
// // // //     try {
// // // //       await api.post(`/packzone/${addStockModal._id}/add`, addStockForm);
// // // //       toast.success("Stock added successfully");
// // // //       setAddStockModal(null);
// // // //       setAddStockForm({ quantity: "", reason: "" });
// // // //       fetchItems();
// // // //       fetchStats();
// // // //     } catch (error) {
// // // //       toast.error(error.response?.data?.message || "Failed to add stock");
// // // //     }
// // // //   };

// // // //   // ==================== USE STOCK ====================
// // // //   const openUseStockModal = (item) => {
// // // //     setUseStockModal(item);
// // // //     setUseStockForm({ quantity: "", reason: "" });
// // // //   };

// // // //   const handleUseStock = async (e) => {
// // // //     e.preventDefault();
// // // //     if (!useStockForm.quantity || useStockForm.quantity <= 0) {
// // // //       return toast.error("Please enter valid quantity");
// // // //     }
// // // //     try {
// // // //       await api.post(`/packzone/${useStockModal._id}/use`, useStockForm);
// // // //       toast.success("Stock reduced successfully");
// // // //       setUseStockModal(null);
// // // //       setUseStockForm({ quantity: "", reason: "" });
// // // //       fetchItems();
// // // //       fetchStats();
// // // //     } catch (error) {
// // // //       toast.error(error.response?.data?.message || "Failed to use stock");
// // // //     }
// // // //   };

// // // //   // ==================== ADJUST STOCK ====================
// // // //   const openAdjustStockModal = (item) => {
// // // //     setAdjustStockModal(item);
// // // //     setAdjustStockForm({ newQuantity: item.qty, reason: "" });
// // // //   };

// // // //   const handleAdjustStock = async (e) => {
// // // //     e.preventDefault();
// // // //     if (adjustStockForm.newQuantity === undefined || adjustStockForm.newQuantity < 0) {
// // // //       return toast.error("Please enter valid quantity");
// // // //     }
// // // //     try {
// // // //       await api.post(`/packzone/${adjustStockModal._id}/adjust`, adjustStockForm);
// // // //       toast.success("Stock adjusted successfully");
// // // //       setAdjustStockModal(null);
// // // //       setAdjustStockForm({ newQuantity: "", reason: "" });
// // // //       fetchItems();
// // // //       fetchStats();
// // // //     } catch (error) {
// // // //       toast.error(error.response?.data?.message || "Failed to adjust stock");
// // // //     }
// // // //   };

// // // //   // ==================== VIEW LOGS ====================
// // // //   const openLogsModal = async (item) => {
// // // //     setViewLogsModal(item);
// // // //     try {
// // // //       const res = await api.get(`/packzone/${item._id}/logs`);
// // // //       setLogs(res.data.logs);
// // // //     } catch (error) {
// // // //       toast.error("Failed to load logs");
// // // //     }
// // // //   };

// // // //   // ==================== TOGGLE STATUS ====================
// // // //   const toggleStatus = async (itemId) => {
// // // //     try {
// // // //       await api.patch(`/packzone/${itemId}/toggle`);
// // // //       toast.success("Status updated");
// // // //       fetchItems();
// // // //       fetchStats();
// // // //     } catch (error) {
// // // //       toast.error("Failed to update status");
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div style={styles.container}>
// // // //       <Header />
// // // //       <div style={styles.mainContent}>

// // // //         {/* PAGE HEADER */}
// // // //         <div style={styles.pageHeader}>
// // // //           <div>
// // // //             <h2 style={styles.pageTitle}>📦 PackZone Management</h2>
// // // //             <p style={styles.pageSubtitle}>Manage packaging materials inventory</p>
// // // //           </div>
// // // //           <button onClick={() => navigate("/add-packzone")} style={styles.createBtn}>
// // // //             ➕ Add New Item
// // // //           </button>
// // // //         </div>

// // // //         {/* STATS CARDS */}
// // // //         {stats && (
// // // //           <div style={styles.statsContainer}>
// // // //             <div style={styles.statCard}>
// // // //               <div style={styles.statNumber}>{stats.total}</div>
// // // //               <div style={styles.statLabel}>Total Items</div>
// // // //             </div>
// // // //             <div style={styles.statCard}>
// // // //               <div style={{...styles.statNumber, color: "#10b981"}}>{stats.active}</div>
// // // //               <div style={styles.statLabel}>Active Items</div>
// // // //             </div>
// // // //             <div style={styles.statCard}>
// // // //               <div style={{...styles.statNumber, color: "#ef4444"}}>{stats.lowStock}</div>
// // // //               <div style={styles.statLabel}>Low Stock</div>
// // // //             </div>
// // // //             {stats.byCategory && stats.byCategory.map((cat, idx) => (
// // // //               <div key={idx} style={styles.statCard}>
// // // //                 <div style={{...styles.statNumber, color: "#3b82f6"}}>{cat.count}</div>
// // // //                 <div style={styles.statLabel}>{cat._id}</div>
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //         )}

// // // //         {/* LOW STOCK ALERTS */}
// // // //         {stats && stats.lowStockList && stats.lowStockList.length > 0 && (
// // // //           <div style={styles.alertBox}>
// // // //             <div style={styles.alertHeader}>
// // // //               <span style={styles.alertIcon}>⚠️</span>
// // // //               <strong>Low Stock Alert!</strong>
// // // //             </div>
// // // //             <div style={styles.alertContent}>
// // // //               {stats.lowStockList.map((item, idx) => (
// // // //                 <span key={idx} style={styles.alertItem}>
// // // //                   {item.itemName} ({item.qty}/{item.minimumStock} {item.unit})
// // // //                 </span>
// // // //               ))}
// // // //             </div>
// // // //           </div>
// // // //         )}

// // // //         {/* FILTERS */}
// // // //         <div style={styles.filterSection}>
// // // //           <div style={styles.filterRow}>
// // // //             <input
// // // //               type="text"
// // // //               placeholder="🔍 Search items..."
// // // //               value={searchTerm}
// // // //               onChange={(e) => setSearchTerm(e.target.value)}
// // // //               style={styles.searchInput}
// // // //             />

// // // //             <select
// // // //               value={categoryFilter}
// // // //               onChange={(e) => {
// // // //                 setCategoryFilter(e.target.value);
// // // //                 setSubCategoryFilter(""); // Reset sub-category
// // // //               }}
// // // //               style={styles.filterSelect}
// // // //             >
// // // //               <option value="">All Categories</option>
// // // //               <option value="Label">Label</option>
// // // //               <option value="Wrapping">Wrapping</option>
// // // //             </select>

// // // //             <select
// // // //               value={subCategoryFilter}
// // // //               onChange={(e) => setSubCategoryFilter(e.target.value)}
// // // //               style={styles.filterSelect}
// // // //               disabled={!categoryFilter}
// // // //             >
// // // //               <option value="">All Sub-Categories</option>
// // // //               {categoryFilter && subCategoryOptions[categoryFilter]?.map((sub) => (
// // // //                 <option key={sub} value={sub}>{sub}</option>
// // // //               ))}
// // // //             </select>

// // // //             <select
// // // //               value={statusFilter}
// // // //               onChange={(e) => setStatusFilter(e.target.value)}
// // // //               style={styles.filterSelect}
// // // //             >
// // // //               <option value="">All Status</option>
// // // //               <option value="Active">Active</option>
// // // //               <option value="Inactive">Inactive</option>
// // // //             </select>

// // // //             <button onClick={handleSearch} style={styles.searchBtn}>
// // // //               Search
// // // //             </button>
// // // //             <button onClick={resetFilters} style={styles.resetBtn}>
// // // //               Reset
// // // //             </button>
// // // //           </div>
// // // //         </div>

// // // //         {/* ITEMS TABLE */}
// // // //         <div style={styles.tableCard}>
// // // //           <table style={styles.table}>
// // // //             <thead>
// // // //               <tr>
// // // //                 <th style={styles.th}>Item Name</th>
// // // //                 <th style={styles.th}>Size (L×W×H)</th>
// // // //                 <th style={styles.th}>Category</th>
// // // //                 <th style={styles.th}>Sub-Category</th>
// // // //                 <th style={styles.th}>Qty</th>
// // // //                 <th style={styles.th}>Unit</th>
// // // //                 <th style={styles.th}>Min Stock</th>
// // // //                 <th style={styles.th}>Status</th>
// // // //                 <th style={{...styles.th, textAlign: "right"}}>Actions</th>
// // // //               </tr>
// // // //             </thead>
// // // //             <tbody>
// // // //               {loading ? (
// // // //                 <tr>
// // // //                   <td colSpan="9" style={{padding: "30px", textAlign: "center"}}>
// // // //                     Loading...
// // // //                   </td>
// // // //                 </tr>
// // // //               ) : items.length === 0 ? (
// // // //                 <tr>
// // // //                   <td colSpan="9" style={{padding: "30px", textAlign: "center", color: "#666"}}>
// // // //                     No items found. Add your first item!
// // // //                   </td>
// // // //                 </tr>
// // // //               ) : (
// // // //                 items.map((item) => (
// // // //                   <tr key={item._id} style={styles.row}>
// // // //                     <td style={styles.td}>
// // // //                       <div style={{fontWeight: "600", color: "#333"}}>
// // // //                         {item.itemName}
// // // //                       </div>
// // // //                       {item.description && (
// // // //                         <div style={{fontSize: "11px", color: "#666", marginTop: "2px"}}>
// // // //                           {item.description.substring(0, 40)}
// // // //                           {item.description.length > 40 ? "..." : ""}
// // // //                         </div>
// // // //                       )}
// // // //                     </td>

// // // //                     <td style={styles.td}>
// // // //                       <span style={{fontSize: "13px", color: "#6b7280"}}>
// // // //                         {item.size}
// // // //                       </span>
// // // //                     </td>

// // // //                     <td style={styles.td}>
// // // //                       <span style={getCategoryBadge(item.category)}>
// // // //                         {item.category}
// // // //                       </span>
// // // //                     </td>

// // // //                     <td style={styles.td}>
// // // //                       <span style={getSubCategoryBadge(item.subCategory)}>
// // // //                         {item.subCategory}
// // // //                       </span>
// // // //                     </td>

// // // //                     <td style={styles.td}>
// // // //                       <div style={{
// // // //                         fontWeight: "700",
// // // //                         fontSize: "16px",
// // // //                         color: item.isLowStock ? "#ef4444" : "#10b981"
// // // //                       }}>
// // // //                         {item.qty}
// // // //                       </div>
// // // //                     </td>

// // // //                     <td style={styles.td}>
// // // //                       <span style={{fontSize: "12px", color: "#6b7280"}}>
// // // //                         {item.unit}
// // // //                       </span>
// // // //                     </td>

// // // //                     <td style={styles.td}>
// // // //                       <div style={{color: "#6b7280", fontSize: "14px"}}>
// // // //                         {item.minimumStock}
// // // //                       </div>
// // // //                     </td>

// // // //                     <td style={styles.td}>
// // // //                       <div style={{display: "flex", flexDirection: "column", gap: "4px"}}>
// // // //                         <span style={item.status === "Active" ? styles.activeBadge : styles.inactiveBadge}>
// // // //                           {item.status}
// // // //                         </span>
// // // //                         {item.isLowStock && (
// // // //                           <span style={styles.lowStockBadge}>
// // // //                             Low Stock
// // // //                           </span>
// // // //                         )}
// // // //                       </div>
// // // //                     </td>

// // // //                     <td style={{...styles.td, textAlign: "right"}}>
// // // //                       <div style={styles.actionBtns}>
// // // //                         <button
// // // //                           onClick={() => openAddStockModal(item)}
// // // //                           style={styles.addBtn}
// // // //                           title="Add Stock"
// // // //                         >
// // // //                           ➕
// // // //                         </button>
// // // //                         <button
// // // //                           onClick={() => openUseStockModal(item)}
// // // //                           style={styles.useBtn}
// // // //                           title="Use Stock"
// // // //                         >
// // // //                           ➖
// // // //                         </button>
// // // //                         <button
// // // //                           onClick={() => openAdjustStockModal(item)}
// // // //                           style={styles.adjustBtn}
// // // //                           title="Adjust Stock"
// // // //                         >
// // // //                           ⚖️
// // // //                         </button>
// // // //                         <button
// // // //                           onClick={() => openLogsModal(item)}
// // // //                           style={styles.logsBtn}
// // // //                           title="View Logs"
// // // //                         >
// // // //                           📊
// // // //                         </button>
// // // //                         <button
// // // //                           onClick={() => handleEditClick(item)}
// // // //                           style={styles.editBtn}
// // // //                           title="Edit"
// // // //                         >
// // // //                           ✏️
// // // //                         </button>
// // // //                         <button
// // // //                           onClick={() => toggleStatus(item._id)}
// // // //                           style={item.status === "Active" ? styles.deactivateBtn : styles.activateBtn}
// // // //                           title={item.status === "Active" ? "Deactivate" : "Activate"}
// // // //                         >
// // // //                           {item.status === "Active" ? "⏸️" : "▶️"}
// // // //                         </button>
// // // //                         <button
// // // //                           onClick={() => setDeleteModal(item)}
// // // //                           style={styles.deleteBtn}
// // // //                           title="Delete"
// // // //                         >
// // // //                           🗑️
// // // //                         </button>
// // // //                       </div>
// // // //                     </td>
// // // //                   </tr>
// // // //                 ))
// // // //               )}
// // // //             </tbody>
// // // //           </table>
// // // //         </div>

// // // //         {/* MODALS - Same as before but adapted for PackZone */}
// // // //         {/* EDIT MODAL */}
// // // //         {editingItem && (
// // // //           <div style={styles.modalOverlay} onClick={() => setEditingItem(null)}>
// // // //             <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
// // // //               <div style={styles.modalHeader}>
// // // //                 <h3 style={styles.modalTitle}>✏️ Edit Item</h3>
// // // //                 <button onClick={() => setEditingItem(null)} style={styles.closeBtn}>✖</button>
// // // //               </div>

// // // //               <form onSubmit={handleUpdateItem} style={styles.form}>
// // // //                 <div style={styles.formGroup}>
// // // //                   <label style={styles.label}>Item Name *</label>
// // // //                   <input
// // // //                     type="text"
// // // //                     value={editForm.itemName}
// // // //                     onChange={(e) => setEditForm({...editForm, itemName: e.target.value})}
// // // //                     style={styles.input}
// // // //                     required
// // // //                   />
// // // //                 </div>

// // // //                 <div style={styles.formGroup}>
// // // //                   <label style={styles.label}>Size (L×W×H) *</label>
// // // //                   <input
// // // //                     type="text"
// // // //                     value={editForm.size}
// // // //                     onChange={(e) => setEditForm({...editForm, size: e.target.value})}
// // // //                     style={styles.input}
// // // //                     placeholder="e.g., 10cm×5cm×2cm"
// // // //                     required
// // // //                   />
// // // //                 </div>

// // // //                 <div style={styles.row}>
// // // //                   <div style={styles.formGroup}>
// // // //                     <label style={styles.label}>Category *</label>
// // // //                     <select
// // // //                       value={editForm.category}
// // // //                       onChange={(e) => {
// // // //                         setEditForm({...editForm, category: e.target.value, subCategory: ""});
// // // //                       }}
// // // //                       style={styles.input}
// // // //                       required
// // // //                     >
// // // //                       <option value="">Select Category</option>
// // // //                       <option value="Label">Label</option>
// // // //                       <option value="Wrapping">Wrapping</option>
// // // //                     </select>
// // // //                   </div>

// // // //                   <div style={styles.formGroup}>
// // // //                     <label style={styles.label}>Sub-Category *</label>
// // // //                     <select
// // // //                       value={editForm.subCategory}
// // // //                       onChange={(e) => setEditForm({...editForm, subCategory: e.target.value})}
// // // //                       style={styles.input}
// // // //                       required
// // // //                       disabled={!editForm.category}
// // // //                     >
// // // //                       <option value="">Select Sub-Category</option>
// // // //                       {editForm.category && subCategoryOptions[editForm.category]?.map((sub) => (
// // // //                         <option key={sub} value={sub}>{sub}</option>
// // // //                       ))}
// // // //                     </select>
// // // //                   </div>
// // // //                 </div>

// // // //                 <div style={styles.row}>
// // // //                   <div style={styles.formGroup}>
// // // //                     <label style={styles.label}>Unit *</label>
// // // //                     <select
// // // //                       value={editForm.unit}
// // // //                       onChange={(e) => setEditForm({...editForm, unit: e.target.value})}
// // // //                       style={styles.input}
// // // //                       required
// // // //                     >
// // // //                       <option value="">Select Unit</option>
// // // //                       <option value="Roll">Roll</option>
// // // //                       <option value="Piece">Piece</option>
// // // //                       <option value="Pack">Pack</option>
// // // //                       <option value="Box">Box</option>
// // // //                       <option value="Sheet">Sheet</option>
// // // //                       <option value="Meter">Meter</option>
// // // //                     </select>
// // // //                   </div>

// // // //                   <div style={styles.formGroup}>
// // // //                     <label style={styles.label}>Minimum Stock *</label>
// // // //                     <input
// // // //                       type="number"
// // // //                       value={editForm.minimumStock}
// // // //                       onChange={(e) => setEditForm({...editForm, minimumStock: parseInt(e.target.value)})}
// // // //                       style={styles.input}
// // // //                       min="0"
// // // //                       required
// // // //                     />
// // // //                   </div>
// // // //                 </div>

// // // //                 <div style={styles.formGroup}>
// // // //                   <label style={styles.label}>Status *</label>
// // // //                   <select
// // // //                     value={editForm.status}
// // // //                     onChange={(e) => setEditForm({...editForm, status: e.target.value})}
// // // //                     style={styles.input}
// // // //                     required
// // // //                   >
// // // //                     <option value="Active">Active</option>
// // // //                     <option value="Inactive">Inactive</option>
// // // //                   </select>
// // // //                 </div>

// // // //                 <div style={styles.formGroup}>
// // // //                   <label style={styles.label}>Description</label>
// // // //                   <textarea
// // // //                     value={editForm.description}
// // // //                     onChange={(e) => setEditForm({...editForm, description: e.target.value})}
// // // //                     style={{...styles.input, minHeight: "80px"}}
// // // //                     rows="3"
// // // //                   />
// // // //                 </div>

// // // //                 <div style={styles.modalActions}>
// // // //                   <button type="button" onClick={() => setEditingItem(null)} style={styles.cancelBtn}>
// // // //                     Cancel
// // // //                   </button>
// // // //                   <button type="submit" style={styles.submitBtn}>
// // // //                     Update
// // // //                   </button>
// // // //                 </div>
// // // //               </form>
// // // //             </div>
// // // //           </div>
// // // //         )}

// // // //         {/* DELETE MODAL */}
// // // //         {deleteModal && (
// // // //           <div style={styles.modalOverlay} onClick={() => setDeleteModal(null)}>
// // // //             <div style={styles.confirmModal} onClick={(e) => e.stopPropagation()}>
// // // //               <div style={styles.confirmIcon}>🗑️</div>
// // // //               <h3 style={styles.confirmTitle}>Delete Item?</h3>
// // // //               <p style={styles.confirmText}>
// // // //                 Are you sure you want to delete "<strong>{deleteModal.itemName}</strong>"?
// // // //                 <br />This will also delete all associated logs.
// // // //               </p>
// // // //               <div style={styles.confirmActions}>
// // // //                 <button onClick={() => setDeleteModal(null)} style={styles.cancelBtn}>Cancel</button>
// // // //                 <button onClick={confirmDelete} style={styles.confirmDeleteBtn}>Delete</button>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         )}

// // // //         {/* ADD STOCK MODAL */}
// // // //         {addStockModal && (
// // // //           <div style={styles.modalOverlay} onClick={() => setAddStockModal(null)}>
// // // //             <div style={styles.confirmModal} onClick={(e) => e.stopPropagation()}>
// // // //               <div style={styles.confirmIcon}>➕</div>
// // // //               <h3 style={styles.confirmTitle}>Add Stock</h3>
// // // //               <p style={styles.confirmText}>
// // // //                 Current: <strong>{addStockModal.qty} {addStockModal.unit}</strong>
// // // //               </p>
// // // //               <form onSubmit={handleAddStock}>
// // // //                 <div style={styles.formGroup}>
// // // //                   <label style={styles.label}>Quantity to Add *</label>
// // // //                   <input
// // // //                     type="number"
// // // //                     value={addStockForm.quantity}
// // // //                     onChange={(e) => setAddStockForm({...addStockForm, quantity: e.target.value})}
// // // //                     style={styles.input}
// // // //                     min="1"
// // // //                     required
// // // //                     autoFocus
// // // //                   />
// // // //                 </div>
// // // //                 <div style={styles.formGroup}>
// // // //                   <label style={styles.label}>Reason</label>
// // // //                   <input
// // // //                     type="text"
// // // //                     value={addStockForm.reason}
// // // //                     onChange={(e) => setAddStockForm({...addStockForm, reason: e.target.value})}
// // // //                     style={styles.input}
// // // //                     placeholder="e.g., New purchase"
// // // //                   />
// // // //                 </div>
// // // //                 <div style={styles.confirmActions}>
// // // //                   <button type="button" onClick={() => setAddStockModal(null)} style={styles.cancelBtn}>Cancel</button>
// // // //                   <button type="submit" style={styles.submitBtn}>Add Stock</button>
// // // //                 </div>
// // // //               </form>
// // // //             </div>
// // // //           </div>
// // // //         )}

// // // //         {/* USE STOCK MODAL */}
// // // //         {useStockModal && (
// // // //           <div style={styles.modalOverlay} onClick={() => setUseStockModal(null)}>
// // // //             <div style={styles.confirmModal} onClick={(e) => e.stopPropagation()}>
// // // //               <div style={styles.confirmIcon}>➖</div>
// // // //               <h3 style={styles.confirmTitle}>Use Stock</h3>
// // // //               <p style={styles.confirmText}>
// // // //                 Available: <strong>{useStockModal.qty} {useStockModal.unit}</strong>
// // // //               </p>
// // // //               <form onSubmit={handleUseStock}>
// // // //                 <div style={styles.formGroup}>
// // // //                   <label style={styles.label}>Quantity to Use *</label>
// // // //                   <input
// // // //                     type="number"
// // // //                     value={useStockForm.quantity}
// // // //                     onChange={(e) => setUseStockForm({...useStockForm, quantity: e.target.value})}
// // // //                     style={styles.input}
// // // //                     min="1"
// // // //                     max={useStockModal.qty}
// // // //                     required
// // // //                     autoFocus
// // // //                   />
// // // //                 </div>
// // // //                 <div style={styles.formGroup}>
// // // //                   <label style={styles.label}>Reason</label>
// // // //                   <input
// // // //                     type="text"
// // // //                     value={useStockForm.reason}
// // // //                     onChange={(e) => setUseStockForm({...useStockForm, reason: e.target.value})}
// // // //                     style={styles.input}
// // // //                     placeholder="e.g., Used for packaging"
// // // //                   />
// // // //                 </div>
// // // //                 <div style={styles.confirmActions}>
// // // //                   <button type="button" onClick={() => setUseStockModal(null)} style={styles.cancelBtn}>Cancel</button>
// // // //                   <button type="submit" style={styles.submitBtn}>Use Stock</button>
// // // //                 </div>
// // // //               </form>
// // // //             </div>
// // // //           </div>
// // // //         )}

// // // //         {/* ADJUST STOCK MODAL */}
// // // //         {adjustStockModal && (
// // // //           <div style={styles.modalOverlay} onClick={() => setAdjustStockModal(null)}>
// // // //             <div style={styles.confirmModal} onClick={(e) => e.stopPropagation()}>
// // // //               <div style={styles.confirmIcon}>⚖️</div>
// // // //               <h3 style={styles.confirmTitle}>Adjust Stock</h3>
// // // //               <p style={styles.confirmText}>
// // // //                 Current: <strong>{adjustStockModal.qty} {adjustStockModal.unit}</strong>
// // // //               </p>
// // // //               <form onSubmit={handleAdjustStock}>
// // // //                 <div style={styles.formGroup}>
// // // //                   <label style={styles.label}>New Quantity *</label>
// // // //                   <input
// // // //                     type="number"
// // // //                     value={adjustStockForm.newQuantity}
// // // //                     onChange={(e) => setAdjustStockForm({...adjustStockForm, newQuantity: parseInt(e.target.value)})}
// // // //                     style={styles.input}
// // // //                     min="0"
// // // //                     required
// // // //                     autoFocus
// // // //                   />
// // // //                 </div>
// // // //                 <div style={styles.formGroup}>
// // // //                   <label style={styles.label}>Reason *</label>
// // // //                   <input
// // // //                     type="text"
// // // //                     value={adjustStockForm.reason}
// // // //                     onChange={(e) => setAdjustStockForm({...adjustStockForm, reason: e.target.value})}
// // // //                     style={styles.input}
// // // //                     placeholder="e.g., Physical count correction"
// // // //                     required
// // // //                   />
// // // //                 </div>
// // // //                 <div style={styles.confirmActions}>
// // // //                   <button type="button" onClick={() => setAdjustStockModal(null)} style={styles.cancelBtn}>Cancel</button>
// // // //                   <button type="submit" style={styles.submitBtn}>Adjust</button>
// // // //                 </div>
// // // //               </form>
// // // //             </div>
// // // //           </div>
// // // //         )}

// // // //         {/* VIEW LOGS MODAL */}
// // // //         {viewLogsModal && (
// // // //           <div style={styles.modalOverlay} onClick={() => setViewLogsModal(null)}>
// // // //             <div style={{...styles.modal, maxWidth: "900px"}} onClick={(e) => e.stopPropagation()}>
// // // //               <div style={styles.modalHeader}>
// // // //                 <h3 style={styles.modalTitle}>📊 Stock Movement Logs</h3>
// // // //                 <button onClick={() => setViewLogsModal(null)} style={styles.closeBtn}>✖</button>
// // // //               </div>

// // // //               <div style={{padding: "24px", maxHeight: "500px", overflow: "auto"}}>
// // // //                 <h4 style={{margin: "0 0 16px", fontSize: "16px"}}>
// // // //                   {viewLogsModal.itemName}
// // // //                 </h4>
// // // //                 {logs.length === 0 ? (
// // // //                   <p style={{color: "#666", textAlign: "center", padding: "20px"}}>
// // // //                     No activity logs yet
// // // //                   </p>
// // // //                 ) : (
// // // //                   <table style={{...styles.table, width: "100%"}}>
// // // //                     <thead>
// // // //                       <tr>
// // // //                         <th style={{...styles.th, fontSize: "12px"}}>Date</th>
// // // //                         <th style={{...styles.th, fontSize: "12px"}}>Action</th>
// // // //                         <th style={{...styles.th, fontSize: "12px"}}>Qty</th>
// // // //                         <th style={{...styles.th, fontSize: "12px"}}>Before</th>
// // // //                         <th style={{...styles.th, fontSize: "12px"}}>After</th>
// // // //                         <th style={{...styles.th, fontSize: "12px"}}>By</th>
// // // //                         <th style={{...styles.th, fontSize: "12px"}}>Reason</th>
// // // //                       </tr>
// // // //                     </thead>
// // // //                     <tbody>
// // // //                       {logs.map((log) => (
// // // //                         <tr key={log._id}>
// // // //                           <td style={{...styles.td, fontSize: "12px"}}>
// // // //                             {new Date(log.createdAt).toLocaleDateString()}
// // // //                           </td>
// // // //                           <td style={{...styles.td, fontSize: "12px"}}>
// // // //                             <span style={getActionBadge(log.actionType)}>
// // // //                               {log.actionType}
// // // //                             </span>
// // // //                           </td>
// // // //                           <td style={{...styles.td, fontSize: "12px", fontWeight: "600"}}>
// // // //                             {log.quantity}
// // // //                           </td>
// // // //                           <td style={{...styles.td, fontSize: "12px"}}>{log.qtyBefore}</td>
// // // //                           <td style={{...styles.td, fontSize: "12px", fontWeight: "600"}}>
// // // //                             {log.qtyAfter}
// // // //                           </td>
// // // //                           <td style={{...styles.td, fontSize: "11px"}}>
// // // //                             {log.performedBy?.name || log.performedByName}
// // // //                           </td>
// // // //                           <td style={{...styles.td, fontSize: "11px", color: "#666"}}>
// // // //                             {log.reason || "-"}
// // // //                           </td>
// // // //                         </tr>
// // // //                       ))}
// // // //                     </tbody>
// // // //                   </table>
// // // //                 )}
// // // //               </div>

// // // //               <div style={styles.modalActions}>
// // // //                 <button onClick={() => setViewLogsModal(null)} style={styles.submitBtn}>
// // // //                   Close
// // // //                 </button>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         )}

// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // // ==================== HELPER FUNCTIONS ====================
// // // // const getCategoryBadge = (category) => {
// // // //   const colors = {
// // // //     "Label": { bg: "#dbeafe", color: "#1e40af" },
// // // //     "Wrapping": { bg: "#d1fae5", color: "#065f46" }
// // // //   };

// // // //   const style = colors[category] || { bg: "#e5e7eb", color: "#374151" };

// // // //   return {
// // // //     padding: "4px 12px",
// // // //     borderRadius: "12px",
// // // //     fontSize: "12px",
// // // //     fontWeight: "600",
// // // //     backgroundColor: style.bg,
// // // //     color: style.color,
// // // //     display: "inline-block"
// // // //   };
// // // // };

// // // // const getSubCategoryBadge = (subCategory) => {
// // // //   const colors = {
// // // //     "Thank You Card": { bg: "#fce7f3", color: "#9f1239" },
// // // //     "Brand Tag": { bg: "#e0e7ff", color: "#3730a3" },
// // // //     "Product Label": { bg: "#fef3c7", color: "#92400e" },
// // // //     "Packaging Tape": { bg: "#fed7aa", color: "#7c2d12" },
// // // //     "Poly Bags": { bg: "#cffafe", color: "#155e75" },
// // // //     "Box": { bg: "#ddd6fe", color: "#5b21b6" }
// // // //   };

// // // //   const style = colors[subCategory] || { bg: "#e5e7eb", color: "#374151" };

// // // //   return {
// // // //     padding: "3px 10px",
// // // //     borderRadius: "10px",
// // // //     fontSize: "11px",
// // // //     fontWeight: "600",
// // // //     backgroundColor: style.bg,
// // // //     color: style.color,
// // // //     display: "inline-block"
// // // //   };
// // // // };

// // // // const getActionBadge = (action) => {
// // // //   const colors = {
// // // //     "ADD": { bg: "#d1fae5", color: "#065f46" },
// // // //     "USE": { bg: "#fee2e2", color: "#991b1b" },
// // // //     "ADJUST": { bg: "#fef3c7", color: "#92400e" }
// // // //   };

// // // //   const style = colors[action] || { bg: "#e5e7eb", color: "#374151" };

// // // //   return {
// // // //     padding: "2px 8px",
// // // //     borderRadius: "8px",
// // // //     fontSize: "11px",
// // // //     fontWeight: "600",
// // // //     backgroundColor: style.bg,
// // // //     color: style.color,
// // // //     display: "inline-block"
// // // //   };
// // // // };

// // // // // ==================== STYLES ====================
// // // // const styles = {
// // // //   container: { minHeight: "100vh", backgroundColor: "#f3f4f6" },
// // // //   mainContent: { maxWidth: "1600px", margin: "0 auto", padding: "20px" },
// // // //   pageHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" },
// // // //   pageTitle: { fontSize: "28px", fontWeight: "700", color: "#1f2937", margin: 0 },
// // // //   pageSubtitle: { fontSize: "14px", color: "#6b7280", marginTop: "4px" },
// // // //   createBtn: { backgroundColor: "#3b82f6", color: "white", border: "none", padding: "12px 24px", borderRadius: "8px", fontSize: "14px", fontWeight: "600", cursor: "pointer" },
// // // //   statsContainer: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "20px", marginBottom: "30px" },
// // // //   statCard: { backgroundColor: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", textAlign: "center" },
// // // //   statNumber: { fontSize: "32px", fontWeight: "700", color: "#1f2937", marginBottom: "8px" },
// // // //   statLabel: { fontSize: "14px", color: "#6b7280", fontWeight: "500" },
// // // //   alertBox: { backgroundColor: "#fef3c7", border: "2px solid #fbbf24", borderRadius: "12px", padding: "16px", marginBottom: "20px" },
// // // //   alertHeader: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px", color: "#92400e", fontSize: "14px", fontWeight: "600" },
// // // //   alertIcon: { fontSize: "20px" },
// // // //   alertContent: { display: "flex", flexWrap: "wrap", gap: "8px" },
// // // //   alertItem: { backgroundColor: "white", padding: "6px 12px", borderRadius: "8px", fontSize: "13px", color: "#78350f", fontWeight: "500" },
// // // //   filterSection: { backgroundColor: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", marginBottom: "20px" },
// // // //   filterRow: { display: "flex", gap: "12px", flexWrap: "wrap" },
// // // //   searchInput: { flex: "1", minWidth: "250px", padding: "10px 14px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px" },
// // // //   filterSelect: { padding: "10px 14px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", backgroundColor: "white", cursor: "pointer" },
// // // //   searchBtn: { backgroundColor: "#3b82f6", color: "white", border: "none", padding: "10px 20px", borderRadius: "8px", fontSize: "14px", fontWeight: "600", cursor: "pointer" },
// // // //   resetBtn: { backgroundColor: "#6b7280", color: "white", border: "none", padding: "10px 20px", borderRadius: "8px", fontSize: "14px", fontWeight: "600", cursor: "pointer" },
// // // //   tableCard: { backgroundColor: "white", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", overflow: "auto" },
// // // //   table: { width: "100%", borderCollapse: "collapse", minWidth: "1200px" },
// // // //   th: { padding: "16px", textAlign: "left", fontSize: "13px", fontWeight: "600", color: "#374151", backgroundColor: "#f9fafb", borderBottom: "2px solid #e5e7eb", whiteSpace: "nowrap" },
// // // //   td: { padding: "16px", fontSize: "14px", color: "#4b5563", borderBottom: "1px solid #e5e7eb" },
// // // //   row: { transition: "background-color 0.2s" },
// // // //   activeBadge: { padding: "4px 12px", borderRadius: "12px", fontSize: "12px", fontWeight: "600", backgroundColor: "#d1fae5", color: "#065f46", display: "inline-block" },
// // // //   inactiveBadge: { padding: "4px 12px", borderRadius: "12px", fontSize: "12px", fontWeight: "600", backgroundColor: "#fee2e2", color: "#991b1b", display: "inline-block" },
// // // //   lowStockBadge: { padding: "4px 12px", borderRadius: "12px", fontSize: "11px", fontWeight: "600", backgroundColor: "#fef3c7", color: "#92400e", display: "inline-block" },
// // // //   actionBtns: { display: "flex", gap: "6px", justifyContent: "flex-end", flexWrap: "wrap" },
// // // //   addBtn: { padding: "6px 10px", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "14px", backgroundColor: "#d1fae5", transition: "all 0.2s" },
// // // //   useBtn: { padding: "6px 10px", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "14px", backgroundColor: "#fee2e2", transition: "all 0.2s" },
// // // //   adjustBtn: { padding: "6px 10px", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "14px", backgroundColor: "#fef3c7", transition: "all 0.2s" },
// // // //   logsBtn: { padding: "6px 10px", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "14px", backgroundColor: "#e0e7ff", transition: "all 0.2s" },
// // // //   editBtn: { padding: "6px 10px", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "14px", backgroundColor: "#dbeafe", transition: "all 0.2s" },
// // // //   deactivateBtn: { padding: "6px 10px", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "14px", backgroundColor: "#fee2e2", transition: "all 0.2s" },
// // // //   activateBtn: { padding: "6px 10px", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "14px", backgroundColor: "#d1fae5", transition: "all 0.2s" },
// // // //   deleteBtn: { padding: "6px 10px", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "14px", backgroundColor: "#fee2e2", transition: "all 0.2s" },
// // // //   modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "20px" },
// // // //   modal: { backgroundColor: "white", borderRadius: "12px", width: "100%", maxWidth: "700px", maxHeight: "90vh", overflow: "auto", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" },
// // // //   confirmModal: { backgroundColor: "white", borderRadius: "12px", padding: "30px", width: "100%", maxWidth: "500px", textAlign: "center", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" },
// // // //   modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: "1px solid #e5e7eb" },
// // // //   modalTitle: { fontSize: "20px", fontWeight: "700", color: "#1f2937", margin: 0 },
// // // //   closeBtn: { background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#6b7280", padding: "4px 8px" },
// // // //   form: { padding: "24px" },
// // // //   formGroup: { marginBottom: "20px" },
// // // //   label: { display: "block", fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px" },
// // // //   input: { width: "100%", padding: "10px 14px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" },
// // // //   row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" },
// // // //   modalActions: { display: "flex", gap: "12px", justifyContent: "flex-end", padding: "20px 24px", borderTop: "1px solid #e5e7eb" },
// // // //   confirmActions: { display: "flex", gap: "12px", justifyContent: "center", marginTop: "24px" },
// // // //   cancelBtn: { padding: "10px 20px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", fontWeight: "600", backgroundColor: "white", color: "#374151", cursor: "pointer" },
// // // //   submitBtn: { padding: "10px 20px", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: "600", backgroundColor: "#3b82f6", color: "white", cursor: "pointer" },
// // // //   confirmDeleteBtn: { padding: "10px 20px", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: "600", backgroundColor: "#ef4444", color: "white", cursor: "pointer" },
// // // //   confirmIcon: { fontSize: "48px", marginBottom: "16px" },
// // // //   confirmTitle: { fontSize: "20px", fontWeight: "700", color: "#1f2937", marginBottom: "12px" },
// // // //   confirmText: { fontSize: "14px", color: "#6b7280", lineHeight: "1.6", marginBottom: "16px" }
// // // // };



























// // // import React, { useEffect, useState } from "react";
// // // import api from "../api/axios";
// // // import { useNavigate } from "react-router-dom";
// // // import toast from "react-hot-toast";
// // // import Header from "../components/Header";

// // // export default function PackZoneManagement() {
// // //   const [items, setItems] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [stats, setStats] = useState(null);
// // //   const navigate = useNavigate();

// // //   // Filter States
// // //   const [categoryFilter, setCategoryFilter] = useState("");
// // //   const [subCategoryFilter, setSubCategoryFilter] = useState("");
// // //   const [statusFilter, setStatusFilter] = useState("");
// // //   const [searchTerm, setSearchTerm] = useState("");

// // //   // Modal States
// // //   const [editingItem, setEditingItem] = useState(null);
// // //   const [deleteModal, setDeleteModal] = useState(null);
// // //   const [addStockModal, setAddStockModal] = useState(null);
// // //   const [useStockModal, setUseStockModal] = useState(null);
// // //   const [adjustStockModal, setAdjustStockModal] = useState(null);
// // //   const [viewLogsModal, setViewLogsModal] = useState(null);

// // //   // Form States
// // //   const [editForm, setEditForm] = useState({
// // //     itemName: "",
// // //     size: "",
// // //     category: "",
// // //     subCategory: "",
// // //     unit: "",
// // //     minimumStock: 50,
// // //     status: "Active",
// // //     description: ""
// // //   });

// // //   const [addStockForm, setAddStockForm] = useState({ quantity: "", reason: "" });
// // //   const [useStockForm, setUseStockForm] = useState({ quantity: "", reason: "" });
// // //   const [adjustStockForm, setAdjustStockForm] = useState({ newQuantity: "", reason: "" });

// // //   const [logs, setLogs] = useState([]);

// // //   // Sub-category options based on category
// // //   const subCategoryOptions = {
// // //     "Label": ["Thank You Card", "Brand Tag", "Product Label"],
// // //     "Wrapping": ["Packaging Tape", "Poly Bags", "Box"]
// // //   };

// // //   useEffect(() => {
// // //     fetchItems();
// // //     fetchStats();
// // //   }, []);

// // //   const fetchItems = async () => {
// // //     try {
// // //       const params = {};
// // //       if (categoryFilter) params.category = categoryFilter;
// // //       if (subCategoryFilter) params.subCategory = subCategoryFilter;
// // //       if (statusFilter) params.status = statusFilter;
// // //       if (searchTerm) params.search = searchTerm;

// // //       const res = await api.get("/packzone", { params });
// // //       setItems(res.data.items);
// // //     } catch (error) {
// // //       toast.error("Failed to load items");
// // //       console.error(error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const fetchStats = async () => {
// // //     try {
// // //       const res = await api.get("/packzone/stats/overview");
// // //       setStats(res.data.stats);
// // //     } catch (error) {
// // //       console.error("Failed to load stats:", error);
// // //     }
// // //   };

// // //   const handleSearch = () => {
// // //     setLoading(true);
// // //     fetchItems();
// // //   };

// // //   const resetFilters = () => {
// // //     setCategoryFilter("");
// // //     setSubCategoryFilter("");
// // //     setStatusFilter("");
// // //     setSearchTerm("");
// // //     setLoading(true);
// // //     fetchItems();
// // //   };

// // //   // ==================== EDIT ====================
// // //   const handleEditClick = (item) => {
// // //     setEditingItem(item);
// // //     setEditForm({
// // //       itemName: item.itemName,
// // //       size: item.size,
// // //       category: item.category,
// // //       subCategory: item.subCategory,
// // //       unit: item.unit,
// // //       minimumStock: item.minimumStock,
// // //       status: item.status,
// // //       description: item.description || ""
// // //     });
// // //   };

// // //   const handleUpdateItem = async (e) => {
// // //     e.preventDefault();
// // //     try {
// // //       await api.put(`/packzone/${editingItem._id}`, editForm);
// // //       toast.success("Item updated successfully");
// // //       setEditingItem(null);
// // //       fetchItems();
// // //       fetchStats();
// // //     } catch (error) {
// // //       toast.error(error.response?.data?.message || "Update failed");
// // //     }
// // //   };

// // //   // ==================== DELETE ====================
// // //   const confirmDelete = async () => {
// // //     if (!deleteModal) return;
// // //     try {
// // //       await api.delete(`/packzone/${deleteModal._id}`);
// // //       toast.success("Item deleted successfully");
// // //       fetchItems();
// // //       fetchStats();
// // //     } catch (error) {
// // //       toast.error(error.response?.data?.message || "Delete failed");
// // //     }
// // //     setDeleteModal(null);
// // //   };

// // //   // ==================== ADD STOCK ====================
// // //   const openAddStockModal = (item) => {
// // //     setAddStockModal(item);
// // //     setAddStockForm({ quantity: "", reason: "" });
// // //   };

// // //   const handleAddStock = async (e) => {
// // //     e.preventDefault();
// // //     if (!addStockForm.quantity || addStockForm.quantity <= 0) {
// // //       return toast.error("Please enter valid quantity");
// // //     }
// // //     try {
// // //       await api.post(`/packzone/${addStockModal._id}/add`, addStockForm);
// // //       toast.success("Stock added successfully");
// // //       setAddStockModal(null);
// // //       setAddStockForm({ quantity: "", reason: "" });
// // //       fetchItems();
// // //       fetchStats();
// // //     } catch (error) {
// // //       toast.error(error.response?.data?.message || "Failed to add stock");
// // //     }
// // //   };

// // //   // ==================== USE STOCK ====================
// // //   const openUseStockModal = (item) => {
// // //     setUseStockModal(item);
// // //     setUseStockForm({ quantity: "", reason: "" });
// // //   };

// // //   const handleUseStock = async (e) => {
// // //     e.preventDefault();
// // //     if (!useStockForm.quantity || useStockForm.quantity <= 0) {
// // //       return toast.error("Please enter valid quantity");
// // //     }
// // //     try {
// // //       await api.post(`/packzone/${useStockModal._id}/use`, useStockForm);
// // //       toast.success("Stock reduced successfully");
// // //       setUseStockModal(null);
// // //       setUseStockForm({ quantity: "", reason: "" });
// // //       fetchItems();
// // //       fetchStats();
// // //     } catch (error) {
// // //       toast.error(error.response?.data?.message || "Failed to use stock");
// // //     }
// // //   };

// // //   // ==================== ADJUST STOCK ====================
// // //   const openAdjustStockModal = (item) => {
// // //     setAdjustStockModal(item);
// // //     setAdjustStockForm({ newQuantity: item.qty, reason: "" });
// // //   };

// // //   const handleAdjustStock = async (e) => {
// // //     e.preventDefault();
// // //     if (adjustStockForm.newQuantity === undefined || adjustStockForm.newQuantity < 0) {
// // //       return toast.error("Please enter valid quantity");
// // //     }
// // //     try {
// // //       await api.post(`/packzone/${adjustStockModal._id}/adjust`, adjustStockForm);
// // //       toast.success("Stock adjusted successfully");
// // //       setAdjustStockModal(null);
// // //       setAdjustStockForm({ newQuantity: "", reason: "" });
// // //       fetchItems();
// // //       fetchStats();
// // //     } catch (error) {
// // //       toast.error(error.response?.data?.message || "Failed to adjust stock");
// // //     }
// // //   };

// // //   // ==================== VIEW LOGS ====================
// // //   const openLogsModal = async (item) => {
// // //     setViewLogsModal(item);
// // //     try {
// // //       const res = await api.get(`/packzone/${item._id}/logs`);
// // //       setLogs(res.data.logs);
// // //     } catch (error) {
// // //       toast.error("Failed to load logs");
// // //     }
// // //   };

// // //   // ==================== TOGGLE STATUS ====================
// // //   const toggleStatus = async (itemId) => {
// // //     try {
// // //       await api.patch(`/packzone/${itemId}/toggle`);
// // //       toast.success("Status updated");
// // //       fetchItems();
// // //       fetchStats();
// // //     } catch (error) {
// // //       toast.error("Failed to update status");
// // //     }
// // //   };

// // //   return (
// // //     <div style={styles.container}>
// // //       <Header />
// // //       <div style={styles.mainContent}>

// // //         {/* PAGE HEADER */}
// // //         <div style={styles.pageHeader}>
// // //           <div>
// // //             <h2 style={styles.pageTitle}>📦 PackZone Manager</h2>
// // //             <p style={styles.pageSubtitle}>Track and control your packaging inventory</p>
// // //           </div>
// // //           <button onClick={() => navigate("/add-packzone")} style={styles.createBtn}>
// // //             <span style={{ marginRight: "8px" }}>+</span> Add New Item
// // //           </button>
// // //         </div>

// // //         {/* STATS CARDS */}
// // //         {stats && (
// // //           <div style={styles.statsContainer}>
// // //             <div style={styles.statCard}>
// // //               <div style={styles.statIconWrapper}>📊</div>
// // //               <div style={styles.statInfo}>
// // //                 <div style={styles.statLabel}>Total Items</div>
// // //                 <div style={styles.statNumber}>{stats.total}</div>
// // //               </div>
// // //             </div>
// // //             <div style={styles.statCard}>
// // //               <div style={{ ...styles.statIconWrapper, backgroundColor: "#ecfdf5", color: "#10b981" }}>✅</div>
// // //               <div style={styles.statInfo}>
// // //                 <div style={styles.statLabel}>Active Items</div>
// // //                 <div style={{ ...styles.statNumber, color: "#10b981" }}>{stats.active}</div>
// // //               </div>
// // //             </div>
// // //             <div style={styles.statCard}>
// // //               <div style={{ ...styles.statIconWrapper, backgroundColor: "#fef2f2", color: "#ef4444" }}>⚠️</div>
// // //               <div style={styles.statInfo}>
// // //                 <div style={styles.statLabel}>Low Stock</div>
// // //                 <div style={{ ...styles.statNumber, color: "#ef4444" }}>{stats.lowStock}</div>
// // //               </div>
// // //             </div>
// // //             {stats.byCategory && stats.byCategory.map((cat, idx) => (
// // //               <div key={idx} style={styles.statCard}>
// // //                  <div style={{ ...styles.statIconWrapper, backgroundColor: "#eff6ff", color: "#3b82f6" }}>🏷️</div>
// // //                 <div style={styles.statInfo}>
// // //                   <div style={styles.statLabel}>{cat._id}</div>
// // //                   <div style={{ ...styles.statNumber, color: "#3b82f6" }}>{cat.count}</div>
// // //                 </div>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         )}

// // //         {/* LOW STOCK ALERTS */}
// // //         {stats && stats.lowStockList && stats.lowStockList.length > 0 && (
// // //           <div style={styles.alertBox}>
// // //             <div style={styles.alertHeader}>
// // //               <span style={styles.alertIcon}>⚡</span>
// // //               <strong>Action Required: Low Stock Items</strong>
// // //             </div>
// // //             <div style={styles.alertContent}>
// // //               {stats.lowStockList.map((item, idx) => (
// // //                 <span key={idx} style={styles.alertItem}>
// // //                   {item.itemName} <span style={{opacity: 0.7}}>({item.qty}/{item.minimumStock} {item.unit})</span>
// // //                 </span>
// // //               ))}
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* FILTERS */}
// // //         <div style={styles.filterSection}>
// // //           <div style={styles.filterRow}>
// // //             <input
// // //               type="text"
// // //               placeholder="🔍 Search items by name..."
// // //               value={searchTerm}
// // //               onChange={(e) => setSearchTerm(e.target.value)}
// // //               style={styles.searchInput}
// // //             />

// // //             <select
// // //               value={categoryFilter}
// // //               onChange={(e) => {
// // //                 setCategoryFilter(e.target.value);
// // //                 setSubCategoryFilter("");
// // //               }}
// // //               style={styles.filterSelect}
// // //             >
// // //               <option value="">All Categories</option>
// // //               <option value="Label">Label</option>
// // //               <option value="Wrapping">Wrapping</option>
// // //             </select>

// // //             <select
// // //               value={subCategoryFilter}
// // //               onChange={(e) => setSubCategoryFilter(e.target.value)}
// // //               style={styles.filterSelect}
// // //               disabled={!categoryFilter}
// // //             >
// // //               <option value="">All Sub-Categories</option>
// // //               {categoryFilter && subCategoryOptions[categoryFilter]?.map((sub) => (
// // //                 <option key={sub} value={sub}>{sub}</option>
// // //               ))}
// // //             </select>

// // //             <select
// // //               value={statusFilter}
// // //               onChange={(e) => setStatusFilter(e.target.value)}
// // //               style={styles.filterSelect}
// // //             >
// // //               <option value="">All Status</option>
// // //               <option value="Active">Active</option>
// // //               <option value="Inactive">Inactive</option>
// // //             </select>

// // //             <div style={{display: 'flex', gap: '10px', marginLeft: 'auto'}}>
// // //                 <button onClick={handleSearch} style={styles.searchBtn}>Search</button>
// // //                 <button onClick={resetFilters} style={styles.resetBtn}>Reset</button>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* ITEMS TABLE */}
// // //         <div style={styles.tableCard}>
// // //           <table style={styles.table}>
// // //             <thead>
// // //               <tr>
// // //                 <th style={styles.th}>ITEM DETAILS</th>
// // //                 <th style={styles.th}>SIZE</th>
// // //                 <th style={styles.th}>CATEGORY</th>
// // //                 <th style={styles.th}>SUB-CATEGORY</th>
// // //                 <th style={styles.th}>STOCK LEVEL</th>
// // //                 <th style={styles.th}>UNIT</th>
// // //                 <th style={styles.th}>MIN LIMIT</th>
// // //                 <th style={styles.th}>STATUS</th>
// // //                 <th style={{ ...styles.th, textAlign: "right" }}>ACTIONS</th>
// // //               </tr>
// // //             </thead>
// // //             <tbody>
// // //               {loading ? (
// // //                 <tr>
// // //                   <td colSpan="9" style={{ padding: "40px", textAlign: "center", color: "#6b7280" }}>
// // //                     <div style={styles.spinner}></div> Loading inventory...
// // //                   </td>
// // //                 </tr>
// // //               ) : items.length === 0 ? (
// // //                 <tr>
// // //                   <td colSpan="9" style={{ padding: "40px", textAlign: "center", color: "#6b7280" }}>
// // //                     No items found matching your filters.
// // //                   </td>
// // //                 </tr>
// // //               ) : (
// // //                 items.map((item) => (
// // //                   <tr key={item._id} style={styles.row}>
// // //                     <td style={styles.td}>
// // //                       <div style={{ fontWeight: "600", color: "#111827", fontSize: "15px" }}>
// // //                         {item.itemName}
// // //                       </div>
// // //                       {item.description && (
// // //                         <div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "4px" }}>
// // //                           {item.description.substring(0, 35)}{item.description.length > 35 ? "..." : ""}
// // //                         </div>
// // //                       )}
// // //                     </td>

// // //                     <td style={styles.td}>
// // //                       <span style={styles.sizeBadge}>{item.size}</span>
// // //                     </td>

// // //                     <td style={styles.td}>
// // //                       <span style={getCategoryBadge(item.category)}>
// // //                         {item.category}
// // //                       </span>
// // //                     </td>

// // //                     <td style={styles.td}>
// // //                       <span style={getSubCategoryBadge(item.subCategory)}>
// // //                         {item.subCategory}
// // //                       </span>
// // //                     </td>

// // //                     <td style={styles.td}>
// // //                       <div style={{
// // //                         fontWeight: "700",
// // //                         fontSize: "15px",
// // //                         color: item.isLowStock ? "#ef4444" : "#10b981",
// // //                         display: 'flex',
// // //                         alignItems: 'center',
// // //                         gap: '5px'
// // //                       }}>
// // //                         {item.qty}
// // //                         {item.isLowStock && <span title="Low Stock" style={{fontSize: '12px'}}>⚠️</span>}
// // //                       </div>
// // //                     </td>

// // //                     <td style={styles.td}>
// // //                       <span style={{ fontSize: "13px", color: "#6b7280" }}>{item.unit}</span>
// // //                     </td>

// // //                     <td style={styles.td}>
// // //                       <div style={{ color: "#6b7280", fontSize: "14px", fontWeight: "500" }}>
// // //                         {item.minimumStock}
// // //                       </div>
// // //                     </td>

// // //                     <td style={styles.td}>
// // //                         <span style={item.status === "Active" ? styles.activeBadge : styles.inactiveBadge}>
// // //                           {item.status}
// // //                         </span>
// // //                     </td>

// // //                     <td style={{ ...styles.td, textAlign: "right" }}>
// // //                       <div style={styles.actionBtns}>
// // //                         <button onClick={() => openAddStockModal(item)} style={{...styles.iconBtn, color: "#059669", background: "#d1fae5"}} title="Add Stock">➕</button>
// // //                         <button onClick={() => openUseStockModal(item)} style={{...styles.iconBtn, color: "#b91c1c", background: "#fee2e2"}} title="Use Stock">➖</button>
// // //                         <button onClick={() => openAdjustStockModal(item)} style={{...styles.iconBtn, color: "#d97706", background: "#fef3c7"}} title="Adjust Stock">⚖️</button>
// // //                         <div style={styles.verticalDivider}></div>
// // //                         <button onClick={() => openLogsModal(item)} style={{...styles.iconBtn, color: "#4f46e5", background: "#e0e7ff"}} title="View Logs">📜</button>
// // //                         <button onClick={() => handleEditClick(item)} style={{...styles.iconBtn, color: "#2563eb", background: "#dbeafe"}} title="Edit Item">✏️</button>
// // //                         <button onClick={() => toggleStatus(item._id)} style={{...styles.iconBtn, color: "#4b5563", background: "#f3f4f6"}} title={item.status === "Active" ? "Deactivate" : "Activate"}>
// // //                            {item.status === "Active" ? "⏸️" : "▶️"}
// // //                         </button>
// // //                         <button onClick={() => setDeleteModal(item)} style={{...styles.iconBtn, color: "#dc2626", background: "#fee2e2"}} title="Delete Item">🗑️</button>
// // //                       </div>
// // //                     </td>
// // //                   </tr>
// // //                 ))
// // //               )}
// // //             </tbody>
// // //           </table>
// // //         </div>

// // //         {/* ================= MODALS ================= */}

// // //         {/* EDIT MODAL */}
// // //         {editingItem && (
// // //           <div style={styles.modalOverlay} onClick={() => setEditingItem(null)}>
// // //             <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
// // //               <div style={styles.modalHeader}>
// // //                 <h3 style={styles.modalTitle}>✏️ Edit Item</h3>
// // //                 <button onClick={() => setEditingItem(null)} style={styles.closeBtn}>✕</button>
// // //               </div>

// // //               <form onSubmit={handleUpdateItem} style={styles.form}>
// // //                 <div style={styles.formGrid}>
// // //                     <div style={styles.formGroup}>
// // //                     <label style={styles.label}>Item Name *</label>
// // //                     <input type="text" value={editForm.itemName} onChange={(e) => setEditForm({ ...editForm, itemName: e.target.value })} style={styles.input} required />
// // //                     </div>

// // //                     <div style={styles.formGroup}>
// // //                     <label style={styles.label}>Size (L×W×H) *</label>
// // //                     <input type="text" value={editForm.size} onChange={(e) => setEditForm({ ...editForm, size: e.target.value })} style={styles.input} placeholder="e.g., 10cm×5cm×2cm" required />
// // //                     </div>

// // //                     <div style={styles.formGroup}>
// // //                         <label style={styles.label}>Category *</label>
// // //                         <select value={editForm.category} onChange={(e) => { setEditForm({ ...editForm, category: e.target.value, subCategory: "" }); }} style={styles.input} required>
// // //                         <option value="">Select Category</option>
// // //                         <option value="Label">Label</option>
// // //                         <option value="Wrapping">Wrapping</option>
// // //                         </select>
// // //                     </div>

// // //                     <div style={styles.formGroup}>
// // //                         <label style={styles.label}>Sub-Category *</label>
// // //                         <select value={editForm.subCategory} onChange={(e) => setEditForm({ ...editForm, subCategory: e.target.value })} style={styles.input} required disabled={!editForm.category}>
// // //                         <option value="">Select Sub-Category</option>
// // //                         {editForm.category && subCategoryOptions[editForm.category]?.map((sub) => (
// // //                             <option key={sub} value={sub}>{sub}</option>
// // //                         ))}
// // //                         </select>
// // //                     </div>

// // //                     <div style={styles.formGroup}>
// // //                         <label style={styles.label}>Unit *</label>
// // //                         <select value={editForm.unit} onChange={(e) => setEditForm({ ...editForm, unit: e.target.value })} style={styles.input} required>
// // //                         <option value="">Select Unit</option>
// // //                         <option value="Roll">Roll</option>
// // //                         <option value="Piece">Piece</option>
// // //                         <option value="Pack">Pack</option>
// // //                         <option value="Box">Box</option>
// // //                         <option value="Sheet">Sheet</option>
// // //                         <option value="Meter">Meter</option>
// // //                         </select>
// // //                     </div>

// // //                     <div style={styles.formGroup}>
// // //                         <label style={styles.label}>Minimum Stock *</label>
// // //                         <input type="number" value={editForm.minimumStock} onChange={(e) => setEditForm({ ...editForm, minimumStock: parseInt(e.target.value) })} style={styles.input} min="0" required />
// // //                     </div>
// // //                 </div>

// // //                 <div style={styles.formGroup}>
// // //                   <label style={styles.label}>Status *</label>
// // //                   <select value={editForm.status} onChange={(e) => setEditForm({ ...editForm, status: e.target.value })} style={styles.input} required>
// // //                     <option value="Active">Active</option>
// // //                     <option value="Inactive">Inactive</option>
// // //                   </select>
// // //                 </div>

// // //                 <div style={styles.formGroup}>
// // //                   <label style={styles.label}>Description</label>
// // //                   <textarea value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} style={{ ...styles.input, minHeight: "80px", resize: "vertical" }} rows="3" />
// // //                 </div>

// // //                 <div style={styles.modalActions}>
// // //                   <button type="button" onClick={() => setEditingItem(null)} style={styles.cancelBtn}>Cancel</button>
// // //                   <button type="submit" style={styles.submitBtn}>Update Item</button>
// // //                 </div>
// // //               </form>
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* DELETE MODAL */}
// // //         {deleteModal && (
// // //           <div style={styles.modalOverlay} onClick={() => setDeleteModal(null)}>
// // //             <div style={styles.confirmModal} onClick={(e) => e.stopPropagation()}>
// // //               <div style={styles.confirmIconBox}>🗑️</div>
// // //               <h3 style={styles.confirmTitle}>Delete Item?</h3>
// // //               <p style={styles.confirmText}>
// // //                 Are you sure you want to delete <strong>{deleteModal.itemName}</strong>?
// // //                 <br />This action cannot be undone.
// // //               </p>
// // //               <div style={styles.confirmActions}>
// // //                 <button onClick={() => setDeleteModal(null)} style={styles.cancelBtn}>Cancel</button>
// // //                 <button onClick={confirmDelete} style={styles.confirmDeleteBtn}>Yes, Delete</button>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* STOCK MODALS (Add/Use/Adjust) */}
// // //         {(addStockModal || useStockModal || adjustStockModal) && (
// // //           <div style={styles.modalOverlay} onClick={() => { setAddStockModal(null); setUseStockModal(null); setAdjustStockModal(null); }}>
// // //             <div style={styles.confirmModal} onClick={(e) => e.stopPropagation()}>
// // //               <div style={styles.stockHeader}>
// // //                   <div style={{fontSize: '32px'}}>
// // //                     {addStockModal ? "➕" : useStockModal ? "➖" : "⚖️"}
// // //                   </div>
// // //                   <div>
// // //                     <h3 style={styles.confirmTitle}>
// // //                         {addStockModal ? "Add Stock" : useStockModal ? "Use Stock" : "Adjust Stock"}
// // //                     </h3>
// // //                     <p style={{margin: 0, color: '#6b7280', fontSize: '14px'}}>
// // //                         {addStockModal?.itemName || useStockModal?.itemName || adjustStockModal?.itemName}
// // //                     </p>
// // //                   </div>
// // //               </div>

// // //               <div style={styles.stockInfoBox}>
// // //                  Current Stock: <strong>{(addStockModal || useStockModal || adjustStockModal).qty} {(addStockModal || useStockModal || adjustStockModal).unit}</strong>
// // //               </div>

// // //               <form onSubmit={addStockModal ? handleAddStock : useStockModal ? handleUseStock : handleAdjustStock}>
// // //                 <div style={styles.formGroup}>
// // //                   <label style={styles.label}>
// // //                     {adjustStockModal ? "New Total Quantity *" : "Quantity *"}
// // //                   </label>
// // //                   <input
// // //                     type="number"
// // //                     value={addStockModal ? addStockForm.quantity : useStockModal ? useStockForm.quantity : adjustStockForm.newQuantity}
// // //                     onChange={(e) => {
// // //                         const val = e.target.value;
// // //                         if(addStockModal) setAddStockForm({ ...addStockForm, quantity: val });
// // //                         else if(useStockModal) setUseStockForm({ ...useStockForm, quantity: val });
// // //                         else setAdjustStockForm({ ...adjustStockForm, newQuantity: parseInt(val) });
// // //                     }}
// // //                     style={styles.input}
// // //                     min="0"
// // //                     required
// // //                     autoFocus
// // //                   />
// // //                 </div>
// // //                 <div style={styles.formGroup}>
// // //                   <label style={styles.label}>Reason / Note</label>
// // //                   <input
// // //                     type="text"
// // //                     value={addStockModal ? addStockForm.reason : useStockModal ? useStockForm.reason : adjustStockForm.reason}
// // //                     onChange={(e) => {
// // //                         const val = e.target.value;
// // //                         if(addStockModal) setAddStockForm({ ...addStockForm, reason: val });
// // //                         else if(useStockModal) setUseStockForm({ ...useStockForm, reason: val });
// // //                         else setAdjustStockForm({ ...adjustStockForm, reason: val });
// // //                     }}
// // //                     style={styles.input}
// // //                     placeholder="Brief description..."
// // //                   />
// // //                 </div>
// // //                 <div style={styles.confirmActions}>
// // //                   <button type="button" onClick={() => { setAddStockModal(null); setUseStockModal(null); setAdjustStockModal(null); }} style={styles.cancelBtn}>Cancel</button>
// // //                   <button type="submit" style={styles.submitBtn}>Confirm</button>
// // //                 </div>
// // //               </form>
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* VIEW LOGS MODAL */}
// // //         {viewLogsModal && (
// // //           <div style={styles.modalOverlay} onClick={() => setViewLogsModal(null)}>
// // //             <div style={{ ...styles.modal, maxWidth: "800px" }} onClick={(e) => e.stopPropagation()}>
// // //               <div style={styles.modalHeader}>
// // //                 <h3 style={styles.modalTitle}>📜 History: {viewLogsModal.itemName}</h3>
// // //                 <button onClick={() => setViewLogsModal(null)} style={styles.closeBtn}>✕</button>
// // //               </div>

// // //               <div style={styles.logsContainer}>
// // //                 {logs.length === 0 ? (
// // //                   <div style={styles.emptyState}>No activity logs found for this item.</div>
// // //                 ) : (
// // //                   <table style={styles.logTable}>
// // //                     <thead>
// // //                       <tr>
// // //                         <th>Date & Time</th>
// // //                         <th>Action</th>
// // //                         <th>Changed</th>
// // //                         <th>New Qty</th>
// // //                         <th>Performed By</th>
// // //                         <th>Reason</th>
// // //                       </tr>
// // //                     </thead>
// // //                     <tbody>
// // //                       {logs.map((log) => (
// // //                         <tr key={log._id}>
// // //                           <td>{new Date(log.createdAt).toLocaleString()}</td>
// // //                           <td><span style={getActionBadge(log.actionType)}>{log.actionType}</span></td>
// // //                           <td style={{fontWeight: '600', color: log.actionType === 'USE' ? '#ef4444' : '#10b981'}}>
// // //                             {log.actionType === 'USE' ? '-' : '+'}{log.quantity}
// // //                           </td>
// // //                           <td style={{fontWeight: 'bold'}}>{log.qtyAfter}</td>
// // //                           <td style={{fontSize: '13px', color: '#4b5563'}}>{log.performedBy?.name || log.performedByName || 'System'}</td>
// // //                           <td style={{fontSize: '13px', color: '#9ca3af', fontStyle: 'italic'}}>{log.reason || "-"}</td>
// // //                         </tr>
// // //                       ))}
// // //                     </tbody>
// // //                   </table>
// // //                 )}
// // //               </div>

// // //               <div style={styles.modalFooter}>
// // //                 <button onClick={() => setViewLogsModal(null)} style={styles.cancelBtn}>Close</button>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}

// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // // ==================== HELPER FUNCTIONS ====================
// // // const getCategoryBadge = (category) => {
// // //   const colors = {
// // //     "Label": { bg: "#e0e7ff", color: "#3730a3", border: "1px solid #c7d2fe" },
// // //     "Wrapping": { bg: "#ecfdf5", color: "#065f46", border: "1px solid #a7f3d0" }
// // //   };
// // //   const style = colors[category] || { bg: "#f3f4f6", color: "#374151", border: "1px solid #e5e7eb" };
// // //   return { ...styles.badge, backgroundColor: style.bg, color: style.color, border: style.border };
// // // };

// // // const getSubCategoryBadge = (subCategory) => {
// // //   const colors = {
// // //     "Thank You Card": "#fce7f3", "Brand Tag": "#e0e7ff", "Product Label": "#ffedd5",
// // //     "Packaging Tape": "#ffedd5", "Poly Bags": "#cffafe", "Box": "#ede9fe"
// // //   };
// // //   const bg = colors[subCategory] || "#f3f4f6";
// // //   return { ...styles.badge, backgroundColor: bg, color: "#1f2937", fontSize: "11px", padding: "2px 8px" };
// // // };

// // // const getActionBadge = (action) => {
// // //   const colors = {
// // //     "ADD": { bg: "#dcfce7", color: "#166534" },
// // //     "USE": { bg: "#fee2e2", color: "#991b1b" },
// // //     "ADJUST": { bg: "#fef3c7", color: "#92400e" }
// // //   };
// // //   const style = colors[action] || { bg: "#f3f4f6", color: "#374151" };
// // //   return { ...styles.badge, backgroundColor: style.bg, color: style.color, fontSize: "11px" };
// // // };

// // // // ==================== IMPROVED STYLES (Modern Dashboard Look) ====================
// // // const styles = {
// // //   container: { minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "'Inter', sans-serif", paddingBottom: "40px" },
// // //   mainContent: { maxWidth: "1500px", margin: "0 auto", padding: "24px 32px" },

// // //   // Page Header
// // //   pageHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" },
// // //   pageTitle: { fontSize: "28px", fontWeight: "800", color: "#111827", margin: 0, letterSpacing: "-0.02em" },
// // //   pageSubtitle: { fontSize: "15px", color: "#6b7280", marginTop: "4px" },
// // //   createBtn: { backgroundColor: "#2563eb", color: "white", border: "none", padding: "12px 24px", borderRadius: "10px", fontSize: "14px", fontWeight: "600", cursor: "pointer", boxShadow: "0 4px 6px -1px rgba(37, 99, 235, 0.2)", display: "flex", alignItems: "center", transition: "all 0.2s" },

// // //   // Stats
// // //   statsContainer: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px", marginBottom: "32px" },
// // //   statCard: { backgroundColor: "white", padding: "20px", borderRadius: "16px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", border: "1px solid #f1f5f9", display: "flex", alignItems: "center", gap: "16px" },
// // //   statIconWrapper: { width: "48px", height: "48px", borderRadius: "12px", backgroundColor: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" },
// // //   statInfo: { display: "flex", flexDirection: "column" },
// // //   statNumber: { fontSize: "24px", fontWeight: "800", color: "#1f2937", lineHeight: "1.2" },
// // //   statLabel: { fontSize: "13px", color: "#6b7280", fontWeight: "500", textTransform: "uppercase", letterSpacing: "0.05em" },

// // //   // Alerts
// // //   alertBox: { backgroundColor: "#fffbeb", border: "1px solid #fcd34d", borderRadius: "12px", padding: "16px 20px", marginBottom: "24px", display: "flex", flexDirection: "column", gap: "10px" },
// // //   alertHeader: { display: "flex", alignItems: "center", gap: "10px", color: "#92400e", fontSize: "15px" },
// // //   alertContent: { display: "flex", flexWrap: "wrap", gap: "10px" },
// // //   alertItem: { backgroundColor: "white", padding: "6px 12px", borderRadius: "20px", fontSize: "13px", color: "#b45309", border: "1px solid #fde68a", fontWeight: "500" },

// // //   // Filters
// // //   filterSection: { backgroundColor: "white", padding: "20px", borderRadius: "16px", border: "1px solid #e5e7eb", marginBottom: "24px", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" },
// // //   filterRow: { display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" },
// // //   searchInput: { flex: 1, minWidth: "250px", padding: "10px 16px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", outline: "none", transition: "border 0.2s" },
// // //   filterSelect: { padding: "10px 16px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", backgroundColor: "white", cursor: "pointer", outline: "none", minWidth: "150px" },
// // //   searchBtn: { backgroundColor: "#3b82f6", color: "white", border: "none", padding: "10px 24px", borderRadius: "8px", fontWeight: "600", cursor: "pointer" },
// // //   resetBtn: { backgroundColor: "#f3f4f6", color: "#4b5563", border: "1px solid #d1d5db", padding: "10px 24px", borderRadius: "8px", fontWeight: "600", cursor: "pointer" },

// // //   // Table
// // //   tableCard: { backgroundColor: "white", borderRadius: "16px", border: "1px solid #e5e7eb", overflow: "hidden", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)" },
// // //   table: { width: "100%", borderCollapse: "separate", borderSpacing: "0", minWidth: "1000px" },
// // //   th: { padding: "16px 20px", textAlign: "left", fontSize: "11px", fontWeight: "700", color: "#6b7280", backgroundColor: "#f9fafb", borderBottom: "1px solid #e5e7eb", textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" },
// // //   td: { padding: "16px 20px", borderBottom: "1px solid #f3f4f6", verticalAlign: "middle" },
// // //   row: { transition: "background-color 0.2s" },

// // //   // Badges & Elements
// // //   badge: { padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", display: "inline-block", whiteSpace: "nowrap" },
// // //   activeBadge: { padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "600", backgroundColor: "#dcfce7", color: "#166534", border: "1px solid #bbf7d0" },
// // //   inactiveBadge: { padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "600", backgroundColor: "#f3f4f6", color: "#4b5563", border: "1px solid #e5e7eb" },
// // //   sizeBadge: { backgroundColor: "#f1f5f9", padding: "4px 8px", borderRadius: "4px", fontSize: "13px", color: "#475569", fontFamily: "monospace" },

// // //   // Actions
// // //   actionBtns: { display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "6px" },
// // //   iconBtn: { width: "32px", height: "32px", border: "none", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", transition: "transform 0.1s" },
// // //   verticalDivider: { width: "1px", height: "24px", backgroundColor: "#e5e7eb", margin: "0 4px" },

// // //   // Modals
// // //   modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(15, 23, 42, 0.6)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "20px" },
// // //   modal: { backgroundColor: "white", borderRadius: "20px", width: "100%", maxWidth: "600px", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" },
// // //   modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 32px", borderBottom: "1px solid #f1f5f9" },
// // //   modalTitle: { fontSize: "22px", fontWeight: "700", color: "#1e293b", margin: 0 },
// // //   closeBtn: { background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#94a3b8" },
// // //   modalFooter: { padding: "24px 32px", borderTop: "1px solid #f1f5f9", display: "flex", justifyContent: "flex-end" },

// // //   // Forms
// // //   form: { padding: "32px" },
// // //   formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" },
// // //   formGroup: { marginBottom: "20px" },
// // //   label: { display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.02em" },
// // //   input: { width: "100%", padding: "12px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "14px", color: "#1e293b", outline: "none", transition: "border-color 0.2s", boxSizing: "border-box" },
// // //   modalActions: { display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "10px" },

// // //   // Confirmation Modal
// // //   confirmModal: { backgroundColor: "white", borderRadius: "20px", padding: "40px", width: "100%", maxWidth: "450px", textAlign: "center", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" },
// // //   confirmIconBox: { width: "64px", height: "64px", backgroundColor: "#fee2e2", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px", margin: "0 auto 20px" },
// // //   stockHeader: { display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px", textAlign: "left" },
// // //   stockInfoBox: { backgroundColor: "#f8fafc", padding: "12px", borderRadius: "8px", marginBottom: "20px", fontSize: "14px", color: "#475569", textAlign: "center" },
// // //   confirmTitle: { fontSize: "20px", fontWeight: "700", color: "#1f2937", marginBottom: "8px" },
// // //   confirmText: { fontSize: "15px", color: "#6b7280", lineHeight: "1.5", marginBottom: "24px" },
// // //   confirmActions: { display: "flex", gap: "12px", justifyContent: "center" },

// // //   // Buttons
// // //   cancelBtn: { padding: "12px 24px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", fontWeight: "600", backgroundColor: "white", color: "#374151", cursor: "pointer", transition: "all 0.2s" },
// // //   submitBtn: { padding: "12px 24px", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: "600", backgroundColor: "#3b82f6", color: "white", cursor: "pointer", transition: "all 0.2s" },
// // //   confirmDeleteBtn: { padding: "12px 24px", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: "600", backgroundColor: "#dc2626", color: "white", cursor: "pointer" },

// // //   // Logs
// // //   logsContainer: { padding: "0 20px", maxHeight: "400px", overflowY: "auto" },
// // //   logTable: { width: "100%", borderCollapse: "collapse", fontSize: "13px" },
// // //   emptyState: { textAlign: "center", padding: "40px", color: "#9ca3af", fontStyle: "italic" },
// // //   spinner: { display: "inline-block", width: "20px", height: "20px", border: "2px solid rgba(0,0,0,0.1)", borderTop: "2px solid #3b82f6", borderRadius: "50%", animation: "spin 1s linear infinite", marginRight: "10px" }
// // // };


























// // import React, { useEffect, useState } from "react";
// // import api from "../api/axios";
// // import { useNavigate } from "react-router-dom";
// // import toast from "react-hot-toast";
// // import Header from "../components/Header";

// // export default function PackZoneManagement() {
// //   const navigate = useNavigate();
// //   const [items, setItems] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [stats, setStats] = useState(null);

// //   // Filter States
// //   const [categoryFilter, setCategoryFilter] = useState("");
// //   const [searchTerm, setSearchTerm] = useState("");

// //   // Modal States (Stock logic remains same, just simplified here)
// //   const [addStockModal, setAddStockModal] = useState(null);

// //   // Stock Form State
// //   const [stockForm, setStockForm] = useState({ quantity: "", reason: "" });

// //   useEffect(() => {
// //     fetchItems();
// //     fetchStats();
// //   }, [categoryFilter]); // Refetch when category changes

// //   const fetchItems = async () => {
// //     setLoading(true);
// //     try {
// //       const params = {};
// //       if (categoryFilter) params.category = categoryFilter;
// //       if (searchTerm) params.search = searchTerm;

// //       const res = await api.get("/packzone", { params });
// //       setItems(res.data.items);
// //     } catch (error) {
// //       toast.error("Failed to load items");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const fetchStats = async () => {
// //     try {
// //       const res = await api.get("/packzone/stats/overview");
// //       setStats(res.data.stats);
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   };

// //   // Stock Handlers (Simplified for brevity, similar logic as before)
// //   const handleStockAction = async (itemId, type) => {
// //     // Implement API call for add/use stock
// //     // refresh list after success
// //   };

// //   return (
// //     <div style={styles.container}>
// //       <Header />
// //       <div style={styles.mainContent}>

// //         {/* Header */}
// //         <div style={styles.pageHeader}>
// //           <div>
// //             <h2 style={styles.pageTitle}>📦 PackZone Inventory</h2>
// //             <p style={styles.subtitle}>Manage boxes, labels, and wrapping materials</p>
// //           </div>
// //           <button onClick={() => navigate("/add-packzone")} style={styles.createBtn}>+ Add New Item</button>
// //         </div>

// //         {/* Filters */}
// //         <div style={styles.filterBar}>
// //           <input 
// //             type="text" 
// //             placeholder="Search items..." 
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //             onKeyDown={(e) => e.key === 'Enter' && fetchItems()}
// //             style={styles.searchInput}
// //           />
// //           <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} style={styles.filterSelect}>
// //             <option value="">All Categories</option>
// //             <option value="Box">Box</option>
// //             <option value="Label">Label</option>
// //             <option value="Wrapping">Wrapping</option>
// //           </select>
// //           <button onClick={fetchItems} style={styles.searchBtn}>Search</button>
// //         </div>

// //         {/* Table */}
// //         <div style={styles.tableCard}>
// //           <table style={styles.table}>
// //             <thead>
// //               <tr>
// //                 <th style={styles.th}>ITEM NAME</th>
// //                 <th style={styles.th}>DIMENSIONS (Size)</th>
// //                 <th style={styles.th}>CATEGORY</th>
// //                 <th style={styles.th}>STOCK</th>
// //                 <th style={styles.th}>UNIT</th>
// //                 <th style={styles.th}>MIN LIMIT</th>
// //                 <th style={{...styles.th, textAlign: 'right'}}>ACTIONS</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {loading ? (
// //                 <tr><td colSpan="7" style={styles.centerTd}>Loading...</td></tr>
// //               ) : items.length === 0 ? (
// //                 <tr><td colSpan="7" style={styles.centerTd}>No items found</td></tr>
// //               ) : (
// //                 items.map((item) => (
// //                   <tr key={item._id} style={styles.row}>
// //                     <td style={styles.td}>
// //                       <div style={styles.itemName}>{item.itemName}</div>
// //                       {item.description && <div style={styles.desc}>{item.description}</div>}
// //                     </td>
// //                     <td style={styles.td}>
// //                       <span style={styles.sizeBadge}>
// //                         {item.length} x {item.width} x {item.height} {item.dimensionUnit}
// //                       </span>
// //                     </td>
// //                     <td style={styles.td}>
// //                       <span style={getCategoryStyle(item.category)}>{item.category}</span>
// //                     </td>
// //                     <td style={styles.td}>
// //                       <span style={{
// //                         fontWeight: 'bold', 
// //                         color: item.isLowStock ? '#ef4444' : '#10b981'
// //                       }}>
// //                         {item.qty} {item.isLowStock && "⚠️"}
// //                       </span>
// //                     </td>
// //                     <td style={styles.td}>{item.unit}</td>
// //                     <td style={styles.td}>{item.minimumStock}</td>
// //                     <td style={{...styles.td, textAlign: 'right'}}>
// //                        {/* Add your buttons here (Add Stock, Edit, Delete) */}
// //                        <button style={styles.iconBtn}>✏️</button>
// //                     </td>
// //                   </tr>
// //                 ))
// //               )}
// //             </tbody>
// //           </table>
// //         </div>

// //       </div>
// //     </div>
// //   );
// // }

// // const getCategoryStyle = (cat) => {
// //   if (cat === "Box") return { ...styles.badge, backgroundColor: "#e0f2fe", color: "#0369a1" };
// //   if (cat === "Label") return { ...styles.badge, backgroundColor: "#fce7f3", color: "#be185d" };
// //   return { ...styles.badge, backgroundColor: "#f3f4f6", color: "#374151" };
// // };

// // const styles = {
// //   container: { minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "Inter, sans-serif" },
// //   mainContent: { maxWidth: "1200px", margin: "0 auto", padding: "30px" },
// //   pageHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" },
// //   pageTitle: { fontSize: "28px", fontWeight: "800", color: "#1e293b", margin: 0 },
// //   subtitle: { color: "#64748b", margin: "5px 0 0" },
// //   createBtn: { backgroundColor: "#2563eb", color: "white", padding: "12px 24px", borderRadius: "10px", border: "none", fontWeight: "600", cursor: "pointer", boxShadow: "0 4px 6px -1px rgba(37, 99, 235, 0.2)" },
// //   filterBar: { display: "flex", gap: "10px", marginBottom: "20px" },
// //   searchInput: { flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" },
// //   filterSelect: { padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "white" },
// //   searchBtn: { backgroundColor: "#0f172a", color: "white", padding: "0 20px", borderRadius: "8px", border: "none", cursor: "pointer" },
// //   tableCard: { backgroundColor: "white", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", overflow: "hidden", border: "1px solid #e2e8f0" },
// //   table: { width: "100%", borderCollapse: "collapse" },
// //   th: { padding: "16px 20px", textAlign: "left", fontSize: "12px", fontWeight: "700", color: "#64748b", backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", textTransform: "uppercase" },
// //   td: { padding: "16px 20px", borderBottom: "1px solid #f1f5f9", fontSize: "14px", color: "#334155" },
// //   row: { transition: "background 0.1s" },
// //   centerTd: { textAlign: "center", padding: "40px", color: "#94a3b8" },
// //   itemName: { fontWeight: "600", color: "#0f172a" },
// //   desc: { fontSize: "12px", color: "#94a3b8", marginTop: "2px" },
// //   sizeBadge: { fontFamily: "monospace", backgroundColor: "#f1f5f9", padding: "4px 8px", borderRadius: "4px", fontSize: "13px", border: "1px solid #e2e8f0" },
// //   badge: { padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "600", display: "inline-block" },
// //   iconBtn: { border: "none", background: "none", cursor: "pointer", fontSize: "16px" }
// // };


























// import React, { useEffect, useState } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import Header from "../components/Header";

// export default function PackZoneManagement() {
//   const navigate = useNavigate();
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // States
//   const [categoryFilter, setCategoryFilter] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");

//   // Edit Modal State
//   const [editingItem, setEditingItem] = useState(null);
//   const [editForm, setEditForm] = useState({});

//   useEffect(() => {
//     fetchItems();
//   }, [categoryFilter]);

//   const fetchItems = async () => {
//     setLoading(true);
//     try {
//       const params = {};
//       if (categoryFilter) params.category = categoryFilter;
//       if (searchTerm) params.search = searchTerm;
//       const res = await api.get("/packzone", { params });
//       setItems(res.data.items);
//     } catch (error) {
//       toast.error("Failed to load items");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ================= EDIT LOGIC FIXED =================
//   const handleEditClick = (item) => {
//     setEditingItem(item);
//     // Populate form with all fields including new ones
//     setEditForm({
//       itemName: item.itemName,
//       category: item.category,
//       length: item.length || 0,
//       width: item.width || 0,
//       height: item.height || 0,
//       dimensionUnit: item.dimensionUnit || "inch",
//       wrappingSize: item.wrappingSize || "", // For Wrapping
//       unit: item.unit,
//       minimumStock: item.minimumStock,
//       description: item.description || ""
//     });
//   };

//   const handleUpdateItem = async (e) => {
//     e.preventDefault();
//     try {
//       // Clean data before sending
//       const payload = { ...editForm };

//       if (payload.category === "Wrapping") {
//         payload.length = 0; payload.width = 0; payload.height = 0;
//       } else if (payload.category === "Label") {
//         payload.height = 0; payload.wrappingSize = null;
//       } else {
//         payload.wrappingSize = null;
//       }

//       await api.put(`/packzone/${editingItem._id}`, payload);
//       toast.success("Item updated successfully");
//       setEditingItem(null);
//       fetchItems();
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Update failed");
//     }
//   };

//   // ================= RENDER TABLE =================
//   return (
//     <div style={styles.container}>
//       <Header />
//       <div style={styles.mainContent}>

//         {/* Header & Filter logic same as before... */}
//         <div style={styles.pageHeader}>
//             <h2 style={styles.pageTitle}>PackZone Inventory</h2>
//             <button onClick={() => navigate("/add-packzone")} style={styles.createBtn}>+ Add Item</button>
//         </div>

//         <div style={styles.filterBar}>
//              <input type="text" placeholder="Search..." value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} style={styles.searchInput} />
//              <select value={categoryFilter} onChange={e=>setCategoryFilter(e.target.value)} style={styles.filterSelect}>
//                 <option value="">All Categories</option>
//                 <option value="Box">Box</option>
//                 <option value="Label">Label</option>
//                 <option value="Wrapping">Wrapping</option>
//              </select>
//              <button onClick={fetchItems} style={styles.searchBtn}>Search</button>
//         </div>

//         {/* TABLE */}
//         <div style={styles.tableCard}>
//           <table style={styles.table}>
//             <thead>
//               <tr>
//                 <th style={styles.th}>ITEM</th>
//                 <th style={styles.th}>SIZE / DIMENSIONS</th>
//                 <th style={styles.th}>CATEGORY</th>
//                 <th style={styles.th}>STOCK</th>
//                 <th style={styles.th}>UNIT</th>
//                 <th style={{...styles.th, textAlign:'right'}}>ACTIONS</th>
//               </tr>
//             </thead>
//             <tbody>
//               {items.map((item) => (
//                 <tr key={item._id} style={styles.row}>
//                   <td style={styles.td}>
//                     <div style={{fontWeight:'600'}}>{item.itemName}</div>
//                   </td>
//                   <td style={styles.td}>
//                     {/* Display logic changed here */}
//                     {item.category === "Wrapping" ? (
//                       <span style={styles.sizeBadge}>{item.wrappingSize || "N/A"}</span>
//                     ) : (
//                       <span style={styles.sizeBadge}>
//                         {item.length}x{item.width}{item.category === "Box" ? `x${item.height}` : ""} {item.dimensionUnit}
//                       </span>
//                     )}
//                   </td>
//                   <td style={styles.td}>{item.category}</td>
//                   <td style={styles.td}>{item.qty}</td>
//                   <td style={styles.td}>{item.unit}</td>
//                   <td style={{...styles.td, textAlign:'right'}}>
//                     <button onClick={() => handleEditClick(item)} style={styles.iconBtn}>✏️</button>
//                     {/* Delete, etc. */}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* ================= EDIT MODAL ================= */}
//         {editingItem && (
//           <div style={styles.modalOverlay}>
//             <div style={styles.modal}>
//               <h3>Edit Item</h3>
//               <form onSubmit={handleUpdateItem} style={styles.form}>

//                 {/* Name */}
//                 <div style={styles.formGroup}>
//                     <label>Item Name</label>
//                     <input type="text" value={editForm.itemName} onChange={(e) => setEditForm({...editForm, itemName: e.target.value})} style={styles.input} />
//                 </div>

//                 {/* CONDITIONAL INPUTS FOR EDIT */}
//                 {editForm.category === "Wrapping" ? (
//                     <div style={styles.formGroup}>
//                         <label>Size (Wrapping)</label>
//                         <select value={editForm.wrappingSize} onChange={(e) => setEditForm({...editForm, wrappingSize: e.target.value})} style={styles.select}>
//                             <option value="Small">Small</option>
//                             <option value="Medium">Medium</option>
//                             <option value="Large">Large</option>
//                         </select>
//                     </div>
//                 ) : (
//                     <div style={styles.grid3}>
//                         <div>
//                             <label style={styles.subLabel}>Length</label>
//                             <input type="number" value={editForm.length} onChange={(e) => setEditForm({...editForm, length: e.target.value})} style={styles.input} />
//                         </div>
//                         <div>
//                             <label style={styles.subLabel}>Width</label>
//                             <input type="number" value={editForm.width} onChange={(e) => setEditForm({...editForm, width: e.target.value})} style={styles.input} />
//                         </div>
//                         {editForm.category === "Box" && (
//                             <div>
//                                 <label style={styles.subLabel}>Height</label>
//                                 <input type="number" value={editForm.height} onChange={(e) => setEditForm({...editForm, height: e.target.value})} style={styles.input} />
//                             </div>
//                         )}
//                     </div>
//                 )}

//                 <div style={styles.formGroup}>
//                     <label>Min Stock</label>
//                     <input type="number" value={editForm.minimumStock} onChange={(e) => setEditForm({...editForm, minimumStock: e.target.value})} style={styles.input} />
//                 </div>

//                 <div style={{marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'flex-end'}}>
//                     <button type="button" onClick={() => setEditingItem(null)} style={styles.btnCancel}>Cancel</button>
//                     <button type="submit" style={styles.btnSubmit}>Update</button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }

// // Styles (Condensed for brevity - same as before + modal styles)
// const styles = {
//     // ... Copy styles from previous message ...
//     modalOverlay: { position: 'fixed', top:0, left:0, right:0, bottom:0, background: 'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex: 100 },
//     modal: { background: 'white', padding: '30px', borderRadius: '16px', width: '90%', maxWidth: '500px' },
//     formGroup: { marginBottom: '15px' },
//     input: { width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', boxSizing: 'border-box' },
//     select: { width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', boxSizing: 'border-box' },
//     grid3: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '15px' },
//     subLabel: { fontSize: '12px', color: '#666', display: 'block', marginBottom: '4px' },
//     btnSubmit: { background: '#3b82f6', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' },
//     btnCancel: { background: '#f3f4f6', color: '#333', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' },
//     // Add other styles from previous code (container, table, etc.)
//     container: { minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "Inter, sans-serif" },
//     mainContent: { maxWidth: "1200px", margin: "0 auto", padding: "30px" },
//     pageHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" },
//     pageTitle: { fontSize: "28px", fontWeight: "800", color: "#1e293b", margin: 0 },
//     createBtn: { backgroundColor: "#2563eb", color: "white", padding: "12px 24px", borderRadius: "10px", border: "none", fontWeight: "600", cursor: "pointer" },
//     filterBar: { display: "flex", gap: "10px", marginBottom: "20px" },
//     searchInput: { flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" },
//     filterSelect: { padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "white" },
//     searchBtn: { backgroundColor: "#0f172a", color: "white", padding: "0 20px", borderRadius: "8px", border: "none", cursor: "pointer" },
//     tableCard: { backgroundColor: "white", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", overflow: "hidden", border: "1px solid #e2e8f0" },
//     table: { width: "100%", borderCollapse: "collapse" },
//     th: { padding: "16px 20px", textAlign: "left", fontSize: "12px", fontWeight: "700", color: "#64748b", backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", textTransform: "uppercase" },
//     td: { padding: "16px 20px", borderBottom: "1px solid #f1f5f9", fontSize: "14px", color: "#334155" },
//     row: { transition: "background 0.1s" },
//     sizeBadge: { fontFamily: "monospace", backgroundColor: "#f1f5f9", padding: "4px 8px", borderRadius: "4px", fontSize: "13px", border: "1px solid #e2e8f0" },
//     iconBtn: { border: "none", background: "none", cursor: "pointer", fontSize: "16px" }
// };



























// import React, { useEffect, useState } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import Header from "../components/Header";

// export default function PackZoneManagement() {
//   const navigate = useNavigate();
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Filters
//   const [categoryFilter, setCategoryFilter] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");

//   // ================= MODAL STATES =================
//   const [editingItem, setEditingItem] = useState(null);
//   const [deleteModal, setDeleteModal] = useState(null);
//   const [stockModal, setStockModal] = useState(null); // { item, type: 'ADD' | 'USE' }
//   const [logsModal, setLogsModal] = useState(null); // { item, logs: [] }

//   // Forms
//   const [editForm, setEditForm] = useState({});
//   const [stockForm, setStockForm] = useState({ quantity: "", reason: "" });

//   useEffect(() => {
//     fetchItems();
//   }, [categoryFilter]);

//   const fetchItems = async () => {
//     setLoading(true);
//     try {
//       const params = {};
//       if (categoryFilter) params.category = categoryFilter;
//       if (searchTerm) params.search = searchTerm;
//       const res = await api.get("/packzone", { params });
//       setItems(res.data.items);
//     } catch (error) {
//       toast.error("Failed to load items");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ================= DELETE LOGIC =================
//   const handleDelete = async () => {
//     try {
//       await api.delete(`/packzone/${deleteModal._id}`);
//       toast.success("Item deleted successfully");
//       setDeleteModal(null);
//       fetchItems();
//     } catch (error) {
//       toast.error("Failed to delete item");
//     }
//   };

//   // ================= STOCK LOGIC (ADD / USE) =================
//   const openStockModal = (item, type) => {
//     setStockModal({ item, type });
//     setStockForm({ quantity: "", reason: "" });
//   };

//   const handleStockSubmit = async (e) => {
//     e.preventDefault();
//     if (!stockForm.quantity || stockForm.quantity <= 0) return toast.error("Invalid Quantity");

//     try {
//       const endpoint = stockModal.type === 'ADD' ? 'add' : 'use';
//       await api.post(`/packzone/${stockModal.item._id}/${endpoint}`, stockForm);

//       toast.success(`Stock ${stockModal.type === 'ADD' ? 'Added' : 'Used'} Successfully`);
//       setStockModal(null);
//       fetchItems(); // Refresh table
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Action failed");
//     }
//   };

//   // ================= LOGS LOGIC =================
//   const openLogsModal = async (item) => {
//     try {
//       const res = await api.get(`/packzone/${item._id}/logs`);
//       setLogsModal({ item, logs: res.data.logs });
//     } catch (error) {
//       toast.error("Failed to fetch logs");
//     }
//   };

//   // ================= EDIT LOGIC =================
//   const handleEditClick = (item) => {
//     setEditingItem(item);
//     setEditForm({
//       itemName: item.itemName,
//       category: item.category,
//       length: item.length || 0,
//       width: item.width || 0,
//       height: item.height || 0,
//       dimensionUnit: item.dimensionUnit || "inch",
//       wrappingSize: item.wrappingSize || "",
//       unit: item.unit,
//       minimumStock: item.minimumStock,
//       description: item.description || ""
//     });
//   };

//   const handleUpdateItem = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = { ...editForm };
//       if (payload.category === "Wrapping") {
//         payload.length = 0; payload.width = 0; payload.height = 0;
//       } else if (payload.category === "Label") {
//         payload.height = 0; payload.wrappingSize = null;
//       } else {
//         payload.wrappingSize = null;
//       }

//       await api.put(`/packzone/${editingItem._id}`, payload);
//       toast.success("Item updated");
//       setEditingItem(null);
//       fetchItems();
//     } catch (error) {
//       toast.error("Update failed");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <Header />
//       <div style={styles.mainContent}>

//         {/* Header & Search */}
//         <div style={styles.pageHeader}>
//             <h2 style={styles.pageTitle}>PackZone Inventory</h2>
//             <button onClick={() => navigate("/add-packzone")} style={styles.createBtn}>+ Add Item</button>
//         </div>

//         <div style={styles.filterBar}>
//              <input type="text" placeholder="Search..." value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} style={styles.searchInput} />
//              <select value={categoryFilter} onChange={e=>setCategoryFilter(e.target.value)} style={styles.filterSelect}>
//                 <option value="">All Categories</option>
//                 <option value="Box">Box</option>
//                 <option value="Label">Label</option>
//                 <option value="Wrapping">Wrapping</option>
//              </select>
//              <button onClick={fetchItems} style={styles.searchBtn}>Search</button>
//         </div>

//         {/* TABLE */}
//         <div style={styles.tableCard}>
//           <table style={styles.table}>
//             <thead>
//               <tr>
//                 <th style={styles.th}>ITEM</th>
//                 <th style={styles.th}>SIZE</th>
//                 <th style={styles.th}>CATEGORY</th>
//                 <th style={styles.th}>STOCK</th>
//                 <th style={styles.th}>UNIT</th>
//                 <th style={{...styles.th, textAlign:'right'}}>ACTIONS</th>
//               </tr>
//             </thead>
//             <tbody>
//               {items.map((item) => (
//                 <tr key={item._id} style={styles.row}>
//                   <td style={styles.td}>
//                     <div style={{fontWeight:'600'}}>{item.itemName}</div>
//                   </td>
//                   <td style={styles.td}>
//                     {item.category === "Wrapping" ? (
//                       <span style={styles.sizeBadge}>{item.wrappingSize || "N/A"}</span>
//                     ) : (
//                       <span style={styles.sizeBadge}>
//                         {item.length}x{item.width}{item.category === "Box" ? `x${item.height}` : ""} {item.dimensionUnit}
//                       </span>
//                     )}
//                   </td>
//                   <td style={styles.td}>{item.category}</td>
//                   <td style={styles.td}>
//                     <span style={{fontWeight: 'bold', color: item.isLowStock ? '#dc2626' : '#16a34a'}}>
//                       {item.qty} {item.isLowStock && "⚠️"}
//                     </span>
//                   </td>
//                   <td style={styles.td}>{item.unit}</td>
//                   <td style={{...styles.td, textAlign:'right'}}>
//                     <div style={styles.actionGroup}>
//                       <button onClick={() => openStockModal(item, 'ADD')} style={{...styles.iconBtn, color: '#16a34a'}} title="Add Stock">➕</button>
//                       <button onClick={() => openStockModal(item, 'USE')} style={{...styles.iconBtn, color: '#dc2626'}} title="Use Stock">➖</button>
//                       <button onClick={() => openLogsModal(item)} style={{...styles.iconBtn, color: '#2563eb'}} title="History">📜</button>
//                       <button onClick={() => handleEditClick(item)} style={{...styles.iconBtn, color: '#d97706'}} title="Edit">✏️</button>
//                       <button onClick={() => setDeleteModal(item)} style={{...styles.iconBtn, color: '#dc2626'}} title="Delete">🗑️</button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* ================= EDIT MODAL ================= */}
//         {editingItem && (
//           <div style={styles.modalOverlay}>
//             <div style={styles.modal}>
//               <h3>Edit Item</h3>
//               <form onSubmit={handleUpdateItem} style={styles.form}>
//                 <div style={styles.formGroup}>
//                     <label>Item Name</label>
//                     <input type="text" value={editForm.itemName} onChange={(e) => setEditForm({...editForm, itemName: e.target.value})} style={styles.input} />
//                 </div>
//                 {/* Conditional Inputs Logic Same as before */}
//                 {editForm.category === "Wrapping" ? (
//                     <div style={styles.formGroup}>
//                         <label>Size</label>
//                         <select value={editForm.wrappingSize} onChange={(e) => setEditForm({...editForm, wrappingSize: e.target.value})} style={styles.select}>
//                             <option value="Small">Small</option>
//                             <option value="Medium">Medium</option>
//                             <option value="Large">Large</option>
//                         </select>
//                     </div>
//                 ) : (
//                     <div style={styles.grid3}>
//                         <input type="number" placeholder="L" value={editForm.length} onChange={(e) => setEditForm({...editForm, length: e.target.value})} style={styles.input} />
//                         <input type="number" placeholder="W" value={editForm.width} onChange={(e) => setEditForm({...editForm, width: e.target.value})} style={styles.input} />
//                         {editForm.category === "Box" && <input type="number" placeholder="H" value={editForm.height} onChange={(e) => setEditForm({...editForm, height: e.target.value})} style={styles.input} />}
//                     </div>
//                 )}
//                 <div style={styles.formGroup}>
//                     <label>Min Stock</label>
//                     <input type="number" value={editForm.minimumStock} onChange={(e) => setEditForm({...editForm, minimumStock: e.target.value})} style={styles.input} />
//                 </div>
//                 <div style={styles.modalActions}>
//                     <button type="button" onClick={() => setEditingItem(null)} style={styles.btnCancel}>Cancel</button>
//                     <button type="submit" style={styles.btnSubmit}>Update</button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         {/* ================= STOCK MODAL (ADD / USE) ================= */}
//         {stockModal && (
//           <div style={styles.modalOverlay}>
//             <div style={styles.modal}>
//               <h3>{stockModal.type === 'ADD' ? '➕ Add Stock' : '➖ Use Stock'}</h3>
//               <p style={{color: '#666', fontSize: '14px', margin: '0 0 15px 0'}}>
//                 Item: <strong>{stockModal.item.itemName}</strong><br/>
//                 Current: {stockModal.item.qty} {stockModal.item.unit}
//               </p>
//               <form onSubmit={handleStockSubmit}>
//                 <div style={styles.formGroup}>
//                   <label>Quantity</label>
//                   <input type="number" autoFocus value={stockForm.quantity} onChange={e => setStockForm({...stockForm, quantity: e.target.value})} style={styles.input} required min="1" />
//                 </div>
//                 <div style={styles.formGroup}>
//                   <label>Reason (Optional)</label>
//                   <input type="text" value={stockForm.reason} onChange={e => setStockForm({...stockForm, reason: e.target.value})} style={styles.input} placeholder={stockModal.type === 'ADD' ? "e.g. Purchase" : "e.g. Order #123"} />
//                 </div>
//                 <div style={styles.modalActions}>
//                   <button type="button" onClick={() => setStockModal(null)} style={styles.btnCancel}>Cancel</button>
//                   <button type="submit" style={stockModal.type === 'ADD' ? styles.btnSuccess : styles.btnDanger}>
//                     Confirm {stockModal.type === 'ADD' ? 'Add' : 'Use'}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         {/* ================= DELETE CONFIRM MODAL ================= */}
//         {deleteModal && (
//           <div style={styles.modalOverlay}>
//             <div style={styles.modal}>
//               <h3 style={{color: '#dc2626'}}>🗑️ Delete Item?</h3>
//               <p>Are you sure you want to delete <strong>{deleteModal.itemName}</strong>?</p>
//               <div style={styles.modalActions}>
//                 <button onClick={() => setDeleteModal(null)} style={styles.btnCancel}>No, Keep it</button>
//                 <button onClick={handleDelete} style={styles.btnDanger}>Yes, Delete</button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ================= LOGS MODAL ================= */}
//         {logsModal && (
//           <div style={styles.modalOverlay}>
//             <div style={{...styles.modal, maxWidth: '600px'}}>
//               <h3>📜 History: {logsModal.item.itemName}</h3>
//               <div style={styles.logsContainer}>
//                 {logsModal.logs.length === 0 ? <p>No history found.</p> : (
//                   <table style={{width: '100%', fontSize: '13px', borderCollapse: 'collapse'}}>
//                     <thead>
//                       <tr style={{textAlign: 'left', borderBottom: '1px solid #ddd'}}>
//                         <th style={{padding: '8px'}}>Date</th>
//                         <th style={{padding: '8px'}}>Action</th>
//                         <th style={{padding: '8px'}}>Qty</th>
//                         <th style={{padding: '8px'}}>By</th>
//                         <th style={{padding: '8px'}}>Reason</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {logsModal.logs.map(log => (
//                         <tr key={log._id} style={{borderBottom: '1px solid #eee'}}>
//                           <td style={{padding: '8px'}}>{new Date(log.createdAt).toLocaleDateString()}</td>
//                           <td style={{padding: '8px', fontWeight: 'bold', color: log.actionType === 'ADD' ? 'green' : log.actionType === 'USE' ? 'red' : 'orange'}}>{log.actionType}</td>
//                           <td style={{padding: '8px'}}>{log.quantity}</td>
//                           <td style={{padding: '8px'}}>{log.performedBy?.name || 'User'}</td>
//                           <td style={{padding: '8px', color: '#666'}}>{log.reason}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 )}
//               </div>
//               <div style={{marginTop: '15px', textAlign: 'right'}}>
//                 <button onClick={() => setLogsModal(null)} style={styles.btnCancel}>Close</button>
//               </div>
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }

// // ================= STYLES =================
// const styles = {
//     // Basic Layout
//     container: { minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "Inter, sans-serif" },
//     mainContent: { maxWidth: "1200px", margin: "0 auto", padding: "30px" },
//     pageHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" },
//     pageTitle: { fontSize: "28px", fontWeight: "800", color: "#1e293b", margin: 0 },
//     createBtn: { backgroundColor: "#2563eb", color: "white", padding: "12px 24px", borderRadius: "10px", border: "none", fontWeight: "600", cursor: "pointer" },

//     // Filters
//     filterBar: { display: "flex", gap: "10px", marginBottom: "20px" },
//     searchInput: { flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" },
//     filterSelect: { padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "white" },
//     searchBtn: { backgroundColor: "#0f172a", color: "white", padding: "0 20px", borderRadius: "8px", border: "none", cursor: "pointer" },

//     // Table
//     tableCard: { backgroundColor: "white", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", overflow: "hidden", border: "1px solid #e2e8f0" },
//     table: { width: "100%", borderCollapse: "collapse" },
//     th: { padding: "16px 20px", textAlign: "left", fontSize: "12px", fontWeight: "700", color: "#64748b", backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", textTransform: "uppercase" },
//     td: { padding: "16px 20px", borderBottom: "1px solid #f1f5f9", fontSize: "14px", color: "#334155" },
//     row: { transition: "background 0.1s" },
//     sizeBadge: { fontFamily: "monospace", backgroundColor: "#f1f5f9", padding: "4px 8px", borderRadius: "4px", fontSize: "13px", border: "1px solid #e2e8f0" },

//     // Actions
//     actionGroup: { display: 'flex', gap: '8px', justifyContent: 'flex-end' },
//     iconBtn: { border: "none", background: "#f1f5f9", padding: "6px", borderRadius: "6px", cursor: "pointer", fontSize: "14px", transition: '0.2s' },

//     // Modals
//     modalOverlay: { position: 'fixed', top:0, left:0, right:0, bottom:0, background: 'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex: 100 },
//     modal: { background: 'white', padding: '30px', borderRadius: '16px', width: '90%', maxWidth: '450px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' },
//     modalActions: { marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'flex-end' },
//     formGroup: { marginBottom: '15px' },
//     input: { width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', boxSizing: 'border-box' },
//     select: { width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', boxSizing: 'border-box' },
//     grid3: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '15px' },

//     // Logs
//     logsContainer: { maxHeight: '300px', overflowY: 'auto', border: '1px solid #eee', borderRadius: '8px', padding: '10px' },

//     // Buttons
//     btnSubmit: { background: '#3b82f6', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' },
//     btnSuccess: { background: '#16a34a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' },
//     btnDanger: { background: '#dc2626', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' },
//     btnCancel: { background: '#f3f4f6', color: '#333', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' },
//     subLabel: { fontSize: '12px', color: '#666', display: 'block', marginBottom: '4px' },
// };
























// import React, { useEffect, useState } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import Header from "../components/Header";

// export default function PackZoneManagement() {
//   const navigate = useNavigate();
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Filters
//   const [categoryFilter, setCategoryFilter] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");

//   // Modals
//   const [editingItem, setEditingItem] = useState(null);
//   const [deleteModal, setDeleteModal] = useState(null);
//   const [stockModal, setStockModal] = useState(null);
//   const [logsModal, setLogsModal] = useState(null);

//   // Forms
//   const [editForm, setEditForm] = useState({});
//   const [stockForm, setStockForm] = useState({ quantity: "", reason: "" });

//   useEffect(() => {
//     fetchItems();
//   }, [categoryFilter]);

//   const fetchItems = async () => {
//     setLoading(true);
//     try {
//       const params = {};
//       if (categoryFilter) params.category = categoryFilter;
//       if (searchTerm) params.search = searchTerm;
//       const res = await api.get("/packzone", { params });
//       setItems(res.data.items);
//     } catch (error) {
//       toast.error("Failed to load items");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await api.delete(`/packzone/${deleteModal._id}`);
//       toast.success("Item deleted successfully");
//       setDeleteModal(null);
//       fetchItems();
//     } catch (error) {
//       toast.error("Failed to delete item");
//     }
//   };

//   const openStockModal = (item, type) => {
//     setStockModal({ item, type });
//     setStockForm({ quantity: "", reason: "" });
//   };

//   const handleStockSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const endpoint = stockModal.type === 'ADD' ? 'add' : 'use';
//       await api.post(`/packzone/${stockModal.item._id}/${endpoint}`, stockForm);
//       toast.success(`Stock Updated`);
//       setStockModal(null);
//       fetchItems();
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Action failed");
//     }
//   };

//   const openLogsModal = async (item) => {
//     try {
//       const res = await api.get(`/packzone/${item._id}/logs`);
//       setLogsModal({ item, logs: res.data.logs });
//     } catch (error) {
//       toast.error("Failed to fetch logs");
//     }
//   };

//   // ================= EDIT LOGIC UPDATED =================
//   const handleEditClick = (item) => {
//     setEditingItem(item);
//     setEditForm({
//       itemName: item.itemName,
//       category: item.category,
//       size: item.size, // Single string field
//       unit: item.unit,
//       costing: item.costing || 0,
//       minimumStock: item.minimumStock,
//       description: item.description || "",
//       vendor: item.vendor || ""
//     });
//   };

//   const handleUpdateItem = async (e) => {
//     e.preventDefault();
//     try {
//       await api.put(`/packzone/${editingItem._id}`, editForm);
//       toast.success("Item updated");
//       setEditingItem(null);
//       fetchItems();
//     } catch (error) {
//       toast.error("Update failed");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <Header />
//       <div style={styles.mainContent}>

//         <div style={styles.pageHeader}>
//             <h2 style={styles.pageTitle}>PackZone Inventory</h2>
//             <button onClick={() => navigate("/add-packzone")} style={styles.createBtn}>+ Add Item</button>
//         </div>

//         <div style={styles.filterBar}>
//              <input type="text" placeholder="Search by name..." value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} style={styles.searchInput} />
//              <select value={categoryFilter} onChange={e=>setCategoryFilter(e.target.value)} style={styles.filterSelect}>
//                 <option value="">All Categories</option>
//                 <option value="Packaging Boxes">📦 Packaging Boxes</option>
//                 <option value="Branding Stickers">🏷️ Branding Stickers</option>
//                 <option value="Marketing Collateral">📜 Marketing Collateral</option>
//              </select>
//              <button onClick={fetchItems} style={styles.searchBtn}>Search</button>
//         </div>

//         <div style={styles.tableCard}>
//           <table style={styles.table}>
//             <thead>
//               <tr>
//                 <th style={styles.th}>ITEM / SKU</th>
//                 <th style={styles.th}>SIZE</th>
//                 <th style={styles.th}>CATEGORY</th>
//                 <th style={styles.th}>STOCK</th>
//                 <th style={styles.th}>COSTING</th>
//                 <th style={{...styles.th, textAlign:'right'}}>ACTIONS</th>
//               </tr>
//             </thead>
//             <tbody>
//               {items.map((item) => (
//                 <tr key={item._id} style={styles.row}>
//                   <td style={styles.td}>
//                     <div style={{fontWeight:'600'}}>{item.itemName}</div>
//                     <div style={{fontSize:'11px', color:'#94a3b8'}}>{item.item_sku}</div>
//                   </td>
//                   <td style={styles.td}>
//                     <span style={styles.sizeBadge}>{item.size}</span>
//                   </td>
//                   <td style={styles.td}>{item.category}</td>
//                   <td style={styles.td}>
//                     <span style={{fontWeight: 'bold', color: item.isLowStock ? '#dc2626' : '#16a34a'}}>
//                       {item.qty} {item.unit} {item.isLowStock && "⚠️"}
//                     </span>
//                   </td>
//                   <td style={styles.td}>₹{item.costing}</td>
//                   <td style={{...styles.td, textAlign:'right'}}>
//                     <div style={styles.actionGroup}>
//                       <button onClick={() => openStockModal(item, 'ADD')} style={{...styles.iconBtn, color: '#16a34a'}} title="Add Stock">➕</button>
//                       <button onClick={() => openStockModal(item, 'USE')} style={{...styles.iconBtn, color: '#dc2626'}} title="Use Stock">➖</button>
//                       <button onClick={() => openLogsModal(item)} style={{...styles.iconBtn, color: '#2563eb'}} title="History">📜</button>
//                       <button onClick={() => handleEditClick(item)} style={{...styles.iconBtn, color: '#d97706'}} title="Edit">✏️</button>
//                       <button onClick={() => setDeleteModal(item)} style={{...styles.iconBtn, color: '#dc2626'}} title="Delete">🗑️</button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* ================= EDIT MODAL ================= */}
//         {editingItem && (
//           <div style={styles.modalOverlay}>
//             <div style={styles.modal}>
//               <h3>Edit Item</h3>
//               <form onSubmit={handleUpdateItem} style={styles.form}>
//                 <div style={styles.formGroup}>
//                     <label>Item Name</label>
//                     <input type="text" value={editForm.itemName} onChange={(e) => setEditForm({...editForm, itemName: e.target.value})} style={styles.input} required />
//                 </div>
//                 <div style={styles.formGroup}>
//                     <label>Size (e.g. 18*9*9 or 5cm)</label>
//                     <input type="text" value={editForm.size} onChange={(e) => setEditForm({...editForm, size: e.target.value})} style={styles.input} required />
//                 </div>
//                 <div style={styles.grid2}>
//                     <div style={styles.formGroup}>
//                         <label>Costing (₹)</label>
//                         <input type="number" step="0.01" value={editForm.costing} onChange={(e) => setEditForm({...editForm, costing: e.target.value})} style={styles.input} />
//                     </div>
//                     <div style={styles.formGroup}>
//                         <label>Min Stock</label>
//                         <input type="number" value={editForm.minimumStock} onChange={(e) => setEditForm({...editForm, minimumStock: e.target.value})} style={styles.input} />
//                     </div>
//                 </div>
//                 <div style={styles.modalActions}>
//                     <button type="button" onClick={() => setEditingItem(null)} style={styles.btnCancel}>Cancel</button>
//                     <button type="submit" style={styles.btnSubmit}>Update</button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         {/* Rest of Modals (Stock, Delete, Logs) same as your original file */}
//       </div>
//     </div>
//   );
// }
// // ... styles object (unchanged)



// // ================= STYLES =================
// const styles = {
//     // Basic Layout
//     container: { minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "Inter, sans-serif" },
//     mainContent: { maxWidth: "1200px", margin: "0 auto", padding: "30px" },
//     pageHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" },
//     pageTitle: { fontSize: "28px", fontWeight: "800", color: "#1e293b", margin: 0 },
//     createBtn: { backgroundColor: "#2563eb", color: "white", padding: "12px 24px", borderRadius: "10px", border: "none", fontWeight: "600", cursor: "pointer" },

//     // Filters
//     filterBar: { display: "flex", gap: "10px", marginBottom: "20px" },
//     searchInput: { flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" },
//     filterSelect: { padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "white" },
//     searchBtn: { backgroundColor: "#0f172a", color: "white", padding: "0 20px", borderRadius: "8px", border: "none", cursor: "pointer" },

//     // Table
//     tableCard: { backgroundColor: "white", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", overflow: "hidden", border: "1px solid #e2e8f0" },
//     table: { width: "100%", borderCollapse: "collapse" },
//     th: { padding: "16px 20px", textAlign: "left", fontSize: "12px", fontWeight: "700", color: "#64748b", backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", textTransform: "uppercase" },
//     td: { padding: "16px 20px", borderBottom: "1px solid #f1f5f9", fontSize: "14px", color: "#334155" },
//     row: { transition: "background 0.1s" },
//     sizeBadge: { fontFamily: "monospace", backgroundColor: "#f1f5f9", padding: "4px 8px", borderRadius: "4px", fontSize: "13px", border: "1px solid #e2e8f0" },

//     // Actions
//     actionGroup: { display: 'flex', gap: '8px', justifyContent: 'flex-end' },
//     iconBtn: { border: "none", background: "#f1f5f9", padding: "6px", borderRadius: "6px", cursor: "pointer", fontSize: "14px", transition: '0.2s' },

//     // Modals
//     modalOverlay: { position: 'fixed', top:0, left:0, right:0, bottom:0, background: 'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex: 100 },
//     modal: { background: 'white', padding: '30px', borderRadius: '16px', width: '90%', maxWidth: '450px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' },
//     modalActions: { marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'flex-end' },
//     formGroup: { marginBottom: '15px' },
//     input: { width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', boxSizing: 'border-box' },
//     select: { width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', boxSizing: 'border-box' },
//     grid3: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '15px' },

//     // Logs
//     logsContainer: { maxHeight: '300px', overflowY: 'auto', border: '1px solid #eee', borderRadius: '8px', padding: '10px' },

//     // Buttons
//     btnSubmit: { background: '#3b82f6', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' },
//     btnSuccess: { background: '#16a34a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' },
//     btnDanger: { background: '#dc2626', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' },
//     btnCancel: { background: '#f3f4f6', color: '#333', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' },
//     subLabel: { fontSize: '12px', color: '#666', display: 'block', marginBottom: '4px' },
// };
















// import React, { useEffect, useState } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import Header from "../components/Header";

// export default function PackZoneManagement() {
//   const navigate = useNavigate();
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Filters
//   const [categoryFilter, setCategoryFilter] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");

//   // ================= MODAL STATES =================
//   const [editingItem, setEditingItem] = useState(null);
//   const [deleteModal, setDeleteModal] = useState(null);
//   const [stockModal, setStockModal] = useState(null); // { item, type: 'ADD' | 'USE' }
//   const [logsModal, setLogsModal] = useState(null); // { item, logs: [] }

//   // Forms
//   const [editForm, setEditForm] = useState({});
//   const [stockForm, setStockForm] = useState({ quantity: "", reason: "" });

//   useEffect(() => {
//     fetchItems();
//   }, [categoryFilter]);

//   const fetchItems = async () => {
//     setLoading(true);
//     try {
//       const params = {};
//       if (categoryFilter) params.category = categoryFilter;
//       if (searchTerm) params.search = searchTerm;
//       const res = await api.get("/packzone", { params });
//       setItems(res.data.items);
//     } catch (error) {
//       toast.error("Failed to load items");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ================= DELETE LOGIC =================
//   const handleDelete = async () => {
//     try {
//       await api.delete(`/packzone/${deleteModal._id}`);
//       toast.success("Item deleted successfully");
//       setDeleteModal(null);
//       fetchItems();
//     } catch (error) {
//       toast.error("Failed to delete item");
//     }
//   };

//   // ================= STOCK LOGIC (ADD / USE) =================
//   const openStockModal = (item, type) => {
//     setStockModal({ item, type });
//     setStockForm({ quantity: "", reason: "" });
//   };


//   // ================= STOCK LOGIC (ADD / USE) =================
//   const handleStockSubmit = async (e) => {
//     e.preventDefault();

//     // 🔥 FIX: String ko Number mein convert kar diya
//     const numericQuantity = Number(stockForm.quantity);

//     if (!numericQuantity || numericQuantity <= 0) {
//       return toast.error("Invalid Quantity");
//     }

//     try {
//       const endpoint = stockModal.type === 'ADD' ? 'add' : 'use';

//       // 🔥 FIX: Yahan formData mein numericQuantity bheja hai
//       await api.post(`/packzone/${stockModal.item._id}/${endpoint}`, {
//         ...stockForm,
//         quantity: numericQuantity 
//       });

//       toast.success(`Stock ${stockModal.type === 'ADD' ? 'Added' : 'Used'} Successfully`);
//       setStockModal(null);
//       fetchItems();
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Action failed");
//     }
//   };

//   // const handleStockSubmit = async (e) => {
//   //   e.preventDefault();
//   //   if (!stockForm.quantity || stockForm.quantity <= 0) return toast.error("Invalid Quantity");

//   //   try {
//   //     const endpoint = stockModal.type === 'ADD' ? 'add' : 'use';
//   //     await api.post(`/packzone/${stockModal.item._id}/${endpoint}`, stockForm);

//   //     toast.success(`Stock ${stockModal.type === 'ADD' ? 'Added' : 'Used'} Successfully`);
//   //     setStockModal(null);
//   //     fetchItems();
//   //   } catch (error) {
//   //     toast.error(error.response?.data?.message || "Action failed");
//   //   }
//   // };

//   // ================= LOGS LOGIC =================
//   const openLogsModal = async (item) => {
//     try {
//       const res = await api.get(`/packzone/${item._id}/logs`);
//       setLogsModal({ item, logs: res.data.logs });
//     } catch (error) {
//       toast.error("Failed to fetch logs");
//     }
//   };

//   // ================= EDIT LOGIC (Updated for Size String) =================
//   const handleEditClick = (item) => {
//     setEditingItem(item);
//     setEditForm({
//       itemName: item.itemName,
//       category: item.category,
//       size: item.size || "", 
//       unit: item.unit,
//       costing: item.costing || 0,
//       minimumStock: item.minimumStock,
//       description: item.description || "",
//       vendor: item.vendor || ""
//     });
//   };

//   const handleUpdateItem = async (e) => {
//     e.preventDefault();
//     try {
//       await api.put(`/packzone/${editingItem._id}`, editForm);
//       toast.success("Item updated");
//       setEditingItem(null);
//       fetchItems();
//     } catch (error) {
//       toast.error("Update failed");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <Header />
//       <div style={styles.mainContent}>

//         {/* Header & Search */}
//         <div style={styles.pageHeader}>
//             <h2 style={styles.pageTitle}>PackZone Inventory</h2>
//             <button onClick={() => navigate("/add-packzone")} style={styles.createBtn}>+ Add Item</button>
//         </div>

//         <div style={styles.filterBar}>
//              <input type="text" placeholder="Search item..." value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} style={styles.searchInput} />
//              <select value={categoryFilter} onChange={e=>setCategoryFilter(e.target.value)} style={styles.filterSelect}>
//                 <option value="">All Categories</option>
//                 <option value="Packaging Boxes">Packaging Boxes</option>
//                 <option value="Branding Stickers">Branding Stickers</option>
//                 <option value="Marketing Collateral">Marketing Collateral</option>
//              </select>
//              <button onClick={fetchItems} style={styles.searchBtn}>Search</button>
//         </div>

//         {/* TABLE */}
//         <div style={styles.tableCard}>
//           <table style={styles.table}>
//             <thead>
//               <tr>
//                 <th style={styles.th}>ITEM / SKU</th>
//                 <th style={styles.th}>SIZE</th>
//                 <th style={styles.th}>CATEGORY</th>
//                 <th style={styles.th}>STOCK</th>
//                 <th style={styles.th}>COST</th>
//                 <th style={{...styles.th, textAlign:'right'}}>ACTIONS</th>
//               </tr>
//             </thead>
//             <tbody>
//               {items.map((item) => (
//                 <tr key={item._id} style={styles.row}>
//                   <td style={styles.td}>
//                     <div style={{fontWeight:'600'}}>{item.itemName}</div>
//                     <div style={{fontSize:'10px', color:'#64748b', fontFamily:'monospace'}}>{item.item_sku}</div>
//                   </td>
//                   <td style={styles.td}>
//                     <span style={styles.sizeBadge}>{item.size}</span>
//                   </td>
//                   <td style={styles.td}>{item.category}</td>
//                   <td style={styles.td}>
//                     <span style={{fontWeight: 'bold', color: item.isLowStock ? '#dc2626' : '#16a34a'}}>
//                       {item.qty} {item.unit} {item.isLowStock && "⚠️"}
//                     </span>
//                   </td>
//                   <td style={styles.td}>₹{item.costing || 0}</td>
//                   <td style={{...styles.td, textAlign:'right'}}>
//                     <div style={styles.actionGroup}>
//                       <button onClick={() => openStockModal(item, 'ADD')} style={{...styles.iconBtn, color: '#16a34a'}} title="Add Stock">➕</button>
//                       <button onClick={() => openStockModal(item, 'USE')} style={{...styles.iconBtn, color: '#dc2626'}} title="Use Stock">➖</button>
//                       <button onClick={() => openLogsModal(item)} style={{...styles.iconBtn, color: '#2563eb'}} title="History">📜</button>
//                       <button onClick={() => handleEditClick(item)} style={{...styles.iconBtn, color: '#d97706'}} title="Edit">✏️</button>
//                       <button onClick={() => setDeleteModal(item)} style={{...styles.iconBtn, color: '#dc2626'}} title="Delete">🗑️</button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           {items.length === 0 && <div style={{padding:'20px', textAlign:'center', color:'#94a3b8'}}>No items found.</div>}
//         </div>

//         {/* ================= EDIT MODAL ================= */}
//         {editingItem && (
//           <div style={styles.modalOverlay}>
//             <div style={styles.modal}>
//               <h3>Edit Item</h3>
//               <form onSubmit={handleUpdateItem} style={styles.form}>
//                 <div style={styles.formGroup}>
//                     <label style={styles.label}>Item Name</label>
//                     <input type="text" value={editForm.itemName} onChange={(e) => setEditForm({...editForm, itemName: e.target.value})} style={styles.input} required />
//                 </div>
//                 <div style={styles.formGroup}>
//                     <label style={styles.label}>Size (String)</label>
//                     <input type="text" value={editForm.size} onChange={(e) => setEditForm({...editForm, size: e.target.value})} style={styles.input} required />
//                 </div>
//                 <div style={styles.grid2}>
//                   <div style={styles.formGroup}>
//                       <label style={styles.label}>Costing (₹)</label>
//                       <input type="number" step="0.01" value={editForm.costing} onChange={(e) => setEditForm({...editForm, costing: e.target.value})} style={styles.input} />
//                   </div>
//                   <div style={styles.formGroup}>
//                       <label style={styles.label}>Min Stock</label>
//                       <input type="number" value={editForm.minimumStock} onChange={(e) => setEditForm({...editForm, minimumStock: e.target.value})} style={styles.input} />
//                   </div>
//                 </div>
//                 <div style={styles.modalActions}>
//                     <button type="button" onClick={() => setEditingItem(null)} style={styles.btnCancel}>Cancel</button>
//                     <button type="submit" style={styles.btnSubmit}>Update</button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         {/* ================= STOCK MODAL (ADD / USE) ================= */}
//         {stockModal && (
//           <div style={styles.modalOverlay}>
//             <div style={styles.modal}>
//               <h3>{stockModal.type === 'ADD' ? '➕ Add Stock' : '➖ Use Stock'}</h3>
//               <p style={{color: '#666', fontSize: '14px', margin: '0 0 15px 0'}}>
//                 Item: <strong>{stockModal.item.itemName}</strong><br/>
//                 Current: {stockModal.item.qty} {stockModal.item.unit}
//               </p>
//               <form onSubmit={handleStockSubmit}>
//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>Quantity</label>
//                   <input type="number" autoFocus value={stockForm.quantity} onChange={e => setStockForm({...stockForm, quantity: e.target.value})} style={styles.input} required min="1" />
//                 </div>
//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>Reason (Optional)</label>
//                   <input type="text" value={stockForm.reason} onChange={e => setStockForm({...stockForm, reason: e.target.value})} style={styles.input} placeholder={stockModal.type === 'ADD' ? "e.g. Purchase" : "e.g. Order #123"} />
//                 </div>
//                 <div style={styles.modalActions}>
//                   <button type="button" onClick={() => setStockModal(null)} style={styles.btnCancel}>Cancel</button>
//                   <button type="submit" style={stockModal.type === 'ADD' ? styles.btnSuccess : styles.btnDanger}>
//                     Confirm {stockModal.type === 'ADD' ? 'Add' : 'Use'}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         {/* ================= DELETE CONFIRM MODAL ================= */}
//         {deleteModal && (
//           <div style={styles.modalOverlay}>
//             <div style={styles.modal}>
//               <h3 style={{color: '#dc2626'}}>🗑️ Delete Item?</h3>
//               <p>Are you sure you want to delete <strong>{deleteModal.itemName}</strong>?</p>
//               <div style={styles.modalActions}>
//                 <button onClick={() => setDeleteModal(null)} style={styles.btnCancel}>No, Keep it</button>
//                 <button onClick={handleDelete} style={styles.btnDanger}>Yes, Delete</button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ================= LOGS MODAL ================= */}
//         {logsModal && (
//           <div style={styles.modalOverlay}>
//             <div style={{...styles.modal, maxWidth: '600px'}}>
//               <h3>📜 History: {logsModal.item.itemName}</h3>
//               <div style={styles.logsContainer}>
//                 {logsModal.logs.length === 0 ? <p>No history found.</p> : (
//                   <table style={{width: '100%', fontSize: '13px', borderCollapse: 'collapse'}}>
//                     <thead>
//                       <tr style={{textAlign: 'left', borderBottom: '1px solid #ddd'}}>
//                         <th style={{padding: '8px'}}>Date</th>
//                         <th style={{padding: '8px'}}>Action</th>
//                         <th style={{padding: '8px'}}>Qty</th>
//                         <th style={{padding: '8px'}}>By</th>
//                         <th style={{padding: '8px'}}>Reason</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {logsModal.logs.map(log => (
//                         <tr key={log._id} style={{borderBottom: '1px solid #eee'}}>
//                           <td style={{padding: '8px'}}>{new Date(log.createdAt).toLocaleDateString()}</td>
//                           <td style={{padding: '8px', fontWeight: 'bold', color: log.actionType === 'ADD' ? 'green' : log.actionType === 'USE' ? 'red' : 'orange'}}>{log.actionType}</td>
//                           <td style={{padding: '8px'}}>{log.quantity}</td>
//                           <td style={{padding: '8px'}}>{log.performedBy?.name || 'User'}</td>
//                           <td style={{padding: '8px', color: '#666'}}>{log.reason}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 )}
//               </div>
//               <div style={{marginTop: '15px', textAlign: 'right'}}>
//                 <button onClick={() => setLogsModal(null)} style={styles.btnCancel}>Close</button>
//               </div>
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }

// const styles = {
//     container: { minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "Inter, sans-serif" },
//     mainContent: { maxWidth: "1200px", margin: "0 auto", padding: "30px" },
//     pageHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" },
//     pageTitle: { fontSize: "28px", fontWeight: "800", color: "#1e293b", margin: 0 },
//     createBtn: { backgroundColor: "#2563eb", color: "white", padding: "12px 24px", borderRadius: "10px", border: "none", fontWeight: "600", cursor: "pointer" },
//     filterBar: { display: "flex", gap: "10px", marginBottom: "20px" },
//     searchInput: { flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" },
//     filterSelect: { padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "white" },
//     searchBtn: { backgroundColor: "#0f172a", color: "white", padding: "0 20px", borderRadius: "8px", border: "none", cursor: "pointer" },
//     tableCard: { backgroundColor: "white", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", overflow: "hidden", border: "1px solid #e2e8f0" },
//     table: { width: "100%", borderCollapse: "collapse" },
//     th: { padding: "16px 20px", textAlign: "left", fontSize: "12px", fontWeight: "700", color: "#64748b", backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", textTransform: "uppercase" },
//     td: { padding: "16px 20px", borderBottom: "1px solid #f1f5f9", fontSize: "14px", color: "#334155" },
//     row: { transition: "background 0.1s" },
//     sizeBadge: { fontFamily: "monospace", backgroundColor: "#f1f5f9", padding: "4px 8px", borderRadius: "4px", fontSize: "13px", border: "1px solid #e2e8f0" },
//     actionGroup: { display: 'flex', gap: '8px', justifyContent: 'flex-end' },
//     iconBtn: { border: "none", background: "#f1f5f9", padding: "6px", borderRadius: "6px", cursor: "pointer", fontSize: "14px" },
//     modalOverlay: { position: 'fixed', top:0, left:0, right:0, bottom:0, background: 'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex: 100 },
//     modal: { background: 'white', padding: '30px', borderRadius: '16px', width: '90%', maxWidth: '450px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' },
//     modalActions: { marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'flex-end' },
//     formGroup: { marginBottom: '15px', display:'flex', flexDirection:'column', gap:'5px' },
//     label: { fontSize:'14px', fontWeight:'600', color:'#475569' },
//     input: { width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', boxSizing: 'border-box' },
//     grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' },
//     logsContainer: { maxHeight: '300px', overflowY: 'auto', border: '1px solid #eee', borderRadius: '8px', padding: '10px' },
//     btnSubmit: { background: '#3b82f6', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' },
//     btnSuccess: { background: '#16a34a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' },
//     btnDanger: { background: '#dc2626', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' },
//     btnCancel: { background: '#f3f4f6', color: '#333', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' },
// };







































import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Header from "../components/Header";

export default function PackZoneManagement() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // ================= MODAL STATES =================
  const [editingItem, setEditingItem] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [stockModal, setStockModal] = useState(null); // { item, type: 'ADD' | 'USE' }
  const [logsModal, setLogsModal] = useState(null); // { item, logs: [] }

  // Forms
  const [editForm, setEditForm] = useState({});
  const [stockForm, setStockForm] = useState({ quantity: "", reason: "" });

  // 👉 NAYA: Image Upload States
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchItems();
  }, [categoryFilter]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const params = {};
      if (categoryFilter) params.category = categoryFilter;
      if (searchTerm) params.search = searchTerm;
      const res = await api.get("/packzone", { params });
      setItems(res.data.items);
    } catch (error) {
      toast.error("Failed to load items");
    } finally {
      setLoading(false);
    }
  };

  // ================= DELETE LOGIC =================
  const handleDelete = async () => {
    try {
      await api.delete(`/packzone/${deleteModal._id}`);
      toast.success("Item deleted successfully");
      setDeleteModal(null);
      fetchItems();
    } catch (error) {
      toast.error("Failed to delete item");
    }
  };

  // ================= STOCK LOGIC (ADD / USE) =================
  const openStockModal = (item, type) => {
    setStockModal({ item, type });
    setStockForm({ quantity: "", reason: "" });
  };

  const handleStockSubmit = async (e) => {
    e.preventDefault();

    // String ko Number mein convert kar diya
    const numericQuantity = Number(stockForm.quantity);

    if (!numericQuantity || numericQuantity <= 0) {
      return toast.error("Invalid Quantity");
    }

    try {
      const endpoint = stockModal.type === 'ADD' ? 'add' : 'use';

      await api.post(`/packzone/${stockModal.item._id}/${endpoint}`, {
        ...stockForm,
        quantity: numericQuantity
      });

      toast.success(`Stock ${stockModal.type === 'ADD' ? 'Added' : 'Used'} Successfully`);
      setStockModal(null);
      fetchItems();
    } catch (error) {
      toast.error(error.response?.data?.message || "Action failed");
    }
  };

  // ================= LOGS LOGIC =================
  const openLogsModal = async (item) => {
    try {
      const res = await api.get(`/packzone/${item._id}/logs`);
      setLogsModal({ item, logs: res.data.logs });
    } catch (error) {
      toast.error("Failed to fetch logs");
    }
  };

  // ================= EDIT LOGIC =================
  // 👉 UPDATE: handleEditClick me image set karein
  const handleEditClick = (item) => {
    setEditingItem(item);
    setEditForm({
      itemName: item.itemName,
      item_sku: item.item_sku,
      category: item.category,
      size: item.size || "",
      unit: item.unit,
      costing: item.costing || 0,
      minimumStock: item.minimumStock,
      description: item.description || "",
      vendor: item.vendor || "",
      itemImage: item.itemImage || "" // NAYA
    });
    setPreview(item.itemImage || ""); // Modal khulte hi purani image dikhegi
  };

  // 👉 NAYA: Upload Logic
  const handleImageSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);

    try {
      const imgData = new FormData();
      imgData.append("image", file);
      // Apne existing /products/upload endpoint ka hi use kar rahe hain
      const res = await api.post("/products/upload", imgData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setEditForm((prev) => ({ ...prev, itemImage: res.data.url }));
      toast.success("Image uploaded!");
    } catch (err) {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };
  // const handleEditClick = (item) => {
  //   setEditingItem(item);
  //   setEditForm({
  //     itemName: item.itemName,
  //     item_sku: item.item_sku, // Only for display
  //     category: item.category,
  //     size: item.size || "",   // Only for display
  //     unit: item.unit,
  //     costing: item.costing || 0,
  //     minimumStock: item.minimumStock,
  //     description: item.description || "",
  //     vendor: item.vendor || ""
  //   });
  // };

  const handleUpdateItem = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/packzone/${editingItem._id}`, editForm);
      toast.success("Item updated");
      setEditingItem(null);
      fetchItems();
    } catch (error) {
      toast.error("Update failed");
    }
  };

  return (
    <div style={styles.container}>
      {/* <Header /> */}
      <div style={styles.mainContent}>

        {/* Header & Search */}
        <div style={styles.pageHeader}>
          <h2 style={styles.pageTitle}>PackZone Inventory</h2>
          <button onClick={() => navigate("/add-packzone")} style={styles.createBtn}>+ Add Item</button>
        </div>

        <div style={styles.filterBar}>
          <input type="text" placeholder="Search item..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={styles.searchInput} />
          <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} style={styles.filterSelect}>
            <option value="">All Categories</option>
            <option value="Packaging Boxes">Packaging Boxes</option>
            <option value="Branding Stickers">Branding Stickers</option>
            <option value="Marketing Collateral">Marketing Collateral</option>
          </select>
          <button onClick={fetchItems} style={styles.searchBtn}>Search</button>
        </div>

        {/* TABLE */}
<div style={styles.tableCard}>
  <table style={styles.table}>
    <thead>
      <tr>
        <th style={styles.th}>IMAGE</th>
        <th style={styles.th}>ITEM / SKU</th>
        <th style={styles.th}>SIZE</th>
        <th style={styles.th}>CATEGORY</th>
        <th style={styles.th}>STOCK</th>
        <th style={styles.th}>COST</th>
        <th style={{ ...styles.th, textAlign: 'right' }}>ACTIONS</th>
      </tr>
    </thead>
    <tbody>
      {items.map((item) => (
        <tr key={item._id} style={styles.row}>
          
          {/* 1. Image Column - Clickable */}
          <td
            style={{ ...styles.td, cursor: 'pointer' }}
            onClick={() => navigate(`/packzone/${item._id}`)}
            title="View Details"
          >
            {item.itemImage ? (
              <img
                src={item.itemImage}
                alt={item.itemName}
                style={{
                  width: "45px",
                  height: "45px",
                  borderRadius: "8px",
                  objectFit: "cover",
                  border: "1px solid #e2e8f0"
                }}
              />
            ) : (
              <div style={{
                width: "45px",
                height: "45px",
                borderRadius: "8px",
                backgroundColor: "#f1f5f9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "10px",
                color: "#94a3b8",
                border: "1px dashed #cbd5e1"
              }}>
                No Img
              </div>
            )}
          </td>

          {/* 2. Item Name & SKU - Clickable */}
          <td 
            style={{ ...styles.td, cursor: 'pointer' }} 
            onClick={() => navigate(`/packzone/${item._id}`)}
            title="View Details"
          >
            <div style={{ fontWeight: '600', color: '#2563eb' }}>{item.itemName}</div>
            <div style={{ fontSize: '10px', color: '#64748b', fontFamily: 'monospace' }}>{item.item_sku}</div>
          </td>

          {/* 3. Size */}
          <td style={styles.td}>
            <span style={styles.sizeBadge}>{item.size}</span>
          </td>

          {/* 4. Category */}
          <td style={styles.td}>{item.category}</td>

          {/* 5. Stock status */}
          <td style={styles.td}>
            <span style={{ fontWeight: 'bold', color: item.isLowStock ? '#dc2626' : '#16a34a' }}>
              {item.qty} {item.unit} {item.isLowStock && "⚠️"}
            </span>
          </td>

          {/* 6. Costing */}
          <td style={styles.td}>₹{item.costing || 0}</td>

          {/* 7. Action Buttons */}
          <td style={{ ...styles.td, textAlign: 'right' }}>
            <div style={styles.actionGroup}>
              <button onClick={() => openStockModal(item, 'ADD')} style={{ ...styles.iconBtn, color: '#16a34a' }} title="Add Stock">➕</button>
              <button onClick={() => openStockModal(item, 'USE')} style={{ ...styles.iconBtn, color: '#dc2626' }} title="Use Stock">➖</button>
              <button onClick={() => openLogsModal(item)} style={{ ...styles.iconBtn, color: '#2563eb' }} title="History">📜</button>
              <button onClick={() => handleEditClick(item)} style={{ ...styles.iconBtn, color: '#d97706' }} title="Edit">✏️</button>
              <button onClick={() => setDeleteModal(item)} style={{ ...styles.iconBtn, color: '#dc2626' }} title="Delete">🗑️</button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  {items.length === 0 && (
    <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
      <div style={{ fontSize: '24px', marginBottom: '10px' }}>📦</div>
      No items found in PackZone.
    </div>
  )}
</div>
        {/* ================= EDIT MODAL ================= */ }
  {
    editingItem && (
      <div style={styles.modalOverlay}>
        <div style={styles.modal}>
          <h3>Edit Item</h3>
          {/* <form onSubmit={handleUpdateItem} style={styles.form}> */}
          <form onSubmit={handleUpdateItem} style={styles.form}>

            {/* 👉 NAYA: Image Upload Box */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Item Image</label>
              <div style={{
                border: "2px dashed #cbd5e1", borderRadius: "8px", padding: "10px",
                textAlign: "center", position: "relative", backgroundColor: "#fff"
              }}>
                <input type="file" accept="image/*" onChange={handleImageSelect} disabled={uploading}
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer" }}
                />
                {preview ? (
                  <div>
                    <img src={preview} alt="Preview" style={{ maxWidth: "80px", maxHeight: "80px", borderRadius: "6px" }} />
                    <p style={{ fontSize: "11px", color: "#2563eb", margin: "5px 0 0" }}>{uploading ? "Uploading..." : "Click to change"}</p>
                  </div>
                ) : (
                  <p style={{ margin: 0, color: "#64748b", fontSize: "12px" }}>📂 Click to upload image</p>
                )}
              </div>
            </div>

            {/* 🔒 Item Name is now Read-Only */}

            {/* 🔒 Item Name is now Read-Only */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Item Name (Cannot be changed)</label>
              <input
                type="text"
                value={editForm.itemName}
                style={{ ...styles.input, backgroundColor: '#f1f5f9', cursor: 'not-allowed', color: '#64748b' }}
                readOnly
              />
            </div>

            {/* 🔒 SKU is Read-Only */}
            <div style={styles.formGroup}>
              <label style={styles.label}>SKU (Auto-Generated)</label>
              <input
                type="text"
                value={editForm.item_sku}
                style={{ ...styles.input, backgroundColor: '#f1f5f9', cursor: 'not-allowed', color: '#64748b' }}
                readOnly
              />
            </div>

            {/* 🔒 Size is now Read-Only too */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Size (Cannot be changed)</label>
              <input
                type="text"
                value={editForm.size}
                style={{ ...styles.input, backgroundColor: '#f1f5f9', cursor: 'not-allowed', color: '#64748b' }}
                readOnly
              />
            </div>

            {/* ✅ These are changeable */}
            <div style={styles.grid2}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Costing (₹)</label>
                <input type="number" step="0.01" value={editForm.costing} onChange={(e) => setEditForm({ ...editForm, costing: e.target.value })} style={styles.input} />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Min Stock</label>
                <input type="number" value={editForm.minimumStock} onChange={(e) => setEditForm({ ...editForm, minimumStock: e.target.value })} style={styles.input} />
              </div>
            </div>

            <div style={styles.modalActions}>
              <button type="button" onClick={() => setEditingItem(null)} style={styles.btnCancel}>Cancel</button>
              <button type="submit" style={styles.btnSubmit}>Update</button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  {/* ================= STOCK MODAL (ADD / USE) ================= */ }
  {
    stockModal && (
      <div style={styles.modalOverlay}>
        <div style={styles.modal}>
          <h3>{stockModal.type === 'ADD' ? '➕ Add Stock' : '➖ Use Stock'}</h3>
          <p style={{ color: '#666', fontSize: '14px', margin: '0 0 15px 0' }}>
            Item: <strong>{stockModal.item.itemName}</strong><br />
            Current: {stockModal.item.qty} {stockModal.item.unit}
          </p>
          <form onSubmit={handleStockSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Quantity</label>
              <input type="number" autoFocus value={stockForm.quantity} onChange={e => setStockForm({ ...stockForm, quantity: e.target.value })} style={styles.input} required min="1" />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Reason (Optional)</label>
              <input type="text" value={stockForm.reason} onChange={e => setStockForm({ ...stockForm, reason: e.target.value })} style={styles.input} placeholder={stockModal.type === 'ADD' ? "e.g. Purchase" : "e.g. Order #123"} />
            </div>
            <div style={styles.modalActions}>
              <button type="button" onClick={() => setStockModal(null)} style={styles.btnCancel}>Cancel</button>
              <button type="submit" style={stockModal.type === 'ADD' ? styles.btnSuccess : styles.btnDanger}>
                Confirm {stockModal.type === 'ADD' ? 'Add' : 'Use'}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  {/* ================= DELETE CONFIRM MODAL ================= */ }
  {
    deleteModal && (
      <div style={styles.modalOverlay}>
        <div style={styles.modal}>
          <h3 style={{ color: '#dc2626' }}>🗑️ Delete Item?</h3>
          <p>Are you sure you want to delete <strong>{deleteModal.itemName}</strong>?</p>
          <div style={styles.modalActions}>
            <button onClick={() => setDeleteModal(null)} style={styles.btnCancel}>No, Keep it</button>
            <button onClick={handleDelete} style={styles.btnDanger}>Yes, Delete</button>
          </div>
        </div>
      </div>
    )
  }

  {/* ================= LOGS MODAL ================= */ }
  {
    logsModal && (
      <div style={styles.modalOverlay}>
        <div style={{ ...styles.modal, maxWidth: '600px' }}>
          <h3>📜 History: {logsModal.item.itemName}</h3>
          <div style={styles.logsContainer}>
            {logsModal.logs.length === 0 ? <p>No history found.</p> : (
              <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>
                    <th style={{ padding: '8px' }}>Date</th>
                    <th style={{ padding: '8px' }}>Action</th>
                    <th style={{ padding: '8px' }}>Qty</th>
                    <th style={{ padding: '8px' }}>By</th>
                    <th style={{ padding: '8px' }}>Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {logsModal.logs.map(log => (
                    <tr key={log._id} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '8px' }}>{new Date(log.createdAt).toLocaleDateString()}</td>
                      <td style={{ padding: '8px', fontWeight: 'bold', color: log.actionType === 'ADD' ? 'green' : log.actionType === 'USE' ? 'red' : 'orange' }}>{log.actionType}</td>
                      <td style={{ padding: '8px' }}>{log.quantity}</td>
                      <td style={{ padding: '8px' }}>{log.performedBy?.name || 'User'}</td>
                      <td style={{ padding: '8px', color: '#666' }}>{log.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div style={{ marginTop: '15px', textAlign: 'right' }}>
            <button onClick={() => setLogsModal(null)} style={styles.btnCancel}>Close</button>
          </div>
        </div>
      </div>
    )
  }

      </div >
    </div >
  );
}

const styles = {
  container: { minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "Inter, sans-serif" },
  mainContent: { maxWidth: "1200px", margin: "0 auto", padding: "30px" },
  pageHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" },
  pageTitle: { fontSize: "28px", fontWeight: "800", color: "#1e293b", margin: 0 },
  createBtn: { backgroundColor: "#2563eb", color: "white", padding: "12px 24px", borderRadius: "10px", border: "none", fontWeight: "600", cursor: "pointer" },
  filterBar: { display: "flex", gap: "10px", marginBottom: "20px" },
  searchInput: { flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" },
  filterSelect: { padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "white" },
  searchBtn: { backgroundColor: "#0f172a", color: "white", padding: "0 20px", borderRadius: "8px", border: "none", cursor: "pointer" },
  tableCard: { backgroundColor: "white", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", overflow: "hidden", border: "1px solid #e2e8f0" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { padding: "16px 20px", textAlign: "left", fontSize: "12px", fontWeight: "700", color: "#64748b", backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", textTransform: "uppercase" },
  td: { padding: "16px 20px", borderBottom: "1px solid #f1f5f9", fontSize: "14px", color: "#334155" },
  row: { transition: "background 0.1s" },
  sizeBadge: { fontFamily: "monospace", backgroundColor: "#f1f5f9", padding: "4px 8px", borderRadius: "4px", fontSize: "13px", border: "1px solid #e2e8f0" },
  actionGroup: { display: 'flex', gap: '8px', justifyContent: 'flex-end' },
  iconBtn: { border: "none", background: "#f1f5f9", padding: "6px", borderRadius: "6px", cursor: "pointer", fontSize: "14px" },
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 },
  modal: { background: 'white', padding: '30px', borderRadius: '16px', width: '90%', maxWidth: '450px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' },
  modalActions: { marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'flex-end' },
  formGroup: { marginBottom: '15px', display: 'flex', flexDirection: 'column', gap: '5px' },
  label: { fontSize: '14px', fontWeight: '600', color: '#475569' },
  input: { width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', boxSizing: 'border-box' },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' },
  logsContainer: { maxHeight: '300px', overflowY: 'auto', border: '1px solid #eee', borderRadius: '8px', padding: '10px' },
  btnSubmit: { background: '#3b82f6', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' },
  btnSuccess: { background: '#16a34a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' },
  btnDanger: { background: '#dc2626', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' },
  btnCancel: { background: '#f3f4f6', color: '#333', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' },
};
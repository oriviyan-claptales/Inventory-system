// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import Header from "../components/Header";
// import toast from "react-hot-toast";

// export default function PackZoneDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [data, setData] = useState({ item: null, logs: [] });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchItemDetails = async () => {
//       try {
//         // Aapke backend me getPackZoneItemById already item aur recentLogs bhej raha hai!
//         const res = await api.get(`/packzone/${id}`);
//         setData({ item: res.data.item, logs: res.data.recentLogs || [] });
//       } catch (error) {
//         toast.error("Failed to load item details");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchItemDetails();
//   }, [id]);

//   if (loading) return <div style={styles.center}>Loading details...</div>;
//   if (!data.item) return <div style={styles.center}>Item not found!</div>;

//   const { item, logs } = data;

//   return (
//     <div style={styles.container}>
//       <Header />
//       <div style={styles.mainContent}>
        
//         {/* Back Button */}
//         <button onClick={() => navigate("/packzone")} style={styles.backBtn}>
//           ⬅ Back to Inventory
//         </button>

//         {/* E-commerce Style Top Section */}
//         <div style={styles.productCard}>
//           <div style={styles.imageSection}>
//             {item.itemImage ? (
//               <img src={item.itemImage} alt={item.itemName} style={styles.mainImage} />
//             ) : (
//               <div style={styles.noImage}>No Image Available</div>
//             )}
//           </div>

//           <div style={styles.infoSection}>
//             <div style={styles.categoryBadge}>{item.category}</div>
//             <h1 style={styles.title}>{item.itemName}</h1>
//             <p style={styles.sku}>SKU: <span>{item.item_sku}</span></p>

//             <div style={styles.priceRow}>
//               <span style={styles.costLabel}>Costing:</span>
//               <span style={styles.costValue}>₹{item.costing || 0}</span>
//               <span style={styles.unitText}>/ {item.unit}</span>
//             </div>

//             <div style={styles.detailsGrid}>
//               <div style={styles.detailBox}>
//                 <span style={styles.detailTitle}>Size</span>
//                 <span style={styles.detailValue}>{item.size}</span>
//               </div>
//               <div style={styles.detailBox}>
//                 <span style={styles.detailTitle}>Current Stock</span>
//                 <span style={{...styles.detailValue, color: item.isLowStock ? '#dc2626' : '#16a34a'}}>
//                   {item.qty} {item.unit} {item.isLowStock && "⚠️ (Low)"}
//                 </span>
//               </div>
//               <div style={styles.detailBox}>
//                 <span style={styles.detailTitle}>Min. Stock Alert</span>
//                 <span style={styles.detailValue}>{item.minimumStock} {item.unit}</span>
//               </div>
//               <div style={styles.detailBox}>
//                 <span style={styles.detailTitle}>Vendor</span>
//                 <span style={styles.detailValue}>{item.vendor || "N/A"}</span>
//               </div>
//             </div>

//             <div style={styles.descSection}>
//               <h3 style={styles.descTitle}>Description</h3>
//               <p style={styles.descText}>{item.description || "No description provided."}</p>
//             </div>
//           </div>
//         </div>

//         {/* Recent Activity / Logs Table */}
//         <div style={styles.logsCard}>
//           <h3 style={styles.logsTitle}>📜 Recent Stock Activity</h3>
//           {logs.length === 0 ? (
//             <p style={{ color: "#64748b" }}>No recent activity found.</p>
//           ) : (
//             <div style={{ overflowX: "auto" }}>
//               <table style={styles.table}>
//                 <thead>
//                   <tr>
//                     <th style={styles.th}>Date</th>
//                     <th style={styles.th}>Action</th>
//                     <th style={styles.th}>Qty Change</th>
//                     <th style={styles.th}>Performed By</th>
//                     <th style={styles.th}>Reason</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {logs.map((log) => (
//                     <tr key={log._id} style={{ borderBottom: "1px solid #f1f5f9" }}>
//                       <td style={styles.td}>{new Date(log.createdAt).toLocaleString()}</td>
//                       <td style={{ ...styles.td, fontWeight: "bold", color: log.actionType === "ADD" ? "#16a34a" : log.actionType === "USE" ? "#dc2626" : "#d97706" }}>
//                         {log.actionType}
//                       </td>
//                       <td style={styles.td}>{log.quantity}</td>
//                       <td style={styles.td}>{log.performedByName || "User"}</td>
//                       <td style={{ ...styles.td, color: "#64748b" }}>{log.reason || "-"}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: { minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "Inter, sans-serif" },
//   center: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", fontSize: "18px", color: "#64748b" },
//   mainContent: { maxWidth: "1000px", margin: "30px auto", padding: "0 20px" },
//   backBtn: { background: "white", border: "1px solid #cbd5e1", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontWeight: "600", marginBottom: "20px", color: "#334155", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" },
//   productCard: { display: "flex", flexWrap: "wrap", gap: "30px", background: "white", padding: "30px", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", marginBottom: "30px" },
//   imageSection: { flex: "1 1 300px", display: "flex", justifyContent: "center", alignItems: "flex-start" },
//   mainImage: { width: "100%", maxWidth: "400px", height: "auto", borderRadius: "12px", border: "1px solid #e2e8f0", objectFit: "cover" },
//   noImage: { width: "100%", height: "300px", borderRadius: "12px", backgroundColor: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8", fontSize: "18px", border: "2px dashed #cbd5e1" },
//   infoSection: { flex: "2 1 400px", display: "flex", flexDirection: "column", gap: "15px" },
//   categoryBadge: { alignSelf: "flex-start", background: "#eff6ff", color: "#2563eb", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "700", textTransform: "uppercase", border: "1px solid #bfdbfe" },
//   title: { margin: 0, fontSize: "28px", color: "#0f172a", fontWeight: "800" },
//   sku: { margin: 0, fontSize: "14px", color: "#64748b", fontFamily: "monospace" },
//   priceRow: { display: "flex", alignItems: "baseline", gap: "8px", marginTop: "10px", paddingBottom: "15px", borderBottom: "1px solid #e2e8f0" },
//   costLabel: { fontSize: "14px", color: "#64748b", fontWeight: "600" },
//   costValue: { fontSize: "28px", color: "#16a34a", fontWeight: "800" },
//   unitText: { fontSize: "14px", color: "#94a3b8" },
//   detailsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginTop: "10px" },
//   detailBox: { background: "#f8fafc", padding: "12px", borderRadius: "8px", border: "1px solid #e2e8f0" },
//   detailTitle: { display: "block", fontSize: "12px", color: "#64748b", textTransform: "uppercase", fontWeight: "700", marginBottom: "4px" },
//   detailValue: { fontSize: "15px", color: "#1e293b", fontWeight: "600" },
//   descSection: { marginTop: "15px" },
//   descTitle: { fontSize: "16px", color: "#1e293b", margin: "0 0 8px 0" },
//   descText: { fontSize: "14px", color: "#475569", lineHeight: "1.6", margin: 0 },
//   logsCard: { background: "white", padding: "25px", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" },
//   logsTitle: { margin: "0 0 20px 0", fontSize: "18px", color: "#1e293b" },
//   table: { width: "100%", borderCollapse: "collapse" },
//   th: { textAlign: "left", padding: "12px", backgroundColor: "#f8fafc", color: "#64748b", fontSize: "13px", textTransform: "uppercase", borderBottom: "1px solid #e2e8f0" },
//   td: { padding: "12px", fontSize: "14px", color: "#334155" }
// };





























import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Header from "../components/Header";
import toast from "react-hot-toast";

export default function PackZoneDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({ item: null, logs: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const res = await api.get(`/packzone/${id}`);
        setData({ item: res.data.item, logs: res.data.recentLogs || [] });
      } catch (error) {
        toast.error("Failed to load item details");
      } finally {
        setLoading(false);
      }
    };
    fetchItemDetails();
  }, [id]);

  if (loading) return <div style={styles.center}>Loading details...</div>;
  if (!data.item) return <div style={styles.center}>Item not found!</div>;

  const { item, logs } = data;

  return (
    <div style={styles.container}>
      {/* <Header /> */}
      <div style={styles.mainContent}>
        
        {/* Top Bar with Back Button */}
        <div style={styles.topBar}>
          <button onClick={() => navigate("/packzone")} style={styles.backBtn}>
            <span style={{marginRight: '6px'}}>←</span> Back to Inventory
          </button>
        </div>

        {/* E-commerce Style Top Section */}
        <div style={styles.productCard}>
          <div style={styles.imageSection}>
            {item.itemImage ? (
              <img src={item.itemImage} alt={item.itemName} style={styles.mainImage} />
            ) : (
              <div style={styles.noImage}>
                <span style={{fontSize: '24px', marginBottom: '8px'}}>📷</span>
                No Image
              </div>
            )}
          </div>

          <div style={styles.infoSection}>
            <div style={styles.headerInfo}>
              <div style={styles.categoryBadge}>{item.category}</div>
              <h1 style={styles.title}>{item.itemName}</h1>
              <p style={styles.sku}>SKU: <span style={{fontWeight: '600', color: '#475569'}}>{item.item_sku}</span></p>
            </div>

            <div style={styles.priceRow}>
              <span style={styles.costLabel}>Costing</span>
              <div style={{display: 'flex', alignItems: 'baseline', gap: '4px'}}>
                <span style={styles.costValue}>₹{item.costing || 0}</span>
                <span style={styles.unitText}>/ {item.unit}</span>
              </div>
            </div>

            <div style={styles.detailsGrid}>
              <div style={styles.detailBox}>
                <span style={styles.detailTitle}>Size</span>
                <span style={styles.detailValue}>{item.size}</span>
              </div>
              <div style={styles.detailBox}>
                <span style={styles.detailTitle}>Current Stock</span>
                <span style={{...styles.detailValue, color: item.isLowStock ? '#dc2626' : '#16a34a', fontWeight: '700'}}>
                  {item.qty} {item.unit} {item.isLowStock && <span style={{fontSize: '11px', marginLeft:'4px'}}>⚠️ LOW</span>}
                </span>
              </div>
              <div style={styles.detailBox}>
                <span style={styles.detailTitle}>Min. Stock Alert</span>
                <span style={styles.detailValue}>{item.minimumStock} {item.unit}</span>
              </div>
              <div style={styles.detailBox}>
                <span style={styles.detailTitle}>Vendor</span>
                <span style={styles.detailValue}>{item.vendor || "N/A"}</span>
              </div>
            </div>

            <div style={styles.descSection}>
              <h3 style={styles.descTitle}>Description</h3>
              <p style={styles.descText}>{item.description || "No description provided."}</p>
            </div>
          </div>
        </div>

        {/* Recent Activity / Logs Table */}
        <div style={styles.logsCard}>
          <div style={styles.logsHeader}>
            <h3 style={styles.logsTitle}>Stock Activity History</h3>
            <span style={styles.logsCount}>{logs.length} Records found</span>
          </div>

          {logs.length === 0 ? (
            <div style={styles.emptyLogs}>No recent activity found for this item.</div>
          ) : (
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Date & Time</th>
                    <th style={styles.th}>Action</th>
                    <th style={styles.th}>Qty Change</th>
                    <th style={styles.th}>Performed By</th>
                    <th style={styles.th}>Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log._id} style={styles.row}>
                      <td style={styles.td}>
                        {new Date(log.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                        <span style={styles.timeText}> {new Date(log.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                      </td>
                      <td style={styles.td}>
                        <span style={{
                          ...styles.actionBadge, 
                          backgroundColor: log.actionType === "ADD" ? "#dcfce7" : log.actionType === "USE" ? "#fee2e2" : "#fef3c7",
                          color: log.actionType === "ADD" ? "#16a34a" : log.actionType === "USE" ? "#dc2626" : "#d97706"
                        }}>
                          {log.actionType}
                        </span>
                      </td>
                      <td style={{...styles.td, fontWeight: '600'}}>{log.quantity}</td>
                      <td style={styles.td}>{log.performedByName || "System"}</td>
                      <td style={{ ...styles.td, color: "#64748b" }}>{log.reason || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", backgroundColor: "#f1f5f9", fontFamily: "'Inter', sans-serif" },
  center: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", fontSize: "15px", color: "#64748b" },
  
  // Layout Spacing - Wider content area, smaller margins
  mainContent: { maxWidth: "1200px", margin: "20px auto", padding: "0 15px", display: "flex", flexDirection: "column", gap: "15px" },
  
  topBar: { display: "flex", alignItems: "center", padding: "5px 0" },
  backBtn: { background: "white", border: "1px solid #cbd5e1", padding: "6px 14px", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: "600", color: "#334155", display: "flex", alignItems: "center", transition: "all 0.2s" },
  
  // Product Card Layout
  productCard: { display: "flex", flexWrap: "wrap", gap: "25px", background: "white", padding: "20px", borderRadius: "10px", border: "1px solid #e2e8f0" },
  imageSection: { flex: "0 0 260px", display: "flex", justifyContent: "center", alignItems: "flex-start" }, // Fixed smaller width for image
  mainImage: { width: "100%", height: "auto", borderRadius: "8px", border: "1px solid #e2e8f0", objectFit: "contain", maxHeight: "260px" },
  noImage: { width: "100%", height: "260px", borderRadius: "8px", backgroundColor: "#f8fafc", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#94a3b8", fontSize: "13px", border: "1px dashed #cbd5e1" },
  
  // Info Section
  infoSection: { flex: "1", display: "flex", flexDirection: "column", gap: "12px", minWidth: "300px" },
  headerInfo: { display: "flex", flexDirection: "column", gap: "6px" },
  categoryBadge: { alignSelf: "flex-start", background: "#f1f5f9", color: "#475569", padding: "4px 10px", borderRadius: "4px", fontSize: "11px", fontWeight: "600", textTransform: "uppercase", border: "1px solid #e2e8f0", letterSpacing: "0.5px" },
  title: { margin: 0, fontSize: "22px", color: "#0f172a", fontWeight: "700", lineHeight: "1.2" },
  sku: { margin: 0, fontSize: "12px", color: "#94a3b8", fontFamily: "monospace" },
  
  // Pricing
  priceRow: { display: "flex", flexDirection: "column", gap: "2px", background: "#f8fafc", padding: "10px 15px", borderRadius: "8px", border: "1px solid #f1f5f9", width: "fit-content" },
  costLabel: { fontSize: "11px", color: "#64748b", textTransform: "uppercase", fontWeight: "600", letterSpacing: "0.5px" },
  costValue: { fontSize: "22px", color: "#16a34a", fontWeight: "700", lineHeight: "1" },
  unitText: { fontSize: "12px", color: "#94a3b8", fontWeight: "500" },
  
  // Details Grid
  detailsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "10px", marginTop: "5px" },
  detailBox: { borderLeft: "3px solid #cbd5e1", paddingLeft: "10px", display: "flex", flexDirection: "column", gap: "4px" },
  detailTitle: { fontSize: "11px", color: "#64748b", textTransform: "uppercase", fontWeight: "600", letterSpacing: "0.5px" },
  detailValue: { fontSize: "13px", color: "#1e293b", fontWeight: "500" },
  
  // Description
  descSection: { marginTop: "5px", borderTop: "1px solid #f1f5f9", paddingTop: "12px" },
  descTitle: { fontSize: "13px", color: "#1e293b", margin: "0 0 6px 0", fontWeight: "600", textTransform: "uppercase" },
  descText: { fontSize: "13px", color: "#475569", lineHeight: "1.5", margin: 0 },
  
  // Logs Section
  logsCard: { background: "white", padding: "20px", borderRadius: "10px", border: "1px solid #e2e8f0" },
  logsHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" },
  logsTitle: { margin: 0, fontSize: "15px", color: "#0f172a", fontWeight: "600" },
  logsCount: { fontSize: "12px", color: "#64748b", background: "#f1f5f9", padding: "2px 8px", borderRadius: "12px" },
  emptyLogs: { padding: "30px", textAlign: "center", color: "#94a3b8", fontSize: "13px", background: "#f8fafc", borderRadius: "6px", border: "1px dashed #e2e8f0" },
  
  // Table Styles (Compact)
  tableWrapper: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", minWidth: "600px" },
  th: { textAlign: "left", padding: "10px 12px", backgroundColor: "#f8fafc", color: "#475569", fontSize: "11px", fontWeight: "600", textTransform: "uppercase", borderBottom: "1px solid #e2e8f0", letterSpacing: "0.5px" },
  td: { padding: "10px 12px", fontSize: "13px", color: "#334155", borderBottom: "1px solid #f1f5f9" },
  row: { transition: "background 0.2s", ":hover": { backgroundColor: "#f8fafc" } },
  timeText: { fontSize: "11px", color: "#94a3b8", display: "block", marginTop: "2px" },
  actionBadge: { padding: "4px 8px", borderRadius: "4px", fontSize: "10px", fontWeight: "700", letterSpacing: "0.5px" }
};
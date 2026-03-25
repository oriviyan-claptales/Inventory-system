// // import React, { useEffect, useState } from "react";
// // import api from "../api/axios";

// // export default function Sales() {
// //   const [stats, setStats] = useState(null);
// //   const [skuData, setSkuData] = useState([]);

// //   useEffect(() => {
// //     fetchData();
// //   }, []);

// //   const fetchData = async () => {
// //     const dashboard = await api.get("/sales/dashboard");
// //     const skuWise = await api.get("/sales/sku-wise");

// //     setStats(dashboard.data);
// //     setSkuData(skuWise.data);
// //   };

// //   if (!stats) return <div>Loading...</div>;

// //   return (
// //     <div style={{ padding: 30 }}>
// //       <h2>Sales Overview</h2>

// //       <div style={{ display: "flex", gap: 20 }}>
// //         <Card title="Total Units" value={stats.totalUnits} />
// //         <Card title="Revenue" value={`₹ ${stats.totalRevenue}`} />
// //         <Card title="Profit" value={`₹ ${stats.totalProfit}`} />
// //       </div>

// //       <h3 style={{ marginTop: 40 }}>SKU Wise Sales</h3>

// //       <table border="1" cellPadding="10" style={{ marginTop: 20 }}>
// //         <thead>
// //           <tr>
// //             <th>SKU</th>
// //             <th>Product</th>
// //             <th>Total Sold</th>
// //             <th>Revenue</th>
// //             <th>Profit</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {skuData.map((item) => (
// //             <tr key={item._id}>
// //               <td>{item._id}</td>
// //               <td>{item.productName}</td>
// //               <td>{item.totalSold}</td>
// //               <td>₹ {item.revenue}</td>
// //               <td>₹ {item.profit}</td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // }

// // const Card = ({ title, value }) => (
// //   <div style={{
// //     background: "#fff",
// //     padding: 20,
// //     borderRadius: 10,
// //     boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
// //     width: 200
// //   }}>
// //     <h4>{title}</h4>
// //     <p style={{ fontSize: 20, fontWeight: "bold" }}>{value}</p>
// //   </div>
// // );











// // import React, { useEffect, useState } from "react";
// // import api from "../api/axios";
// // import { useNavigate } from "react-router-dom";
// // import Header from "../components/Header";

// // export default function Sales() {
// //   const [stats, setStats] = useState(null);
// //   const [skuData, setSkuData] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     fetchData();
// //   }, []);

// //   const fetchData = async () => {
// //     try {
// //       const dashboard = await api.get("/sales/dashboard");
// //       const skuWise = await api.get("/sales/sku-wise");

// //       setStats(dashboard.data);
// //       setSkuData(skuWise.data);
// //     } catch (error) {
// //       console.error("Error fetching sales data", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div style={styles.container}>
// //       <Header />
      
// //       <div style={styles.mainContent}>
// //         {/* --- PAGE HEADER --- */}
// //         <div style={styles.pageHeader}>
// //           <div>
// //             <button onClick={() => navigate("/dashboard")} style={styles.backBtn}>⬅ Back</button>
// //             <h2 style={styles.pageTitle}>Sales Overview</h2>
// //             <p style={styles.pageSubtitle}>Track your revenue, units, and SKU performance</p>
// //           </div>
// //         </div>

// //         {loading ? (
// //           <div style={{ textAlign: "center", padding: "50px", color: "#64748b" }}>Loading Sales Data...</div>
// //         ) : (
// //           <>
// //             {/* --- STATS CARDS --- */}
// //             <div style={styles.statsGrid}>
// //               <Card 
// //                 title="Total Units" 
// //                 value={stats?.totalUnits || 0} 
// //                 icon="📦"
// //                 color="#0284c7"
// //               />
// //               <Card 
// //                 title="Total Revenue" 
// //                 value={`₹ ${stats?.totalRevenue?.toLocaleString() || 0}`} 
// //                 icon="💰"
// //                 color="#16a34a"
// //               />
// //               <Card 
// //                 title="Total Profit" 
// //                 value={`₹ ${stats?.totalProfit?.toLocaleString() || 0}`} 
// //                 icon="📈"
// //                 color="#2563eb"
// //               />
// //             </div>

// //             {/* --- SKU TABLE --- */}
// //             <h3 style={{ ...styles.pageTitle, fontSize: "18px", marginTop: "40px", marginBottom: "15px" }}>
// //               SKU Wise Sales Performance
// //             </h3>
            
// //             <div style={styles.tableCard}>
// //               <table style={styles.table}>
// //                 <thead>
// //                   <tr>
// //                     <th style={styles.th}>SKU ID</th>
// //                     <th style={styles.th}>Product Name</th>
// //                     <th style={styles.th}>Total Sold</th>
// //                     <th style={styles.th}>Revenue</th>
// //                     <th style={{ ...styles.th, textAlign: "right" }}>Profit</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {skuData.length === 0 ? (
// //                     <tr><td colSpan="5" style={{ padding: "30px", textAlign: "center" }}>No SKU data available</td></tr>
// //                   ) : (
// //                     skuData.map((item) => (
// //                       <tr key={item._id} style={styles.row}>
// //                         <td style={styles.td}>
// //                            <code style={styles.skuBadge}>{item._id}</code>
// //                         </td>
// //                         <td style={{ ...styles.td, fontWeight: "600" }}>{item.productName}</td>
// //                         <td style={styles.td}>{item.totalSold}</td>
// //                         <td style={styles.td}>₹ {item.revenue?.toLocaleString()}</td>
// //                         <td style={{ ...styles.td, textAlign: "right", color: "#16a34a", fontWeight: "600" }}>
// //                           ₹ {item.profit?.toLocaleString()}
// //                         </td>
// //                       </tr>
// //                     ))
// //                   )}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // // --- CARD COMPONENT ---
// // const Card = ({ title, value, icon, color }) => (
// //   <div style={styles.card}>
// //     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
// //       <div>
// //         <p style={styles.cardTitle}>{title}</p>
// //         <h3 style={{ ...styles.cardValue, color: color }}>{value}</h3>
// //       </div>
// //       <div style={styles.cardIcon}>{icon}</div>
// //     </div>
// //   </div>
// // );

// // // --- STYLES (Aligned with UserManagement) ---
// // const styles = {
// //   container: { 
// //     minHeight: "100vh", 
// //     backgroundColor: "#f8fafc", 
// //     fontFamily: "'Inter', sans-serif" 
// //   },
// //   mainContent: { 
// //     padding: "20px", 
// //     maxWidth: "1100px", 
// //     margin: "0 auto" 
// //   },
// //   pageHeader: { 
// //     display: "flex", 
// //     justifyContent: "space-between", 
// //     alignItems: "center", 
// //     marginBottom: "30px" 
// //   },
// //   backBtn: {
// //     background: 'none',
// //     border: 'none',
// //     color: '#64748b',
// //     cursor: 'pointer',
// //     fontWeight: '600',
// //     fontSize: '13px',
// //     padding: 0,
// //     marginBottom: '10px',
// //     display: 'block'
// //   },
// //   pageTitle: { 
// //     fontSize: "22px", 
// //     fontWeight: "800", 
// //     color: "#0f172a", 
// //     margin: 0 
// //   },
// //   pageSubtitle: { 
// //     fontSize: "14px", 
// //     color: "#64748b", 
// //     margin: "5px 0 0 0" 
// //   },
// //   statsGrid: {
// //     display: "grid",
// //     gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
// //     gap: "20px",
// //   },
// //   card: {
// //     background: "#fff",
// //     padding: "20px",
// //     borderRadius: "12px",
// //     boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
// //     border: "1px solid #e2e8f0",
// //   },
// //   cardTitle: {
// //     fontSize: "13px",
// //     fontWeight: "600",
// //     color: "#64748b",
// //     margin: "0 0 10px 0",
// //     textTransform: "uppercase",
// //     letterSpacing: "0.5px"
// //   },
// //   cardValue: {
// //     fontSize: "24px",
// //     fontWeight: "800",
// //     margin: 0,
// //   },
// //   cardIcon: {
// //     fontSize: "24px",
// //     background: "#f8fafc",
// //     padding: "10px",
// //     borderRadius: "10px",
// //   },
// //   tableCard: { 
// //     background: "#fff", 
// //     borderRadius: "10px", 
// //     boxShadow: "0 1px 3px rgba(0,0,0,0.1)", 
// //     overflow: "hidden", 
// //     border: "1px solid #e2e8f0" 
// //   },
// //   table: { 
// //     width: "100%", 
// //     borderCollapse: "collapse" 
// //   },
// //   th: { 
// //     padding: "12px 15px", 
// //     background: "#f8fafc", 
// //     textAlign: "left", 
// //     fontSize: "11px", 
// //     color: "#64748b", 
// //     textTransform: "uppercase", 
// //     borderBottom: "1px solid #e2e8f0" 
// //   },
// //   td: { 
// //     padding: "15px", 
// //     borderBottom: "1px solid #f1f5f9", 
// //     fontSize: "14px",
// //     color: "#334155"
// //   },
// //   skuBadge: {
// //     background: "#f1f5f9",
// //     padding: "4px 8px",
// //     borderRadius: "4px",
// //     fontSize: "12px",
// //     fontFamily: "monospace",
// //     color: "#475569"
// //   },
// //   row: {
// //     transition: "background 0.2s",
// //     ":hover": {
// //       backgroundColor: "#f8fafc"
// //     }
// //   }
// // };
























// import React, { useEffect, useState } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import Header from "../components/Header";

// export default function Sales() {
//   const [stats, setStats] = useState(null);
//   const [skuData, setSkuData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [editingId, setEditingId] = useState(null); // Edit track karne ke liye
//   const [editValue, setEditValue] = useState("");
  
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Search logic
//   useEffect(() => {
//     const filtered = skuData.filter(item => 
//       item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item._id.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredData(filtered);
//   }, [searchTerm, skuData]);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const [dashboard, skuWise] = await Promise.all([
//         api.get("/sales/dashboard"),
//         api.get("/sales/sku-wise")
//       ]);
//       setStats(dashboard.data);
//       setSkuData(skuWise.data);
//       setFilteredData(skuWise.data);
//     } catch (error) {
//       console.error("Error fetching sales data", error);
//       alert("Data load karne mein problem hui!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- UPDATE QUANTITY FUNCTION ---
//   const handleUpdateQty = async (id) => {
//     try {
//       const response = await api.put(`/sales/update-sku/${id}`, { 
//         newQty: parseInt(editValue) 
//       });
      
//       if (response.status === 200) {
//         setEditingId(null);
//         fetchData(); // Data refresh karein taaki calculations update ho jayein
//         alert("Quantity updated successfully!");
//       }
//     } catch (error) {
//       console.error("Update failed", error);
//       alert("Update fail ho gaya. Kripya check karein.");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <Header />
      
//       <div style={styles.mainContent}>
//         <div style={styles.pageHeader}>
//           <div>
//             <button onClick={() => navigate("/dashboard")} style={styles.backBtn}>⬅ Back to Dashboard</button>
//             <h2 style={styles.pageTitle}>Advanced Sales Analytics</h2>
//             <p style={styles.pageSubtitle}>Manage performance and correct sales entries</p>
//           </div>
          
//           {/* --- SEARCH BAR --- */}
//           <div style={styles.searchWrapper}>
//             <span style={{marginRight: '10px'}}>🔍</span>
//             <input 
//               type="text" 
//               placeholder="Search by SKU or Product Name..." 
//               style={styles.searchInput}
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//         </div>

//         {loading ? (
//           <div style={styles.loader}>Fetching latest sales figures...</div>
//         ) : (
//           <>
//             {/* --- STATS CARDS --- */}
//             <div style={styles.statsGrid}>
//               <Card title="Units Sold" value={stats?.totalUnits || 0} icon="📦" color="#0284c7" />
//               <Card title="Total Revenue" value={`₹${stats?.totalRevenue?.toLocaleString()}`} icon="💰" color="#16a34a" />
//               <Card title="Net Profit" value={`₹${stats?.totalProfit?.toLocaleString()}`} icon="📈" color="#2563eb" />
//             </div>

//             <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '40px'}}>
//                <h3 style={styles.sectionTitle}>SKU Performance Inventory</h3>
//                <span style={styles.countBadge}>{filteredData.length} Products Found</span>
//             </div>
            
//             <div style={styles.tableCard}>
//               <table style={styles.table}>
//                 <thead>
//                   <tr>
//                     <th style={styles.th}>SKU ID</th>
//                     <th style={styles.th}>Product Name</th>
//                     <th style={styles.th}>Total Sold</th>
//                     <th style={styles.th}>Revenue</th>
//                     <th style={styles.th}>Profit</th>
//                     <th style={{ ...styles.th, textAlign: "center" }}>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredData.length === 0 ? (
//                     <tr><td colSpan="6" style={styles.noData}>No results matching "{searchTerm}"</td></tr>
//                   ) : (
//                     filteredData.map((item) => (
//                       <tr key={item._id} style={styles.row}>
//                         <td style={styles.td}><code style={styles.skuBadge}>{item._id}</code></td>
//                         <td style={{ ...styles.td, fontWeight: "600" }}>{item.productName}</td>
                        
//                         {/* --- EDITABLE QUANTITY CELL --- */}
//                         <td style={styles.td}>
//                           {editingId === item._id ? (
//                             <input 
//                               type="number" 
//                               value={editValue} 
//                               onChange={(e) => setEditValue(e.target.value)}
//                               style={styles.inlineInput}
//                               autoFocus
//                             />
//                           ) : (
//                             <span style={styles.qtyText}>{item.totalSold}</span>
//                           )}
//                         </td>

//                         <td style={styles.td}>₹ {item.revenue?.toLocaleString()}</td>
//                         <td style={{ ...styles.td, color: "#16a34a", fontWeight: "600" }}>
//                           ₹ {item.profit?.toLocaleString()}
//                         </td>

//                         <td style={{ ...styles.td, textAlign: "center" }}>
//                           {editingId === item._id ? (
//                             <div style={{display: 'flex', gap: '5px', justifyContent: 'center'}}>
//                               <button onClick={() => handleUpdateQty(item._id)} style={styles.saveBtn}>Save</button>
//                               <button onClick={() => setEditingId(null)} style={styles.cancelBtn}>✕</button>
//                             </div>
//                           ) : (
//                             <button 
//                               onClick={() => {
//                                 setEditingId(item._id);
//                                 setEditValue(item.totalSold);
//                               }} 
//                               style={styles.editBtn}
//                             >
//                               Edit Qty
//                             </button>
//                           )}
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// // --- CARD COMPONENT ---
// const Card = ({ title, value, icon, color }) => (
//   <div style={styles.card}>
//     <div style={{ display: "flex", justifyContent: "space-between" }}>
//       <div>
//         <p style={styles.cardTitle}>{title}</p>
//         <h3 style={{ ...styles.cardValue, color: color }}>{value}</h3>
//       </div>
//       <div style={styles.cardIcon}>{icon}</div>
//     </div>
//   </div>
// );

// // --- UPDATED STYLES ---
// const styles = {
//   container: { minHeight: "100vh", backgroundColor: "#f1f5f9", fontFamily: "'Inter', sans-serif" },
//   mainContent: { padding: "30px", maxWidth: "1200px", margin: "0 auto" },
//   pageHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "30px" },
//   pageTitle: { fontSize: "24px", fontWeight: "800", color: "#0f172a", margin: 0 },
//   pageSubtitle: { fontSize: "14px", color: "#64748b", margin: "5px 0 0 0" },
//   backBtn: { background: 'none', border: 'none', color: '#6366f1', cursor: 'pointer', fontWeight: '600', marginBottom: '8px', padding: 0 },
  
//   searchWrapper: {
//     display: 'flex',
//     alignItems: 'center',
//     background: '#fff',
//     padding: '10px 15px',
//     borderRadius: '10px',
//     border: '1px solid #e2e8f0',
//     width: '350px',
//     boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
//   },
//   searchInput: { border: 'none', outline: 'none', width: '100%', fontSize: '14px' },
  
//   statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "25px" },
//   card: { background: "#fff", padding: "24px", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)", border: "1px solid #fff" },
//   cardTitle: { fontSize: "12px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", marginBottom: '8px' },
//   cardValue: { fontSize: "28px", fontWeight: "800", margin: 0 },
//   cardIcon: { fontSize: "24px", background: "#f8fafc", padding: "12px", borderRadius: "12px" },
  
//   sectionTitle: { fontSize: "18px", fontWeight: "700", color: "#1e293b" },
//   countBadge: { background: '#e0e7ff', color: '#4338ca', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' },
  
//   tableCard: { background: "#fff", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", overflow: "hidden", marginTop: '15px' },
//   table: { width: "100%", borderCollapse: "collapse" },
//   th: { padding: "15px", background: "#f8fafc", textAlign: "left", fontSize: "12px", color: "#64748b", borderBottom: "1px solid #e2e8f0" },
//   td: { padding: "16px", borderBottom: "1px solid #f1f5f9", fontSize: "14px" },
  
//   skuBadge: { background: "#f1f5f9", padding: "4px 8px", borderRadius: "4px", fontSize: "11px", color: "#475569" },
//   inlineInput: { width: "70px", padding: "5px", borderRadius: "4px", border: "2px solid #6366f1", outline: "none" },
  
//   editBtn: { background: "#f1f5f9", border: "none", padding: "6px 12px", borderRadius: "6px", color: "#475569", cursor: "pointer", fontWeight: "600", fontSize: "12px" },
//   saveBtn: { background: "#16a34a", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "6px", cursor: "pointer" },
//   cancelBtn: { background: "#ef4444", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "6px", cursor: "pointer" },
  
//   loader: { textAlign: "center", padding: "100px", color: "#64748b", fontWeight: "500" },
//   noData: { padding: "40px", textAlign: "center", color: "#94a3b8" }
// };


























// import React, { useEffect, useState } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import Header from "../components/Header";
// import toast from "react-hot-toast";

// export default function Sales() {
//   const [stats, setStats] = useState(null);
//   const [skuData, setSkuData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
  
//   // Edit States
//   const [editingId, setEditingId] = useState(null);
//   const [editValue, setEditValue] = useState("");

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Search Logic
//   useEffect(() => {
//     const filtered = skuData.filter(item => 
//       item.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item._id?.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredData(filtered);
//   }, [searchTerm, skuData]);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const [dbResponse, skuResponse] = await Promise.all([
//         api.get("/sales/dashboard"),
//         api.get("/sales/sku-wise")
//       ]);
//       setStats(dbResponse.data);
//       setSkuData(skuResponse.data);
//     } catch (error) {
//       toast.error("Error fetching data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpdate = async (id) => {
//     if (!editValue || editValue < 0) return toast.error("Invalid Quantity");
//     try {
//       await api.put(`/sales/update-sku/${id}`, { newQty: Number(editValue) });
//       toast.success("Updated Successfully");
//       setEditingId(null);
//       fetchData(); // Refresh totals
//     } catch (err) {
//       toast.error("Update failed");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <Header />
//       <div style={styles.mainContent}>
        
//         {/* Header with Search */}
//         <div style={styles.pageHeader}>
//           <div>
//             <button onClick={() => navigate("/dashboard")} style={styles.backBtn}>⬅ Back</button>
//             <h2 style={styles.pageTitle}>Sales Analytics</h2>
//           </div>
//           <div style={styles.searchBox}>
//             <input 
//               type="text" 
//               placeholder="Search SKU or Product..." 
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               style={styles.searchInput}
//             />
//           </div>
//         </div>

//         {loading ? <p>Loading...</p> : (
//           <>
//             {/* Stats */}
//             <div style={styles.statsGrid}>
//               <Card title="Units" value={stats?.totalUnits} color="#0284c7" />
//               <Card title="Revenue" value={`₹${stats?.totalRevenue?.toLocaleString()}`} color="#16a34a" />
//               <Card title="Profit" value={`₹${stats?.totalProfit?.toLocaleString()}`} color="#2563eb" />
//             </div>

//             {/* Table */}
//             <div style={styles.tableCard}>
//               <table style={styles.table}>
//                 <thead>
//                   <tr>
//                     <th style={styles.th}>SKU</th>
//                     <th style={styles.th}>Product Name</th>
//                     <th style={styles.th}>Quantity</th>
//                     <th style={styles.th}>Revenue</th>
//                     <th style={styles.th}>Profit</th>
//                     <th style={styles.th}>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredData.map((item) => (
//                     <tr key={item._id} style={styles.row}>
//                       <td style={styles.td}><span style={styles.skuBadge}>{item._id}</span></td>
//                       <td style={styles.td}><b>{item.productName}</b></td>
//                       <td style={styles.td}>
//                         {editingId === item.originalId ? (
//                           <input 
//                             type="number" 
//                             style={styles.editInput} 
//                             value={editValue} 
//                             onChange={(e) => setEditValue(e.target.value)}
//                           />
//                         ) : item.totalSold}
//                       </td>
//                       <td style={styles.td}>₹{item.revenue?.toLocaleString()}</td>
//                       <td style={{...styles.td, color: '#16a34a'}}>₹{item.profit?.toLocaleString()}</td>
//                       <td style={styles.td}>
//                         {editingId === item.originalId ? (
//                           <button onClick={() => handleUpdate(item.originalId)} style={styles.saveBtn}>Save</button>
//                         ) : (
//                           <button onClick={() => { setEditingId(item.originalId); setEditValue(item.totalSold); }} style={styles.editBtn}>Edit</button>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// const Card = ({ title, value, color }) => (
//   <div style={styles.card}>
//     <p style={styles.cardTitle}>{title}</p>
//     <h3 style={{ color, margin: 0 }}>{value || 0}</h3>
//   </div>
// );

// const styles = {
//   container: { minHeight: "100vh", backgroundColor: "#f8fafc" },
//   mainContent: { padding: "20px", maxWidth: "1100px", margin: "0 auto" },
//   pageHeader: { display: "flex", justifyContent: "space-between", marginBottom: "20px", alignItems: "center" },
//   backBtn: { border: "none", background: "none", cursor: "pointer", color: "#64748b", fontWeight: "600" },
//   pageTitle: { margin: 0, fontSize: "22px", fontWeight: "800" },
//   searchBox: { background: "#fff", padding: "8px 15px", borderRadius: "8px", border: "1px solid #e2e8f0" },
//   searchInput: { border: "none", outline: "none", width: "250px" },
//   statsGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "30px" },
//   card: { background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" },
//   cardTitle: { fontSize: "12px", color: "#64748b", textTransform: "uppercase", marginBottom: "5px" },
//   tableCard: { background: "#fff", borderRadius: "12px", overflow: "hidden", border: "1px solid #e2e8f0" },
//   table: { width: "100%", borderCollapse: "collapse" },
//   th: { padding: "12px", background: "#f8fafc", textAlign: "left", fontSize: "11px", color: "#64748b" },
//   td: { padding: "12px", borderBottom: "1px solid #f1f5f9", fontSize: "14px" },
//   skuBadge: { background: "#f1f5f9", padding: "3px 7px", borderRadius: "4px", fontSize: "12px" },
//   editInput: { width: "60px", padding: "4px", borderRadius: "4px", border: "1px solid #6366f1" },
//   editBtn: { padding: "4px 10px", borderRadius: "4px", border: "none", cursor: "pointer", fontSize: "12px" },
//   saveBtn: { padding: "4px 10px", borderRadius: "4px", border: "none", cursor: "pointer", background: "#16a34a", color: "#fff", fontSize: "12px" }
// };


















// import React, { useEffect, useState } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import Header from "../components/Header";
// import toast from "react-hot-toast";

// export default function Sales() {
//   const [stats, setStats] = useState({ totalUnits: 0, totalRevenue: 0, totalProfit: 0 });
//   const [skuData, setSkuData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
  
//   // Edit States
//   const [editingId, setEditingId] = useState(null);
//   const [editValue, setEditValue] = useState("");

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Search Logic
//   useEffect(() => {
//     const filtered = skuData.filter(item => 
//       item.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item._id?.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredData(filtered);
//   }, [searchTerm, skuData]);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const [dbResponse, skuResponse] = await Promise.all([
//         api.get("/sales/dashboard"),
//         api.get("/sales/sku-wise")
//       ]);
//       setStats(dbResponse.data || { totalUnits: 0, totalRevenue: 0, totalProfit: 0 });
//       setSkuData(skuResponse.data || []);
//       setFilteredData(skuResponse.data || []);
//     } catch (error) {
//       toast.error("Error fetching data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpdate = async (id) => {
//     if (!id) return toast.error("Error: Database ID not found!");
//     if (!editValue || editValue < 0) return toast.error("Invalid Quantity");
    
//     try {
//       await api.put(`/sales/update-sku/${id}`, { newQty: Number(editValue) });
//       toast.success("Updated Successfully");
//       setEditingId(null);
//       fetchData(); // Refresh totals
//     } catch (err) {
//       toast.error("Update failed! Please try again.");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <Header />
//       <div style={styles.mainContent}>
        
//         {/* Header with Search */}
//         <div style={styles.pageHeader}>
//           <div>
//             <button onClick={() => navigate("/dashboard")} style={styles.backBtn}>⬅ Back</button>
//             <h2 style={styles.pageTitle}>Sales Analytics</h2>
//           </div>
//           <div style={styles.searchBox}>
//             <input 
//               type="text" 
//               placeholder="Search SKU or Product..." 
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               style={styles.searchInput}
//             />
//           </div>
//         </div>

//         {loading ? <p style={{textAlign: "center", marginTop: "50px"}}>Loading Data...</p> : (
//           <>
//             {/* Stats */}
//             <div style={styles.statsGrid}>
//               <Card title="Units" value={stats?.totalUnits} color="#0284c7" />
//               <Card title="Revenue" value={`₹${stats?.totalRevenue?.toLocaleString()}`} color="#16a34a" />
//               <Card title="Profit" value={`₹${stats?.totalProfit?.toLocaleString()}`} color="#2563eb" />
//             </div>

//             {/* Table */}
//             <div style={styles.tableCard}>
//               <table style={styles.table}>
//                 <thead>
//                   <tr>
//                     <th style={styles.th}>SKU</th>
//                     <th style={styles.th}>Product Name</th>
//                     <th style={styles.th}>Quantity</th>
//                     <th style={styles.th}>Revenue</th>
//                     <th style={styles.th}>Profit</th>
//                     <th style={styles.th}>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredData.length === 0 ? (
//                     <tr><td colSpan="6" style={{textAlign: 'center', padding: '20px'}}>No records found</td></tr>
//                   ) : (
//                     filteredData.map((item) => {
//                       // ✅ Tarakki: Safety check for ID
//                       const targetId = item.originalId || item._id;
                      
//                       return (
//                         <tr key={item._id} style={styles.row}>
//                           <td style={styles.td}><span style={styles.skuBadge}>{item._id}</span></td>
//                           <td style={styles.td}><b>{item.productName}</b></td>
//                           <td style={styles.td}>
//                             {editingId === targetId ? (
//                               <input 
//                                 type="number" 
//                                 style={styles.editInput} 
//                                 value={editValue} 
//                                 onChange={(e) => setEditValue(e.target.value)}
//                                 autoFocus
//                               />
//                             ) : item.totalSold}
//                           </td>
//                           <td style={styles.td}>₹{item.revenue?.toLocaleString()}</td>
//                           <td style={{...styles.td, color: '#16a34a'}}>₹{item.profit?.toLocaleString()}</td>
//                           <td style={styles.td}>
//                             {editingId === targetId ? (
//                               <div style={{display: 'flex', gap: '5px'}}>
//                                 <button onClick={() => handleUpdate(targetId)} style={styles.saveBtn}>Save</button>
//                                 <button onClick={() => setEditingId(null)} style={styles.cancelBtn}>Cancel</button>
//                               </div>
//                             ) : (
//                               <button onClick={() => { 
//                                 setEditingId(targetId); 
//                                 setEditValue(item.totalSold); 
//                               }} style={styles.editBtn}>Edit</button>
//                             )}
//                           </td>
//                         </tr>
//                       )
//                     })
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// const Card = ({ title, value, color }) => (
//   <div style={styles.card}>
//     <p style={styles.cardTitle}>{title}</p>
//     <h3 style={{ color, margin: 0 }}>{value || 0}</h3>
//   </div>
// );

// const styles = {
//   container: { minHeight: "100vh", backgroundColor: "#f8fafc" },
//   mainContent: { padding: "20px", maxWidth: "1100px", margin: "0 auto" },
//   pageHeader: { display: "flex", justifyContent: "space-between", marginBottom: "20px", alignItems: "center" },
//   backBtn: { border: "none", background: "none", cursor: "pointer", color: "#64748b", fontWeight: "600", padding: 0, marginBottom: "5px" },
//   pageTitle: { margin: 0, fontSize: "22px", fontWeight: "800", color: "#0f172a" },
//   searchBox: { background: "#fff", padding: "8px 15px", borderRadius: "8px", border: "1px solid #e2e8f0" },
//   searchInput: { border: "none", outline: "none", width: "250px" },
//   statsGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "30px" },
//   card: { background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" },
//   cardTitle: { fontSize: "12px", color: "#64748b", textTransform: "uppercase", marginBottom: "5px", fontWeight: "600" },
//   tableCard: { background: "#fff", borderRadius: "12px", overflow: "hidden", border: "1px solid #e2e8f0" },
//   table: { width: "100%", borderCollapse: "collapse" },
//   th: { padding: "12px", background: "#f8fafc", textAlign: "left", fontSize: "11px", color: "#64748b", textTransform: "uppercase" },
//   td: { padding: "12px", borderBottom: "1px solid #f1f5f9", fontSize: "14px", color: "#334155" },
//   skuBadge: { background: "#f1f5f9", padding: "4px 8px", borderRadius: "4px", fontSize: "12px", fontFamily: "monospace" },
//   editInput: { width: "60px", padding: "6px", borderRadius: "4px", border: "1px solid #6366f1", outline: "none" },
//   editBtn: { padding: "6px 12px", borderRadius: "4px", border: "1px solid #e2e8f0", background: "#f8fafc", cursor: "pointer", fontSize: "12px", fontWeight: "600" },
//   saveBtn: { padding: "6px 12px", borderRadius: "4px", border: "none", cursor: "pointer", background: "#16a34a", color: "#fff", fontSize: "12px", fontWeight: "600" },
//   cancelBtn: { padding: "6px 12px", borderRadius: "4px", border: "none", cursor: "pointer", background: "#ef4444", color: "#fff", fontSize: "12px", fontWeight: "600" }
// };




















// import React, { useEffect, useState } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import Header from "../components/Header";
// import toast from "react-hot-toast";

// export default function Sales() {
//   const [stats, setStats] = useState({ totalUnits: 0, totalRevenue: 0, totalProfit: 0 });
//   const [skuData, setSkuData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
  
//   // Edit States
//   const [editingId, setEditingId] = useState(null);
//   const [editValue, setEditValue] = useState("");

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Search Logic
//   useEffect(() => {
//     const filtered = skuData.filter(item => 
//       item.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item._id?.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredData(filtered);
//   }, [searchTerm, skuData]);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const [dbResponse, skuResponse] = await Promise.all([
//         api.get("/sales/dashboard"),
//         api.get("/sales/sku-wise")
//       ]);
//       setStats(dbResponse.data || { totalUnits: 0, totalRevenue: 0, totalProfit: 0 });
//       setSkuData(skuResponse.data || []);
//       setFilteredData(skuResponse.data || []);
//     } catch (error) {
//       toast.error("Error fetching data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpdate = async (id) => {
//     if (!id) return toast.error("Error: Database ID not found!");
//     if (!editValue || editValue < 0) return toast.error("Invalid Quantity");
    
//     try {
//       await api.put(`/sales/update-sku/${id}`, { newQty: Number(editValue) });
//       toast.success("Updated Successfully");
//       setEditingId(null);
//       fetchData(); // Refresh totals
//     } catch (err) {
//       toast.error("Update failed! Please try again.");
//     }
//   };

//   // 🔥 NAYA: Delete Logic
//   const handleDelete = async (id) => {
//     if (!id) return toast.error("Error: Database ID not found!");
    
//     // Galti se delete na ho jaye isliye Confirmation Box
//     const confirmDelete = window.confirm("Are you sure you want to delete this sale entry?");
//     if (!confirmDelete) return;

//     try {
//       await api.delete(`/sales/delete-sku/${id}`);
//       toast.success("Deleted Successfully");
//       fetchData(); // Data aur Stats wapas refresh karein
//     } catch (err) {
//       toast.error("Delete failed! Please try again.");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <Header />
//       <div style={styles.mainContent}>
        
//         {/* Header with Search */}
//         <div style={styles.pageHeader}>
//           <div>
//             <button onClick={() => navigate("/dashboard")} style={styles.backBtn}>⬅ Back</button>
//             <h2 style={styles.pageTitle}>Sales Analytics</h2>
//           </div>
//           <div style={styles.searchBox}>
//             <input 
//               type="text" 
//               placeholder="Search SKU or Product..." 
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               style={styles.searchInput}
//             />
//           </div>
//         </div>

//         {loading ? <p style={{textAlign: "center", marginTop: "50px"}}>Loading Data...</p> : (
//           <>
//             {/* Stats */}
//             <div style={styles.statsGrid}>
//               <Card title="Units" value={stats?.totalUnits} color="#0284c7" />
//               <Card title="Revenue" value={`₹${stats?.totalRevenue?.toLocaleString()}`} color="#16a34a" />
//               <Card title="Profit" value={`₹${stats?.totalProfit?.toLocaleString()}`} color="#2563eb" />
//             </div>

//             {/* Table */}
//             <div style={styles.tableCard}>
//               <table style={styles.table}>
//                 <thead>
//                   <tr>
//                     <th style={styles.th}>SKU</th>
//                     <th style={styles.th}>Product Name</th>
//                     <th style={styles.th}>Quantity</th>
//                     <th style={styles.th}>Revenue</th>
//                     <th style={styles.th}>Profit</th>
//                     <th style={styles.th}>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredData.length === 0 ? (
//                     <tr><td colSpan="6" style={{textAlign: 'center', padding: '20px'}}>No records found</td></tr>
//                   ) : (
//                     filteredData.map((item) => {
//                       const targetId = item.originalId || item._id;
                      
//                       return (
//                         <tr key={item._id} style={styles.row}>
//                           <td style={styles.td}><span style={styles.skuBadge}>{item._id}</span></td>
//                           <td style={styles.td}><b>{item.productName}</b></td>
//                           <td style={styles.td}>
//                             {editingId === targetId ? (
//                               <input 
//                                 type="number" 
//                                 style={styles.editInput} 
//                                 value={editValue} 
//                                 onChange={(e) => setEditValue(e.target.value)}
//                                 autoFocus
//                               />
//                             ) : item.totalSold}
//                           </td>
//                           <td style={styles.td}>₹{item.revenue?.toLocaleString()}</td>
//                           <td style={{...styles.td, color: '#16a34a'}}>₹{item.profit?.toLocaleString()}</td>
//                           <td style={styles.td}>
//                             {editingId === targetId ? (
//                               <div style={{display: 'flex', gap: '5px'}}>
//                                 <button onClick={() => handleUpdate(targetId)} style={styles.saveBtn}>Save</button>
//                                 <button onClick={() => setEditingId(null)} style={styles.cancelBtn}>Cancel</button>
//                               </div>
//                             ) : (
//                               <div style={{display: 'flex', gap: '5px'}}>
//                                 <button onClick={() => { 
//                                   setEditingId(targetId); 
//                                   setEditValue(item.totalSold); 
//                                 }} style={styles.editBtn}>Edit</button>
                                
//                                 {/* 🔥 NAYA: Delete Button */}
//                                 <button 
//                                   onClick={() => handleDelete(targetId)} 
//                                   style={styles.deleteBtn}
//                                 >
//                                   Delete
//                                 </button>
//                               </div>
//                             )}
//                           </td>
//                         </tr>
//                       )
//                     })
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// const Card = ({ title, value, color }) => (
//   <div style={styles.card}>
//     <p style={styles.cardTitle}>{title}</p>
//     <h3 style={{ color, margin: 0 }}>{value || 0}</h3>
//   </div>
// );

// const styles = {
//   container: { minHeight: "100vh", backgroundColor: "#f8fafc" },
//   mainContent: { padding: "20px", maxWidth: "1100px", margin: "0 auto" },
//   pageHeader: { display: "flex", justifyContent: "space-between", marginBottom: "20px", alignItems: "center" },
//   backBtn: { border: "none", background: "none", cursor: "pointer", color: "#64748b", fontWeight: "600", padding: 0, marginBottom: "5px" },
//   pageTitle: { margin: 0, fontSize: "22px", fontWeight: "800", color: "#0f172a" },
//   searchBox: { background: "#fff", padding: "8px 15px", borderRadius: "8px", border: "1px solid #e2e8f0" },
//   searchInput: { border: "none", outline: "none", width: "250px" },
//   statsGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "30px" },
//   card: { background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" },
//   cardTitle: { fontSize: "12px", color: "#64748b", textTransform: "uppercase", marginBottom: "5px", fontWeight: "600" },
//   tableCard: { background: "#fff", borderRadius: "12px", overflow: "hidden", border: "1px solid #e2e8f0" },
//   table: { width: "100%", borderCollapse: "collapse" },
//   th: { padding: "12px", background: "#f8fafc", textAlign: "left", fontSize: "11px", color: "#64748b", textTransform: "uppercase" },
//   td: { padding: "12px", borderBottom: "1px solid #f1f5f9", fontSize: "14px", color: "#334155" },
//   skuBadge: { background: "#f1f5f9", padding: "4px 8px", borderRadius: "4px", fontSize: "12px", fontFamily: "monospace" },
//   editInput: { width: "60px", padding: "6px", borderRadius: "4px", border: "1px solid #6366f1", outline: "none" },
//   editBtn: { padding: "6px 12px", borderRadius: "4px", border: "1px solid #e2e8f0", background: "#f8fafc", cursor: "pointer", fontSize: "12px", fontWeight: "600" },
//   saveBtn: { padding: "6px 12px", borderRadius: "4px", border: "none", cursor: "pointer", background: "#16a34a", color: "#fff", fontSize: "12px", fontWeight: "600" },
//   cancelBtn: { padding: "6px 12px", borderRadius: "4px", border: "none", cursor: "pointer", background: "#ef4444", color: "#fff", fontSize: "12px", fontWeight: "600" },
//   // 🔥 NAYA: Delete Button Style
//   deleteBtn: { padding: "6px 12px", borderRadius: "4px", border: "none", cursor: "pointer", background: "#fee2e2", color: "#ef4444", fontSize: "12px", fontWeight: "600" }
// };























// import React, { useState, useEffect } from "react";
// import api from "../api/axios";
// import toast from "react-hot-toast";
// import Header from "../components/Header";

// export default function Sales() {
//   const [sales, setSales] = useState([]);
//   const [filteredSales, setFilteredSales] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Date Filter States
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   // New Sale Modal States
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [sellForm, setSellForm] = useState({
//     sku: "",
//     qty: 1,
//     useMRP: true, // Default true: MRP pe bechna hai
//     customPrice: ""
//   });

//   useEffect(() => {
//     fetchSales();
//   }, []);

//   // Jab sales ya date change ho, filter apply karo
//   useEffect(() => {
//     let result = sales;
//     if (startDate) {
//       result = result.filter(s => new Date(s.createdAt) >= new Date(startDate));
//     }
//     if (endDate) {
//       // Add 1 day to include the entire end date
//       const end = new Date(endDate);
//       end.setDate(end.getDate() + 1);
//       result = result.filter(s => new Date(s.createdAt) < end);
//     }
//     setFilteredSales(result);
//   }, [sales, startDate, endDate]);

//   const fetchSales = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get("/sales"); // GET all sales
//       setSales(res.data);
//     } catch (err) {
//       toast.error("Failed to fetch sales data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const clearFilter = () => {
//     setStartDate("");
//     setEndDate("");
//   };

//   // ✅ New Sale Submit Handle
//   const handleSellSubmit = async (e) => {
//     e.preventDefault();
//     if (!sellForm.sku) return toast.error("Please enter SKU");
//     if (sellForm.qty <= 0) return toast.error("Quantity must be greater than 0");
//     if (!sellForm.useMRP && !sellForm.customPrice) return toast.error("Please enter Custom Price");

//     try {
//       const payload = {
//         sku: sellForm.sku,
//         removeQty: sellForm.qty,
//         customSellingPrice: sellForm.useMRP ? null : Number(sellForm.customPrice)
//       };

//       // Ensure ye endpoint tumhare productController wale route se match karta ho (example: /products/update-qty)
//     //   await api.post("/products/update-qty", payload); 
//       await api.post("/update-qty-sku", payload); 
      
//       toast.success("Sale entry added successfully!");
//       setIsModalOpen(false);
//       setSellForm({ sku: "", qty: 1, useMRP: true, customPrice: "" });
//       fetchSales(); // Data refresh
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to make a sale");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <Header />
      
//       <main style={styles.mainContent}>
//         {/* TOP SECTION: Filters & Button */}
//         <section style={styles.topCard}>
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
//             <h2 style={styles.sectionTitle}>Sales Management</h2>
            
//             <button onClick={() => setIsModalOpen(true)} style={styles.sellBtn}>
//               ➕ New Sale
//             </button>
//           </div>

//           <div style={styles.filterWrapper}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//               <label style={styles.label}>From:</label>
//               <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={styles.dateInput} />
//             </div>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//               <label style={styles.label}>To:</label>
//               <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={styles.dateInput} />
//             </div>
//             {(startDate || endDate) && (
//               <button onClick={clearFilter} style={styles.clearBtn}>Clear Filter</button>
//             )}
//           </div>
//         </section>

//         {/* TABLE SECTION */}
//         <section style={styles.tableSection}>
//           {loading ? <p style={{padding: '20px'}}>Loading sales data...</p> : (
//             <div style={styles.tableWrapper}>
//               <table style={styles.table}>
//                 <thead>
//                   <tr>
//                     <th style={styles.th}>Date</th>
//                     <th style={styles.th}>Product Name</th>
//                     <th style={styles.th}>SKU</th>
//                     <th style={styles.th}>Qty</th>
//                     <th style={styles.th}>Sold Price</th>
//                     <th style={styles.th}>Total Amt</th>
//                     <th style={styles.th}>Profit</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredSales.map((sale) => (
//                     <tr key={sale._id} style={styles.row}>
//                       <td style={styles.td}>{new Date(sale.createdAt).toLocaleDateString()}</td>
//                       <td style={styles.td}><b>{sale.productName}</b></td>
//                       <td style={styles.td}>{sale.sku}</td>
//                       <td style={{...styles.td, color: 'blue', fontWeight: 'bold'}}>{sale.quantity}</td>
//                       <td style={styles.td}>₹{sale.sellingPrice}</td>
//                       <td style={styles.td}>₹{sale.totalAmount}</td>
//                       <td style={{...styles.td, color: sale.profit >= 0 ? 'green' : 'red', fontWeight: 'bold'}}>
//                         ₹{sale.profit}
//                       </td>
//                     </tr>
//                   ))}
//                   {filteredSales.length === 0 && (
//                     <tr><td colSpan="7" style={{textAlign: 'center', padding: '20px'}}>No sales found for selected dates.</td></tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </section>
//       </main>

//       {/* 🟢 NEW SALE MODAL */}
//       {isModalOpen && (
//         <div style={styles.modalOverlay}>
//           <div style={styles.modalContent}>
//             <h3 style={{marginTop: 0, marginBottom: '20px', color: '#1e3a8a'}}>Enter New Sale</h3>
            
//             <form onSubmit={handleSellSubmit} style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
//               <div>
//                 <label style={styles.modalLabel}>Product SKU</label>
//                 <input 
//                   type="text" 
//                   required 
//                   placeholder="e.g. car-red-123" 
//                   value={sellForm.sku}
//                   onChange={(e) => setSellForm({...sellForm, sku: e.target.value})}
//                   style={styles.modalInput}
//                 />
//               </div>

//               <div>
//                 <label style={styles.modalLabel}>Quantity</label>
//                 <input 
//                   type="number" 
//                   required 
//                   min="1"
//                   value={sellForm.qty}
//                   onChange={(e) => setSellForm({...sellForm, qty: Number(e.target.value)})}
//                   style={styles.modalInput}
//                 />
//               </div>

//               <div style={{display: 'flex', alignItems: 'center', gap: '8px', background: '#f8fafc', padding: '10px', borderRadius: '6px'}}>
//                 <input 
//                   type="checkbox" 
//                   checked={sellForm.useMRP} 
//                   onChange={(e) => setSellForm({...sellForm, useMRP: e.target.checked, customPrice: ""})}
//                   id="mrpCheck"
//                   style={{cursor: 'pointer'}}
//                 />
//                 <label htmlFor="mrpCheck" style={{fontSize: '14px', cursor: 'pointer', fontWeight: 'bold'}}>Sell at System MRP</label>
//               </div>

//               {!sellForm.useMRP && (
//                 <div>
//                   <label style={styles.modalLabel}>Custom Selling Price (₹)</label>
//                   <input 
//                     type="number" 
//                     required={!sellForm.useMRP}
//                     placeholder="Enter custom price per item"
//                     value={sellForm.customPrice}
//                     onChange={(e) => setSellForm({...sellForm, customPrice: e.target.value})}
//                     style={styles.modalInput}
//                   />
//                 </div>
//               )}

//               <div style={{display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px'}}>
//                 <button type="button" onClick={() => setIsModalOpen(false)} style={styles.cancelBtn}>Cancel</button>
//                 <button type="submit" style={styles.submitBtn}>Confirm Sale</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // STYLES
// const styles = {
//   container: { minHeight: "100vh", backgroundColor: "#f1f5f9", fontFamily: "'Inter', sans-serif" },
//   mainContent: { padding: "30px 20px", maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "20px" },
//   topCard: { backgroundColor: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0" },
//   sectionTitle: { margin: "0", fontSize: "20px", fontWeight: "700", color: "#334155" },
//   sellBtn: { backgroundColor: "#16a34a", color: "white", padding: "10px 16px", borderRadius: "6px", border: "none", cursor: "pointer", fontWeight: "bold", fontSize: "14px" },
  
//   filterWrapper: { display: "flex", gap: "20px", marginTop: "15px", flexWrap: "wrap", alignItems: "center", background: "#f8fafc", padding: "12px", borderRadius: "8px" },
//   label: { fontSize: "13px", fontWeight: "600", color: "#475569" },
//   dateInput: { padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none" },
//   clearBtn: { background: "transparent", color: "#ef4444", border: "1px solid #ef4444", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "12px" },
  
//   tableSection: { backgroundColor: "#fff", borderRadius: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0", overflow: "hidden" },
//   tableWrapper: { overflowX: "auto" },
//   table: { width: "100%", borderCollapse: "collapse" },
//   th: { padding: "12px 15px", background: "#f8fafc", textAlign: "left", fontSize: "13px", color: "#64748b", textTransform: "uppercase", borderBottom: "1px solid #e2e8f0" },
//   td: { padding: "12px 15px", borderBottom: "1px solid #e2e8f0", fontSize: "14px", color: "#334155" },
//   row: { transition: "background 0.2s" },

//   // Modal Styles
//   modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 },
//   modalContent: { backgroundColor: "#fff", padding: "25px", borderRadius: "12px", width: "100%", maxWidth: "400px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" },
//   modalLabel: { fontSize: "13px", fontWeight: "600", color: "#475569", marginBottom: "5px", display: "block" },
//   modalInput: { width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "14px", outline: "none", boxSizing: "border-box" },
//   cancelBtn: { padding: "10px 15px", background: "#f1f5f9", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600", color: "#475569" },
//   submitBtn: { padding: "10px 15px", background: "#2563eb", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600", color: "#fff" }
// };












// import React, { useState, useEffect } from "react";
// import api from "../api/axios";
// import toast from "react-hot-toast";
// import Header from "../components/Header";

// export default function Sales() {
//   const [sales, setSales] = useState([]);
//   const [filteredSales, setFilteredSales] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Date Filter States
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   // New Sale Modal States
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [sellForm, setSellForm] = useState({
//     sku: "",
//     qty: 1,
//     useMRP: true,
//     customPrice: ""
//   });

//   // Metrics States
//   const [metrics, setMetrics] = useState({ totalRevenue: 0, totalProfit: 0, totalSold: 0 });

//   useEffect(() => {
//     fetchSales();
//   }, []);

//   // Filter Logic & Metrics Calculation
//   useEffect(() => {
//     let result = sales;
//     if (startDate) {
//       result = result.filter(s => new Date(s.createdAt) >= new Date(startDate));
//     }
//     if (endDate) {
//       const end = new Date(endDate);
//       end.setDate(end.getDate() + 1);
//       result = result.filter(s => new Date(s.createdAt) < end);
//     }
//     setFilteredSales(result);

//     // ✅ Calculate Metrics based on filtered data
//     let rev = 0, prof = 0, sold = 0;
//     result.forEach(item => {
//       rev += Number(item.totalAmount) || 0;
//       prof += Number(item.profit) || 0;
//       sold += Number(item.quantity) || 0;
//     });
//     setMetrics({ totalRevenue: rev, totalProfit: prof, totalSold: sold });

//   }, [sales, startDate, endDate]);

//   const fetchSales = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get("/sales"); 
//       setSales(res.data);
//     } catch (err) {
//       toast.error("Failed to fetch sales data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const clearFilter = () => {
//     setStartDate("");
//     setEndDate("");
//   };

//   const handleSellSubmit = async (e) => {
//     e.preventDefault();
//     if (!sellForm.sku) return toast.error("Please enter SKU");
//     if (sellForm.qty <= 0) return toast.error("Quantity must be greater than 0");
//     if (!sellForm.useMRP && !sellForm.customPrice) return toast.error("Please enter Custom Price");

//     try {
//       const payload = {
//         sku: sellForm.sku,
//         removeQty: sellForm.qty,
//         customSellingPrice: sellForm.useMRP ? null : Number(sellForm.customPrice)
//       };

//       await api.post("/update-qty-sku", payload); 
      
//       toast.success("Sale entry added successfully!");
//       setIsModalOpen(false);
//       setSellForm({ sku: "", qty: 1, useMRP: true, customPrice: "" });
//       fetchSales(); 
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to make a sale");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <Header />
      
//       <main style={styles.mainContent}>
        
//         {/* ✅ NEW: METRICS DASHBOARD CARDS */}
//         <section style={styles.metricsGrid}>
//           <div style={{...styles.metricCard, borderLeft: '4px solid #3b82f6'}}>
//             <div style={styles.metricTitle}>Total Revenue</div>
//             <div style={{...styles.metricValue, color: '#1e3a8a'}}>₹ {metrics.totalRevenue.toLocaleString('en-IN')}</div>
//           </div>
//           <div style={{...styles.metricCard, borderLeft: '4px solid #10b981'}}>
//             <div style={styles.metricTitle}>Total Profit</div>
//             <div style={{...styles.metricValue, color: '#065f46'}}>₹ {metrics.totalProfit.toLocaleString('en-IN')}</div>
//           </div>
//           <div style={{...styles.metricCard, borderLeft: '4px solid #f59e0b'}}>
//             <div style={styles.metricTitle}>Items Sold</div>
//             <div style={{...styles.metricValue, color: '#b45309'}}>{metrics.totalSold} Units</div>
//           </div>
//         </section>

//         {/* TOP SECTION: Filters & Button */}
//         <section style={styles.topCard}>
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
//             <h2 style={styles.sectionTitle}>Sales Management</h2>
//             <button onClick={() => setIsModalOpen(true)} style={styles.sellBtn}>➕ New Sale</button>
//           </div>

//           <div style={styles.filterWrapper}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//               <label style={styles.label}>From:</label>
//               <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={styles.dateInput} />
//             </div>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//               <label style={styles.label}>To:</label>
//               <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={styles.dateInput} />
//             </div>
//             {(startDate || endDate) && (
//               <button onClick={clearFilter} style={styles.clearBtn}>✕ Clear Filter</button>
//             )}
//           </div>
//         </section>

//         {/* TABLE SECTION */}
//         <section style={styles.tableSection}>
//           {loading ? <p style={{padding: '20px', textAlign: 'center', color: '#666'}}>Loading sales data...</p> : (
//             <div style={styles.tableWrapper}>
//               <table style={styles.table}>
//                 <thead>
//                   <tr>
//                     <th style={styles.th}>Date</th>
//                     <th style={styles.th}>Product Name</th>
//                     <th style={styles.th}>SKU</th>
//                     <th style={styles.th}>Qty</th>
//                     <th style={styles.th}>Sold Price</th>
//                     <th style={styles.th}>Total Amt</th>
//                     <th style={styles.th}>Profit</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredSales.map((sale) => (
//                     <tr key={sale._id} style={styles.row}>
//                       <td style={styles.td}>{new Date(sale.createdAt).toLocaleDateString()}</td>
//                       <td style={styles.td}><b>{sale.productName}</b></td>
//                       <td style={styles.td}>{sale.sku}</td>
//                       <td style={{...styles.td, color: '#2563eb', fontWeight: 'bold'}}>{sale.quantity}</td>
//                       <td style={styles.td}>₹{sale.sellingPrice}</td>
//                       <td style={styles.td}>₹{sale.totalAmount}</td>
//                       <td style={{...styles.td, color: sale.profit >= 0 ? '#16a34a' : '#dc2626', fontWeight: 'bold'}}>
//                         ₹{sale.profit}
//                       </td>
//                     </tr>
//                   ))}
//                   {filteredSales.length === 0 && (
//                     <tr><td colSpan="7" style={{textAlign: 'center', padding: '30px', color: '#94a3b8'}}>No sales found for selected dates.</td></tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </section>
//       </main>

//       {/* 🟢 NEW SALE MODAL */}
//       {isModalOpen && (
//         <div style={styles.modalOverlay}>
//           <div style={styles.modalContent}>
//             <h3 style={{marginTop: 0, marginBottom: '20px', color: '#1e3a8a'}}>Enter New Sale</h3>
            
//             <form onSubmit={handleSellSubmit} style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
//               <div>
//                 <label style={styles.modalLabel}>Product SKU</label>
//                 <input type="text" required placeholder="e.g. car-red-123" value={sellForm.sku} onChange={(e) => setSellForm({...sellForm, sku: e.target.value})} style={styles.modalInput} />
//               </div>

//               <div>
//                 <label style={styles.modalLabel}>Quantity</label>
//                 <input type="number" required min="1" value={sellForm.qty} onChange={(e) => setSellForm({...sellForm, qty: Number(e.target.value)})} style={styles.modalInput} />
//               </div>

//               <div style={{display: 'flex', alignItems: 'center', gap: '8px', background: '#f8fafc', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0'}}>
//                 <input type="checkbox" checked={sellForm.useMRP} onChange={(e) => setSellForm({...sellForm, useMRP: e.target.checked, customPrice: ""})} id="mrpCheck" style={{cursor: 'pointer'}} />
//                 <label htmlFor="mrpCheck" style={{fontSize: '14px', cursor: 'pointer', fontWeight: 'bold', color: '#334155'}}>Sell at System MRP</label>
//               </div>

//               {!sellForm.useMRP && (
//                 <div>
//                   <label style={styles.modalLabel}>Custom Selling Price (₹)</label>
//                   <input type="number" required={!sellForm.useMRP} placeholder="Enter custom price per item" value={sellForm.customPrice} onChange={(e) => setSellForm({...sellForm, customPrice: e.target.value})} style={styles.modalInput} />
//                 </div>
//               )}

//               <div style={{display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px'}}>
//                 <button type="button" onClick={() => setIsModalOpen(false)} style={styles.cancelBtn}>Cancel</button>
//                 <button type="submit" style={styles.submitBtn}>Confirm Sale</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // STYLES
// const styles = {
//   container: { minHeight: "100vh", backgroundColor: "#f1f5f9", fontFamily: "'Inter', sans-serif" },
//   mainContent: { padding: "30px 20px", maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "20px" },
  
//   // ✅ Metrics Styles
//   metricsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' },
//   metricCard: { backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '8px' },
//   metricTitle: { fontSize: '13px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' },
//   metricValue: { fontSize: '26px', fontWeight: '800' },

//   topCard: { backgroundColor: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0" },
//   sectionTitle: { margin: "0", fontSize: "20px", fontWeight: "700", color: "#334155" },
//   sellBtn: { backgroundColor: "#16a34a", color: "white", padding: "10px 18px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "bold", fontSize: "14px", boxShadow: "0 2px 4px rgba(22, 163, 74, 0.2)" },
  
//   filterWrapper: { display: "flex", gap: "20px", marginTop: "15px", flexWrap: "wrap", alignItems: "center", background: "#f8fafc", padding: "12px", borderRadius: "8px", border: "1px solid #e2e8f0" },
//   label: { fontSize: "13px", fontWeight: "600", color: "#475569" },
//   dateInput: { padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none", fontSize: '13px' },
//   clearBtn: { background: "#fee2e2", color: "#ef4444", border: "none", padding: "8px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "600" },
  
//   tableSection: { backgroundColor: "#fff", borderRadius: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0", overflow: "hidden" },
//   tableWrapper: { overflowX: "auto" },
//   table: { width: "100%", borderCollapse: "collapse" },
//   th: { padding: "14px 15px", background: "#f8fafc", textAlign: "left", fontSize: "13px", color: "#64748b", textTransform: "uppercase", borderBottom: "1px solid #e2e8f0" },
//   td: { padding: "14px 15px", borderBottom: "1px solid #e2e8f0", fontSize: "14px", color: "#334155" },
//   row: { transition: "background 0.2s" },

//   modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 },
//   modalContent: { backgroundColor: "#fff", padding: "25px", borderRadius: "12px", width: "100%", maxWidth: "400px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" },
//   modalLabel: { fontSize: "13px", fontWeight: "600", color: "#475569", marginBottom: "5px", display: "block" },
//   modalInput: { width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", outline: "none", boxSizing: "border-box" },
//   cancelBtn: { padding: "10px 18px", background: "#f1f5f9", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600", color: "#475569" },
//   submitBtn: { padding: "10px 18px", background: "#2563eb", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600", color: "#fff", boxShadow: "0 2px 4px rgba(37, 99, 235, 0.2)" }
// };












// import React, { useState, useEffect } from "react";
// import api from "../api/axios";
// import toast from "react-hot-toast";
// import Header from "../components/Header";

// export default function Sales() {
//   const [sales, setSales] = useState([]);
//   const [filteredSales, setFilteredSales] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Date Filter States
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   // New Sale Modal States
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [sellForm, setSellForm] = useState({
//     sku: "",
//     qty: 1,
//     useMRP: true,
//     customPrice: ""
//   });

//   // Metrics States
//   const [metrics, setMetrics] = useState({ totalRevenue: 0, totalProfit: 0, totalSold: 0 });

//   useEffect(() => {
//     fetchSales();
//   }, []);

//   // Filter Logic & Metrics Calculation
//   useEffect(() => {
//     let result = sales;
//     if (startDate) {
//       result = result.filter(s => new Date(s.createdAt) >= new Date(startDate));
//     }
//     if (endDate) {
//       const end = new Date(endDate);
//       end.setDate(end.getDate() + 1);
//       result = result.filter(s => new Date(s.createdAt) < end);
//     }
//     setFilteredSales(result);

//     // Calculate Metrics based on filtered data
//     let rev = 0, prof = 0, sold = 0;
//     result.forEach(item => {
//       rev += Number(item.totalAmount) || 0;
//       prof += Number(item.profit) || 0;
//       sold += Number(item.quantity) || 0;
//     });
//     setMetrics({ totalRevenue: rev, totalProfit: prof, totalSold: sold });

//   }, [sales, startDate, endDate]);

//   const fetchSales = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get("/sales"); 
//       setSales(res.data);
//     } catch (err) {
//       toast.error("Failed to fetch sales data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const clearFilter = () => {
//     setStartDate("");
//     setEndDate("");
//   };

//   // ✅ New Sale Submit Handle
//   const handleSellSubmit = async (e) => {
//     e.preventDefault();
//     if (!sellForm.sku) return toast.error("Please enter SKU");
//     if (sellForm.qty <= 0) return toast.error("Quantity must be greater than 0");
//     if (!sellForm.useMRP && !sellForm.customPrice) return toast.error("Please enter Custom Price");

//     try {
//       const payload = {
//         sku: sellForm.sku,
//         removeQty: sellForm.qty,
//         customSellingPrice: sellForm.useMRP ? null : Number(sellForm.customPrice)
//       };

//       await api.post("/update-qty-sku", payload); 
      
//       toast.success("Sale entry added successfully!");
//       setIsModalOpen(false);
//       setSellForm({ sku: "", qty: 1, useMRP: true, customPrice: "" });
//       fetchSales(); 
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to make a sale");
//     }
//   };

// //   // ✅ DELETE SALE ENTRY
// //   const handleDeleteSale = async (id) => {
// //     if (window.confirm("Are you sure you want to delete this sale entry?")) {
// //       try {
// //         // Tumhara backend route '/sales/delete-sku/:id' use kar rahe hain
// //         await api.delete(`/sales/delete-sku/${id}`);
// //         toast.success("Sale entry deleted successfully!");
// //         fetchSales(); // Refresh the list after deleting
// //       } catch (err) {
// //         toast.error("Failed to delete sale entry");
// //       }
// //     }
// //   };

//   // ✅ 1. ASYNC FUNCTION JO ACTUAL DELETE KAREGA
// //   const executeDelete = async (id) => {
// //     try {
// //       await api.delete(`/sales/delete-sku/${id}`);
// //       toast.success("Sale entry deleted successfully!");
// //       fetchSales(); // Refresh the list
// //     } catch (err) {
// //       toast.error("Failed to delete sale entry");
// //     }
// //   };

//   // ✅ 1. ASYNC FUNCTION JO ACTUAL DELETE KAREGA
//   const executeDelete = async (id) => {
//     try {
//       await api.delete(`/sales/delete-sku/${id}`);
//       toast.success("Sale entry deleted successfully!");
//       fetchSales(); // Refresh the list
//     } catch (err) {
//       toast.error("Failed to delete sale entry");
//     }
//   };

//   // ✅ 2. CUSTOM TOAST CONFIRMATION DIALOG (LIGHT THEME)
//   const handleDeleteSale = (id) => {
//     toast((t) => (
//       <div style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "4px" }}>
//         <div style={{ fontWeight: "600", fontSize: "14px", color: "#334155", display: "flex", alignItems: "center", gap: "6px" }}>
//           <span style={{ fontSize: "16px" }}>⚠️</span> Delete Sale Entry?
//         </div>
//         <p style={{ margin: 0, fontSize: "12px", color: "#64748b", lineHeight: "1.4" }}>
//           Are you sure? This action cannot be undone and will permanently remove this record.
//         </p>
//         <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end", marginTop: "8px" }}>
//           <button 
//             onClick={() => toast.dismiss(t.id)} 
//             style={{ padding: "6px 12px", background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "600", color: "#64748b" }}
//           >
//             Cancel
//           </button>
//           <button 
//             onClick={() => {
//               toast.dismiss(t.id);
//               executeDelete(id);
//             }} 
//             // 🔥 Light Red / Pastel Red Background for a softer look
//             style={{ padding: "6px 12px", background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "600" }}
//           >
//             Yes, Delete
//           </button>
//         </div>
//       </div>
//     ), {
//       id: "delete-confirm-toast",
//       duration: Infinity,
//       position: "top-center",
//       style: {
//         background: '#ffffff',       // Pure white background
//         padding: '16px',
//         borderRadius: '10px',
//         border: '1px solid #f1f5f9', // Very light border
//         boxShadow: '0 4px 15px rgba(0,0,0,0.05)' // Ekdum light and smooth shadow
//       }
//     });
//   };

//   return (
//     <div style={styles.container}>
//       <Header />
      
//       <main style={styles.mainContent}>
        
//         {/* METRICS DASHBOARD CARDS */}
//         <section style={styles.metricsGrid}>
//           <div style={{...styles.metricCard, borderLeft: '4px solid #3b82f6'}}>
//             <div style={styles.metricTitle}>Total Revenue</div>
//             <div style={{...styles.metricValue, color: '#1e3a8a'}}>₹ {metrics.totalRevenue.toLocaleString('en-IN')}</div>
//           </div>
//           <div style={{...styles.metricCard, borderLeft: '4px solid #10b981'}}>
//             <div style={styles.metricTitle}>Total Profit</div>
//             <div style={{...styles.metricValue, color: '#065f46'}}>₹ {metrics.totalProfit.toLocaleString('en-IN')}</div>
//           </div>
//           <div style={{...styles.metricCard, borderLeft: '4px solid #f59e0b'}}>
//             <div style={styles.metricTitle}>Items Sold</div>
//             <div style={{...styles.metricValue, color: '#b45309'}}>{metrics.totalSold} Units</div>
//           </div>
//         </section>

//         {/* TOP SECTION: Filters & Button */}
//         <section style={styles.topCard}>
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
//             <h2 style={styles.sectionTitle}>Sales Management</h2>
//             <button onClick={() => setIsModalOpen(true)} style={styles.sellBtn}>➕ New Sale</button>
//           </div>

//           <div style={styles.filterWrapper}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//               <label style={styles.label}>From:</label>
//               <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={styles.dateInput} />
//             </div>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//               <label style={styles.label}>To:</label>
//               <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={styles.dateInput} />
//             </div>
//             {(startDate || endDate) && (
//               <button onClick={clearFilter} style={styles.clearBtn}>✕ Clear Filter</button>
//             )}
//           </div>
//         </section>

//         {/* TABLE SECTION */}
//         <section style={styles.tableSection}>
//           {loading ? <p style={{padding: '20px', textAlign: 'center', color: '#666'}}>Loading sales data...</p> : (
//             <div style={styles.tableWrapper}>
//               <table style={styles.table}>
//                 <thead>
//                   <tr>
//                     <th style={styles.th}>Date</th>
//                     <th style={styles.th}>Product Name</th>
//                     <th style={styles.th}>SKU</th>
//                     <th style={styles.th}>Qty</th>
//                     <th style={styles.th}>Sold Price</th>
//                     <th style={styles.th}>Total Amt</th>
//                     <th style={styles.th}>Profit</th>
//                     <th style={{...styles.th, textAlign: 'center'}}>Action</th> {/* ✅ Added Action Header */}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredSales.map((sale) => (
//                     <tr key={sale._id} style={styles.row}>
//                       <td style={styles.td}>{new Date(sale.createdAt).toLocaleDateString()}</td>
//                       <td style={styles.td}><b>{sale.productName}</b></td>
//                       <td style={styles.td}>{sale.sku}</td>
//                       <td style={{...styles.td, color: '#2563eb', fontWeight: 'bold'}}>{sale.quantity}</td>
//                       <td style={styles.td}>₹{sale.sellingPrice}</td>
//                       <td style={styles.td}>₹{sale.totalAmount}</td>
//                       <td style={{...styles.td, color: sale.profit >= 0 ? '#16a34a' : '#dc2626', fontWeight: 'bold'}}>
//                         ₹{sale.profit}
//                       </td>
//                       <td style={{...styles.td, textAlign: 'center'}}>
//                         {/* ✅ DELETE BUTTON */}
//                         <button 
//                           onClick={() => handleDeleteSale(sale._id)} 
//                           style={styles.deleteIconBtn}
//                           title="Delete Entry"
//                         >
//                           🗑️
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                   {filteredSales.length === 0 && (
//                     <tr><td colSpan="8" style={{textAlign: 'center', padding: '30px', color: '#94a3b8'}}>No sales found for selected dates.</td></tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </section>
//       </main>

//       {/* 🟢 NEW SALE MODAL */}
//       {isModalOpen && (
//         <div style={styles.modalOverlay}>
//           <div style={styles.modalContent}>
//             <h3 style={{marginTop: 0, marginBottom: '20px', color: '#1e3a8a'}}>Enter New Sale</h3>
            
//             <form onSubmit={handleSellSubmit} style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
//               <div>
//                 <label style={styles.modalLabel}>Product SKU</label>
//                 <input type="text" required placeholder="e.g. car-red-123" value={sellForm.sku} onChange={(e) => setSellForm({...sellForm, sku: e.target.value})} style={styles.modalInput} />
//               </div>

//               <div>
//                 <label style={styles.modalLabel}>Quantity</label>
//                 <input type="number" required min="1" value={sellForm.qty} onChange={(e) => setSellForm({...sellForm, qty: Number(e.target.value)})} style={styles.modalInput} />
//               </div>

//               <div style={{display: 'flex', alignItems: 'center', gap: '8px', background: '#f8fafc', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0'}}>
//                 <input type="checkbox" checked={sellForm.useMRP} onChange={(e) => setSellForm({...sellForm, useMRP: e.target.checked, customPrice: ""})} id="mrpCheck" style={{cursor: 'pointer'}} />
//                 <label htmlFor="mrpCheck" style={{fontSize: '14px', cursor: 'pointer', fontWeight: 'bold', color: '#334155'}}>Sell at System MRP</label>
//               </div>

//               {!sellForm.useMRP && (
//                 <div>
//                   <label style={styles.modalLabel}>Custom Selling Price (₹)</label>
//                   <input type="number" required={!sellForm.useMRP} placeholder="Enter custom price per item" value={sellForm.customPrice} onChange={(e) => setSellForm({...sellForm, customPrice: e.target.value})} style={styles.modalInput} />
//                 </div>
//               )}

//               <div style={{display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px'}}>
//                 <button type="button" onClick={() => setIsModalOpen(false)} style={styles.cancelBtn}>Cancel</button>
//                 <button type="submit" style={styles.submitBtn}>Confirm Sale</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // STYLES
// const styles = {
//   container: { minHeight: "100vh", backgroundColor: "#f1f5f9", fontFamily: "'Inter', sans-serif" },
//   mainContent: { padding: "30px 20px", maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "20px" },
  
//   metricsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' },
//   metricCard: { backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '8px' },
//   metricTitle: { fontSize: '13px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' },
//   metricValue: { fontSize: '26px', fontWeight: '800' },

//   topCard: { backgroundColor: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0" },
//   sectionTitle: { margin: "0", fontSize: "20px", fontWeight: "700", color: "#334155" },
//   sellBtn: { backgroundColor: "#16a34a", color: "white", padding: "10px 18px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "bold", fontSize: "14px", boxShadow: "0 2px 4px rgba(22, 163, 74, 0.2)" },
  
//   filterWrapper: { display: "flex", gap: "20px", marginTop: "15px", flexWrap: "wrap", alignItems: "center", background: "#f8fafc", padding: "12px", borderRadius: "8px", border: "1px solid #e2e8f0" },
//   label: { fontSize: "13px", fontWeight: "600", color: "#475569" },
//   dateInput: { padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none", fontSize: '13px' },
//   clearBtn: { background: "#fee2e2", color: "#ef4444", border: "none", padding: "8px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "600" },
  
//   tableSection: { backgroundColor: "#fff", borderRadius: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0", overflow: "hidden" },
//   tableWrapper: { overflowX: "auto" },
//   table: { width: "100%", borderCollapse: "collapse" },
//   th: { padding: "14px 15px", background: "#f8fafc", textAlign: "left", fontSize: "13px", color: "#64748b", textTransform: "uppercase", borderBottom: "1px solid #e2e8f0" },
//   td: { padding: "14px 15px", borderBottom: "1px solid #e2e8f0", fontSize: "14px", color: "#334155" },
//   row: { transition: "background 0.2s" },

//   // ✅ Style for Delete Button in table
//   deleteIconBtn: { background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '16px', padding: '5px', borderRadius: '4px', transition: 'background 0.2s' },

//   modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 },
//   modalContent: { backgroundColor: "#fff", padding: "25px", borderRadius: "12px", width: "100%", maxWidth: "400px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" },
//   modalLabel: { fontSize: "13px", fontWeight: "600", color: "#475569", marginBottom: "5px", display: "block" },
//   modalInput: { width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", outline: "none", boxSizing: "border-box" },
//   cancelBtn: { padding: "10px 18px", background: "#f1f5f9", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600", color: "#475569" },
//   submitBtn: { padding: "10px 18px", background: "#2563eb", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600", color: "#fff", boxShadow: "0 2px 4px rgba(37, 99, 235, 0.2)" }
// };





















// import React, { useState, useEffect } from "react";
// import api from "../api/axios";
// import toast from "react-hot-toast";
// import Header from "../components/Header";

// export default function Sales() {
//   const [sales, setSales] = useState([]);
//   const [filteredSales, setFilteredSales] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Date Filter States
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   // ✅ Pagination States
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 20; // Ek page pe kitni entry dikhani hain

//   // New Sale Modal States
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [sellForm, setSellForm] = useState({
//     sku: "",
//     qty: 1,
//     useMRP: true,
//     customPrice: ""
//   });

//   // Metrics States
//   const [metrics, setMetrics] = useState({ totalRevenue: 0, totalProfit: 0, totalSold: 0 });

//   useEffect(() => {
//     fetchSales();
//   }, []);

//   // Filter Logic & Metrics Calculation
//   useEffect(() => {
//     let result = sales;
//     if (startDate) {
//       result = result.filter(s => new Date(s.createdAt) >= new Date(startDate));
//     }
//     if (endDate) {
//       const end = new Date(endDate);
//       end.setDate(end.getDate() + 1);
//       result = result.filter(s => new Date(s.createdAt) < end);
//     }
//     setFilteredSales(result);
//     setCurrentPage(1); // Jab bhi filter change ho, page 1 pe wapas jao

//     // Calculate Metrics based on filtered data
//     let rev = 0, prof = 0, sold = 0;
//     result.forEach(item => {
//       rev += Number(item.totalAmount) || 0;
//       prof += Number(item.profit) || 0;
//       sold += Number(item.quantity) || 0;
//     });
//     setMetrics({ totalRevenue: rev, totalProfit: prof, totalSold: sold });

//   }, [sales, startDate, endDate]);

//   const fetchSales = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get("/sales"); 
//       setSales(res.data);
//     } catch (err) {
//       toast.error("Failed to fetch sales data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const clearFilter = () => {
//     setStartDate("");
//     setEndDate("");
//   };

//   // ✅ New Sale Submit Handle
//   const handleSellSubmit = async (e) => {
//     e.preventDefault();
//     if (!sellForm.sku) return toast.error("Please enter SKU");
//     if (sellForm.qty <= 0) return toast.error("Quantity must be greater than 0");
//     if (!sellForm.useMRP && !sellForm.customPrice) return toast.error("Please enter Custom Price");

//     try {
//       const payload = {
//         sku: sellForm.sku,
//         removeQty: sellForm.qty,
//         customSellingPrice: sellForm.useMRP ? null : Number(sellForm.customPrice)
//       };

//       await api.post("/update-qty-sku", payload); 
      
//       toast.success("Sale entry added successfully!");
//       setIsModalOpen(false);
//       setSellForm({ sku: "", qty: 1, useMRP: true, customPrice: "" });
//       fetchSales(); 
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to make a sale");
//     }
//   };

//   // ✅ ASYNC FUNCTION JO ACTUAL DELETE KAREGA
//   const executeDelete = async (id) => {
//     try {
//       await api.delete(`/sales/delete-sku/${id}`);
//       toast.success("Sale entry deleted successfully!");
//       fetchSales(); // Refresh the list
//     } catch (err) {
//       toast.error("Failed to delete sale entry");
//     }
//   };

//   // ✅ CUSTOM TOAST CONFIRMATION DIALOG
//   const handleDeleteSale = (id) => {
//     toast((t) => (
//       <div style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "4px" }}>
//         <div style={{ fontWeight: "600", fontSize: "14px", color: "#334155", display: "flex", alignItems: "center", gap: "6px" }}>
//           <span style={{ fontSize: "16px" }}>⚠️</span> Delete Sale Entry?
//         </div>
//         <p style={{ margin: 0, fontSize: "12px", color: "#64748b", lineHeight: "1.4" }}>
//           Are you sure? This action cannot be undone and will permanently remove this record.
//         </p>
//         <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end", marginTop: "8px" }}>
//           <button 
//             onClick={() => toast.dismiss(t.id)} 
//             style={{ padding: "6px 12px", background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "600", color: "#64748b" }}
//           >
//             Cancel
//           </button>
//           <button 
//             onClick={() => {
//               toast.dismiss(t.id);
//               executeDelete(id);
//             }} 
//             style={{ padding: "6px 12px", background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "600" }}
//           >
//             Yes, Delete
//           </button>
//         </div>
//       </div>
//     ), {
//       id: "delete-confirm-toast",
//       duration: Infinity,
//       position: "top-center",
//       style: {
//         background: '#ffffff',
//         padding: '16px',
//         borderRadius: '10px',
//         border: '1px solid #f1f5f9',
//         boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
//       }
//     });
//   };

//   // ✅ PAGINATION LOGIC: Current page ka data nikalo
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentSales = filteredSales.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredSales.length / itemsPerPage);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div style={styles.container}>
//       <Header />
      
//       <main style={styles.mainContent}>
        
//         {/* METRICS DASHBOARD CARDS */}
//         <section style={styles.metricsGrid}>
//           <div style={{...styles.metricCard, borderLeft: '4px solid #3b82f6'}}>
//             <div style={styles.metricTitle}>Total Revenue</div>
//             <div style={{...styles.metricValue, color: '#1e3a8a'}}>₹ {metrics.totalRevenue.toLocaleString('en-IN')}</div>
//           </div>
//           <div style={{...styles.metricCard, borderLeft: '4px solid #10b981'}}>
//             <div style={styles.metricTitle}>Total Profit</div>
//             <div style={{...styles.metricValue, color: '#065f46'}}>₹ {metrics.totalProfit.toLocaleString('en-IN')}</div>
//           </div>
//           <div style={{...styles.metricCard, borderLeft: '4px solid #f59e0b'}}>
//             <div style={styles.metricTitle}>Items Sold</div>
//             <div style={{...styles.metricValue, color: '#b45309'}}>{metrics.totalSold} Units</div>
//           </div>
//         </section>

//         {/* TOP SECTION: Filters & Button */}
//         <section style={styles.topCard}>
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
//             <h2 style={styles.sectionTitle}>Sales Management</h2>
//             <button onClick={() => setIsModalOpen(true)} style={styles.sellBtn}>➕ New Sale</button>
//           </div>

//           <div style={styles.filterWrapper}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//               <label style={styles.label}>From:</label>
//               <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={styles.dateInput} />
//             </div>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//               <label style={styles.label}>To:</label>
//               <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={styles.dateInput} />
//             </div>
//             {(startDate || endDate) && (
//               <button onClick={clearFilter} style={styles.clearBtn}>✕ Clear Filter</button>
//             )}
//           </div>
//         </section>

//         {/* TABLE SECTION */}
//         <section style={styles.tableSection}>
//           {loading ? <p style={{padding: '20px', textAlign: 'center', color: '#666'}}>Loading sales data...</p> : (
//             <>
//               <div style={styles.tableWrapper}>
//                 <table style={styles.table}>
//                   <thead>
//                     <tr>
//                       <th style={styles.th}>Date</th>
//                       <th style={styles.th}>Product Name</th>
//                       <th style={styles.th}>SKU</th>
//                       <th style={styles.th}>Qty</th>
//                       <th style={styles.th}>Sold Price</th>
//                       <th style={styles.th}>Total Amt</th>
//                       <th style={styles.th}>Profit</th>
//                       <th style={{...styles.th, textAlign: 'center'}}>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {/* ✅ filteredSales ki jagah currentSales use kiya hai */}
//                     {currentSales.map((sale) => (
//                       <tr key={sale._id} style={styles.row}>
//                         <td style={styles.td}>{new Date(sale.createdAt).toLocaleDateString()}</td>
//                         <td style={styles.td}><b>{sale.productName}</b></td>
//                         <td style={styles.td}>{sale.sku}</td>
//                         <td style={{...styles.td, color: '#2563eb', fontWeight: 'bold'}}>{sale.quantity}</td>
//                         <td style={styles.td}>₹{sale.sellingPrice}</td>
//                         <td style={styles.td}>₹{sale.totalAmount}</td>
//                         <td style={{...styles.td, color: sale.profit >= 0 ? '#16a34a' : '#dc2626', fontWeight: 'bold'}}>
//                           ₹{sale.profit}
//                         </td>
//                         <td style={{...styles.td, textAlign: 'center'}}>
//                           <button onClick={() => handleDeleteSale(sale._id)} style={styles.deleteIconBtn} title="Delete Entry">
//                             🗑️
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                     {currentSales.length === 0 && (
//                       <tr><td colSpan="8" style={{textAlign: 'center', padding: '30px', color: '#94a3b8'}}>No sales found for selected dates.</td></tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>

//               {/* ✅ PAGINATION CONTROLS */}
//               {!loading && filteredSales.length > itemsPerPage && (
//                 <div style={styles.paginationWrapper}>
//                   <button 
//                     onClick={() => paginate(currentPage - 1)} 
//                     disabled={currentPage === 1} 
//                     style={currentPage === 1 ? styles.disabledPageBtn : styles.pageBtn}
//                   >
//                     Previous
//                   </button>
                  
//                   <span style={styles.pageInfo}>
//                     Page {currentPage} of {totalPages}
//                   </span>
                  
//                   <button 
//                     onClick={() => paginate(currentPage + 1)} 
//                     disabled={currentPage === totalPages} 
//                     style={currentPage === totalPages ? styles.disabledPageBtn : styles.pageBtn}
//                   >
//                     Next
//                   </button>
//                 </div>
//               )}
//             </>
//           )}
//         </section>
//       </main>

//       {/* 🟢 NEW SALE MODAL */}
//       {isModalOpen && (
//         <div style={styles.modalOverlay}>
//           <div style={styles.modalContent}>
//             <h3 style={{marginTop: 0, marginBottom: '20px', color: '#1e3a8a'}}>Enter New Sale</h3>
            
//             <form onSubmit={handleSellSubmit} style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
//               <div>
//                 <label style={styles.modalLabel}>Product SKU</label>
//                 <input type="text" required placeholder="e.g. car-red-123" value={sellForm.sku} onChange={(e) => setSellForm({...sellForm, sku: e.target.value})} style={styles.modalInput} />
//               </div>

//               <div>
//                 <label style={styles.modalLabel}>Quantity</label>
//                 <input type="number" required min="1" value={sellForm.qty} onChange={(e) => setSellForm({...sellForm, qty: Number(e.target.value)})} style={styles.modalInput} />
//               </div>

//               <div style={{display: 'flex', alignItems: 'center', gap: '8px', background: '#f8fafc', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0'}}>
//                 <input type="checkbox" checked={sellForm.useMRP} onChange={(e) => setSellForm({...sellForm, useMRP: e.target.checked, customPrice: ""})} id="mrpCheck" style={{cursor: 'pointer'}} />
//                 <label htmlFor="mrpCheck" style={{fontSize: '14px', cursor: 'pointer', fontWeight: 'bold', color: '#334155'}}>Sell at System MRP</label>
//               </div>

//               {!sellForm.useMRP && (
//                 <div>
//                   <label style={styles.modalLabel}>Custom Selling Price (₹)</label>
//                   <input type="number" required={!sellForm.useMRP} placeholder="Enter custom price per item" value={sellForm.customPrice} onChange={(e) => setSellForm({...sellForm, customPrice: e.target.value})} style={styles.modalInput} />
//                 </div>
//               )}

//               <div style={{display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px'}}>
//                 <button type="button" onClick={() => setIsModalOpen(false)} style={styles.cancelBtn}>Cancel</button>
//                 <button type="submit" style={styles.submitBtn}>Confirm Sale</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // STYLES
// const styles = {
//   container: { minHeight: "100vh", backgroundColor: "#f1f5f9", fontFamily: "'Inter', sans-serif" },
//   mainContent: { padding: "30px 20px", maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "20px" },
  
//   metricsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' },
//   metricCard: { backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '8px' },
//   metricTitle: { fontSize: '13px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' },
//   metricValue: { fontSize: '26px', fontWeight: '800' },

//   topCard: { backgroundColor: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0" },
//   sectionTitle: { margin: "0", fontSize: "20px", fontWeight: "700", color: "#334155" },
//   sellBtn: { backgroundColor: "#16a34a", color: "white", padding: "10px 18px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "bold", fontSize: "14px", boxShadow: "0 2px 4px rgba(22, 163, 74, 0.2)" },
  
//   filterWrapper: { display: "flex", gap: "20px", marginTop: "15px", flexWrap: "wrap", alignItems: "center", background: "#f8fafc", padding: "12px", borderRadius: "8px", border: "1px solid #e2e8f0" },
//   label: { fontSize: "13px", fontWeight: "600", color: "#475569" },
//   dateInput: { padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none", fontSize: '13px' },
//   clearBtn: { background: "#fee2e2", color: "#ef4444", border: "none", padding: "8px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "600" },
  
//   tableSection: { backgroundColor: "#fff", borderRadius: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0", overflow: "hidden" },
//   tableWrapper: { overflowX: "auto" },
//   table: { width: "100%", borderCollapse: "collapse" },
//   th: { padding: "14px 15px", background: "#f8fafc", textAlign: "left", fontSize: "13px", color: "#64748b", textTransform: "uppercase", borderBottom: "1px solid #e2e8f0" },
//   td: { padding: "14px 15px", borderBottom: "1px solid #e2e8f0", fontSize: "14px", color: "#334155" },
//   row: { transition: "background 0.2s" },

//   deleteIconBtn: { background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '16px', padding: '5px', borderRadius: '4px', transition: 'background 0.2s' },

//   // ✅ Pagination Styles
//   paginationWrapper: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', padding: '15px', background: '#fff', borderTop: '1px solid #e2e8f0' },
//   pageBtn: { background: '#2563eb', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', color: '#fff', fontSize: '13px', fontWeight: '600', transition: 'background 0.2s' },
//   disabledPageBtn: { background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '8px 16px', borderRadius: '6px', cursor: 'not-allowed', color: '#94a3b8', fontSize: '13px', fontWeight: '600' },
//   pageInfo: { fontSize: '13px', fontWeight: '600', color: '#475569' },

//   modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 },
//   modalContent: { backgroundColor: "#fff", padding: "25px", borderRadius: "12px", width: "100%", maxWidth: "400px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" },
//   modalLabel: { fontSize: "13px", fontWeight: "600", color: "#475569", marginBottom: "5px", display: "block" },
//   modalInput: { width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", outline: "none", boxSizing: "border-box" },
//   cancelBtn: { padding: "10px 18px", background: "#f1f5f9", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600", color: "#475569" },
//   submitBtn: { padding: "10px 18px", background: "#2563eb", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600", color: "#fff", boxShadow: "0 2px 4px rgba(37, 99, 235, 0.2)" }
// };






























// import React, { useState, useEffect } from "react";
// import api from "../api/axios";
// import toast from "react-hot-toast";
// import Header from "../components/Header";

// export default function Sales() {
//   const [sales, setSales] = useState([]);
//   const [filteredSales, setFilteredSales] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Date Filter States
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   // ✅ Pagination States
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 20;

//   // New Sale Modal States
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [sellForm, setSellForm] = useState({
//     sku: "",
//     qty: 1,
//     useMRP: true,
//     customPrice: ""
//   });

//   // Metrics States
//   const [metrics, setMetrics] = useState({ totalRevenue: 0, totalProfit: 0, totalSold: 0 });

//   useEffect(() => {
//     fetchSales();
//   }, []);

//   // Filter Logic & Metrics Calculation
//   useEffect(() => {
//     let result = sales;
//     if (startDate) {
//       result = result.filter(s => new Date(s.createdAt) >= new Date(startDate));
//     }
//     if (endDate) {
//       const end = new Date(endDate);
//       end.setDate(end.getDate() + 1);
//       result = result.filter(s => new Date(s.createdAt) < end);
//     }
//     setFilteredSales(result);
//     setCurrentPage(1); 

//     // Calculate Metrics based on filtered data
//     let rev = 0, prof = 0, sold = 0;
//     result.forEach(item => {
//       rev += Number(item.totalAmount) || 0;
//       prof += Number(item.profit) || 0;
//       sold += Number(item.quantity) || 0;
//     });
//     setMetrics({ totalRevenue: rev, totalProfit: prof, totalSold: sold });

//   }, [sales, startDate, endDate]);

//   const fetchSales = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get("/sales"); 
//       setSales(res.data);
//     } catch (err) {
//       toast.error("Failed to fetch sales data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const clearFilter = () => {
//     setStartDate("");
//     setEndDate("");
//   };

//   // ✅ New Sale Submit Handle (Manual Entry)
//   const handleSellSubmit = async (e) => {
//     e.preventDefault();
//     if (!sellForm.sku) return toast.error("Please enter SKU");
//     if (sellForm.qty <= 0) return toast.error("Quantity must be greater than 0");
//     if (!sellForm.useMRP && !sellForm.customPrice) return toast.error("Please enter Custom Price");

//     try {
//       const payload = {
//         sku: sellForm.sku,
//         removeQty: sellForm.qty,
//         customSellingPrice: sellForm.useMRP ? null : Number(sellForm.customPrice),
//         shop: "Manual Entry" // Ensure manual entry has a default source
//       };

//       await api.post("/update-qty-sku", payload); 
      
//       toast.success("Sale entry added successfully!");
//       setIsModalOpen(false);
//       setSellForm({ sku: "", qty: 1, useMRP: true, customPrice: "" });
//       fetchSales(); 
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to make a sale");
//     }
//   };

//   const executeDelete = async (id) => {
//     try {
//       await api.delete(`/sales/delete-sku/${id}`);
//       toast.success("Sale entry deleted successfully!");
//       fetchSales();
//     } catch (err) {
//       toast.error("Failed to delete sale entry");
//     }
//   };

//   const handleDeleteSale = (id) => {
//     toast((t) => (
//       <div style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "4px" }}>
//         <div style={{ fontWeight: "600", fontSize: "14px", color: "#334155", display: "flex", alignItems: "center", gap: "6px" }}>
//           <span style={{ fontSize: "16px" }}>⚠️</span> Delete Sale Entry?
//         </div>
//         <p style={{ margin: 0, fontSize: "12px", color: "#64748b", lineHeight: "1.4" }}>
//           Are you sure? This action cannot be undone and will permanently remove this record.
//         </p>
//         <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end", marginTop: "8px" }}>
//           <button 
//             onClick={() => toast.dismiss(t.id)} 
//             style={{ padding: "6px 12px", background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "600", color: "#64748b" }}
//           >
//             Cancel
//           </button>
//           <button 
//             onClick={() => {
//               toast.dismiss(t.id);
//               executeDelete(id);
//             }} 
//             style={{ padding: "6px 12px", background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "600" }}
//           >
//             Yes, Delete
//           </button>
//         </div>
//       </div>
//     ), {
//       id: "delete-confirm-toast",
//       duration: Infinity,
//       position: "top-center",
//       style: { background: '#ffffff', padding: '16px', borderRadius: '10px', border: '1px solid #f1f5f9', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }
//     });
//   };

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentSales = filteredSales.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredSales.length / itemsPerPage);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div style={styles.container}>
//       <Header />
      
//       <main style={styles.mainContent}>
        
//         {/* METRICS DASHBOARD CARDS */}
//         <section style={styles.metricsGrid}>
//           <div style={{...styles.metricCard, borderLeft: '4px solid #3b82f6'}}>
//             <div style={styles.metricTitle}>Total Revenue</div>
//             <div style={{...styles.metricValue, color: '#1e3a8a'}}>₹ {metrics.totalRevenue.toLocaleString('en-IN')}</div>
//           </div>
//           <div style={{...styles.metricCard, borderLeft: '4px solid #10b981'}}>
//             <div style={styles.metricTitle}>Total Profit</div>
//             <div style={{...styles.metricValue, color: '#065f46'}}>₹ {metrics.totalProfit.toLocaleString('en-IN')}</div>
//           </div>
//           <div style={{...styles.metricCard, borderLeft: '4px solid #f59e0b'}}>
//             <div style={styles.metricTitle}>Items Sold</div>
//             <div style={{...styles.metricValue, color: '#b45309'}}>{metrics.totalSold} Units</div>
//           </div>
//         </section>

//         {/* TOP SECTION */}
//         <section style={styles.topCard}>
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
//             <h2 style={styles.sectionTitle}>Sales Management</h2>
//             <button onClick={() => setIsModalOpen(true)} style={styles.sellBtn}>➕ New Sale</button>
//           </div>

//           <div style={styles.filterWrapper}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//               <label style={styles.label}>From:</label>
//               <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={styles.dateInput} />
//             </div>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//               <label style={styles.label}>To:</label>
//               <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={styles.dateInput} />
//             </div>
//             {(startDate || endDate) && (
//               <button onClick={clearFilter} style={styles.clearBtn}>✕ Clear Filter</button>
//             )}
//           </div>
//         </section>

//         {/* TABLE SECTION */}
//         <section style={styles.tableSection}>
//           {loading ? <p style={{padding: '20px', textAlign: 'center', color: '#666'}}>Loading sales data...</p> : (
//             <>
//               <div style={styles.tableWrapper}>
//                 <table style={styles.table}>
//                   <thead>
//                     <tr>
//                       <th style={styles.th}>Date</th>
//                       <th style={styles.th}>Order ID</th> {/* ✅ Added Order ID */}
//                       <th style={styles.th}>Product Name</th>
//                       <th style={styles.th}>SKU</th>
//                       <th style={styles.th}>Qty</th>
//                       <th style={styles.th}>Sold Price</th>
//                       <th style={styles.th}>Total Amt</th>
//                       <th style={styles.th}>Profit</th>
//                       <th style={styles.th}>Source</th> {/* ✅ Added Source */}
//                       <th style={{...styles.th, textAlign: 'center'}}>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {currentSales.map((sale) => (
//                       <tr key={sale._id} style={styles.row}>
//                         <td style={styles.td}>{new Date(sale.createdAt).toLocaleDateString()}</td>
                        
//                         {/* ✅ Order ID Display */}
//                         <td style={{...styles.td, fontSize: '12px', color: '#64748b'}}>
//                           {sale.shopifyOrderId ? `#${sale.shopifyOrderId.slice(-6)}` : "Manual"}
//                         </td>
                        
//                         <td style={styles.td}><b>{sale.productName}</b></td>
//                         <td style={styles.td}>{sale.sku}</td>
//                         <td style={{...styles.td, color: '#2563eb', fontWeight: 'bold'}}>{sale.quantity}</td>
//                         <td style={styles.td}>₹{sale.sellingPrice}</td>
//                         <td style={styles.td}>₹{sale.totalAmount}</td>
//                         <td style={{...styles.td, color: sale.profit >= 0 ? '#16a34a' : '#dc2626', fontWeight: 'bold'}}>
//                           ₹{sale.profit}
//                         </td>
                        
//                         {/* ✅ Source Badge Display */}
//                         <td style={styles.td}>
//                           {sale.shop && sale.shop.includes("shopify") ? (
//                             <span style={styles.shopifyBadge}>Shopify</span>
//                           ) : (
//                             <span style={styles.manualBadge}>Manual</span>
//                           )}
//                         </td>

//                         <td style={{...styles.td, textAlign: 'center'}}>
//                           <button onClick={() => handleDeleteSale(sale._id)} style={styles.deleteIconBtn} title="Delete Entry">
//                             🗑️
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                     {currentSales.length === 0 && (
//                       <tr><td colSpan="10" style={{textAlign: 'center', padding: '30px', color: '#94a3b8'}}>No sales found for selected dates.</td></tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>

//               {/* PAGINATION CONTROLS */}
//               {!loading && filteredSales.length > itemsPerPage && (
//                 <div style={styles.paginationWrapper}>
//                   <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} style={currentPage === 1 ? styles.disabledPageBtn : styles.pageBtn}>Previous</button>
//                   <span style={styles.pageInfo}>Page {currentPage} of {totalPages}</span>
//                   <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} style={currentPage === totalPages ? styles.disabledPageBtn : styles.pageBtn}>Next</button>
//                 </div>
//               )}
//             </>
//           )}
//         </section>
//       </main>

//       {/* NEW SALE MODAL - Same as before */}
//       {isModalOpen && (
//         <div style={styles.modalOverlay}>
//           <div style={styles.modalContent}>
//             <h3 style={{marginTop: 0, marginBottom: '20px', color: '#1e3a8a'}}>Enter New Sale</h3>
//             <form onSubmit={handleSellSubmit} style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
//               <div>
//                 <label style={styles.modalLabel}>Product SKU</label>
//                 <input type="text" required placeholder="e.g. car-red-123" value={sellForm.sku} onChange={(e) => setSellForm({...sellForm, sku: e.target.value})} style={styles.modalInput} />
//               </div>
//               <div>
//                 <label style={styles.modalLabel}>Quantity</label>
//                 <input type="number" required min="1" value={sellForm.qty} onChange={(e) => setSellForm({...sellForm, qty: Number(e.target.value)})} style={styles.modalInput} />
//               </div>
//               <div style={{display: 'flex', alignItems: 'center', gap: '8px', background: '#f8fafc', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0'}}>
//                 <input type="checkbox" checked={sellForm.useMRP} onChange={(e) => setSellForm({...sellForm, useMRP: e.target.checked, customPrice: ""})} id="mrpCheck" style={{cursor: 'pointer'}} />
//                 <label htmlFor="mrpCheck" style={{fontSize: '14px', cursor: 'pointer', fontWeight: 'bold', color: '#334155'}}>Sell at System MRP</label>
//               </div>
//               {!sellForm.useMRP && (
//                 <div>
//                   <label style={styles.modalLabel}>Custom Selling Price (₹)</label>
//                   <input type="number" required={!sellForm.useMRP} placeholder="Enter custom price per item" value={sellForm.customPrice} onChange={(e) => setSellForm({...sellForm, customPrice: e.target.value})} style={styles.modalInput} />
//                 </div>
//               )}
//               <div style={{display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px'}}>
//                 <button type="button" onClick={() => setIsModalOpen(false)} style={styles.cancelBtn}>Cancel</button>
//                 <button type="submit" style={styles.submitBtn}>Confirm Sale</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // STYLES
// const styles = {
//   container: { minHeight: "100vh", backgroundColor: "#f1f5f9", fontFamily: "'Inter', sans-serif" },
//   mainContent: { padding: "30px 20px", maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "20px" },
  
//   metricsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' },
//   metricCard: { backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '8px' },
//   metricTitle: { fontSize: '13px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' },
//   metricValue: { fontSize: '26px', fontWeight: '800' },

//   topCard: { backgroundColor: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0" },
//   sectionTitle: { margin: "0", fontSize: "20px", fontWeight: "700", color: "#334155" },
//   sellBtn: { backgroundColor: "#16a34a", color: "white", padding: "10px 18px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "bold", fontSize: "14px", boxShadow: "0 2px 4px rgba(22, 163, 74, 0.2)" },
  
//   filterWrapper: { display: "flex", gap: "20px", marginTop: "15px", flexWrap: "wrap", alignItems: "center", background: "#f8fafc", padding: "12px", borderRadius: "8px", border: "1px solid #e2e8f0" },
//   label: { fontSize: "13px", fontWeight: "600", color: "#475569" },
//   dateInput: { padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none", fontSize: '13px' },
//   clearBtn: { background: "#fee2e2", color: "#ef4444", border: "none", padding: "8px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "600" },
  
//   tableSection: { backgroundColor: "#fff", borderRadius: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0", overflow: "hidden" },
//   tableWrapper: { overflowX: "auto" },
//   table: { width: "100%", borderCollapse: "collapse", minWidth: "900px" },
//   th: { padding: "14px 15px", background: "#f8fafc", textAlign: "left", fontSize: "13px", color: "#64748b", textTransform: "uppercase", borderBottom: "1px solid #e2e8f0" },
//   td: { padding: "14px 15px", borderBottom: "1px solid #e2e8f0", fontSize: "14px", color: "#334155" },
//   row: { transition: "background 0.2s" },

//   deleteIconBtn: { background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '16px', padding: '5px', borderRadius: '4px', transition: 'background 0.2s' },

//   // ✅ Badges for Source Column
//   shopifyBadge: { background: '#dcfce7', color: '#16a34a', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' },
//   manualBadge: { background: '#e0e7ff', color: '#4f46e5', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' },

//   paginationWrapper: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', padding: '15px', background: '#fff', borderTop: '1px solid #e2e8f0' },
//   pageBtn: { background: '#2563eb', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', color: '#fff', fontSize: '13px', fontWeight: '600', transition: 'background 0.2s' },
//   disabledPageBtn: { background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '8px 16px', borderRadius: '6px', cursor: 'not-allowed', color: '#94a3b8', fontSize: '13px', fontWeight: '600' },
//   pageInfo: { fontSize: '13px', fontWeight: '600', color: '#475569' },

//   modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 },
//   modalContent: { backgroundColor: "#fff", padding: "25px", borderRadius: "12px", width: "100%", maxWidth: "400px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" },
//   modalLabel: { fontSize: "13px", fontWeight: "600", color: "#475569", marginBottom: "5px", display: "block" },
//   modalInput: { width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", outline: "none", boxSizing: "border-box" },
//   cancelBtn: { padding: "10px 18px", background: "#f1f5f9", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600", color: "#475569" },
//   submitBtn: { padding: "10px 18px", background: "#2563eb", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600", color: "#fff", boxShadow: "0 2px 4px rgba(37, 99, 235, 0.2)" }
// };































// import React, { useState, useEffect } from "react";
// import api from "../api/axios";
// import toast from "react-hot-toast";
// import Header from "../components/Header";

// export default function Sales() {
//   const [sales, setSales] = useState([]);
//   const [filteredSales, setFilteredSales] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Date Filter States
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   // Pagination States
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 20;

//   // Modals States
//   const [isNewSaleOpen, setIsNewSaleOpen] = useState(false);
//   const [selectedSale, setSelectedSale] = useState(null); // ✅ Naya state View Details ke liye
  
//   const [sellForm, setSellForm] = useState({
//     sku: "",
//     qty: 1,
//     useMRP: true,
//     customPrice: ""
//   });

//   // Metrics States
//   const [metrics, setMetrics] = useState({ totalRevenue: 0, totalProfit: 0, totalSold: 0 });

//   useEffect(() => {
//     fetchSales();
//   }, []);

//   // Filter Logic & Metrics Calculation
//   useEffect(() => {
//     let result = sales;
//     if (startDate) {
//       result = result.filter(s => new Date(s.createdAt) >= new Date(startDate));
//     }
//     if (endDate) {
//       const end = new Date(endDate);
//       end.setDate(end.getDate() + 1);
//       result = result.filter(s => new Date(s.createdAt) < end);
//     }
//     setFilteredSales(result);
//     setCurrentPage(1); 

//     let rev = 0, prof = 0, sold = 0;
//     result.forEach(item => {
//       rev += Number(item.totalAmount) || 0;
//       prof += Number(item.profit) || 0;
//       sold += Number(item.quantity) || 0;
//     });
//     setMetrics({ totalRevenue: rev, totalProfit: prof, totalSold: sold });
//   }, [sales, startDate, endDate]);

//   const fetchSales = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get("/sales"); 
//       setSales(res.data);
//     } catch (err) {
//       toast.error("Failed to fetch sales data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const clearFilter = () => {
//     setStartDate("");
//     setEndDate("");
//   };

//   // New Sale Submit Handle (Manual Entry)
//   const handleSellSubmit = async (e) => {
//     e.preventDefault();
//     if (!sellForm.sku) return toast.error("Please enter SKU");
//     if (sellForm.qty <= 0) return toast.error("Quantity must be greater than 0");
//     if (!sellForm.useMRP && !sellForm.customPrice) return toast.error("Please enter Custom Price");

//     try {
//       const payload = {
//         sku: sellForm.sku,
//         removeQty: sellForm.qty,
//         customSellingPrice: sellForm.useMRP ? null : Number(sellForm.customPrice),
//         shop: "Manual Entry" 
//       };

//       await api.post("/update-qty-sku", payload); 
      
//       toast.success("Sale entry added successfully!");
//       setIsNewSaleOpen(false);
//       setSellForm({ sku: "", qty: 1, useMRP: true, customPrice: "" });
//       fetchSales(); 
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to make a sale");
//     }
//   };

//   const executeDelete = async (id) => {
//     try {
//       await api.delete(`/sales/delete-sku/${id}`);
//       toast.success("Sale entry deleted successfully!");
//       fetchSales();
//     } catch (err) {
//       toast.error("Failed to delete sale entry");
//     }
//   };

//   const handleDeleteSale = (id) => {
//     toast((t) => (
//       <div style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "4px" }}>
//         <div style={{ fontWeight: "600", fontSize: "14px", color: "#334155", display: "flex", alignItems: "center", gap: "6px" }}>
//           <span style={{ fontSize: "16px" }}>⚠️</span> Delete Sale Entry?
//         </div>
//         <p style={{ margin: 0, fontSize: "12px", color: "#64748b", lineHeight: "1.4" }}>
//           Are you sure? This action cannot be undone and will permanently remove this record.
//         </p>
//         <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end", marginTop: "8px" }}>
//           <button onClick={() => toast.dismiss(t.id)} style={styles.cancelBtnSmall}>Cancel</button>
//           <button onClick={() => { toast.dismiss(t.id); executeDelete(id); }} style={styles.deleteConfirmBtn}>Yes, Delete</button>
//         </div>
//       </div>
//     ), { id: "delete-confirm-toast", duration: Infinity });
//   };

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentSales = filteredSales.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredSales.length / itemsPerPage);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div style={styles.container}>
//       <Header />
      
//       <main style={styles.mainContent}>
        
//         {/* METRICS DASHBOARD CARDS */}
//         <section style={styles.metricsGrid}>
//           <div style={{...styles.metricCard, borderLeft: '4px solid #3b82f6'}}>
//             <div style={styles.metricTitle}>Total Revenue</div>
//             <div style={{...styles.metricValue, color: '#1e3a8a'}}>₹ {metrics.totalRevenue.toLocaleString('en-IN')}</div>
//           </div>
//           <div style={{...styles.metricCard, borderLeft: '4px solid #10b981'}}>
//             <div style={styles.metricTitle}>Total Profit</div>
//             <div style={{...styles.metricValue, color: '#065f46'}}>₹ {metrics.totalProfit.toLocaleString('en-IN')}</div>
//           </div>
//           <div style={{...styles.metricCard, borderLeft: '4px solid #f59e0b'}}>
//             <div style={styles.metricTitle}>Items Sold</div>
//             <div style={{...styles.metricValue, color: '#b45309'}}>{metrics.totalSold} Units</div>
//           </div>
//         </section>

//         {/* TOP SECTION */}
//         <section style={styles.topCard}>
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
//             <h2 style={styles.sectionTitle}>Sales Management</h2>
//             <button onClick={() => setIsNewSaleOpen(true)} style={styles.sellBtn}>➕ New Sale</button>
//           </div>

//           <div style={styles.filterWrapper}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//               <label style={styles.label}>From:</label>
//               <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={styles.dateInput} />
//             </div>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//               <label style={styles.label}>To:</label>
//               <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={styles.dateInput} />
//             </div>
//             {(startDate || endDate) && (
//               <button onClick={clearFilter} style={styles.clearBtn}>✕ Clear Filter</button>
//             )}
//           </div>
//         </section>

//         {/* TABLE SECTION (Cleaned up, details moved to modal) */}
//         <section style={styles.tableSection}>
//           {loading ? <p style={{padding: '20px', textAlign: 'center', color: '#666'}}>Loading sales data...</p> : (
//             <>
//               <div style={styles.tableWrapper}>
//                 <table style={styles.table}>
//                   <thead>
//                     <tr>
//                       <th style={styles.th}>Date</th>
//                       <th style={styles.th}>Order No</th>
//                       <th style={styles.th}>Customer</th>
//                       <th style={styles.th}>Product / SKU</th>
//                       <th style={styles.th}>Qty</th>
//                       <th style={styles.th}>Amount</th>
//                       <th style={styles.th}>Source</th>
//                       <th style={{...styles.th, textAlign: 'center'}}>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {currentSales.map((sale) => (
//                       <tr key={sale._id} style={styles.row}>
//                         <td style={styles.td}>{new Date(sale.createdAt).toLocaleDateString()}</td>
//                         <td style={{...styles.td, fontWeight: 'bold', color: '#334155'}}>{sale.orderNumber || "Manual"}</td>
//                         <td style={styles.td}>{sale.customerName || "-"}</td>
//                         <td style={styles.td}>
//                           <div style={{fontWeight: 'bold'}}>{sale.productName}</div>
//                           <div style={{fontSize: '11px', color: '#64748b'}}>{sale.sku}</div>
//                         </td>
//                         <td style={{...styles.td, color: '#2563eb', fontWeight: 'bold'}}>{sale.quantity}</td>
//                         <td style={{...styles.td, fontWeight: 'bold', color: '#16a34a'}}>₹{sale.totalAmount}</td>
//                         <td style={styles.td}>
//                           {sale.shop && sale.shop.includes("shopify") ? (
//                             <span style={styles.shopifyBadge}>Shopify</span>
//                           ) : (
//                             <span style={styles.manualBadge}>Manual</span>
//                           )}
//                         </td>
//                         <td style={{...styles.td, textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '10px'}}>
//                           {/* ✅ View Button */}
//                           <button onClick={() => setSelectedSale(sale)} style={styles.viewIconBtn} title="View Details">👁️</button>
//                           {/* ✅ Delete Button */}
//                           <button onClick={() => handleDeleteSale(sale._id)} style={styles.deleteIconBtn} title="Delete Entry">🗑️</button>
//                         </td>
//                       </tr>
//                     ))}
//                     {currentSales.length === 0 && (
//                       <tr><td colSpan="8" style={{textAlign: 'center', padding: '30px', color: '#94a3b8'}}>No sales found for selected dates.</td></tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>

//               {/* PAGINATION */}
//               {!loading && filteredSales.length > itemsPerPage && (
//                 <div style={styles.paginationWrapper}>
//                   <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} style={currentPage === 1 ? styles.disabledPageBtn : styles.pageBtn}>Previous</button>
//                   <span style={styles.pageInfo}>Page {currentPage} of {totalPages}</span>
//                   <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} style={currentPage === totalPages ? styles.disabledPageBtn : styles.pageBtn}>Next</button>
//                 </div>
//               )}
//             </>
//           )}
//         </section>
//       </main>

//       {/* 🟢 VIEW DETAILS MODAL 🟢 */}
//       {selectedSale && (
//         <div style={styles.modalOverlay} onClick={() => setSelectedSale(null)}>
//           <div style={styles.largeModalContent} onClick={(e) => e.stopPropagation()}>
//             <div style={styles.modalHeader}>
//               <h2 style={{margin: 0, color: '#1e3a8a', fontSize: '20px'}}>Order Details {selectedSale.orderNumber && `(${selectedSale.orderNumber})`}</h2>
//               <button onClick={() => setSelectedSale(null)} style={styles.closeBtn}>✕</button>
//             </div>

//             <div style={styles.infoGrid}>
//               {/* BILLING ADDRESS */}
//               <div style={styles.detailBox}>
//                 <div style={styles.detailTitle}>Bill To</div>
//                 {selectedSale.billingAddress ? (
//                   <div style={styles.addressText}>
//                     <strong>{selectedSale.billingAddress.first_name} {selectedSale.billingAddress.last_name}</strong><br/>
//                     {selectedSale.billingAddress.address1} {selectedSale.billingAddress.address2}<br/>
//                     {selectedSale.billingAddress.city}, {selectedSale.billingAddress.province} - {selectedSale.billingAddress.zip}<br/>
//                     {selectedSale.billingAddress.country}
//                   </div>
//                 ) : <div style={styles.addressText}>N/A (Manual Entry)</div>}
//               </div>

//               {/* SHIPPING ADDRESS */}
//               <div style={styles.detailBox}>
//                 <div style={styles.detailTitle}>Ship To</div>
//                 {selectedSale.shippingAddress ? (
//                   <div style={styles.addressText}>
//                     <strong>{selectedSale.shippingAddress.first_name} {selectedSale.shippingAddress.last_name}</strong><br/>
//                     {selectedSale.shippingAddress.address1} {selectedSale.shippingAddress.address2}<br/>
//                     {selectedSale.shippingAddress.city}, {selectedSale.shippingAddress.province} - {selectedSale.shippingAddress.zip}<br/>
//                     {selectedSale.shippingAddress.country}
//                   </div>
//                 ) : <div style={styles.addressText}>N/A (Manual Entry)</div>}
//               </div>
//             </div>

//             {/* PRODUCT & FINANCE DETAILS */}
//             <div style={styles.detailBox}>
//               <div style={styles.detailTitle}>Item & Financials</div>
//               <table style={{width: '100%', borderCollapse: 'collapse', marginTop: '10px', fontSize: '13px'}}>
//                 <tbody>
//                   <tr style={{borderBottom: '1px solid #e2e8f0'}}>
//                     <td style={{padding: '8px 0', color: '#64748b'}}>Product</td>
//                     <td style={{padding: '8px 0', fontWeight: 'bold', textAlign: 'right'}}>{selectedSale.productName} ({selectedSale.sku})</td>
//                   </tr>
//                   <tr style={{borderBottom: '1px solid #e2e8f0'}}>
//                     <td style={{padding: '8px 0', color: '#64748b'}}>Quantity</td>
//                     <td style={{padding: '8px 0', fontWeight: 'bold', textAlign: 'right'}}>{selectedSale.quantity} {selectedSale.unit}</td>
//                   </tr>
//                   <tr style={{borderBottom: '1px solid #e2e8f0'}}>
//                     <td style={{padding: '8px 0', color: '#64748b'}}>Selling Price (Per Unit)</td>
//                     <td style={{padding: '8px 0', fontWeight: 'bold', textAlign: 'right'}}>₹{selectedSale.sellingPrice}</td>
//                   </tr>
//                   <tr style={{borderBottom: '1px solid #e2e8f0', background: '#f8fafc'}}>
//                     <td style={{padding: '8px 4px', color: '#64748b'}}>Total Amount (Inc. Tax)</td>
//                     <td style={{padding: '8px 4px', fontWeight: 'bold', color: '#16a34a', textAlign: 'right', fontSize: '15px'}}>₹{selectedSale.totalAmount}</td>
//                   </tr>
                  
//                   {/* TAXES (Sirf tabhi dikhao agar shopify se aaya ho) */}
//                   {selectedSale.shop && selectedSale.shop.includes("shopify") && (
//                     <>
//                       <tr><td colSpan="2" style={{padding: '10px 0 2px', fontSize: '11px', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase'}}>Tax Breakdown ({selectedSale.gstPercentage}%)</td></tr>
//                       <tr>
//                         <td style={{padding: '4px 0', color: '#64748b'}}>IGST</td>
//                         <td style={{padding: '4px 0', textAlign: 'right'}}>₹{selectedSale.igst || 0}</td>
//                       </tr>
//                       <tr>
//                         <td style={{padding: '4px 0', color: '#64748b'}}>CGST / SGST</td>
//                         <td style={{padding: '4px 0', textAlign: 'right'}}>₹{selectedSale.cgst || 0} / ₹{selectedSale.sgst || 0}</td>
//                       </tr>
//                     </>
//                   )}

//                   <tr><td colSpan="2" style={{padding: '10px 0 2px', fontSize: '11px', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase'}}>Business Metrics</td></tr>
//                   <tr style={{borderBottom: '1px solid #e2e8f0'}}>
//                     <td style={{padding: '8px 0', color: '#64748b'}}>Total Cost Price</td>
//                     <td style={{padding: '8px 0', fontWeight: 'bold', textAlign: 'right'}}>₹{selectedSale.costPrice}</td>
//                   </tr>
//                   <tr>
//                     <td style={{padding: '8px 0', color: '#64748b', fontWeight: 'bold'}}>Net Profit</td>
//                     <td style={{padding: '8px 0', fontWeight: 'bold', color: selectedSale.profit >= 0 ? '#16a34a' : '#dc2626', textAlign: 'right', fontSize: '15px'}}>₹{selectedSale.profit}</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
            
//           </div>
//         </div>
//       )}

//       {/* NEW SALE MODAL */}
//       {isNewSaleOpen && (
//         <div style={styles.modalOverlay}>
//           <div style={styles.modalContent}>
//             <h3 style={{marginTop: 0, marginBottom: '20px', color: '#1e3a8a'}}>Enter New Sale</h3>
//             <form onSubmit={handleSellSubmit} style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
//               <div>
//                 <label style={styles.modalLabel}>Product SKU</label>
//                 <input type="text" required value={sellForm.sku} onChange={(e) => setSellForm({...sellForm, sku: e.target.value})} style={styles.modalInput} />
//               </div>
//               <div>
//                 <label style={styles.modalLabel}>Quantity</label>
//                 <input type="number" required min="1" value={sellForm.qty} onChange={(e) => setSellForm({...sellForm, qty: Number(e.target.value)})} style={styles.modalInput} />
//               </div>
//               <div style={{display: 'flex', alignItems: 'center', gap: '8px', background: '#f8fafc', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0'}}>
//                 <input type="checkbox" checked={sellForm.useMRP} onChange={(e) => setSellForm({...sellForm, useMRP: e.target.checked, customPrice: ""})} id="mrpCheck" />
//                 <label htmlFor="mrpCheck" style={{fontSize: '14px', fontWeight: 'bold', color: '#334155'}}>Sell at System MRP</label>
//               </div>
//               {!sellForm.useMRP && (
//                 <div>
//                   <label style={styles.modalLabel}>Custom Selling Price (₹)</label>
//                   <input type="number" required={!sellForm.useMRP} value={sellForm.customPrice} onChange={(e) => setSellForm({...sellForm, customPrice: e.target.value})} style={styles.modalInput} />
//                 </div>
//               )}
//               <div style={{display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px'}}>
//                 <button type="button" onClick={() => setIsNewSaleOpen(false)} style={styles.cancelBtn}>Cancel</button>
//                 <button type="submit" style={styles.submitBtn}>Confirm Sale</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // STYLES
// const styles = {
//   container: { minHeight: "100vh", backgroundColor: "#f1f5f9", fontFamily: "'Inter', sans-serif" },
//   mainContent: { padding: "30px 20px", maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "20px" },
  
//   metricsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' },
//   metricCard: { backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '8px' },
//   metricTitle: { fontSize: '13px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' },
//   metricValue: { fontSize: '26px', fontWeight: '800' },

//   topCard: { backgroundColor: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0" },
//   sectionTitle: { margin: "0", fontSize: "20px", fontWeight: "700", color: "#334155" },
//   sellBtn: { backgroundColor: "#16a34a", color: "white", padding: "10px 18px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "bold", fontSize: "14px", boxShadow: "0 2px 4px rgba(22, 163, 74, 0.2)" },
  
//   filterWrapper: { display: "flex", gap: "20px", marginTop: "15px", flexWrap: "wrap", alignItems: "center", background: "#f8fafc", padding: "12px", borderRadius: "8px", border: "1px solid #e2e8f0" },
//   label: { fontSize: "13px", fontWeight: "600", color: "#475569" },
//   dateInput: { padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none", fontSize: '13px' },
//   clearBtn: { background: "#fee2e2", color: "#ef4444", border: "none", padding: "8px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "600" },
  
//   tableSection: { backgroundColor: "#fff", borderRadius: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0", overflow: "hidden" },
//   tableWrapper: { overflowX: "auto" },
//   table: { width: "100%", borderCollapse: "collapse", minWidth: "900px" }, // Table ab zyada chaudi nahi hogi kyuki extra data modal me hai
//   th: { padding: "14px 15px", background: "#f8fafc", textAlign: "left", fontSize: "13px", color: "#64748b", textTransform: "uppercase", borderBottom: "1px solid #e2e8f0", whiteSpace: "nowrap" },
//   td: { padding: "14px 15px", borderBottom: "1px solid #e2e8f0", fontSize: "14px", color: "#334155", whiteSpace: "nowrap" },
//   row: { transition: "background 0.2s" },

//   viewIconBtn: { background: '#eff6ff', border: '1px solid #bfdbfe', color: '#2563eb', cursor: 'pointer', fontSize: '14px', padding: '6px 10px', borderRadius: '6px', transition: 'background 0.2s' },
//   deleteIconBtn: { background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', cursor: 'pointer', fontSize: '14px', padding: '6px 10px', borderRadius: '6px', transition: 'background 0.2s' },

//   shopifyBadge: { background: '#dcfce7', color: '#16a34a', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' },
//   manualBadge: { background: '#e0e7ff', color: '#4f46e5', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' },

//   cancelBtnSmall: { padding: "6px 12px", background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "600", color: "#64748b" },
//   deleteConfirmBtn: { padding: "6px 12px", background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "600" },

//   paginationWrapper: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', padding: '15px', background: '#fff', borderTop: '1px solid #e2e8f0' },
//   pageBtn: { background: '#2563eb', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', color: '#fff', fontSize: '13px', fontWeight: '600' },
//   disabledPageBtn: { background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '8px 16px', borderRadius: '6px', cursor: 'not-allowed', color: '#94a3b8', fontSize: '13px', fontWeight: '600' },
//   pageInfo: { fontSize: '13px', fontWeight: '600', color: '#475569' },

//   // MODALS
//   modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.6)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, backdropFilter: 'blur(3px)' },
//   modalContent: { backgroundColor: "#fff", padding: "25px", borderRadius: "12px", width: "100%", maxWidth: "400px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" },
  
//   // 🟢 NEW: View Details Modal Styles 🟢
//   largeModalContent: { backgroundColor: "#fff", padding: "25px", borderRadius: "12px", width: "90%", maxWidth: "600px", boxShadow: "0 10px 25px rgba(0,0,0,0.2)", maxHeight: "90vh", overflowY: "auto" },
//   modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '15px', marginBottom: '20px' },
//   closeBtn: { background: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#64748b' },
//   infoGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' },
//   detailBox: { background: '#f8fafc', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '15px' },
//   detailTitle: { fontSize: '12px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.5px' },
//   addressText: { fontSize: '13px', color: '#334155', lineHeight: '1.6' },

//   modalLabel: { fontSize: "13px", fontWeight: "600", color: "#475569", marginBottom: "5px", display: "block" },
//   modalInput: { width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", outline: "none", boxSizing: "border-box" },
//   cancelBtn: { padding: "10px 18px", background: "#f1f5f9", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600", color: "#475569" },
//   submitBtn: { padding: "10px 18px", background: "#2563eb", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600", color: "#fff" }
// };

































// // import React, { useState, useEffect } from "react";
// // import api from "../api/axios";
// // import toast from "react-hot-toast";
// // import Header from "../components/Header";

// // export default function Sales() {
// //   const [sales, setSales] = useState([]);
// //   const [filteredSales, setFilteredSales] = useState([]);
// //   const [loading, setLoading] = useState(false);

// //   // Date Filter States
// //   const [startDate, setStartDate] = useState("");
// //   const [endDate, setEndDate] = useState("");

// //   // Pagination States
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const itemsPerPage = 20;

// //   // Modals States
// //   const [isNewSaleOpen, setIsNewSaleOpen] = useState(false);
// //   const [selectedSale, setSelectedSale] = useState(null); 
  
// //   const [sellForm, setSellForm] = useState({
// //     sku: "",
// //     qty: 1,
// //     useMRP: true,
// //     customPrice: ""
// //   });

// //   // Metrics States
// //   const [metrics, setMetrics] = useState({ totalRevenue: 0, totalProfit: 0, totalSold: 0 });

// //   useEffect(() => {
// //     fetchSales();
// //   }, []);

// //   // Filter Logic & Metrics Calculation
// //   useEffect(() => {
// //     let result = sales;
// //     if (startDate) {
// //       result = result.filter(s => new Date(s.createdAt) >= new Date(startDate));
// //     }
// //     if (endDate) {
// //       const end = new Date(endDate);
// //       end.setDate(end.getDate() + 1);
// //       result = result.filter(s => new Date(s.createdAt) < end);
// //     }
// //     setFilteredSales(result);
// //     setCurrentPage(1); 

// //     let rev = 0, prof = 0, sold = 0;
// //     result.forEach(item => {
// //       rev += Number(item.totalAmount) || 0;
// //       prof += Number(item.profit) || 0;
// //       sold += Number(item.quantity) || 0;
// //     });
// //     setMetrics({ totalRevenue: rev, totalProfit: prof, totalSold: sold });
// //   }, [sales, startDate, endDate]);

// //   const fetchSales = async () => {
// //     setLoading(true);
// //     try {
// //       const res = await api.get("/sales"); 
// //       setSales(res.data);
// //     } catch (err) {
// //       toast.error("Failed to fetch sales data");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const clearFilter = () => {
// //     setStartDate("");
// //     setEndDate("");
// //   };

// //   const handleSellSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!sellForm.sku) return toast.error("Please enter SKU");
// //     if (sellForm.qty <= 0) return toast.error("Quantity must be greater than 0");
// //     if (!sellForm.useMRP && !sellForm.customPrice) return toast.error("Please enter Custom Price");

// //     try {
// //       const payload = {
// //         sku: sellForm.sku,
// //         removeQty: sellForm.qty,
// //         customSellingPrice: sellForm.useMRP ? null : Number(sellForm.customPrice),
// //         shop: "Manual Entry" 
// //       };

// //       await api.post("/update-qty-sku", payload); 
      
// //       toast.success("Sale entry added successfully!");
// //       setIsNewSaleOpen(false);
// //       setSellForm({ sku: "", qty: 1, useMRP: true, customPrice: "" });
// //       fetchSales(); 
// //     } catch (err) {
// //       toast.error(err.response?.data?.message || "Failed to make a sale");
// //     }
// //   };

// //   const executeDelete = async (id) => {
// //     try {
// //       await api.delete(`/sales/delete-sku/${id}`);
// //       toast.success("Sale entry deleted successfully!");
// //       fetchSales();
// //     } catch (err) {
// //       toast.error("Failed to delete sale entry");
// //     }
// //   };

// //   const handleDeleteSale = (id) => {
// //     toast((t) => (
// //       <div style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "4px" }}>
// //         <div style={{ fontWeight: "600", fontSize: "14px", color: "#334155", display: "flex", alignItems: "center", gap: "6px" }}>
// //           <span style={{ fontSize: "16px" }}>⚠️</span> Delete Sale Entry?
// //         </div>
// //         <p style={{ margin: 0, fontSize: "12px", color: "#64748b", lineHeight: "1.4" }}>
// //           Are you sure? This action cannot be undone and will permanently remove this record.
// //         </p>
// //         <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end", marginTop: "8px" }}>
// //           <button onClick={() => toast.dismiss(t.id)} style={styles.cancelBtnSmall}>Cancel</button>
// //           <button onClick={() => { toast.dismiss(t.id); executeDelete(id); }} style={styles.deleteConfirmBtn}>Yes, Delete</button>
// //         </div>
// //       </div>
// //     ), { id: "delete-confirm-toast", duration: Infinity });
// //   };

// //   const indexOfLastItem = currentPage * itemsPerPage;
// //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// //   const currentSales = filteredSales.slice(indexOfFirstItem, indexOfLastItem);
// //   const totalPages = Math.ceil(filteredSales.length / itemsPerPage);

// //   const paginate = (pageNumber) => setCurrentPage(pageNumber);

// //   return (
// //     <div style={styles.container}>
// //       <Header />
      
// //       <main style={styles.mainContent}>
        
// //         {/* METRICS DASHBOARD CARDS */}
// //         <section style={styles.metricsGrid}>
// //           <div style={{...styles.metricCard, borderLeft: '4px solid #3b82f6'}}>
// //             <div style={styles.metricTitle}>Total Revenue</div>
// //             <div style={{...styles.metricValue, color: '#1e3a8a'}}>₹ {metrics.totalRevenue.toLocaleString('en-IN')}</div>
// //           </div>
// //           <div style={{...styles.metricCard, borderLeft: '4px solid #10b981'}}>
// //             <div style={styles.metricTitle}>Total Profit</div>
// //             <div style={{...styles.metricValue, color: '#065f46'}}>₹ {metrics.totalProfit.toLocaleString('en-IN')}</div>
// //           </div>
// //           <div style={{...styles.metricCard, borderLeft: '4px solid #f59e0b'}}>
// //             <div style={styles.metricTitle}>Items Sold</div>
// //             <div style={{...styles.metricValue, color: '#b45309'}}>{metrics.totalSold} Units</div>
// //           </div>
// //         </section>

// //         {/* TOP SECTION */}
// //         <section style={styles.topCard}>
// //           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
// //             <h2 style={styles.sectionTitle}>Sales Management</h2>
// //             <button onClick={() => setIsNewSaleOpen(true)} style={styles.sellBtn}>➕ New Sale</button>
// //           </div>

// //           <div style={styles.filterWrapper}>
// //             <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
// //               <label style={styles.label}>From:</label>
// //               <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={styles.dateInput} />
// //             </div>
// //             <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
// //               <label style={styles.label}>To:</label>
// //               <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={styles.dateInput} />
// //             </div>
// //             {(startDate || endDate) && (
// //               <button onClick={clearFilter} style={styles.clearBtn}>✕ Clear Filter</button>
// //             )}
// //           </div>
// //         </section>

// //         {/* TABLE SECTION */}
// //         <section style={styles.tableSection}>
// //           {loading ? <p style={{padding: '20px', textAlign: 'center', color: '#666'}}>Loading sales data...</p> : (
// //             <>
// //               <div style={styles.tableWrapper}>
// //                 <table style={styles.table}>
// //                   <thead>
// //                     <tr>
// //                       <th style={styles.th}>Date</th>
// //                       <th style={styles.th}>Order No</th>
// //                       <th style={styles.th}>Customer</th>
// //                       <th style={styles.th}>Product / SKU</th>
// //                       <th style={styles.th}>Qty</th>
// //                       <th style={styles.th}>Amount</th>
// //                       <th style={styles.th}>Source</th>
// //                       <th style={{...styles.th, textAlign: 'center'}}>Action</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {currentSales.map((sale) => (
// //                       <tr key={sale._id} style={styles.row}>
// //                         <td style={styles.td}>{new Date(sale.createdAt).toLocaleDateString()}</td>
// //                         <td style={{...styles.td, fontWeight: 'bold', color: '#334155'}}>{sale.orderNumber || "Manual"}</td>
// //                         <td style={styles.td}>{sale.customerName || "-"}</td>
// //                         <td style={styles.td}>
// //                           <div style={{fontWeight: 'bold'}}>{sale.productName}</div>
// //                           <div style={{fontSize: '11px', color: '#64748b'}}>{sale.sku}</div>
// //                         </td>
// //                         <td style={{...styles.td, color: '#2563eb', fontWeight: 'bold'}}>{sale.quantity}</td>
// //                         <td style={{...styles.td, fontWeight: 'bold', color: '#16a34a'}}>₹{sale.totalAmount}</td>
// //                         <td style={styles.td}>
// //                           {sale.shop && sale.shop.includes("shopify") ? (
// //                             <span style={styles.shopifyBadge}>Shopify</span>
// //                           ) : (
// //                             <span style={styles.manualBadge}>Manual</span>
// //                           )}
// //                         </td>
// //                         <td style={{...styles.td, textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '10px'}}>
// //                           <button onClick={() => setSelectedSale(sale)} style={styles.viewIconBtn} title="View Details">👁️</button>
// //                           <button onClick={() => handleDeleteSale(sale._id)} style={styles.deleteIconBtn} title="Delete Entry">🗑️</button>
// //                         </td>
// //                       </tr>
// //                     ))}
// //                     {currentSales.length === 0 && (
// //                       <tr><td colSpan="8" style={{textAlign: 'center', padding: '30px', color: '#94a3b8'}}>No sales found for selected dates.</td></tr>
// //                     )}
// //                   </tbody>
// //                 </table>
// //               </div>

// //               {/* PAGINATION */}
// //               {!loading && filteredSales.length > itemsPerPage && (
// //                 <div style={styles.paginationWrapper}>
// //                   <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} style={currentPage === 1 ? styles.disabledPageBtn : styles.pageBtn}>Previous</button>
// //                   <span style={styles.pageInfo}>Page {currentPage} of {totalPages}</span>
// //                   <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} style={currentPage === totalPages ? styles.disabledPageBtn : styles.pageBtn}>Next</button>
// //                 </div>
// //               )}
// //             </>
// //           )}
// //         </section>
// //       </main>

// //       {/* 🟢 VIEW DETAILS MODAL 🟢 */}
// //       {selectedSale && (
// //         <div style={styles.modalOverlay} onClick={() => setSelectedSale(null)}>
// //           <div style={styles.largeModalContent} onClick={(e) => e.stopPropagation()}>
// //             <div style={styles.modalHeader}>
// //               <h2 style={{margin: 0, color: '#1e3a8a', fontSize: '20px'}}>Order Details {selectedSale.orderNumber && `(${selectedSale.orderNumber})`}</h2>
// //               <button onClick={() => setSelectedSale(null)} style={styles.closeBtn}>✕</button>
// //             </div>

// //             <div style={styles.infoGrid}>
// //               <div style={styles.detailBox}>
// //                 <div style={styles.detailTitle}>Bill To</div>
// //                 {selectedSale.billingAddress ? (
// //                   <div style={styles.addressText}>
// //                     <strong>{selectedSale.billingAddress.first_name} {selectedSale.billingAddress.last_name}</strong><br/>
// //                     {selectedSale.billingAddress.address1} {selectedSale.billingAddress.address2}<br/>
// //                     {selectedSale.billingAddress.city}, {selectedSale.billingAddress.province} - {selectedSale.billingAddress.zip}<br/>
// //                     {selectedSale.billingAddress.country}
// //                   </div>
// //                 ) : <div style={styles.addressText}>N/A (Manual Entry)</div>}
// //               </div>

// //               <div style={styles.detailBox}>
// //                 <div style={styles.detailTitle}>Ship To</div>
// //                 {selectedSale.shippingAddress ? (
// //                   <div style={styles.addressText}>
// //                     <strong>{selectedSale.shippingAddress.first_name} {selectedSale.shippingAddress.last_name}</strong><br/>
// //                     {selectedSale.shippingAddress.address1} {selectedSale.shippingAddress.address2}<br/>
// //                     {selectedSale.shippingAddress.city}, {selectedSale.shippingAddress.province} - {selectedSale.shippingAddress.zip}<br/>
// //                     {selectedSale.shippingAddress.country}
// //                   </div>
// //                 ) : <div style={styles.addressText}>N/A (Manual Entry)</div>}
// //               </div>
// //             </div>

// //             <div style={styles.detailBox}>
// //               <div style={styles.detailTitle}>Item & Financials</div>
// //               <table style={{width: '100%', borderCollapse: 'collapse', marginTop: '10px', fontSize: '13px'}}>
// //                 <tbody>
// //                   <tr style={{borderBottom: '1px solid #e2e8f0'}}>
// //                     <td style={{padding: '8px 0', color: '#64748b'}}>Product</td>
// //                     <td style={{padding: '8px 0', fontWeight: 'bold', textAlign: 'right'}}>{selectedSale.productName} ({selectedSale.sku})</td>
// //                   </tr>
// //                   <tr style={{borderBottom: '1px solid #e2e8f0'}}>
// //                     <td style={{padding: '8px 0', color: '#64748b'}}>Quantity</td>
// //                     <td style={{padding: '8px 0', fontWeight: 'bold', textAlign: 'right'}}>{selectedSale.quantity} {selectedSale.unit}</td>
// //                   </tr>
                  
// //                   {/* ✅ MRP AUR DISCOUNT SECTION */}
// //                   <tr style={{borderBottom: '1px dotted #cbd5e1'}}>
// //                     <td style={{padding: '8px 0', color: "e2e8f0"}}>MRP (Original Price)</td>
// //                     <td style={{padding: '8px 0', color: "e2e8f0", textAlign: 'right'}}>
// //                       ₹{selectedSale.mrp || selectedSale.sellingPrice}
// //                     </td>
// //                   </tr>
// //                   {selectedSale.discountPercentage > 0 && (
// //                     <tr style={{borderBottom: '1px solid #e2e8f0'}}>
// //                       <td style={{padding: '8px 0', color: '#ea580c', fontWeight: 'bold'}}>Discount Given</td>
// //                       <td style={{padding: '8px 0', color: '#ea580c', fontWeight: 'bold', textAlign: 'right'}}>
// //                         {selectedSale.discountPercentage}% OFF
// //                       </td>
// //                     </tr>
// //                   )}
                  
// //                   <tr style={{borderBottom: '1px solid #e2e8f0'}}>
// //                     <td style={{padding: '8px 0', color: '#64748b'}}>Selling Price (Per Unit)</td>
// //                     <td style={{padding: '8px 0', fontWeight: 'bold', textAlign: 'right'}}>₹{selectedSale.sellingPrice}</td>
// //                   </tr>
// //                   <tr style={{borderBottom: '1px solid #e2e8f0', background: '#f8fafc'}}>
// //                     <td style={{padding: '8px 4px', color: '#64748b'}}>Total Amount (Inc. Tax)</td>
// //                     <td style={{padding: '8px 4px', fontWeight: 'bold', color: '#16a34a', textAlign: 'right', fontSize: '15px'}}>₹{selectedSale.totalAmount}</td>
// //                   </tr>
                  
// //                   {/* {selectedSale.shop && selectedSale.shop.includes("shopify") && (
// //                     <>
// //                       <tr><td colSpan="2" style={{padding: '10px 0 2px', fontSize: '11px', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase'}}>Tax Breakdown ({selectedSale.gstPercentage}%)</td></tr>
// //                       <tr>
// //                         <td style={{padding: '4px 0', color: '#64748b'}}>IGST</td>
// //                         <td style={{padding: '4px 0', textAlign: 'right'}}>₹{selectedSale.igst || 0}</td>
// //                       </tr>
// //                       <tr>
// //                         <td style={{padding: '4px 0', color: '#64748b'}}>CGST / SGST</td>
// //                         <td style={{padding: '4px 0', textAlign: 'right'}}>₹{selectedSale.cgst || 0} / ₹{selectedSale.sgst || 0}</td>
// //                       </tr>
// //                     </>
// //                   )} */}

// //                   <tr><td colSpan="2" style={{padding: '10px 0 2px', fontSize: '11px', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase'}}>Business Metrics</td></tr>
// //                   <tr style={{borderBottom: '1px solid #e2e8f0'}}>
// //                     <td style={{padding: '8px 0', color: '#64748b'}}>Total Cost Price</td>
// //                     <td style={{padding: '8px 0', fontWeight: 'bold', textAlign: 'right'}}>₹{selectedSale.costPrice}</td>
// //                   </tr>
// //                   <tr>
// //                     <td style={{padding: '8px 0', color: '#64748b', fontWeight: 'bold'}}>Net Profit</td>
// //                     <td style={{padding: '8px 0', fontWeight: 'bold', color: selectedSale.profit >= 0 ? '#16a34a' : '#dc2626', textAlign: 'right', fontSize: '15px'}}>₹{selectedSale.profit}</td>
// //                   </tr>
// //                 </tbody>
// //               </table>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* NEW SALE MODAL - Code as before */}
// //       {isNewSaleOpen && (
// //         <div style={styles.modalOverlay}>
// //           <div style={styles.modalContent}>
// //             <h3 style={{marginTop: 0, marginBottom: '20px', color: '#1e3a8a'}}>Enter New Sale</h3>
// //             <form onSubmit={handleSellSubmit} style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
// //               <div>
// //                 <label style={styles.modalLabel}>Product SKU</label>
// //                 <input type="text" required value={sellForm.sku} onChange={(e) => setSellForm({...sellForm, sku: e.target.value})} style={styles.modalInput} />
// //               </div>
// //               <div>
// //                 <label style={styles.modalLabel}>Quantity</label>
// //                 <input type="number" required min="1" value={sellForm.qty} onChange={(e) => setSellForm({...sellForm, qty: Number(e.target.value)})} style={styles.modalInput} />
// //               </div>
// //               <div style={{display: 'flex', alignItems: 'center', gap: '8px', background: '#f8fafc', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0'}}>
// //                 <input type="checkbox" checked={sellForm.useMRP} onChange={(e) => setSellForm({...sellForm, useMRP: e.target.checked, customPrice: ""})} id="mrpCheck" />
// //                 <label htmlFor="mrpCheck" style={{fontSize: '14px', fontWeight: 'bold', color: '#334155'}}>Sell at System MRP</label>
// //               </div>
// //               {!sellForm.useMRP && (
// //                 <div>
// //                   <label style={styles.modalLabel}>Custom Selling Price (₹)</label>
// //                   <input type="number" required={!sellForm.useMRP} value={sellForm.customPrice} onChange={(e) => setSellForm({...sellForm, customPrice: e.target.value})} style={styles.modalInput} />
// //                 </div>
// //               )}
// //               <div style={{display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px'}}>
// //                 <button type="button" onClick={() => setIsNewSaleOpen(false)} style={styles.cancelBtn}>Cancel</button>
// //                 <button type="submit" style={styles.submitBtn}>Confirm Sale</button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // // STYLES
// // const styles = {
// //   container: { minHeight: "100vh", backgroundColor: "#f1f5f9", fontFamily: "'Inter', sans-serif" },
// //   mainContent: { padding: "30px 20px", maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "20px" },
// //   metricsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' },
// //   metricCard: { backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '8px' },
// //   metricTitle: { fontSize: '13px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' },
// //   metricValue: { fontSize: '26px', fontWeight: '800' },
// //   topCard: { backgroundColor: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0" },
// //   sectionTitle: { margin: "0", fontSize: "20px", fontWeight: "700", color: "#334155" },
// //   sellBtn: { backgroundColor: "#16a34a", color: "white", padding: "10px 18px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "bold", fontSize: "14px", boxShadow: "0 2px 4px rgba(22, 163, 74, 0.2)" },
// //   filterWrapper: { display: "flex", gap: "20px", marginTop: "15px", flexWrap: "wrap", alignItems: "center", background: "#f8fafc", padding: "12px", borderRadius: "8px", border: "1px solid #e2e8f0" },
// //   label: { fontSize: "13px", fontWeight: "600", color: "#475569" },
// //   dateInput: { padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none", fontSize: '13px' },
// //   clearBtn: { background: "#fee2e2", color: "#ef4444", border: "none", padding: "8px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "600" },
// //   tableSection: { backgroundColor: "#fff", borderRadius: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0", overflow: "hidden" },
// //   tableWrapper: { overflowX: "auto" },
// //   table: { width: "100%", borderCollapse: "collapse", minWidth: "900px" }, 
// //   th: { padding: "14px 15px", background: "#f8fafc", textAlign: "left", fontSize: "13px", color: "#64748b", textTransform: "uppercase", borderBottom: "1px solid #e2e8f0", whiteSpace: "nowrap" },
// //   td: { padding: "14px 15px", borderBottom: "1px solid #e2e8f0", fontSize: "14px", color: "#334155", whiteSpace: "nowrap" },
// //   row: { transition: "background 0.2s" },
// //   viewIconBtn: { background: '#eff6ff', border: '1px solid #bfdbfe', color: '#2563eb', cursor: 'pointer', fontSize: '14px', padding: '6px 10px', borderRadius: '6px', transition: 'background 0.2s' },
// //   deleteIconBtn: { background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', cursor: 'pointer', fontSize: '14px', padding: '6px 10px', borderRadius: '6px', transition: 'background 0.2s' },
// //   shopifyBadge: { background: '#dcfce7', color: '#16a34a', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' },
// //   manualBadge: { background: '#e0e7ff', color: '#4f46e5', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' },
// //   cancelBtnSmall: { padding: "6px 12px", background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "600", color: "#64748b" },
// //   deleteConfirmBtn: { padding: "6px 12px", background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "600" },
// //   paginationWrapper: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', padding: '15px', background: '#fff', borderTop: '1px solid #e2e8f0' },
// //   pageBtn: { background: '#2563eb', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', color: '#fff', fontSize: '13px', fontWeight: '600' },
// //   disabledPageBtn: { background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '8px 16px', borderRadius: '6px', cursor: 'not-allowed', color: '#94a3b8', fontSize: '13px', fontWeight: '600' },
// //   pageInfo: { fontSize: '13px', fontWeight: '600', color: '#475569' },
// //   modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.6)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, backdropFilter: 'blur(3px)' },
// //   modalContent: { backgroundColor: "#fff", padding: "25px", borderRadius: "12px", width: "100%", maxWidth: "400px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" },
// //   largeModalContent: { backgroundColor: "#fff", padding: "25px", borderRadius: "12px", width: "90%", maxWidth: "600px", boxShadow: "0 10px 25px rgba(0,0,0,0.2)", maxHeight: "90vh", overflowY: "auto" },
// //   modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '15px', marginBottom: '20px' },
// //   closeBtn: { background: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#64748b' },
// //   infoGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' },
// //   detailBox: { background: '#f8fafc', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '15px' },
// //   detailTitle: { fontSize: '12px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.5px' },
// //   addressText: { fontSize: '13px', color: '#334155', lineHeight: '1.6' },
// //   modalLabel: { fontSize: "13px", fontWeight: "600", color: "#475569", marginBottom: "5px", display: "block" },
// //   modalInput: { width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", outline: "none", boxSizing: "border-box" },
// //   cancelBtn: { padding: "10px 18px", background: "#f1f5f9", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600", color: "#475569" },
// //   submitBtn: { padding: "10px 18px", background: "#2563eb", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600", color: "#fff" }
// // };






























// import React, { useState, useEffect } from "react";
// import api from "../api/axios";
// import toast from "react-hot-toast";
// import Header from "../components/Header";

// export default function Sales() {
//   const [sales, setSales] = useState([]);
//   const [filteredSales, setFilteredSales] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Date Filter States
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   // Pagination States
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 20;

//   // Modals States
//   const [isNewSaleOpen, setIsNewSaleOpen] = useState(false);
//   const [selectedSale, setSelectedSale] = useState(null); 
  
//   // 🔥 EXPANDED MANUAL ENTRY FORM STATE 🔥
//   const [sellForm, setSellForm] = useState({
//     sku: "",
//     qty: 1,
//     useMRP: true,
//     customPrice: "",
//     orderNumber: "",
//     paymentMethod: "Cash",
//     customerName: "",
//     sameAsBilling: true, // Checkbox state
//     billingAddress: { first_name: "", last_name: "", address1: "", city: "", province: "", zip: "", country: "India" },
//     shippingAddress: { first_name: "", last_name: "", address1: "", city: "", province: "", zip: "", country: "India" }
//   });

//   const [metrics, setMetrics] = useState({ totalRevenue: 0, totalProfit: 0, totalSold: 0 });

//   useEffect(() => { fetchSales(); }, []);

//   useEffect(() => {
//     let result = sales;
//     if (startDate) result = result.filter(s => new Date(s.createdAt) >= new Date(startDate));
//     if (endDate) {
//       const end = new Date(endDate);
//       end.setDate(end.getDate() + 1);
//       result = result.filter(s => new Date(s.createdAt) < end);
//     }
//     setFilteredSales(result);
//     setCurrentPage(1); 

//     let rev = 0, prof = 0, sold = 0;
//     result.forEach(item => {
//       rev += Number(item.totalAmount) || 0;
//       prof += Number(item.profit) || 0;
//       sold += Number(item.quantity) || 0;
//     });
//     setMetrics({ totalRevenue: rev, totalProfit: prof, totalSold: sold });
//   }, [sales, startDate, endDate]);

//   const fetchSales = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get("/sales"); 
//       setSales(res.data);
//     } catch (err) {
//       toast.error("Failed to fetch sales data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const clearFilter = () => { setStartDate(""); setEndDate(""); };

//   // Handle Input Change for Addresses
//   const handleAddressChange = (type, field, value) => {
//     setSellForm(prev => ({
//       ...prev,
//       [type]: { ...prev[type], [field]: value }
//     }));
//   };

//   // 🔥 UPDATED SUBMIT LOGIC 🔥
//   const handleSellSubmit = async (e) => {
//     e.preventDefault();
//     if (!sellForm.sku) return toast.error("Please enter SKU");
//     if (sellForm.qty <= 0) return toast.error("Quantity must be greater than 0");
//     if (!sellForm.useMRP && !sellForm.customPrice) return toast.error("Please enter Custom Price");

//     try {
//       // Split names for the address objects
//       const names = sellForm.customerName.split(" ");
//       const fName = names[0] || "";
//       const lName = names.slice(1).join(" ") || "";

//       // Ensure first_name/last_name are set in addresses
//       const finalBilling = { ...sellForm.billingAddress, first_name: fName, last_name: lName };
//       const finalShipping = sellForm.sameAsBilling ? finalBilling : { ...sellForm.shippingAddress, first_name: fName, last_name: lName };

//       const payload = {
//         sku: sellForm.sku,
//         removeQty: sellForm.qty,
//         customSellingPrice: sellForm.useMRP ? null : Number(sellForm.customPrice),
//         shop: "Manual Entry",
//         orderNumber: sellForm.orderNumber || `MANUAL-${Date.now().toString().slice(-5)}`,
//         paymentMethod: sellForm.paymentMethod,
//         customerName: sellForm.customerName,
//         billingAddress: finalBilling,
//         shippingAddress: finalShipping
//       };

//       await api.post("/sales/update-qty-sku", payload); 
      
//       toast.success("Manual sale added successfully!");
//       setIsNewSaleOpen(false);
      
//       // Reset Form
//       setSellForm({
//         sku: "", qty: 1, useMRP: true, customPrice: "", orderNumber: "", paymentMethod: "Cash", customerName: "", sameAsBilling: true,
//         billingAddress: { first_name: "", last_name: "", address1: "", city: "", province: "", zip: "", country: "India" },
//         shippingAddress: { first_name: "", last_name: "", address1: "", city: "", province: "", zip: "", country: "India" }
//       });
//       fetchSales(); 
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to make a sale");
//     }
//   };

//   const executeDelete = async (id) => {
//     try {
//       await api.delete(`/sales/delete-sku/${id}`);
//       toast.success("Sale entry deleted successfully!");
//       fetchSales();
//     } catch (err) { toast.error("Failed to delete sale entry"); }
//   };

//   const handleDeleteSale = (id) => {
//     toast((t) => (
//       <div style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "4px" }}>
//         <div style={{ fontWeight: "600", fontSize: "14px", color: "#334155" }}>⚠️ Delete Sale Entry?</div>
//         <p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>This action cannot be undone.</p>
//         <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
//           <button onClick={() => toast.dismiss(t.id)} style={styles.cancelBtnSmall}>Cancel</button>
//           <button onClick={() => { toast.dismiss(t.id); executeDelete(id); }} style={styles.deleteConfirmBtn}>Yes, Delete</button>
//         </div>
//       </div>
//     ), { id: "delete-confirm-toast", duration: Infinity });
//   };

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentSales = filteredSales.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredSales.length / itemsPerPage);

//   return (
//     <div style={styles.container}>
//       <Header />
//       <main style={styles.mainContent}>
        
//         {/* METRICS & FILTERS OMITTED FOR BREVITY BUT KEEP THEM EXACTLY SAME AS BEFORE */}
//         <section style={styles.metricsGrid}>
//           <div style={{...styles.metricCard, borderLeft: '4px solid #3b82f6'}}>
//             <div style={styles.metricTitle}>Total Revenue</div>
//             <div style={{...styles.metricValue, color: '#1e3a8a'}}>₹ {metrics.totalRevenue.toLocaleString('en-IN')}</div>
//           </div>
//           <div style={{...styles.metricCard, borderLeft: '4px solid #10b981'}}>
//             <div style={styles.metricTitle}>Total Profit</div>
//             <div style={{...styles.metricValue, color: '#065f46'}}>₹ {metrics.totalProfit.toLocaleString('en-IN')}</div>
//           </div>
//           <div style={{...styles.metricCard, borderLeft: '4px solid #f59e0b'}}>
//             <div style={styles.metricTitle}>Items Sold</div>
//             <div style={{...styles.metricValue, color: '#b45309'}}>{metrics.totalSold} Units</div>
//           </div>
//         </section>

//         <section style={styles.topCard}>
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <h2 style={styles.sectionTitle}>Sales Management</h2>
//             <button onClick={() => setIsNewSaleOpen(true)} style={styles.sellBtn}>➕ New Sale</button>
//           </div>
//         </section>

//         {/* TABLE SECTION EXACTLY AS BEFORE */}
//         <section style={styles.tableSection}>
//           <div style={styles.tableWrapper}>
//             <table style={styles.table}>
//               <thead>
//                 <tr>
//                   <th style={styles.th}>Date</th><th style={styles.th}>Order No</th><th style={styles.th}>Customer</th>
//                   <th style={styles.th}>Product / SKU</th><th style={styles.th}>Qty</th><th style={styles.th}>Amount</th>
//                   <th style={styles.th}>Source</th><th style={{...styles.th, textAlign: 'center'}}>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentSales.map((sale) => (
//                   <tr key={sale._id} style={styles.row}>
//                     <td style={styles.td}>{new Date(sale.createdAt).toLocaleDateString()}</td>
//                     <td style={{...styles.td, fontWeight: 'bold'}}>{sale.orderNumber || "Manual"}</td>
//                     <td style={styles.td}>{sale.customerName || "-"}</td>
//                     <td style={styles.td}><b>{sale.productName}</b><br/><span style={{fontSize:'11px', color:'#64748b'}}>{sale.sku}</span></td>
//                     <td style={{...styles.td, color: '#2563eb', fontWeight: 'bold'}}>{sale.quantity}</td>
//                     <td style={{...styles.td, color: '#16a34a', fontWeight: 'bold'}}>₹{sale.totalAmount}</td>
//                     <td style={styles.td}>{sale.shop && sale.shop.includes("shopify") ? <span style={styles.shopifyBadge}>Shopify</span> : <span style={styles.manualBadge}>Manual</span>}</td>
//                     <td style={{...styles.td, textAlign: 'center', display:'flex', gap:'10px', justifyContent:'center'}}>
//                       <button onClick={() => setSelectedSale(sale)} style={styles.viewIconBtn}>👁️</button>
//                       <button onClick={() => handleDeleteSale(sale._id)} style={styles.deleteIconBtn}>🗑️</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </section>
//       </main>

//       {/* 🟢 VIEW DETAILS MODAL (SAME AS BEFORE) 🟢 */}
//       {selectedSale && (
//         <div style={styles.modalOverlay} onClick={() => setSelectedSale(null)}>
//           <div style={styles.largeModalContent} onClick={(e) => e.stopPropagation()}>
//             <div style={styles.modalHeader}>
//               <h2 style={{margin: 0, color: '#1e3a8a', fontSize: '20px'}}>Order Details {selectedSale.orderNumber && `(${selectedSale.orderNumber})`}</h2>
//               <button onClick={() => setSelectedSale(null)} style={styles.closeBtn}>✕</button>
//             </div>
//             <div style={styles.infoGrid}>
//               <div style={styles.detailBox}>
//                 <div style={styles.detailTitle}>Bill To</div>
//                 {selectedSale.billingAddress ? (
//                   <div style={styles.addressText}>
//                     <strong>{selectedSale.billingAddress.first_name} {selectedSale.billingAddress.last_name}</strong><br/>
//                     {selectedSale.billingAddress.address1}<br/>
//                     {selectedSale.billingAddress.city}, {selectedSale.billingAddress.province} - {selectedSale.billingAddress.zip}<br/>
//                     {selectedSale.billingAddress.country}
//                   </div>
//                 ) : <div style={styles.addressText}>N/A</div>}
//               </div>
//               <div style={styles.detailBox}>
//                 <div style={styles.detailTitle}>Ship To</div>
//                 {selectedSale.shippingAddress ? (
//                   <div style={styles.addressText}>
//                     <strong>{selectedSale.shippingAddress.first_name} {selectedSale.shippingAddress.last_name}</strong><br/>
//                     {selectedSale.shippingAddress.address1}<br/>
//                     {selectedSale.shippingAddress.city}, {selectedSale.shippingAddress.province} - {selectedSale.shippingAddress.zip}<br/>
//                     {selectedSale.shippingAddress.country}
//                   </div>
//                 ) : <div style={styles.addressText}>N/A</div>}
//               </div>
//             </div>
//             {/* ... Rest of View Details Table ... */}
//           </div>
//         </div>
//       )}

//       {/* 🔴 NEW SALE (MANUAL ENTRY) MODAL - FULLY UPDATED 🔴 */}
//       {isNewSaleOpen && (
//         <div style={styles.modalOverlay}>
//           <div style={styles.extraLargeModalContent}>
//             <div style={styles.modalHeader}>
//               <h3 style={{margin: 0, color: '#1e3a8a'}}>📝 Manual Sale Entry</h3>
//               <button onClick={() => setIsNewSaleOpen(false)} style={styles.closeBtn}>✕</button>
//             </div>

//             <form onSubmit={handleSellSubmit} style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
              
//               {/* SECTION 1: Product & Payment */}
//               <div style={styles.formSection}>
//                 <h4 style={styles.formSectionTitle}>Product & Pricing</h4>
//                 <div style={styles.formGrid}>
//                   <div><label style={styles.modalLabel}>Product SKU *</label><input type="text" required value={sellForm.sku} onChange={(e) => setSellForm({...sellForm, sku: e.target.value})} style={styles.modalInput} /></div>
//                   <div><label style={styles.modalLabel}>Quantity *</label><input type="number" required min="1" value={sellForm.qty} onChange={(e) => setSellForm({...sellForm, qty: Number(e.target.value)})} style={styles.modalInput} /></div>
                  
//                   <div style={{gridColumn: '1 / -1', display: 'flex', gap: '15px', alignItems: 'center'}}>
//                     <div style={{display: 'flex', alignItems: 'center', gap: '8px', background: '#f8fafc', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0'}}>
//                       <input type="checkbox" checked={sellForm.useMRP} onChange={(e) => setSellForm({...sellForm, useMRP: e.target.checked, customPrice: ""})} id="mrpCheck" />
//                       <label htmlFor="mrpCheck" style={{fontSize: '14px', fontWeight: 'bold', color: '#334155'}}>Sell at System MRP</label>
//                     </div>
//                     {!sellForm.useMRP && (
//                       <div style={{flex: 1}}><input type="number" required={!sellForm.useMRP} placeholder="Custom Price per unit (₹)" value={sellForm.customPrice} onChange={(e) => setSellForm({...sellForm, customPrice: e.target.value})} style={styles.modalInput} /></div>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* SECTION 2: Customer Details */}
//               <div style={styles.formSection}>
//                 <h4 style={styles.formSectionTitle}>Customer Details</h4>
//                 <div style={styles.formGrid}>
//                   <div><label style={styles.modalLabel}>Customer Name</label><input type="text" placeholder="e.g. Rahul Kumar" value={sellForm.customerName} onChange={(e) => setSellForm({...sellForm, customerName: e.target.value})} style={styles.modalInput} /></div>
//                   <div><label style={styles.modalLabel}>Payment Method</label>
//                     <select value={sellForm.paymentMethod} onChange={(e) => setSellForm({...sellForm, paymentMethod: e.target.value})} style={styles.modalInput}>
//                       <option value="Cash">Cash</option><option value="UPI">UPI</option><option value="Card">Card / NetBanking</option>
//                     </select>
//                   </div>
//                   <div><label style={styles.modalLabel}>Order Number (Optional)</label><input type="text" placeholder="Auto-generated if empty" value={sellForm.orderNumber} onChange={(e) => setSellForm({...sellForm, orderNumber: e.target.value})} style={styles.modalInput} /></div>
//                 </div>
//               </div>

//               {/* SECTION 3: Address */}
//               <div style={styles.formSection}>
//                 <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px'}}>
//                   <h4 style={{...styles.formSectionTitle, margin: 0}}>Billing Address</h4>
//                   <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
//                     <input type="checkbox" id="sameAddress" checked={sellForm.sameAsBilling} onChange={(e) => setSellForm({...sellForm, sameAsBilling: e.target.checked})} />
//                     <label htmlFor="sameAddress" style={{fontSize: '12px', color: '#475569', cursor: 'pointer'}}>Shipping is same as Billing</label>
//                   </div>
//                 </div>
                
//                 <div style={styles.formGrid}>
//                   <div style={{gridColumn: '1 / -1'}}><label style={styles.modalLabel}>Address</label><input type="text" placeholder="Street, Flat No, Area" value={sellForm.billingAddress.address1} onChange={(e) => handleAddressChange('billingAddress', 'address1', e.target.value)} style={styles.modalInput} /></div>
//                   <div><label style={styles.modalLabel}>City</label><input type="text" value={sellForm.billingAddress.city} onChange={(e) => handleAddressChange('billingAddress', 'city', e.target.value)} style={styles.modalInput} /></div>
//                   <div><label style={styles.modalLabel}>State (Province)</label><input type="text" placeholder="e.g. Haryana" value={sellForm.billingAddress.province} onChange={(e) => handleAddressChange('billingAddress', 'province', e.target.value)} style={styles.modalInput} /></div>
//                   <div><label style={styles.modalLabel}>Pincode / Zip</label><input type="text" value={sellForm.billingAddress.zip} onChange={(e) => handleAddressChange('billingAddress', 'zip', e.target.value)} style={styles.modalInput} /></div>
//                 </div>

//                 {/* Conditional Shipping Address */}
//                 {!sellForm.sameAsBilling && (
//                   <div style={{marginTop: '20px', paddingTop: '20px', borderTop: '1px dashed #cbd5e1'}}>
//                     <h4 style={styles.formSectionTitle}>Shipping Address</h4>
//                     <div style={styles.formGrid}>
//                       <div style={{gridColumn: '1 / -1'}}><label style={styles.modalLabel}>Address</label><input type="text" value={sellForm.shippingAddress.address1} onChange={(e) => handleAddressChange('shippingAddress', 'address1', e.target.value)} style={styles.modalInput} /></div>
//                       <div><label style={styles.modalLabel}>City</label><input type="text" value={sellForm.shippingAddress.city} onChange={(e) => handleAddressChange('shippingAddress', 'city', e.target.value)} style={styles.modalInput} /></div>
//                       <div><label style={styles.modalLabel}>State (Province)</label><input type="text" value={sellForm.shippingAddress.province} onChange={(e) => handleAddressChange('shippingAddress', 'province', e.target.value)} style={styles.modalInput} /></div>
//                       <div><label style={styles.modalLabel}>Pincode / Zip</label><input type="text" value={sellForm.shippingAddress.zip} onChange={(e) => handleAddressChange('shippingAddress', 'zip', e.target.value)} style={styles.modalInput} /></div>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* ACTIONS */}
//               <div style={{display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px', borderTop: '1px solid #e2e8f0', paddingTop: '15px'}}>
//                 <button type="button" onClick={() => setIsNewSaleOpen(false)} style={styles.cancelBtn}>Cancel</button>
//                 <button type="submit" style={styles.submitBtn}>Save Sale Entry</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // STYLES (Appended the required new styles)
// const styles = {
//   container: { minHeight: "100vh", backgroundColor: "#f1f5f9", fontFamily: "'Inter', sans-serif" },
//   mainContent: { padding: "30px 20px", maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "20px" },
//   metricsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' },
//   metricCard: { backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '8px' },
//   metricTitle: { fontSize: '13px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' },
//   metricValue: { fontSize: '26px', fontWeight: '800' },
//   topCard: { backgroundColor: "#fff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" },
//   sectionTitle: { margin: "0", fontSize: "20px", fontWeight: "700", color: "#334155" },
//   sellBtn: { backgroundColor: "#16a34a", color: "white", padding: "10px 18px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "bold" },
//   tableSection: { backgroundColor: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0", overflow: "hidden" },
//   tableWrapper: { overflowX: "auto" },
//   table: { width: "100%", borderCollapse: "collapse", minWidth: "900px" }, 
//   th: { padding: "14px 15px", background: "#f8fafc", textAlign: "left", fontSize: "13px", color: "#64748b", textTransform: "uppercase", borderBottom: "1px solid #e2e8f0" },
//   td: { padding: "14px 15px", borderBottom: "1px solid #e2e8f0", fontSize: "14px", color: "#334155" },
//   viewIconBtn: { background: '#eff6ff', border: '1px solid #bfdbfe', color: '#2563eb', cursor: 'pointer', padding: '6px 10px', borderRadius: '6px' },
//   deleteIconBtn: { background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', cursor: 'pointer', padding: '6px 10px', borderRadius: '6px' },
//   shopifyBadge: { background: '#dcfce7', color: '#16a34a', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' },
//   manualBadge: { background: '#e0e7ff', color: '#4f46e5', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' },
//   cancelBtnSmall: { padding: "6px 12px", background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "600" },
//   deleteConfirmBtn: { padding: "6px 12px", background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "600" },
//   modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.6)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, backdropFilter: 'blur(3px)' },
//   largeModalContent: { backgroundColor: "#fff", padding: "25px", borderRadius: "12px", width: "90%", maxWidth: "600px", maxHeight: "90vh", overflowY: "auto" },
//   extraLargeModalContent: { backgroundColor: "#fff", padding: "25px", borderRadius: "12px", width: "95%", maxWidth: "750px", maxHeight: "95vh", overflowY: "auto", boxShadow: "0 10px 25px rgba(0,0,0,0.2)" },
//   modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '15px', marginBottom: '20px' },
//   closeBtn: { background: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#64748b' },
//   formSection: { background: '#f8fafc', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0' },
//   formSectionTitle: { margin: '0 0 15px 0', fontSize: '14px', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' },
//   formGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' },
//   modalLabel: { fontSize: "12px", fontWeight: "600", color: "#64748b", marginBottom: "5px", display: "block" },
//   modalInput: { width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px", outline: "none", boxSizing: "border-box" },
//   cancelBtn: { padding: "10px 18px", background: "#f1f5f9", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" },
//   submitBtn: { padding: "10px 18px", background: "#2563eb", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600", color: "#fff" },
//   infoGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' },
//   detailBox: { background: '#f8fafc', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '15px' },
//   detailTitle: { fontSize: '12px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' },
//   addressText: { fontSize: '13px', color: '#334155', lineHeight: '1.6' }
// };

































































































































































import React, { useState, useEffect } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import Header from "../components/Header";
import Snowfall from "react-snowfall"

export default function Sales() {
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [loading, setLoading] = useState(false);

  // Date Filter States
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Modals States
  const [isNewSaleOpen, setIsNewSaleOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null); 
  
  // 🔥 EXPANDED MANUAL ENTRY FORM STATE 🔥
  const [sellForm, setSellForm] = useState({
    sku: "",
    qty: 1,
    useMRP: true,
    customPrice: "",
    orderNumber: "",
    paymentMethod: "Cash",
    customerName: "",
    sameAsBilling: true, // Checkbox state
    billingAddress: { first_name: "", last_name: "", address1: "", city: "", province: "", zip: "", country: "India" },
    shippingAddress: { first_name: "", last_name: "", address1: "", city: "", province: "", zip: "", country: "India" }
  });

  const [metrics, setMetrics] = useState({ totalRevenue: 0, totalProfit: 0, totalSold: 0 });

  useEffect(() => { fetchSales(); }, []);

  useEffect(() => {
    let result = sales;
    if (startDate) result = result.filter(s => new Date(s.createdAt) >= new Date(startDate));
    if (endDate) {
      const end = new Date(endDate);
      end.setDate(end.getDate() + 1);
      result = result.filter(s => new Date(s.createdAt) < end);
    }
    setFilteredSales(result);
    setCurrentPage(1); 

    let rev = 0, prof = 0, sold = 0;
    result.forEach(item => {
      rev += Number(item.totalAmount) || 0;
      prof += Number(item.profit) || 0;
      sold += Number(item.quantity) || 0;
    });
    setMetrics({ totalRevenue: rev, totalProfit: prof, totalSold: sold });
  }, [sales, startDate, endDate]);

  const fetchSales = async () => {
    setLoading(true);
    try {
      const res = await api.get("/sales"); 
      setSales(res.data);
    } catch (err) {
      toast.error("Failed to fetch sales data");
    } finally {
      setLoading(false);
    }
  };

  const clearFilter = () => { setStartDate(""); setEndDate(""); };

  // Handle Input Change for Addresses
  const handleAddressChange = (type, field, value) => {
    setSellForm(prev => ({
      ...prev,
      [type]: { ...prev[type], [field]: value }
    }));
  };

  // 🔥 UPDATED SUBMIT LOGIC 🔥
  const handleSellSubmit = async (e) => {
    e.preventDefault();
    if (!sellForm.sku) return toast.error("Please enter SKU");
    if (sellForm.qty <= 0) return toast.error("Quantity must be greater than 0");
    if (!sellForm.useMRP && !sellForm.customPrice) return toast.error("Please enter Custom Price");

    try {
      // Split names for the address objects
      const names = sellForm.customerName.split(" ");
      const fName = names[0] || "";
      const lName = names.slice(1).join(" ") || "";

      // Ensure first_name/last_name are set in addresses
      const finalBilling = { ...sellForm.billingAddress, first_name: fName, last_name: lName };
      const finalShipping = sellForm.sameAsBilling ? finalBilling : { ...sellForm.shippingAddress, first_name: fName, last_name: lName };

      const payload = {
        sku: sellForm.sku,
        removeQty: sellForm.qty,
        customSellingPrice: sellForm.useMRP ? null : Number(sellForm.customPrice),
        shop: "Manual Entry",
        orderNumber: sellForm.orderNumber || `MANUAL-${Date.now().toString().slice(-5)}`,
        paymentMethod: sellForm.paymentMethod,
        customerName: sellForm.customerName,
        billingAddress: finalBilling,
        shippingAddress: finalShipping
      };

      await api.post("/sales/update-qty-sku", payload); 
      
      toast.success("Manual sale added successfully!");
      setIsNewSaleOpen(false);
      
      // Reset Form
      setSellForm({
        sku: "", qty: 1, useMRP: true, customPrice: "", orderNumber: "", paymentMethod: "Cash", customerName: "", sameAsBilling: true,
        billingAddress: { first_name: "", last_name: "", address1: "", city: "", province: "", zip: "", country: "India" },
        shippingAddress: { first_name: "", last_name: "", address1: "", city: "", province: "", zip: "", country: "India" }
      });
      fetchSales(); 
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to make a sale");
    }
  };

  const executeDelete = async (id) => {
    try {
      await api.delete(`/sales/delete-sku/${id}`);
      toast.success("Sale entry deleted successfully!");
      fetchSales();
    } catch (err) { toast.error("Failed to delete sale entry"); }
  };

  const handleDeleteSale = (id) => {
    toast((t) => (
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "4px" }}>
        <div style={{ fontWeight: "600", fontSize: "14px", color: "#334155" }}>⚠️ Delete Sale Entry?</div>
        <p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>This action cannot be undone.</p>
        <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
          <button onClick={() => toast.dismiss(t.id)} style={styles.cancelBtnSmall}>Cancel</button>
          <button onClick={() => { toast.dismiss(t.id); executeDelete(id); }} style={styles.deleteConfirmBtn}>Yes, Delete</button>
        </div>
      </div>
    ), { id: "delete-confirm-toast", duration: Infinity });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSales = filteredSales.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSales.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={styles.container}>
      <Snowfall color="82C3D9"/>
      {/* <Header /> */}
      <main style={styles.mainContent}>
        
        {/* METRICS */}
        <section style={styles.metricsGrid}>
          <div style={{...styles.metricCard, borderLeft: '4px solid #3b82f6'}}>
            <div style={styles.metricTitle}>Total Revenue</div>
            <div style={{...styles.metricValue, color: '#1e3a8a'}}>₹ {metrics.totalRevenue.toLocaleString('en-IN')}</div>
          </div>
          <div style={{...styles.metricCard, borderLeft: '4px solid #10b981'}}>
            <div style={styles.metricTitle}>Total Profit</div>
            <div style={{...styles.metricValue, color: '#065f46'}}>₹ {metrics.totalProfit.toLocaleString('en-IN')}</div>
          </div>
          <div style={{...styles.metricCard, borderLeft: '4px solid #f59e0b'}}>
            <div style={styles.metricTitle}>Items Sold</div>
            <div style={{...styles.metricValue, color: '#b45309'}}>{metrics.totalSold} Units</div>
          </div>
        </section>

        {/* TOP SECTION */}
        <section style={styles.topCard}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={styles.sectionTitle}>Sales Management</h2>
            <button onClick={() => setIsNewSaleOpen(true)} style={styles.sellBtn}>➕ New Sale</button>
          </div>
        </section>

        {/* TABLE SECTION */}
        <section style={styles.tableSection}>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Date</th><th style={styles.th}>Order No</th><th style={styles.th}>Customer</th>
                  <th style={styles.th}>Product / SKU</th><th style={styles.th}>Qty</th><th style={styles.th}>Amount</th>
                  <th style={styles.th}>Source</th><th style={{...styles.th, textAlign: 'center'}}>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentSales.map((sale) => (
                  <tr key={sale._id} style={styles.row}>
                    <td style={styles.td}>{new Date(sale.createdAt).toLocaleDateString()}</td>
                    <td style={{...styles.td, fontWeight: 'bold'}}>{sale.orderNumber || "Manual"}</td>
                    <td style={styles.td}>{sale.customerName || "-"}</td>
                    <td style={styles.td}><b>{sale.productName}</b><br/><span style={{fontSize:'11px', color:'#64748b'}}>{sale.sku}</span></td>
                    <td style={{...styles.td, color: '#2563eb', fontWeight: 'bold'}}>{sale.quantity}</td>
                    <td style={{...styles.td, color: '#16a34a', fontWeight: 'bold'}}>₹{sale.totalAmount}</td>
                    <td style={styles.td}>{sale.shop && sale.shop.includes("shopify") ? <span style={styles.shopifyBadge}>Shopify</span> : <span style={styles.manualBadge}>Manual</span>}</td>
                    <td style={{...styles.td, textAlign: 'center', display:'flex', gap:'10px', justifyContent:'center'}}>
                      <button onClick={() => setSelectedSale(sale)} style={styles.viewIconBtn}>👁️</button>
                      <button onClick={() => handleDeleteSale(sale._id)} style={styles.deleteIconBtn}>🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* PAGINATION */}
          {!loading && filteredSales.length > itemsPerPage && (
            <div style={styles.paginationWrapper}>
              <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} style={currentPage === 1 ? styles.disabledPageBtn : styles.pageBtn}>Previous</button>
              <span style={styles.pageInfo}>Page {currentPage} of {totalPages}</span>
              <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} style={currentPage === totalPages ? styles.disabledPageBtn : styles.pageBtn}>Next</button>
            </div>
          )}
        </section>
      </main>

      {/* 🟢 VIEW DETAILS MODAL (FULL DETAILS RESTORED) 🟢 */}
      {/* 🟢 VIEW DETAILS MODAL (FULL DETAILS RESTORED) 🟢 */}
      {selectedSale && (
        <div style={styles.modalOverlay} onClick={() => setSelectedSale(null)}>
          <div style={styles.largeModalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={{margin: 0, color: '#1e3a8a', fontSize: '20px'}}>Order Details {selectedSale.orderNumber && `(${selectedSale.orderNumber})`}</h2>
              <button onClick={() => setSelectedSale(null)} style={styles.closeBtn}>✕</button>
            </div>
            
            <div style={styles.infoGrid}>
              <div style={styles.detailBox}>
                <div style={styles.detailTitle}>Bill To</div>
                {selectedSale.billingAddress ? (
                  <div style={styles.addressText}>
                    <strong>{selectedSale.billingAddress.first_name} {selectedSale.billingAddress.last_name}</strong><br/>
                    {selectedSale.billingAddress.address1}<br/>
                    {selectedSale.billingAddress.city}, {selectedSale.billingAddress.province} - {selectedSale.billingAddress.zip}<br/>
                    {selectedSale.billingAddress.country}
                  </div>
                ) : <div style={styles.addressText}>N/A</div>}
              </div>
              <div style={styles.detailBox}>
                <div style={styles.detailTitle}>Ship To</div>
                {selectedSale.shippingAddress ? (
                  <div style={styles.addressText}>
                    <strong>{selectedSale.shippingAddress.first_name} {selectedSale.shippingAddress.last_name}</strong><br/>
                    {selectedSale.shippingAddress.address1}<br/>
                    {selectedSale.shippingAddress.city}, {selectedSale.shippingAddress.province} - {selectedSale.shippingAddress.zip}<br/>
                    {selectedSale.shippingAddress.country}
                  </div>
                ) : <div style={styles.addressText}>N/A</div>}
              </div>
            </div>

            {/* 🔥 RESTORED FINANCIALS & TAX TABLE 🔥 */}
            <div style={styles.detailBox}>
              <div style={styles.detailTitle}>Item & Financials</div>
              
              {/* 👉 NAYA: Image & Product Info Box 👈 */}
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center', background: '#fff', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '15px', marginTop: '10px' }}>
                {selectedSale.itemImage ? (
                  <img src={selectedSale.itemImage} alt="Product" style={{ width: '65px', height: '65px', borderRadius: '6px', objectFit: 'cover', border: '1px solid #cbd5e1' }} />
                ) : (
                  <div style={{ width: '65px', height: '65px', borderRadius: '6px', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#94a3b8', border: '1px dashed #cbd5e1' }}>
                    No Img
                  </div>
                )}
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#1e3a8a' }}>{selectedSale.productName}</div>
                  <div style={{ fontSize: '12px', color: '#64748b', fontFamily: 'monospace', marginTop: '4px' }}>SKU: {selectedSale.sku}</div>
                </div>
              </div>

              <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '13px'}}>
                <tbody>
                  <tr style={{borderBottom: '1px solid #e2e8f0'}}>
                    <td style={{padding: '8px 0', color: '#64748b'}}>Quantity</td>
                    <td style={{padding: '8px 0', fontWeight: 'bold', textAlign: 'right'}}>{selectedSale.quantity} {selectedSale.unit}</td>
                  </tr>
                  
                  {/* MRP AUR DISCOUNT SECTION */}
                  <tr style={{borderBottom: '1px dotted #cbd5e1'}}>
                    <td style={{padding: '8px 0', color: '#94a3b8'}}>MRP (Original Price)</td>
                    <td style={{padding: '8px 0', color: '#94a3b8',textAlign: 'right'}}>
                      ₹{selectedSale.mrp || selectedSale.sellingPrice}
                    </td>
                  </tr>
                  {selectedSale.discountPercentage > 0 && (
                    <tr style={{borderBottom: '1px solid #e2e8f0'}}>
                      <td style={{padding: '8px 0', color: '#64748b'}}>Discount Given</td>
                      <td style={{padding: '8px 0', fontWeight: 'bold', textAlign: 'right'}}>
                        {selectedSale.discountPercentage}% OFF
                      </td>
                    </tr>
                  )}
                  
                  <tr style={{borderBottom: '1px solid #e2e8f0'}}>
                    <td style={{padding: '8px 0', color: '#64748b'}}>Selling Price (Per Unit)</td>
                    <td style={{padding: '8px 0', fontWeight: 'bold', textAlign: 'right'}}>₹{selectedSale.sellingPrice}</td>
                  </tr>
                  <tr style={{borderBottom: '1px solid #e2e8f0', background: '#f8fafc'}}>
                    <td style={{padding: '8px 4px', color: '#64748b'}}>Total Amount (Inc. Tax)</td>
                    <td style={{padding: '8px 4px', fontWeight: 'bold', color: '#16a34a', textAlign: 'right', fontSize: '15px'}}>₹{selectedSale.totalAmount}</td>
                  </tr>
                  
                  {/* TAX BREAKDOWN */}
                  {selectedSale.gstPercentage > 0 && (
                    <>
                      <tr><td colSpan="2" style={{padding: '10px 0 2px', fontSize: '11px', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase'}}>Tax Breakdown ({selectedSale.gstPercentage}%)</td></tr>
                      <tr>
                        <td style={{padding: '4px 0', color: '#64748b'}}>IGST</td>
                        <td style={{padding: '4px 0', textAlign: 'right'}}>₹{selectedSale.igst || 0}</td>
                      </tr>
                      <tr>
                        <td style={{padding: '4px 0', color: '#64748b'}}>CGST / SGST</td>
                        <td style={{padding: '4px 0', textAlign: 'right'}}>₹{selectedSale.cgst || 0} / ₹{selectedSale.sgst || 0}</td>
                      </tr>
                    </>
                  )}

                  <tr><td colSpan="2" style={{padding: '10px 0 2px', fontSize: '11px', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase'}}>Business Metrics</td></tr>
                  <tr style={{borderBottom: '1px solid #e2e8f0'}}>
                    <td style={{padding: '8px 0', color: '#64748b'}}>Total Cost Price</td>
                    <td style={{padding: '8px 0', fontWeight: 'bold', textAlign: 'right'}}>₹{selectedSale.costPrice}</td>
                  </tr>
                  <tr>
                    <td style={{padding: '8px 0', color: '#64748b', fontWeight: 'bold'}}>Net Profit</td>
                    <td style={{padding: '8px 0', fontWeight: 'bold', color: selectedSale.profit >= 0 ? '#16a34a' : '#dc2626', textAlign: 'right', fontSize: '15px'}}>₹{selectedSale.profit}</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>
      )}

      {/* 🔴 NEW SALE (MANUAL ENTRY) MODAL */}
      {isNewSaleOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.extraLargeModalContent}>
            <div style={styles.modalHeader}>
              <h3 style={{margin: 0, color: '#1e3a8a'}}>📝 Manual Sale Entry</h3>
              <button onClick={() => setIsNewSaleOpen(false)} style={styles.closeBtn}>✕</button>
            </div>

            <form onSubmit={handleSellSubmit} style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
              
              {/* SECTION 1: Product & Payment */}
              <div style={styles.formSection}>
                <h4 style={styles.formSectionTitle}>Product & Pricing</h4>
                <div style={styles.formGrid}>
                  <div><label style={styles.modalLabel}>Product SKU *</label><input type="text" required value={sellForm.sku} onChange={(e) => setSellForm({...sellForm, sku: e.target.value})} style={styles.modalInput} /></div>
                  <div><label style={styles.modalLabel}>Quantity *</label><input type="number" required min="1" value={sellForm.qty} onChange={(e) => setSellForm({...sellForm, qty: Number(e.target.value)})} style={styles.modalInput} /></div>
                  
                  <div style={{gridColumn: '1 / -1', display: 'flex', gap: '15px', alignItems: 'center'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px', background: '#f8fafc', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0'}}>
                      <input type="checkbox" checked={sellForm.useMRP} onChange={(e) => setSellForm({...sellForm, useMRP: e.target.checked, customPrice: ""})} id="mrpCheck" />
                      <label htmlFor="mrpCheck" style={{fontSize: '14px', fontWeight: 'bold', color: '#334155'}}>Sell at System MRP</label>
                    </div>
                    {!sellForm.useMRP && (
                      <div style={{flex: 1}}><input type="number" required={!sellForm.useMRP} placeholder="Custom Price per unit (₹)" value={sellForm.customPrice} onChange={(e) => setSellForm({...sellForm, customPrice: e.target.value})} style={styles.modalInput} /></div>
                    )}
                  </div>
                </div>
              </div>

              {/* SECTION 2: Customer Details */}
              <div style={styles.formSection}>
                <h4 style={styles.formSectionTitle}>Customer Details</h4>
                <div style={styles.formGrid}>
                  <div><label style={styles.modalLabel}>Customer Name</label><input type="text" placeholder="e.g. Rahul Kumar" value={sellForm.customerName} onChange={(e) => setSellForm({...sellForm, customerName: e.target.value})} style={styles.modalInput} /></div>
                  <div><label style={styles.modalLabel}>Payment Method</label>
                    <select value={sellForm.paymentMethod} onChange={(e) => setSellForm({...sellForm, paymentMethod: e.target.value})} style={styles.modalInput}>
                      <option value="Cash">Cash</option><option value="UPI">UPI</option><option value="Card">Card / NetBanking</option>
                    </select>
                  </div>
                  <div><label style={styles.modalLabel}>Order Number (Optional)</label><input type="text" placeholder="Auto-generated if empty" value={sellForm.orderNumber} onChange={(e) => setSellForm({...sellForm, orderNumber: e.target.value})} style={styles.modalInput} /></div>
                </div>
              </div>

              {/* SECTION 3: Address */}
              <div style={styles.formSection}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px'}}>
                  <h4 style={{...styles.formSectionTitle, margin: 0}}>Billing Address</h4>
                  <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                    <input type="checkbox" id="sameAddress" checked={sellForm.sameAsBilling} onChange={(e) => setSellForm({...sellForm, sameAsBilling: e.target.checked})} />
                    <label htmlFor="sameAddress" style={{fontSize: '12px', color: '#475569', cursor: 'pointer'}}>Shipping is same as Billing</label>
                  </div>
                </div>
                
                <div style={styles.formGrid}>
                  <div style={{gridColumn: '1 / -1'}}><label style={styles.modalLabel}>Address</label><input type="text" placeholder="Street, Flat No, Area" value={sellForm.billingAddress.address1} onChange={(e) => handleAddressChange('billingAddress', 'address1', e.target.value)} style={styles.modalInput} /></div>
                  <div><label style={styles.modalLabel}>City</label><input type="text" value={sellForm.billingAddress.city} onChange={(e) => handleAddressChange('billingAddress', 'city', e.target.value)} style={styles.modalInput} /></div>
                  <div><label style={styles.modalLabel}>State (Province)</label><input type="text" placeholder="e.g. Haryana" value={sellForm.billingAddress.province} onChange={(e) => handleAddressChange('billingAddress', 'province', e.target.value)} style={styles.modalInput} /></div>
                  <div><label style={styles.modalLabel}>Pincode / Zip</label><input type="text" value={sellForm.billingAddress.zip} onChange={(e) => handleAddressChange('billingAddress', 'zip', e.target.value)} style={styles.modalInput} /></div>
                </div>

                {/* Conditional Shipping Address */}
                {!sellForm.sameAsBilling && (
                  <div style={{marginTop: '20px', paddingTop: '20px', borderTop: '1px dashed #cbd5e1'}}>
                    <h4 style={styles.formSectionTitle}>Shipping Address</h4>
                    <div style={styles.formGrid}>
                      <div style={{gridColumn: '1 / -1'}}><label style={styles.modalLabel}>Address</label><input type="text" value={sellForm.shippingAddress.address1} onChange={(e) => handleAddressChange('shippingAddress', 'address1', e.target.value)} style={styles.modalInput} /></div>
                      <div><label style={styles.modalLabel}>City</label><input type="text" value={sellForm.shippingAddress.city} onChange={(e) => handleAddressChange('shippingAddress', 'city', e.target.value)} style={styles.modalInput} /></div>
                      <div><label style={styles.modalLabel}>State (Province)</label><input type="text" value={sellForm.shippingAddress.province} onChange={(e) => handleAddressChange('shippingAddress', 'province', e.target.value)} style={styles.modalInput} /></div>
                      <div><label style={styles.modalLabel}>Pincode / Zip</label><input type="text" value={sellForm.shippingAddress.zip} onChange={(e) => handleAddressChange('shippingAddress', 'zip', e.target.value)} style={styles.modalInput} /></div>
                    </div>
                  </div>
                )}
              </div>

              {/* ACTIONS */}
              <div style={{display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px', borderTop: '1px solid #e2e8f0', paddingTop: '15px'}}>
                <button type="button" onClick={() => setIsNewSaleOpen(false)} style={styles.cancelBtn}>Cancel</button>
                <button type="submit" style={styles.submitBtn}>Save Sale Entry</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// STYLES
const styles = {
  container: { minHeight: "100vh", backgroundColor: "#f1f5f9", fontFamily: "'Inter', sans-serif" },
  mainContent: { padding: "30px 20px", maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "20px" },
  metricsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' },
  metricCard: { backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '8px' },
  metricTitle: { fontSize: '13px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' },
  metricValue: { fontSize: '26px', fontWeight: '800' },
  topCard: { backgroundColor: "#fff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" },
  sectionTitle: { margin: "0", fontSize: "20px", fontWeight: "700", color: "#334155" },
  sellBtn: { backgroundColor: "#16a34a", color: "white", padding: "10px 18px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "bold" },
  tableSection: { backgroundColor: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0", overflow: "hidden" },
  tableWrapper: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", minWidth: "900px" }, 
  th: { padding: "14px 15px", background: "#f8fafc", textAlign: "left", fontSize: "13px", color: "#64748b", textTransform: "uppercase", borderBottom: "1px solid #e2e8f0" },
  td: { padding: "14px 15px", borderBottom: "1px solid #e2e8f0", fontSize: "14px", color: "#334155" },
  viewIconBtn: { background: '#eff6ff', border: '1px solid #bfdbfe', color: '#2563eb', cursor: 'pointer', padding: '6px 10px', borderRadius: '6px' },
  deleteIconBtn: { background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', cursor: 'pointer', padding: '6px 10px', borderRadius: '6px' },
  shopifyBadge: { background: '#dcfce7', color: '#16a34a', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' },
  manualBadge: { background: '#e0e7ff', color: '#4f46e5', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' },
  cancelBtnSmall: { padding: "6px 12px", background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "600" },
  deleteConfirmBtn: { padding: "6px 12px", background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "600" },
  paginationWrapper: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', padding: '15px', background: '#fff', borderTop: '1px solid #e2e8f0' },
  pageBtn: { background: '#2563eb', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', color: '#fff', fontSize: '13px', fontWeight: '600' },
  disabledPageBtn: { background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '8px 16px', borderRadius: '6px', cursor: 'not-allowed', color: '#94a3b8', fontSize: '13px', fontWeight: '600' },
  pageInfo: { fontSize: '13px', fontWeight: '600', color: '#475569' },
  modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.6)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, backdropFilter: 'blur(3px)' },
  largeModalContent: { backgroundColor: "#fff", padding: "25px", borderRadius: "12px", width: "90%", maxWidth: "600px", maxHeight: "90vh", overflowY: "auto" },
  extraLargeModalContent: { backgroundColor: "#fff", padding: "25px", borderRadius: "12px", width: "95%", maxWidth: "750px", maxHeight: "95vh", overflowY: "auto", boxShadow: "0 10px 25px rgba(0,0,0,0.2)" },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '15px', marginBottom: '20px' },
  closeBtn: { background: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#64748b' },
  infoGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' },
  detailBox: { background: '#f8fafc', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '15px' },
  detailTitle: { fontSize: '12px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' },
  addressText: { fontSize: '13px', color: '#334155', lineHeight: '1.6' },
  formSection: { background: '#f8fafc', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0' },
  formSectionTitle: { margin: '0 0 15px 0', fontSize: '14px', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' },
  formGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' },
  modalLabel: { fontSize: "12px", fontWeight: "600", color: "#64748b", marginBottom: "5px", display: "block" },
  modalInput: { width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px", outline: "none", boxSizing: "border-box" },
  cancelBtn: { padding: "10px 18px", background: "#f1f5f9", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" },
  submitBtn: { padding: "10px 18px", background: "#2563eb", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600", color: "#fff" }
};
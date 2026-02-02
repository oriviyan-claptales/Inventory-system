


// // import React, { useEffect, useState, useCallback } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import { useSelector } from "react-redux";
// // import api from "../api/axios";
// // import SkuUpdate from "../components/SkuUpdate";
// // import toast from "react-hot-toast";
// // import Header from "../components/Header";
// // import * as XLSX from "xlsx"; 

// // const ProductDetails = () => {
// //   const { id } = useParams();
// //   const navigate = useNavigate();
// //   const [product, setProduct] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   // --- 📅 HISTORY & DATE STATES ---
// //   const [showHistory, setShowHistory] = useState(false);
// //   const [productLogs, setProductLogs] = useState([]);
// //   const [logsLoading, setLogsLoading] = useState(false);
// //   const [startDate, setStartDate] = useState(""); 
// //   const [endDate, setEndDate] = useState("");     

// //   // --- 📄 PAGINATION STATES (NEW) ---
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const itemsPerPage = 20; // Har page par 10 record dikhenge

// //   // --- MODAL & EDIT STATES ---
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [showDeleteModal, setShowDeleteModal] = useState(false);
// //   const [editForm, setEditForm] = useState({
// //     price: "", costing_price: "", description: "", Supplier_name: "" 
// //   });

// //   const user = useSelector((state) => state.user.userData);
// //   const isAdmin = user?.userType === "admin";
// //   const isSuperUser = user?.userType === "superuser";
// //   const canEdit = isAdmin || isSuperUser; 

// //   // --- FETCH PRODUCT DATA ---
// //   const fetchProduct = useCallback(async () => {
// //     try {
// //       const res = await api.get(`/products/${id}`);
// //       setProduct(res.data);
// //       setLoading(false);
// //     } catch (error) {
// //       toast.error("Error fetching product details");
// //       setLoading(false);
// //     }
// //   }, [id]);

// //   useEffect(() => {
// //     fetchProduct();
// //   }, [fetchProduct]);

// //   // --- 🔍 HISTORY LOGIC ---
// //   const fetchProductHistory = async (sDate = "", eDate = "") => {
// //     if (!canEdit) {
// //       toast.error("Access Denied: Only Admin can view history.");
// //       return;
// //     }

// //     if (!product || !product.sku) {
// //       toast.error("Product data not loaded yet.");
// //       return;
// //     }
// //     setShowHistory(true);
// //     setLogsLoading(true);
// //     setCurrentPage(1); // Jab bhi history open/filter ho, page 1 se start ho
// //     try {
// //       const res = await api.get(`/logs/product/${id}`, {
// //         params: { sku: product.sku, startDate: sDate, endDate: eDate }
// //       });
// //       setProductLogs(res.data);
// //     } catch (error) {
// //       toast.error("Failed to load history");
// //     } finally {
// //       setLogsLoading(false);
// //     }
// //   };

// //   const handleFilterApply = () => {
// //     if (!startDate || !endDate) return toast.error("Select both dates");
// //     fetchProductHistory(startDate, endDate);
// //   };

// //   const handleFilterReset = () => {
// //     setStartDate("");
// //     setEndDate("");
// //     fetchProductHistory("", "");
// //   };

// //   // --- 📄 PAGINATION LOGIC (CALCULATION) ---
// //   const indexOfLastLog = currentPage * itemsPerPage;
// //   const indexOfFirstLog = indexOfLastLog - itemsPerPage;
// //   const currentLogs = productLogs.slice(indexOfFirstLog, indexOfLastLog);
// //   const totalPages = Math.ceil(productLogs.length / itemsPerPage);

// //   const paginate = (pageNumber) => setCurrentPage(pageNumber);

// //   // --- ✏️ EDIT HANDLERS ---
// //   const handleEditClick = () => {
// //     if (!canEdit) return toast.error("Permission Denied");
// //     setEditForm({
// //       price: product.price,
// //       costing_price: product.costing_price,
// //       description: product.description || "",
// //       Supplier_name: product.Supplier_name || ""
// //     });
// //     setIsEditing(true);
// //   };

// //   const handleSaveChanges = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await api.put(`/products/${id}`, editForm);
// //       toast.success("Product Updated Successfully!");
// //       setIsEditing(false);
// //       fetchProduct();
// //     } catch (error) {
// //       toast.error("Update failed");
// //     }
// //   };

// //   // --- 🗑️ DELETE HANDLER ---
// //   const confirmDelete = async () => {
// //     try {
// //       await api.delete(`/products/${id}`);
// //       toast.success("Product Deleted Successfully");
// //       navigate("/dashboard");
// //     } catch (error) {
// //       toast.error("Failed to delete product");
// //     }
// //     setShowDeleteModal(false);
// //   };

// //   // --- 📥 EXCEL & IMAGE LOGIC ---
// //   const downloadOneProductExcel = () => {
// //     if (!product) return;
// //     const dataToExport = [{ "Product Name": product.name, SKU: product.sku, Price: product.price, Stock: product.Qty }];
// //     const worksheet = XLSX.utils.json_to_sheet(dataToExport);
// //     const workbook = XLSX.utils.book_new();
// //     XLSX.utils.book_append_sheet(workbook, worksheet, "Details");
// //     XLSX.writeFile(workbook, `${product.sku}_Details.xlsx`);
// //   };

// //   const downloadImage = async (imageUrl, fileName) => {
// //     try {
// //       const response = await fetch(imageUrl);
// //       const blob = await response.blob();
// //       const url = window.URL.createObjectURL(blob);
// //       const link = document.createElement("a");
// //       link.href = url;
// //       link.download = fileName || "download.jpg";
// //       link.click();
// //     } catch (error) { toast.error("Download failed"); }
// //   };

// //   if (loading) return <div style={styles.centerMsg}>Loading...</div>;
// //   if (!product) return <div style={styles.centerMsg}>Not Found</div>;

// //   return (
// //     <div style={styles.container}>
// //       <Header />
// //       <div style={styles.mainContent}>
// //         <div style={styles.navBar}>
// //            <button onClick={() => navigate("/dashboard")} style={styles.backBtn}>⬅ Back</button>
           
// //            <div style={{display:'flex', gap:'10px'}}>
// //              {canEdit && (
// //                <>
// //                  <button onClick={handleEditClick} style={styles.headerEditBtn}>✏️ Edit</button>
// //                  <button onClick={() => setShowDeleteModal(true)} style={styles.headerDelBtn}>🗑 Delete</button>
// //                  <button onClick={() => fetchProductHistory("", "")} style={styles.historyBtn}>📜 History</button>
// //                </>
// //              )}
// //              <button onClick={downloadOneProductExcel} style={styles.excelBtn}>📥 Excel</button>
// //            </div>
// //         </div>

// //         <div style={styles.productCard}>
// //           <div style={styles.leftCol}>
// //             <div style={styles.imgWrapper}>
// //               <img src={product.img} alt={product.name} style={styles.productImg} />
// //               <button onClick={() => downloadImage(product.img, `${product.name}.jpg`)} style={styles.iconBtn}>⬇</button>
// //             </div>
// //             {product.barcodeImg && (
// //               <div style={styles.barcodeWrapper}>
// //                 <img src={product.barcodeImg} alt="Barcode" style={styles.barcodeImg} />
// //                 <button onClick={() => downloadImage(product.barcodeImg, `${product.sku}.jpg`)} style={styles.miniLink}>Download QR</button>
// //               </div>
// //             )}
// //           </div>

// //           <div style={styles.rightCol}>
// //             <div style={styles.headerRow}>
// //                <div>
// //                  <h2 style={styles.title}>{product.name}</h2>
// //                  <span style={styles.sku}>SKU: {product.sku}</span>
// //                </div>
// //                <div style={{textAlign:'right'}}>
// //                  <div style={styles.price}>₹{product.price}</div>
// //                </div>
// //             </div>
// //             <hr style={styles.divider} />
// //             <div style={styles.infoGrid}>
// //                <InfoBox label="Category" val={product.category} />
// //                <InfoBox label="Color" val={product.color} />
// //                <InfoBox label="Size" val={product.size} />
// //                <InfoBox label="Stock" val={product.Qty} color={product.Qty < 5 ? 'red' : 'green'} />
// //                <InfoBox label="Cost" val={canEdit ? `₹${product.costing_price}` : "--"} />
// //                <InfoBox label="gst" val={canEdit ? `${product.gst}% GST` : "--"} />
// //                <InfoBox label="Supplier" val={canEdit ? product.Supplier_name : "--"} />
// //             </div>

// //             <div style={styles.splitRow}>
// //                 <div style={styles.descBox}>
// //                     <span style={styles.label}>Description:</span>
// //                     <p style={styles.descText}>{product.description || "No description."}</p>
// //                 </div>
// //                 {canEdit && (
// //                     <div style={styles.skuBoxRight}>
// //                         <SkuUpdate onUpdated={fetchProduct} prefillProduct={product} />
// //                     </div>
// //                 )}
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* --- MODAL: PRODUCT HISTORY WITH PAGINATION --- */}
// //       {showHistory && canEdit && (
// //         <div style={styles.overlay}>
// //           <div style={{...styles.modal, width: '750px', maxWidth: '95%'}}>
// //             <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'15px'}}>
// //               <h3 style={{margin:0}}>Product Audit Trail</h3>
// //               <button onClick={()=>setShowHistory(false)} style={{border:'none', background:'none', cursor:'pointer', fontSize:'20px'}}>×</button>
// //             </div>

// //             <div style={styles.modalFilterBar}>
// //               <div style={{display:'flex', gap:'10px', flex: 1}}>
// //                 <input type="date" value={startDate} onChange={(e)=>setStartDate(e.target.value)} style={styles.modalDateInput} />
// //                 <input type="date" value={endDate} onChange={(e)=>setEndDate(e.target.value)} style={styles.modalDateInput} />
// //               </div>
// //               <div style={{display:'flex', gap:'5px'}}>
// //                 <button onClick={handleFilterApply} style={styles.applyBtn}>🔍 Filter</button>
// //                 <button onClick={handleFilterReset} style={styles.resetBtnSmall}>🔄 Reset</button>
// //               </div>
// //             </div>

// //             <div style={styles.logsTableWrapper}>
// //               <table style={{width:'100%', borderCollapse:'collapse'}}>
// //                 <thead style={{position:'sticky', top:0, background:'#f8fafc'}}>
// //                   <tr><th style={styles.thMini}>Time</th><th style={styles.thMini}>User</th><th style={styles.thMini}>Action</th><th style={styles.thMini}>Changes</th></tr>
// //                 </thead>
// //                 <tbody>
// //                   {logsLoading ? (
// //                     <tr><td colSpan="4" style={{textAlign:'center', padding:'20px'}}>Loading...</td></tr>
// //                   ) : currentLogs.length === 0 ? (
// //                     <tr><td colSpan="4" style={{textAlign:'center', padding:'20px'}}>No records found.</td></tr>
// //                   ) : (
// //                     currentLogs.map(log => (
// //                       <tr key={log._id} style={{borderBottom:'1px solid #f1f5f9'}}>
// //                         <td style={styles.tdMini}>{new Date(log.timestamp).toLocaleString()}</td>
// //                         <td style={{...styles.tdMini, fontWeight:'bold'}}>{log.actorName}</td>
// //                         <td style={styles.tdMini}>
// //                           <span style={{...styles.badge, background: log.action.includes('UPDATE') ? '#e0f2fe' : '#f3f4f6', color: log.action.includes('UPDATE') ? '#0369a1' : '#374151'}}>
// //                             {log.action}
// //                           </span>
// //                         </td>
// //                         <td style={{...styles.tdMini, fontSize:'12px'}}>{log.details}</td>
// //                       </tr>
// //                     ))
// //                   )}
// //                 </tbody>
// //               </table>
// //             </div>

// //             {/* 👇 PAGINATION CONTROLS */}
// //             {/* 👇 UPDATED PAGINATION CONTROLS */}
// //             {!logsLoading && productLogs.length > itemsPerPage && (
// //                 <div style={styles.paginationWrapper}>
// //                     <button 
// //                         onClick={() => paginate(currentPage - 1)} 
// //                         disabled={currentPage === 1}
// //                         style={currentPage === 1 ? styles.disabledBtn : styles.pageBtn}
// //                     >
// //                         Previous
// //                     </button>

// //                     <span style={styles.pageInfo}>
// //                         Page {currentPage} of {totalPages}
// //                     </span>

// //                     <button 
// //                         onClick={() => paginate(currentPage + 1)} 
// //                         disabled={currentPage === totalPages}
// //                         style={currentPage === totalPages ? styles.disabledBtn : styles.pageBtn}
// //                     >
// //                         Next
// //                     </button>
// //                 </div>
// //             )}

// //             <button onClick={()=>setShowHistory(false)} style={{...styles.cancelBtn, marginTop:'15px', width:'100%'}}>Close</button>
// //           </div>
// //         </div>
// //       )}

// //       {/* --- MODAL: EDIT FORM --- */}
// //       {isEditing && canEdit && (
// //         <div style={styles.overlay}>
// //           <div style={styles.modal}>
// //             <h3 style={{margin:'0 0 10px 0'}}>Edit Product</h3>
// //             <form onSubmit={handleSaveChanges} style={{display:'flex', flexDirection:'column', gap:'10px'}}>
// //               <div style={{display:'flex', gap:'10px'}}>
// //                  <div style={{flex: 1}}>
// //                     <label style={styles.label}>Cost Price</label>
// //                     <input type="number" value={editForm.costing_price} onChange={(e)=>setEditForm({...editForm, costing_price:e.target.value})} style={styles.input} required />
// //                  </div>
// //                  <div style={{flex: 1}}>
// //                     <label style={styles.label}>Selling Price</label>
// //                     <input type="number" value={editForm.price} onChange={(e)=>setEditForm({...editForm, price:e.target.value})} style={styles.input} required />
// //                  </div>
// //               </div>
// //               <label style={styles.label}>Supplier Name</label>
// //               <input type="text" value={editForm.Supplier_name} onChange={(e)=>setEditForm({...editForm, Supplier_name:e.target.value})} style={styles.input} required />
// //               <label style={styles.label}>Description</label>
// //               <textarea value={editForm.description} onChange={(e)=>setEditForm({...editForm, description:e.target.value})} style={styles.textarea} />
// //               <div style={{display:'flex', gap:'10px', marginTop:'10px'}}>
// //                 <button type="submit" style={styles.saveBtn}>Save</button>
// //                 <button type="button" onClick={()=>setIsEditing(false)} style={styles.cancelBtn}>Cancel</button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       )}

// //       {/* --- MODAL: DELETE CONFIRM --- */}
// //       {showDeleteModal && canEdit && (
// //         <div style={styles.overlay}>
// //           <div style={{...styles.modal, maxWidth: '350px', textAlign:'center'}}>
// //             <h3 style={{color: '#dc2626'}}>Delete Product?</h3>
// //             <p style={{fontSize:'13px'}}>Are you sure you want to delete <b>{product.name}</b> permanently?</p>
// //             <div style={{display:'flex', gap:'10px', marginTop:'20px'}}>
// //                 <button onClick={confirmDelete} style={{...styles.saveBtn, background: '#dc2626'}}>Yes, Delete</button>
// //                 <button onClick={()=>setShowDeleteModal(false)} style={styles.cancelBtn}>Cancel</button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // // InfoBox component (helper)
// // const InfoBox = ({ label, val, color }) => (
// //   <div style={{background:'#f8fafc', padding:'5px 8px', borderRadius:'4px', border:'1px solid #e2e8f0'}}>
// //     <div style={{fontSize:'10px', color:'#64748b', fontWeight:'700', textTransform:'uppercase'}}>{label}</div>
// //     <div style={{fontSize:'13px', fontWeight:'600', color: color || '#334155'}}>{val}</div>
// //   </div>
// // );

// // // ✨ STYLES
// // const styles = {
// //   container: { height: "100vh", width: "100%", overflow: "hidden", backgroundColor: "#f1f5f9", display: "flex", flexDirection: "column", fontFamily: "'Inter', sans-serif" },
// //   centerMsg: { display:'flex', height:'100vh', alignItems:'center', justifyContent:'center', color:'#666' },
// //   mainContent: { flex: 1, padding: "10px 20px", display: "flex", flexDirection: "column", gap: "10px", overflow: "hidden" },
// //   navBar: { display:'flex', justifyContent:'space-between', height: '35px', alignItems:'center', flexShrink: 0 },
// //   backBtn: { background:'none', border:'none', color:'#64748b', cursor:'pointer', fontWeight:'600', fontSize:'13px' },
  
// //   headerEditBtn: { background:'#2563eb', color:'#fff', border:'none', borderRadius:'4px', padding:'5px 12px', fontSize:'12px', cursor:'pointer' },
// //   headerDelBtn: { background:'#fff', color:'#dc2626', border:'1px solid #fca5a5', borderRadius:'4px', padding:'5px 12px', fontSize:'12px', cursor:'pointer' },

// //   excelBtn: { background:'#107c41', color:'#fff', border:'none', borderRadius:'4px', padding:'5px 12px', fontSize:'12px', cursor:'pointer' },
// //   historyBtn: { background:'#475569', color:'#fff', border:'none', borderRadius:'4px', padding:'5px 12px', fontSize:'12px', cursor:'pointer' },
// //   productCard: { display: "flex", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", overflow: "hidden", flex: 1, border: "1px solid #e2e8f0", minHeight: 0 },
// //   leftCol: { width: "30%", minWidth: "250px", backgroundColor: "#f8fafc", padding: "15px", borderRight: "1px solid #e2e8f0", display: "flex", flexDirection: "column", gap: "10px", overflowY: "auto" },
// //   imgWrapper: { position:'relative', background:'#fff', borderRadius:'6px', border:'1px solid #e2e8f0', padding:'5px', textAlign:'center', flex: 1, display:'flex', alignItems:'center', justifyContent:'center', minHeight: "200px" },
// //   productImg: { maxWidth:'100%', maxHeight:'100%', objectFit:'contain' },
// //   iconBtn: { position:'absolute', top:'5px', right:'5px', background:'#eee', border:'none', borderRadius:'50%', width:'24px', height:'24px', cursor:'pointer' },
// //   barcodeWrapper: { background:'#fff', padding:'5px', borderRadius:'6px', border:'1px dashed #ccc', textAlign:'center', flexShrink: 0 },
// //   barcodeImg: { height:'35px', maxWidth:'100%' },
// //   miniLink: { fontSize:'10px', color:'#2563eb', background:'none', border:'none', cursor:'pointer', textDecoration:'underline' },
// //   rightCol: { width: "70%", padding: "15px", display: "flex", flexDirection: "column", overflowY: "auto" },
// //   headerRow: { display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexShrink: 0 },
// //   title: { fontSize:'20px', margin:0, color:'#1e293b', fontWeight:'700' },
// //   sku: { fontSize:'12px', color:'#64748b', background:'#f1f5f9', padding:'2px 6px', borderRadius:'4px' },
// //   price: { fontSize:'22px', fontWeight:'800', color:'#059669' },
// //   gst: { fontSize:'11px', color:'#64748b' },
// //   divider: { border:'0', borderTop:'1px solid #e2e8f0', margin:'10px 0' },
// //   infoGrid: { display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'8px', marginBottom:'10px', flexShrink: 0 },
// //   splitRow: { display: "flex", gap: "15px", flex: 1, minHeight: "0", marginBottom: "5px" },
// //   descBox: { flex: 2, background:'#fdfdfd', border:'1px solid #f1f5f9', borderRadius:'6px', padding:'10px', overflowY:'auto' },
// //   skuBoxRight: { flex: 1, background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
// //   label: { fontSize:'11px', fontWeight:'700', color:'#475569', display:'block', marginBottom:'3px' },
// //   descText: { fontSize:'13px', margin:0, color:'#334155', lineHeight:'1.4' },
  
// //   overlay: { position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.5)', display:'flex', justifyContent:'center', alignItems:'center', zIndex:100 },
// //   modal: { background:'#fff', padding:'20px', borderRadius:'8px', width:'750px', boxShadow: "0 10px 25px rgba(0,0,0,0.1)" },
// //   logsTableWrapper: { maxHeight: '300px', overflowY: 'auto', border: '1px solid #f1f5f9', marginTop: '10px' },
// //   thMini: { padding: "10px", textAlign: "left", fontSize: "11px", color: "#64748b", textTransform: "uppercase", background: "#f8fafc" },
// //   tdMini: { padding: "10px", fontSize: "13px", color: "#334155" },
// //   badge: { padding: "2px 6px", borderRadius: "4px", fontSize: "11px", fontWeight: "bold" },
// //   input: { padding:'8px', width:'100%', borderRadius:'4px', border:'1px solid #ccc', fontSize:'13px', boxSizing:'border-box' },
// //   textarea: { padding:'8px', width:'100%', height:'60px', borderRadius:'4px', border:'1px solid #ccc', fontSize:'13px', resize:'none', boxSizing:'border-box' },
// //   saveBtn: { flex:1, background:'#16a34a', color:'#fff', border:'none', padding:'8px', borderRadius:'4px', cursor:'pointer' },
// //   cancelBtn: { flex:1, background:'#f1f5f9', color:'#333', border:'1px solid #ccc', padding:'8px', borderRadius:'4px', cursor:'pointer' },
// //   modalFilterBar: { display: 'flex', gap: '10px', marginBottom: '15px', background: '#f8fafc', padding: '10px', borderRadius: '8px' },
// //   modalDateInput: { padding: '5px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '12px', outline: 'none' },
// //   applyBtn: { background: '#2563eb', color: '#fff', border: 'none', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' },
// //   resetBtnSmall: { background: '#fff', color: '#64748b', border: '1px solid #cbd5e1', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' },

// //   // 👇 New Styles for Pagination
// //   // paginationWrapper: { display: 'flex', justifyContent: 'center', gap: '5px', marginTop: '15px' },
// //   // pageBtn: { background: '#fff', border: '1px solid #cbd5e1', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', color: '#64748b', fontSize: '12px' },
// //   // activePageBtn: { background: '#2563eb', border: '1px solid #2563eb', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', color: '#fff', fontSize: '12px', fontWeight: 'bold' },
// // // 👇 New Styles for Updated Pagination
// //   paginationWrapper: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '15px' },
  
// //   pageBtn: { background: '#2563eb', border: '1px solid #2563eb', padding: '6px 14px', borderRadius: '4px', cursor: 'pointer', color: '#fff', fontSize: '12px', fontWeight: '600' },
  
// //   disabledBtn: { background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '6px 14px', borderRadius: '4px', cursor: 'not-allowed', color: '#94a3b8', fontSize: '12px' },
  
// //   pageInfo: { fontSize: '13px', fontWeight: '600', color: '#334155' },
// // };

// // export default ProductDetails;




































// import React, { useEffect, useState, useCallback } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import api from "../api/axios";
// import SkuUpdate from "../components/SkuUpdate";
// import toast from "react-hot-toast";
// import Header from "../components/Header";
// import * as XLSX from "xlsx";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // --- 📅 HISTORY & DATE STATES ---
//   const [showHistory, setShowHistory] = useState(false);
//   const [productLogs, setProductLogs] = useState([]);
//   const [logsLoading, setLogsLoading] = useState(false);
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   // --- 📄 PAGINATION STATES (NEW) ---
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 20; // Har page par 10 record dikhenge

//   // --- MODAL & EDIT STATES ---
//   const [isEditing, setIsEditing] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [editForm, setEditForm] = useState({
//     price: "", costing_price: "", description: "", Supplier_name: ""
//   });
//   const [showImageModal, setShowImageModal] = useState(false);
//   const [activeImage, setActiveImage] = useState("");


//   const user = useSelector((state) => state.user.userData);
//   const isAdmin = user?.userType === "admin";
//   const isSuperUser = user?.userType === "superuser";
//   const canEdit = isAdmin || isSuperUser;

//   // --- FETCH PRODUCT DATA ---
//   const fetchProduct = useCallback(async () => {
//     try {
//       const res = await api.get(`/products/${id}`);
//       setProduct(res.data);
//       setLoading(false);
//     } catch (error) {
//       toast.error("Error fetching product details");
//       setLoading(false);
//     }
//   }, [id]);

//   useEffect(() => {
//     fetchProduct();
//   }, [fetchProduct]);

//   // --- 🔍 HISTORY LOGIC ---
//   const fetchProductHistory = async (sDate = "", eDate = "") => {
//     if (!canEdit) {
//       toast.error("Access Denied: Only Admin can view history.");
//       return;
//     }

//     if (!product || !product.sku) {
//       toast.error("Product data not loaded yet.");
//       return;
//     }
//     setShowHistory(true);
//     setLogsLoading(true);
//     setCurrentPage(1); // Jab bhi history open/filter ho, page 1 se start ho
//     try {
//       const res = await api.get(`/logs/product/${id}`, {
//         params: { sku: product.sku, startDate: sDate, endDate: eDate }
//       });
//       setProductLogs(res.data);
//     } catch (error) {
//       toast.error("Failed to load history");
//     } finally {
//       setLogsLoading(false);
//     }
//   };

//   const handleFilterApply = () => {
//     if (!startDate || !endDate) return toast.error("Select both dates");
//     fetchProductHistory(startDate, endDate);
//   };

//   const handleFilterReset = () => {
//     setStartDate("");
//     setEndDate("");
//     fetchProductHistory("", "");
//   };

//   // --- 📄 PAGINATION LOGIC (CALCULATION) ---
//   const indexOfLastLog = currentPage * itemsPerPage;
//   const indexOfFirstLog = indexOfLastLog - itemsPerPage;
//   const currentLogs = productLogs.slice(indexOfFirstLog, indexOfLastLog);
//   const totalPages = Math.ceil(productLogs.length / itemsPerPage);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   // --- ✏️ EDIT HANDLERS ---
//   const handleEditClick = () => {
//     if (!canEdit) return toast.error("Permission Denied");
//     setEditForm({
//       price: product.price,
//       costing_price: product.costing_price,
//       description: product.description || "",
//       Supplier_name: product.Supplier_name || ""
//     });
//     setIsEditing(true);
//   };

//   const handleSaveChanges = async (e) => {
//     e.preventDefault();
//     try {
//       await api.put(`/products/${id}`, editForm);
//       toast.success("Product Updated Successfully!");
//       setIsEditing(false);
//       fetchProduct();
//     } catch (error) {
//       toast.error("Update failed");
//     }
//   };

//   // --- 🗑️ DELETE HANDLER ---
//   const confirmDelete = async () => {
//     try {
//       await api.delete(`/products/${id}`);
//       toast.success("Product Deleted Successfully");
//       navigate("/dashboard");
//     } catch (error) {
//       toast.error("Failed to delete product");
//     }
//     setShowDeleteModal(false);
//   };

//   // --- 📥 EXCEL & IMAGE LOGIC ---
//   const downloadOneProductExcel = () => {
//     if (!product) return;
//     const dataToExport = [{ "Product Name": product.name, SKU: product.sku, Price: product.price, Stock: product.Qty }];
//     const worksheet = XLSX.utils.json_to_sheet(dataToExport);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Details");
//     XLSX.writeFile(workbook, `${product.sku}_Details.xlsx`);
//   };

//   const downloadImage = async (imageUrl, fileName) => {
//     try {
//       const response = await fetch(imageUrl);
//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = fileName || "download.jpg";
//       link.click();
//     } catch (error) { toast.error("Download failed"); }
//   };

//   if (loading) return <div style={styles.centerMsg}>Loading...</div>;
//   if (!product) return <div style={styles.centerMsg}>Not Found</div>;

//   return (
//     <div style={styles.container}>
//       <Header />
//       <div style={styles.mainContent}>
//         <div style={styles.navBar}>
//           <button onClick={() => navigate("/dashboard")} style={styles.backBtn}>⬅ Back</button>

//           <div style={{ display: 'flex', gap: '10px' }}>
//             {canEdit && (
//               <>
//                 <button onClick={handleEditClick} style={styles.headerEditBtn}>✏️ Edit</button>
//                 <button onClick={() => setShowDeleteModal(true)} style={styles.headerDelBtn}>🗑 Delete</button>
//                 <button onClick={() => fetchProductHistory("", "")} style={styles.historyBtn}>📜 History</button>
//               </>
//             )}
//             <button onClick={downloadOneProductExcel} style={styles.excelBtn}>📥 Excel</button>
//           </div>
//         </div>

//         <div style={styles.productCard}>
//           <div style={styles.leftCol}>
//             <div style={styles.imgWrapper}>
//               {/* <img src={product.img} alt={product.name} style={styles.productImg} />
//                */}
//               <img
//                 src={product.img}
//                 alt={product.name}
//                 style={{ ...styles.productImg, cursor: "zoom-in" }}
//                 onClick={() => {
//                   setActiveImage(product.img);
//                   setShowImageModal(true);
//                 }}
//               />

//               <button onClick={() => downloadImage(product.img, `${product.name}.jpg`)} style={styles.iconBtn}>⬇</button>
//             </div>
//             {product.barcodeImg && (
//               <div style={styles.barcodeWrapper}>
//                 {/* <img src={product.barcodeImg} alt="Barcode" style={styles.barcodeImg} /> */}
//                 <img
//                   src={product.barcodeImg}
//                   alt="Barcode"
//                   style={{ ...styles.barcodeImg, cursor: "zoom-in" }}
//                   onClick={() => {
//                     setActiveImage(product.barcodeImg);
//                     setShowImageModal(true);
//                   }}
//                 />

//                 <button onClick={() => downloadImage(product.barcodeImg, `${product.sku}.jpg`)} style={styles.miniLink}>Download QR</button>
//               </div>
//             )}
//           </div>

//           <div style={styles.rightCol}>
//             <div style={styles.headerRow}>
//               <div>
//                 <h2 style={styles.title}>{product.name}</h2>
//                 <span style={styles.sku}>SKU: {product.sku}</span>
//               </div>
//               <div style={{ textAlign: 'right' }}>
//                 <div style={styles.price}> MRP₹{product.price}</div>
//               </div>
//             </div>
//             <hr style={styles.divider} />
//             <div style={styles.infoGrid}>
//               <InfoBox label="Category" val={product.category} />
//               <InfoBox label="Color" val={product.color} />
//               <InfoBox label="Size" val={product.size} />
//               <InfoBox label="Stock" val={product.Qty} color={product.Qty < 5 ? 'red' : 'green'} />
//               <InfoBox label="Cost" val={canEdit ? `₹${product.costing_price}` : "--"} />
//               <InfoBox label="gst" val={canEdit ? `${product.gst}% GST` : "--"} />
//               <InfoBox label="Supplier" val={canEdit ? product.Supplier_name : "--"} />
//             </div>

//             <div style={styles.splitRow}>
//               <div style={styles.descBox}>
//                 <span style={styles.label}>Description:</span>
//                 <p style={styles.descText}>{product.description || "No description."}</p>
//               </div>
//               {canEdit && (
//                 <div style={styles.skuBoxRight}>
//                   <SkuUpdate onUpdated={fetchProduct} prefillProduct={product} />
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* --- MODAL: PRODUCT HISTORY WITH PAGINATION --- */}
//       {showHistory && canEdit && (
//         <div style={styles.overlay}>
//           <div style={{ ...styles.modal, width: '750px', maxWidth: '95%' }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
//               <h3 style={{ margin: 0 }}>Product Audit Trail</h3>
//               <button onClick={() => setShowHistory(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '20px' }}>×</button>
//             </div>

//             <div style={styles.modalFilterBar}>
//               <div style={{ display: 'flex', gap: '10px', flex: 1 }}>
//                 <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={styles.modalDateInput} />
//                 <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={styles.modalDateInput} />
//               </div>
//               <div style={{ display: 'flex', gap: '5px' }}>
//                 <button onClick={handleFilterApply} style={styles.applyBtn}>🔍 Filter</button>
//                 <button onClick={handleFilterReset} style={styles.resetBtnSmall}>🔄 Reset</button>
//               </div>
//             </div>

//             <div style={styles.logsTableWrapper}>
//               <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                 <thead style={{ position: 'sticky', top: 0, background: '#f8fafc' }}>
//                   <tr><th style={styles.thMini}>Time</th><th style={styles.thMini}>User</th><th style={styles.thMini}>Action</th><th style={styles.thMini}>Changes</th></tr>
//                 </thead>
//                 <tbody>
//                   {logsLoading ? (
//                     <tr><td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>Loading...</td></tr>
//                   ) : currentLogs.length === 0 ? (
//                     <tr><td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>No records found.</td></tr>
//                   ) : (
//                     currentLogs.map(log => (
//                       <tr key={log._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
//                         <td style={styles.tdMini}>{new Date(log.timestamp).toLocaleString()}</td>
//                         <td style={{ ...styles.tdMini, fontWeight: 'bold' }}>{log.actorName}</td>
//                         <td style={styles.tdMini}>
//                           <span style={{ ...styles.badge, background: log.action.includes('UPDATE') ? '#e0f2fe' : '#f3f4f6', color: log.action.includes('UPDATE') ? '#0369a1' : '#374151' }}>
//                             {log.action}
//                           </span>
//                         </td>
//                         <td style={{ ...styles.tdMini, fontSize: '12px' }}>{log.details}</td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             {/* 👇 PAGINATION CONTROLS */}
//             {/* 👇 UPDATED PAGINATION CONTROLS */}
//             {!logsLoading && productLogs.length > itemsPerPage && (
//               <div style={styles.paginationWrapper}>
//                 <button
//                   onClick={() => paginate(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   style={currentPage === 1 ? styles.disabledBtn : styles.pageBtn}
//                 >
//                   Previous
//                 </button>

//                 <span style={styles.pageInfo}>
//                   Page {currentPage} of {totalPages}
//                 </span>

//                 <button
//                   onClick={() => paginate(currentPage + 1)}
//                   disabled={currentPage === totalPages}
//                   style={currentPage === totalPages ? styles.disabledBtn : styles.pageBtn}
//                 >
//                   Next
//                 </button>
//               </div>
//             )}

//             <button onClick={() => setShowHistory(false)} style={{ ...styles.cancelBtn, marginTop: '15px', width: '100%' }}>Close</button>
//           </div>
//         </div>
//       )}

//       {/* --- MODAL: EDIT FORM --- */}
//       {isEditing && canEdit && (
//         <div style={styles.overlay}>
//           <div style={styles.modal}>
//             <h3 style={{ margin: '0 0 10px 0' }}>Edit Product</h3>
//             <form onSubmit={handleSaveChanges} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
//               <div style={{ display: 'flex', gap: '10px' }}>
//                 <div style={{ flex: 1 }}>
//                   <label style={styles.label}>Cost Price</label>
//                   <input type="number" value={editForm.costing_price} onChange={(e) => setEditForm({ ...editForm, costing_price: e.target.value })} style={styles.input} required />
//                 </div>
//                 <div style={{ flex: 1 }}>
//                   <label style={styles.label}>Selling Price</label>
//                   <input type="number" value={editForm.price} onChange={(e) => setEditForm({ ...editForm, price: e.target.value })} style={styles.input} required />
//                 </div>
//               </div>
//               <label style={styles.label}>Supplier Name</label>
//               <input type="text" value={editForm.Supplier_name} onChange={(e) => setEditForm({ ...editForm, Supplier_name: e.target.value })} style={styles.input} required />
//               <label style={styles.label}>Description</label>
//               <textarea value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} style={styles.textarea} />
//               <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
//                 <button type="submit" style={styles.saveBtn}>Save</button>
//                 <button type="button" onClick={() => setIsEditing(false)} style={styles.cancelBtn}>Cancel</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* --- MODAL: DELETE CONFIRM --- */}
//       {showDeleteModal && canEdit && (
//         <div style={styles.overlay}>
//           <div style={{ ...styles.modal, maxWidth: '350px', textAlign: 'center' }}>
//             <h3 style={{ color: '#dc2626' }}>Delete Product?</h3>
//             <p style={{ fontSize: '13px' }}>Are you sure you want to delete <b>{product.name}</b> permanently?</p>
//             <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
//               <button onClick={confirmDelete} style={{ ...styles.saveBtn, background: '#dc2626' }}>Yes, Delete</button>
//               <button onClick={() => setShowDeleteModal(false)} style={styles.cancelBtn}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showImageModal && (
//         <div
//           style={{
//             position: "fixed",
//             inset: 0,
//             background: "#ffff",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             zIndex: 9999
//           }}
//           onClick={() => setShowImageModal(false)}
//         >
//           <img
//             src={activeImage}
//             alt="Preview"
//             style={{
//               maxWidth: "95%",
//               maxHeight: "95%",
//               objectFit: "contain",
//               borderRadius: "8px",
//               boxShadow: "0 0 40px rgba(0,0,0,0.6)"
//             }}
//           />
//         </div>
//       )}

//     </div>
//   );
// };

// // InfoBox component (helper)
// const InfoBox = ({ label, val, color }) => (
//   <div style={{ background: '#f8fafc', padding: '5px 8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
//     <div style={{ fontSize: '10px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase' }}>{label}</div>
//     <div style={{ fontSize: '13px', fontWeight: '600', color: color || '#334155' }}>{val}</div>
//   </div>
// );

// // ✨ STYLES
// const styles = {
//   container: { height: "100vh", width: "100%", overflow: "hidden", backgroundColor: "#f1f5f9", display: "flex", flexDirection: "column", fontFamily: "'Inter', sans-serif" },
//   centerMsg: { display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', color: '#666' },
//   mainContent: { flex: 1, padding: "10px 20px", display: "flex", flexDirection: "column", gap: "10px", overflow: "hidden" },
//   navBar: { display: 'flex', justifyContent: 'space-between', height: '35px', alignItems: 'center', flexShrink: 0 },
//   backBtn: { background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontWeight: '600', fontSize: '13px' },

//   headerEditBtn: { background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', padding: '5px 12px', fontSize: '12px', cursor: 'pointer' },
//   headerDelBtn: { background: '#fff', color: '#dc2626', border: '1px solid #fca5a5', borderRadius: '4px', padding: '5px 12px', fontSize: '12px', cursor: 'pointer' },

//   excelBtn: { background: '#107c41', color: '#fff', border: 'none', borderRadius: '4px', padding: '5px 12px', fontSize: '12px', cursor: 'pointer' },
//   historyBtn: { background: '#475569', color: '#fff', border: 'none', borderRadius: '4px', padding: '5px 12px', fontSize: '12px', cursor: 'pointer' },
//   productCard: { display: "flex", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", overflow: "hidden", flex: 1, border: "1px solid #e2e8f0", minHeight: 0 },
//   leftCol: { width: "30%", minWidth: "250px", backgroundColor: "#f8fafc", padding: "15px", borderRight: "1px solid #e2e8f0", display: "flex", flexDirection: "column", gap: "10px", overflowY: "auto" },
//   imgWrapper: { position: 'relative', background: '#fff', borderRadius: '6px', border: '1px solid #e2e8f0', padding: '5px', textAlign: 'center', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: "200px" },
//   productImg: { maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' },
//   iconBtn: { position: 'absolute', top: '5px', right: '5px', background: '#eee', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer' },
//   barcodeWrapper: { background: '#fff', padding: '5px', borderRadius: '6px', border: '1px dashed #ccc', textAlign: 'center', flexShrink: 0 },
//   barcodeImg: { height: '35px', maxWidth: '100%' },
//   miniLink: { fontSize: '10px', color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' },
//   rightCol: { width: "70%", padding: "15px", display: "flex", flexDirection: "column", overflowY: "auto" },
//   headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexShrink: 0 },
//   title: { fontSize: '20px', margin: 0, color: '#1e293b', fontWeight: '700' },
//   sku: { fontSize: '12px', color: '#64748b', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' },
//   price: { fontSize: '22px', fontWeight: '800', color: '#059669' },
//   gst: { fontSize: '11px', color: '#64748b' },
//   divider: { border: '0', borderTop: '1px solid #e2e8f0', margin: '10px 0' },
//   infoGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '10px', flexShrink: 0 },
//   splitRow: { display: "flex", gap: "15px", flex: 1, minHeight: "0", marginBottom: "5px" },
//   descBox: { flex: 2, background: '#fdfdfd', border: '1px solid #f1f5f9', borderRadius: '6px', padding: '10px', overflowY: 'auto' },
//   skuBoxRight: { flex: 1, background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
//   label: { fontSize: '11px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '3px' },
//   descText: { fontSize: '13px', margin: 0, color: '#334155', lineHeight: '1.4' },

//   overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 },
//   modal: { background: '#fff', padding: '20px', borderRadius: '8px', width: '750px', boxShadow: "0 10px 25px rgba(0,0,0,0.1)" },
//   logsTableWrapper: { maxHeight: '300px', overflowY: 'auto', border: '1px solid #f1f5f9', marginTop: '10px' },
//   thMini: { padding: "10px", textAlign: "left", fontSize: "11px", color: "#64748b", textTransform: "uppercase", background: "#f8fafc" },
//   tdMini: { padding: "10px", fontSize: "13px", color: "#334155" },
//   badge: { padding: "2px 6px", borderRadius: "4px", fontSize: "11px", fontWeight: "bold" },
//   input: { padding: '8px', width: '100%', borderRadius: '4px', border: '1px solid #ccc', fontSize: '13px', boxSizing: 'border-box' },
//   textarea: { padding: '8px', width: '100%', height: '60px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '13px', resize: 'none', boxSizing: 'border-box' },
//   saveBtn: { flex: 1, background: '#16a34a', color: '#fff', border: 'none', padding: '8px', borderRadius: '4px', cursor: 'pointer' },
//   cancelBtn: { flex: 1, background: '#f1f5f9', color: '#333', border: '1px solid #ccc', padding: '8px', borderRadius: '4px', cursor: 'pointer' },
//   modalFilterBar: { display: 'flex', gap: '10px', marginBottom: '15px', background: '#f8fafc', padding: '10px', borderRadius: '8px' },
//   modalDateInput: { padding: '5px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '12px', outline: 'none' },
//   applyBtn: { background: '#2563eb', color: '#fff', border: 'none', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' },
//   resetBtnSmall: { background: '#fff', color: '#64748b', border: '1px solid #cbd5e1', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' },

//   // 👇 New Styles for Pagination
//   // paginationWrapper: { display: 'flex', justifyContent: 'center', gap: '5px', marginTop: '15px' },
//   // pageBtn: { background: '#fff', border: '1px solid #cbd5e1', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', color: '#64748b', fontSize: '12px' },
//   // activePageBtn: { background: '#2563eb', border: '1px solid #2563eb', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', color: '#fff', fontSize: '12px', fontWeight: 'bold' },
//   // 👇 New Styles for Updated Pagination
//   paginationWrapper: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '15px' },

//   pageBtn: { background: '#2563eb', border: '1px solid #2563eb', padding: '6px 14px', borderRadius: '4px', cursor: 'pointer', color: '#fff', fontSize: '12px', fontWeight: '600' },

//   disabledBtn: { background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '6px 14px', borderRadius: '4px', cursor: 'not-allowed', color: '#94a3b8', fontSize: '12px' },

//   pageInfo: { fontSize: '13px', fontWeight: '600', color: '#334155' },
// };
// export default ProductDetails;






























import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../api/axios";
import axios from "axios"; // 🔥 Import axios for upload (agar api instance se na ho to)
import SkuUpdate from "../components/SkuUpdate";
import toast from "react-hot-toast";
import Header from "../components/Header";
import * as XLSX from "xlsx";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- 📅 HISTORY & DATE STATES ---
  const [showHistory, setShowHistory] = useState(false);
  const [productLogs, setProductLogs] = useState([]);
  const [logsLoading, setLogsLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // --- 📄 PAGINATION STATES ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // --- MODAL & EDIT STATES ---
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  // 🔥 NEW: Image Upload States
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);

  const [editForm, setEditForm] = useState({
    price: "", costing_price: "", description: "", Supplier_name: "", img: "" // 🔥 img added
  });
  
  const [showImageModal, setShowImageModal] = useState(false);
  const [activeImage, setActiveImage] = useState("");


  const user = useSelector((state) => state.user.userData);
  const isAdmin = user?.userType === "admin";
  const isSuperUser = user?.userType === "superuser";
  const canEdit = isAdmin || isSuperUser;

  // --- FETCH PRODUCT DATA ---
  const fetchProduct = useCallback(async () => {
    try {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
      setLoading(false);
    } catch (error) {
      toast.error("Error fetching product details");
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  // --- 🔍 HISTORY LOGIC ---
  const fetchProductHistory = async (sDate = "", eDate = "") => {
    if (!canEdit) {
      toast.error("Access Denied: Only Admin can view history.");
      return;
    }

    if (!product || !product.sku) {
      toast.error("Product data not loaded yet.");
      return;
    }
    setShowHistory(true);
    setLogsLoading(true);
    setCurrentPage(1);
    try {
      const res = await api.get(`/logs/product/${id}`, {
        params: { sku: product.sku, startDate: sDate, endDate: eDate }
      });
      setProductLogs(res.data);
    } catch (error) {
      toast.error("Failed to load history");
    } finally {
      setLogsLoading(false);
    }
  };

  const handleFilterApply = () => {
    if (!startDate || !endDate) return toast.error("Select both dates");
    fetchProductHistory(startDate, endDate);
  };

  const handleFilterReset = () => {
    setStartDate("");
    setEndDate("");
    fetchProductHistory("", "");
  };

  // --- 📄 PAGINATION LOGIC ---
  const indexOfLastLog = currentPage * itemsPerPage;
  const indexOfFirstLog = indexOfLastLog - itemsPerPage;
  const currentLogs = productLogs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(productLogs.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // --- ✏️ EDIT HANDLERS ---
  const handleEditClick = () => {
    if (!canEdit) return toast.error("Permission Denied");
    setEditForm({
      price: product.price,
      costing_price: product.costing_price,
      description: product.description || "",
      Supplier_name: product.Supplier_name || "",
      img: product.img || "" // 🔥 Existing image set ki
    });
    setPreview(product.img || ""); // 🔥 Preview me bhi purani image dikhao
    setIsEditing(true);
  };

  // 🔥 NEW: Image Upload Logic (Same as ProductForm)
  const handleImageSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploading(true);
    
    // Local Preview
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);

    try {
      const imgData = new FormData();
      imgData.append("image", file);
      
      // Upload Call
      const res = await axios.post("http://localhost:7000/api/products/upload", imgData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      
      // Update Form State with new URL
      setEditForm((prev) => ({ ...prev, img: res.data.url }));
      toast.success("Image uploaded!");
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    if (uploading) return toast.error("Please wait for image upload to finish.");
    
    try {
      await api.put(`/products/${id}`, editForm);
      toast.success("Product Updated Successfully!");
      setIsEditing(false);
      fetchProduct();
    } catch (error) {
      toast.error("Update failed");
    }
  };

  // --- 🗑️ DELETE HANDLER ---
  const confirmDelete = async () => {
    try {
      await api.delete(`/products/${id}`);
      toast.success("Product Deleted Successfully");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to delete product");
    }
    setShowDeleteModal(false);
  };

  // --- 📥 EXCEL DOWNLOAD UPDATED ---
  const downloadOneProductExcel = () => {
    if (!product) return;

    // 🔥 Wahi same format jo Home.jsx me use kiya hai
    const dataToExport = [{
      Name: product.name, 
      SKU: product.sku, 
      Description: product.description || "-", 
      Category: product.category, 
      Color: product.color, 
      Size: product.size,
      Price: product.price, 
      GST: product.gst ? `${product.gst}%` : "0%",
      "Cost Price": canEdit ? product.costing_price : "N/A", 
      Stock: product.Qty,
      Supplier: canEdit ? product.Supplier_name : "N/A", 
      Status: product.Qty > 0 ? "In Stock" : "Out of Stock",
      "Product Image URL": product.img || "No Image", 
      "Barcode Image URL": product.barcodeImg || "No Barcode"
    }];

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Details");
    XLSX.writeFile(workbook, `${product.sku}_Details.xlsx`);
  };

  const downloadImage = async (imageUrl, fileName) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName || "download.jpg";
      link.click();
    } catch (error) { toast.error("Download failed"); }
  };

  if (loading) return <div style={styles.centerMsg}>Loading...</div>;
  if (!product) return <div style={styles.centerMsg}>Not Found</div>;

  return (
    <div style={styles.container}>
      <Header />
      <div style={styles.mainContent}>
        <div style={styles.navBar}>
          <button onClick={() => navigate("/dashboard")} style={styles.backBtn}>⬅ Back</button>

          <div style={{ display: 'flex', gap: '10px' }}>
            {canEdit && (
              <>
                <button onClick={handleEditClick} style={styles.headerEditBtn}>✏️ Edit</button>
                <button onClick={() => setShowDeleteModal(true)} style={styles.headerDelBtn}>🗑 Delete</button>
                <button onClick={() => fetchProductHistory("", "")} style={styles.historyBtn}>📜 History</button>
              </>
            )}
            <button onClick={downloadOneProductExcel} style={styles.excelBtn}>📥 Excel</button>
          </div>
        </div>

        <div style={styles.productCard}>
          <div style={styles.leftCol}>
            <div style={styles.imgWrapper}>
              <img
                src={product.img}
                alt={product.name}
                style={{ ...styles.productImg, cursor: "zoom-in" }}
                onClick={() => {
                  setActiveImage(product.img);
                  setShowImageModal(true);
                }}
              />
              <button onClick={() => downloadImage(product.img, `${product.name}.jpg`)} style={styles.iconBtn}>⬇</button>
            </div>
            {product.barcodeImg && (
              <div style={styles.barcodeWrapper}>
                <img
                  src={product.barcodeImg}
                  alt="Barcode"
                  style={{ ...styles.barcodeImg, cursor: "zoom-in" }}
                  onClick={() => {
                    setActiveImage(product.barcodeImg);
                    setShowImageModal(true);
                  }}
                />
                <button onClick={() => downloadImage(product.barcodeImg, `${product.sku}.jpg`)} style={styles.miniLink}>Download QR</button>
              </div>
            )}
          </div>

          <div style={styles.rightCol}>
            <div style={styles.headerRow}>
              <div>
                <h2 style={styles.title}>{product.name}</h2>
                <span style={styles.sku}>SKU: {product.sku}</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={styles.price}>MRP: ₹{product.price}</div>
              </div>
            </div>
            <hr style={styles.divider} />
            <div style={styles.infoGrid}>
              <InfoBox label="Category" val={product.category} />
              <InfoBox label="Color" val={product.color} />
              <InfoBox label="Size" val={product.size} />
              <InfoBox label="Stock" val={product.Qty} color={product.Qty < 5 ? 'red' : 'green'} />
              <InfoBox label="Cost" val={canEdit ? `₹${product.costing_price}` : "--"} />
              <InfoBox label="gst" val={canEdit ? `${product.gst}% GST` : "--"} />
              <InfoBox label="Supplier" val={canEdit ? product.Supplier_name : "--"} />
            </div>

            <div style={styles.splitRow}>
              <div style={styles.descBox}>
                <span style={styles.label}>Description:</span>
                <p style={styles.descText}>{product.description || "No description."}</p>
              </div>
              {canEdit && (
                <div style={styles.skuBoxRight}>
                  <SkuUpdate onUpdated={fetchProduct} prefillProduct={product} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- MODAL: PRODUCT HISTORY --- */}
      {showHistory && canEdit && (
        <div style={styles.overlay}>
          <div style={{ ...styles.modal, width: '750px', maxWidth: '95%' }}>
            {/* ... History Modal Content Same as before ... */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3 style={{ margin: 0 }}>Product Audit Trail</h3>
              <button onClick={() => setShowHistory(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '20px' }}>×</button>
            </div>
            
            {/* Filter Bar */}
            <div style={styles.modalFilterBar}>
              <div style={{ display: 'flex', gap: '10px', flex: 1 }}>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={styles.modalDateInput} />
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={styles.modalDateInput} />
              </div>
              <div style={{ display: 'flex', gap: '5px' }}>
                <button onClick={handleFilterApply} style={styles.applyBtn}>🔍 Filter</button>
                <button onClick={handleFilterReset} style={styles.resetBtnSmall}>🔄 Reset</button>
              </div>
            </div>

            <div style={styles.logsTableWrapper}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ position: 'sticky', top: 0, background: '#f8fafc' }}>
                  <tr><th style={styles.thMini}>Time</th><th style={styles.thMini}>User</th><th style={styles.thMini}>Action</th><th style={styles.thMini}>Changes</th></tr>
                </thead>
                <tbody>
                  {logsLoading ? (
                    <tr><td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>Loading...</td></tr>
                  ) : currentLogs.length === 0 ? (
                    <tr><td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>No records found.</td></tr>
                  ) : (
                    currentLogs.map(log => (
                      <tr key={log._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={styles.tdMini}>{new Date(log.timestamp).toLocaleString()}</td>
                        <td style={{ ...styles.tdMini, fontWeight: 'bold' }}>{log.actorName}</td>
                        <td style={styles.tdMini}>
                          <span style={{ ...styles.badge, background: log.action.includes('UPDATE') ? '#e0f2fe' : '#f3f4f6', color: log.action.includes('UPDATE') ? '#0369a1' : '#374151' }}>
                            {log.action}
                          </span>
                        </td>
                        <td style={{ ...styles.tdMini, fontSize: '12px' }}>{log.details}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {!logsLoading && productLogs.length > itemsPerPage && (
              <div style={styles.paginationWrapper}>
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} style={currentPage === 1 ? styles.disabledBtn : styles.pageBtn}>Previous</button>
                <span style={styles.pageInfo}>Page {currentPage} of {totalPages}</span>
                <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} style={currentPage === totalPages ? styles.disabledBtn : styles.pageBtn}>Next</button>
              </div>
            )}
            <button onClick={() => setShowHistory(false)} style={{ ...styles.cancelBtn, marginTop: '15px', width: '100%' }}>Close</button>
          </div>
        </div>
      )}

      {/* --- MODAL: EDIT FORM (UPDATED WITH IMAGE) --- */}
      {isEditing && canEdit && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h3 style={{ margin: '0 0 10px 0' }}>Edit Product</h3>
            <form onSubmit={handleSaveChanges} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              
              {/* 🔥 NEW: Image Upload Section in Edit Modal */}
              <div style={{ textAlign: 'center', marginBottom: '10px', border: '1px dashed #ccc', padding: '10px', borderRadius: '6px' }}>
                 {preview ? (
                   <img src={preview} alt="Preview" style={{ width: '80px', height: '80px', objectFit: 'contain', borderRadius: '4px' }} />
                 ) : (
                   <div style={{ fontSize: '12px', color: '#999' }}>No Image</div>
                 )}
                 <div style={{ marginTop: '5px' }}>
                    <label style={{ cursor: 'pointer', color: '#2563eb', fontSize: '13px', fontWeight: 'bold' }}>
                       {uploading ? "Uploading..." : "Change Image"}
                       <input type="file" accept="image/*" onChange={handleImageSelect} style={{ display: 'none' }} disabled={uploading} />
                    </label>
                 </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label style={styles.label}>Cost Price</label>
                  <input type="number" value={editForm.costing_price} onChange={(e) => setEditForm({ ...editForm, costing_price: e.target.value })} style={styles.input} required />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={styles.label}>Selling Price</label>
                  <input type="number" value={editForm.price} onChange={(e) => setEditForm({ ...editForm, price: e.target.value })} style={styles.input} required />
                </div>
              </div>
              <label style={styles.label}>Supplier Name</label>
              <input type="text" value={editForm.Supplier_name} onChange={(e) => setEditForm({ ...editForm, Supplier_name: e.target.value })} style={styles.input} required />
              <label style={styles.label}>Description</label>
              <textarea value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} style={styles.textarea} />
              
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" disabled={uploading} style={{...styles.saveBtn, opacity: uploading ? 0.7 : 1}}>Save</button>
                <button type="button" onClick={() => setIsEditing(false)} style={styles.cancelBtn}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: DELETE CONFIRM --- */}
      {showDeleteModal && canEdit && (
        <div style={styles.overlay}>
          <div style={{ ...styles.modal, maxWidth: '350px', textAlign: 'center' }}>
            <h3 style={{ color: '#dc2626' }}>Delete Product?</h3>
            <p style={{ fontSize: '13px' }}>Are you sure you want to delete <b>{product.name}</b> permanently?</p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button onClick={confirmDelete} style={{ ...styles.saveBtn, background: '#dc2626' }}>Yes, Delete</button>
              <button onClick={() => setShowDeleteModal(false)} style={styles.cancelBtn}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showImageModal && (
        <div
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", // Darker bg for better view
            display: "flex", alignItems: "center",backgroundColor:"white" ,justifyContent: "center", zIndex: 9999
          }}
          onClick={() => setShowImageModal(false)}
        >
          <img
            src={activeImage}
            alt="Preview"
            style={{ maxWidth: "95%", maxHeight: "95%", objectFit: "contain", borderRadius: "8px", boxShadow: "0 0 40px rgba(0,0,0,0.6)" }}
          />
        </div>
      )}

    </div>
  );
};

// InfoBox component (helper)
const InfoBox = ({ label, val, color }) => (
  <div style={{ background: '#f8fafc', padding: '5px 8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
    <div style={{ fontSize: '10px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase' }}>{label}</div>
    <div style={{ fontSize: '13px', fontWeight: '600', color: color || '#334155' }}>{val}</div>
  </div>
);

// ✨ STYLES (Same as before)
const styles = {
  container: { height: "100vh", width: "100%", overflow: "hidden", backgroundColor: "#f1f5f9", display: "flex", flexDirection: "column", fontFamily: "'Inter', sans-serif" },
  centerMsg: { display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', color: '#666' },
  mainContent: { flex: 1, padding: "10px 20px", display: "flex", flexDirection: "column", gap: "10px", overflow: "hidden" },
  navBar: { display: 'flex', justifyContent: 'space-between', height: '35px', alignItems: 'center', flexShrink: 0 },
  backBtn: { background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontWeight: '600', fontSize: '13px' },

  headerEditBtn: { background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', padding: '5px 12px', fontSize: '12px', cursor: 'pointer' },
  headerDelBtn: { background: '#fff', color: '#dc2626', border: '1px solid #fca5a5', borderRadius: '4px', padding: '5px 12px', fontSize: '12px', cursor: 'pointer' },

  excelBtn: { background: '#107c41', color: '#fff', border: 'none', borderRadius: '4px', padding: '5px 12px', fontSize: '12px', cursor: 'pointer' },
  historyBtn: { background: '#475569', color: '#fff', border: 'none', borderRadius: '4px', padding: '5px 12px', fontSize: '12px', cursor: 'pointer' },
  productCard: { display: "flex", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", overflow: "hidden", flex: 1, border: "1px solid #e2e8f0", minHeight: 0 },
  leftCol: { width: "30%", minWidth: "250px", backgroundColor: "#f8fafc", padding: "15px", borderRight: "1px solid #e2e8f0", display: "flex", flexDirection: "column", gap: "10px", overflowY: "auto" },
  imgWrapper: { position: 'relative', background: '#fff', borderRadius: '6px', border: '1px solid #e2e8f0', padding: '5px', textAlign: 'center', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: "200px" },
  productImg: { maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' },
  iconBtn: { position: 'absolute', top: '5px', right: '5px', background: '#eee', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer' },
  barcodeWrapper: { background: '#fff', padding: '5px', borderRadius: '6px', border: '1px dashed #ccc', textAlign: 'center', flexShrink: 0 },
  barcodeImg: { height: '35px', maxWidth: '100%' },
  miniLink: { fontSize: '10px', color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' },
  rightCol: { width: "70%", padding: "15px", display: "flex", flexDirection: "column", overflowY: "auto" },
  headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexShrink: 0 },
  title: { fontSize: '20px', margin: 0, color: '#1e293b', fontWeight: '700' },
  sku: { fontSize: '12px', color: '#64748b', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' },
  price: { fontSize: '22px', fontWeight: '800', color: '#059669' },
  gst: { fontSize: '11px', color: '#64748b' },
  divider: { border: '0', borderTop: '1px solid #e2e8f0', margin: '10px 0' },
  infoGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '10px', flexShrink: 0 },
  splitRow: { display: "flex", gap: "15px", flex: 1, minHeight: "0", marginBottom: "5px" },
  descBox: { flex: 2, background: '#fdfdfd', border: '1px solid #f1f5f9', borderRadius: '6px', padding: '10px', overflowY: 'auto' },
  skuBoxRight: { flex: 1, background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
  label: { fontSize: '11px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '3px' },
  descText: { fontSize: '13px', margin: 0, color: '#334155', lineHeight: '1.4' },

  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 },
  modal: { background: '#fff', padding: '20px', borderRadius: '8px', width: '750px', boxShadow: "0 10px 25px rgba(0,0,0,0.1)" },
  logsTableWrapper: { maxHeight: '300px', overflowY: 'auto', border: '1px solid #f1f5f9', marginTop: '10px' },
  thMini: { padding: "10px", textAlign: "left", fontSize: "11px", color: "#64748b", textTransform: "uppercase", background: "#f8fafc" },
  tdMini: { padding: "10px", fontSize: "13px", color: "#334155" },
  badge: { padding: "2px 6px", borderRadius: "4px", fontSize: "11px", fontWeight: "bold" },
  input: { padding: '8px', width: '100%', borderRadius: '4px', border: '1px solid #ccc', fontSize: '13px', boxSizing: 'border-box' },
  textarea: { padding: '8px', width: '100%', height: '60px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '13px', resize: 'none', boxSizing: 'border-box' },
  saveBtn: { flex: 1, background: '#16a34a', color: '#fff', border: 'none', padding: '8px', borderRadius: '4px', cursor: 'pointer' },
  cancelBtn: { flex: 1, background: '#f1f5f9', color: '#333', border: '1px solid #ccc', padding: '8px', borderRadius: '4px', cursor: 'pointer' },
  modalFilterBar: { display: 'flex', gap: '10px', marginBottom: '15px', background: '#f8fafc', padding: '10px', borderRadius: '8px' },
  modalDateInput: { padding: '5px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '12px', outline: 'none' },
  applyBtn: { background: '#2563eb', color: '#fff', border: 'none', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' },
  resetBtnSmall: { background: '#fff', color: '#64748b', border: '1px solid #cbd5e1', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' },

  paginationWrapper: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '15px' },
  pageBtn: { background: '#2563eb', border: '1px solid #2563eb', padding: '6px 14px', borderRadius: '4px', cursor: 'pointer', color: '#fff', fontSize: '12px', fontWeight: '600' },
  disabledBtn: { background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '6px 14px', borderRadius: '4px', cursor: 'not-allowed', color: '#94a3b8', fontSize: '12px' },
  pageInfo: { fontSize: '13px', fontWeight: '600', color: '#334155' },
};

export default ProductDetails;

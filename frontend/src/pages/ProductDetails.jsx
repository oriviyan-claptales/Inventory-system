// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const ProductDetails = () => {
//   const { id } = useParams(); // URL se ID li
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await axios.get(`http://localhost:7000/api/products/${id}`);
//         setProduct(res.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching product", error);
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   if (loading) return <div style={{ textAlign: "center", marginTop: "50px" }}>Loading Product...</div>;
//   if (!product) return <div style={{ textAlign: "center", marginTop: "50px" }}>Product Not Found</div>;

//   return (
//     <div style={styles.container}>
//       <button onClick={() => navigate("/dashboard")} style={styles.backBtn}>⬅ Back to List</button>

//       <div style={styles.wrapper}>
//         {/* LEFT COLUMN: Images */}
//         <div style={styles.imageSection}>
//           <img src={product.img} alt={product.name} style={styles.mainImage} />

//           {/* Barcode Section */}
//           {product.barcodeImg && (
//             <div style={styles.barcodeBox}>
//               <p style={{ margin: "0 0 5px 0", fontSize: "12px", color: "#666" }}>Product Barcode</p>
//               <img src={product.barcodeImg} alt="Barcode" style={{ width: "100%", maxWidth: "200px" }} />
//               <a href={product.barcodeImg} target="_blank" rel="noreferrer" style={styles.link}>Download / Print</a>
//             </div>
//           )}
//         </div>

//         {/* RIGHT COLUMN: Details */}
//         <div style={styles.infoSection}>
//           <h1 style={styles.title}>{product.name}</h1>
//           <p style={styles.sku}>SKU: {product.sku}</p>

//           <div style={styles.priceBox}>
//             <span style={styles.price}>₹{product.price}</span>
//             <span style={styles.gst}>(Inc. GST {product.gst}%)</span>
//           </div>

//           <hr style={styles.divider} />

//           <div style={styles.detailRow}>
//             <strong>Category:</strong> <span>{product.category}</span>
//           </div>
//           <div style={styles.detailRow}>
//             <strong>Color:</strong> <span>{product.color}</span>
//           </div>
//           <div style={styles.detailRow}>
//             <strong>Size:</strong> <span>{product.size}</span>
//           </div>
//           <div style={styles.detailRow}>
//             <strong>Stock Status:</strong> 
//             <span style={{ color: product.Qty > 0 ? "green" : "red", fontWeight: "bold" }}>
//               {product.Qty > 0 ? `In Stock (${product.Qty})` : "Out of Stock"}
//             </span>
//           </div>

//           <hr style={styles.divider} />

//           {/* ADMIN ONLY INFO (Hidden from normal view usually) */}
//           <div style={styles.adminBox}>
//              <h4>🔒 Admin Details</h4>
//              <p><strong>Costing Price:</strong> ₹{product.costing_price}</p>
//              <p><strong>Supplier:</strong> {product.Supplier_name}</p>
//              <p><strong>Description:</strong> {product.description || "No description available."}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: { padding: "20px 40px", maxWidth: "1200px", margin: "0 auto", fontFamily: "Arial, sans-serif" },
//   backBtn: { background: "none", border: "none", color: "#1976D2", cursor: "pointer", fontSize: "16px", marginBottom: "20px" },
//   wrapper: { display: "flex", gap: "40px", flexDirection: "row", flexWrap: "wrap" },

//   // Left Side
//   imageSection: { flex: "1", minWidth: "300px", textAlign: "center" },
//   mainImage: { width: "100%", maxWidth: "400px", borderRadius: "10px", border: "1px solid #eee", marginBottom: "20px" },
//   barcodeBox: { background: "#f9f9f9", padding: "15px", borderRadius: "8px", border: "1px dashed #ccc", display: "inline-block" },
//   link: { display: "block", marginTop: "5px", fontSize: "12px", color: "blue" },

//   // Right Side
//   infoSection: { flex: "1.5", minWidth: "300px" },
//   title: { fontSize: "28px", margin: "0 0 5px 0", color: "#333" },
//   sku: { color: "#888", fontSize: "14px", marginBottom: "15px" },
//   priceBox: { display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "20px" },
//   price: { fontSize: "32px", fontWeight: "bold", color: "#B12704" },
//   gst: { fontSize: "14px", color: "#555" },
//   divider: { border: "0", borderTop: "1px solid #eee", margin: "20px 0" },
//   detailRow: { display: "flex", justifyContent: "space-between", maxWidth: "300px", marginBottom: "10px", fontSize: "16px" },

//   adminBox: { background: "#f0f4f8", padding: "15px", borderRadius: "8px", marginTop: "20px" },
// };

// export default ProductDetails;



















//  with out QTY UPDATE


// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// // import axios from "axios";
// import api from "../api/axios";
// import toast from "react-hot-toast"; // Notification ke liye

// const ProductDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await api.get(`http://localhost:7000/api/products/${id}`);
//         setProduct(res.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching product", error);
//         toast.error("Error fetching product details");
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   // Delete Function
//   const handleDelete = async () => {
//     if (window.confirm("Are you sure you want to PERMANENTLY delete this product?")) {
//       try {
//         await api.delete(`http://localhost:7000/api/products/${id}`);
//         toast.success("Product Deleted Successfully");
//         navigate("/dashboard");
//       } catch (error) {
//         console.error("Error deleting product", error);
//         toast.error("Failed to delete product");
//       }
//     }
//   };

//   if (loading) return <div style={styles.loading}>Loading Product...</div>;
//   if (!product) return <div style={styles.loading}>Product Not Found</div>;

//   return (
//     <div style={styles.container}>
//       {/* Back Button */}
//       <button 
//         onClick={() => navigate("/dashboard")} 
//         style={styles.backBtn}
//         onMouseEnter={(e) => e.currentTarget.style.color = "#1565C0"}
//         onMouseLeave={(e) => e.currentTarget.style.color = "#1976D2"}
//       >
//         ⬅ Back to Dashboard
//       </button>

//       <div style={styles.wrapper}>
//         {/* --- LEFT COLUMN: Images & Barcode --- */}
//         <div style={styles.imageSection}>
//           <div style={styles.imgContainer}>
//             <img src={product.img} alt={product.name} style={styles.mainImage} />
//           </div>

//           {product.barcodeImg && (
//             <div style={styles.barcodeBox}>
//               <p style={styles.barcodeTitle}>Product Barcode</p>
//               <img src={product.barcodeImg} alt="Barcode" style={styles.barcodeImg} />
//               <a href={product.barcodeImg} download target="_blank" rel="noreferrer" style={styles.downloadLink}>
//                 Download / Print
//               </a>
//             </div>
//           )}
//         </div>

//         {/* --- RIGHT COLUMN: All Details (No Admin Hide) --- */}
//         <div style={styles.infoSection}>

//           {/* Header Info */}
//           <h1 style={styles.title}>{product.name}</h1>
//           <p style={styles.sku}>SKU: <span style={{color: "#333", fontWeight: "bold"}}>{product.sku}</span></p>

//           <div style={styles.priceBox}>
//             <span style={styles.price}>₹{product.price}</span>
//             <span style={styles.gst}>(Inc. GST {product.gst}%)</span>
//           </div>

//           <hr style={styles.divider} />

//           {/* Detailed Grid - Sab kuch yahan hai */}
//           <div style={styles.detailsGrid}>
//             <DetailItem label="Category" value={product.category} />
//             <DetailItem label="Color" value={product.color} />
//             <DetailItem label="Size/Scale" value={product.size} />

//             {/* Stock Logic */}
//             <div style={styles.detailItem}>
//               <span style={styles.label}>Stock Status:</span>
//               <span style={{ 
//                 fontWeight: "bold", 
//                 color: product.Qty > 0 ? "#2e7d32" : "#d32f2f",
//                 backgroundColor: product.Qty > 0 ? "#e8f5e9" : "#ffebee",
//                 padding: "2px 8px",
//                 borderRadius: "4px"
//               }}>
//                 {product.Qty > 0 ? `In Stock (${product.Qty})` : "Out of Stock"}
//               </span>
//             </div>

//             {/* Previously Admin Only - Ab Sabko Dikhega */}
//             <DetailItem label="Cost Price (CP)" value={`₹${product.costing_price}`} />
//             <DetailItem label="Supplier Name" value={product.Supplier_name} />
//           </div>

//           <hr style={styles.divider} />

//           {/* Description Section */}
//           <div style={styles.descSection}>
//             <h3 style={styles.sectionHeading}>Product Description</h3>
//             <p style={styles.description}>
//               {product.description || "No description provided for this product."}
//             </p>
//           </div>

//           {/* Action Buttons */}
//           <div style={styles.actionButtons}>
//             {/* Delete Button */}
//             <button onClick={handleDelete} style={styles.deleteBtn}>
//               🗑 Delete Product
//             </button>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// // Helper Component for neat rows
// const DetailItem = ({ label, value }) => (
//   <div style={styles.detailItem}>
//     <span style={styles.label}>{label}:</span>
//     <span style={styles.value}>{value || "-"}</span>
//   </div>
// );

// const styles = {
//   container: { padding: "40px", maxWidth: "1100px", margin: "0 auto", fontFamily: "'Segoe UI', sans-serif", backgroundColor: "#fff" },
//   loading: { textAlign: "center", marginTop: "50px", fontSize: "18px", color: "#666" },

//   backBtn: {
//     background: "none", border: "none", color: "#1976D2", cursor: "pointer", 
//     fontSize: "15px", fontWeight: "600", marginBottom: "25px", transition: "0.2s"
//   },

//   wrapper: { display: "flex", gap: "50px", flexDirection: "row", flexWrap: "wrap" },

//   // Left Side
//   imageSection: { flex: "1", minWidth: "300px", display: "flex", flexDirection: "column", gap: "20px" },
//   imgContainer: { border: "1px solid #e0e0e0", borderRadius: "12px", overflow: "hidden", padding: "10px", textAlign: "center" },
//   mainImage: { width: "100%", height: "auto", objectFit: "contain", maxHeight: "400px" },

//   barcodeBox: { background: "#f8f9fa", padding: "20px", borderRadius: "12px", border: "1px dashed #bdbdbd", textAlign: "center" },
//   barcodeTitle: { margin: "0 0 10px 0", fontSize: "13px", color: "#757575", fontWeight: "bold", textTransform: "uppercase" },
//   barcodeImg: { width: "100%", maxWidth: "220px", height: "auto" },
//   downloadLink: { display: "inline-block", marginTop: "10px", fontSize: "13px", color: "#1976D2", textDecoration: "none", fontWeight: "600" },

//   // Right Side
//   infoSection: { flex: "1.5", minWidth: "300px" },
//   title: { fontSize: "32px", margin: "0 0 5px 0", color: "#212121", fontWeight: "700" },
//   sku: { color: "#757575", fontSize: "15px", marginBottom: "20px" },

//   priceBox: { display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "25px" },
//   price: { fontSize: "36px", fontWeight: "700", color: "#d32f2f" },
//   gst: { fontSize: "15px", color: "#616161", fontWeight: "500" },

//   divider: { border: "0", borderTop: "1px solid #eeeeee", margin: "25px 0" },

//   // Grid Layout for Details
//   detailsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px 40px" },
//   detailItem: { display: "flex", flexDirection: "column", gap: "4px" },
//   label: { fontSize: "13px", color: "#757575", fontWeight: "600", textTransform: "uppercase" },
//   value: { fontSize: "16px", color: "#212121", fontWeight: "500" },

//   // Description
//   descSection: { marginTop: "10px" },
//   sectionHeading: { fontSize: "18px", fontWeight: "600", color: "#424242", marginBottom: "10px" },
//   description: { fontSize: "15px", lineHeight: "1.6", color: "#424242", whiteSpace: "pre-line" },

//   // Actions
//   actionButtons: { marginTop: "40px", paddingTop: "20px", borderTop: "1px solid #eee" },
//   deleteBtn: {
//     padding: "12px 24px",
//     backgroundColor: "#ffebee",
//     color: "#c62828",
//     border: "1px solid #ffcdd2",
//     borderRadius: "8px",
//     fontSize: "15px",
//     fontWeight: "600",
//     cursor: "pointer",
//     width: "100%",
//     transition: "0.2s"
//   }
// };

// export default ProductDetails;



















//  with qty update

// import React, { useEffect, useState, useCallback } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux"; // 1️⃣ Redux Import
// import api from "../api/axios";
// import SkuUpdate from "../components/SkuUpdate"; // 2️⃣ Component Import
// import toast from "react-hot-toast";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // 3️⃣ User Permissions Check
//   const user = useSelector((state) => state.user.userData);
//   const isAdmin = user?.userType === "admin";
//   const isSuperUser = user?.userType === "superuser";
//   const canEdit = isAdmin || isSuperUser;

//   // 4️⃣ Fetch Logic ko function banaya taaki reuse kar sakein
//   const fetchProduct = useCallback(async () => {
//     try {
//       // ✅ Sahi API call (localhost:7000 hata diya)
//       const res = await api.get(`/products/${id}`);
//       setProduct(res.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching product", error);
//       toast.error("Error fetching product details");
//       setLoading(false);
//     }
//   }, [id]);

//   useEffect(() => {
//     fetchProduct();
//   }, [fetchProduct]);

//   // Delete Function
//   const handleDelete = async () => {
//     if(!canEdit) return toast.error("Permission Denied");

//     if (window.confirm("Are you sure you want to PERMANENTLY delete this product?")) {
//       try {
//         await api.delete(`/products/${id}`);
//         toast.success("Product Deleted Successfully");
//         navigate("/dashboard");
//       } catch (error) {
//         console.error("Error deleting product", error);
//         toast.error(error.response?.data?.message || "Failed to delete product");
//       }
//     }
//   };

//   if (loading) return <div style={styles.loading}>Loading Product...</div>;
//   if (!product) return <div style={styles.loading}>Product Not Found</div>;

//   return (
//     <div style={styles.container}>
//       {/* Back Button */}
//       <button 
//         onClick={() => navigate("/dashboard")} 
//         style={styles.backBtn}
//         onMouseEnter={(e) => e.currentTarget.style.color = "#1565C0"}
//         onMouseLeave={(e) => e.currentTarget.style.color = "#1976D2"}
//       >
//         ⬅ Back to Dashboard
//       </button>

//       <div style={styles.wrapper}>
//         {/* --- LEFT COLUMN: Images & Barcode --- */}
//         <div style={styles.imageSection}>
//           <div style={styles.imgContainer}>
//             <img src={product.img} alt={product.name} style={styles.mainImage} />
//           </div>

//           {product.barcodeImg && (
//             <div style={styles.barcodeBox}>
//               <p style={styles.barcodeTitle}>Product Barcode</p>
//               <img src={product.barcodeImg} alt="Barcode" style={styles.barcodeImg} />
//               <a href={product.barcodeImg} download target="_blank" rel="noreferrer" style={styles.downloadLink}>
//                 Download / Print
//               </a>
//             </div>
//           )}
//         </div>

//         {/* --- RIGHT COLUMN: All Details --- */}
//         <div style={styles.infoSection}>

//           <h1 style={styles.title}>{product.name}</h1>
//           <p style={styles.sku}>SKU: <span style={{color: "#333", fontWeight: "bold"}}>{product.sku}</span></p>

//           <div style={styles.priceBox}>
//             <span style={styles.price}>₹{product.price}</span>
//             <span style={styles.gst}>(Inc. GST {product.gst}%)</span>
//           </div>

//           <hr style={styles.divider} />

//           <div style={styles.detailsGrid}>
//             <DetailItem label="Category" value={product.category} />
//             <DetailItem label="Color" value={product.color} />
//             <DetailItem label="Size/Scale" value={product.size} />

//             <div style={styles.detailItem}>
//               <span style={styles.label}>Stock Status:</span>
//               <span style={{ 
//                 fontWeight: "bold", 
//                 color: product.Qty > 0 ? "#2e7d32" : "#d32f2f",
//                 backgroundColor: product.Qty > 0 ? "#e8f5e9" : "#ffebee",
//                 padding: "2px 8px",
//                 borderRadius: "4px"
//               }}>
//                 {product.Qty > 0 ? `In Stock (${product.Qty})` : "Out of Stock"}
//               </span>
//             </div>

//             <DetailItem label="Cost Price (CP)" value={canEdit ? `₹${product.costing_price}` : "Hidden"} />
//             <DetailItem label="Supplier Name" value={canEdit ? product.Supplier_name : "Hidden"} />
//           </div>

//           <hr style={styles.divider} />



//           {/* 5️⃣ SKU UPDATE SECTION */}
//           {canEdit && (
//              <div style={styles.skuSection}>
//                 <h3 style={styles.sectionHeading}>Quick Stock Update</h3>
//                 <div style={{border: '1px solid #e0e0e0', padding: '20px', borderRadius: '8px', background: '#fafafa'}}>

//                    {/* 👇 YAHAN CHANGE KIYA HAI 👇 */}
//                    <SkuUpdate 
//                       onUpdated={fetchProduct} 
//                       prefillProduct={product} // <-- Ye line add karni hai
//                    />

//                 </div>
//              </div>
//           )}


//           <div style={styles.descSection}>
//             <h3 style={styles.sectionHeading}>Product Description</h3>
//             <p style={styles.description}>
//               {product.description || "No description provided for this product."}
//             </p>
//           </div>

//           <div style={styles.actionButtons}>
//             {canEdit && (
//               <button onClick={handleDelete} style={styles.deleteBtn}>
//                 🗑 Delete Product
//               </button>
//             )}
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// const DetailItem = ({ label, value }) => (
//   <div style={styles.detailItem}>
//     <span style={styles.label}>{label}:</span>
//     <span style={styles.value}>{value || "-"}</span>
//   </div>
// );

// const styles = {
//   container: { padding: "40px", maxWidth: "1100px", margin: "0 auto", fontFamily: "'Segoe UI', sans-serif", backgroundColor: "#fff" },
//   loading: { textAlign: "center", marginTop: "50px", fontSize: "18px", color: "#666" },
//   backBtn: { background: "none", border: "none", color: "#1976D2", cursor: "pointer", fontSize: "15px", fontWeight: "600", marginBottom: "25px", transition: "0.2s" },
//   wrapper: { display: "flex", gap: "50px", flexDirection: "row", flexWrap: "wrap" },
//   imageSection: { flex: "1", minWidth: "300px", display: "flex", flexDirection: "column", gap: "20px" },
//   imgContainer: { border: "1px solid #e0e0e0", borderRadius: "12px", overflow: "hidden", padding: "10px", textAlign: "center" },
//   mainImage: { width: "100%", height: "auto", objectFit: "contain", maxHeight: "400px" },
//   barcodeBox: { background: "#f8f9fa", padding: "20px", borderRadius: "12px", border: "1px dashed #bdbdbd", textAlign: "center" },
//   barcodeTitle: { margin: "0 0 10px 0", fontSize: "13px", color: "#757575", fontWeight: "bold", textTransform: "uppercase" },
//   barcodeImg: { width: "100%", maxWidth: "220px", height: "auto" },
//   downloadLink: { display: "inline-block", marginTop: "10px", fontSize: "13px", color: "#1976D2", textDecoration: "none", fontWeight: "600" },
//   infoSection: { flex: "1.5", minWidth: "300px" },
//   title: { fontSize: "32px", margin: "0 0 5px 0", color: "#212121", fontWeight: "700" },
//   sku: { color: "#757575", fontSize: "15px", marginBottom: "20px" },
//   priceBox: { display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "25px" },
//   price: { fontSize: "36px", fontWeight: "700", color: "#d32f2f" },
//   gst: { fontSize: "15px", color: "#616161", fontWeight: "500" },
//   divider: { border: "0", borderTop: "1px solid #eeeeee", margin: "25px 0" },
//   detailsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px 40px" },
//   detailItem: { display: "flex", flexDirection: "column", gap: "4px" },
//   label: { fontSize: "13px", color: "#757575", fontWeight: "600", textTransform: "uppercase" },
//   value: { fontSize: "16px", color: "#212121", fontWeight: "500" },

//   // New SKU Section Style
//   skuSection: { margin: "20px 0" },

//   descSection: { marginTop: "20px" },
//   sectionHeading: { fontSize: "18px", fontWeight: "600", color: "#424242", marginBottom: "10px" },
//   description: { fontSize: "15px", lineHeight: "1.6", color: "#424242", whiteSpace: "pre-line" },
//   actionButtons: { marginTop: "40px", paddingTop: "20px", borderTop: "1px solid #eee" },
//   deleteBtn: { padding: "12px 24px", backgroundColor: "#ffebee", color: "#c62828", border: "1px solid #ffcdd2", borderRadius: "8px", fontSize: "15px", fontWeight: "600", cursor: "pointer", width: "100%", transition: "0.2s" }
// };

// export default ProductDetails;
































// import React, { useEffect, useState, useCallback } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import api from "../api/axios";
// import SkuUpdate from "../components/SkuUpdate";
// import toast from "react-hot-toast";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const user = useSelector((state) => state.user.userData);
//   const isAdmin = user?.userType === "admin";
//   const isSuperUser = user?.userType === "superuser";
//   const canEdit = isAdmin || isSuperUser;

//   const fetchProduct = useCallback(async () => {
//     try {
//       const res = await api.get(`/products/${id}`);
//       setProduct(res.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching product", error);
//       toast.error("Error fetching product details");
//       setLoading(false);
//     }
//   }, [id]);

//   useEffect(() => {
//     fetchProduct();
//   }, [fetchProduct]);

//   // --- DOWNLOAD HELPER FUNCTION ---
//   const downloadImage = async (imageUrl, fileName) => {
//     try {
//       const response = await fetch(imageUrl);
//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = fileName || "download.jpg";
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Download failed", error);
//       toast.error("Failed to download image");
//     }
//   };

//   const handleDelete = async () => {
//     if(!canEdit) return toast.error("Permission Denied");

//     if (window.confirm("Are you sure you want to PERMANENTLY delete this product?")) {
//       try {
//         await api.delete(`/products/${id}`);
//         toast.success("Product Deleted Successfully");
//         navigate("/dashboard");
//       } catch (error) {
//         console.error("Error deleting product", error);
//         toast.error(error.response?.data?.message || "Failed to delete product");
//       }
//     }
//   };

//   if (loading) return <div style={styles.loading}>Loading...</div>;
//   if (!product) return <div style={styles.loading}>Product Not Found</div>;

//   return (
//     <div style={styles.container}>
//       <button onClick={() => navigate("/dashboard")} style={styles.backBtn}>
//         ⬅ Back
//       </button>

//       <div style={styles.wrapper}>
//         <div style={styles.imageSection}>
//           <div style={styles.imgContainer}>
//             <img src={product.img} alt={product.name} style={styles.mainImage} />
//             {/* PRODUCT IMAGE DOWNLOAD BUTTON */}
//             <button 
//               onClick={() => downloadImage(product.img, `${product.name}-product.jpg`)}
//               style={styles.downloadBtn}
//             >
//               📥 Download Product Image
//             </button>
//           </div>

//           {product.barcodeImg && (
//             <div style={styles.barcodeBox}>
//               <p style={styles.barcodeTitle}>Barcode / QR Code</p>
//               <img src={product.barcodeImg} alt="Barcode" style={styles.barcodeImg} />
//               <button 
//                 onClick={() => downloadImage(product.barcodeImg, `${product.sku}-barcode.jpg`)}
//                 style={styles.downloadLinkBtn}
//               >
//                 Download Barcode
//               </button>
//             </div>
//           )}

//           {canEdit && (
//              <div style={styles.skuSection}>
//                 <div style={{border: '1px solid #e0e0e0', padding: '15px', borderRadius: '8px', background: '#fafafa'}}>
//                    <SkuUpdate onUpdated={fetchProduct} prefillProduct={product} />
//                 </div>
//              </div>
//           )}
//         </div>

//         <div style={styles.infoSection}>
//           <div style={styles.headerGroup}>
//              <h2 style={styles.title}>{product.name}</h2>
//              <span style={styles.skuBadge}>SKU: {product.sku}</span>
//           </div>

//           <div style={styles.priceBox}>
//             <span style={styles.price}>₹{product.price}</span>
//             <span style={styles.gst}>(Inc. GST {product.gst}%)</span>
//           </div>

//           <hr style={styles.divider} />

//           <div style={styles.detailsGrid}>
//             <DetailItem label="Category" value={product.category} />
//             <DetailItem label="Color" value={product.color} />
//             <DetailItem label="Size" value={product.size} />

//             <div style={styles.detailItem}>
//               <span style={styles.label}>Status:</span>
//               <span style={{ 
//                 fontSize: "13px",
//                 fontWeight: "bold", 
//                 color: product.Qty > 0 ? "#2e7d32" : "#d32f2f",
//                 backgroundColor: product.Qty > 0 ? "#e8f5e9" : "#ffebee",
//                 padding: "2px 8px",
//                 borderRadius: "4px",
//                 display: "inline-block"
//               }}>
//                 {product.Qty > 0 ? `In Stock (${product.Qty})` : "Out of Stock"}
//               </span>
//             </div>

//             <DetailItem label="Cost Price" value={canEdit ? `₹${product.costing_price}` : "--"} />
//             <DetailItem label="Supplier" value={canEdit ? product.Supplier_name : "--"} />
//           </div>

//           <div style={styles.descSection}>
//             <h4 style={styles.sectionHeading}>Description</h4>
//             <p style={styles.description}>
//               {product.description || "No description."}
//             </p>
//           </div>

//           <div style={styles.actionButtons}>
//             {canEdit && (
//               <button onClick={handleDelete} style={styles.deleteBtn}>
//                 🗑 Delete Product
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const DetailItem = ({ label, value }) => (
//   <div style={styles.detailItem}>
//     <span style={styles.label}>{label}:</span>
//     <span style={styles.value}>{value || "-"}</span>
//   </div>
// );

// const styles = {
//   // ... (aapke purane styles yahan rahenge)
//   container: { padding: "20px", maxWidth: "1000px", margin: "0 auto", fontFamily: "'Segoe UI', sans-serif", backgroundColor: "#fff", minHeight: "100vh" },
//   loading: { textAlign: "center", marginTop: "50px", fontSize: "16px", color: "#666" },
//   backBtn: { background: "none", border: "none", color: "#1976D2", cursor: "pointer", fontSize: "14px", fontWeight: "600", marginBottom: "15px", padding: 0 },
//   wrapper: { display: "flex", gap: "30px", flexDirection: "row", flexWrap: "wrap", alignItems: "flex-start" },
//   imageSection: { flex: "1", minWidth: "250px", maxWidth: "350px" },
//   imgContainer: { border: "1px solid #eee", borderRadius: "8px", overflow: "hidden", padding: "5px", textAlign: "center" },
//   mainImage: { width: "100%", height: "auto", objectFit: "contain", maxHeight: "300px" },

//   // Naya Style Buttons ke liye
//   downloadBtn: { marginTop: "10px", padding: "8px", background: "#f0f7ff", border: "1px solid #1976D2", color: "#1976D2", borderRadius: "4px", cursor: "pointer", fontSize: "12px", fontWeight: "600", width: "100%" },
//   downloadLinkBtn: { background: "none", border: "none", marginTop: "5px", fontSize: "12px", color: "#1976D2", fontWeight: "600", cursor: "pointer", textDecoration: "underline" },

//   barcodeBox: { marginTop: "15px", background: "#f8f9fa", padding: "10px", borderRadius: "8px", border: "1px dashed #ddd", textAlign: "center" },
//   barcodeTitle: { margin: "0 0 5px 0", fontSize: "11px", color: "#777", fontWeight: "bold", textTransform: "uppercase" },
//   barcodeImg: { width: "100%", maxWidth: "180px", height: "auto" },
//   infoSection: { flex: "1.5", minWidth: "300px" },
//   headerGroup: { marginBottom: "10px" },
//   title: { fontSize: "22px", margin: "0 0 5px 0", color: "#222", fontWeight: "700" },
//   skuBadge: { fontSize: "12px", color: "#555", background: "#f0f0f0", padding: "2px 6px", borderRadius: "4px" },
//   priceBox: { display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "15px" },
//   price: { fontSize: "26px", fontWeight: "700", color: "#d32f2f" },
//   gst: { fontSize: "13px", color: "#666" },
//   divider: { border: "0", borderTop: "1px solid #eee", margin: "15px 0" },
//   detailsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 20px" },
//   detailItem: { display: "flex", flexDirection: "column" },
//   label: { fontSize: "11px", color: "#777", fontWeight: "700", textTransform: "uppercase" },
//   value: { fontSize: "14px", color: "#333", fontWeight: "500" },
//   skuSection: { margin: "15px 0" },
//   descSection: { marginTop: "15px" },
//   sectionHeading: { fontSize: "15px", fontWeight: "600", color: "#444", marginBottom: "5px" },
//   description: { fontSize: "13px", lineHeight: "1.5", color: "#555", whiteSpace: "pre-line" },
//   actionButtons: { marginTop: "20px", paddingTop: "15px", borderTop: "1px solid #eee" },
//   deleteBtn: { padding: "10px", backgroundColor: "#fff", color: "#c62828", border: "1px solid #ffcdd2", borderRadius: "6px", fontSize: "13px", fontWeight: "600", cursor: "pointer", width: "100%", transition: "0.2s" }
// };

// export default ProductDetails;






















// import React, { useEffect, useState, useCallback } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import api from "../api/axios";
// import SkuUpdate from "../components/SkuUpdate";
// import toast from "react-hot-toast";
// import Header from "../components/Header"; // ✅ Header Import

// const ProductDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // --- EDIT MODAL STATE ---
//   const [isEditing, setIsEditing] = useState(false);
//   const [editForm, setEditForm] = useState({
//     price: "",
//     costing_price: "",
//     description: ""
//   });

//   const user = useSelector((state) => state.user.userData);
//   const isAdmin = user?.userType === "admin";
//   const isSuperUser = user?.userType === "superuser";
//   const canEdit = isAdmin || isSuperUser;

//   const fetchProduct = useCallback(async () => {
//     try {
//       const res = await api.get(`/products/${id}`);
//       setProduct(res.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching product", error);
//       toast.error("Error fetching product details");
//       setLoading(false);
//     }
//   }, [id]);

//   useEffect(() => {
//     fetchProduct();
//   }, [fetchProduct]);

//   // --- DOWNLOAD HELPER ---
//   const downloadImage = async (imageUrl, fileName) => {
//     try {
//       const response = await fetch(imageUrl);
//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = fileName || "download.jpg";
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Download failed", error);
//       toast.error("Failed to download image");
//     }
//   };

//   // --- HANDLE EDIT CLICK ---
//   const handleEditClick = () => {
//     setEditForm({
//       price: product.price,
//       costing_price: product.costing_price,
//       description: product.description || ""
//     });
//     setIsEditing(true);
//   };

//   // --- HANDLE SAVE CHANGES ---
//   const handleSaveChanges = async (e) => {
//     e.preventDefault();
//     try {
//       await api.put(`/products/${id}`, editForm);
//       toast.success("Product Updated Successfully!");
//       setIsEditing(false);
//       fetchProduct();
//     } catch (error) {
//       console.error("Update failed", error);
//       toast.error("Failed to update product");
//     }
//   };

//   // --- DELETE PRODUCT ---
//   const handleDelete = async () => {
//     if (!canEdit) return toast.error("Permission Denied");

//     if (window.confirm("Are you sure you want to PERMANENTLY delete this product?")) {
//       try {
//         await api.delete(`/products/${id}`);
//         toast.success("Product Deleted Successfully");
//         navigate("/dashboard");
//       } catch (error) {
//         console.error("Error deleting product", error);
//         toast.error(error.response?.data?.message || "Failed to delete product");
//       }
//     }
//   };

//   if (loading) return <div style={styles.loading}>Loading product details...</div>;
//   if (!product) return <div style={styles.loading}>Product Not Found</div>;

//   return (
//     <div style={styles.container}>

//       {/* ✅ HEADER ADDED */}
//       <Header />

//       {/* MAIN CONTENT AREA */}
//       <div style={styles.mainContent}>

//         {/* Navigation Breadcrumb */}
//         <div style={styles.navBar}>
//            <button onClick={() => navigate("/dashboard")} style={styles.backBtn}>
//              ⬅ Back to Dashboard
//            </button>
//         </div>

//         {/* PRODUCT CARD */}
//         <div style={styles.productCard}>

//           {/* --- LEFT COLUMN: IMAGES --- */}
//           <div style={styles.imageSection}>
//             <div style={styles.imgContainer}>
//               <img src={product.img} alt={product.name} style={styles.mainImage} />
//               <button
//                 onClick={() => downloadImage(product.img, `${product.name}-product.jpg`)}
//                 style={styles.downloadBtn}
//               >
//                 📥 Download Image
//               </button>
//             </div>

//             {product.barcodeImg && (
//               <div style={styles.barcodeBox}>
//                 <p style={styles.barcodeTitle}>Barcode / QR Code</p>
//                 <img src={product.barcodeImg} alt="Barcode" style={styles.barcodeImg} />
//                 <button
//                   onClick={() => downloadImage(product.barcodeImg, `${product.sku}-barcode.jpg`)}
//                   style={styles.downloadLinkBtn}
//                 >
//                   Download Barcode
//                 </button>
//               </div>
//             )}

//             {canEdit && (
//               <div style={styles.skuSection}>
//                 <div style={{ border: '1px solid #e0e0e0', padding: '15px', borderRadius: '8px', background: '#f8fafc' }}>
//                   <SkuUpdate onUpdated={fetchProduct} prefillProduct={product} />
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* --- RIGHT COLUMN: DETAILS --- */}
//           <div style={styles.infoSection}>

//             <div style={styles.headerGroup}>
//               <h2 style={styles.title}>{product.name}</h2>
//               <span style={styles.skuBadge}>SKU: {product.sku}</span>
//             </div>

//             <div style={styles.priceBox}>
//               <span style={styles.price}>₹{product.price}</span>
//               <span style={styles.gst}>(Inc. GST {product.gst}%)</span>
//             </div>

//             <hr style={styles.divider} />

//             <div style={styles.detailsGrid}>
//               <DetailItem label="Category" value={product.category} />
//               <DetailItem label="Color" value={product.color} />
//               <DetailItem label="Size" value={product.size} />

//               <div style={styles.detailItem}>
//                 <span style={styles.label}>Status</span>
//                 <span style={{
//                   fontSize: "13px",
//                   fontWeight: "bold",
//                   color: product.Qty > 0 ? "#166534" : "#dc2626",
//                   backgroundColor: product.Qty > 0 ? "#dcfce7" : "#fee2e2",
//                   padding: "4px 10px",
//                   borderRadius: "20px",
//                   display: "inline-block",
//                   textAlign: "center",
//                   maxWidth: "fit-content"
//                 }}>
//                   {product.Qty > 0 ? `In Stock (${product.Qty})` : "Out of Stock"}
//                 </span>
//               </div>

//               <DetailItem label="Cost Price" value={canEdit ? `₹${product.costing_price}` : "--"} />
//               <DetailItem label="Supplier" value={canEdit ? product.Supplier_name : "--"} />
//             </div>

//             <div style={styles.descSection}>
//               <h4 style={styles.sectionHeading}>Description</h4>
//               <p style={styles.description}>
//                 {product.description || "No description provided."}
//               </p>
//             </div>

//             {/* ACTION BUTTONS */}
//             <div style={styles.actionButtons}>
//               {canEdit && (
//                 <>
//                   <button onClick={handleEditClick} style={styles.editBtn}>
//                     ✏️ Edit Details
//                   </button>
//                   <button onClick={handleDelete} style={styles.deleteBtn}>
//                     🗑 Delete Product
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* --- EDIT MODAL OVERLAY --- */}
//       {isEditing && (
//         <div style={styles.modalOverlay}>
//           <div style={styles.modalContent}>
//             <h3 style={styles.modalTitle}>Edit Product Details</h3>

//             <form onSubmit={handleSaveChanges} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>

//               {/* Cost Price */}
//               <div>
//                 <label style={styles.inputLabel}>Cost Price (₹)</label>
//                 <input
//                   type="number"
//                   value={editForm.costing_price}
//                   onChange={(e) => setEditForm({ ...editForm, costing_price: e.target.value })}
//                   style={styles.input}
//                   required
//                 />
//               </div>

//               {/* Selling Price */}
//               <div>
//                 <label style={styles.inputLabel}>Selling Price (₹)</label>
//                 <input
//                   type="number"
//                   value={editForm.price}
//                   onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
//                   style={styles.input}
//                   required
//                 />
//               </div>

//               {/* Description */}
//               <div>
//                 <label style={styles.inputLabel}>Description</label>
//                 <textarea
//                   value={editForm.description}
//                   onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
//                   style={{ ...styles.input, height: "100px", resize: "none", fontFamily: "inherit" }}
//                   placeholder="Enter product description..."
//                 />
//               </div>

//               <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
//                 <button type="submit" style={styles.saveBtn}>Save Changes</button>
//                 <button type="button" onClick={() => setIsEditing(false)} style={styles.cancelBtn}>Cancel</button>
//               </div>

//             </form>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// };

// const DetailItem = ({ label, value }) => (
//   <div style={styles.detailItem}>
//     <span style={styles.label}>{label}</span>
//     <span style={styles.value}>{value || "-"}</span>
//   </div>
// );

// // ✨ UPDATED PROFESSIONAL CSS
// const styles = {
//   container: {
//     minHeight: "100vh",
//     backgroundColor: "#f3f4f6", // Light grey background
//     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//     display: "flex",
//     flexDirection: "column",
//   },
//   loading: { textAlign: "center", marginTop: "50px", fontSize: "18px", color: "#64748b", fontWeight: "600" },

//   mainContent: {
//     padding: "30px 20px",
//     width: "100%",
//     maxWidth: "1100px",
//     margin: "0 auto",
//     boxSizing: "border-box",
//   },

//   navBar: { marginBottom: "20px" },
//   backBtn: { 
//     background: "transparent", 
//     border: "none", 
//     color: "#64748b", 
//     cursor: "pointer", 
//     fontSize: "14px", 
//     fontWeight: "600", 
//     display: "flex", 
//     alignItems: "center",
//     transition: "color 0.2s"
//   },

//   // Main Card
//   productCard: {
//     display: "flex",
//     flexDirection: "row",
//     flexWrap: "wrap",
//     backgroundColor: "#fff",
//     borderRadius: "16px",
//     boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
//     overflow: "hidden",
//     border: "1px solid #e2e8f0"
//   },

//   // --- Left Column ---
//   imageSection: { 
//     flex: "1", 
//     minWidth: "300px", 
//     maxWidth: "400px",
//     padding: "30px",
//     borderRight: "1px solid #f1f5f9",
//     backgroundColor: "#fff"
//   },
//   imgContainer: { 
//     border: "1px solid #e2e8f0", 
//     borderRadius: "12px", 
//     overflow: "hidden", 
//     padding: "10px", 
//     textAlign: "center",
//     marginBottom: "20px",
//     backgroundColor: "#fff"
//   },
//   mainImage: { width: "100%", height: "auto", objectFit: "contain", maxHeight: "350px" },
//   downloadBtn: { marginTop: "10px", padding: "10px", background: "#eff6ff", border: "1px solid #bfdbfe", color: "#1d4ed8", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "600", width: "100%" },

//   barcodeBox: { marginTop: "20px", background: "#f8fafc", padding: "15px", borderRadius: "12px", border: "2px dashed #cbd5e1", textAlign: "center" },
//   barcodeTitle: { margin: "0 0 10px 0", fontSize: "12px", color: "#64748b", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" },
//   barcodeImg: { width: "100%", maxWidth: "150px", height: "auto" },
//   downloadLinkBtn: { background: "none", border: "none", marginTop: "8px", fontSize: "13px", color: "#2563eb", fontWeight: "600", cursor: "pointer", textDecoration: "underline" },

//   skuSection: { marginTop: "25px" },

//   // --- Right Column ---
//   infoSection: { 
//     flex: "1.5", 
//     minWidth: "350px", 
//     padding: "40px",
//   },
//   headerGroup: { marginBottom: "15px" },
//   title: { fontSize: "28px", margin: "0 0 10px 0", color: "#1e293b", fontWeight: "800", lineHeight: "1.2" },
//   skuBadge: { fontSize: "13px", color: "#475569", background: "#f1f5f9", padding: "4px 10px", borderRadius: "6px", fontWeight: "600", border: "1px solid #e2e8f0" },

//   priceBox: { display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "20px" },
//   price: { fontSize: "32px", fontWeight: "800", color: "#059669" }, // Green for price looks better
//   gst: { fontSize: "14px", color: "#64748b", fontWeight: "500" },

//   divider: { border: "0", borderTop: "1px solid #f1f5f9", margin: "25px 0" },

//   detailsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px 30px" },
//   detailItem: { display: "flex", flexDirection: "column" },
//   label: { fontSize: "12px", color: "#94a3b8", fontWeight: "700", textTransform: "uppercase", marginBottom: "5px", letterSpacing: "0.5px" },
//   value: { fontSize: "16px", color: "#334155", fontWeight: "600" },

//   descSection: { marginTop: "30px", backgroundColor: "#f8fafc", padding: "20px", borderRadius: "12px" },
//   sectionHeading: { fontSize: "14px", fontWeight: "700", color: "#475569", marginBottom: "8px", textTransform: "uppercase" },
//   description: { fontSize: "14px", lineHeight: "1.6", color: "#334155", whiteSpace: "pre-line", margin: 0 },

//   actionButtons: { marginTop: "30px", paddingTop: "20px", borderTop: "1px solid #f1f5f9", display: "flex", gap: "15px" },
//   editBtn: { flex: 1, padding: "12px", backgroundColor: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: "600", cursor: "pointer", transition: "0.2s", boxShadow: "0 2px 4px rgba(37,99,235,0.2)" },
//   deleteBtn: { flex: 1, padding: "12px", backgroundColor: "#fff", color: "#dc2626", border: "1px solid #fca5a5", borderRadius: "8px", fontSize: "14px", fontWeight: "600", cursor: "pointer", transition: "0.2s" },

//   // Modal
//   modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(15, 23, 42, 0.6)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 },
//   modalContent: { background: "#fff", padding: "30px", borderRadius: "16px", width: "400px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" },
//   modalTitle: { margin: "0 0 20px 0", color: "#1e293b", fontSize: "20px", fontWeight: "700" },
//   inputLabel: { display: "block", fontSize: "13px", color: "#475569", marginBottom: "6px", fontWeight: "600" },
//   input: { width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", boxSizing: "border-box", outline: "none", transition: "border-color 0.2s" },
//   saveBtn: { flex: 1, background: "#16a34a", color: "#fff", border: "none", padding: "12px", borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "14px" },
//   cancelBtn: { flex: 1, background: "#f1f5f9", color: "#475569", border: "1px solid #cbd5e1", padding: "12px", borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "14px" }
// };

// export default ProductDetails;





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

//   // --- MODAL STATES ---
//   const [isEditing, setIsEditing] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);

//   const [editForm, setEditForm] = useState({
//     price: "",
//     costing_price: "",
//     description: "",
//     Supplier_name: "" // 👈 Added Supplier Name here
//   });

//   const user = useSelector((state) => state.user.userData);
//   const isAdmin = user?.userType === "admin";
//   const isSuperUser = user?.userType === "superuser";
//   const canEdit = isAdmin || isSuperUser;

//   const fetchProduct = useCallback(async () => {
//     try {
//       const res = await api.get(`/products/${id}`);
//       setProduct(res.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching product", error);
//       toast.error("Error fetching product details");
//       setLoading(false);
//     }
//   }, [id]);

//   useEffect(() => {
//     fetchProduct();
//   }, [fetchProduct]);

//   // --- EXCEL & IMAGE LOGIC ---
//   const downloadOneProductExcel = () => {
//     if (!product) return;
//     const dataToExport = [
//       {
//         "Product Name": product.name,
//         SKU: product.sku,
//         Category: product.category,
//         Color: product.color,
//         Size: product.size,
//         Price: product.price,
//         "Cost Price": canEdit ? product.costing_price : "N/A",
//         Stock: product.Qty,
//         Supplier: canEdit ? product.Supplier_name : "N/A",
//         Status: product.Qty > 0 ? "In Stock" : "Out of Stock",
//         Description: product.description,
//         "Product Image Link": product.img || "No Image",
//         "Barcode Link": product.barcodeImg || "No Barcode"
//       }
//     ];
//     const worksheet = XLSX.utils.json_to_sheet(dataToExport);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Product Details");
//     XLSX.writeFile(workbook, `${product.sku}_Details.xlsx`);
//     toast.success("Excel downloaded successfully!");
//   };

//   const downloadImage = async (imageUrl, fileName) => {
//     try {
//       const response = await fetch(imageUrl);
//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = fileName || "download.jpg";
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Download failed", error);
//       toast.error("Failed to download image");
//     }
//   };

//   // --- EDIT HANDLERS ---
//   const handleEditClick = () => {
//     setEditForm({
//       price: product.price,
//       costing_price: product.costing_price,
//       description: product.description || "",
//       Supplier_name: product.Supplier_name || "" // 👈 Prefill Supplier
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

//   // --- DELETE HANDLERS ---
//   const openDeleteModal = () => {
//     if (!canEdit) return toast.error("Permission Denied");
//     setShowDeleteModal(true);
//   };

//   const confirmDelete = async () => {
//     try {
//       await api.delete(`/products/${id}`);
//       toast.success("Product Deleted Successfully");
//       navigate("/dashboard");
//     } catch (error) {
//       console.error("Error deleting product", error);
//       toast.error(error.response?.data?.message || "Failed to delete product");
//     }
//     setShowDeleteModal(false);
//   };

//   if (loading) return <div style={styles.centerMsg}>Loading...</div>;
//   if (!product) return <div style={styles.centerMsg}>Not Found</div>;

//   return (
//     <div style={styles.container}>
//       <Header />

//       <div style={styles.mainContent}>
//         <div style={styles.navBar}>
//            <button onClick={() => navigate("/dashboard")} style={styles.backBtn}>⬅ Back</button>
//            <button onClick={downloadOneProductExcel} style={styles.excelBtn}>📥 Excel</button>
//         </div>

//         <div style={styles.productCard}>
//           {/* LEFT: IMAGE ONLY */}
//           <div style={styles.leftCol}>
//             <div style={styles.imgWrapper}>
//               <img src={product.img} alt={product.name} style={styles.productImg} />
//               <button onClick={() => downloadImage(product.img, `${product.name}.jpg`)} style={styles.iconBtn} title="Download">⬇</button>
//             </div>

//             {product.barcodeImg && (
//               <div style={styles.barcodeWrapper}>
//                 <img src={product.barcodeImg} alt="Barcode" style={styles.barcodeImg} />
//                 <button onClick={() => downloadImage(product.barcodeImg, `${product.sku}.jpg`)} style={styles.miniLink}>Download QR</button>
//               </div>
//             )}
//           </div>

//           {/* RIGHT: DETAILS */}
//           <div style={styles.rightCol}>
//             <div style={styles.headerRow}>
//                <div>
//                  <h2 style={styles.title}>{product.name}</h2>
//                  <span style={styles.sku}>SKU: {product.sku}</span>
//                </div>
//                <div style={{textAlign:'right'}}>
//                  <div style={styles.price}>₹{product.price}</div>
//                  <div style={styles.gst}>+ {product.gst}% GST</div>
//                </div>
//             </div>

//             <hr style={styles.divider} />

//             <div style={styles.infoGrid}>
//                <InfoBox label="Category" val={product.category} />
//                <InfoBox label="Color" val={product.color} />
//                <InfoBox label="Size" val={product.size} />
//                <InfoBox label="Status" val={product.Qty > 0 ? "In Stock" : "Out of Stock"} color={product.Qty > 0 ? "green" : "red"} />
//                <InfoBox label="Stock" val={product.Qty} />
//                <InfoBox label="Cost" val={canEdit ? `₹${product.costing_price}` : "--"} />
//                <InfoBox label="Supplier" val={canEdit ? product.Supplier_name : "--"} />
//             </div>

//             {/* SPLIT ROW */}
//             <div style={styles.splitRow}>
//                 <div style={styles.descBox}>
//                     <span style={styles.label}>Description:</span>
//                     <p style={styles.descText}>{product.description || "No description."}</p>
//                 </div>
//                 {canEdit && (
//                     <div style={styles.skuBoxRight}>
//                         <SkuUpdate onUpdated={fetchProduct} prefillProduct={product} />
//                     </div>
//                 )}
//             </div>

//             {/* Action Buttons */}
//             {canEdit && (
//                 <div style={styles.actionRow}>
//                   <button onClick={handleEditClick} style={styles.editBtn}>✏️ Edit</button>
//                   <button onClick={openDeleteModal} style={styles.delBtn}>🗑 Delete</button>
//                 </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* --- EDIT MODAL --- */}
//       {isEditing && (
//         <div style={styles.overlay}>
//           <div style={styles.modal}>
//             <h3 style={{margin:'0 0 10px 0', color: "#333"}}>Edit Product Details</h3>

//             <form onSubmit={handleSaveChanges} style={{display:'flex', flexDirection:'column', gap:'10px'}}>

//               {/* Row 1: Cost & Selling Price */}
//               <div style={{display:'flex', gap:'10px'}}>
//                  <div style={{flex: 1}}>
//                     <label style={styles.label}>Cost Price (₹)</label>
//                     <input 
//                         type="number" 
//                         value={editForm.costing_price} 
//                         onChange={(e)=>setEditForm({...editForm, costing_price:e.target.value})} 
//                         style={styles.input} 
//                         required 
//                     />
//                  </div>
//                  <div style={{flex: 1}}>
//                     <label style={styles.label}>Selling Price (₹)</label>
//                     <input 
//                         type="number" 
//                         value={editForm.price} 
//                         onChange={(e)=>setEditForm({...editForm, price:e.target.value})} 
//                         style={styles.input} 
//                         required 
//                     />
//                  </div>
//               </div>

//               {/* Row 2: Supplier Name (New) */}
//               <div>
//                  <label style={styles.label}>Supplier Name</label>
//                  <input 
//                     type="text" 
//                     value={editForm.Supplier_name} 
//                     onChange={(e)=>setEditForm({...editForm, Supplier_name:e.target.value})} 
//                     style={styles.input} 
//                     required 
//                  />
//               </div>

//               {/* Row 3: Description */}
//               <div>
//                  <label style={styles.label}>Description</label>
//                  <textarea 
//                     value={editForm.description} 
//                     onChange={(e)=>setEditForm({...editForm, description:e.target.value})} 
//                     style={styles.textarea} 
//                  />
//               </div>

//               <div style={{display:'flex', gap:'10px', marginTop: '5px'}}>
//                 <button type="submit" style={styles.saveBtn}>Save Changes</button>
//                 <button type="button" onClick={()=>setIsEditing(false)} style={styles.cancelBtn}>Cancel</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* --- DELETE MODAL --- */}
//       {showDeleteModal && (
//         <div style={styles.overlay}>
//           <div style={{...styles.modal, maxWidth: '350px'}}>
//             <div style={{textAlign: 'center', marginBottom: '15px'}}>
//                <div style={{fontSize: '40px', marginBottom: '10px'}}>⚠️</div>
//                <h3 style={{margin: '0 0 5px 0', color: '#dc2626'}}>Delete Product?</h3>
//                <p style={{fontSize: '13px', color: '#555', margin: 0}}>
//                  Are you sure you want to remove <b>{product.name}</b> permanently?
//                </p>
//             </div>
//             <div style={{display:'flex', gap:'10px'}}>
//                 <button onClick={confirmDelete} style={{...styles.saveBtn, background: '#dc2626'}}>Yes, Delete</button>
//                 <button onClick={()=>setShowDeleteModal(false)} style={styles.cancelBtn}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// };

// const InfoBox = ({ label, val, color }) => (
//   <div style={{background:'#f8fafc', padding:'5px 8px', borderRadius:'4px', border:'1px solid #e2e8f0'}}>
//     <div style={{fontSize:'10px', color:'#64748b', fontWeight:'700', textTransform:'uppercase'}}>{label}</div>
//     <div style={{fontSize:'13px', fontWeight:'600', color: color || '#334155'}}>{val}</div>
//   </div>
// );

// // ✨ CSS SAME AS BEFORE (Compact Layout)
// const styles = {
//   container: {
//     height: "100vh",
//     width: "100%",
//     overflow: "hidden",
//     backgroundColor: "#f1f5f9",
//     display: "flex",
//     flexDirection: "column",
//     fontFamily: "'Segoe UI', sans-serif",
//   },
//   centerMsg: { display:'flex', height:'100vh', alignItems:'center', justifyContent:'center', color:'#666' },
//   mainContent: { flex: 1, padding: "10px 20px", display: "flex", flexDirection: "column", gap: "10px", overflow: "hidden" },
//   navBar: { display:'flex', justifyContent:'space-between', height: '30px', alignItems:'center', flexShrink: 0 },
//   backBtn: { background:'none', border:'none', color:'#64748b', cursor:'pointer', fontWeight:'600', fontSize:'13px' },
//   excelBtn: { background:'#107c41', color:'#fff', border:'none', borderRadius:'4px', padding:'4px 10px', fontSize:'12px', cursor:'pointer' },
//   productCard: { display: "flex", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", overflow: "hidden", flex: 1, border: "1px solid #e2e8f0", minHeight: 0 },

//   // Left
//   leftCol: { width: "30%", minWidth: "250px", backgroundColor: "#f8fafc", padding: "15px", borderRight: "1px solid #e2e8f0", display: "flex", flexDirection: "column", gap: "10px", overflowY: "auto" },
//   imgWrapper: { position:'relative', background:'#fff', borderRadius:'6px', border:'1px solid #e2e8f0', padding:'5px', textAlign:'center', flex: 1, display:'flex', alignItems:'center', justifyContent:'center', minHeight: "200px" },
//   productImg: { maxWidth:'100%', maxHeight:'100%', objectFit:'contain' },
//   iconBtn: { position:'absolute', top:'5px', right:'5px', background:'#eee', border:'none', borderRadius:'50%', width:'24px', height:'24px', cursor:'pointer' },
//   barcodeWrapper: { background:'#fff', padding:'5px', borderRadius:'6px', border:'1px dashed #ccc', textAlign:'center', flexShrink: 0 },
//   barcodeImg: { height:'35px', maxWidth:'100%' },
//   miniLink: { fontSize:'10px', color:'#2563eb', background:'none', border:'none', cursor:'pointer', textDecoration:'underline' },

//   // Right
//   rightCol: { width: "70%", padding: "15px", display: "flex", flexDirection: "column", overflowY: "auto" },
//   headerRow: { display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexShrink: 0 },
//   title: { fontSize:'20px', margin:0, color:'#1e293b', fontWeight:'700' },
//   sku: { fontSize:'12px', color:'#64748b', background:'#f1f5f9', padding:'2px 6px', borderRadius:'4px' },
//   price: { fontSize:'22px', fontWeight:'800', color:'#059669' },
//   gst: { fontSize:'11px', color:'#64748b' },
//   divider: { border:'0', borderTop:'1px solid #e2e8f0', margin:'10px 0' },
//   infoGrid: { display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'8px', marginBottom:'10px', flexShrink: 0 },
//   splitRow: { display: "flex", gap: "15px", flex: 1, minHeight: "0", marginBottom: "5px" },
//   descBox: { flex: 2, background:'#fdfdfd', border:'1px solid #f1f5f9', borderRadius:'6px', padding:'10px', overflowY:'auto' },
//   skuBoxRight: { flex: 1, background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
//   label: { fontSize:'11px', fontWeight:'700', color:'#475569', display:'block', marginBottom:'3px' },
//   descText: { fontSize:'13px', margin:0, color:'#334155', lineHeight:'1.4' },
//   actionRow: { display:'flex', gap:'10px', marginTop:'auto', flexShrink: 0 },
//   editBtn: { flex:1, padding:'8px', background:'#2563eb', color:'#fff', border:'none', borderRadius:'4px', cursor:'pointer', fontWeight:'600' },
//   delBtn: { flex:1, padding:'8px', background:'#fff', color:'#dc2626', border:'1px solid #fca5a5', borderRadius:'4px', cursor:'pointer', fontWeight:'600' },

//   // Modal
//   overlay: { position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.5)', display:'flex', justifyContent:'center', alignItems:'center', zIndex:100 },
//   modal: { background:'#fff', padding:'20px', borderRadius:'8px', width:'350px' }, // Width thodi badha di
//   input: { padding:'8px', width:'100%', borderRadius:'4px', border:'1px solid #ccc', fontSize:'13px', boxSizing:'border-box' },
//   textarea: { padding:'8px', width:'100%', height:'60px', borderRadius:'4px', border:'1px solid #ccc', fontSize:'13px', resize:'none', boxSizing:'border-box' },
//   saveBtn: { flex:1, background:'#16a34a', color:'#fff', border:'none', padding:'8px', borderRadius:'4px', cursor:'pointer' },
//   cancelBtn: { flex:1, background:'#f1f5f9', color:'#333', border:'1px solid #ccc', padding:'8px', borderRadius:'4px', cursor:'pointer' }
// };

// export default ProductDetails;







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

//   // --- NEW STATES FOR HISTORY ---
//   const [showHistory, setShowHistory] = useState(false);
//   const [productLogs, setProductLogs] = useState([]);
//   const [logsLoading, setLogsLoading] = useState(false);

//   // --- MODAL STATES ---
//   const [isEditing, setIsEditing] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);

//   const [editForm, setEditForm] = useState({
//     price: "",
//     costing_price: "",
//     description: "",
//     Supplier_name: "" 
//   });

//   const user = useSelector((state) => state.user.userData);
//   const isAdmin = user?.userType === "admin";
//   const isSuperUser = user?.userType === "superuser";
//   const canEdit = isAdmin || isSuperUser;

//   const fetchProduct = useCallback(async () => {
//     try {
//       const res = await api.get(`/products/${id}`);
//       setProduct(res.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching product", error);
//       toast.error("Error fetching product details");
//       setLoading(false);
//     }
//   }, [id]);

//   useEffect(() => {
//     fetchProduct();
//   }, [fetchProduct]);

//   // --- NEW: FETCH PRODUCT HISTORY ---

//   // const fetchProductHistory = async () => {
//   //   setShowHistory(true);
//   //   setLogsLoading(true);
//   //   try {
//   //     // Backend route check karna: /api/logs/product/:id
//   //     const res = await api.get(`/logs/product/${id}`);
//   //     setProductLogs(res.data);
//   //   } catch (error) {
//   //     toast.error("Failed to load history");
//   //   } finally {
//   //     setLogsLoading(false);
//   //   }
//   // };

//   // --- EXCEL & IMAGE LOGIC (Existing) ---
//   const downloadOneProductExcel = () => {
//     if (!product) return;
//     const dataToExport = [{
//         "Product Name": product.name,
//         SKU: product.sku,
//         Category: product.category,
//         Price: product.price,
//         Stock: product.Qty,
//         Supplier: canEdit ? product.Supplier_name : "N/A",
//         Description: product.description,
//     }];
//     const worksheet = XLSX.utils.json_to_sheet(dataToExport);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Product Details");
//     XLSX.writeFile(workbook, `${product.sku}_Details.xlsx`);
//     toast.success("Excel downloaded!");
//   };

//   const downloadImage = async (imageUrl, fileName) => {
//     try {
//       const response = await fetch(imageUrl);
//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = fileName || "download.jpg";
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       toast.error("Download failed");
//     }
//   };

//   const handleEditClick = () => {
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

//   if (loading) return <div style={styles.centerMsg}>Loading...</div>;
//   if (!product) return <div style={styles.centerMsg}>Not Found</div>;

//   return (
//     <div style={styles.container}>
//       <Header />

//       <div style={styles.mainContent}>
//         <div style={styles.navBar}>
//            <button onClick={() => navigate("/dashboard")} style={styles.backBtn}>⬅ Back</button>
//            <div style={{display:'flex', gap:'10px'}}>
//              {/* 👇 NEW HISTORY BUTTON */}
//              <button onClick={fetchProductHistory} style={styles.historyBtn}>📜 History</button>
//              <button onClick={downloadOneProductExcel} style={styles.excelBtn}>📥 Excel</button>
//            </div>
//         </div>

//         <div style={styles.productCard}>
//           <div style={styles.leftCol}>
//             <div style={styles.imgWrapper}>
//               <img src={product.img} alt={product.name} style={styles.productImg} />
//               <button onClick={() => downloadImage(product.img, `${product.name}.jpg`)} style={styles.iconBtn} title="Download">⬇</button>
//             </div>
//             {product.barcodeImg && (
//               <div style={styles.barcodeWrapper}>
//                 <img src={product.barcodeImg} alt="Barcode" style={styles.barcodeImg} />
//                 <button onClick={() => downloadImage(product.barcodeImg, `${product.sku}.jpg`)} style={styles.miniLink}>Download QR</button>
//               </div>
//             )}
//           </div>

//           <div style={styles.rightCol}>
//             <div style={styles.headerRow}>
//                <div>
//                  <h2 style={styles.title}>{product.name}</h2>
//                  <span style={styles.sku}>SKU: {product.sku}</span>
//                </div>
//                <div style={{textAlign:'right'}}>
//                  <div style={styles.price}>₹{product.price}</div>
//                  <div style={styles.gst}>+ {product.gst}% GST</div>
//                </div>
//             </div>

//             <hr style={styles.divider} />

//             <div style={styles.infoGrid}>
//                <InfoBox label="Category" val={product.category} />
//                <InfoBox label="Color" val={product.color} />
//                <InfoBox label="Size" val={product.size} />
//                <InfoBox label="Status" val={product.Qty > 0 ? "In Stock" : "Out of Stock"} color={product.Qty > 0 ? "green" : "red"} />
//                <InfoBox label="Stock" val={product.Qty} />
//                <InfoBox label="Cost" val={canEdit ? `₹${product.costing_price}` : "--"} />
//                <InfoBox label="Supplier" val={canEdit ? product.Supplier_name : "--"} />
//             </div>

//             <div style={styles.splitRow}>
//                 <div style={styles.descBox}>
//                     <span style={styles.label}>Description:</span>
//                     <p style={styles.descText}>{product.description || "No description."}</p>
//                 </div>
//                 {canEdit && (
//                     <div style={styles.skuBoxRight}>
//                         <SkuUpdate onUpdated={fetchProduct} prefillProduct={product} />
//                     </div>
//                 )}
//             </div>

//             {canEdit && (
//                 <div style={styles.actionRow}>
//                   <button onClick={handleEditClick} style={styles.editBtn}>✏️ Edit</button>
//                   <button onClick={() => setShowDeleteModal(true)} style={styles.delBtn}>🗑 Delete</button>
//                 </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* --- MODAL: PRODUCT HISTORY --- */}
//       {showHistory && (
//         <div style={styles.overlay}>
//           <div style={{...styles.modal, width: '650px', maxWidth: '95%'}}>
//             <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'15px'}}>
//               <h3 style={{margin:0}}>Product Audit Trail</h3>
//               <button onClick={()=>setShowHistory(false)} style={{border:'none', background:'none', cursor:'pointer', fontSize:'20px'}}>×</button>
//             </div>

//             <div style={styles.logsTableWrapper}>
//               <table style={{width:'100%', borderCollapse:'collapse'}}>
//                 <thead style={{position:'sticky', top:0, background:'#f8fafc'}}>
//                   <tr>
//                     <th style={styles.thMini}>Time</th>
//                     <th style={styles.thMini}>User</th>
//                     <th style={styles.thMini}>Action</th>
//                     <th style={styles.thMini}>Changes</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {logsLoading ? (
//                     <tr><td colSpan="4" style={{textAlign:'center', padding:'20px'}}>Loading History...</td></tr>
//                   ) : productLogs.length === 0 ? (
//                     <tr><td colSpan="4" style={{textAlign:'center', padding:'20px'}}>No history found.</td></tr>
//                   ) : (
//                     productLogs.map(log => (
//                       <tr key={log._id} style={{borderBottom:'1px solid #f1f5f9'}}>
//                         <td style={styles.tdMini}>{new Date(log.timestamp).toLocaleString()}</td>
//                         <td style={{...styles.tdMini, fontWeight:'bold'}}>{log.actorName}</td>
//                         <td style={styles.tdMini}>
//                           <span style={{...styles.badge, background: log.action.includes('UPDATE') ? '#e0f2fe' : '#f3f4f6', color: log.action.includes('UPDATE') ? '#0369a1' : '#374151'}}>
//                             {log.action}
//                           </span>
//                         </td>
//                         <td style={{...styles.tdMini, fontSize:'12px'}}>{log.details}</td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//             <button onClick={()=>setShowHistory(false)} style={{...styles.cancelBtn, marginTop:'15px', width:'100%'}}>Close</button>
//           </div>
//         </div>
//       )}

//       {/* --- EDIT MODAL --- */}
//       {isEditing && (
//         <div style={styles.overlay}>
//           <div style={styles.modal}>
//             <h3 style={{margin:'0 0 10px 0', color: "#333"}}>Edit Product Details</h3>
//             <form onSubmit={handleSaveChanges} style={{display:'flex', flexDirection:'column', gap:'10px'}}>
//               <div style={{display:'flex', gap:'10px'}}>
//                  <div style={{flex: 1}}>
//                     <label style={styles.label}>Cost Price (₹)</label>
//                     <input type="number" value={editForm.costing_price} onChange={(e)=>setEditForm({...editForm, costing_price:e.target.value})} style={styles.input} required />
//                  </div>
//                  <div style={{flex: 1}}>
//                     <label style={styles.label}>Selling Price (₹)</label>
//                     <input type="number" value={editForm.price} onChange={(e)=>setEditForm({...editForm, price:e.target.value})} style={styles.input} required />
//                  </div>
//               </div>
//               <div>
//                  <label style={styles.label}>Supplier Name</label>
//                  <input type="text" value={editForm.Supplier_name} onChange={(e)=>setEditForm({...editForm, Supplier_name:e.target.value})} style={styles.input} required />
//               </div>
//               <div>
//                  <label style={styles.label}>Description</label>
//                  <textarea value={editForm.description} onChange={(e)=>setEditForm({...editForm, description:e.target.value})} style={styles.textarea} />
//               </div>
//               <div style={{display:'flex', gap:'10px'}}>
//                 <button type="submit" style={styles.saveBtn}>Save Changes</button>
//                 <button type="button" onClick={()=>setIsEditing(false)} style={styles.cancelBtn}>Cancel</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* --- DELETE MODAL --- */}
//       {showDeleteModal && (
//         <div style={styles.overlay}>
//           <div style={{...styles.modal, maxWidth: '350px'}}>
//             <div style={{textAlign: 'center', marginBottom: '15px'}}>
//                <div style={{fontSize: '40px', marginBottom: '10px'}}>⚠️</div>
//                <h3 style={{margin: '0 0 5px 0', color: '#dc2626'}}>Delete Product?</h3>
//                <p style={{fontSize: '13px', color: '#555', margin: 0}}>Are you sure you want to remove <b>{product.name}</b> permanently?</p>
//             </div>
//             <div style={{display:'flex', gap:'10px'}}>
//                 <button onClick={confirmDelete} style={{...styles.saveBtn, background: '#dc2626'}}>Yes, Delete</button>
//                 <button onClick={()=>setShowDeleteModal(false)} style={styles.cancelBtn}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// };

// const InfoBox = ({ label, val, color }) => (
//   <div style={{background:'#f8fafc', padding:'5px 8px', borderRadius:'4px', border:'1px solid #e2e8f0'}}>
//     <div style={{fontSize:'10px', color:'#64748b', fontWeight:'700', textTransform:'uppercase'}}>{label}</div>
//     <div style={{fontSize:'13px', fontWeight:'600', color: color || '#334155'}}>{val}</div>
//   </div>
// );

// // ✨ UPDATED STYLES
// const styles = {
//   container: { height: "100vh", width: "100%", overflow: "hidden", backgroundColor: "#f1f5f9", display: "flex", flexDirection: "column", fontFamily: "'Inter', sans-serif" },
//   centerMsg: { display:'flex', height:'100vh', alignItems:'center', justifyContent:'center', color:'#666' },
//   mainContent: { flex: 1, padding: "10px 20px", display: "flex", flexDirection: "column", gap: "10px", overflow: "hidden" },
//   navBar: { display:'flex', justifyContent:'space-between', height: '35px', alignItems:'center', flexShrink: 0 },
//   backBtn: { background:'none', border:'none', color:'#64748b', cursor:'pointer', fontWeight:'600', fontSize:'13px' },
//   excelBtn: { background:'#107c41', color:'#fff', border:'none', borderRadius:'4px', padding:'5px 12px', fontSize:'12px', cursor:'pointer' },
//   historyBtn: { background:'#475569', color:'#fff', border:'none', borderRadius:'4px', padding:'5px 12px', fontSize:'12px', cursor:'pointer' },
//   productCard: { display: "flex", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", overflow: "hidden", flex: 1, border: "1px solid #e2e8f0", minHeight: 0 },
//   leftCol: { width: "30%", minWidth: "250px", backgroundColor: "#f8fafc", padding: "15px", borderRight: "1px solid #e2e8f0", display: "flex", flexDirection: "column", gap: "10px", overflowY: "auto" },
//   imgWrapper: { position:'relative', background:'#fff', borderRadius:'6px', border:'1px solid #e2e8f0', padding:'5px', textAlign:'center', flex: 1, display:'flex', alignItems:'center', justifyContent:'center', minHeight: "200px" },
//   productImg: { maxWidth:'100%', maxHeight:'100%', objectFit:'contain' },
//   iconBtn: { position:'absolute', top:'5px', right:'5px', background:'#eee', border:'none', borderRadius:'50%', width:'24px', height:'24px', cursor:'pointer' },
//   barcodeWrapper: { background:'#fff', padding:'5px', borderRadius:'6px', border:'1px dashed #ccc', textAlign:'center', flexShrink: 0 },
//   barcodeImg: { height:'35px', maxWidth:'100%' },
//   miniLink: { fontSize:'10px', color:'#2563eb', background:'none', border:'none', cursor:'pointer', textDecoration:'underline' },
//   rightCol: { width: "70%", padding: "15px", display: "flex", flexDirection: "column", overflowY: "auto" },
//   headerRow: { display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexShrink: 0 },
//   title: { fontSize:'20px', margin:0, color:'#1e293b', fontWeight:'700' },
//   sku: { fontSize:'12px', color:'#64748b', background:'#f1f5f9', padding:'2px 6px', borderRadius:'4px' },
//   price: { fontSize:'22px', fontWeight:'800', color:'#059669' },
//   gst: { fontSize:'11px', color:'#64748b' },
//   divider: { border:'0', borderTop:'1px solid #e2e8f0', margin:'10px 0' },
//   infoGrid: { display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'8px', marginBottom:'10px', flexShrink: 0 },
//   splitRow: { display: "flex", gap: "15px", flex: 1, minHeight: "0", marginBottom: "5px" },
//   descBox: { flex: 2, background:'#fdfdfd', border:'1px solid #f1f5f9', borderRadius:'6px', padding:'10px', overflowY:'auto' },
//   skuBoxRight: { flex: 1, background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
//   label: { fontSize:'11px', fontWeight:'700', color:'#475569', display:'block', marginBottom:'3px' },
//   descText: { fontSize:'13px', margin:0, color:'#334155', lineHeight:'1.4' },
//   actionRow: { display:'flex', gap:'10px', marginTop:'auto', flexShrink: 0 },
//   editBtn: { flex:1, padding:'8px', background:'#2563eb', color:'#fff', border:'none', borderRadius:'4px', cursor:'pointer', fontWeight:'600' },
//   delBtn: { flex:1, padding:'8px', background:'#fff', color:'#dc2626', border:'1px solid #fca5a5', borderRadius:'4px', cursor:'pointer', fontWeight:'600' },
//   overlay: { position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.5)', display:'flex', justifyContent:'center', alignItems:'center', zIndex:100 },
//   modal: { background:'#fff', padding:'20px', borderRadius:'8px', width:'400px', boxShadow: "0 10px 25px rgba(0,0,0,0.1)" },
//   logsTableWrapper: { maxHeight: '300px', overflowY: 'auto', border: '1px solid #f1f5f9', marginTop: '10px' },
//   thMini: { padding: "10px", textAlign: "left", fontSize: "11px", color: "#64748b", textTransform: "uppercase", background: "#f8fafc" },
//   tdMini: { padding: "10px", fontSize: "13px", color: "#334155" },
//   badge: { padding: "2px 6px", borderRadius: "4px", fontSize: "11px", fontWeight: "bold" },
//   input: { padding:'8px', width:'100%', borderRadius:'4px', border:'1px solid #ccc', fontSize:'13px', boxSizing:'border-box' },
//   textarea: { padding:'8px', width:'100%', height:'60px', borderRadius:'4px', border:'1px solid #ccc', fontSize:'13px', resize:'none', boxSizing:'border-box' },
//   saveBtn: { flex:1, background:'#16a34a', color:'#fff', border:'none', padding:'8px', borderRadius:'4px', cursor:'pointer' },
//   cancelBtn: { flex:1, background:'#f1f5f9', color:'#333', border:'1px solid #ccc', padding:'8px', borderRadius:'4px', cursor:'pointer' }
// };

// export default ProductDetails;












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

//   // --- MODAL & EDIT STATES ---
//   const [isEditing, setIsEditing] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [editForm, setEditForm] = useState({
//     price: "", costing_price: "", description: "", Supplier_name: "" 
//   });

//   const user = useSelector((state) => state.user.userData);
//   const isAdmin = user?.userType === "admin";
//   const isSuperUser = user?.userType === "superuser";
//   const canEdit = isAdmin || isSuperUser; // 👈 Admin aur Superuser check

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

//   // --- 🔍 HISTORY LOGIC (RESTRICTED) ---
//   const fetchProductHistory = async (sDate = "", eDate = "") => {
//     // 🛑 Security Check: Agar Admin/Superuser nahi hai toh function block kar do
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
//            <button onClick={() => navigate("/dashboard")} style={styles.backBtn}>⬅ Back</button>
//            <div style={{display:'flex', gap:'10px'}}>
//              {/* 👇 RESTRICTED BUTTON: Only Admin/Superuser can see this */}
//              {canEdit && (
//                <button onClick={() => fetchProductHistory("", "")} style={styles.historyBtn}>📜 History</button>
//              )}
//              <button onClick={downloadOneProductExcel} style={styles.excelBtn}>📥 Excel</button>
//            </div>
//         </div>

//         <div style={styles.productCard}>
//           <div style={styles.leftCol}>
//             <div style={styles.imgWrapper}>
//               <img src={product.img} alt={product.name} style={styles.productImg} />
//               <button onClick={() => downloadImage(product.img, `${product.name}.jpg`)} style={styles.iconBtn}>⬇</button>
//             </div>
//             {product.barcodeImg && (
//               <div style={styles.barcodeWrapper}>
//                 <img src={product.barcodeImg} alt="Barcode" style={styles.barcodeImg} />
//                 <button onClick={() => downloadImage(product.barcodeImg, `${product.sku}.jpg`)} style={styles.miniLink}>Download QR</button>
//               </div>
//             )}
//           </div>

//           <div style={styles.rightCol}>
//             <div style={styles.headerRow}>
//                <div>
//                  <h2 style={styles.title}>{product.name}</h2>
//                  <span style={styles.sku}>SKU: {product.sku}</span>
//                </div>
//                <div style={{textAlign:'right'}}>
//                  <div style={styles.price}>₹{product.price}</div>
//                  <div style={styles.gst}>+ {product.gst}% GST</div>
//                </div>
//             </div>
//             <hr style={styles.divider} />
//             <div style={styles.infoGrid}>
//                <InfoBox label="Category" val={product.category} />
//                <InfoBox label="Color" val={product.color} />
//                <InfoBox label="Size" val={product.size} />
//                <InfoBox label="Stock" val={product.Qty} color={product.Qty < 5 ? 'red' : 'green'} />
//                <InfoBox label="Cost" val={canEdit ? `₹${product.costing_price}` : "--"} />
//                <InfoBox label="Supplier" val={canEdit ? product.Supplier_name : "--"} />
//             </div>

//             <div style={styles.splitRow}>
//                 <div style={styles.descBox}>
//                     <span style={styles.label}>Description:</span>
//                     <p style={styles.descText}>{product.description || "No description."}</p>
//                 </div>
//                 {canEdit && (
//                     <div style={styles.skuBoxRight}>
//                         <SkuUpdate onUpdated={fetchProduct} prefillProduct={product} />
//                     </div>
//                 )}
//             </div>

//             {canEdit && (
//                 <div style={styles.actionRow}>
//                   <button onClick={handleEditClick} style={styles.editBtn}>✏️ Edit</button>
//                   <button onClick={() => setShowDeleteModal(true)} style={styles.delBtn}>🗑 Delete</button>
//                 </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* --- MODAL: PRODUCT HISTORY (Only opens if canEdit is true) --- */}
//       {showHistory && canEdit && (
//         <div style={styles.overlay}>
//           <div style={{...styles.modal, width: '750px', maxWidth: '95%'}}>
//             <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'15px'}}>
//               <h3 style={{margin:0}}>Product Audit Trail</h3>
//               <button onClick={()=>setShowHistory(false)} style={{border:'none', background:'none', cursor:'pointer', fontSize:'20px'}}>×</button>
//             </div>

//             <div style={styles.modalFilterBar}>
//               <div style={{display:'flex', gap:'10px', flex: 1}}>
//                 <input type="date" value={startDate} onChange={(e)=>setStartDate(e.target.value)} style={styles.modalDateInput} />
//                 <input type="date" value={endDate} onChange={(e)=>setEndDate(e.target.value)} style={styles.modalDateInput} />
//               </div>
//               <div style={{display:'flex', gap:'5px'}}>
//                 <button onClick={handleFilterApply} style={styles.applyBtn}>🔍 Filter</button>
//                 <button onClick={handleFilterReset} style={styles.resetBtnSmall}>🔄 Reset</button>
//               </div>
//             </div>

//             <div style={styles.logsTableWrapper}>
//               <table style={{width:'100%', borderCollapse:'collapse'}}>
//                 <thead style={{position:'sticky', top:0, background:'#f8fafc'}}>
//                   <tr><th style={styles.thMini}>Time</th><th style={styles.thMini}>User</th><th style={styles.thMini}>Action</th><th style={styles.thMini}>Changes</th></tr>
//                 </thead>
//                 <tbody>
//                   {logsLoading ? (
//                     <tr><td colSpan="4" style={{textAlign:'center', padding:'20px'}}>Loading...</td></tr>
//                   ) : productLogs.length === 0 ? (
//                     <tr><td colSpan="4" style={{textAlign:'center', padding:'20px'}}>No records found.</td></tr>
//                   ) : (
//                     productLogs.map(log => (
//                       <tr key={log._id} style={{borderBottom:'1px solid #f1f5f9'}}>
//                         <td style={styles.tdMini}>{new Date(log.timestamp).toLocaleString()}</td>
//                         <td style={{...styles.tdMini, fontWeight:'bold'}}>{log.actorName}</td>
//                         <td style={styles.tdMini}>
//                           <span style={{...styles.badge, background: log.action.includes('UPDATE') ? '#e0f2fe' : '#f3f4f6', color: log.action.includes('UPDATE') ? '#0369a1' : '#374151'}}>
//                             {log.action}
//                           </span>
//                         </td>
//                         <td style={{...styles.tdMini, fontSize:'12px'}}>{log.details}</td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//             <button onClick={()=>setShowHistory(false)} style={{...styles.cancelBtn, marginTop:'15px', width:'100%'}}>Close</button>
//           </div>
//         </div>
//       )}

//       {/* --- MODAL: EDIT FORM --- */}
//       {isEditing && canEdit && (
//         <div style={styles.overlay}>
//           <div style={styles.modal}>
//             <h3 style={{margin:'0 0 10px 0'}}>Edit Product</h3>
//             <form onSubmit={handleSaveChanges} style={{display:'flex', flexDirection:'column', gap:'10px'}}>
//               <div style={{display:'flex', gap:'10px'}}>
//                  <div style={{flex: 1}}>
//                     <label style={styles.label}>Cost Price</label>
//                     <input type="number" value={editForm.costing_price} onChange={(e)=>setEditForm({...editForm, costing_price:e.target.value})} style={styles.input} required />
//                  </div>
//                  <div style={{flex: 1}}>
//                     <label style={styles.label}>Selling Price</label>
//                     <input type="number" value={editForm.price} onChange={(e)=>setEditForm({...editForm, price:e.target.value})} style={styles.input} required />
//                  </div>
//               </div>
//               <label style={styles.label}>Supplier Name</label>
//               <input type="text" value={editForm.Supplier_name} onChange={(e)=>setEditForm({...editForm, Supplier_name:e.target.value})} style={styles.input} required />
//               <label style={styles.label}>Description</label>
//               <textarea value={editForm.description} onChange={(e)=>setEditForm({...editForm, description:e.target.value})} style={styles.textarea} />
//               <div style={{display:'flex', gap:'10px', marginTop:'10px'}}>
//                 <button type="submit" style={styles.saveBtn}>Save</button>
//                 <button type="button" onClick={()=>setIsEditing(false)} style={styles.cancelBtn}>Cancel</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* --- MODAL: DELETE CONFIRM --- */}
//       {showDeleteModal && canEdit && (
//         <div style={styles.overlay}>
//           <div style={{...styles.modal, maxWidth: '350px', textAlign:'center'}}>
//             <h3 style={{color: '#dc2626'}}>Delete Product?</h3>
//             <p style={{fontSize:'13px'}}>Are you sure you want to delete <b>{product.name}</b> permanently?</p>
//             <div style={{display:'flex', gap:'10px', marginTop:'20px'}}>
//                 <button onClick={confirmDelete} style={{...styles.saveBtn, background: '#dc2626'}}>Yes, Delete</button>
//                 <button onClick={()=>setShowDeleteModal(false)} style={styles.cancelBtn}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // InfoBox component (helper)
// const InfoBox = ({ label, val, color }) => (
//   <div style={{background:'#f8fafc', padding:'5px 8px', borderRadius:'4px', border:'1px solid #e2e8f0'}}>
//     <div style={{fontSize:'10px', color:'#64748b', fontWeight:'700', textTransform:'uppercase'}}>{label}</div>
//     <div style={{fontSize:'13px', fontWeight:'600', color: color || '#334155'}}>{val}</div>
//   </div>
// );

// // ✨ STYLES
// const styles = {
//   container: { height: "100vh", width: "100%", overflow: "hidden", backgroundColor: "#f1f5f9", display: "flex", flexDirection: "column", fontFamily: "'Inter', sans-serif" },
//   centerMsg: { display:'flex', height:'100vh', alignItems:'center', justifyContent:'center', color:'#666' },
//   mainContent: { flex: 1, padding: "10px 20px", display: "flex", flexDirection: "column", gap: "10px", overflow: "hidden" },
//   navBar: { display:'flex', justifyContent:'space-between', height: '35px', alignItems:'center', flexShrink: 0 },
//   backBtn: { background:'none', border:'none', color:'#64748b', cursor:'pointer', fontWeight:'600', fontSize:'13px' },
//   excelBtn: { background:'#107c41', color:'#fff', border:'none', borderRadius:'4px', padding:'5px 12px', fontSize:'12px', cursor:'pointer' },
//   historyBtn: { background:'#475569', color:'#fff', border:'none', borderRadius:'4px', padding:'5px 12px', fontSize:'12px', cursor:'pointer' },
//   productCard: { display: "flex", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", overflow: "hidden", flex: 1, border: "1px solid #e2e8f0", minHeight: 0 },
//   leftCol: { width: "30%", minWidth: "250px", backgroundColor: "#f8fafc", padding: "15px", borderRight: "1px solid #e2e8f0", display: "flex", flexDirection: "column", gap: "10px", overflowY: "auto" },
//   imgWrapper: { position:'relative', background:'#fff', borderRadius:'6px', border:'1px solid #e2e8f0', padding:'5px', textAlign:'center', flex: 1, display:'flex', alignItems:'center', justifyContent:'center', minHeight: "200px" },
//   productImg: { maxWidth:'100%', maxHeight:'100%', objectFit:'contain' },
//   iconBtn: { position:'absolute', top:'5px', right:'5px', background:'#eee', border:'none', borderRadius:'50%', width:'24px', height:'24px', cursor:'pointer' },
//   barcodeWrapper: { background:'#fff', padding:'5px', borderRadius:'6px', border:'1px dashed #ccc', textAlign:'center', flexShrink: 0 },
//   barcodeImg: { height:'35px', maxWidth:'100%' },
//   miniLink: { fontSize:'10px', color:'#2563eb', background:'none', border:'none', cursor:'pointer', textDecoration:'underline' },
//   rightCol: { width: "70%", padding: "15px", display: "flex", flexDirection: "column", overflowY: "auto" },
//   headerRow: { display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexShrink: 0 },
//   title: { fontSize:'20px', margin:0, color:'#1e293b', fontWeight:'700' },
//   sku: { fontSize:'12px', color:'#64748b', background:'#f1f5f9', padding:'2px 6px', borderRadius:'4px' },
//   price: { fontSize:'22px', fontWeight:'800', color:'#059669' },
//   gst: { fontSize:'11px', color:'#64748b' },
//   divider: { border:'0', borderTop:'1px solid #e2e8f0', margin:'10px 0' },
//   infoGrid: { display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'8px', marginBottom:'10px', flexShrink: 0 },
//   splitRow: { display: "flex", gap: "15px", flex: 1, minHeight: "0", marginBottom: "5px" },
//   descBox: { flex: 2, background:'#fdfdfd', border:'1px solid #f1f5f9', borderRadius:'6px', padding:'10px', overflowY:'auto' },
//   skuBoxRight: { flex: 1, background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
//   label: { fontSize:'11px', fontWeight:'700', color:'#475569', display:'block', marginBottom:'3px' },
//   descText: { fontSize:'13px', margin:0, color:'#334155', lineHeight:'1.4' },
//   actionRow: { display:'flex', gap:'10px', marginTop:'auto', flexShrink: 0 },
//   editBtn: { flex:1, padding:'8px', background:'#2563eb', color:'#fff', border:'none', borderRadius:'4px', cursor:'pointer', fontWeight:'600' },
//   delBtn: { flex:1, padding:'8px', background:'#fff', color:'#dc2626', border:'1px solid #fca5a5', borderRadius:'4px', cursor:'pointer', fontWeight:'600' },
//   overlay: { position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.5)', display:'flex', justifyContent:'center', alignItems:'center', zIndex:100 },
//   modal: { background:'#fff', padding:'20px', borderRadius:'8px', width:'750px', boxShadow: "0 10px 25px rgba(0,0,0,0.1)" },
//   logsTableWrapper: { maxHeight: '300px', overflowY: 'auto', border: '1px solid #f1f5f9', marginTop: '10px' },
//   thMini: { padding: "10px", textAlign: "left", fontSize: "11px", color: "#64748b", textTransform: "uppercase", background: "#f8fafc" },
//   tdMini: { padding: "10px", fontSize: "13px", color: "#334155" },
//   badge: { padding: "2px 6px", borderRadius: "4px", fontSize: "11px", fontWeight: "bold" },
//   input: { padding:'8px', width:'100%', borderRadius:'4px', border:'1px solid #ccc', fontSize:'13px', boxSizing:'border-box' },
//   textarea: { padding:'8px', width:'100%', height:'60px', borderRadius:'4px', border:'1px solid #ccc', fontSize:'13px', resize:'none', boxSizing:'border-box' },
//   saveBtn: { flex:1, background:'#16a34a', color:'#fff', border:'none', padding:'8px', borderRadius:'4px', cursor:'pointer' },
//   cancelBtn: { flex:1, background:'#f1f5f9', color:'#333', border:'1px solid #ccc', padding:'8px', borderRadius:'4px', cursor:'pointer' },
//   modalFilterBar: { display: 'flex', gap: '10px', marginBottom: '15px', background: '#f8fafc', padding: '10px', borderRadius: '8px' },
//   modalDateInput: { padding: '5px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '12px', outline: 'none' },
//   applyBtn: { background: '#2563eb', color: '#fff', border: 'none', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' },
//   resetBtnSmall: { background: '#fff', color: '#64748b', border: '1px solid #cbd5e1', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' },
// };

// export default ProductDetails;





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

//   // --- MODAL & EDIT STATES ---
//   const [isEditing, setIsEditing] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [editForm, setEditForm] = useState({
//     price: "", costing_price: "", description: "", Supplier_name: "" 
//   });

//   const user = useSelector((state) => state.user.userData);
//   const isAdmin = user?.userType === "admin";
//   const isSuperUser = user?.userType === "superuser";
//   const canEdit = isAdmin || isSuperUser; // 👈 Admin aur Superuser check

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

//   // --- 🔍 HISTORY LOGIC (RESTRICTED) ---
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
//            <button onClick={() => navigate("/dashboard")} style={styles.backBtn}>⬅ Back</button>

//            {/* 👇 MOVED BUTTONS HERE (Edit, Delete, History, Excel) */}
//            <div style={{display:'flex', gap:'10px'}}>
//              {canEdit && (
//                <>
//                  <button onClick={handleEditClick} style={styles.headerEditBtn}>✏️ Edit</button>
//                  <button onClick={() => setShowDeleteModal(true)} style={styles.headerDelBtn}>🗑 Delete</button>
//                  <button onClick={() => fetchProductHistory("", "")} style={styles.historyBtn}>📜 History</button>
//                </>
//              )}
//              <button onClick={downloadOneProductExcel} style={styles.excelBtn}>📥 Excel</button>
//            </div>
//         </div>

//         <div style={styles.productCard}>
//           <div style={styles.leftCol}>
//             <div style={styles.imgWrapper}>
//               <img src={product.img} alt={product.name} style={styles.productImg} />
//               <button onClick={() => downloadImage(product.img, `${product.name}.jpg`)} style={styles.iconBtn}>⬇</button>
//             </div>
//             {product.barcodeImg && (
//               <div style={styles.barcodeWrapper}>
//                 <img src={product.barcodeImg} alt="Barcode" style={styles.barcodeImg} />
//                 <button onClick={() => downloadImage(product.barcodeImg, `${product.sku}.jpg`)} style={styles.miniLink}>Download QR</button>
//               </div>
//             )}
//           </div>

//           <div style={styles.rightCol}>
//             <div style={styles.headerRow}>
//                <div>
//                  <h2 style={styles.title}>{product.name}</h2>
//                  <span style={styles.sku}>SKU: {product.sku}</span>
//                </div>
//                <div style={{textAlign:'right'}}>
//                  <div style={styles.price}>₹{product.price}</div>
//                {/* <div style={styles.gst}>+ {product.gst}% GST</div> */}
//                </div>
//             </div>
//             <hr style={styles.divider} />
//             <div style={styles.infoGrid}>
//                <InfoBox label="Category" val={product.category} />
//                <InfoBox label="Color" val={product.color} />
//                <InfoBox label="Size" val={product.size} />
//                <InfoBox label="Stock" val={product.Qty} color={product.Qty < 5 ? 'red' : 'green'} />
//                <InfoBox label="Cost" val={canEdit ? `₹${product.costing_price}` : "--"} />
//                <InfoBox label="gst" val={canEdit ? `${product.gst}% GST` : "--"} />
//                <InfoBox label="Supplier" val={canEdit ? product.Supplier_name : "--"} />
//             </div>

//             <div style={styles.splitRow}>
//                 <div style={styles.descBox}>
//                     <span style={styles.label}>Description:</span>
//                     <p style={styles.descText}>{product.description || "No description."}</p>
//                 </div>
//                 {canEdit && (
//                     <div style={styles.skuBoxRight}>
//                         <SkuUpdate onUpdated={fetchProduct} prefillProduct={product} />
//                     </div>
//                 )}
//             </div>

//             {/* 🛑 DELETED: Action Row was here (Edit/Delete buttons removed from bottom) */}
//           </div>
//         </div>
//       </div>

//       {/* --- MODAL: PRODUCT HISTORY --- */}
//       {showHistory && canEdit && (
//         <div style={styles.overlay}>
//           <div style={{...styles.modal, width: '750px', maxWidth: '95%'}}>
//             <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'15px'}}>
//               <h3 style={{margin:0}}>Product Audit Trail</h3>
//               <button onClick={()=>setShowHistory(false)} style={{border:'none', background:'none', cursor:'pointer', fontSize:'20px'}}>×</button>
//             </div>

//             <div style={styles.modalFilterBar}>
//               <div style={{display:'flex', gap:'10px', flex: 1}}>
//                 <input type="date" value={startDate} onChange={(e)=>setStartDate(e.target.value)} style={styles.modalDateInput} />
//                 <input type="date" value={endDate} onChange={(e)=>setEndDate(e.target.value)} style={styles.modalDateInput} />
//               </div>
//               <div style={{display:'flex', gap:'5px'}}>
//                 <button onClick={handleFilterApply} style={styles.applyBtn}>🔍 Filter</button>
//                 <button onClick={handleFilterReset} style={styles.resetBtnSmall}>🔄 Reset</button>
//               </div>
//             </div>

//             <div style={styles.logsTableWrapper}>
//               <table style={{width:'100%', borderCollapse:'collapse'}}>
//                 <thead style={{position:'sticky', top:0, background:'#f8fafc'}}>
//                   <tr><th style={styles.thMini}>Time</th><th style={styles.thMini}>User</th><th style={styles.thMini}>Action</th><th style={styles.thMini}>Changes</th></tr>
//                 </thead>
//                 <tbody>
//                   {logsLoading ? (
//                     <tr><td colSpan="4" style={{textAlign:'center', padding:'20px'}}>Loading...</td></tr>
//                   ) : productLogs.length === 0 ? (
//                     <tr><td colSpan="4" style={{textAlign:'center', padding:'20px'}}>No records found.</td></tr>
//                   ) : (
//                     productLogs.map(log => (
//                       <tr key={log._id} style={{borderBottom:'1px solid #f1f5f9'}}>
//                         <td style={styles.tdMini}>{new Date(log.timestamp).toLocaleString()}</td>
//                         <td style={{...styles.tdMini, fontWeight:'bold'}}>{log.actorName}</td>
//                         <td style={styles.tdMini}>
//                           <span style={{...styles.badge, background: log.action.includes('UPDATE') ? '#e0f2fe' : '#f3f4f6', color: log.action.includes('UPDATE') ? '#0369a1' : '#374151'}}>
//                             {log.action}
//                           </span>
//                         </td>
//                         <td style={{...styles.tdMini, fontSize:'12px'}}>{log.details}</td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//             <button onClick={()=>setShowHistory(false)} style={{...styles.cancelBtn, marginTop:'15px', width:'100%'}}>Close</button>
//           </div>
//         </div>
//       )}

//       {/* --- MODAL: EDIT FORM --- */}
//       {isEditing && canEdit && (
//         <div style={styles.overlay}>
//           <div style={styles.modal}>
//             <h3 style={{margin:'0 0 10px 0'}}>Edit Product</h3>
//             <form onSubmit={handleSaveChanges} style={{display:'flex', flexDirection:'column', gap:'10px'}}>
//               <div style={{display:'flex', gap:'10px'}}>
//                  <div style={{flex: 1}}>
//                     <label style={styles.label}>Cost Price</label>
//                     <input type="number" value={editForm.costing_price} onChange={(e)=>setEditForm({...editForm, costing_price:e.target.value})} style={styles.input} required />
//                  </div>
//                  <div style={{flex: 1}}>
//                     <label style={styles.label}>Selling Price</label>
//                     <input type="number" value={editForm.price} onChange={(e)=>setEditForm({...editForm, price:e.target.value})} style={styles.input} required />
//                  </div>
//               </div>
//               <label style={styles.label}>Supplier Name</label>
//               <input type="text" value={editForm.Supplier_name} onChange={(e)=>setEditForm({...editForm, Supplier_name:e.target.value})} style={styles.input} required />
//               <label style={styles.label}>Description</label>
//               <textarea value={editForm.description} onChange={(e)=>setEditForm({...editForm, description:e.target.value})} style={styles.textarea} />
//               <div style={{display:'flex', gap:'10px', marginTop:'10px'}}>
//                 <button type="submit" style={styles.saveBtn}>Save</button>
//                 <button type="button" onClick={()=>setIsEditing(false)} style={styles.cancelBtn}>Cancel</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* --- MODAL: DELETE CONFIRM --- */}
//       {showDeleteModal && canEdit && (
//         <div style={styles.overlay}>
//           <div style={{...styles.modal, maxWidth: '350px', textAlign:'center'}}>
//             <h3 style={{color: '#dc2626'}}>Delete Product?</h3>
//             <p style={{fontSize:'13px'}}>Are you sure you want to delete <b>{product.name}</b> permanently?</p>
//             <div style={{display:'flex', gap:'10px', marginTop:'20px'}}>
//                 <button onClick={confirmDelete} style={{...styles.saveBtn, background: '#dc2626'}}>Yes, Delete</button>
//                 <button onClick={()=>setShowDeleteModal(false)} style={styles.cancelBtn}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // InfoBox component (helper)
// const InfoBox = ({ label, val, color }) => (
//   <div style={{background:'#f8fafc', padding:'5px 8px', borderRadius:'4px', border:'1px solid #e2e8f0'}}>
//     <div style={{fontSize:'10px', color:'#64748b', fontWeight:'700', textTransform:'uppercase'}}>{label}</div>
//     <div style={{fontSize:'13px', fontWeight:'600', color: color || '#334155'}}>{val}</div>
//   </div>
// );

// // ✨ STYLES
// const styles = {
//   container: { height: "100vh", width: "100%", overflow: "hidden", backgroundColor: "#f1f5f9", display: "flex", flexDirection: "column", fontFamily: "'Inter', sans-serif" },
//   centerMsg: { display:'flex', height:'100vh', alignItems:'center', justifyContent:'center', color:'#666' },
//   mainContent: { flex: 1, padding: "10px 20px", display: "flex", flexDirection: "column", gap: "10px", overflow: "hidden" },
//   navBar: { display:'flex', justifyContent:'space-between', height: '35px', alignItems:'center', flexShrink: 0 },
//   backBtn: { background:'none', border:'none', color:'#64748b', cursor:'pointer', fontWeight:'600', fontSize:'13px' },

//   // New Styles for Header Buttons
//   headerEditBtn: { background:'#2563eb', color:'#fff', border:'none', borderRadius:'4px', padding:'5px 12px', fontSize:'12px', cursor:'pointer' },
//   headerDelBtn: { background:'#fff', color:'#dc2626', border:'1px solid #fca5a5', borderRadius:'4px', padding:'5px 12px', fontSize:'12px', cursor:'pointer' },

//   excelBtn: { background:'#107c41', color:'#fff', border:'none', borderRadius:'4px', padding:'5px 12px', fontSize:'12px', cursor:'pointer' },
//   historyBtn: { background:'#475569', color:'#fff', border:'none', borderRadius:'4px', padding:'5px 12px', fontSize:'12px', cursor:'pointer' },
//   productCard: { display: "flex", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", overflow: "hidden", flex: 1, border: "1px solid #e2e8f0", minHeight: 0 },
//   leftCol: { width: "30%", minWidth: "250px", backgroundColor: "#f8fafc", padding: "15px", borderRight: "1px solid #e2e8f0", display: "flex", flexDirection: "column", gap: "10px", overflowY: "auto" },
//   imgWrapper: { position:'relative', background:'#fff', borderRadius:'6px', border:'1px solid #e2e8f0', padding:'5px', textAlign:'center', flex: 1, display:'flex', alignItems:'center', justifyContent:'center', minHeight: "200px" },
//   productImg: { maxWidth:'100%', maxHeight:'100%', objectFit:'contain' },
//   iconBtn: { position:'absolute', top:'5px', right:'5px', background:'#eee', border:'none', borderRadius:'50%', width:'24px', height:'24px', cursor:'pointer' },
//   barcodeWrapper: { background:'#fff', padding:'5px', borderRadius:'6px', border:'1px dashed #ccc', textAlign:'center', flexShrink: 0 },
//   barcodeImg: { height:'35px', maxWidth:'100%' },
//   miniLink: { fontSize:'10px', color:'#2563eb', background:'none', border:'none', cursor:'pointer', textDecoration:'underline' },
//   rightCol: { width: "70%", padding: "15px", display: "flex", flexDirection: "column", overflowY: "auto" },
//   headerRow: { display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexShrink: 0 },
//   title: { fontSize:'20px', margin:0, color:'#1e293b', fontWeight:'700' },
//   sku: { fontSize:'12px', color:'#64748b', background:'#f1f5f9', padding:'2px 6px', borderRadius:'4px' },
//   price: { fontSize:'22px', fontWeight:'800', color:'#059669' },
//   gst: { fontSize:'11px', color:'#64748b' },
//   divider: { border:'0', borderTop:'1px solid #e2e8f0', margin:'10px 0' },
//   infoGrid: { display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'8px', marginBottom:'10px', flexShrink: 0 },
//   splitRow: { display: "flex", gap: "15px", flex: 1, minHeight: "0", marginBottom: "5px" },
//   descBox: { flex: 2, background:'#fdfdfd', border:'1px solid #f1f5f9', borderRadius:'6px', padding:'10px', overflowY:'auto' },
//   skuBoxRight: { flex: 1, background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
//   label: { fontSize:'11px', fontWeight:'700', color:'#475569', display:'block', marginBottom:'3px' },
//   descText: { fontSize:'13px', margin:0, color:'#334155', lineHeight:'1.4' },

//   // NOTE: actionRow style is no longer needed but keeping styles object clean
//   overlay: { position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.5)', display:'flex', justifyContent:'center', alignItems:'center', zIndex:100 },
//   modal: { background:'#fff', padding:'20px', borderRadius:'8px', width:'750px', boxShadow: "0 10px 25px rgba(0,0,0,0.1)" },
//   logsTableWrapper: { maxHeight: '300px', overflowY: 'auto', border: '1px solid #f1f5f9', marginTop: '10px' },
//   thMini: { padding: "10px", textAlign: "left", fontSize: "11px", color: "#64748b", textTransform: "uppercase", background: "#f8fafc" },
//   tdMini: { padding: "10px", fontSize: "13px", color: "#334155" },
//   badge: { padding: "2px 6px", borderRadius: "4px", fontSize: "11px", fontWeight: "bold" },
//   input: { padding:'8px', width:'100%', borderRadius:'4px', border:'1px solid #ccc', fontSize:'13px', boxSizing:'border-box' },
//   textarea: { padding:'8px', width:'100%', height:'60px', borderRadius:'4px', border:'1px solid #ccc', fontSize:'13px', resize:'none', boxSizing:'border-box' },
//   saveBtn: { flex:1, background:'#16a34a', color:'#fff', border:'none', padding:'8px', borderRadius:'4px', cursor:'pointer' },
//   cancelBtn: { flex:1, background:'#f1f5f9', color:'#333', border:'1px solid #ccc', padding:'8px', borderRadius:'4px', cursor:'pointer' },
//   modalFilterBar: { display: 'flex', gap: '10px', marginBottom: '15px', background: '#f8fafc', padding: '10px', borderRadius: '8px' },
//   modalDateInput: { padding: '5px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '12px', outline: 'none' },
//   applyBtn: { background: '#2563eb', color: '#fff', border: 'none', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' },
//   resetBtnSmall: { background: '#fff', color: '#64748b', border: '1px solid #cbd5e1', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' },
// };

// export default ProductDetails;










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
//                 <div style={styles.price}>MRP₹{product.price}</div>
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


















// import React, { useEffect, useState, useCallback } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import api from "../api/axios";
// import axios from "axios"; // 🔥 Import axios for upload (agar api instance se na ho to)
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

//   // --- 📄 PAGINATION STATES ---
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 20;

//   // --- MODAL & EDIT STATES ---
//   const [isEditing, setIsEditing] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);

//   // 🔥 NEW: Image Upload States
//   const [preview, setPreview] = useState("");
//   const [uploading, setUploading] = useState(false);

//   const [editForm, setEditForm] = useState({
//     price: "", costing_price: "", description: "", Supplier_name: "", img: "" // 🔥 img added
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
//     setCurrentPage(1);
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

//   // --- 📄 PAGINATION LOGIC ---
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
//       Supplier_name: product.Supplier_name || "",
//       img: product.img || "" // 🔥 Existing image set ki
//     });
//     setPreview(product.img || ""); // 🔥 Preview me bhi purani image dikhao
//     setIsEditing(true);
//   };

//   // 🔥 NEW: Image Upload Logic (Same as ProductForm)
//   const handleImageSelect = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setUploading(true);

//     // Local Preview
//     const reader = new FileReader();
//     reader.onloadend = () => setPreview(reader.result);
//     reader.readAsDataURL(file);

//     try {
//       const imgData = new FormData();
//       imgData.append("image", file);

//       // Upload Call
//       const res = await axios.post("http://localhost:7000/api/products/upload", imgData, {
//         headers: { "Content-Type": "multipart/form-data" },
//         withCredentials: true,
//       });

//       // Update Form State with new URL
//       setEditForm((prev) => ({ ...prev, img: res.data.url }));
//       toast.success("Image uploaded!");
//     } catch (err) {
//       console.error(err);
//       toast.error("Image upload failed");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleSaveChanges = async (e) => {
//     e.preventDefault();
//     if (uploading) return toast.error("Please wait for image upload to finish.");

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

//   // --- 📥 EXCEL DOWNLOAD UPDATED ---
//   const downloadOneProductExcel = () => {
//     if (!product) return;

//     // 🔥 Wahi same format jo Home.jsx me use kiya hai
//     const dataToExport = [{
//       Name: product.name, 
//       SKU: product.sku, 
//       Description: product.description || "-", 
//       Category: product.category, 
//       Color: product.color, 
//       Size: product.size,
//       Price: product.price, 
//       GST: product.gst ? `${product.gst}%` : "0%",
//       "Cost Price": canEdit ? product.costing_price : "N/A", 
//       Stock: product.Qty,
//       Supplier: canEdit ? product.Supplier_name : "N/A", 
//       Status: product.Qty > 0 ? "In Stock" : "Out of Stock",
//       "Product Image URL": product.img || "No Image", 
//       "Barcode Image URL": product.barcodeImg || "No Barcode"
//     }];

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
//                 <div style={styles.price}>MRP: ₹{product.price}</div>
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

//       {/* --- MODAL: PRODUCT HISTORY --- */}
//       {showHistory && canEdit && (
//         <div style={styles.overlay}>
//           <div style={{ ...styles.modal, width: '750px', maxWidth: '95%' }}>
//             {/* ... History Modal Content Same as before ... */}
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
//               <h3 style={{ margin: 0 }}>Product Audit Trail</h3>
//               <button onClick={() => setShowHistory(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '20px' }}>×</button>
//             </div>

//             {/* Filter Bar */}
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

//             {/* Pagination Controls */}
//             {!logsLoading && productLogs.length > itemsPerPage && (
//               <div style={styles.paginationWrapper}>
//                 <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} style={currentPage === 1 ? styles.disabledBtn : styles.pageBtn}>Previous</button>
//                 <span style={styles.pageInfo}>Page {currentPage} of {totalPages}</span>
//                 <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} style={currentPage === totalPages ? styles.disabledBtn : styles.pageBtn}>Next</button>
//               </div>
//             )}
//             <button onClick={() => setShowHistory(false)} style={{ ...styles.cancelBtn, marginTop: '15px', width: '100%' }}>Close</button>
//           </div>
//         </div>
//       )}

//       {/* --- MODAL: EDIT FORM (UPDATED WITH IMAGE) --- */}
//       {isEditing && canEdit && (
//         <div style={styles.overlay}>
//           <div style={styles.modal}>
//             <h3 style={{ margin: '0 0 10px 0' }}>Edit Product</h3>
//             <form onSubmit={handleSaveChanges} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

//               {/* 🔥 NEW: Image Upload Section in Edit Modal */}
//               <div style={{ textAlign: 'center', marginBottom: '10px', border: '1px dashed #ccc', padding: '10px', borderRadius: '6px' }}>
//                  {preview ? (
//                    <img src={preview} alt="Preview" style={{ width: '80px', height: '80px', objectFit: 'contain', borderRadius: '4px' }} />
//                  ) : (
//                    <div style={{ fontSize: '12px', color: '#999' }}>No Image</div>
//                  )}
//                  <div style={{ marginTop: '5px' }}>
//                     <label style={{ cursor: 'pointer', color: '#2563eb', fontSize: '13px', fontWeight: 'bold' }}>
//                        {uploading ? "Uploading..." : "Change Image"}
//                        <input type="file" accept="image/*" onChange={handleImageSelect} style={{ display: 'none' }} disabled={uploading} />
//                     </label>
//                  </div>
//               </div>

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
//                 <button type="submit" disabled={uploading} style={{...styles.saveBtn, opacity: uploading ? 0.7 : 1}}>Save</button>
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
//             position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", // Darker bg for better view
//             display: "flex", alignItems: "center",backgroundColor:"white" ,justifyContent: "center", zIndex: 9999
//           }}
//           onClick={() => setShowImageModal(false)}
//         >
//           <img
//             src={activeImage}
//             alt="Preview"
//             style={{ maxWidth: "95%", maxHeight: "95%", objectFit: "contain", borderRadius: "8px", boxShadow: "0 0 40px rgba(0,0,0,0.6)" }}
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

// // ✨ STYLES (Same as before)
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

//   paginationWrapper: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '15px' },
//   pageBtn: { background: '#2563eb', border: '1px solid #2563eb', padding: '6px 14px', borderRadius: '4px', cursor: 'pointer', color: '#fff', fontSize: '12px', fontWeight: '600' },
//   disabledBtn: { background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '6px 14px', borderRadius: '4px', cursor: 'not-allowed', color: '#94a3b8', fontSize: '12px' },
//   pageInfo: { fontSize: '13px', fontWeight: '600', color: '#334155' },
// };

// export default ProductDetails;







































// import React, { useEffect, useState, useCallback } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import api from "../api/axios";
// import axios from "axios";
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

//   // --- 📄 PAGINATION STATES ---
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 20;

//   // --- MODAL & EDIT STATES ---
//   const [isEditing, setIsEditing] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);

//   // 🔥 Image Upload States
//   const [preview, setPreview] = useState("");
//   const [uploading, setUploading] = useState(false);

//   // 🔥 Added Packaging SKUs in Edit Form
//   const [editForm, setEditForm] = useState({
//     price: "", costing_price: "", description: "", Supplier_name: "", img: "",
//     brand_box_sku: "", corrugated_box_sku: "", tag_1_sku: "", tag_2_sku: "", tag_3_sku: "", other_material_sku: ""
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
//     setCurrentPage(1);
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

//   // --- 📄 PAGINATION LOGIC ---
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
//       Supplier_name: product.Supplier_name || "",
//       img: product.img || "",
//       brand_box_sku: product.brand_box_sku || "",
//       corrugated_box_sku: product.corrugated_box_sku || "",
//       tag_1_sku: product.tag_1_sku || "",
//       tag_2_sku: product.tag_2_sku || "",
//       tag_3_sku: product.tag_3_sku || "",
//       other_material_sku: product.other_material_sku || ""
//     });
//     setPreview(product.img || ""); 
//     setIsEditing(true);
//   };

//   const handleImageSelect = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setUploading(true);

//     const reader = new FileReader();
//     reader.onloadend = () => setPreview(reader.result);
//     reader.readAsDataURL(file);

//     try {
//       const imgData = new FormData();
//       imgData.append("image", file);

//       const res = await axios.post("http://localhost:7000/api/products/upload", imgData, {
//         headers: { "Content-Type": "multipart/form-data" },
//         withCredentials: true,
//       });

//       setEditForm((prev) => ({ ...prev, img: res.data.url }));
//       toast.success("Image uploaded!");
//     } catch (err) {
//       console.error(err);
//       toast.error("Image upload failed");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleSaveChanges = async (e) => {
//     e.preventDefault();
//     if (uploading) return toast.error("Please wait for image upload to finish.");

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

//   // --- 📥 EXCEL DOWNLOAD UPDATED ---
//   const downloadOneProductExcel = () => {
//     if (!product) return;

//     const dataToExport = [{
//       Name: product.name, 
//       SKU: product.sku, 
//       Description: product.description || "-", 
//       Category: product.category, 
//       Color: product.color, 
//       Size: product.size,
//       Price: product.price, 
//       GST: product.gst ? `${product.gst}%` : "0%",
//       "Cost Price": canEdit ? product.costing_price : "N/A", 
//       Stock: product.Qty,
//       Supplier: canEdit ? product.Supplier_name : "N/A", 
//       Status: product.Qty > 0 ? "In Stock" : "Out of Stock",
//       "Product Image URL": product.img || "No Image", 
//       "Barcode Image URL": product.barcodeImg || "No Barcode",
//       "Brand Box SKU": product.brand_box_sku || "N/A",
//       "Corrugated Box SKU": product.corrugated_box_sku || "N/A",
//       "Tags": [product.tag_1_sku, product.tag_2_sku, product.tag_3_sku].filter(Boolean).join(", ") || "N/A"
//     }];

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
//       <Header/> 
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
//                 <div style={styles.price}>MRP: ₹{product.price}</div>
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

//             {/* 🔥 UPDATED SPLIT ROW FOR PACKAGING BOX */}
//             <div style={styles.splitRow}>
//               {/* 1. Description Box */}
//               <div style={styles.descBox}>
//                 <span style={styles.label}>Description:</span>
//                 <p style={styles.descText}>{product.description || "No description provided."}</p>
//               </div>

//               {/* 2. Packaging Box (NEW) */}
//               <div style={styles.packagingBox}>
//                 <span style={styles.label}>📦 Packaging Materials:</span>
//                 <div style={styles.packagingList}>
//                   {product.brand_box_sku && <div style={styles.packItem}><b>Brand Box:</b> {product.brand_box_sku}</div>}
//                   {product.corrugated_box_sku && <div style={styles.packItem}><b>Corrugated:</b> {product.corrugated_box_sku}</div>}
//                   {product.tag_1_sku && <div style={styles.packItem}><b>Tag 1:</b> {product.tag_1_sku}</div>}
//                   {product.tag_2_sku && <div style={styles.packItem}><b>Tag 2:</b> {product.tag_2_sku}</div>}
//                   {product.tag_3_sku && <div style={styles.packItem}><b>Tag 3:</b> {product.tag_3_sku}</div>}
//                   {product.other_material_sku && <div style={styles.packItem}><b>Other:</b> {product.other_material_sku}</div>}

//                   {!(product.brand_box_sku || product.corrugated_box_sku || product.tag_1_sku || product.tag_2_sku || product.tag_3_sku || product.other_material_sku) && (
//                     <div style={{...styles.packItem, color: '#94a3b8', fontStyle: 'italic', border: 'none', background: 'transparent' }}>
//                       No packaging linked.
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* 3. Stock Update Box */}
//               {canEdit && (
//                 <div style={styles.skuBoxRight}>
//                   <SkuUpdate onUpdated={fetchProduct} prefillProduct={product} />
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* --- MODAL: PRODUCT HISTORY --- */}
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

//             {!logsLoading && productLogs.length > itemsPerPage && (
//               <div style={styles.paginationWrapper}>
//                 <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} style={currentPage === 1 ? styles.disabledBtn : styles.pageBtn}>Previous</button>
//                 <span style={styles.pageInfo}>Page {currentPage} of {totalPages}</span>
//                 <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} style={currentPage === totalPages ? styles.disabledBtn : styles.pageBtn}>Next</button>
//               </div>
//             )}
//             <button onClick={() => setShowHistory(false)} style={{ ...styles.cancelBtn, marginTop: '15px', width: '100%' }}>Close</button>
//           </div>
//         </div>
//       )}

//       {/* --- MODAL: EDIT FORM --- */}
//       {isEditing && canEdit && (
//         <div style={styles.overlay}>
//           <div style={{...styles.modal, width: '600px', maxWidth: '95%'}}>
//             <h3 style={{ margin: '0 0 10px 0' }}>Edit Product & Packaging</h3>
//             <form onSubmit={handleSaveChanges} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

//               <div style={{ textAlign: 'center', marginBottom: '10px', border: '1px dashed #ccc', padding: '10px', borderRadius: '6px' }}>
//                  {preview ? (
//                    <img src={preview} alt="Preview" style={{ width: '80px', height: '80px', objectFit: 'contain', borderRadius: '4px' }} />
//                  ) : (
//                    <div style={{ fontSize: '12px', color: '#999' }}>No Image</div>
//                  )}
//                  <div style={{ marginTop: '5px' }}>
//                     <label style={{ cursor: 'pointer', color: '#2563eb', fontSize: '13px', fontWeight: 'bold' }}>
//                        {uploading ? "Uploading..." : "Change Image"}
//                        <input type="file" accept="image/*" onChange={handleImageSelect} style={{ display: 'none' }} disabled={uploading} />
//                     </label>
//                  </div>
//               </div>

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

//               <hr style={styles.divider} />
//               <label style={styles.label}>📦 Edit Packaging SKUs</label>
//               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
//                 <input type="text" placeholder="Brand Box SKU" value={editForm.brand_box_sku} onChange={(e) => setEditForm({ ...editForm, brand_box_sku: e.target.value })} style={styles.input} />
//                 <input type="text" placeholder="Corrugated Box SKU" value={editForm.corrugated_box_sku} onChange={(e) => setEditForm({ ...editForm, corrugated_box_sku: e.target.value })} style={styles.input} />
//                 <input type="text" placeholder="Tag 1 SKU" value={editForm.tag_1_sku} onChange={(e) => setEditForm({ ...editForm, tag_1_sku: e.target.value })} style={styles.input} />
//                 <input type="text" placeholder="Tag 2 SKU" value={editForm.tag_2_sku} onChange={(e) => setEditForm({ ...editForm, tag_2_sku: e.target.value })} style={styles.input} />
//               </div>

//               <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
//                 <button type="submit" disabled={uploading} style={{...styles.saveBtn, opacity: uploading ? 0.7 : 1}}>Save Changes</button>
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
//           style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999 }}
//           onClick={() => setShowImageModal(false)}
//         >
//           <img src={activeImage} alt="Preview" style={{ maxWidth: "95%", maxHeight: "95%", objectFit: "contain", borderRadius: "8px", boxShadow: "0 0 40px rgba(0,0,0,0.6)" }} />
//         </div>
//       )}

//     </div>
//   );
// };

// // InfoBox component
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

//   // 🔥 UPDATED LAYOUT STYLES FOR PACKAGING
//   splitRow: { display: "flex", gap: "15px", flex: 1, minHeight: "0", marginBottom: "5px" },
//   descBox: { flex: 1.5, background: '#fdfdfd', border: '1px solid #f1f5f9', borderRadius: '6px', padding: '10px', overflowY: 'auto' },
//   packagingBox: { flex: 1.5, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '10px', overflowY: 'auto' },
//   packagingList: { display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' },
//   packItem: { fontSize: '12px', color: '#334155', background: '#fff', padding: '6px 10px', borderRadius: '4px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between' },
//   skuBoxRight: { flex: 1.2, background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },

//   label: { fontSize: '11px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '3px' },
//   descText: { fontSize: '13px', margin: 0, color: '#334155', lineHeight: '1.4' },

//   overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 },
//   modal: { background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: "0 10px 25px rgba(0,0,0,0.1)" },
//   logsTableWrapper: { maxHeight: '300px', overflowY: 'auto', border: '1px solid #f1f5f9', marginTop: '10px' },
//   thMini: { padding: "10px", textAlign: "left", fontSize: "11px", color: "#64748b", textTransform: "uppercase", background: "#f8fafc" },
//   tdMini: { padding: "10px", fontSize: "13px", color: "#334155" },
//   badge: { padding: "2px 6px", borderRadius: "4px", fontSize: "11px", fontWeight: "bold" },
//   input: { padding: '8px', width: '100%', borderRadius: '4px', border: '1px solid #ccc', fontSize: '13px', boxSizing: 'border-box' },
//   textarea: { padding: '8px', width: '100%', height: '50px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '13px', resize: 'none', boxSizing: 'border-box' },
//   saveBtn: { flex: 1, background: '#16a34a', color: '#fff', border: 'none', padding: '8px', borderRadius: '4px', cursor: 'pointer' },
//   cancelBtn: { flex: 1, background: '#f1f5f9', color: '#333', border: '1px solid #ccc', padding: '8px', borderRadius: '4px', cursor: 'pointer' },
//   modalFilterBar: { display: 'flex', gap: '10px', marginBottom: '15px', background: '#f8fafc', padding: '10px', borderRadius: '8px' },
//   modalDateInput: { padding: '5px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '12px', outline: 'none' },
//   applyBtn: { background: '#2563eb', color: '#fff', border: 'none', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' },
//   resetBtnSmall: { background: '#fff', color: '#64748b', border: '1px solid #cbd5e1', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' },

//   paginationWrapper: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '15px' },
//   pageBtn: { background: '#2563eb', border: '1px solid #2563eb', padding: '6px 14px', borderRadius: '4px', cursor: 'pointer', color: '#fff', fontSize: '12px', fontWeight: '600' },
//   disabledBtn: { background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '6px 14px', borderRadius: '4px', cursor: 'not-allowed', color: '#94a3b8', fontSize: '12px' },
//   pageInfo: { fontSize: '13px', fontWeight: '600', color: '#334155' },
// };

// export default ProductDetails;











































// import React, { useEffect, useState, useCallback } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import api from "../api/axios";
// import axios from "axios";
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

//   // --- 📄 PAGINATION STATES ---
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 20;

//   // --- MODAL & EDIT STATES ---
//   const [isEditing, setIsEditing] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);

//   // 🔥 Image Upload States
//   const [preview, setPreview] = useState("");
//   const [uploading, setUploading] = useState(false);

//   // 🔥 Added Packaging SKUs in Edit Form
//   const [editForm, setEditForm] = useState({
//     price: "", costing_price: "", description: "", Supplier_name: "", img: "",
//     brand_box_sku: "", corrugated_box_sku: "", tag_1_sku: "", tag_2_sku: "", tag_3_sku: "", other_material_sku: ""
//   });

//   const [showImageModal, setShowImageModal] = useState(false);
//   const [activeImage, setActiveImage] = useState("");

//   // ✅ 🔥 NEW SELL MODAL STATES
//   const [showSellModal, setShowSellModal] = useState(false);
//   const [sellForm, setSellForm] = useState({
//     sku: "",
//     qty: 1,
//     useMRP: true,
//     customPrice: ""
//   });

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
//     setCurrentPage(1);
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

//   // --- 📄 PAGINATION LOGIC ---
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
//       Qty:product.Qty|| "",
//       Supplier_name: product.Supplier_name || "",
//       img: product.img || "",
//       brand_box_sku: product.brand_box_sku || "",
//       corrugated_box_sku: product.corrugated_box_sku || "",
//       tag_1_sku: product.tag_1_sku || "",
//       tag_2_sku: product.tag_2_sku || "",
//       tag_3_sku: product.tag_3_sku || "",
//       other_material_sku: product.other_material_sku || ""
//     });
//     setPreview(product.img || ""); 
//     setIsEditing(true);
//   };

//   const handleImageSelect = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setUploading(true);

//     const reader = new FileReader();
//     reader.onloadend = () => setPreview(reader.result);
//     reader.readAsDataURL(file);

//     try {
//       const imgData = new FormData();
//       imgData.append("image", file);

//       const res = await axios.post("http://localhost:7000/api/products/upload", imgData, {
//         headers: { "Content-Type": "multipart/form-data" },
//         withCredentials: true,
//       });

//       setEditForm((prev) => ({ ...prev, img: res.data.url }));
//       toast.success("Image uploaded!");
//     } catch (err) {
//       console.error(err);
//       toast.error("Image upload failed");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleSaveChanges = async (e) => {
//     e.preventDefault();
//     if (uploading) return toast.error("Please wait for image upload to finish.");

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

//   // --- ✅ 🛒 SELL HANDLERS ---
//   const handleSellClick = () => {
//     if (!canEdit) return toast.error("Permission Denied");
//     if (product.Qty <= 0) return toast.error("Out of stock!");

//     // Pre-fill SKU automatically
//     setSellForm({
//       sku: product.sku,
//       qty: 1,
//       useMRP: true,
//       customPrice: ""
//     });
//     setShowSellModal(true);
//   };

//   const handleSellSubmit = async (e) => {
//     e.preventDefault();
//     if (!sellForm.sku) return toast.error("Please enter SKU");
//     if (sellForm.qty <= 0) return toast.error("Quantity must be greater than 0");
//     if (sellForm.qty > product.Qty) return toast.error(`Not enough stock! Available: ${product.Qty}`);
//     if (!sellForm.useMRP && !sellForm.customPrice) return toast.error("Please enter Custom Price");

//     try {
//       const payload = {
//         sku: sellForm.sku,
//         removeQty: sellForm.qty,
//         customSellingPrice: sellForm.useMRP ? null : Number(sellForm.customPrice) // Custom price logic wahi rahega
//       };

//       // 🔥 YAHAN CHANGE KIYA HAI - Tumhara asli route aur method (PUT) laga diya
//       await api.put("/products/update-qty-sku", payload); 

//       toast.success("Sale entry added successfully!");
//       setShowSellModal(false);
//       fetchProduct(); // 🔥 Refresh product details to show updated stock
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to make a sale");
//     }
//   };
//   // const handleSellSubmit = async (e) => {
//   //   e.preventDefault();
//   //   if (!sellForm.sku) return toast.error("Please enter SKU");
//   //   if (sellForm.qty <= 0) return toast.error("Quantity must be greater than 0");
//   //   if (sellForm.qty > product.Qty) return toast.error(`Not enough stock! Available: ${product.Qty}`);
//   //   if (!sellForm.useMRP && !sellForm.customPrice) return toast.error("Please enter Custom Price");

//   //   try {
//   //     const payload = {
//   //       sku: sellForm.sku,
//   //       removeQty: sellForm.qty,
//   //       customSellingPrice: sellForm.useMRP ? null : Number(sellForm.customPrice)
//   //     };

//   //     // API call to update quantity and record sale
//   //     await api.post("/update-qty-sku", payload); 

//   //     toast.success("Sale entry added successfully!");
//   //     setShowSellModal(false);
//   //     fetchProduct(); // 🔥 Refresh product details to show updated stock
//   //   } catch (err) {
//   //     toast.error(err.response?.data?.message || "Failed to make a sale");
//   //   }
//   // };

//   // --- 📥 EXCEL DOWNLOAD UPDATED ---
//   const downloadOneProductExcel = () => {
//     if (!product) return;

//     const dataToExport = [{
//       Name: product.name, 
//       SKU: product.sku, 
//       Description: product.description || "-", 
//       Category: product.category, 
//       Color: product.color, 
//       Size: product.size,
//       Price: product.price, 
//       GST: product.gst ? `${product.gst}%` : "0%",
//       "Cost Price": canEdit ? product.costing_price : "N/A", 
//       Stock: product.Qty,
//       Supplier: canEdit ? product.Supplier_name : "N/A", 
//       Status: product.Qty > 0 ? "In Stock" : "Out of Stock",
//       "Product Image URL": product.img || "No Image", 
//       "Barcode Image URL": product.barcodeImg || "No Barcode",
//       "Brand Box SKU": product.brand_box_sku || "N/A",
//       "Corrugated Box SKU": product.corrugated_box_sku || "N/A",
//       "Tags": [product.tag_1_sku, product.tag_2_sku, product.tag_3_sku].filter(Boolean).join(", ") || "N/A"
//     }];

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
//       <Header/> 
//       <div style={styles.mainContent}>
//         <div style={styles.navBar}>
//           <button onClick={() => navigate("/dashboard")} style={styles.backBtn}>⬅ Back</button>

//           <div style={{ display: 'flex', gap: '10px' }}>
//             {canEdit && (
//               <>
//                 {/* ✅ NEW SELL BUTTON ADDED HERE */}
//                 <button onClick={handleSellClick} style={styles.sellBtn}>💰 Sell</button>
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
//                 <div style={styles.price}>MRP: ₹{product.price}</div>
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
//                 <p style={styles.descText}>{product.description || "No description provided."}</p>
//               </div>

//               <div style={styles.packagingBox}>
//                 <span style={styles.label}>📦 Packaging Materials:</span>
//                 <div style={styles.packagingList}>
//                   {product.brand_box_sku && <div style={styles.packItem}><b>Brand Box:</b> {product.brand_box_sku}</div>}
//                   {product.corrugated_box_sku && <div style={styles.packItem}><b>Corrugated:</b> {product.corrugated_box_sku}</div>}
//                   {product.tag_1_sku && <div style={styles.packItem}><b>Tag 1:</b> {product.tag_1_sku}</div>}
//                   {product.tag_2_sku && <div style={styles.packItem}><b>Tag 2:</b> {product.tag_2_sku}</div>}
//                   {product.tag_3_sku && <div style={styles.packItem}><b>Tag 3:</b> {product.tag_3_sku}</div>}
//                   {product.other_material_sku && <div style={styles.packItem}><b>Other:</b> {product.other_material_sku}</div>}

//                   {!(product.brand_box_sku || product.corrugated_box_sku || product.tag_1_sku || product.tag_2_sku || product.tag_3_sku || product.other_material_sku) && (
//                     <div style={{...styles.packItem, color: '#94a3b8', fontStyle: 'italic', border: 'none', background: 'transparent' }}>
//                       No packaging linked.
//                     </div>
//                   )}
//                 </div>
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

//       {/* --- ✅ NEW MODAL: SELL PRODUCT --- */}
//       {showSellModal && canEdit && (
//         <div style={styles.overlay}>
//           <div style={{ ...styles.modal, width: '400px', maxWidth: '95%' }}>
//             <h3 style={{ margin: '0 0 15px 0', color: '#16a34a' }}>Sell Product</h3>

//             {/* TUMHARA DIYA HUA UI CODE 👇 */}
//             <form onSubmit={handleSellSubmit} style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
//               <div>
//                 <label style={styles.modalLabel}>Product SKU</label>
//                 <input 
//                   type="text" 
//                   required 
//                   disabled // Disabled so user doesn't change it accidentally
//                   placeholder="e.g. car-red-123" 
//                   value={sellForm.sku}
//                   onChange={(e) => setSellForm({...sellForm, sku: e.target.value})}
//                   style={{...styles.modalInput, backgroundColor: "#f1f5f9", cursor: "not-allowed"}}
//                 />
//               </div>

//               <div>
//                 <label style={styles.modalLabel}>Quantity (Max: {product.Qty})</label>
//                 <input 
//                   type="number" 
//                   required 
//                   min="1"
//                   max={product.Qty}
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
//                 <label htmlFor="mrpCheck" style={{fontSize: '14px', cursor: 'pointer', fontWeight: 'bold'}}>Sell at System MRP (₹{product.price})</label>
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

//               <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
//                 <button type="submit" style={{...styles.saveBtn, background: '#16a34a'}}>Confirm Sale</button>
//                 <button type="button" onClick={() => setShowSellModal(false)} style={styles.cancelBtn}>Cancel</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* --- BAKI MODALS (History, Edit, Delete, Image) ... --- */}
//       {showHistory && canEdit && (
//         <div style={styles.overlay}>
//           {/* History Modal Code Same as Before */}
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

//             {!logsLoading && productLogs.length > itemsPerPage && (
//               <div style={styles.paginationWrapper}>
//                 <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} style={currentPage === 1 ? styles.disabledBtn : styles.pageBtn}>Previous</button>
//                 <span style={styles.pageInfo}>Page {currentPage} of {totalPages}</span>
//                 <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} style={currentPage === totalPages ? styles.disabledBtn : styles.pageBtn}>Next</button>
//               </div>
//             )}
//             <button onClick={() => setShowHistory(false)} style={{ ...styles.cancelBtn, marginTop: '15px', width: '100%' }}>Close</button>
//           </div>
//         </div>
//       )}

//      {/* --- MODAL: EDIT FORM --- */}
//       {isEditing && canEdit && (
//         <div style={styles.overlay}>
//           <div style={{...styles.modal, width: '650px', maxWidth: '95%', maxHeight: '85vh', overflowY: 'auto', padding: '15px'}}>
//             <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Edit Product & Packaging</h3>

//             <form onSubmit={handleSaveChanges} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>

//               {/* UPPER SECTION: Image Left, Fields Right */}
//               <div style={{ display: 'flex', gap: '15px' }}>

//                 {/* Left Side: Image Upload (Compact) */}
//                 <div style={{ flex: '0 0 100px', textAlign: 'center', border: '1px dashed #ccc', padding: '5px', borderRadius: '6px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
//                    {preview ? (
//                      <img src={preview} alt="Preview" style={{ width: '60px', height: '60px', objectFit: 'contain', borderRadius: '4px', margin: '0 auto' }} />
//                    ) : (
//                      <div style={{ fontSize: '11px', color: '#999' }}>No Image</div>
//                    )}
//                    <div style={{ marginTop: '5px' }}>
//                       <label style={{ cursor: 'pointer', color: '#2563eb', fontSize: '11px', fontWeight: 'bold' }}>
//                          {uploading ? "..." : "Change"}
//                          <input type="file" accept="image/*" onChange={handleImageSelect} style={{ display: 'none' }} disabled={uploading} />
//                       </label>
//                    </div>
//                 </div>

//                 {/* Right Side: Price, Supplier & Qty */}
//                 <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
//                     <div style={{ display: 'flex', gap: '10px' }}>
//                       <div style={{ flex: 1 }}>
//                         <label style={styles.label}>Cost Price</label>
//                         <input type="number" value={editForm.costing_price} onChange={(e) => setEditForm({ ...editForm, costing_price: e.target.value })} style={styles.compactInput} required />
//                       </div>
//                       <div style={{ flex: 1 }}>
//                         <label style={styles.label}>Selling Price</label>
//                         <input type="number" value={editForm.price} onChange={(e) => setEditForm({ ...editForm, price: e.target.value })} style={styles.compactInput} required />
//                       </div>
//                     </div>

//                     <div style={{ display: 'flex', gap: '10px' }}>
//                       <div style={{ flex: 1 }}>
//                         <label style={styles.label}>Supplier Name</label>
//                         <input type="text" value={editForm.Supplier_name} onChange={(e) => setEditForm({ ...editForm, Supplier_name: e.target.value })} style={styles.compactInput} required />
//                       </div>
//                       <div style={{ flex: 1 }}>
//                         <label style={styles.label}>QTY</label>
//                         <input type="number" value={editForm.Qty} onChange={(e) => setEditForm({ ...editForm, Qty: e.target.value })} style={styles.compactInput} required />
//                       </div>
//                     </div>
//                 </div>
//               </div>

//               {/* Description Field (Height reduced) */}
//               <div>
//                 <label style={styles.label}>Description</label>
//                 <textarea value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} style={{...styles.textarea, height: '35px', padding: '6px', fontSize: '12px'}} />
//               </div>

//               <hr style={{...styles.divider, margin: '5px 0'}} />

//               <label style={styles.label}>📦 Packaging Categories (Select SKU)</label>

//               {/* Packaging Dropdowns in 3 Columns */}
//               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>

//                 <div>
//                   <label style={{fontSize: '10px', color: '#666', fontWeight: 'bold'}}>Brand Box</label>
//                   <select value={editForm.brand_box_sku} onChange={(e) => setEditForm({ ...editForm, brand_box_sku: e.target.value })} style={styles.compactSelect}>
//                     <option value="">None</option>
//                     <option value="brand-box-01">brand-box-01</option>
//                     <option value="brand-box-02">brand-box-02</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label style={{fontSize: '10px', color: '#666', fontWeight: 'bold'}}>Corrugated Box</label>
//                   <select value={editForm.corrugated_box_sku} onChange={(e) => setEditForm({ ...editForm, corrugated_box_sku: e.target.value })} style={styles.compactSelect}>
//                     <option value="">None</option>
//                     <option value="corr-box-5x5">corr-box-5x5</option>
//                     <option value="corr-box-10x10">corr-box-10x10</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label style={{fontSize: '10px', color: '#666', fontWeight: 'bold'}}>Tag 1</label>
//                   <select value={editForm.tag_1_sku} onChange={(e) => setEditForm({ ...editForm, tag_1_sku: e.target.value })} style={styles.compactSelect}>
//                     <option value="">None</option>
//                     <option value="tag-price-01">tag-price-01</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label style={{fontSize: '10px', color: '#666', fontWeight: 'bold'}}>Tag 2</label>
//                   <select value={editForm.tag_2_sku} onChange={(e) => setEditForm({ ...editForm, tag_2_sku: e.target.value })} style={styles.compactSelect}>
//                     <option value="">None</option>
//                     <option value="tag-brand-02">tag-brand-02</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label style={{fontSize: '10px', color: '#666', fontWeight: 'bold'}}>Tag 3</label>
//                   <select value={editForm.tag_3_sku} onChange={(e) => setEditForm({ ...editForm, tag_3_sku: e.target.value })} style={styles.compactSelect}>
//                     <option value="">None</option>
//                     <option value="tag-wash-03">tag-wash-03</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label style={{fontSize: '10px', color: '#666', fontWeight: 'bold'}}>Other Material</label>
//                   <select value={editForm.other_material_sku} onChange={(e) => setEditForm({ ...editForm, other_material_sku: e.target.value })} style={styles.compactSelect}>
//                     <option value="">None</option>
//                     <option value="bubble-wrap-sm">bubble-wrap-sm</option>
//                   </select>
//                 </div>

//               </div>

//               {/* Action Buttons */}
//               <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
//                 <button type="submit" disabled={uploading} style={{...styles.saveBtn, opacity: uploading ? 0.7 : 1, padding: '8px'}}>Save Changes</button>
//                 <button type="button" onClick={() => setIsEditing(false)} style={{...styles.cancelBtn, padding: '8px'}}>Cancel</button>
//               </div>

//             </form>
//           </div>
//         </div>
//       )}

//       {/* --- MODAL: EDIT FORM ---
//       {isEditing && canEdit && (
//         <div style={styles.overlay}>
//           <div style={{...styles.modal, width: '600px', maxWidth: '95%'}}>
//             <h3 style={{ margin: '0 0 10px 0' }}>Edit Product & Packaging</h3>
//             <form onSubmit={handleSaveChanges} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

//               <div style={{ textAlign: 'center', marginBottom: '10px', border: '1px dashed #ccc', padding: '10px', borderRadius: '6px' }}>
//                  {preview ? (
//                    <img src={preview} alt="Preview" style={{ width: '80px', height: '80px', objectFit: 'contain', borderRadius: '4px' }} />
//                  ) : (
//                    <div style={{ fontSize: '12px', color: '#999' }}>No Image</div>
//                  )}
//                  <div style={{ marginTop: '5px' }}>
//                     <label style={{ cursor: 'pointer', color: '#2563eb', fontSize: '13px', fontWeight: 'bold' }}>
//                        {uploading ? "Uploading..." : "Change Image"}
//                        <input type="file" accept="image/*" onChange={handleImageSelect} style={{ display: 'none' }} disabled={uploading} />
//                     </label>
//                  </div>
//               </div>

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

//                <label style={styles.label}>QTY : </label>
//               <input type="number" value={editForm.Qty} onChange={(e) => setEditForm({ ...editForm, Qty: e.target.value })} style={styles.input} required />


//               <label style={styles.label}>Description</label>
//               <textarea value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} style={styles.textarea} />

//               <hr style={styles.divider} />
//               <label style={styles.label}>📦 Edit Packaging SKUs</label>
//               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
//                 <input type="text" placeholder="Brand Box SKU" value={editForm.brand_box_sku} onChange={(e) => setEditForm({ ...editForm, brand_box_sku: e.target.value })} style={styles.input} />
//                 <input type="text" placeholder="Corrugated Box SKU" value={editForm.corrugated_box_sku} onChange={(e) => setEditForm({ ...editForm, corrugated_box_sku: e.target.value })} style={styles.input} />
//                 <input type="text" placeholder="Tag 1 SKU" value={editForm.tag_1_sku} onChange={(e) => setEditForm({ ...editForm, tag_1_sku: e.target.value })} style={styles.input} />
//                 <input type="text" placeholder="Tag 2 SKU" value={editForm.tag_2_sku} onChange={(e) => setEditForm({ ...editForm, tag_2_sku: e.target.value })} style={styles.input} />
//               </div>

//               <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
//                 <button type="submit" disabled={uploading} style={{...styles.saveBtn, opacity: uploading ? 0.7 : 1}}>Save Changes</button>
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
//       )} */}

//       {showImageModal && (
//         <div
//           style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999 }}
//           onClick={() => setShowImageModal(false)}
//         >
//           <img src={activeImage} alt="Preview" style={{ maxWidth: "95%", maxHeight: "95%", objectFit: "contain", borderRadius: "8px", boxShadow: "0 0 40px rgba(0,0,0,0.6)" }} />
//         </div>
//       )}

//     </div>
//   );
// };

// // InfoBox component
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

//   // ✅ New Sell Btn Style
//   sellBtn: { background: '#16a34a', color: '#fff', border: 'none', borderRadius: '4px', padding: '5px 12px', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' },
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
//   descBox: { flex: 1.5, background: '#fdfdfd', border: '1px solid #f1f5f9', borderRadius: '6px', padding: '10px', overflowY: 'auto' },
//   packagingBox: { flex: 1.5, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '10px', overflowY: 'auto' },
//   packagingList: { display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' },
//   packItem: { fontSize: '12px', color: '#334155', background: '#fff', padding: '6px 10px', borderRadius: '4px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between' },
//   skuBoxRight: { flex: 1.2, background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },

//   label: { fontSize: '11px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '3px' },
//   descText: { fontSize: '13px', margin: 0, color: '#334155', lineHeight: '1.4' },

//   overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 },
//   modal: { background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: "0 10px 25px rgba(0,0,0,0.1)" },

//   // ✅ Added modalLabel & modalInput for your custom Sell Form
//   modalLabel: { fontSize: "13px", fontWeight: "600", color: "#475569", marginBottom: "5px", display: "block" },
//   modalInput: { width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "14px", outline: "none", boxSizing: "border-box" },

//   logsTableWrapper: { maxHeight: '300px', overflowY: 'auto', border: '1px solid #f1f5f9', marginTop: '10px' },
//   thMini: { padding: "10px", textAlign: "left", fontSize: "11px", color: "#64748b", textTransform: "uppercase", background: "#f8fafc" },
//   tdMini: { padding: "10px", fontSize: "13px", color: "#334155" },
//   badge: { padding: "2px 6px", borderRadius: "4px", fontSize: "11px", fontWeight: "bold" },
//   input: { padding: '8px', width: '100%', borderRadius: '4px', border: '1px solid #ccc', fontSize: '13px', boxSizing: 'border-box' },
//   textarea: { padding: '8px', width: '100%', height: '50px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '13px', resize: 'none', boxSizing: 'border-box' },
//   saveBtn: { flex: 1, background: '#16a34a', color: '#fff', border: 'none', padding: '8px', borderRadius: '4px', cursor: 'pointer' },
//   cancelBtn: { flex: 1, background: '#f1f5f9', color: '#333', border: '1px solid #ccc', padding: '8px', borderRadius: '4px', cursor: 'pointer' },
//   modalFilterBar: { display: 'flex', gap: '10px', marginBottom: '15px', background: '#f8fafc', padding: '10px', borderRadius: '8px' },
//   modalDateInput: { padding: '5px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '12px', outline: 'none' },
//   applyBtn: { background: '#2563eb', color: '#fff', border: 'none', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' },
//   resetBtnSmall: { background: '#fff', color: '#64748b', border: '1px solid #cbd5e1', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' },

//   paginationWrapper: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '15px' },
//   pageBtn: { background: '#2563eb', border: '1px solid #2563eb', padding: '6px 14px', borderRadius: '4px', cursor: 'pointer', color: '#fff', fontSize: '12px', fontWeight: '600' },
//   disabledBtn: { background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '6px 14px', borderRadius: '4px', cursor: 'not-allowed', color: '#94a3b8', fontSize: '12px' },
//   pageInfo: { fontSize: '13px', fontWeight: '600', color: '#334155' },
//   compactInput: { padding: '6px 8px', width: '100%', borderRadius: '4px', border: '1px solid #ccc', fontSize: '12px', boxSizing: 'border-box', outline: 'none' },
//   compactSelect: { padding: '5px', width: '100%', borderRadius: '4px', border: '1px solid #ccc', fontSize: '11px', boxSizing: 'border-box', background: '#fff', outline: 'none', cursor: 'pointer' },
// };

// export default ProductDetails;









































// import React, { useEffect, useState, useCallback } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import api from "../api/axios";
// import axios from "axios";
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

//   // --- 📄 PAGINATION STATES ---
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 20;

//   // --- MODAL & EDIT STATES ---
//   const [isEditing, setIsEditing] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);

//   // 🔥 Image Upload States
//   const [preview, setPreview] = useState("");
//   const [uploading, setUploading] = useState(false);

//   // 🔥 Edit Form State (Added Qty)
//   const [editForm, setEditForm] = useState({
//     price: "", costing_price: "", description: "", Supplier_name: "", img: "", Qty: "",
//     brand_box_sku: "", corrugated_box_sku: "", tag_1_sku: "", tag_2_sku: "", tag_3_sku: "", other_material_sku: ""
//   });

//   const [showImageModal, setShowImageModal] = useState(false);
//   const [activeImage, setActiveImage] = useState("");

//   // ✅ 🔥 NEW SELL MODAL STATES
//   const [showSellModal, setShowSellModal] = useState(false);
//   const [sellForm, setSellForm] = useState({
//     sku: "", qty: 1, useMRP: true, customPrice: ""
//   });

//   // ✅ 🔥 PACKAGING (PACKZONE) DB STATES
//   const [packZoneItems, setPackZoneItems] = useState([]);

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

//   // --- FETCH PACKZONE DATA (For Dropdowns) ---
//   useEffect(() => {
//     const fetchPackZoneItems = async () => {
//       try {
//         const res = await axios.get("http://localhost:7000/api/packzone", { withCredentials: true });
//         setPackZoneItems(res.data.items || res.data || []);
//       } catch (error) {
//         console.error("Failed to fetch PackZone items", error);
//       }
//     };
//     fetchPackZoneItems();
//   }, []);

//   // --- HELPER FOR DROPDOWN OPTIONS ---
//   const getOptionsByCategory = (allowedCategories) => {
//     return packZoneItems
//       .filter(item => allowedCategories.includes(item.category))
//       .map(item => (
//         <option key={item._id} value={item.item_sku}>
//           {item.itemName} ({item.size}) - {item.item_sku}
//         </option>
//       ));
//   };

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
//     setCurrentPage(1);
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

//   // --- 📄 PAGINATION LOGIC ---
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
//       Qty: product.Qty || "", // Pre-fill QTY
//       Supplier_name: product.Supplier_name || "",
//       img: product.img || "",
//       brand_box_sku: product.brand_box_sku || "",
//       corrugated_box_sku: product.corrugated_box_sku || "",
//       tag_1_sku: product.tag_1_sku || "",
//       tag_2_sku: product.tag_2_sku || "",
//       tag_3_sku: product.tag_3_sku || "",
//       other_material_sku: product.other_material_sku || ""
//     });
//     setPreview(product.img || "");
//     setIsEditing(true);
//   };

//   const handleImageSelect = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setUploading(true);
//     const reader = new FileReader();
//     reader.onloadend = () => setPreview(reader.result);
//     reader.readAsDataURL(file);

//     try {
//       const imgData = new FormData();
//       imgData.append("image", file);
//       const res = await axios.post("http://localhost:7000/api/products/upload", imgData, {
//         headers: { "Content-Type": "multipart/form-data" },
//         withCredentials: true,
//       });
//       setEditForm((prev) => ({ ...prev, img: res.data.url }));
//       toast.success("Image uploaded!");
//     } catch (err) {
//       toast.error("Image upload failed");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleSaveChanges = async (e) => {
//     e.preventDefault();
//     if (uploading) return toast.error("Please wait for image upload to finish.");
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

//   // --- ✅ 🛒 SELL HANDLERS ---
//   const handleSellClick = () => {
//     if (!canEdit) return toast.error("Permission Denied");
//     if (product.Qty <= 0) return toast.error("Out of stock!");
//     setSellForm({ sku: product.sku, qty: 1, useMRP: true, customPrice: "" });
//     setShowSellModal(true);
//   };

//   const handleSellSubmit = async (e) => {
//     e.preventDefault();
//     if (!sellForm.sku) return toast.error("Please enter SKU");
//     if (sellForm.qty <= 0) return toast.error("Quantity must be greater than 0");
//     if (sellForm.qty > product.Qty) return toast.error(`Not enough stock! Available: ${product.Qty}`);
//     if (!sellForm.useMRP && !sellForm.customPrice) return toast.error("Please enter Custom Price");

//     try {
//       const payload = {
//         sku: sellForm.sku,
//         removeQty: sellForm.qty,
//         customSellingPrice: sellForm.useMRP ? null : Number(sellForm.customPrice)
//       };
//       await api.put("/products/update-qty-sku", payload);
//       toast.success("Sale entry added successfully!");
//       setShowSellModal(false);
//       fetchProduct();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to make a sale");
//     }
//   };

//   // --- 📥 EXCEL DOWNLOAD UPDATED ---
//   const downloadOneProductExcel = () => {
//     if (!product) return;
//     const dataToExport = [{
//       Name: product.name, SKU: product.sku, Description: product.description || "-",
//       Category: product.category, Color: product.color, Size: product.size,
//       Price: product.price, GST: product.gst ? `${product.gst}%` : "0%",
//       "Cost Price": canEdit ? product.costing_price : "N/A", Stock: product.Qty,
//       Supplier: canEdit ? product.Supplier_name : "N/A", Status: product.Qty > 0 ? "In Stock" : "Out of Stock",
//       "Product Image URL": product.img || "No Image", "Barcode Image URL": product.barcodeImg || "No Barcode",
//       "Brand Box SKU": product.brand_box_sku || "N/A", "Corrugated Box SKU": product.corrugated_box_sku || "N/A",
//       "Tags": [product.tag_1_sku, product.tag_2_sku, product.tag_3_sku].filter(Boolean).join(", ") || "N/A"
//     }];
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
//                 <button onClick={handleSellClick} style={styles.sellBtn}>💰 Sell</button>
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
//                 <img src={product.barcodeImg} alt="Barcode" style={{ ...styles.barcodeImg, cursor: "zoom-in" }}
//                   onClick={() => { setActiveImage(product.barcodeImg); setShowImageModal(true); }}
//                 />
//                 <button onClick={() => downloadImage(product.barcodeImg, `${product.sku}.jpg`)} style={styles.miniLink}>⬇</button>
//               </div>
//             )}
//             {/* {product.barcodeImg && (
//               <div style={styles.barcodeCard}>
//                 <div style={styles.barcodeInfo}>
//                   <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 'bold' }}>PRODUCT BARCODE</span>
//                   <div style={styles.barcodeImgWrapper}>
//                     <img
//                       src={product.barcodeImg}
//                       alt="Barcode"
//                       style={styles.barcodeImgSleek}
//                       onClick={() => { setActiveImage(product.barcodeImg); setShowImageModal(true); }}
//                     />
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => downloadImage(product.barcodeImg, `${product.sku}.jpg`)}
//                   style={styles.barcodeDownloadBtn}
//                   title="Download Barcode Image"
//                 >
//                   <span style={{ fontSize: '14px' }}>⬇</span>
//                 </button>
//               </div>
//             )} */}
//           </div>

//           <div style={styles.rightCol}>
//             <div style={styles.headerRow}>
//               <div>
//                 <h2 style={styles.title}>{product.name}</h2>
//                 <span style={styles.sku}>SKU: {product.sku}</span>
//               </div>
//               <div style={{ textAlign: 'right' }}>
//                 <div style={styles.price}>MRP: ₹{product.price}</div>
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
//                 <p style={styles.descText}>{product.description || "No description provided."}</p>
//               </div>

//               <div style={styles.packagingBox}>
//                 <span style={styles.label}>📦 Packaging Materials:</span>
//                 <div style={styles.packagingList}>
//                   {product.brand_box_sku && <div style={styles.packItem}><b>Brand Box:</b> {product.brand_box_sku}</div>}
//                   {product.corrugated_box_sku && <div style={styles.packItem}><b>Corrugated:</b> {product.corrugated_box_sku}</div>}
//                   {product.tag_1_sku && <div style={styles.packItem}><b>Tag 1:</b> {product.tag_1_sku}</div>}
//                   {product.tag_2_sku && <div style={styles.packItem}><b>Tag 2:</b> {product.tag_2_sku}</div>}
//                   {product.tag_3_sku && <div style={styles.packItem}><b>Tag 3:</b> {product.tag_3_sku}</div>}
//                   {product.other_material_sku && <div style={styles.packItem}><b>Other:</b> {product.other_material_sku}</div>}

//                   {!(product.brand_box_sku || product.corrugated_box_sku || product.tag_1_sku || product.tag_2_sku || product.tag_3_sku || product.other_material_sku) && (
//                     <div style={{ ...styles.packItem, color: '#94a3b8', fontStyle: 'italic', border: 'none', background: 'transparent' }}>
//                       No packaging linked.
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* {canEdit && (
//                 <div style={styles.skuBoxRight}>
//                   <SkuUpdate onUpdated={fetchProduct} prefillProduct={product} />
//                 </div>
//               )} */}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* --- ✅ MODAL: EDIT PRODUCT (COMPACT & WITH DB DROPDOWNS) --- */}
//       {isEditing && canEdit && (
//         <div style={styles.overlay}>
//           <div style={{ ...styles.modal, width: '650px', maxWidth: '95%', maxHeight: '85vh', overflowY: 'auto', padding: '15px' }}>
//             <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Edit Product & Packaging</h3>

//             <form onSubmit={handleSaveChanges} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
//               <div style={{ display: 'flex', gap: '15px' }}>
//                 <div style={{ flex: '0 0 100px', textAlign: 'center', border: '1px dashed #ccc', padding: '5px', borderRadius: '6px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
//                   {preview ? (
//                     <img src={preview} alt="Preview" style={{ width: '60px', height: '60px', objectFit: 'contain', borderRadius: '4px', margin: '0 auto' }} />
//                   ) : (
//                     <div style={{ fontSize: '11px', color: '#999' }}>No Image</div>
//                   )}
//                   <div style={{ marginTop: '5px' }}>
//                     <label style={{ cursor: 'pointer', color: '#2563eb', fontSize: '11px', fontWeight: 'bold' }}>
//                       {uploading ? "..." : "Change"}
//                       <input type="file" accept="image/*" onChange={handleImageSelect} style={{ display: 'none' }} disabled={uploading} />
//                     </label>
//                   </div>
//                 </div>

//                 <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
//                   <div style={{ display: 'flex', gap: '10px' }}>
//                     <div style={{ flex: 1 }}>
//                       <label style={styles.label}>Cost Price</label>
//                       <input type="number" value={editForm.costing_price} onChange={(e) => setEditForm({ ...editForm, costing_price: e.target.value })} style={styles.compactInput} required />
//                     </div>
//                     <div style={{ flex: 1 }}>
//                       <label style={styles.label}>Selling Price</label>
//                       <input type="number" value={editForm.price} onChange={(e) => setEditForm({ ...editForm, price: e.target.value })} style={styles.compactInput} required />
//                     </div>
//                   </div>

//                   <div style={{ display: 'flex', gap: '10px' }}>
//                     <div style={{ flex: 1 }}>
//                       <label style={styles.label}>Supplier Name</label>
//                       <input type="text" value={editForm.Supplier_name} onChange={(e) => setEditForm({ ...editForm, Supplier_name: e.target.value })} style={styles.compactInput} required />
//                     </div>
//                     <div style={{ flex: 1 }}>
//                       <label style={styles.label}>QTY</label>
//                       <input type="number" value={editForm.Qty} onChange={(e) => setEditForm({ ...editForm, Qty: e.target.value })} style={styles.compactInput} required />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <label style={styles.label}>Description</label>
//                 <textarea value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} style={{ ...styles.textarea, height: '35px', padding: '6px', fontSize: '12px' }} />
//               </div>

//               <hr style={{ ...styles.divider, margin: '5px 0' }} />

//               <label style={styles.label}>📦 Packaging Categories (Select SKU)</label>
//               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
//                 <div>
//                   <label style={{ fontSize: '10px', color: '#666', fontWeight: 'bold' }}>Brand Box</label>
//                   <select value={editForm.brand_box_sku} onChange={(e) => setEditForm({ ...editForm, brand_box_sku: e.target.value })} style={styles.compactSelect}>
//                     <option value="">-- No Box Selected --</option>
//                     {getOptionsByCategory(["Packaging Boxes"])}
//                   </select>
//                 </div>
//                 <div>
//                   <label style={{ fontSize: '10px', color: '#666', fontWeight: 'bold' }}>Corrugated Box</label>
//                   <select value={editForm.corrugated_box_sku} onChange={(e) => setEditForm({ ...editForm, corrugated_box_sku: e.target.value })} style={styles.compactSelect}>
//                     <option value="">-- No Corrugated Box --</option>
//                     {getOptionsByCategory(["Packaging Boxes"])}
//                   </select>
//                 </div>
//                 <div>
//                   <label style={{ fontSize: '10px', color: '#666', fontWeight: 'bold' }}>Tag 1 (Primary)</label>
//                   <select value={editForm.tag_1_sku} onChange={(e) => setEditForm({ ...editForm, tag_1_sku: e.target.value })} style={styles.compactSelect}>
//                     <option value="">-- Select Tag --</option>
//                     {getOptionsByCategory(["Marketing Collateral", "Branding Stickers"])}
//                   </select>
//                 </div>
//                 <div>
//                   <label style={{ fontSize: '10px', color: '#666', fontWeight: 'bold' }}>Tag 2</label>
//                   <select value={editForm.tag_2_sku} onChange={(e) => setEditForm({ ...editForm, tag_2_sku: e.target.value })} style={styles.compactSelect}>
//                     <option value="">-- Select Tag --</option>
//                     {getOptionsByCategory(["Marketing Collateral", "Branding Stickers"])}
//                   </select>
//                 </div>
//                 <div>
//                   <label style={{ fontSize: '10px', color: '#666', fontWeight: 'bold' }}>Tag 3</label>
//                   <select value={editForm.tag_3_sku} onChange={(e) => setEditForm({ ...editForm, tag_3_sku: e.target.value })} style={styles.compactSelect}>
//                     <option value="">-- Select Tag --</option>
//                     {getOptionsByCategory(["Marketing Collateral", "Branding Stickers"])}
//                   </select>
//                 </div>
//                 <div>
//                   <label style={{ fontSize: '10px', color: '#666', fontWeight: 'bold' }}>Other Material</label>
//                   <select value={editForm.other_material_sku} onChange={(e) => setEditForm({ ...editForm, other_material_sku: e.target.value })} style={styles.compactSelect}>
//                     <option value="">-- Select Material --</option>
//                     {getOptionsByCategory(["Marketing Collateral", "Branding Stickers", "Packaging Boxes"])}
//                   </select>
//                 </div>
//               </div>

//               <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
//                 <button type="submit" disabled={uploading} style={{ ...styles.saveBtn, opacity: uploading ? 0.7 : 1, padding: '8px' }}>Save Changes</button>
//                 <button type="button" onClick={() => setIsEditing(false)} style={{ ...styles.cancelBtn, padding: '8px' }}>Cancel</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* --- ✅ MODAL: SELL PRODUCT --- */}
//       {showSellModal && canEdit && (
//         <div style={styles.overlay}>
//           <div style={{ ...styles.modal, width: '400px', maxWidth: '95%' }}>
//             <h3 style={{ margin: '0 0 15px 0', color: '#16a34a' }}>Sell Product</h3>
//             <form onSubmit={handleSellSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
//               <div>
//                 <label style={styles.modalLabel}>Product SKU</label>
//                 <input type="text" required disabled value={sellForm.sku} onChange={(e) => setSellForm({ ...sellForm, sku: e.target.value })} style={{ ...styles.modalInput, backgroundColor: "#f1f5f9", cursor: "not-allowed" }} />
//               </div>
//               <div>
//                 <label style={styles.modalLabel}>Quantity (Max: {product.Qty})</label>
//                 <input type="number" required min="1" max={product.Qty} value={sellForm.qty} onChange={(e) => setSellForm({ ...sellForm, qty: Number(e.target.value) })} style={styles.modalInput} />
//               </div>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f8fafc', padding: '10px', borderRadius: '6px' }}>
//                 <input type="checkbox" checked={sellForm.useMRP} onChange={(e) => setSellForm({ ...sellForm, useMRP: e.target.checked, customPrice: "" })} id="mrpCheck" style={{ cursor: 'pointer' }} />
//                 <label htmlFor="mrpCheck" style={{ fontSize: '14px', cursor: 'pointer', fontWeight: 'bold' }}>Sell at System MRP (₹{product.price})</label>
//               </div>
//               {!sellForm.useMRP && (
//                 <div>
//                   <label style={styles.modalLabel}>Custom Selling Price (₹)</label>
//                   <input type="number" required={!sellForm.useMRP} placeholder="Enter custom price per item" value={sellForm.customPrice} onChange={(e) => setSellForm({ ...sellForm, customPrice: e.target.value })} style={styles.modalInput} />
//                 </div>
//               )}
//               <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
//                 <button type="submit" style={{ ...styles.saveBtn, background: '#16a34a' }}>Confirm Sale</button>
//                 <button type="button" onClick={() => setShowSellModal(false)} style={styles.cancelBtn}>Cancel</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* --- MODAL: HISTORY --- */}
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

//             {!logsLoading && productLogs.length > itemsPerPage && (
//               <div style={styles.paginationWrapper}>
//                 <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} style={currentPage === 1 ? styles.disabledBtn : styles.pageBtn}>Previous</button>
//                 <span style={styles.pageInfo}>Page {currentPage} of {totalPages}</span>
//                 <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} style={currentPage === totalPages ? styles.disabledBtn : styles.pageBtn}>Next</button>
//               </div>
//             )}
//             <button onClick={() => setShowHistory(false)} style={{ ...styles.cancelBtn, marginTop: '15px', width: '100%' }}>Close</button>
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

//       {/* {showImageModal && (
//         <div
//           style={{ position: "fixed", inset: 0, background: "while", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999 }}
//           onClick={() => setShowImageModal(false)}
//         >
//           <img src={activeImage} alt="Preview" style={{ maxWidth: "95%", maxHeight: "95%", objectFit: "contain", borderRadius: "8px", boxShadow: "white" }} />
//         </div>
//       )} */}

//       {showImageModal && (
//         <div
//           style={{
//             position: "fixed",
//             inset: 0,
//             backgroundColor: "rgba(255, 255, 255, 0.95)", // White background with slight transparency
//             backdropFilter: "blur(8px)", // Piche ka screen thoda blur ho jayega (Modern look)
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             zIndex: 9999,
//             cursor: "zoom-out"
//           }}
//           onClick={() => setShowImageModal(false)}
//         >
//           {/* Close Button at Top Right */}
//           <button
//             style={{ position: 'absolute', top: '20px', right: '20px', background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '40px', height: '40px', fontSize: '20px', cursor: 'pointer', color: '#64748b' }}
//           >
//             ✕
//           </button>

//           <img
//             src={activeImage}
//             alt="Preview"
//             style={{
//               maxWidth: "90%",
//               maxHeight: "90%",
//               objectFit: "contain",
//               borderRadius: "12px",
//               backgroundColor: "white", // Image ke niche pure white background
//               boxShadow: "0 20px 50px rgba(0,0,0,0.1)" // Soft shadow for depth
//             }}
//           />
//         </div>
//       )}

//     </div>
//   );
// };

// const InfoBox = ({ label, val, color }) => (
//   <div style={{ background: '#f8fafc', padding: '5px 8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
//     <div style={{ fontSize: '10px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase' }}>{label}</div>
//     <div style={{ fontSize: '13px', fontWeight: '600', color: color || '#334155' }}>{val}</div>
//   </div>
// );

// // ✨ STYLES (Added Compact Input Styles)
// const styles = {
//   container: { height: "100vh", width: "100%", overflow: "hidden", backgroundColor: "#f1f5f9", display: "flex", flexDirection: "column", fontFamily: "'Inter', sans-serif" },
//   centerMsg: { display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', color: '#666' },
//   mainContent: { flex: 1, padding: "10px 20px", display: "flex", flexDirection: "column", gap: "10px", overflow: "hidden" },
//   navBar: { display: 'flex', justifyContent: 'space-between', height: '35px', alignItems: 'center', flexShrink: 0 },
//   backBtn: { background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontWeight: '600', fontSize: '13px' },

//   sellBtn: { background: '#16a34a', color: '#fff', border: 'none', borderRadius: '4px', padding: '5px 12px', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' },
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
//   descBox: { flex: 1.5, background: '#fdfdfd', border: '1px solid #f1f5f9', borderRadius: '6px', padding: '10px', overflowY: 'auto' },
//   packagingBox: { flex: 1.5, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '10px', overflowY: 'auto' },
//   packagingList: { display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' },
//   packItem: { fontSize: '12px', color: '#334155', background: '#fff', padding: '6px 10px', borderRadius: '4px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between' },
//   skuBoxRight: { flex: 1.2, background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },

//   label: { fontSize: '11px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '3px' },
//   descText: { fontSize: '13px', margin: 0, color: '#334155', lineHeight: '1.4' },

//   overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 },
//   modal: { background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: "0 10px 25px rgba(0,0,0,0.1)" },

//   // Compact Forms Styles
//   compactInput: { padding: '6px 8px', width: '100%', borderRadius: '4px', border: '1px solid #ccc', fontSize: '12px', boxSizing: 'border-box', outline: 'none' },
//   compactSelect: { padding: '5px', width: '100%', borderRadius: '4px', border: '1px solid #ccc', fontSize: '11px', boxSizing: 'border-box', background: '#fff', outline: 'none', cursor: 'pointer' },

//   modalLabel: { fontSize: "13px", fontWeight: "600", color: "#475569", marginBottom: "5px", display: "block" },
//   modalInput: { width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "14px", outline: "none", boxSizing: "border-box" },

//   logsTableWrapper: { maxHeight: '300px', overflowY: 'auto', border: '1px solid #f1f5f9', marginTop: '10px' },
//   thMini: { padding: "10px", textAlign: "left", fontSize: "11px", color: "#64748b", textTransform: "uppercase", background: "#f8fafc" },
//   tdMini: { padding: "10px", fontSize: "13px", color: "#334155" },
//   badge: { padding: "2px 6px", borderRadius: "4px", fontSize: "11px", fontWeight: "bold" },
//   input: { padding: '8px', width: '100%', borderRadius: '4px', border: '1px solid #ccc', fontSize: '13px', boxSizing: 'border-box' },
//   textarea: { padding: '8px', width: '100%', height: '50px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '13px', resize: 'none', boxSizing: 'border-box' },
//   saveBtn: { flex: 1, background: '#16a34a', color: '#fff', border: 'none', padding: '8px', borderRadius: '4px', cursor: 'pointer' },
//   cancelBtn: { flex: 1, background: '#f1f5f9', color: '#333', border: '1px solid #ccc', padding: '8px', borderRadius: '4px', cursor: 'pointer' },
//   modalFilterBar: { display: 'flex', gap: '10px', marginBottom: '15px', background: '#f8fafc', padding: '10px', borderRadius: '8px' },
//   modalDateInput: { padding: '5px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '12px', outline: 'none' },
//   applyBtn: { background: '#2563eb', color: '#fff', border: 'none', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' },
//   resetBtnSmall: { background: '#fff', color: '#64748b', border: '1px solid #cbd5e1', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' },

//   paginationWrapper: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '15px' },
//   pageBtn: { background: '#2563eb', border: '1px solid #2563eb', padding: '6px 14px', borderRadius: '4px', cursor: 'pointer', color: '#fff', fontSize: '12px', fontWeight: '600' },
//   disabledBtn: { background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '6px 14px', borderRadius: '4px', cursor: 'not-allowed', color: '#94a3b8', fontSize: '12px' },
//   pageInfo: { fontSize: '13px', fontWeight: '600', color: '#334155' },
// };

// export default ProductDetails;
































// import React, { useEffect, useState, useCallback } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import api from "../api/axios";
// import axios from "axios";
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

//   // --- 📄 PAGINATION STATES ---
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 20;

//   // --- MODAL & EDIT STATES ---
//   const [isEditing, setIsEditing] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);

//   // 🔥 Image Upload States
//   const [preview, setPreview] = useState("");
//   const [uploading, setUploading] = useState(false);

//   // 🔥 Edit Form State (Added Qty)
//   const [editForm, setEditForm] = useState({
//     price: "", costing_price: "", description: "", Supplier_name: "", img: "", Qty: "",
//     brand_box_sku: "", corrugated_box_sku: "", tag_1_sku: "", tag_2_sku: "", tag_3_sku: "", other_material_sku: ""
//   });

//   const [showImageModal, setShowImageModal] = useState(false);
//   const [activeImage, setActiveImage] = useState("");

//   // ✅ 🔥 NEW SELL MODAL STATES
//   const [showSellModal, setShowSellModal] = useState(false);
//   const [sellForm, setSellForm] = useState({
//     sku: "", qty: 1, useMRP: true, customPrice: ""
//   });

//   // ✅ 🔥 PACKAGING (PACKZONE) DB STATES
//   const [packZoneItems, setPackZoneItems] = useState([]);

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

//   // --- FETCH PACKZONE DATA (For Dropdowns) ---
//   useEffect(() => {
//     const fetchPackZoneItems = async () => {
//       try {
//         const res = await axios.get("http://localhost:7000/api/packzone", { withCredentials: true });
//         setPackZoneItems(res.data.items || res.data || []);
//       } catch (error) {
//         console.error("Failed to fetch PackZone items", error);
//       }
//     };
//     fetchPackZoneItems();
//   }, []);

//   // --- HELPER FOR DROPDOWN OPTIONS ---
//   const getOptionsByCategory = (allowedCategories) => {
//     return packZoneItems
//       .filter(item => allowedCategories.includes(item.category))
//       .map(item => (
//         <option key={item._id} value={item.item_sku}>
//           {item.itemName} ({item.size}) - {item.item_sku}
//         </option>
//       ));
//   };

//   // --- 🔍 HISTORY LOGIC (🔥 FIXED FETCHING) ---
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
//     setCurrentPage(1);
//     try {
//       const res = await api.get(`/logs/product/${id}`, {
//         params: { sku: product.sku, startDate: sDate, endDate: eDate }
//       });
      
//       // 🔥 FIX: Agar backend array direct nahi bhej raha, toh { logs: [] } format handle karega
//       const fetchedLogs = Array.isArray(res.data) ? res.data : (res.data.logs || res.data.data || []);
//       setProductLogs(fetchedLogs);
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

//   // --- 📄 PAGINATION LOGIC ---
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
//       Qty: product.Qty || "", 
//       Supplier_name: product.Supplier_name || "",
//       img: product.img || "",
//       brand_box_sku: product.brand_box_sku || "",
//       corrugated_box_sku: product.corrugated_box_sku || "",
//       tag_1_sku: product.tag_1_sku || "",
//       tag_2_sku: product.tag_2_sku || "",
//       tag_3_sku: product.tag_3_sku || "",
//       other_material_sku: product.other_material_sku || ""
//     });
//     setPreview(product.img || "");
//     setIsEditing(true);
//   };

//   const handleImageSelect = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setUploading(true);
//     const reader = new FileReader();
//     reader.onloadend = () => setPreview(reader.result);
//     reader.readAsDataURL(file);

//     try {
//       const imgData = new FormData();
//       imgData.append("image", file);
//       const res = await axios.post("http://localhost:7000/api/products/upload", imgData, {
//         headers: { "Content-Type": "multipart/form-data" },
//         withCredentials: true,
//       });
//       setEditForm((prev) => ({ ...prev, img: res.data.url }));
//       toast.success("Image uploaded!");
//     } catch (err) {
//       toast.error("Image upload failed");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleSaveChanges = async (e) => {
//     e.preventDefault();
//     if (uploading) return toast.error("Please wait for image upload to finish.");
//     try {
//       await api.put(`/products/${id}`, {
//         ...editForm,
//         actorName: user?.name || user?.username || "Admin",
//         userId: user?._id
//       });
      
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
//       await api.delete(`/products/${id}`, {
//         data: { actorName: user?.name || user?.username || "Admin", userId: user?._id }
//       });
//       toast.success("Product Deleted Successfully");
//       navigate("/dashboard");
//     } catch (error) {
//       toast.error("Failed to delete product");
//     }
//     setShowDeleteModal(false);
//   };

//   // --- ✅ 🛒 SELL HANDLERS ---
//   const handleSellClick = () => {
//     if (!canEdit) return toast.error("Permission Denied");
//     if (product.Qty <= 0) return toast.error("Out of stock!");
//     setSellForm({ sku: product.sku, qty: 1, useMRP: true, customPrice: "" });
//     setShowSellModal(true);
//   };

//   const handleSellSubmit = async (e) => {
//     e.preventDefault();
//     if (!sellForm.sku) return toast.error("Please enter SKU");
//     if (sellForm.qty <= 0) return toast.error("Quantity must be greater than 0");
//     if (sellForm.qty > product.Qty) return toast.error(`Not enough stock! Available: ${product.Qty}`);
//     if (!sellForm.useMRP && !sellForm.customPrice) return toast.error("Please enter Custom Price");

//     try {
//       // 🔥 FIX: Added productId so backend's universal logger can catch it!
//       const payload = {
//         productId: id, 
//         sku: sellForm.sku,
//         removeQty: sellForm.qty,
//         customSellingPrice: sellForm.useMRP ? null : Number(sellForm.customPrice),
//         actorName: user?.name || user?.username || "Admin",
//         userId: user?._id
//       };
//       await api.put("/products/update-qty-sku", payload);
//       toast.success("Sale entry added successfully!");
//       setShowSellModal(false);
//       fetchProduct();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to make a sale");
//     }
//   };

//   // --- 📥 EXCEL DOWNLOAD UPDATED ---
//   const downloadOneProductExcel = () => {
//     if (!product) return;
//     const dataToExport = [{
//       Name: product.name, SKU: product.sku, Description: product.description || "-",
//       Category: product.category, Color: product.color, Size: product.size,
//       Price: product.price, GST: product.gst ? `${product.gst}%` : "0%",
//       "Cost Price": canEdit ? product.costing_price : "N/A", Stock: product.Qty,
//       Supplier: canEdit ? product.Supplier_name : "N/A", Status: product.Qty > 0 ? "In Stock" : "Out of Stock",
//       "Product Image URL": product.img || "No Image", "Barcode Image URL": product.barcodeImg || "No Barcode",
//       "Brand Box SKU": product.brand_box_sku || "N/A", "Corrugated Box SKU": product.corrugated_box_sku || "N/A",
//       "Tags": [product.tag_1_sku, product.tag_2_sku, product.tag_3_sku].filter(Boolean).join(", ") || "N/A"
//     }];
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
//                 <button onClick={handleSellClick} style={styles.sellBtn}>💰 Sell</button>
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
//                 <img src={product.barcodeImg} alt="Barcode" style={{ ...styles.barcodeImg, cursor: "zoom-in" }}
//                   onClick={() => { setActiveImage(product.barcodeImg); setShowImageModal(true); }}
//                 />
//                 <button onClick={() => downloadImage(product.barcodeImg, `${product.sku}.jpg`)} style={styles.miniLink}>⬇</button>
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
//                 <div style={styles.price}>MRP: ₹{product.price}</div>
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
//                 <p style={styles.descText}>{product.description || "No description provided."}</p>
//               </div>

//               <div style={styles.packagingBox}>
//                 <span style={styles.label}>📦 Packaging Materials:</span>
//                 <div style={styles.packagingList}>
//                   {product.brand_box_sku && <div style={styles.packItem}><b>Brand Box:</b> {product.brand_box_sku}</div>}
//                   {product.corrugated_box_sku && <div style={styles.packItem}><b>Corrugated:</b> {product.corrugated_box_sku}</div>}
//                   {product.tag_1_sku && <div style={styles.packItem}><b>Tag 1:</b> {product.tag_1_sku}</div>}
//                   {product.tag_2_sku && <div style={styles.packItem}><b>Tag 2:</b> {product.tag_2_sku}</div>}
//                   {product.tag_3_sku && <div style={styles.packItem}><b>Tag 3:</b> {product.tag_3_sku}</div>}
//                   {product.other_material_sku && <div style={styles.packItem}><b>Other:</b> {product.other_material_sku}</div>}

//                   {!(product.brand_box_sku || product.corrugated_box_sku || product.tag_1_sku || product.tag_2_sku || product.tag_3_sku || product.other_material_sku) && (
//                     <div style={{ ...styles.packItem, color: '#94a3b8', fontStyle: 'italic', border: 'none', background: 'transparent' }}>
//                       No packaging linked.
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* --- ✅ MODAL: EDIT PRODUCT (COMPACT & WITH DB DROPDOWNS) --- */}
//       {isEditing && canEdit && (
//         <div style={styles.overlay}>
//           <div style={{ ...styles.modal, width: '650px', maxWidth: '95%', maxHeight: '85vh', overflowY: 'auto', padding: '15px' }}>
//             <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Edit Product & Packaging</h3>

//             <form onSubmit={handleSaveChanges} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
//               <div style={{ display: 'flex', gap: '15px' }}>
//                 <div style={{ flex: '0 0 100px', textAlign: 'center', border: '1px dashed #ccc', padding: '5px', borderRadius: '6px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
//                   {preview ? (
//                     <img src={preview} alt="Preview" style={{ width: '60px', height: '60px', objectFit: 'contain', borderRadius: '4px', margin: '0 auto' }} />
//                   ) : (
//                     <div style={{ fontSize: '11px', color: '#999' }}>No Image</div>
//                   )}
//                   <div style={{ marginTop: '5px' }}>
//                     <label style={{ cursor: 'pointer', color: '#2563eb', fontSize: '11px', fontWeight: 'bold' }}>
//                       {uploading ? "..." : "Change"}
//                       <input type="file" accept="image/*" onChange={handleImageSelect} style={{ display: 'none' }} disabled={uploading} />
//                     </label>
//                   </div>
//                 </div>

//                 <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
//                   <div style={{ display: 'flex', gap: '10px' }}>
//                     <div style={{ flex: 1 }}>
//                       <label style={styles.label}>Cost Price</label>
//                       <input type="number" value={editForm.costing_price} onChange={(e) => setEditForm({ ...editForm, costing_price: e.target.value })} style={styles.compactInput} required />
//                     </div>
//                     <div style={{ flex: 1 }}>
//                       <label style={styles.label}>Selling Price</label>
//                       <input type="number" value={editForm.price} onChange={(e) => setEditForm({ ...editForm, price: e.target.value })} style={styles.compactInput} required />
//                     </div>
//                   </div>

//                   <div style={{ display: 'flex', gap: '10px' }}>
//                     <div style={{ flex: 1 }}>
//                       <label style={styles.label}>Supplier Name</label>
//                       <input type="text" value={editForm.Supplier_name} onChange={(e) => setEditForm({ ...editForm, Supplier_name: e.target.value })} style={styles.compactInput} required />
//                     </div>
//                     <div style={{ flex: 1 }}>
//                       <label style={styles.label}>QTY</label>
//                       <input type="number" value={editForm.Qty} onChange={(e) => setEditForm({ ...editForm, Qty: e.target.value })} style={styles.compactInput} required />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <label style={styles.label}>Description</label>
//                 <textarea value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} style={{ ...styles.textarea, height: '35px', padding: '6px', fontSize: '12px' }} />
//               </div>

//               <hr style={{ ...styles.divider, margin: '5px 0' }} />

//               <label style={styles.label}>📦 Packaging Categories (Select SKU)</label>
//               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
//                 <div>
//                   <label style={{ fontSize: '10px', color: '#666', fontWeight: 'bold' }}>Brand Box</label>
//                   <select value={editForm.brand_box_sku} onChange={(e) => setEditForm({ ...editForm, brand_box_sku: e.target.value })} style={styles.compactSelect}>
//                     <option value="">-- No Box Selected --</option>
//                     {getOptionsByCategory(["Packaging Boxes"])}
//                   </select>
//                 </div>
//                 <div>
//                   <label style={{ fontSize: '10px', color: '#666', fontWeight: 'bold' }}>Corrugated Box</label>
//                   <select value={editForm.corrugated_box_sku} onChange={(e) => setEditForm({ ...editForm, corrugated_box_sku: e.target.value })} style={styles.compactSelect}>
//                     <option value="">-- No Corrugated Box --</option>
//                     {getOptionsByCategory(["Packaging Boxes"])}
//                   </select>
//                 </div>
//                 <div>
//                   <label style={{ fontSize: '10px', color: '#666', fontWeight: 'bold' }}>Tag 1 (Primary)</label>
//                   <select value={editForm.tag_1_sku} onChange={(e) => setEditForm({ ...editForm, tag_1_sku: e.target.value })} style={styles.compactSelect}>
//                     <option value="">-- Select Tag --</option>
//                     {getOptionsByCategory(["Marketing Collateral", "Branding Stickers"])}
//                   </select>
//                 </div>
//                 <div>
//                   <label style={{ fontSize: '10px', color: '#666', fontWeight: 'bold' }}>Tag 2</label>
//                   <select value={editForm.tag_2_sku} onChange={(e) => setEditForm({ ...editForm, tag_2_sku: e.target.value })} style={styles.compactSelect}>
//                     <option value="">-- Select Tag --</option>
//                     {getOptionsByCategory(["Marketing Collateral", "Branding Stickers"])}
//                   </select>
//                 </div>
//                 <div>
//                   <label style={{ fontSize: '10px', color: '#666', fontWeight: 'bold' }}>Tag 3</label>
//                   <select value={editForm.tag_3_sku} onChange={(e) => setEditForm({ ...editForm, tag_3_sku: e.target.value })} style={styles.compactSelect}>
//                     <option value="">-- Select Tag --</option>
//                     {getOptionsByCategory(["Marketing Collateral", "Branding Stickers"])}
//                   </select>
//                 </div>
//                 <div>
//                   <label style={{ fontSize: '10px', color: '#666', fontWeight: 'bold' }}>Other Material</label>
//                   <select value={editForm.other_material_sku} onChange={(e) => setEditForm({ ...editForm, other_material_sku: e.target.value })} style={styles.compactSelect}>
//                     <option value="">-- Select Material --</option>
//                     {getOptionsByCategory(["Marketing Collateral", "Branding Stickers", "Packaging Boxes"])}
//                   </select>
//                 </div>
//               </div>

//               <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
//                 <button type="submit" disabled={uploading} style={{ ...styles.saveBtn, opacity: uploading ? 0.7 : 1, padding: '8px' }}>Save Changes</button>
//                 <button type="button" onClick={() => setIsEditing(false)} style={{ ...styles.cancelBtn, padding: '8px' }}>Cancel</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* --- ✅ MODAL: SELL PRODUCT --- */}
//       {showSellModal && canEdit && (
//         <div style={styles.overlay}>
//           <div style={{ ...styles.modal, width: '400px', maxWidth: '95%' }}>
//             <h3 style={{ margin: '0 0 15px 0', color: '#16a34a' }}>Sell Product</h3>
//             <form onSubmit={handleSellSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
//               <div>
//                 <label style={styles.modalLabel}>Product SKU</label>
//                 <input type="text" required disabled value={sellForm.sku} onChange={(e) => setSellForm({ ...sellForm, sku: e.target.value })} style={{ ...styles.modalInput, backgroundColor: "#f1f5f9", cursor: "not-allowed" }} />
//               </div>
//               <div>
//                 <label style={styles.modalLabel}>Quantity (Max: {product.Qty})</label>
//                 <input type="number" required min="1" max={product.Qty} value={sellForm.qty} onChange={(e) => setSellForm({ ...sellForm, qty: Number(e.target.value) })} style={styles.modalInput} />
//               </div>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f8fafc', padding: '10px', borderRadius: '6px' }}>
//                 <input type="checkbox" checked={sellForm.useMRP} onChange={(e) => setSellForm({ ...sellForm, useMRP: e.target.checked, customPrice: "" })} id="mrpCheck" style={{ cursor: 'pointer' }} />
//                 <label htmlFor="mrpCheck" style={{ fontSize: '14px', cursor: 'pointer', fontWeight: 'bold' }}>Sell at System MRP (₹{product.price})</label>
//               </div>
//               {!sellForm.useMRP && (
//                 <div>
//                   <label style={styles.modalLabel}>Custom Selling Price (₹)</label>
//                   <input type="number" required={!sellForm.useMRP} placeholder="Enter custom price per item" value={sellForm.customPrice} onChange={(e) => setSellForm({ ...sellForm, customPrice: e.target.value })} style={styles.modalInput} />
//                 </div>
//               )}
//               <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
//                 <button type="submit" style={{ ...styles.saveBtn, background: '#16a34a' }}>Confirm Sale</button>
//                 <button type="button" onClick={() => setShowSellModal(false)} style={styles.cancelBtn}>Cancel</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* --- MODAL: HISTORY (🔥 UPDATED TO BE SAFE FROM ERRORS) --- */}
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
//                     currentLogs.map((log, i) => (
//                       <tr key={log._id || i} style={{ borderBottom: '1px solid #f1f5f9' }}>
//                         {/* Safe rendering in case backend keys are slightly different */}
//                         <td style={styles.tdMini}>{new Date(log.timestamp || log.createdAt).toLocaleString()}</td>
//                         <td style={{ ...styles.tdMini, fontWeight: 'bold' }}>{log.actorName || log.performedBy?.name || 'User'}</td>
//                         <td style={styles.tdMini}>
//                           <span style={{ ...styles.badge, background: (log.action || log.actionType || '').includes('UPDATE') ? '#e0f2fe' : '#f3f4f6', color: (log.action || log.actionType || '').includes('UPDATE') ? '#0369a1' : '#374151' }}>
//                             {log.action || log.actionType || 'UPDATE'}
//                           </span>
//                         </td>
//                         <td style={{ ...styles.tdMini, fontSize: '12px' }}>{log.details || log.reason || '-'}</td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             {!logsLoading && productLogs.length > itemsPerPage && (
//               <div style={styles.paginationWrapper}>
//                 <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} style={currentPage === 1 ? styles.disabledBtn : styles.pageBtn}>Previous</button>
//                 <span style={styles.pageInfo}>Page {currentPage} of {totalPages}</span>
//                 <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} style={currentPage === totalPages ? styles.disabledBtn : styles.pageBtn}>Next</button>
//               </div>
//             )}
//             <button onClick={() => setShowHistory(false)} style={{ ...styles.cancelBtn, marginTop: '15px', width: '100%' }}>Close</button>
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
//             backgroundColor: "rgba(255, 255, 255, 0.95)", 
//             backdropFilter: "blur(8px)", 
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             zIndex: 9999,
//             cursor: "zoom-out"
//           }}
//           onClick={() => setShowImageModal(false)}
//         >
//           <button
//             style={{ position: 'absolute', top: '20px', right: '20px', background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '40px', height: '40px', fontSize: '20px', cursor: 'pointer', color: '#64748b' }}
//           >
//             ✕
//           </button>

//           <img
//             src={activeImage}
//             alt="Preview"
//             style={{
//               maxWidth: "90%",
//               maxHeight: "90%",
//               objectFit: "contain",
//               borderRadius: "12px",
//               backgroundColor: "white", 
//               boxShadow: "0 20px 50px rgba(0,0,0,0.1)" 
//             }}
//           />
//         </div>
//       )}

//     </div>
//   );
// };

// const InfoBox = ({ label, val, color }) => (
//   <div style={{ background: '#f8fafc', padding: '5px 8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
//     <div style={{ fontSize: '10px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase' }}>{label}</div>
//     <div style={{ fontSize: '13px', fontWeight: '600', color: color || '#334155' }}>{val}</div>
//   </div>
// );

// // ✨ STYLES (Added Compact Input Styles)
// const styles = {
//   container: { height: "100vh", width: "100%", overflow: "hidden", backgroundColor: "#f1f5f9", display: "flex", flexDirection: "column", fontFamily: "'Inter', sans-serif" },
//   centerMsg: { display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', color: '#666' },
//   mainContent: { flex: 1, padding: "10px 20px", display: "flex", flexDirection: "column", gap: "10px", overflow: "hidden" },
//   navBar: { display: 'flex', justifyContent: 'space-between', height: '35px', alignItems: 'center', flexShrink: 0 },
//   backBtn: { background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontWeight: '600', fontSize: '13px' },

//   sellBtn: { background: '#16a34a', color: '#fff', border: 'none', borderRadius: '4px', padding: '5px 12px', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' },
//   headerEditBtn: { background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', padding: '5px 12px', fontSize: '12px', cursor: 'pointer' },
//   headerDelBtn: { background: '#fff', color: '#dc2626', border: '1px solid #fca5a5', borderRadius: '4px', padding: '5px 12px', fontSize: '12px', cursor: 'pointer' },
//   excelBtn: { background: '#107c41', color: '#fff', border: 'none', borderRadius: '4px', padding: '5px 12px', fontSize: '12px', cursor: 'pointer' },
//   historyBtn: { background: '#475569', color: '#fff', border: 'none', borderRadius: '4px', padding: '5px 12px', fontSize: '12px', cursor: 'pointer' },

//   productCard: { display: "flex", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", overflow: "hidden", flex: 1, border: "1px solid #e2e8f0", minHeight: 0 },
//   leftCol: { width: "30%", minWidth: "250px", backgroundColor: "#f8fafc", padding: "15px", borderRight: "1px solid #e2e8f0", display: "flex", flexDirection: "column", gap: "10px", overflow: "auto" },
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
//   descBox: { flex: 1.5, background: '#fdfdfd', border: '1px solid #f1f5f9', borderRadius: '6px', padding: '10px', overflowY: 'auto' },
//   packagingBox: { flex: 1.5, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '10px', overflowY: 'auto' },
//   packagingList: { display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' },
//   packItem: { fontSize: '12px', color: '#334155', background: '#fff', padding: '6px 10px', borderRadius: '4px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between' },

//   label: { fontSize: '11px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '3px' },
//   descText: { fontSize: '13px', margin: 0, color: '#334155', lineHeight: '1.4' },

//   overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 },
//   modal: { background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: "0 10px 25px rgba(0,0,0,0.1)" },

//   // Compact Forms Styles
//   compactInput: { padding: '6px 8px', width: '100%', borderRadius: '4px', border: '1px solid #ccc', fontSize: '12px', boxSizing: 'border-box', outline: 'none' },
//   compactSelect: { padding: '5px', width: '100%', borderRadius: '4px', border: '1px solid #ccc', fontSize: '11px', boxSizing: 'border-box', background: '#fff', outline: 'none', cursor: 'pointer' },

//   modalLabel: { fontSize: "13px", fontWeight: "600", color: "#475569", marginBottom: "5px", display: "block" },
//   modalInput: { width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "14px", outline: "none", boxSizing: "border-box" },

//   logsTableWrapper: { maxHeight: '300px', overflowY: 'auto', border: '1px solid #f1f5f9', marginTop: '10px' },
//   thMini: { padding: "10px", textAlign: "left", fontSize: "11px", color: "#64748b", textTransform: "uppercase", background: "#f8fafc" },
//   tdMini: { padding: "10px", fontSize: "13px", color: "#334155" },
//   badge: { padding: "2px 6px", borderRadius: "4px", fontSize: "11px", fontWeight: "bold" },
//   input: { padding: '8px', width: '100%', borderRadius: '4px', border: '1px solid #ccc', fontSize: '13px', boxSizing: 'border-box' },
//   textarea: { padding: '8px', width: '100%', height: '50px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '13px', resize: 'none', boxSizing: 'border-box' },
//   saveBtn: { flex: 1, background: '#16a34a', color: '#fff', border: 'none', padding: '8px', borderRadius: '4px', cursor: 'pointer' },
//   cancelBtn: { flex: 1, background: '#f1f5f9', color: '#333', border: '1px solid #ccc', padding: '8px', borderRadius: '4px', cursor: 'pointer' },
//   modalFilterBar: { display: 'flex', gap: '10px', marginBottom: '15px', background: '#f8fafc', padding: '10px', borderRadius: '8px' },
//   modalDateInput: { padding: '5px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '12px', outline: 'none' },
//   applyBtn: { background: '#2563eb', color: '#fff', border: 'none', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' },
//   resetBtnSmall: { background: '#fff', color: '#64748b', border: '1px solid #cbd5e1', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' },

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
import axios from "axios";
import toast from "react-hot-toast";
import Header from "../components/Header";
import * as XLSX from "xlsx";
import { FaBackspace } from "react-icons/fa";

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

  // 🔥 Image Upload States
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);

  // 🔥 Edit Form State
  const [editForm, setEditForm] = useState({
    price: "", costing_price: "", description: "", Supplier_name: "", img: "", Qty: "",
    brand_box_sku: "", corrugated_box_sku: "", tag_1_sku: "", tag_2_sku: "", tag_3_sku: "", other_material_sku: ""
  });

  const [showImageModal, setShowImageModal] = useState(false);
  const [activeImage, setActiveImage] = useState("");

  // ✅ 🔥 EXPANDED NEW SELL MODAL STATES (Same as Sales.jsx)
  const [showSellModal, setShowSellModal] = useState(false);
  const [sellForm, setSellForm] = useState({
    sku: "",
    qty: 1,
    useMRP: true,
    customPrice: "",
    orderNumber: "",
    paymentMethod: "Cash",
    customerName: "",
    sameAsBilling: true,
    billingAddress: { first_name: "", last_name: "", address1: "", city: "", province: "", zip: "", country: "India" },
    shippingAddress: { first_name: "", last_name: "", address1: "", city: "", province: "", zip: "", country: "India" }
  });

  // ✅ 🔥 PACKAGING (PACKZONE) DB STATES
  const [packZoneItems, setPackZoneItems] = useState([]);

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

  // --- FETCH PACKZONE DATA ---
  useEffect(() => {
    const fetchPackZoneItems = async () => {
      try {
        const res = await axios.get("http://localhost:7000/api/packzone", { withCredentials: true });
        setPackZoneItems(res.data.items || res.data || []);
      } catch (error) {
        console.error("Failed to fetch PackZone items", error);
      }
    };
    fetchPackZoneItems();
  }, []);

  // --- HELPER FOR DROPDOWN OPTIONS ---
  const getOptionsByCategory = (allowedCategories) => {
    return packZoneItems
      .filter(item => allowedCategories.includes(item.category))
      .map(item => (
        <option key={item._id} value={item.item_sku}>
          {item.itemName} ({item.size}) - {item.item_sku}
        </option>
      ));
  };

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
      const fetchedLogs = Array.isArray(res.data) ? res.data : (res.data.logs || res.data.data || []);
      setProductLogs(fetchedLogs);
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
      price: product.price, costing_price: product.costing_price, description: product.description || "",
      Qty: product.Qty || "", Supplier_name: product.Supplier_name || "", img: product.img || "",
      brand_box_sku: product.brand_box_sku || "", corrugated_box_sku: product.corrugated_box_sku || "",
      tag_1_sku: product.tag_1_sku || "", tag_2_sku: product.tag_2_sku || "", tag_3_sku: product.tag_3_sku || "",
      other_material_sku: product.other_material_sku || ""
    });
    setPreview(product.img || "");
    setIsEditing(true);
  };

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
      const res = await axios.post("http://localhost:7000/api/products/upload", imgData, {
        headers: { "Content-Type": "multipart/form-data" }, withCredentials: true,
      });
      setEditForm((prev) => ({ ...prev, img: res.data.url }));
      toast.success("Image uploaded!");
    } catch (err) {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    if (uploading) return toast.error("Please wait for image upload to finish.");
    try {
      await api.put(`/products/${id}`, {
        ...editForm, actorName: user?.name || user?.username || "Admin", userId: user?._id
      });
      toast.success("Product Updated Successfully!");
      setIsEditing(false);
      fetchProduct();
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/products/${id}`, { data: { actorName: user?.name || user?.username || "Admin", userId: user?._id } });
      toast.success("Product Deleted Successfully");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to delete product");
    }
    setShowDeleteModal(false);
  };

  // --- ✅ 🛒 SELL HANDLERS (UPDATED TO MATCH SALES.JSX) ---
  const handleSellClick = () => {
    if (!canEdit) return toast.error("Permission Denied");
    if (product.Qty <= 0) return toast.error("Out of stock!");
    
    // Reset form and pre-fill SKU
    setSellForm({
      sku: product.sku, qty: 1, useMRP: true, customPrice: "", orderNumber: "", paymentMethod: "Cash", customerName: "", sameAsBilling: true,
      billingAddress: { first_name: "", last_name: "", address1: "", city: "", province: "", zip: "", country: "India" },
      shippingAddress: { first_name: "", last_name: "", address1: "", city: "", province: "", zip: "", country: "India" }
    });
    setShowSellModal(true);
  };

  const handleAddressChange = (type, field, value) => {
    setSellForm(prev => ({
      ...prev, [type]: { ...prev[type], [field]: value }
    }));
  };

  const handleSellSubmit = async (e) => {
    e.preventDefault();
    if (!sellForm.sku) return toast.error("Please enter SKU");
    if (sellForm.qty <= 0) return toast.error("Quantity must be greater than 0");
    if (sellForm.qty > product.Qty) return toast.error(`Not enough stock! Available: ${product.Qty}`);
    if (!sellForm.useMRP && !sellForm.customPrice) return toast.error("Please enter Custom Price");

    try {
      // Split names for the address objects
      const names = sellForm.customerName.split(" ");
      const fName = names[0] || "";
      const lName = names.slice(1).join(" ") || "";

      // Ensure first_name/last_name are set in addresses
      const finalBilling = { ...sellForm.billingAddress, first_name: fName, last_name: lName };
      const finalShipping = sellForm.sameAsBilling ? finalBilling : { ...sellForm.shippingAddress, first_name: fName, last_name: lName };

      // 🔥 FIX: Redirecting to /sales/update-qty-sku to utilize the new ERP level logic
      const payload = {
        sku: sellForm.sku,
        removeQty: sellForm.qty,
        customSellingPrice: sellForm.useMRP ? null : Number(sellForm.customPrice),
        shop: "Manual Entry",
        orderNumber: sellForm.orderNumber || `MANUAL-${Date.now().toString().slice(-5)}`,
        paymentMethod: sellForm.paymentMethod,
        customerName: sellForm.customerName,
        billingAddress: finalBilling,
        shippingAddress: finalShipping,
        actorName: user?.name || user?.username || "Admin", // For logs
        userId: user?._id
      };

      await api.post("/sales/update-qty-sku", payload); 
      
      toast.success("Manual sale added successfully!");
      setShowSellModal(false);
      fetchProduct(); // Refresh product page to see updated stock
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to make a sale");
    }
  };

  // --- 📥 EXCEL DOWNLOAD UPDATED ---
  const downloadOneProductExcel = () => {
    if (!product) return;
    const dataToExport = [{
      Name: product.name, SKU: product.sku, Description: product.description || "-",
      Category: product.category, Color: product.color, Size: product.size,
      Price: product.price, GST: product.gst ? `${product.gst}%` : "0%",
      "Cost Price": canEdit ? product.costing_price : "N/A", Stock: product.Qty,
      Supplier: canEdit ? product.Supplier_name : "N/A", Status: product.Qty > 0 ? "In Stock" : "Out of Stock",
      "Product Image URL": product.img || "No Image", "Barcode Image URL": product.barcodeImg || "No Barcode",
      "Brand Box SKU": product.brand_box_sku || "N/A", "Corrugated Box SKU": product.corrugated_box_sku || "N/A",
      "Tags": [product.tag_1_sku, product.tag_2_sku, product.tag_3_sku].filter(Boolean).join(", ") || "N/A"
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
      link.href = url; link.download = fileName || "download.jpg"; link.click();
    } catch (error) { toast.error("Download failed"); }
  };

  if (loading) return <div style={styles.centerMsg}>Loading...</div>;
  if (!product) return <div style={styles.centerMsg}>Not Found</div>;

  return (
    <div style={styles.container}>
      {/* <Header / */}
      <div style={styles.mainContent}>
        <div style={styles.navBar}>
          <button onClick={() => navigate("/inventory")} style={styles.backBtn}><FaBackspace style={{font:"30px"}} /></button>
          <div style={{ display: 'flex', gap: '10px' }}>
            {canEdit && (
              <>
                <button onClick={handleSellClick} style={styles.sellBtn}>💰 Sell</button>
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
              <img src={product.img} alt={product.name} style={{ ...styles.productImg, cursor: "zoom-in" }} onClick={() => { setActiveImage(product.img); setShowImageModal(true); }} />
              <button onClick={() => downloadImage(product.img, `${product.name}.jpg`)} style={styles.iconBtn}>⬇</button>
            </div>
            {product.barcodeImg && (
              <div style={styles.barcodeWrapper}>
                <img src={product.barcodeImg} alt="Barcode" style={{ ...styles.barcodeImg, cursor: "zoom-in" }} onClick={() => { setActiveImage(product.barcodeImg); setShowImageModal(true); }} />
                <button onClick={() => downloadImage(product.barcodeImg, `${product.sku}.jpg`)} style={styles.miniLink}>⬇</button>
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
                <p style={styles.descText}>{product.description || "No description provided."}</p>
              </div>

              <div style={styles.packagingBox}>
                <span style={styles.label}>📦 Packaging Materials:</span>
                <div style={styles.packagingList}>
                  {product.brand_box_sku && <div style={styles.packItem}><b>Brand Box:</b> {product.brand_box_sku}</div>}
                  {product.corrugated_box_sku && <div style={styles.packItem}><b>Corrugated:</b> {product.corrugated_box_sku}</div>}
                  {product.tag_1_sku && <div style={styles.packItem}><b>Tag 1:</b> {product.tag_1_sku}</div>}
                  {product.tag_2_sku && <div style={styles.packItem}><b>Tag 2:</b> {product.tag_2_sku}</div>}
                  {product.tag_3_sku && <div style={styles.packItem}><b>Tag 3:</b> {product.tag_3_sku}</div>}
                  {product.other_material_sku && <div style={styles.packItem}><b>Other:</b> {product.other_material_sku}</div>}
                  {!(product.brand_box_sku || product.corrugated_box_sku || product.tag_1_sku || product.tag_2_sku || product.tag_3_sku || product.other_material_sku) && (
                    <div style={{ ...styles.packItem, color: '#94a3b8', fontStyle: 'italic', border: 'none', background: 'transparent' }}>
                      No packaging linked.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- ✅ MODAL: EDIT PRODUCT --- */}
      {isEditing && canEdit && (
        <div style={styles.overlay}>
          <div style={{ ...styles.modal, width: '650px', maxWidth: '95%', maxHeight: '85vh', overflowY: 'auto', padding: '15px' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Edit Product & Packaging</h3>
            <form onSubmit={handleSaveChanges} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ flex: '0 0 100px', textAlign: 'center', border: '1px dashed #ccc', padding: '5px', borderRadius: '6px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  {preview ? <img src={preview} alt="Preview" style={{ width: '60px', height: '60px', objectFit: 'contain', borderRadius: '4px', margin: '0 auto' }} /> : <div style={{ fontSize: '11px', color: '#999' }}>No Image</div>}
                  <div style={{ marginTop: '5px' }}>
                    <label style={{ cursor: 'pointer', color: '#2563eb', fontSize: '11px', fontWeight: 'bold' }}>
                      {uploading ? "..." : "Change"}
                      <input type="file" accept="image/*" onChange={handleImageSelect} style={{ display: 'none' }} disabled={uploading} />
                    </label>
                  </div>
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ flex: 1 }}><label style={styles.label}>Cost Price</label><input type="number" value={editForm.costing_price} onChange={(e) => setEditForm({ ...editForm, costing_price: e.target.value })} style={styles.compactInput} required /></div>
                    <div style={{ flex: 1 }}><label style={styles.label}>Selling Price</label><input type="number" value={editForm.price} onChange={(e) => setEditForm({ ...editForm, price: e.target.value })} style={styles.compactInput} required /></div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ flex: 1 }}><label style={styles.label}>Supplier Name</label><input type="text" value={editForm.Supplier_name} onChange={(e) => setEditForm({ ...editForm, Supplier_name: e.target.value })} style={styles.compactInput} required /></div>
                    <div style={{ flex: 1 }}><label style={styles.label}>QTY</label><input type="number" value={editForm.Qty} onChange={(e) => setEditForm({ ...editForm, Qty: e.target.value })} style={styles.compactInput} required /></div>
                  </div>
                </div>
              </div>

              <div>
                <label style={styles.label}>Description</label>
                <textarea value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} style={{ ...styles.textarea, height: '35px', padding: '6px', fontSize: '12px' }} />
              </div>
              <hr style={{ ...styles.divider, margin: '5px 0' }} />

              <label style={styles.label}>📦 Packaging Categories (Select SKU)</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                <div><label style={{ fontSize: '10px', color: '#666', fontWeight: 'bold' }}>Brand Box</label><select value={editForm.brand_box_sku} onChange={(e) => setEditForm({ ...editForm, brand_box_sku: e.target.value })} style={styles.compactSelect}><option value="">-- No Box Selected --</option>{getOptionsByCategory(["Packaging Boxes"])}</select></div>
                <div><label style={{ fontSize: '10px', color: '#666', fontWeight: 'bold' }}>Corrugated Box</label><select value={editForm.corrugated_box_sku} onChange={(e) => setEditForm({ ...editForm, corrugated_box_sku: e.target.value })} style={styles.compactSelect}><option value="">-- No Corrugated Box --</option>{getOptionsByCategory(["Packaging Boxes"])}</select></div>
                <div><label style={{ fontSize: '10px', color: '#666', fontWeight: 'bold' }}>Tag 1 (Primary)</label><select value={editForm.tag_1_sku} onChange={(e) => setEditForm({ ...editForm, tag_1_sku: e.target.value })} style={styles.compactSelect}><option value="">-- Select Tag --</option>{getOptionsByCategory(["Marketing Collateral", "Branding Stickers"])}</select></div>
                <div><label style={{ fontSize: '10px', color: '#666', fontWeight: 'bold' }}>Tag 2</label><select value={editForm.tag_2_sku} onChange={(e) => setEditForm({ ...editForm, tag_2_sku: e.target.value })} style={styles.compactSelect}><option value="">-- Select Tag --</option>{getOptionsByCategory(["Marketing Collateral", "Branding Stickers"])}</select></div>
                <div><label style={{ fontSize: '10px', color: '#666', fontWeight: 'bold' }}>Tag 3</label><select value={editForm.tag_3_sku} onChange={(e) => setEditForm({ ...editForm, tag_3_sku: e.target.value })} style={styles.compactSelect}><option value="">-- Select Tag --</option>{getOptionsByCategory(["Marketing Collateral", "Branding Stickers"])}</select></div>
                <div><label style={{ fontSize: '10px', color: '#666', fontWeight: 'bold' }}>Other Material</label><select value={editForm.other_material_sku} onChange={(e) => setEditForm({ ...editForm, other_material_sku: e.target.value })} style={styles.compactSelect}><option value="">-- Select Material --</option>{getOptionsByCategory(["Marketing Collateral", "Branding Stickers", "Packaging Boxes"])}</select></div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                <button type="submit" disabled={uploading} style={{ ...styles.saveBtn, opacity: uploading ? 0.7 : 1, padding: '8px' }}>Save Changes</button>
                <button type="button" onClick={() => setIsEditing(false)} style={{ ...styles.cancelBtn, padding: '8px' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- ✅ 🔴 EXPANDED MANUAL SELL MODAL (IMPORTED FROM SALES.JSX) --- */}
      {showSellModal && canEdit && (
        <div style={styles.overlay}>
          <div style={styles.extraLargeModalContent}>
            <div style={styles.modalHeader}>
              <h3 style={{margin: 0, color: '#16a34a'}}>💰 Sell Product</h3>
              <button onClick={() => setShowSellModal(false)} style={styles.closeBtn}>✕</button>
            </div>

            <form onSubmit={handleSellSubmit} style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
              
              {/* SECTION 1: Product & Pricing */}
              <div style={styles.formSection}>
                <h4 style={styles.formSectionTitle}>Product & Pricing</h4>
                <div style={styles.formGrid}>
                  <div>
                    <label style={styles.modalLabel}>Product SKU</label>
                    <input type="text" required disabled value={sellForm.sku} style={{ ...styles.modalInput, backgroundColor: "#f1f5f9", cursor: "not-allowed" }} />
                  </div>
                  <div>
                    <label style={styles.modalLabel}>Quantity (Max: {product.Qty})</label>
                    <input type="number" required min="1" max={product.Qty} value={sellForm.qty} onChange={(e) => setSellForm({...sellForm, qty: Number(e.target.value)})} style={styles.modalInput} />
                  </div>
                  
                  <div style={{gridColumn: '1 / -1', display: 'flex', gap: '15px', alignItems: 'center'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px', background: '#f8fafc', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0'}}>
                      <input type="checkbox" checked={sellForm.useMRP} onChange={(e) => setSellForm({...sellForm, useMRP: e.target.checked, customPrice: ""})} id="mrpCheck" style={{cursor: 'pointer'}} />
                      <label htmlFor="mrpCheck" style={{fontSize: '14px', cursor: 'pointer', fontWeight: 'bold', color: '#334155'}}>Sell at System MRP (₹{product.price})</label>
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
                <button type="button" onClick={() => setShowSellModal(false)} style={styles.cancelBtn}>Cancel</button>
                <button type="submit" style={{...styles.submitBtn, background: '#16a34a'}}>Confirm Sale</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: HISTORY --- */}
      {showHistory && canEdit && (
        <div style={styles.overlay}>
          <div style={{ ...styles.modal, width: '750px', maxWidth: '95%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3 style={{ margin: 0 }}>Product Audit Trail</h3>
              <button onClick={() => setShowHistory(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '20px' }}>×</button>
            </div>

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
                    currentLogs.map((log, i) => (
                      <tr key={log._id || i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={styles.tdMini}>{new Date(log.timestamp || log.createdAt).toLocaleString()}</td>
                        <td style={{ ...styles.tdMini, fontWeight: 'bold' }}>{log.actorName || log.performedBy?.name || 'User'}</td>
                        <td style={styles.tdMini}>
                          <span style={{ ...styles.badge, background: (log.action || log.actionType || '').includes('UPDATE') ? '#e0f2fe' : '#f3f4f6', color: (log.action || log.actionType || '').includes('UPDATE') ? '#0369a1' : '#374151' }}>
                            {log.action || log.actionType || 'UPDATE'}
                          </span>
                        </td>
                        <td style={{ ...styles.tdMini, fontSize: '12px' }}>{log.details || log.reason || '-'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

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

      {/* --- IMAGE PREVIEW MODAL --- */}
      {showImageModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(255, 255, 255, 0.95)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, cursor: "zoom-out" }} onClick={() => setShowImageModal(false)}>
          <button style={{ position: 'absolute', top: '20px', right: '20px', background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '40px', height: '40px', fontSize: '20px', cursor: 'pointer', color: '#64748b' }}>✕</button>
          <img src={activeImage} alt="Preview" style={{ maxWidth: "90%", maxHeight: "90%", objectFit: "contain", borderRadius: "12px", backgroundColor: "white", boxShadow: "0 20px 50px rgba(0,0,0,0.1)" }} />
        </div>
      )}

    </div>
  );
};

const InfoBox = ({ label, val, color }) => (
  <div style={{ background: '#f8fafc', padding: '5px 8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
    <div style={{ fontSize: '10px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase' }}>{label}</div>
    <div style={{ fontSize: '13px', fontWeight: '600', color: color || '#334155' }}>{val}</div>
  </div>
);

// ✨ STYLES
const styles = {
  container: { height: "100vh", width: "100%", overflow: "hidden", backgroundColor: "#f1f5f9", display: "flex", flexDirection: "column", fontFamily: "'Inter', sans-serif" },
  centerMsg: { display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', color: '#666' },
  mainContent: { flex: 1, padding: "10px 20px", display: "flex", flexDirection: "column", gap: "10px", overflow: "hidden" },
  navBar: { display: 'flex', justifyContent: 'space-between', height: '35px', alignItems: 'center', flexShrink: 0 },
  backBtn: { background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontWeight: '600', fontSize: '20px' },

  sellBtn: { background: '#16a34a', color: '#fff', border: 'none', borderRadius: '4px', padding: '5px 12px', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' },
  headerEditBtn: { background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', padding: '5px 12px', fontSize: '12px', cursor: 'pointer' },
  headerDelBtn: { background: '#fff', color: '#dc2626', border: '1px solid #fca5a5', borderRadius: '4px', padding: '5px 12px', fontSize: '12px', cursor: 'pointer' },
  excelBtn: { background: '#107c41', color: '#fff', border: 'none', borderRadius: '4px', padding: '5px 12px', fontSize: '12px', cursor: 'pointer' },
  historyBtn: { background: '#475569', color: '#fff', border: 'none', borderRadius: '4px', padding: '5px 12px', fontSize: '12px', cursor: 'pointer' },

  productCard: { display: "flex", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", overflow: "hidden", flex: 1, border: "1px solid #e2e8f0", minHeight: 0 },
  leftCol: { width: "30%", minWidth: "250px", backgroundColor: "#f8fafc", padding: "15px", borderRight: "1px solid #e2e8f0", display: "flex", flexDirection: "column", gap: "10px", overflow: "auto" },
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
  descBox: { flex: 1.5, background: '#fdfdfd', border: '1px solid #f1f5f9', borderRadius: '6px', padding: '10px', overflowY: 'auto' },
  packagingBox: { flex: 1.5, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '10px', overflowY: 'auto' },
  packagingList: { display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' },
  packItem: { fontSize: '12px', color: '#334155', background: '#fff', padding: '6px 10px', borderRadius: '4px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between' },

  label: { fontSize: '11px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '3px' },
  descText: { fontSize: '13px', margin: 0, color: '#334155', lineHeight: '1.4' },

  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100, backdropFilter: 'blur(3px)' },
  modal: { background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: "0 10px 25px rgba(0,0,0,0.1)" },
  
  // 🔥 EXPANDED FORM STYLES (From Sales.jsx)
  extraLargeModalContent: { backgroundColor: "#fff", padding: "25px", borderRadius: "12px", width: "95%", maxWidth: "750px", maxHeight: "95vh", overflowY: "auto", boxShadow: "0 10px 25px rgba(0,0,0,0.2)" },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '15px', marginBottom: '20px' },
  closeBtn: { background: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#64748b' },
  formSection: { background: '#f8fafc', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0' },
  formSectionTitle: { margin: '0 0 15px 0', fontSize: '14px', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' },
  formGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' },
  modalLabel: { fontSize: "12px", fontWeight: "600", color: "#64748b", marginBottom: "5px", display: "block" },
  modalInput: { width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px", outline: "none", boxSizing: "border-box" },
  submitBtn: { padding: "10px 18px", background: "#2563eb", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600", color: "#fff" },

  // Compact Forms Styles
  compactInput: { padding: '6px 8px', width: '100%', borderRadius: '4px', border: '1px solid #ccc', fontSize: '12px', boxSizing: 'border-box', outline: 'none' },
  compactSelect: { padding: '5px', width: '100%', borderRadius: '4px', border: '1px solid #ccc', fontSize: '11px', boxSizing: 'border-box', background: '#fff', outline: 'none', cursor: 'pointer' },

  logsTableWrapper: { maxHeight: '300px', overflowY: 'auto', border: '1px solid #f1f5f9', marginTop: '10px' },
  thMini: { padding: "10px", textAlign: "left", fontSize: "11px", color: "#64748b", textTransform: "uppercase", background: "#f8fafc" },
  tdMini: { padding: "10px", fontSize: "13px", color: "#334155" },
  badge: { padding: "2px 6px", borderRadius: "4px", fontSize: "11px", fontWeight: "bold" },
  textarea: { padding: '8px', width: '100%', height: '50px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '13px', resize: 'none', boxSizing: 'border-box' },
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
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

































import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../api/axios";
import SkuUpdate from "../components/SkuUpdate";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = useSelector((state) => state.user.userData);
  const isAdmin = user?.userType === "admin";
  const isSuperUser = user?.userType === "superuser";
  const canEdit = isAdmin || isSuperUser;

  const fetchProduct = useCallback(async () => {
    try {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product", error);
      toast.error("Error fetching product details");
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleDelete = async () => {
    if(!canEdit) return toast.error("Permission Denied");
    
    if (window.confirm("Are you sure you want to PERMANENTLY delete this product?")) {
      try {
        await api.delete(`/products/${id}`);
        toast.success("Product Deleted Successfully");
        navigate("/dashboard");
      } catch (error) {
        console.error("Error deleting product", error);
        toast.error(error.response?.data?.message || "Failed to delete product");
      }
    }
  };

  if (loading) return <div style={styles.loading}>Loading...</div>;
  if (!product) return <div style={styles.loading}>Product Not Found</div>;

  return (
    <div style={styles.container}>
      {/* Back Button */}
      <button 
        onClick={() => navigate("/dashboard")} 
        style={styles.backBtn}
      >
        ⬅ Back
      </button>

      <div style={styles.wrapper}>
        {/* --- LEFT COLUMN: Images --- */}
        <div style={styles.imageSection}>
          <div style={styles.imgContainer}>
            <img src={product.img} alt={product.name} style={styles.mainImage} />
          </div>
          
          {product.barcodeImg && (
            <div style={styles.barcodeBox}>
              <p style={styles.barcodeTitle}>Barcode</p>
              <img src={product.barcodeImg} alt="Barcode" style={styles.barcodeImg} />
              <a href={product.barcodeImg} download target="_blank" rel="noreferrer" style={styles.downloadLink}>
                Download
              </a>
            </div>
          )}
          {/* SKU UPDATE SECTION */}
          {canEdit && (
             <div style={styles.skuSection}>
                <div style={{border: '1px solid #e0e0e0', padding: '15px', borderRadius: '8px', background: '#fafafa'}}>
                   <SkuUpdate onUpdated={fetchProduct} prefillProduct={product} />
                </div>
             </div>
          )}
        </div>

        {/* --- RIGHT COLUMN: Details --- */}
        <div style={styles.infoSection}>
          
          <div style={styles.headerGroup}>
             <h2 style={styles.title}>{product.name}</h2>
             <span style={styles.skuBadge}>SKU: {product.sku}</span>
          </div>

          <div style={styles.priceBox}>
            <span style={styles.price}>₹{product.price}</span>
            <span style={styles.gst}>(Inc. GST {product.gst}%)</span>
          </div>

          <hr style={styles.divider} />

          <div style={styles.detailsGrid}>
            <DetailItem label="Category" value={product.category} />
            <DetailItem label="Color" value={product.color} />
            <DetailItem label="Size" value={product.size} />
            
            <div style={styles.detailItem}>
              <span style={styles.label}>Status:</span>
              <span style={{ 
                fontSize: "13px",
                fontWeight: "bold", 
                color: product.Qty > 0 ? "#2e7d32" : "#d32f2f",
                backgroundColor: product.Qty > 0 ? "#e8f5e9" : "#ffebee",
                padding: "2px 8px",
                borderRadius: "4px",
                display: "inline-block"
              }}>
                {product.Qty > 0 ? `In Stock (${product.Qty})` : "Out of Stock"}
              </span>
            </div>

            <DetailItem label="Cost Price" value={canEdit ? `₹${product.costing_price}` : "--"} />
            <DetailItem label="Supplier" value={canEdit ? product.Supplier_name : "--"} />
          </div>
          
          

          <div style={styles.descSection}>
            <h4 style={styles.sectionHeading}>Description</h4>
            <p style={styles.description}>
              {product.description || "No description."}
            </p>
          </div>

          <div style={styles.actionButtons}>
            {canEdit && (
              <button onClick={handleDelete} style={styles.deleteBtn}>
                🗑 Delete Product
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <div style={styles.detailItem}>
    <span style={styles.label}>{label}:</span>
    <span style={styles.value}>{value || "-"}</span>
  </div>
);

// ✨ COMPACT STYLES
const styles = {
  container: { 
    padding: "20px", // Reduced from 40px
    maxWidth: "1000px", 
    margin: "0 auto", 
    fontFamily: "'Segoe UI', sans-serif", 
    backgroundColor: "#fff",
    minHeight: "100vh"
  },
  loading: { textAlign: "center", marginTop: "50px", fontSize: "16px", color: "#666" },
  
  backBtn: { 
    background: "none", border: "none", color: "#1976D2", cursor: "pointer", 
    fontSize: "14px", fontWeight: "600", marginBottom: "15px", padding: 0 // Space reduced
  },

  wrapper: { display: "flex", gap: "30px", flexDirection: "row", flexWrap: "wrap", alignItems: "flex-start" },

  // Left Side (Compact)
  imageSection: { flex: "1", minWidth: "250px", maxWidth: "350px" },
  imgContainer: { border: "1px solid #eee", borderRadius: "8px", overflow: "hidden", padding: "5px", textAlign: "center" },
  mainImage: { width: "100%", height: "auto", objectFit: "contain", maxHeight: "300px" }, // Height reduced
  
  barcodeBox: { marginTop: "15px", background: "#f8f9fa", padding: "10px", borderRadius: "8px", border: "1px dashed #ddd", textAlign: "center" },
  barcodeTitle: { margin: "0 0 5px 0", fontSize: "11px", color: "#777", fontWeight: "bold", textTransform: "uppercase" },
  barcodeImg: { width: "100%", maxWidth: "180px", height: "auto" },
  downloadLink: { display: "inline-block", marginTop: "5px", fontSize: "12px", color: "#1976D2", fontWeight: "600", textDecoration: "none" },

  // Right Side (Compact)
  infoSection: { flex: "1.5", minWidth: "300px" },
  
  headerGroup: { marginBottom: "10px" },
  title: { fontSize: "22px", margin: "0 0 5px 0", color: "#222", fontWeight: "700" }, // Smaller Title
  skuBadge: { fontSize: "12px", color: "#555", background: "#f0f0f0", padding: "2px 6px", borderRadius: "4px" },

  priceBox: { display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "15px" },
  price: { fontSize: "26px", fontWeight: "700", color: "#d32f2f" }, // Smaller Price
  gst: { fontSize: "13px", color: "#666" },
  
  divider: { border: "0", borderTop: "1px solid #eee", margin: "15px 0" }, // Reduced margin

  detailsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 20px" }, // Tighter grid
  detailItem: { display: "flex", flexDirection: "column" },
  label: { fontSize: "11px", color: "#777", fontWeight: "700", textTransform: "uppercase" },
  value: { fontSize: "14px", color: "#333", fontWeight: "500" },

  skuSection: { margin: "15px 0" },

  descSection: { marginTop: "15px" },
  sectionHeading: { fontSize: "15px", fontWeight: "600", color: "#444", marginBottom: "5px" },
  description: { fontSize: "13px", lineHeight: "1.5", color: "#555", whiteSpace: "pre-line" },

  actionButtons: { marginTop: "20px", paddingTop: "15px", borderTop: "1px solid #eee" },
  deleteBtn: { 
    padding: "10px", 
    backgroundColor: "#fff", 
    color: "#c62828", 
    border: "1px solid #ffcdd2", 
    borderRadius: "6px", 
    fontSize: "13px", 
    fontWeight: "600", 
    cursor: "pointer", 
    width: "100%", 
    transition: "0.2s" 
  }
};

export default ProductDetails;
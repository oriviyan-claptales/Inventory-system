
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";

// function ProductForm({ onSubmit, initialData, onCancel }) {
//   const [sizeValue, setSizeValue] = useState("");
//   const [sizeUnit, setSizeUnit] = useState("");
//   const [preview, setPreview] = useState("");
//   const [uploading, setUploading] = useState(false);
//   const [submitting, setSubmitting] = useState(false);

//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     category: "Die-cast",
//     color: "Black",
//     size: "",
//     img: "",
//     price: "",
//     costing_price: "",
//     Supplier_name: "",
//     gst: "",
//     Qty: 0,
//   });

//   const colorOptions = [
//     "Black", "White", "Red", "Blue", "Green", "Yellow", "Orange", "Brown", 
//     "Grey", "Pink", "Purple", "Silver", "Gold", "Beige", "Maroon", "Navy", 
//     "Teal", "Cream", "Violet", "Multicolor"
//   ];

//   // ... (useEffect aur baki logic same rahega) ...
//   useEffect(() => {
//     if (initialData) {
//       setFormData({ ...initialData });
//       if (["Soft Toy", "Board Game"].includes(initialData.category)) {
//         const parts = (initialData.size || "").split(" ");
//         if (parts.length === 2) {
//           setSizeValue(parts[0]);
//           setSizeUnit(parts[1]);
//         }
//       }
//       setPreview(initialData.img || "");
//     }
//   }, [initialData]);

//   useEffect(() => {
//     setFormData((prev) => ({ ...prev, size: "" }));
//     setSizeValue("");
//     setSizeUnit("");
//   }, [formData.category]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // 👇 1. STRICT VALIDATION: Name & Supplier Name
//     if (name === "name" || name === "Supplier_name") {
//       if (value === "") {
//         setFormData({ ...formData, [name]: value });
//         return;
//       }
//       if (/\d/.test(value)) {
//         toast.error("Numbers are not allowed!");
//         return;
//       }
//       const regex = /^[a-zA-Z\s\-\.\&\(\)]*$/;
//       if (!regex.test(value)) {
//          return; 
//       }
//     }

//     setFormData({ 
//       ...formData, 
//       [name]: name === "Qty" ? (value === "" ? 0 : Number(value)) : value 
//     });
//   };

//   const handleScaleChange = (e) => {
//     const val = e.target.value;
//     if (!/^[0-9]*$/.test(val)) {
//         return;
//     }
//     setFormData({ ...formData, size: val ? `1:${val}` : "" });
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
//       const res = await axios.post("https://inventory-system-uvj3.onrender.com/api/products/upload", imgData, {
//         headers: { "Content-Type": "multipart/form-data" },
//         withCredentials: true,
//       });
//       setFormData((p) => ({ ...p, img: res.data.url }));
//     } catch (err) {
//       toast.error("Image upload failed");
//     }
//     setUploading(false);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.img) return toast.error("Please upload an image.");

//     let finalSize = formData.size;
//     if (["Soft Toy", "Board Game"].includes(formData.category)) {
//       if (!sizeValue || !sizeUnit) return toast.error("Enter size value AND unit.");
//       finalSize = `${sizeValue} ${sizeUnit}`;
//     }

//     setSubmitting(true);
//     await onSubmit({
//       ...formData,
//       size: finalSize,
//       price: Number(formData.price),
//       costing_price: Number(formData.costing_price),
//       gst: Number(formData.gst),
//       Qty: Number(formData.Qty),
//     });
//     setSubmitting(false);
//   };

//   // 👇 🔥 NEW FUNCTION: 'e', 'E', '+', '-' ko block karne ke liye
//   const blockInvalidChar = (e) => {
//     if (["e", "E", "+", "-"].includes(e.key)) {
//       e.preventDefault();
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h3 style={styles.sectionTitle}>Basic Information</h3>
//       <div style={styles.gridContainer}>
//         {/* ... Name, Description, Category, Color ... Same as before */}
//         <div style={styles.gridItemFull}>
//           <label style={styles.label}>Product Name<span style={styles.requiredStar}>*</span></label>
//           <input name="name" value={formData.name} onChange={handleChange} style={styles.input} placeholder="Name" required />
//         </div>

//         <div style={styles.gridItemFull}>
//           <label style={styles.label}>Description</label>
//           <textarea name="description" value={formData.description} onChange={handleChange} style={{ ...styles.input, height: "80px" }} placeholder="Product details..." />
//         </div>

//         <div style={styles.gridItem}>
//           <label style={styles.label}>Category <span style={styles.requiredStar}>*</span></label>
//           <select name="category" value={formData.category} onChange={handleChange} style={styles.input}>
//             <option value="Die-cast">Die-cast</option>
//             <option value="Remote Control">Remote Control</option>
//             <option value="Soft Toy">Soft Toy</option>
//             <option value="Board Game">Board Game</option>
//             <option value="Scooter">Scooter</option>
//           </select>
//         </div>

//         <div style={styles.gridItem}>
//           <label style={styles.label}>Color <span style={styles.requiredStar}>*</span></label>
//           <select name="color" value={formData.color} onChange={handleChange} style={styles.input}>
//             {colorOptions.map((col) => <option key={col} value={col}>{col}</option>)}
//           </select>
//         </div>

//         {/* ... Size Logic Same ... */}
//         <div style={styles.gridItem}>
//           <label style={styles.label}>Size / Scale <span style={styles.requiredStar}>*</span></label>
//           {(formData.category === "Die-cast" || formData.category === "Remote Control") ? (
//             <div style={styles.inputGroupWrapper}>
//               <span style={styles.prefix}>1 :</span>
//               <input
//                 type="text" 
//                 placeholder="Ex: 24, 32, 64"
//                 value={formData.size.includes(":") ? formData.size.split(":")[1] : ""}
//                 onChange={handleScaleChange}
//                 style={styles.inputNoBorder}
//                 required
//               />
//             </div>
//           ) : formData.category === "Scooter" ? (
//             <select name="size" value={formData.size} onChange={handleChange} style={styles.input}>
//               <option value="">Select Size</option>
//               <option value="S">S</option><option value="M">M</option>
//               <option value="L">L</option><option value="XL">XL</option>
//             </select>
//           ) : (
//             <div style={{ display: "flex", gap: "10px" }}>
//               <input 
//                 type="text" 
//                 placeholder="Value" 
//                 value={sizeValue} 
//                 onChange={(e) => {
//                     if (/^[0-9.]*$/.test(e.target.value)) setSizeValue(e.target.value)
//                 }} 
//                 style={{ ...styles.input, flex: 2 }} 
//               />
//               <select value={sizeUnit} onChange={(e) => setSizeUnit(e.target.value)} style={{ ...styles.input, flex: 1 }}>
//                 <option value="">Unit</option><option value="cm">cm</option><option value="inch">inch</option>
//               </select>
//             </div>
//           )}
//         </div>
//       </div>

//       <h3 style={styles.sectionTitle}>Product Image <span style={styles.requiredStar}>*</span></h3>
//       <div style={styles.imageUploadBox}>
//         <input type="file" accept="image/*" onChange={handleImageSelect} style={styles.fileInput} disabled={uploading} />
//         {preview ? (
//           <div style={{ textAlign: "center" }}>
//             <img src={preview} alt="Preview" style={styles.previewImage} />
//             <p style={{ fontSize: "12px", color: "#2563eb", marginTop: "5px" }}>{uploading ? "Uploading..." : "Click to change"}</p>
//           </div>
//         ) : <p style={{ padding: "20px", color: "#6b7280" }}>📂 Click to upload image</p>}
//       </div>

//       <hr style={styles.divider} />
//       <h3 style={styles.sectionTitle}>Pricing & Inventory <span style={styles.requiredStar}>*</span></h3>
//       <div style={styles.gridContainer}>
        
//         <div style={styles.gridItem}>
//           <label style={styles.label}>Selling Price (₹) <span style={styles.requiredStar}>*</span></label>
//           {/* 👇 Added onKeyDown here */}
//           <input 
//             name="price" 
//             type="number" 
//             onKeyDown={blockInvalidChar} 
//             value={formData.price} 
//             onChange={handleChange} 
//             required 
//             style={styles.input} 
//           />
//         </div>

//         <div style={styles.gridItem}>
//           <label style={styles.label}>Cost Price (₹)<span style={styles.requiredStar}>*</span></label>
//           {/* 👇 Added onKeyDown here */}
//           <input 
//             name="costing_price" 
//             type="number" 
//             onKeyDown={blockInvalidChar} 
//             value={formData.costing_price} 
//             onChange={handleChange} 
//             required 
//             style={styles.input} 
//           />
//         </div>

//         <div style={styles.gridItem}>
//           <label style={styles.label}>GST (%) <span style={styles.requiredStar}>*</span></label>
//           <select name="gst" value={formData.gst} onChange={handleChange} style={styles.input} required>
//             <option value="">Select GST</option>
//             <option value="0">0%</option><option value="5">5%</option>
//             <option value="12">12%</option><option value="18">18%</option><option value="28">28%</option>
//           </select>
//         </div>

//         <div style={styles.gridItem}>
//           <label style={styles.label}>Quantity <span style={styles.requiredStar}>*</span></label>
//           {/* 👇 Added onKeyDown here also (Optional but good practice) */}
//           <input
//             name="Qty"
//             type="number"
//             min="0"
//             onKeyDown={blockInvalidChar}
//             value={formData.Qty === 0 ? "" : formData.Qty}
//             onChange={handleChange}
//             placeholder="Ex- 10"
//             style={styles.input}
//             required
//           />
//         </div>

//         <div style={styles.gridItemFull}>
//           <label style={styles.label}>Supplier Name<span style={styles.requiredStar}>*</span></label>
//           <input name="Supplier_name" value={formData.Supplier_name} onChange={handleChange} style={styles.input} required placeholder="Supplier Name (Alphabets only)" />
//         </div>
//       </div>

//       <hr style={styles.divider} />
      
//       <div style={styles.actionButtons}>
//         <button type="submit" disabled={submitting} style={styles.submitBtn}>
//           {submitting ? "Processing..." : initialData ? "Update Product" : "Save Product"}
//         </button>
//         {onCancel && <button type="button" onClick={onCancel} style={styles.cancelBtn}>Cancel</button>}
//       </div>
//     </form>
//   );
// }

// const styles = {
//   // ... (Styles same rahenge)
//   sectionTitle: { fontSize: "18px", fontWeight: "600", color: "#374151", marginBottom: "15px" },
//   divider: { border: "0", borderTop: "1px solid #e5e7eb", margin: "25px 0" },
//   gridContainer: { display: "flex", flexWrap: "wrap", gap: "20px" },
//   requiredStar: {
//     color: "#ef4444", // Red color
//     marginLeft: "4px",
//   },
//   gridItem: { flex: "1 1 45%", minWidth: "250px" },
//   gridItemFull: { flex: "1 1 100%" },
//   label: { display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "6px" },
//   input: { width: "100%", padding: "10px 12px", fontSize: "15px", borderRadius: "6px", border: "1px solid #d1d5db", outline: "none", boxSizing: "border-box" },
//   inputGroupWrapper: { display: "flex", alignItems: "center", backgroundColor: "#fff", border: "1px solid #d1d5db", borderRadius: "6px", overflow: "hidden" },
//   prefix: { padding: "10px 12px", backgroundColor: "#f3f4f6", color: "#6b7280", fontWeight: "bold", borderRight: "1px solid #d1d5db", fontSize: "15px" },
//   inputNoBorder: { flex: 1, padding: "10px 12px", border: "none", outline: "none", fontSize: "15px", width: "100%" },
//   imageUploadBox: { border: "2px dashed #d1d5db", borderRadius: "8px", padding: "20px", textAlign: "center", position: "relative", backgroundColor: "#f9fafb" },
//   fileInput: { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer" },
//   previewImage: { maxWidth: "150px", maxHeight: "150px", borderRadius: "8px" },
//   actionButtons: { display: "flex", gap: "15px", marginTop: "30px", justifyContent: "flex-end" },
//   submitBtn: { padding: "12px 24px", backgroundColor: "#1976D2", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600" },
//   cancelBtn: { padding: "12px 24px", backgroundColor: "#fff", color: "#d32f2f", border: "1px solid #d32f2f", borderRadius: "6px", cursor: "pointer", fontWeight: "600" },
// };

// export default ProductForm;


























// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import toast from "react-hot-toast"; // Toast import zaroori hai

// function ProductForm({ onSubmit, initialData, onCancel }) {
//   const [sizeValue, setSizeValue] = useState("");
//   const [sizeUnit, setSizeUnit] = useState("");
//   const [preview, setPreview] = useState("");
//   const [uploading, setUploading] = useState(false);
//   const [submitting, setSubmitting] = useState(false);

//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     category: "Die-cast",
//     color: "Black",
//     size: "",
//     img: "",
//     price: "",
//     costing_price: "",
//     Supplier_name: "",
//     gst: "",
//     Qty: 0,
//   });

//   const colorOptions = [
//     "Black", "White", "Red", "Blue", "Green", "Yellow", "Orange", "Brown", 
//     "Grey", "Pink", "Purple", "Silver", "Gold", "Beige", "Maroon", "Navy", 
//     "Teal", "Cream", "Violet", "Multicolor"
//   ];

//   useEffect(() => {
//     if (initialData) {
//       setFormData({ ...initialData });
//       if (["Soft Toy", "Board Game"].includes(initialData.category)) {
//         const parts = (initialData.size || "").split(" ");
//         if (parts.length === 2) {
//           setSizeValue(parts[0]);
//           setSizeUnit(parts[1]);
//         }
//       }
//       setPreview(initialData.img || "");
//     }
//   }, [initialData]);

//   useEffect(() => {
//     setFormData((prev) => ({ ...prev, size: "" }));
//     setSizeValue("");
//     setSizeUnit("");
//   }, [formData.category]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "name" || name === "Supplier_name") {
//       if (value === "") {
//         setFormData({ ...formData, [name]: value });
//         return;
//       }
//       if (/\d/.test(value)) {
//         toast.error("Numbers are not allowed!");
//         return;
//       }
//       const regex = /^[a-zA-Z\s\-\.\&\(\)]*$/;
//       if (!regex.test(value)) {
//          return; 
//       }
//     }
//     setFormData({ 
//       ...formData, 
//       [name]: name === "Qty" ? (value === "" ? 0 : Number(value)) : value 
//     });
//   };

//   const handleScaleChange = (e) => {
//     const val = e.target.value;
//     if (!/^[0-9]*$/.test(val)) {
//         return;
//     }
//     setFormData({ ...formData, size: val ? `1:${val}` : "" });
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
//       setFormData((p) => ({ ...p, img: res.data.url }));
//     } catch (err) {
//       toast.error("Image upload failed");
//     }
//     setUploading(false);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.img) return toast.error("Please upload an image.");

//     let finalSize = formData.size;
//     if (["Soft Toy", "Board Game"].includes(formData.category)) {
//       if (!sizeValue || !sizeUnit) return toast.error("Enter size value AND unit.");
//       finalSize = `${sizeValue} ${sizeUnit}`;
//     }

//     setSubmitting(true);
//     await onSubmit({
//       ...formData,
//       size: finalSize,
//       price: Number(formData.price),
//       costing_price: Number(formData.costing_price),
//       gst: Number(formData.gst),
//       Qty: Number(formData.Qty),
//     });
//     setSubmitting(false);
//   };

//   const blockInvalidChar = (e) => {
//     if (["e", "E", "+", "-"].includes(e.key)) {
//       e.preventDefault();
//     }
//   };


//   const handleCancel = () => {
//     // Check agar form mein kuch data hai
//     const hasData = 
//       formData.name !== "" || 
//       formData.description !== "" || 
//       formData.price !== "" || 
//       formData.costing_price !== "" || 
//       formData.Supplier_name !== "" || 
//       formData.size !== "" ||
//       formData.img !== "";

//     if (hasData) {
//       // 🔥 'id' property use ki hai taaki duplicate toast na aaye
//       toast((t) => (
//         <div style={{ 
//             backgroundColor: "#ffffff",  // Pura White
//             color: "#000000",            // Pura Black text
//             padding: "16px", 
//             borderRadius: "8px", 
//             // Halka sa shadow taaki white background par alag dikhe
//             boxShadow: "0 2px 10px rgba(0,0,0,0.1)", 
//             border: "1px solid #e0e0e0", 
//             display: "flex", 
//             flexDirection: "column", 
//             gap: "12px",
//             minWidth: "260px"
//         }}>
//           <div style={{ fontWeight: "600", fontSize: "15px" }}>
//             ⚠️ Unsaved changes!
//             <p style={{ fontWeight: "400", fontSize: "13px", color: "#333", marginTop: "4px" }}>
//               Are you sure you want to discard changes?
//             </p>
//           </div>

//           <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
//             {/* Continue Button */}
//             <button 
//               onClick={() => toast.dismiss(t.id)}
//               style={{ 
//                 padding: "6px 12px", 
//                 border: "1px solid #ccc", 
//                 background: "#f9f9f9", 
//                 color: "#000",
//                 borderRadius: "4px", 
//                 cursor: "pointer",
//                 fontSize: "13px"
//               }}
//             >
//               Continue
//             </button>

//             {/* Discard Button */}
//             <button 
//               onClick={() => {
//                 toast.dismiss(t.id);
//                 onCancel && onCancel();
//               }}
//               style={{ 
//                 padding: "6px 12px", 
//                 background: "#d32f2f", // Red for discard
//                 color: "white", 
//                 border: "none", 
//                 borderRadius: "4px", 
//                 cursor: "pointer",
//                 fontSize: "13px",
//                 fontWeight: "500"
//               }}
//             >
//               Discard
//             </button>
//           </div>
//         </div>
//       ), {
//         id: "cancel-toast", // 🔥 YEH IMPORTNT HAI: Isse duplicate popup nahi aayega
//         duration: Infinity, 
//         position: "top-center",
//         // Default toast style ko transparent kar diya taaki sirf humara div dikhe
//         style: { background: "transparent", boxShadow: "none" } 
//       });
//     } else {
//       onCancel && onCancel();
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h3 style={styles.sectionTitle}>Basic Information</h3>
//       <div style={styles.gridContainer}>
//         <div style={styles.gridItemFull}>
//           <label style={styles.label}>Product Name<span style={styles.requiredStar}>*</span></label>
//           <input name="name" value={formData.name} onChange={handleChange} style={styles.input} placeholder="Name" required />
//         </div>

//         <div style={styles.gridItemFull}>
//           <label style={styles.label}>Description</label>
//           <textarea name="description" value={formData.description} onChange={handleChange} style={{ ...styles.input, height: "80px" }} placeholder="Product details..." />
//         </div>

//         <div style={styles.gridItem}>
//           <label style={styles.label}>Category <span style={styles.requiredStar}>*</span></label>
//           <select name="category" value={formData.category} onChange={handleChange} style={styles.input}>
//             <option value="Die-cast">Die-cast</option>
//             <option value="Remote Control">Remote Control</option>
//             <option value="Soft Toy">Soft Toy</option>
//             <option value="Board Game">Board Game</option>
//             <option value="Scooter">Scooter</option>
//           </select>
//         </div>

//         <div style={styles.gridItem}>
//           <label style={styles.label}>Color <span style={styles.requiredStar}>*</span></label>
//           <select name="color" value={formData.color} onChange={handleChange} style={styles.input}>
//             {colorOptions.map((col) => <option key={col} value={col}>{col}</option>)}
//           </select>
//         </div>

//         <div style={styles.gridItem}>
//           <label style={styles.label}>Size / Scale <span style={styles.requiredStar}>*</span></label>
//           {(formData.category === "Die-cast" || formData.category === "Remote Control") ? (
//             <div style={styles.inputGroupWrapper}>
//               <span style={styles.prefix}>1 :</span>
//               <input
//                 type="text" 
//                 placeholder="Ex: 24, 32, 64"
//                 value={formData.size.includes(":") ? formData.size.split(":")[1] : ""}
//                 onChange={handleScaleChange}
//                 style={styles.inputNoBorder}
//                 required
//               />
//             </div>
//           ) : formData.category === "Scooter" ? (
//             <select name="size" value={formData.size} onChange={handleChange} style={styles.input}>
//               <option value="">Select Size</option>
//               <option value="S">S</option><option value="M">M</option>
//               <option value="L">L</option><option value="XL">XL</option>
//             </select>
//           ) : (
//             <div style={{ display: "flex", gap: "10px" }}>
//               <input 
//                 type="text" 
//                 placeholder="Value" 
//                 value={sizeValue} 
//                 onChange={(e) => {
//                     if (/^[0-9.]*$/.test(e.target.value)) setSizeValue(e.target.value)
//                 }} 
//                 style={{ ...styles.input, flex: 2 }} 
//               />
//               <select value={sizeUnit} onChange={(e) => setSizeUnit(e.target.value)} style={{ ...styles.input, flex: 1 }}>
//                 <option value="">Unit</option><option value="cm">cm</option><option value="inch">inch</option>
//               </select>
//             </div>
//           )}
//         </div>
//       </div>

//       <h3 style={styles.sectionTitle}>Product Image <span style={styles.requiredStar}>*</span></h3>
//       <div style={styles.imageUploadBox}>
//         <input type="file" accept="image/*" onChange={handleImageSelect} style={styles.fileInput} disabled={uploading} />
//         {preview ? (
//           <div style={{ textAlign: "center" }}>
//             <img src={preview} alt="Preview" style={styles.previewImage} />
//             <p style={{ fontSize: "12px", color: "#2563eb", marginTop: "5px" }}>{uploading ? "Uploading..." : "Click to change"}</p>
//           </div>
//         ) : <p style={{ padding: "20px", color: "#6b7280" }}>📂 Click to upload image</p>}
//       </div>

//       <hr style={styles.divider} />
//       <h3 style={styles.sectionTitle}>Pricing & Inventory <span style={styles.requiredStar}>*</span></h3>
//       <div style={styles.gridContainer}>
        
//         <div style={styles.gridItem}>
//           <label style={styles.label}>Selling Price (₹) <span style={styles.requiredStar}>*</span></label>
//           <input 
//             name="price" 
//             type="number" 
//             onKeyDown={blockInvalidChar} 
//             value={formData.price} 
//             onChange={handleChange} 
//             required 
//             style={styles.input} 
//           />
//         </div>

//         <div style={styles.gridItem}>
//           <label style={styles.label}>Cost Price (₹)<span style={styles.requiredStar}>*</span></label>
//           <input 
//             name="costing_price" 
//             type="number" 
//             onKeyDown={blockInvalidChar} 
//             value={formData.costing_price} 
//             onChange={handleChange} 
//             required 
//             style={styles.input} 
//           />
//         </div>

//         <div style={styles.gridItem}>
//           <label style={styles.label}>GST (%) <span style={styles.requiredStar}>*</span></label>
//           <select name="gst" value={formData.gst} onChange={handleChange} style={styles.input} required>
//             <option value="">Select GST</option>
//             <option value="0">0%</option><option value="5">5%</option>
//             <option value="12">12%</option><option value="18">18%</option><option value="28">28%</option>
//           </select>
//         </div>

//         <div style={styles.gridItem}>
//           <label style={styles.label}>Quantity <span style={styles.requiredStar}>*</span></label>
//           <input
//             name="Qty"
//             type="number"
//             min="0"
//             onKeyDown={blockInvalidChar}
//             value={formData.Qty === 0 ? "" : formData.Qty}
//             onChange={handleChange}
//             placeholder="Ex- 10"
//             style={styles.input}
//             required
//           />
//         </div>

//         <div style={styles.gridItemFull}>
//           <label style={styles.label}>Supplier Name<span style={styles.requiredStar}>*</span></label>
//           <input name="Supplier_name" value={formData.Supplier_name} onChange={handleChange} style={styles.input} required placeholder="Supplier Name (Alphabets only)" />
//         </div>
//       </div>

//       <hr style={styles.divider} />
      
//       <div style={styles.actionButtons}>
//         <button type="submit" disabled={submitting} style={styles.submitBtn}>
//           {submitting ? "Processing..." : initialData ? "Update Product" : "Save Product"}
//         </button>
//         {/* 👇 🔥 BUTTON: Ab ye naya function call karega */}
//         {onCancel && <button type="button" onClick={handleCancel} style={styles.cancelBtn}>Cancel</button>}
//       </div>
//     </form>
//   );
// }

// const styles = {
//   sectionTitle: { fontSize: "18px", fontWeight: "600", color: "#374151", marginBottom: "15px" },
//   divider: { border: "0", borderTop: "1px solid #e5e7eb", margin: "25px 0" },
//   gridContainer: { display: "flex", flexWrap: "wrap", gap: "20px" },
//   requiredStar: {
//     color: "#ef4444",
//     marginLeft: "4px",
//   },
//   gridItem: { flex: "1 1 45%", minWidth: "250px" },
//   gridItemFull: { flex: "1 1 100%" },
//   label: { display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "6px" },
//   input: { width: "100%", padding: "10px 12px", fontSize: "15px", borderRadius: "6px", border: "1px solid #d1d5db", outline: "none", boxSizing: "border-box" },
//   inputGroupWrapper: { display: "flex", alignItems: "center", backgroundColor: "#fff", border: "1px solid #d1d5db", borderRadius: "6px", overflow: "hidden" },
//   prefix: { padding: "10px 12px", backgroundColor: "#f3f4f6", color: "#6b7280", fontWeight: "bold", borderRight: "1px solid #d1d5db", fontSize: "15px" },
//   inputNoBorder: { flex: 1, padding: "10px 12px", border: "none", outline: "none", fontSize: "15px", width: "100%" },
//   imageUploadBox: { border: "2px dashed #d1d5db", borderRadius: "8px", padding: "20px", textAlign: "center", position: "relative", backgroundColor: "#f9fafb" },
//   fileInput: { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer" },
//   previewImage: { maxWidth: "150px", maxHeight: "150px", borderRadius: "8px" },
//   actionButtons: { display: "flex", gap: "15px", marginTop: "30px", justifyContent: "flex-end" },
//   submitBtn: { padding: "12px 24px", backgroundColor: "#1976D2", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600" },
//   cancelBtn: { padding: "12px 24px", backgroundColor: "#fff", color: "#d32f2f", border: "1px solid #d32f2f", borderRadius: "6px", cursor: "pointer", fontWeight: "600" },
// };

// export default ProductForm;













































import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast"; // Toast import zaroori hai

function ProductForm({ onSubmit, initialData, onCancel }) {
  const [sizeValue, setSizeValue] = useState("");
  const [sizeUnit, setSizeUnit] = useState("");
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Die-cast",
    color: "Black",
    size: "",
    img: "",
    price: "",
    costing_price: "",
    Supplier_name: "",
    gst: "",
    Qty: 0,
  });

  const colorOptions = [
    "Black", "White", "Red", "Blue", "Green", "Yellow", "Orange", "Brown", 
    "Grey", "Pink", "Purple", "Silver", "Gold", "Beige", "Maroon", "Navy", 
    "Teal", "Cream", "Violet", "Multicolor"
  ];

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData });
      if (["Soft Toy", "Board Game"].includes(initialData.category)) {
        const parts = (initialData.size || "").split(" ");
        if (parts.length === 2) {
          setSizeValue(parts[0]);
          setSizeUnit(parts[1]);
        }
      }
      setPreview(initialData.img || "");
    }
  }, [initialData]);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, size: "" }));
    setSizeValue("");
    setSizeUnit("");
  }, [formData.category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "Supplier_name") {
      if (value === "") {
        setFormData({ ...formData, [name]: value });
        return;
      }
      if (/\d/.test(value)) {
        toast.error("Numbers are not allowed!");
        return;
      }
      const regex = /^[a-zA-Z\s\-\.\&\(\)]*$/;
      if (!regex.test(value)) {
         return; 
      }
    }
    setFormData({ 
      ...formData, 
      [name]: name === "Qty" ? (value === "" ? 0 : Number(value)) : value 
    });
  };

  const handleScaleChange = (e) => {
    const val = e.target.value;
    if (!/^[0-9]*$/.test(val)) {
        return;
    }
    setFormData({ ...formData, size: val ? `1:${val}` : "" });
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
      const res = await axios.post("https://inventory-system-uvj3.onrender.com/api/products/upload", imgData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      setFormData((p) => ({ ...p, img: res.data.url }));
    } catch (err) {
      toast.error("Image upload failed");
    }
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.img) return toast.error("Please upload an image.");

    let finalSize = formData.size;
    if (["Soft Toy", "Board Game"].includes(formData.category)) {
      if (!sizeValue || !sizeUnit) return toast.error("Enter size value AND unit.");
      finalSize = `${sizeValue} ${sizeUnit}`;
    }

    setSubmitting(true);
    await onSubmit({
      ...formData,
      size: finalSize,
      price: Number(formData.price),
      costing_price: Number(formData.costing_price),
      gst: Number(formData.gst),
      Qty: Number(formData.Qty),
    });
    setSubmitting(false);
  };

  const blockInvalidChar = (e) => {
    if (["e", "E", "+", "-"].includes(e.key)) {
      e.preventDefault();
    }
  };


  const handleCancel = () => {
    // Check agar form mein kuch data hai
    const hasData = 
      formData.name !== "" || 
      formData.description !== "" || 
      formData.price !== "" || 
      formData.costing_price !== "" || 
      formData.Supplier_name !== "" || 
      formData.size !== "" ||
      formData.img !== "";

    if (hasData) {
      // 🔥 'id' property use ki hai taaki duplicate toast na aaye
      toast((t) => (
        <div style={{ 
            backgroundColor: "#ffffff",  // Pura White
            color: "#000000",            // Pura Black text
            padding: "16px", 
            borderRadius: "8px", 
            // Halka sa shadow taaki white background par alag dikhe
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)", 
            border: "1px solid #e0e0e0", 
            display: "flex", 
            flexDirection: "column", 
            gap: "12px",
            minWidth: "260px"
        }}>
          <div style={{ fontWeight: "600", fontSize: "15px" }}>
            ⚠️ Unsaved changes!
            <p style={{ fontWeight: "400", fontSize: "13px", color: "#333", marginTop: "4px" }}>
              Are you sure you want to discard changes?
            </p>
          </div>

          <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
            {/* Continue Button */}
            <button 
              onClick={() => toast.dismiss(t.id)}
              style={{ 
                padding: "6px 12px", 
                border: "1px solid #ccc", 
                background: "#f9f9f9", 
                color: "#000",
                borderRadius: "4px", 
                cursor: "pointer",
                fontSize: "13px"
              }}
            >
              Continue
            </button>

            {/* Discard Button */}
            <button 
              onClick={() => {
                toast.dismiss(t.id);
                onCancel && onCancel();
              }}
              style={{ 
                padding: "6px 12px", 
                background: "#d32f2f", // Red for discard
                color: "white", 
                border: "none", 
                borderRadius: "4px", 
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: "500"
              }}
            >
              Discard
            </button>
          </div>
        </div>
      ), {
        id: "cancel-toast", // 🔥 YEH IMPORTNT HAI: Isse duplicate popup nahi aayega
        duration: Infinity, 
        position: "top-center",
        // Default toast style ko transparent kar diya taaki sirf humara div dikhe
        style: { background: "transparent", boxShadow: "none" } 
      });
    } else {
      onCancel && onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 style={styles.sectionTitle}>Basic Information</h3>
      <div style={styles.gridContainer}>
        <div style={styles.gridItemFull}>
          <label style={styles.label}>Product Name<span style={styles.requiredStar}>*</span></label>
          <input name="name" value={formData.name} onChange={handleChange} style={styles.input} placeholder="Name" required />
        </div>

        <div style={styles.gridItemFull}>
          <label style={styles.label}>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} style={{ ...styles.input, height: "80px" }} placeholder="Product details..." />
        </div>

        <div style={styles.gridItem}>
          <label style={styles.label}>Category <span style={styles.requiredStar}>*</span></label>
          <select name="category" value={formData.category} onChange={handleChange} style={styles.input}>
            <option value="Die-cast">Die-cast</option>
            <option value="Remote Control">Remote Control</option>
            <option value="Soft Toy">Soft Toy</option>
            <option value="Board Game">Board Game</option>
            <option value="Scooter">Scooter</option>
          </select>
        </div>

        <div style={styles.gridItem}>
          <label style={styles.label}>Color <span style={styles.requiredStar}>*</span></label>
          <select name="color" value={formData.color} onChange={handleChange} style={styles.input}>
            {colorOptions.map((col) => <option key={col} value={col}>{col}</option>)}
          </select>
        </div>

        <div style={styles.gridItem}>
          <label style={styles.label}>Size / Scale <span style={styles.requiredStar}>*</span></label>
          {(formData.category === "Die-cast" || formData.category === "Remote Control") ? (
            <div style={styles.inputGroupWrapper}>
              <span style={styles.prefix}>1 :</span>
              <input
                type="text" 
                placeholder="Ex: 24, 32, 64"
                value={formData.size.includes(":") ? formData.size.split(":")[1] : ""}
                onChange={handleScaleChange}
                style={styles.inputNoBorder}
                required
              />
            </div>
          ) : formData.category === "Scooter" ? (
            <select name="size" value={formData.size} onChange={handleChange} style={styles.input}>
              <option value="">Select Size</option>
              <option value="S">S</option><option value="M">M</option>
              <option value="L">L</option><option value="XL">XL</option>
            </select>
          ) : (
            <div style={{ display: "flex", gap: "10px" }}>
              <input 
                type="text" 
                placeholder="Value" 
                value={sizeValue} 
                onChange={(e) => {
                    if (/^[0-9.]*$/.test(e.target.value)) setSizeValue(e.target.value)
                }} 
                style={{ ...styles.input, flex: 2 }} 
              />
              <select value={sizeUnit} onChange={(e) => setSizeUnit(e.target.value)} style={{ ...styles.input, flex: 1 }}>
                <option value="">Unit</option><option value="cm">cm</option><option value="inch">inch</option>
              </select>
            </div>
          )}
        </div>
      </div>

      <h3 style={styles.sectionTitle}>Product Image <span style={styles.requiredStar}>*</span></h3>
      <div style={styles.imageUploadBox}>
        <input type="file" accept="image/*" onChange={handleImageSelect} style={styles.fileInput} disabled={uploading} />
        {preview ? (
          <div style={{ textAlign: "center" }}>
            <img src={preview} alt="Preview" style={styles.previewImage} />
            <p style={{ fontSize: "12px", color: "#2563eb", marginTop: "5px" }}>{uploading ? "Uploading..." : "Click to change"}</p>
          </div>
        ) : <p style={{ padding: "20px", color: "#6b7280" }}>📂 Click to upload image</p>}
      </div>

      <hr style={styles.divider} />
      <h3 style={styles.sectionTitle}>Pricing & Inventory <span style={styles.requiredStar}>*</span></h3>
      <div style={styles.gridContainer}>
        
        <div style={styles.gridItem}>
          <label style={styles.label}>Selling Price (₹) <span style={styles.requiredStar}>*</span></label>
          <input 
            name="price" 
            type="number" 
            onKeyDown={blockInvalidChar} 
            value={formData.price} 
            onChange={handleChange} 
            required 
            style={styles.input} 
          />
        </div>

        <div style={styles.gridItem}>
          <label style={styles.label}>Cost Price (₹)<span style={styles.requiredStar}>*</span></label>
          <input 
            name="costing_price" 
            type="number" 
            onKeyDown={blockInvalidChar} 
            value={formData.costing_price} 
            onChange={handleChange} 
            required 
            style={styles.input} 
          />
        </div>

        <div style={styles.gridItem}>
          <label style={styles.label}>GST (%) <span style={styles.requiredStar}>*</span></label>
          <select name="gst" value={formData.gst} onChange={handleChange} style={styles.input} required>
            <option value="">Select GST</option>
            <option value="0">0%</option><option value="5">5%</option>
            <option value="12">12%</option><option value="18">18%</option><option value="28">28%</option>
          </select>
        </div>

        <div style={styles.gridItem}>
          <label style={styles.label}>Quantity <span style={styles.requiredStar}>*</span></label>
          <input
            name="Qty"
            type="number"
            min="0"
            onKeyDown={blockInvalidChar}
            value={formData.Qty === 0 ? "" : formData.Qty}
            onChange={handleChange}
            placeholder="Ex- 10"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.gridItemFull}>
          <label style={styles.label}>Supplier Name<span style={styles.requiredStar}>*</span></label>
          <input name="Supplier_name" value={formData.Supplier_name} onChange={handleChange} style={styles.input} required placeholder="Supplier Name (Alphabets only)" />
        </div>
      </div>

      <hr style={styles.divider} />
      
      <div style={styles.actionButtons}>
        <button type="submit" disabled={submitting} style={styles.submitBtn}>
          {submitting ? "Processing..." : initialData ? "Update Product" : "Save Product"}
        </button>
        {/* 👇 🔥 BUTTON: Ab ye naya function call karega */}
        {onCancel && <button type="button" onClick={handleCancel} style={styles.cancelBtn}>Cancel</button>}
      </div>
    </form>
  );
}

const styles = {
  sectionTitle: { fontSize: "18px", fontWeight: "600", color: "#374151", marginBottom: "15px" },
  divider: { border: "0", borderTop: "1px solid #e5e7eb", margin: "25px 0" },
  gridContainer: { display: "flex", flexWrap: "wrap", gap: "20px" },
  requiredStar: {
    color: "#ef4444",
    marginLeft: "4px",
  },
  gridItem: { flex: "1 1 45%", minWidth: "250px" },
  gridItemFull: { flex: "1 1 100%" },
  label: { display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "6px" },
  input: { width: "100%", padding: "10px 12px", fontSize: "15px", borderRadius: "6px", border: "1px solid #d1d5db", outline: "none", boxSizing: "border-box" },
  inputGroupWrapper: { display: "flex", alignItems: "center", backgroundColor: "#fff", border: "1px solid #d1d5db", borderRadius: "6px", overflow: "hidden" },
  prefix: { padding: "10px 12px", backgroundColor: "#f3f4f6", color: "#6b7280", fontWeight: "bold", borderRight: "1px solid #d1d5db", fontSize: "15px" },
  inputNoBorder: { flex: 1, padding: "10px 12px", border: "none", outline: "none", fontSize: "15px", width: "100%" },
  imageUploadBox: { border: "2px dashed #d1d5db", borderRadius: "8px", padding: "20px", textAlign: "center", position: "relative", backgroundColor: "#f9fafb" },
  fileInput: { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer" },
  previewImage: { maxWidth: "150px", maxHeight: "150px", borderRadius: "8px" },
  actionButtons: { display: "flex", gap: "15px", marginTop: "30px", justifyContent: "flex-end" },
  submitBtn: { padding: "12px 24px", backgroundColor: "#1976D2", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600" },
  cancelBtn: { padding: "12px 24px", backgroundColor: "#fff", color: "#d32f2f", border: "1px solid #d32f2f", borderRadius: "6px", cursor: "pointer", fontWeight: "600" },
};

export default ProductForm;

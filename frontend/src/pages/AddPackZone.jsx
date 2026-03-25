// // // // import React, { useState } from "react";
// // // // import api from "../api/axios";
// // // // import { useNavigate } from "react-router-dom";
// // // // import toast from "react-hot-toast";
// // // // import Header from "../components/Header";

// // // // export default function AddPackZone() {
// // // //   const navigate = useNavigate();

// // // //   // Sub-category options based on category
// // // //   const subCategoryOptions = {
// // // //     "Label": ["Thank You Card", "Brand Tag", "Product Label"],
// // // //     "Wrapping": ["Packaging Tape", "Poly Bags", "Box"]
// // // //   };

// // // //   const [form, setForm] = useState({
// // // //     itemName: "",
// // // //     size: "",
// // // //     category: "",
// // // //     subCategory: "",
// // // //     qty: 0,
// // // //     unit: "",
// // // //     minimumStock: 50,
// // // //     status: "Active",
// // // //     description: ""
// // // //   });

// // // //   const [loading, setLoading] = useState(false);

// // // //   const handleChange = (e) => {
// // // //     const { name, value } = e.target;
    
// // // //     // If category changes, reset subCategory
// // // //     if (name === "category") {
// // // //       setForm({ 
// // // //         ...form, 
// // // //         [name]: value,
// // // //         subCategory: ""
// // // //       });
// // // //     } else {
// // // //       setForm({ ...form, [name]: value });
// // // //     }
// // // //   };

// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();

// // // //     // Validation
// // // //     if (!form.itemName.trim()) {
// // // //       return toast.error("Item name is required");
// // // //     }
// // // //     if (!form.size.trim()) {
// // // //       return toast.error("Size is required");
// // // //     }
// // // //     if (!form.category) {
// // // //       return toast.error("Please select a category");
// // // //     }
// // // //     if (!form.subCategory) {
// // // //       return toast.error("Please select a sub-category");
// // // //     }
// // // //     if (!form.unit) {
// // // //       return toast.error("Please select a unit");
// // // //     }
// // // //     if (form.qty < 0) {
// // // //       return toast.error("Quantity cannot be negative");
// // // //     }
// // // //     if (form.minimumStock < 0) {
// // // //       return toast.error("Minimum stock cannot be negative");
// // // //     }

// // // //     setLoading(true);
// // // //     const toastId = toast.loading("Creating item...");

// // // //     try {
// // // //       await api.post("/packzone", form);

// // // //       toast.success("Item created successfully!", { id: toastId });
      
// // // //       setTimeout(() => {
// // // //         navigate("/packzone");
// // // //       }, 1500);

// // // //     } catch (err) {
// // // //       console.error("Error creating item:", err);
// // // //       toast.error(err.response?.data?.message || "Failed to create item", { id: toastId });
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div>
// // // //       <Header />
// // // //       <div style={styles.container}>
        
// // // //         {/* Header Section */}
// // // //         <div style={styles.headerWrapper}>
// // // //           <button 
// // // //             onClick={() => navigate("/packzone")} 
// // // //             style={styles.backBtn}
// // // //           >
// // // //             <span style={{marginRight: "8px"}}>⬅</span> Back
// // // //           </button>
// // // //           <h1 style={styles.pageTitle}>PackZone Management</h1>
// // // //         </div>

// // // //         {/* Card Section */}
// // // //         <div style={styles.card}>
// // // //           <div style={styles.cardHeader}>
// // // //             <h2 style={styles.title}>📦 Add New PackZone Item</h2>
// // // //             <p style={styles.subtitle}>Enter details for new packaging material</p>
// // // //           </div>

// // // //           <form onSubmit={handleSubmit}>
            
// // // //             {/* Item Name */}
// // // //             <div style={styles.inputGroup}>
// // // //               <label style={styles.label}>Item Name *</label>
// // // //               <input
// // // //                 type="text"
// // // //                 name="itemName"
// // // //                 placeholder="e.g., Scotch Tape - Brown"
// // // //                 value={form.itemName}
// // // //                 onChange={handleChange}
// // // //                 required
// // // //                 style={styles.input}
// // // //               />
// // // //               <small style={styles.hint}>Give a descriptive name for this item</small>
// // // //             </div>

// // // //             {/* Size */}
// // // //             <div style={styles.inputGroup}>
// // // //               <label style={styles.label}>Size (L×W×H) *</label>
// // // //               <input
// // // //                 type="text"
// // // //                 name="size"
// // // //                 placeholder="e.g., 2inch x 50m, 10cm×5cm×2cm"
// // // //                 value={form.size}
// // // //                 onChange={handleChange}
// // // //                 required
// // // //                 style={styles.input}
// // // //               />
// // // //               <small style={styles.hint}>Enter dimensions or size specification</small>
// // // //             </div>

// // // //             {/* Category & Sub-Category */}
// // // //             <div style={styles.row}>
// // // //               <div style={styles.inputGroup}>
// // // //                 <label style={styles.label}>Category *</label>
// // // //                 <select
// // // //                   name="category"
// // // //                   value={form.category}
// // // //                   onChange={handleChange}
// // // //                   required
// // // //                   style={styles.select}
// // // //                 >
// // // //                   <option value="">Select Category...</option>
// // // //                   <option value="Label">🏷️ Label</option>
// // // //                   <option value="Wrapping">📦 Wrapping</option>
// // // //                 </select>
// // // //               </div>

// // // //               <div style={styles.inputGroup}>
// // // //                 <label style={styles.label}>Sub-Category *</label>
// // // //                 <select
// // // //                   name="subCategory"
// // // //                   value={form.subCategory}
// // // //                   onChange={handleChange}
// // // //                   required
// // // //                   style={styles.select}
// // // //                   disabled={!form.category}
// // // //                 >
// // // //                   <option value="">Select Sub-Category...</option>
// // // //                   {form.category && subCategoryOptions[form.category]?.map((sub) => (
// // // //                     <option key={sub} value={sub}>{sub}</option>
// // // //                   ))}
// // // //                 </select>
// // // //                 <small style={styles.hint}>
// // // //                   {!form.category && "Select category first"}
// // // //                 </small>
// // // //               </div>
// // // //             </div>

// // // //             {/* Quantity & Unit */}
// // // //             <div style={styles.row}>
// // // //               <div style={styles.inputGroup}>
// // // //                 <label style={styles.label}>Current Quantity *</label>
// // // //                 <input
// // // //                   type="number"
// // // //                   name="qty"
// // // //                   placeholder="0"
// // // //                   value={form.qty}
// // // //                   onChange={handleChange}
// // // //                   required
// // // //                   min="0"
// // // //                   style={styles.input}
// // // //                 />
// // // //                 <small style={styles.hint}>How many units you have right now</small>
// // // //               </div>

// // // //               <div style={styles.inputGroup}>
// // // //                 <label style={styles.label}>Unit *</label>
// // // //                 <select
// // // //                   name="unit"
// // // //                   value={form.unit}
// // // //                   onChange={handleChange}
// // // //                   required
// // // //                   style={styles.select}
// // // //                 >
// // // //                   <option value="">Select Unit...</option>
// // // //                   <option value="Roll">Roll</option>
// // // //                   <option value="Piece">Piece</option>
// // // //                   <option value="Pack">Pack</option>
// // // //                   <option value="Box">Box</option>
// // // //                   <option value="Sheet">Sheet</option>
// // // //                   <option value="Meter">Meter</option>
// // // //                 </select>
// // // //               </div>
// // // //             </div>

// // // //             {/* Minimum Stock */}
// // // //             <div style={styles.inputGroup}>
// // // //               <label style={styles.label}>Minimum Stock Level *</label>
// // // //               <input
// // // //                 type="number"
// // // //                 name="minimumStock"
// // // //                 placeholder="50"
// // // //                 value={form.minimumStock}
// // // //                 onChange={handleChange}
// // // //                 required
// // // //                 min="0"
// // // //                 style={styles.input}
// // // //               />
// // // //               <small style={styles.hint}>Alert when stock goes below this level</small>
// // // //             </div>

// // // //             {/* Status */}
// // // //             <div style={styles.inputGroup}>
// // // //               <label style={styles.label}>Status *</label>
// // // //               <select
// // // //                 name="status"
// // // //                 value={form.status}
// // // //                 onChange={handleChange}
// // // //                 required
// // // //                 style={styles.select}
// // // //               >
// // // //                 <option value="Active">Active</option>
// // // //                 <option value="Inactive">Inactive</option>
// // // //               </select>
// // // //             </div>

// // // //             {/* Description */}
// // // //             <div style={styles.inputGroup}>
// // // //               <label style={styles.label}>Description / Notes</label>
// // // //               <textarea
// // // //                 name="description"
// // // //                 placeholder="Any additional details about this item..."
// // // //                 value={form.description}
// // // //                 onChange={handleChange}
// // // //                 style={{...styles.input, minHeight: "100px"}}
// // // //                 rows="4"
// // // //               />
// // // //               <small style={styles.hint}>Optional - Any special notes or details</small>
// // // //             </div>

// // // //             {/* Preview Box */}
// // // //             <div style={styles.previewBox}>
// // // //               <h4 style={styles.previewTitle}>📋 Preview</h4>
// // // //               <div style={styles.previewContent}>
// // // //                 <div style={styles.previewRow}>
// // // //                   <strong>Item Name:</strong> {form.itemName || "Not set"}
// // // //                 </div>
// // // //                 <div style={styles.previewRow}>
// // // //                   <strong>Size:</strong> {form.size || "Not set"}
// // // //                 </div>
// // // //                 <div style={styles.previewRow}>
// // // //                   <strong>Category:</strong> {form.category || "Not selected"}
// // // //                 </div>
// // // //                 <div style={styles.previewRow}>
// // // //                   <strong>Sub-Category:</strong> {form.subCategory || "Not selected"}
// // // //                 </div>
// // // //                 <div style={styles.previewRow}>
// // // //                   <strong>Quantity:</strong> {form.qty} {form.unit || "units"}
// // // //                 </div>
// // // //                 <div style={styles.previewRow}>
// // // //                   <strong>Minimum Stock:</strong> {form.minimumStock} {form.unit || "units"}
// // // //                 </div>
// // // //                 <div style={styles.previewRow}>
// // // //                   <strong>Status:</strong>{" "}
// // // //                   <span style={form.status === "Active" ? styles.activeTag : styles.inactiveTag}>
// // // //                     {form.status}
// // // //                   </span>
// // // //                 </div>
// // // //                 {parseInt(form.qty) <= parseInt(form.minimumStock) && (
// // // //                   <div style={styles.warningBox}>
// // // //                     ⚠️ Warning: Current quantity is at or below minimum level!
// // // //                   </div>
// // // //                 )}
// // // //               </div>
// // // //             </div>

// // // //             {/* Submit Button */}
// // // //             <div style={styles.buttonGroup}>
// // // //               <button 
// // // //                 type="button"
// // // //                 onClick={() => navigate("/packzone")}
// // // //                 style={styles.cancelButton}
// // // //               >
// // // //                 Cancel
// // // //               </button>
// // // //               <button 
// // // //                 type="submit" 
// // // //                 disabled={loading}
// // // //                 style={loading ? styles.buttonDisabled : styles.button}
// // // //               >
// // // //                 {loading ? "Creating..." : "Create Item"}
// // // //               </button>
// // // //             </div>

// // // //           </form>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // // ==================== STYLES ====================
// // // // const styles = {
// // // //   container: {
// // // //     minHeight: "100vh",
// // // //     backgroundColor: "#f3f4f6",
// // // //     padding: "40px 20px",
// // // //     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
// // // //     display: "flex",
// // // //     flexDirection: "column",
// // // //     alignItems: "center",
// // // //   },
// // // //   headerWrapper: {
// // // //     width: "100%",
// // // //     maxWidth: "800px",
// // // //     marginBottom: "20px",
// // // //     display: "flex",
// // // //     alignItems: "center",
// // // //     gap: "16px"
// // // //   },
// // // //   backBtn: {
// // // //     padding: "10px 16px",
// // // //     backgroundColor: "white",
// // // //     border: "2px solid #e5e7eb",
// // // //     borderRadius: "8px",
// // // //     fontSize: "14px",
// // // //     fontWeight: "600",
// // // //     color: "#374151",
// // // //     cursor: "pointer",
// // // //     transition: "all 0.2s",
// // // //     display: "flex",
// // // //     alignItems: "center"
// // // //   },
// // // //   pageTitle: {
// // // //     fontSize: "24px",
// // // //     fontWeight: "700",
// // // //     color: "#1f2937",
// // // //     margin: 0
// // // //   },
// // // //   card: {
// // // //     backgroundColor: "white",
// // // //     borderRadius: "16px",
// // // //     boxShadow: "0 4px 6px rgba(0,0,0,0.07)",
// // // //     padding: "32px",
// // // //     width: "100%",
// // // //     maxWidth: "800px",
// // // //   },
// // // //   cardHeader: {
// // // //     marginBottom: "32px",
// // // //     paddingBottom: "20px",
// // // //     borderBottom: "2px solid #f3f4f6"
// // // //   },
// // // //   title: {
// // // //     fontSize: "22px",
// // // //     fontWeight: "700",
// // // //     color: "#1f2937",
// // // //     marginBottom: "8px"
// // // //   },
// // // //   subtitle: {
// // // //     fontSize: "14px",
// // // //     color: "#6b7280",
// // // //     margin: 0
// // // //   },
// // // //   inputGroup: {
// // // //     marginBottom: "24px"
// // // //   },
// // // //   label: {
// // // //     display: "block",
// // // //     fontSize: "14px",
// // // //     fontWeight: "600",
// // // //     color: "#374151",
// // // //     marginBottom: "8px"
// // // //   },
// // // //   input: {
// // // //     width: "100%",
// // // //     padding: "12px 16px",
// // // //     fontSize: "14px",
// // // //     border: "2px solid #e5e7eb",
// // // //     borderRadius: "8px",
// // // //     transition: "border-color 0.2s",
// // // //     boxSizing: "border-box",
// // // //     fontFamily: "inherit"
// // // //   },
// // // //   select: {
// // // //     width: "100%",
// // // //     padding: "12px 16px",
// // // //     fontSize: "14px",
// // // //     border: "2px solid #e5e7eb",
// // // //     borderRadius: "8px",
// // // //     backgroundColor: "white",
// // // //     cursor: "pointer",
// // // //     boxSizing: "border-box"
// // // //   },
// // // //   hint: {
// // // //     display: "block",
// // // //     marginTop: "6px",
// // // //     fontSize: "12px",
// // // //     color: "#9ca3af"
// // // //   },
// // // //   row: {
// // // //     display: "grid",
// // // //     gridTemplateColumns: "1fr 1fr",
// // // //     gap: "20px",
// // // //     marginBottom: "24px"
// // // //   },
// // // //   previewBox: {
// // // //     backgroundColor: "#f9fafb",
// // // //     padding: "20px",
// // // //     borderRadius: "12px",
// // // //     border: "2px dashed #d1d5db",
// // // //     marginBottom: "24px"
// // // //   },
// // // //   previewTitle: {
// // // //     fontSize: "14px",
// // // //     fontWeight: "600",
// // // //     color: "#6b7280",
// // // //     marginBottom: "16px",
// // // //     marginTop: 0
// // // //   },
// // // //   previewContent: {
// // // //     fontSize: "14px"
// // // //   },
// // // //   previewRow: {
// // // //     marginBottom: "10px",
// // // //     color: "#374151",
// // // //     lineHeight: "1.6"
// // // //   },
// // // //   activeTag: {
// // // //     padding: "2px 10px",
// // // //     borderRadius: "12px",
// // // //     fontSize: "12px",
// // // //     fontWeight: "600",
// // // //     backgroundColor: "#d1fae5",
// // // //     color: "#065f46"
// // // //   },
// // // //   inactiveTag: {
// // // //     padding: "2px 10px",
// // // //     borderRadius: "12px",
// // // //     fontSize: "12px",
// // // //     fontWeight: "600",
// // // //     backgroundColor: "#fee2e2",
// // // //     color: "#991b1b"
// // // //   },
// // // //   warningBox: {
// // // //     marginTop: "12px",
// // // //     padding: "12px",
// // // //     backgroundColor: "#fef3c7",
// // // //     border: "1px solid #fbbf24",
// // // //     borderRadius: "8px",
// // // //     color: "#92400e",
// // // //     fontSize: "13px",
// // // //     fontWeight: "500"
// // // //   },
// // // //   buttonGroup: {
// // // //     display: "flex",
// // // //     gap: "12px",
// // // //     justifyContent: "flex-end",
// // // //     paddingTop: "24px",
// // // //     borderTop: "2px solid #f3f4f6"
// // // //   },
// // // //   cancelButton: {
// // // //     padding: "12px 32px",
// // // //     fontSize: "15px",
// // // //     fontWeight: "600",
// // // //     color: "#374151",
// // // //     backgroundColor: "white",
// // // //     border: "2px solid #e5e7eb",
// // // //     borderRadius: "8px",
// // // //     cursor: "pointer",
// // // //     transition: "all 0.2s",
// // // //   },
// // // //   button: {
// // // //     padding: "12px 32px",
// // // //     fontSize: "15px",
// // // //     fontWeight: "600",
// // // //     color: "white",
// // // //     backgroundColor: "#3b82f6",
// // // //     border: "none",
// // // //     borderRadius: "8px",
// // // //     cursor: "pointer",
// // // //     transition: "all 0.2s",
// // // //   },
// // // //   buttonDisabled: {
// // // //     padding: "12px 32px",
// // // //     fontSize: "15px",
// // // //     fontWeight: "600",
// // // //     color: "white",
// // // //     backgroundColor: "#9ca3af",
// // // //     border: "none",
// // // //     borderRadius: "8px",
// // // //     cursor: "not-allowed",
// // // //     opacity: 0.6
// // // //   }
// // // // };







// // // import React, { useState } from "react";
// // // import api from "../api/axios";
// // // import { useNavigate } from "react-router-dom";
// // // import toast from "react-hot-toast";
// // // import Header from "../components/Header";

// // // export default function AddPackZone() {
// // //   const navigate = useNavigate();
// // //   const [loading, setLoading] = useState(false);

// // //   const [form, setForm] = useState({
// // //     itemName: "",
// // //     // Split Dimensions
// // //     length: "",
// // //     width: "",
// // //     height: "",
// // //     dimensionUnit: "inch", // Default
// // //     category: "",
// // //     qty: 0,
// // //     unit: "",
// // //     minimumStock: 50,
// // //     description: ""
// // //   });

// // //   const handleChange = (e) => {
// // //     setForm({ ...form, [e.target.name]: e.target.value });
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     setLoading(true);

// // //     try {
// // //       await api.post("/packzone", form);
// // //       toast.success("Item created successfully!");
// // //       setTimeout(() => navigate("/packzone"), 1000);
// // //     } catch (err) {
// // //       toast.error(err.response?.data?.message || "Failed to create item");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div style={styles.container}>
// // //       <Header />
// // //       <div style={styles.mainContent}>
// // //         <div style={styles.card}>
// // //           <div style={styles.headerRow}>
// // //             <button onClick={() => navigate("/packzone")} style={styles.backBtn}>⬅ Back</button>
// // //             <h2 style={styles.title}>Add New Packaging Item</h2>
// // //           </div>

// // //           <form onSubmit={handleSubmit} style={styles.form}>
// // //             {/* 1. Item Name */}
// // //             <div style={styles.formGroup}>
// // //               <label style={styles.label}>Item Name <span style={styles.req}>*</span></label>
// // //               <input
// // //                 type="text"
// // //                 name="itemName"
// // //                 value={form.itemName}
// // //                 onChange={handleChange}
// // //                 placeholder="e.g. Corrugated Box 3 Ply"
// // //                 style={styles.input}
// // //                 required
// // //               />
// // //             </div>

// // //             {/* 2. Dimensions Grid */}
// // //             <div style={styles.formGroup}>
// // //               <label style={styles.label}>Dimensions (Size) <span style={styles.req}>*</span></label>
// // //               <div style={styles.grid4}>
// // //                 <div>
// // //                   <small style={styles.subLabel}>Length (L)</small>
// // //                   <input type="number" name="length" value={form.length} onChange={handleChange} style={styles.input} required min="0" step="0.1" />
// // //                 </div>
// // //                 <div>
// // //                   <small style={styles.subLabel}>Width (W)</small>
// // //                   <input type="number" name="width" value={form.width} onChange={handleChange} style={styles.input} required min="0" step="0.1" />
// // //                 </div>
// // //                 <div>
// // //                   <small style={styles.subLabel}>Height (H)</small>
// // //                   <input type="number" name="height" value={form.height} onChange={handleChange} style={styles.input} required min="0" step="0.1" />
// // //                 </div>
// // //                 <div>
// // //                   <small style={styles.subLabel}>Unit</small>
// // //                   <select name="dimensionUnit" value={form.dimensionUnit} onChange={handleChange} style={styles.select}>
// // //                     <option value="inch">Inches</option>
// // //                     <option value="cm">CM</option>
// // //                   </select>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             {/* 3. Category & Inventory Unit */}
// // //             <div style={styles.grid2}>
// // //               <div style={styles.formGroup}>
// // //                 <label style={styles.label}>Category <span style={styles.req}>*</span></label>
// // //                 <select name="category" value={form.category} onChange={handleChange} style={styles.select} required>
// // //                   <option value="">Select...</option>
// // //                   <option value="Box">📦 Box</option>
// // //                   <option value="Label">🏷️ Label</option>
// // //                   <option value="Wrapping">📜 Wrapping</option>
// // //                 </select>
// // //               </div>

// // //               <div style={styles.formGroup}>
// // //                 <label style={styles.label}>Stock Unit <span style={styles.req}>*</span></label>
// // //                 <select name="unit" value={form.unit} onChange={handleChange} style={styles.select} required>
// // //                   <option value="">Select...</option>
// // //                   <option value="Piece">Piece</option>
// // //                   <option value="Roll">Roll</option>
// // //                   <option value="Pack">Pack</option>
// // //                   <option value="Sheet">Sheet</option>
// // //                   <option value="Box">Box (Bundle)</option>
// // //                   <option value="Meter">Meter</option>
// // //                 </select>
// // //               </div>
// // //             </div>

// // //             {/* 4. Stock Levels */}
// // //             <div style={styles.grid2}>
// // //               <div style={styles.formGroup}>
// // //                 <label style={styles.label}>Opening Quantity</label>
// // //                 <input type="number" name="qty" value={form.qty} onChange={handleChange} style={styles.input} min="0" required />
// // //               </div>
// // //               <div style={styles.formGroup}>
// // //                 <label style={styles.label}>Minimum Stock Alert</label>
// // //                 <input type="number" name="minimumStock" value={form.minimumStock} onChange={handleChange} style={styles.input} min="0" required />
// // //               </div>
// // //             </div>

// // //             <div style={styles.formGroup}>
// // //               <label style={styles.label}>Description</label>
// // //               <textarea name="description" value={form.description} onChange={handleChange} style={{...styles.input, minHeight: '80px'}} />
// // //             </div>

// // //             <button type="submit" style={loading ? styles.btnDisabled : styles.btnSubmit} disabled={loading}>
// // //               {loading ? "Saving..." : "Create Item"}
// // //             </button>
// // //           </form>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // const styles = {
// // //   container: { minHeight: "100vh", backgroundColor: "#f8fafc" },
// // //   mainContent: { maxWidth: "800px", margin: "40px auto", padding: "0 20px" },
// // //   card: { backgroundColor: "white", padding: "30px", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" },
// // //   headerRow: { display: "flex", alignItems: "center", marginBottom: "30px", gap: "20px" },
// // //   backBtn: { background: "none", border: "1px solid #e2e8f0", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "14px" },
// // //   title: { margin: 0, fontSize: "24px", color: "#1e293b" },
// // //   form: { display: "flex", flexDirection: "column", gap: "20px" },
// // //   formGroup: { display: "flex", flexDirection: "column", gap: "8px" },
// // //   grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" },
// // //   grid4: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "10px" },
// // //   label: { fontSize: "14px", fontWeight: "600", color: "#475569" },
// // //   subLabel: { fontSize: "12px", color: "#94a3b8", display: "block", marginBottom: "4px" },
// // //   req: { color: "#ef4444" },
// // //   input: { padding: "10px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px" },
// // //   select: { padding: "10px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px", backgroundColor: "white" },
// // //   btnSubmit: { padding: "12px", backgroundColor: "#3b82f6", color: "white", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer", marginTop: "10px" },
// // //   btnDisabled: { padding: "12px", backgroundColor: "#94a3b8", color: "white", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "not-allowed", marginTop: "10px" }
// // // };





















// // import React, { useState } from "react";
// // import api from "../api/axios";
// // import { useNavigate } from "react-router-dom";
// // import toast from "react-hot-toast";
// // import Header from "../components/Header";

// // export default function AddPackZone() {
// //   const navigate = useNavigate();
// //   const [loading, setLoading] = useState(false);

// //   const [form, setForm] = useState({
// //     itemName: "",
// //     category: "", // Moved category to top priority
// //     length: "",
// //     width: "",
// //     height: "",
// //     dimensionUnit: "inch",
// //     qty: 0,
// //     unit: "",
// //     minimumStock: 50,
// //     description: ""
// //   });

// //   // Helper to check if we need 2 dimensions or 3
// //   const isTwoDimensional = form.category === "Label";

// //   const handleChange = (e) => {
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);

// //     // Prepare payload
// //     const payload = { ...form };

// //     // Validations & Adjustments
// //     if (isTwoDimensional) {
// //       payload.height = 0; // Force height to 0 for Labels
// //     }

// //     try {
// //       await api.post("/packzone", payload);
// //       toast.success("Item created successfully!");
// //       setTimeout(() => navigate("/packzone"), 1000);
// //     } catch (err) {
// //       toast.error(err.response?.data?.message || "Failed to create item");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div style={styles.container}>
// //       <Header />
// //       <div style={styles.mainContent}>
// //         <div style={styles.card}>
          
// //           <div style={styles.headerRow}>
// //             <button onClick={() => navigate("/packzone")} style={styles.backBtn}>⬅ Back</button>
// //             <h2 style={styles.title}>Add New Packaging Item</h2>
// //           </div>

// //           <form onSubmit={handleSubmit} style={styles.form}>
            
// //             {/* 1. Category Selection (Top Priority) */}
// //             <div style={styles.formGroup}>
// //               <label style={styles.label}>Category <span style={styles.req}>*</span></label>
// //               <select 
// //                 name="category" 
// //                 value={form.category} 
// //                 onChange={handleChange} 
// //                 style={styles.select} 
// //                 required
// //                 autoFocus
// //               >
// //                 <option value="">Select Category...</option>
// //                 <option value="Box">📦 Box (L x W x H)</option>
// //                 <option value="Label">🏷️ Label (L x W)</option>
// //                 <option value="Wrapping">📜 Wrapping (L x W x H)</option>
// //               </select>
// //             </div>

// //             {/* 2. Item Name */}
// //             <div style={styles.formGroup}>
// //               <label style={styles.label}>Item Name <span style={styles.req}>*</span></label>
// //               <input
// //                 type="text"
// //                 name="itemName"
// //                 value={form.itemName}
// //                 onChange={handleChange}
// //                 placeholder="e.g. Shipping Label 4x6"
// //                 style={styles.input}
// //                 required
// //               />
// //             </div>

// //             {/* 3. Dimensions Grid (Dynamic based on Category) */}
// //             <div style={styles.formGroup}>
// //               <label style={styles.label}>
// //                 Dimensions ({isTwoDimensional ? "Length x Width" : "Length x Width x Height"}) <span style={styles.req}>*</span>
// //               </label>
              
// //               <div style={isTwoDimensional ? styles.grid3 : styles.grid4}>
                
// //                 {/* Length */}
// //                 <div>
// //                   <small style={styles.subLabel}>Length (L)</small>
// //                   <input 
// //                     type="number" 
// //                     name="length" 
// //                     value={form.length} 
// //                     onChange={handleChange} 
// //                     style={styles.input} 
// //                     required 
// //                     min="0" 
// //                     step="0.01" 
// //                     placeholder="0.00"
// //                   />
// //                 </div>

// //                 {/* Width */}
// //                 <div>
// //                   <small style={styles.subLabel}>Width (W)</small>
// //                   <input 
// //                     type="number" 
// //                     name="width" 
// //                     value={form.width} 
// //                     onChange={handleChange} 
// //                     style={styles.input} 
// //                     required 
// //                     min="0" 
// //                     step="0.01" 
// //                     placeholder="0.00"
// //                   />
// //                 </div>

// //                 {/* Height - Only show if NOT a Label */}
// //                 {!isTwoDimensional && (
// //                   <div>
// //                     <small style={styles.subLabel}>Height (H)</small>
// //                     <input 
// //                       type="number" 
// //                       name="height" 
// //                       value={form.height} 
// //                       onChange={handleChange} 
// //                       style={styles.input} 
// //                       required 
// //                       min="0" 
// //                       step="0.01" 
// //                       placeholder="0.00"
// //                     />
// //                   </div>
// //                 )}

// //                 {/* Unit */}
// //                 <div>
// //                   <small style={styles.subLabel}>Unit</small>
// //                   <select 
// //                     name="dimensionUnit" 
// //                     value={form.dimensionUnit} 
// //                     onChange={handleChange} 
// //                     style={styles.select}
// //                   >
// //                     <option value="inch">Inches</option>
// //                     <option value="cm">CM</option>
// //                     <option value="mm">MM</option>
// //                   </select>
// //                 </div>

// //               </div>
// //             </div>

// //             {/* 4. Inventory Unit */}
// //             <div style={styles.grid2}>
// //               <div style={styles.formGroup}>
// //                 <label style={styles.label}>Stock Unit <span style={styles.req}>*</span></label>
// //                 <select name="unit" value={form.unit} onChange={handleChange} style={styles.select} required>
// //                   <option value="">Select...</option>
// //                   <option value="Piece">Piece</option>
// //                   <option value="Roll">Roll</option>
// //                   <option value="Pack">Pack</option>
// //                   <option value="Sheet">Sheet</option>
// //                   <option value="Box">Box Bundle</option>
// //                   <option value="Meter">Meter</option>
// //                 </select>
// //               </div>

// //               <div style={styles.formGroup}>
// //                 <label style={styles.label}>Opening Quantity</label>
// //                 <input type="number" name="qty" value={form.qty} onChange={handleChange} style={styles.input} min="0" required />
// //               </div>
// //             </div>

// //             {/* 5. Min Stock & Description */}
// //             <div style={styles.formGroup}>
// //                 <label style={styles.label}>Minimum Stock Alert</label>
// //                 <input type="number" name="minimumStock" value={form.minimumStock} onChange={handleChange} style={styles.input} min="0" required />
// //             </div>

// //             <div style={styles.formGroup}>
// //               <label style={styles.label}>Description</label>
// //               <textarea name="description" value={form.description} onChange={handleChange} style={{...styles.input, minHeight: '80px'}} />
// //             </div>

// //             <button type="submit" style={loading ? styles.btnDisabled : styles.btnSubmit} disabled={loading}>
// //               {loading ? "Creating..." : "Create Item"}
// //             </button>

// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // const styles = {
// //   container: { minHeight: "100vh", backgroundColor: "#f8fafc" },
// //   mainContent: { maxWidth: "700px", margin: "40px auto", padding: "0 20px" },
// //   card: { backgroundColor: "white", padding: "30px", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" },
// //   headerRow: { display: "flex", alignItems: "center", marginBottom: "30px", gap: "20px" },
// //   backBtn: { background: "none", border: "1px solid #e2e8f0", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "14px" },
// //   title: { margin: 0, fontSize: "24px", color: "#1e293b" },
// //   form: { display: "flex", flexDirection: "column", gap: "20px" },
// //   formGroup: { display: "flex", flexDirection: "column", gap: "8px" },
// //   grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" },
// //   grid3: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "15px" }, // For Labels (L, W, Unit)
// //   grid4: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "10px" }, // For Boxes (L, W, H, Unit)
// //   label: { fontSize: "14px", fontWeight: "600", color: "#475569" },
// //   subLabel: { fontSize: "12px", color: "#94a3b8", display: "block", marginBottom: "4px" },
// //   req: { color: "#ef4444" },
// //   input: { padding: "10px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px", width: "100%", boxSizing: "border-box" },
// //   select: { padding: "10px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px", backgroundColor: "white", width: "100%", boxSizing: "border-box" },
// //   btnSubmit: { padding: "12px", backgroundColor: "#3b82f6", color: "white", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer", marginTop: "10px", fontSize: "16px" },
// //   btnDisabled: { padding: "12px", backgroundColor: "#94a3b8", color: "white", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "not-allowed", marginTop: "10px", fontSize: "16px" }
// // };






















// import React, { useState } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import Header from "../components/Header";

// export default function AddPackZone() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     itemName: "",
//     category: "",
//     length: "",
//     width: "",
//     height: "",
//     dimensionUnit: "inch",
//     qty: 0,
//     unit: "",
//     minimumStock: 50,
//     description: ""
//   });

//   // Check Category Type
//   const isLabel = form.category === "Label";
//   const isWrapping = form.category === "Wrapping";
  
//   // Logic: Dimensions are NOT required if category is Wrapping
//   const isSizeRequired = !isWrapping; 

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const payload = { ...form };

//     // Data Cleanup
//     if (isLabel) {
//       payload.height = 0; // Label has no height
//     }
//     if (isWrapping) {
//         // If empty, send 0
//         payload.length = payload.length || 0;
//         payload.width = payload.width || 0;
//         payload.height = payload.height || 0;
//     }

//     try {
//       await api.post("/packzone", payload);
//       toast.success("Item created successfully!");
//       setTimeout(() => navigate("/packzone"), 1000);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to create item");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <Header />
//       <div style={styles.mainContent}>
//         <div style={styles.card}>
          
//           <div style={styles.headerRow}>
//             <button onClick={() => navigate("/packzone")} style={styles.backBtn}>⬅ Back</button>
//             <h2 style={styles.title}>Add New Item</h2>
//           </div>

//           <form onSubmit={handleSubmit} style={styles.form}>
            
//             {/* Category Select */}
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Category <span style={styles.req}>*</span></label>
//               <select 
//                 name="category" 
//                 value={form.category} 
//                 onChange={handleChange} 
//                 style={styles.select} 
//                 required
//                 autoFocus
//               >
//                 <option value="">Select Category...</option>
//                 <option value="Box">📦 Box (Requires L x W x H)</option>
//                 <option value="Label">🏷️ Label (Requires L x W)</option>
//                 <option value="Wrapping">📜 Wrapping (Size Optional)</option>
//               </select>
//             </div>

//             {/* Item Name */}
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Item Name <span style={styles.req}>*</span></label>
//               <input
//                 type="text"
//                 name="itemName"
//                 value={form.itemName}
//                 onChange={handleChange}
//                 placeholder="Item Name"
//                 style={styles.input}
//                 required
//               />
//             </div>

//             {/* Dimensions Section */}
//             <div style={styles.formGroup}>
//               <label style={styles.label}>
//                 Dimensions 
//                 {isWrapping ? " (Optional)" : isLabel ? " (L x W)" : " (L x W x H)"}
//                 {isSizeRequired && <span style={styles.req}> *</span>}
//               </label>
              
//               <div style={isLabel ? styles.grid3 : styles.grid4}>
                
//                 {/* Length */}
//                 <div>
//                   <small style={styles.subLabel}>Length</small>
//                   <input 
//                     type="number" 
//                     name="length" 
//                     value={form.length} 
//                     onChange={handleChange} 
//                     style={styles.input} 
//                     required={isSizeRequired} 
//                     min="0" step="0.01" placeholder="0"
//                   />
//                 </div>

//                 {/* Width */}
//                 <div>
//                   <small style={styles.subLabel}>Width</small>
//                   <input 
//                     type="number" 
//                     name="width" 
//                     value={form.width} 
//                     onChange={handleChange} 
//                     style={styles.input} 
//                     required={isSizeRequired} 
//                     min="0" step="0.01" placeholder="0"
//                   />
//                 </div>

//                 {/* Height (Hidden for Label) */}
//                 {!isLabel && (
//                   <div>
//                     <small style={styles.subLabel}>Height</small>
//                     <input 
//                       type="number" 
//                       name="height" 
//                       value={form.height} 
//                       onChange={handleChange} 
//                       style={styles.input} 
//                       required={isSizeRequired} 
//                       min="0" step="0.01" placeholder="0"
//                     />
//                   </div>
//                 )}

//                 {/* Unit */}
//                 <div>
//                   <small style={styles.subLabel}>Unit</small>
//                   <select 
//                     name="dimensionUnit" 
//                     value={form.dimensionUnit} 
//                     onChange={handleChange} 
//                     style={styles.select}
//                   >
//                     <option value="inch">Inch</option>
//                     <option value="cm">CM</option>
//                     <option value="mm">MM</option>
//                   </select>
//                 </div>
//               </div>
//             </div>

//             {/* Inventory Unit & Qty */}
//             <div style={styles.grid2}>
//               <div style={styles.formGroup}>
//                 <label style={styles.label}>Stock Unit <span style={styles.req}>*</span></label>
//                 <select name="unit" value={form.unit} onChange={handleChange} style={styles.select} required>
//                   <option value="">Select...</option>
//                   <option value="Piece">Piece</option>
//                   <option value="Roll">Roll</option>
//                   <option value="Pack">Pack</option>
//                   <option value="Sheet">Sheet</option>
//                   <option value="Box">Box Bundle</option>
//                   <option value="Meter">Meter</option>
//                 </select>
//               </div>

//               <div style={styles.formGroup}>
//                 <label style={styles.label}>Quantity</label>
//                 <input type="number" name="qty" value={form.qty} onChange={handleChange} style={styles.input} min="0" required />
//               </div>
//             </div>

//             {/* Min Stock */}
//             <div style={styles.formGroup}>
//                 <label style={styles.label}>Minimum Stock Alert</label>
//                 <input type="number" name="minimumStock" value={form.minimumStock} onChange={handleChange} style={styles.input} min="0" required />
//             </div>

//             <div style={styles.formGroup}>
//               <label style={styles.label}>Description</label>
//               <textarea name="description" value={form.description} onChange={handleChange} style={{...styles.input, minHeight: '80px'}} />
//             </div>

//             <button type="submit" style={loading ? styles.btnDisabled : styles.btnSubmit} disabled={loading}>
//               {loading ? "Creating..." : "Create Item"}
//             </button>

//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: { minHeight: "100vh", backgroundColor: "#f8fafc" },
//   mainContent: { maxWidth: "700px", margin: "40px auto", padding: "0 20px" },
//   card: { backgroundColor: "white", padding: "30px", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" },
//   headerRow: { display: "flex", alignItems: "center", marginBottom: "30px", gap: "20px" },
//   backBtn: { background: "none", border: "1px solid #e2e8f0", padding: "8px 16px", borderRadius: "8px", cursor: "pointer" },
//   title: { margin: 0, fontSize: "24px", color: "#1e293b" },
//   form: { display: "flex", flexDirection: "column", gap: "20px" },
//   formGroup: { display: "flex", flexDirection: "column", gap: "8px" },
//   grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" },
//   grid3: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" },
//   grid4: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "10px" },
//   label: { fontSize: "14px", fontWeight: "600", color: "#475569" },
//   subLabel: { fontSize: "12px", color: "#94a3b8", display: "block", marginBottom: "4px" },
//   req: { color: "#ef4444" },
//   input: { padding: "10px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px", width: "100%", boxSizing: "border-box" },
//   select: { padding: "10px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px", backgroundColor: "white", width: "100%", boxSizing: "border-box" },
//   btnSubmit: { padding: "12px", backgroundColor: "#3b82f6", color: "white", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer", marginTop: "10px", fontSize: "16px" },
//   btnDisabled: { padding: "12px", backgroundColor: "#94a3b8", color: "white", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "not-allowed", marginTop: "10px", fontSize: "16px" }
// };
































// import React, { useState } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import Header from "../components/Header";

// export default function AddPackZone() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     itemName: "",
//     category: "",
//     // Dimensions
//     length: "", width: "", height: "", dimensionUnit: "inch",
//     // Wrapping Size
//     wrappingSize: "",
//     // Stock
//     qty: 0, unit: "", minimumStock: 50, description: ""
//   });

//   const isWrapping = form.category === "Wrapping";
//   const isLabel = form.category === "Label";
//   const isBox = form.category === "Box";

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const payload = { ...form };

//     // Clean data based on category
//     if (isWrapping) {
//       payload.length = 0; payload.width = 0; payload.height = 0;
//     } else if (isLabel) {
//       payload.height = 0; payload.wrappingSize = null;
//     } else {
//       payload.wrappingSize = null;
//     }

//     try {
//       await api.post("/packzone", payload);
//       toast.success("Item created successfully!");
//       setTimeout(() => navigate("/packzone"), 1000);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to create item");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <Header />
//       <div style={styles.mainContent}>
//         <div style={styles.card}>
//           <div style={styles.headerRow}>
//             <button onClick={() => navigate("/packzone")} style={styles.backBtn}>⬅ Back</button>
//             <h2 style={styles.title}>Add New Item</h2>
//           </div>

//           <form onSubmit={handleSubmit} style={styles.form}>
            
//             {/* Category */}
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Category <span style={styles.req}>*</span></label>
//               <select name="category" value={form.category} onChange={handleChange} style={styles.select} required>
//                 <option value="">Select Category...</option>
//                 <option value="Box">📦 Box</option>
//                 <option value="Label">🏷️ Label</option>
//                 <option value="Wrapping">📜 Wrapping</option>
//               </select>
//             </div>

//             {/* Name */}
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Item Name <span style={styles.req}>*</span></label>
//               <input type="text" name="itemName" value={form.itemName} onChange={handleChange} style={styles.input} required />
//             </div>

//             {/* CONDITIONAL SIZE INPUTS */}
            
//             {/* 1. FOR WRAPPING (S, M, L) */}
//             {isWrapping && (
//               <div style={styles.formGroup}>
//                 <label style={styles.label}>Size (Wrapping) <span style={styles.req}>*</span></label>
//                 <select name="wrappingSize" value={form.wrappingSize} onChange={handleChange} style={styles.select} required>
//                   <option value="">Select Size...</option>
//                   <option value="Small">Small (S)</option>
//                   <option value="Medium">Medium (M)</option>
//                   <option value="Large">Large (L)</option>
//                 </select>
//               </div>
//             )}

//             {/* 2. FOR BOX & LABEL (Dimensions) */}
//             {!isWrapping && form.category && (
//               <div style={styles.formGroup}>
//                 <label style={styles.label}>
//                   Dimensions {isLabel ? "(L x W)" : "(L x W x H)"} <span style={styles.req}>*</span>
//                 </label>
//                 <div style={isLabel ? styles.grid3 : styles.grid4}>
//                   <div>
//                     <small style={styles.subLabel}>Length</small>
//                     <input type="number" name="length" value={form.length} onChange={handleChange} style={styles.input} required min="0" step="0.01"/>
//                   </div>
//                   <div>
//                     <small style={styles.subLabel}>Width</small>
//                     <input type="number" name="width" value={form.width} onChange={handleChange} style={styles.input} required min="0" step="0.01"/>
//                   </div>
//                   {!isLabel && (
//                     <div>
//                       <small style={styles.subLabel}>Height</small>
//                       <input type="number" name="height" value={form.height} onChange={handleChange} style={styles.input} required min="0" step="0.01"/>
//                     </div>
//                   )}
//                   <div>
//                     <small style={styles.subLabel}>Unit</small>
//                     <select name="dimensionUnit" value={form.dimensionUnit} onChange={handleChange} style={styles.select}>
//                       <option value="inch">Inch</option>
//                       <option value="cm">CM</option>
//                       <option value="mm">MM</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Rest of the form (Stock, Unit, etc.) */}
//             <div style={styles.grid2}>
//               <div style={styles.formGroup}>
//                 <label style={styles.label}>Stock Unit <span style={styles.req}>*</span></label>
//                 <select name="unit" value={form.unit} onChange={handleChange} style={styles.select} required>
//                   <option value="">Select...</option>
//                   <option value="Piece">Piece</option>
//                   <option value="Roll">Roll</option>
//                   <option value="Pack">Pack</option>
//                   <option value="Box">Box Bundle</option>
//                 </select>
//               </div>
//               <div style={styles.formGroup}>
//                 <label style={styles.label}>Quantity</label>
//                 <input type="number" name="qty" value={form.qty} onChange={handleChange} style={styles.input} min="0" required />
//               </div>
//             </div>

//             <div style={styles.formGroup}>
//                 <label style={styles.label}>Minimum Stock</label>
//                 <input type="number" name="minimumStock" value={form.minimumStock} onChange={handleChange} style={styles.input} min="0" required />
//             </div>

//             <button type="submit" style={loading ? styles.btnDisabled : styles.btnSubmit} disabled={loading}>
//               {loading ? "Creating..." : "Create Item"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Styles object same as before...
// const styles = {
//     container: { minHeight: "100vh", backgroundColor: "#f8fafc" },
//     mainContent: { maxWidth: "700px", margin: "40px auto", padding: "0 20px" },
//     card: { backgroundColor: "white", padding: "30px", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" },
//     headerRow: { display: "flex", alignItems: "center", marginBottom: "30px", gap: "20px" },
//     backBtn: { background: "none", border: "1px solid #e2e8f0", padding: "8px 16px", borderRadius: "8px", cursor: "pointer" },
//     title: { margin: 0, fontSize: "24px", color: "#1e293b" },
//     form: { display: "flex", flexDirection: "column", gap: "20px" },
//     formGroup: { display: "flex", flexDirection: "column", gap: "8px" },
//     grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" },
//     grid3: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" },
//     grid4: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "10px" },
//     label: { fontSize: "14px", fontWeight: "600", color: "#475569" },
//     subLabel: { fontSize: "12px", color: "#94a3b8", display: "block", marginBottom: "4px" },
//     req: { color: "#ef4444" },
//     input: { padding: "10px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px", width: "100%", boxSizing: "border-box" },
//     select: { padding: "10px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px", backgroundColor: "white", width: "100%", boxSizing: "border-box" },
//     btnSubmit: { padding: "12px", backgroundColor: "#3b82f6", color: "white", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer", marginTop: "10px", fontSize: "16px" },
//     btnDisabled: { padding: "12px", backgroundColor: "#94a3b8", color: "white", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "not-allowed", marginTop: "10px", fontSize: "16px" }
//   };



// import React, { useState } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import Header from "../components/Header";

// export default function AddPackZone() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     itemName: "",
//     category: "",
//     size: "", // Ab ye direct string hai (Excel friendly)
//     qty: 0,
//     costing: 0,
//     unit: "Piece",
//     minimumStock: 10,
//     description: "",
//     vendor: ""
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.category) return toast.error("Please select a category");
    
//     setLoading(true);
//     try {
//       await api.post("/packzone", form);
//       toast.success("Item created successfully!");
//       navigate("/packzone");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to create item");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <Header />
//       <div style={styles.mainContent}>
//         <div style={styles.card}>
//           <div style={styles.headerRow}>
//             <button onClick={() => navigate("/packzone")} style={styles.backBtn}>⬅ Back</button>
//             <h2 style={styles.title}>Add New Item</h2>
//           </div>

//           <form onSubmit={handleSubmit} style={styles.form}>
            
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Category <span style={styles.req}>*</span></label>
//               <select name="category" value={form.category} onChange={handleChange} style={styles.select} required>
//                 <option value="">Select Category...</option>
//                 <option value="Packaging Boxes">📦 Packaging Boxes</option>
//                 <option value="Branding Stickers">🏷️ Branding Stickers</option>
//                 <option value="Marketing Collateral">📜 Marketing Collateral</option>
//               </select>
//             </div>

//             <div style={styles.formGroup}>
//               <label style={styles.label}>Item Name <span style={styles.req}>*</span></label>
//               <input type="text" name="itemName" placeholder="e.g. Window Box" value={form.itemName} onChange={handleChange} style={styles.input} required />
//             </div>

//             <div style={styles.formGroup}>
//               <label style={styles.label}>Size <span style={styles.req}>*</span></label>
//               <input type="text" name="size" placeholder="e.g. 18*9*9 or 5 cm Diameter" value={form.size} onChange={handleChange} style={styles.input} required />
//               <small style={styles.subLabel}>Copy paste directly from Excel (e.g. 23*11*10)</small>
//             </div>

//             <div style={styles.grid2}>
//               <div style={styles.formGroup}>
//                 <label style={styles.label}>Vendor Name</label>
//                 <input type="text" name="vendor" placeholder="e.g. Mahadev Packaging" value={form.vendor} onChange={handleChange} style={styles.input} />
//               </div>
//               <div style={styles.formGroup}>
//                 <label style={styles.label}>Costing (per unit)</label>
//                 <input type="number" step="0.01" name="costing" value={form.costing} onChange={handleChange} style={styles.input} />
//               </div>
//             </div>

//             <div style={styles.grid2}>
//               <div style={styles.formGroup}>
//                 <label style={styles.label}>Stock Unit</label>
//                 <select name="unit" value={form.unit} onChange={handleChange} style={styles.select} required>
//                   <option value="Piece">Piece</option>
//                   <option value="Roll">Roll</option>
//                   <option value="Pack">Pack</option>
//                   <option value="Box">Box</option>
//                 </select>
//               </div>
//               <div style={styles.formGroup}>
//                 <label style={styles.label}>Initial Quantity</label>
//                 <input type="number" name="qty" value={form.qty} onChange={handleChange} style={styles.input} min="0" required />
//               </div>
//             </div>

//             <div style={styles.formGroup}>
//                 <label style={styles.label}>Minimum Stock (Alert Level)</label>
//                 <input type="number" name="minimumStock" value={form.minimumStock} onChange={handleChange} style={styles.input} min="0" required />
//             </div>

//             <button type="submit" style={loading ? styles.btnDisabled : styles.btnSubmit} disabled={loading}>
//               {loading ? "Creating..." : "Create Item"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
// // ... styles (unchanged)


// // Styles object same as before...
// const styles = {
//     container: { minHeight: "100vh", backgroundColor: "#f8fafc" },
//     mainContent: { maxWidth: "700px", margin: "40px auto", padding: "0 20px" },
//     card: { backgroundColor: "white", padding: "30px", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" },
//     headerRow: { display: "flex", alignItems: "center", marginBottom: "30px", gap: "20px" },
//     backBtn: { background: "none", border: "1px solid #e2e8f0", padding: "8px 16px", borderRadius: "8px", cursor: "pointer" },
//     title: { margin: 0, fontSize: "24px", color: "#1e293b" },
//     form: { display: "flex", flexDirection: "column", gap: "20px" },
//     formGroup: { display: "flex", flexDirection: "column", gap: "8px" },
//     grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" },
//     grid3: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" },
//     grid4: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "10px" },
//     label: { fontSize: "14px", fontWeight: "600", color: "#475569" },
//     subLabel: { fontSize: "12px", color: "#94a3b8", display: "block", marginBottom: "4px" },
//     req: { color: "#ef4444" },
//     input: { padding: "10px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px", width: "100%", boxSizing: "border-box" },
//     select: { padding: "10px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px", backgroundColor: "white", width: "100%", boxSizing: "border-box" },
//     btnSubmit: { padding: "12px", backgroundColor: "#3b82f6", color: "white", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer", marginTop: "10px", fontSize: "16px" },
//     btnDisabled: { padding: "12px", backgroundColor: "#94a3b8", color: "white", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "not-allowed", marginTop: "10px", fontSize: "16px" }
//   };


















import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Header from "../components/Header";

export default function AddPackZone() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // 👉 NAYA: Image Upload States
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    itemName: "",
    category: "",
    size: "", // Ab ye direct string hai (Excel friendly)
    qty: 0,
    costing: 0,
    unit: "Piece",
    minimumStock: 10,
    description: "",
    vendor: "",
    itemImage: "" // 👉 NAYA: Image URL store karne ke liye
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 👉 NAYA: Image Upload Handler
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
      
      const res = await api.post("/products/upload", imgData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      
      setForm((prev) => ({ ...prev, itemImage: res.data.url }));
      toast.success("Image uploaded!");
    } catch (err) {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.category) return toast.error("Please select a category");
    
    setLoading(true);
    try {
      await api.post("/packzone", form);
      toast.success("Item created successfully!");
      navigate("/packzone");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <Header />
      <div style={styles.mainContent}>
        <div style={styles.card}>
          <div style={styles.headerRow}>
            <button onClick={() => navigate("/packzone")} style={styles.backBtn}>⬅ Back</button>
            <h2 style={styles.title}>Add New Item</h2>
          </div>

          <form onSubmit={handleSubmit} style={styles.form}>
            
            {/* 👉 NAYA: Image Upload UI */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Item Image (Optional)</label>
              <div style={{
                border: "2px dashed #cbd5e1", borderRadius: "8px", padding: "15px", 
                textAlign: "center", position: "relative", backgroundColor: "#f8fafc",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                transition: "all 0.3s"
              }}>
                <input type="file" accept="image/*" onChange={handleImageSelect} disabled={uploading} 
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer" }} 
                />
                {preview ? (
                  <div>
                    <img src={preview} alt="Preview" style={{ maxWidth: "100px", maxHeight: "100px", borderRadius: "6px", objectFit: "cover", border: "1px solid #e2e8f0" }} />
                    <p style={{ fontSize: "11px", color: "#2563eb", margin: "5px 0 0", fontWeight: "600" }}>{uploading ? "Uploading..." : "Click to change"}</p>
                  </div>
                ) : (
                  <div>
                    <span style={{fontSize: "24px", display: "block", marginBottom: "5px"}}>📸</span>
                    <p style={{ margin: 0, color: "#64748b", fontSize: "13px", fontWeight: "500" }}>Click to upload image</p>
                  </div>
                )}
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Category <span style={styles.req}>*</span></label>
              <select name="category" value={form.category} onChange={handleChange} style={styles.select} required>
                <option value="">Select Category...</option>
                <option value="Packaging Boxes">📦 Packaging Boxes</option>
                <option value="Branding Stickers">🏷️ Branding Stickers</option>
                <option value="Marketing Collateral">📜 Marketing Collateral</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Item Name <span style={styles.req}>*</span></label>
              <input type="text" name="itemName" placeholder="e.g. Window Box" value={form.itemName} onChange={handleChange} style={styles.input} required />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Size <span style={styles.req}>*</span></label>
              <input type="text" name="size" placeholder="e.g. 18*9*9 or 5 cm Diameter" value={form.size} onChange={handleChange} style={styles.input} required />
              <small style={styles.subLabel}>Copy paste directly from Excel (e.g. 23*11*10)</small>
            </div>

            <div style={styles.grid2}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Vendor Name</label>
                <input type="text" name="vendor" placeholder="e.g. Mahadev Packaging" value={form.vendor} onChange={handleChange} style={styles.input} />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Costing (per unit)</label>
                <input type="number" step="0.01" name="costing" value={form.costing} onChange={handleChange} style={styles.input} />
              </div>
            </div>

            <div style={styles.grid2}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Stock Unit</label>
                <select name="unit" value={form.unit} onChange={handleChange} style={styles.select} required>
                  <option value="Piece">Piece</option>
                  <option value="Roll">Roll</option>
                  <option value="Pack">Pack</option>
                  <option value="Box">Box</option>
                </select>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Initial Quantity</label>
                <input type="number" name="qty" value={form.qty} onChange={handleChange} style={styles.input} min="0" required />
              </div>
            </div>

            <div style={styles.formGroup}>
                <label style={styles.label}>Minimum Stock (Alert Level)</label>
                <input type="number" name="minimumStock" value={form.minimumStock} onChange={handleChange} style={styles.input} min="0" required />
            </div>

            <button type="submit" style={loading ? styles.btnDisabled : styles.btnSubmit} disabled={loading}>
              {loading ? "Creating..." : "Create Item"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
    container: { minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "Inter, sans-serif" },
    mainContent: { maxWidth: "700px", margin: "40px auto", padding: "0 20px" },
    card: { backgroundColor: "white", padding: "30px", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" },
    headerRow: { display: "flex", alignItems: "center", marginBottom: "30px", gap: "20px" },
    backBtn: { background: "none", border: "1px solid #e2e8f0", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontWeight: "500" },
    title: { margin: 0, fontSize: "24px", color: "#1e293b", fontWeight: "700" },
    form: { display: "flex", flexDirection: "column", gap: "20px" },
    formGroup: { display: "flex", flexDirection: "column", gap: "8px" },
    grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" },
    label: { fontSize: "14px", fontWeight: "600", color: "#475569" },
    subLabel: { fontSize: "12px", color: "#94a3b8", display: "block", marginBottom: "4px" },
    req: { color: "#ef4444" },
    input: { padding: "10px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px", width: "100%", boxSizing: "border-box", outline: "none" },
    select: { padding: "10px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px", backgroundColor: "white", width: "100%", boxSizing: "border-box", outline: "none" },
    btnSubmit: { padding: "12px", backgroundColor: "#3b82f6", color: "white", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer", marginTop: "10px", fontSize: "16px", transition: "background 0.2s" },
    btnDisabled: { padding: "12px", backgroundColor: "#94a3b8", color: "white", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "not-allowed", marginTop: "10px", fontSize: "16px" }
};
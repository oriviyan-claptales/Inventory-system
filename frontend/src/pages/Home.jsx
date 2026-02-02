// // import React, { useState, useEffect, useRef } from "react";
// // import { useSelector } from "react-redux";
// // import api from "../api/axios";
// // import ProductList from "../components/ProductList";
// // import { useNavigate } from "react-router-dom";
// // import toast from "react-hot-toast";
// // import Header from "../components/Header";
// // import * as XLSX from "xlsx";

// // export default function Home() {
// //   const [products, setProducts] = useState([]);
// //   const [search, setSearch] = useState("");
// //   const [categoryFilter, setCategoryFilter] = useState("");
// //   const [showData, setShowData] = useState(false);
// //   const [loading, setLoading] = useState(false);

// //   const resultsRef = useRef(null);

// //   const user = useSelector((state) => state.user.userData);
// //   const navigate = useNavigate();

// //   const isAdmin = user?.userType === "admin";
// //   const isSuperUser = user?.userType === "superuser";
// //   const canEdit = isAdmin || isSuperUser;

// //   const fetchProducts = async () => {
// //     setLoading(true);
// //     try {
// //       const res = await api.get("/products");
// //       setProducts(res.data);
// //     } catch (err) {
// //       console.error("Fetch Error:", err);
// //       toast.error("Failed to fetch inventory");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // 👇 NEW FUNCTION: Sirf A-Z Allow karne ke liye
// //   const handleSearchInput = (e) => {
// //     const value = e.target.value;

// //     // Regex Check: Sirf a-z, A-Z aur Space allow karega
// //     if (/^[a-zA-Z\s]*$/.test(value)) {
// //       setSearch(value);
// //     } else {
// //       // Agar kuch aur type kiya to Warning dega
// //       toast.error("Only alphabets (A-Z) are allowed!");
// //     }
// //   };

// //   const handleSearch = async () => {
// //     if (!search.trim() && !categoryFilter) {
// //       return toast.error("Please enter a keyword or select a category");
// //     }
// //     await fetchProducts();
// //     setShowData(true);
// //   };
// //   // 👇 Ye naya code add kar do Auto-Search ke liye
// //   useEffect(() => {
// //     // Timer set kiya (e.g., 800ms = 0.8 seconds)
// //     const delayDebounceFn = setTimeout(() => {
// //       if (search.trim()) {
// //         handleSearch(); // Agar text hai to search call karo
// //       }
// //     }, 800); 

// //     // Cleanup function (agar user jaldi type kare to timer reset ho jaye)
// //     return () => clearTimeout(delayDebounceFn);
// //   }, [search]); // Jab bhi 'search' change hoga, ye chalega

// //   useEffect(() => {
// //     if (showData && resultsRef.current) {
// //       resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
// //     }
// //   }, [showData]);

// //   const filteredProducts = products.filter((p) => {
// //     const s = search.toLowerCase();
// //     const matchSearch =
// //       p.name.toLowerCase().includes(s) ||
// //       p.color.toLowerCase().includes(s) ||
// //       p.category.toLowerCase().includes(s);

// //     const matchCategory =
// //       !categoryFilter || categoryFilter === "All" || categoryFilter === ""
// //         ? true
// //         : p.category === categoryFilter;

// //     return matchSearch && matchCategory;
// //   });

// //   useEffect(() => {
// //     if (!search.trim() && !categoryFilter) {
// //       setShowData(false);
// //     }
// //   }, [search, categoryFilter]);

// //   const downloadExcel = () => {
// //     if (filteredProducts.length === 0) {
// //       return toast.error("No data to export");
// //     }

// //     const dataToExport = filteredProducts.map((p) => ({
// //       Name: p.name,
// //       SKU: p.sku,
// //       Category: p.category,
// //       Color: p.color,
// //       Size: p.size,
// //       Price: p.price,
// //       "Cost Price": canEdit ? p.costing_price : "N/A",
// //       Stock: p.Qty,
// //       Supplier: canEdit ? p.Supplier_name : "N/A",
// //       Status: p.Qty > 0 ? "In Stock" : "Out of Stock",
// //       "Product Image URL": p.img || "No Image",
// //       "Barcode Image URL": p.barcodeImg || "No Barcode"
// //     }));

// //     const worksheet = XLSX.utils.json_to_sheet(dataToExport);
// //     const workbook = XLSX.utils.book_new();
// //     XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory Data");

// //     XLSX.writeFile(workbook, "Inventory_With_Links.xlsx");
// //     toast.success("Excel downloaded with Image Links!");
// //   };

// //   return (
// //     <div style={styles.container}>

// //       <Header />

// //       <main style={styles.mainContent}>

// //         {/* 1️⃣ SEARCH SECTION */}
// //         <section style={styles.searchCard}>
// //           <h2 style={styles.sectionTitle}>Search Inventory</h2>
// //           <div style={styles.searchBarWrapper}>
            
// //             {/* 👇 INPUT CHANGE KIYA HAI */}
// //             <input
// //               type="text"
// //               placeholder="Search Name, Color, or Category..."
// //               value={search}
// //               onChange={handleSearchInput} // 👈 Naya function yahan lagaya
// //               style={styles.searchInput}
// //               onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
// //             />

// //             <select
// //               value={categoryFilter}
// //               onChange={(e) => setCategoryFilter(e.target.value)}
// //               style={styles.searchSelect}
// //             >
// //               <option value="">Select Category</option>
// //               <option value="All">All Categories</option>
// //               <option value="Die-cast">Die-cast</option>
// //               <option value="Remote Control">Remote Control</option>
// //               <option value="Soft Toy">Soft Toy</option>
// //               <option value="Board Game">Board Game</option>
// //               <option value="Scooter">Scooter</option>
// //             </select>

// //             <button onClick={handleSearch} disabled={loading} style={styles.searchBtn}>
// //               {loading ? "Searching..." : "🔍 Search"}
// //             </button>
// //           </div>
// //         </section>

// //         {/* 2️⃣ QUICK ACTIONS GRID */}
// //         {!showData && (
// //           <section style={styles.actionsSection}>
// //             <h3 style={styles.gridLabel}>Quick Actions</h3>
// //             <div style={styles.actionsGrid}>

// //               {canEdit && (
// //                 <div style={styles.actionCard} onClick={() => navigate("/add-product")}>
// //                   <div style={{ ...styles.iconCircle, background: "#dbeafe", color: "#2563eb" }}>➕</div>
// //                   <div style={styles.actionText}>
// //                     <h3>Add Product</h3>
// //                     <p>Create new inventory entry</p>
// //                   </div>
// //                 </div>
// //               )}

// //               <div style={styles.actionCard} onClick={() => navigate("/graphs")}>
// //                 <div style={{ ...styles.iconCircle, background: "#f3e8ff", color: "#9333ea" }}>📊</div>
// //                 <div style={styles.actionText}>
// //                   <h3>Analytics</h3>
// //                   <p>View visual data reports</p>
// //                 </div>
// //               </div>

// //               {isAdmin && (
// //                 <div style={styles.actionCard} onClick={() => navigate("/users")}>
// //                   <div style={{ ...styles.iconCircle, background: "#ffedd5", color: "#ea580c" }}>👤</div>
// //                   <div style={styles.actionText}>
// //                     <h3>Manage Users</h3>
// //                     <p>Admin controls & Staff</p>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
           
// //             {isAdmin && (
// //               <>
// //                 <div style={styles.actionsGrid} style={{ marginTop: '20px' }}> {/* Thoda gap diya */}
// //                     <div style={styles.actionCard} onClick={() => navigate("/logs")}>
// //                     <div style={{ ...styles.iconCircle, background: "#e0f2fe", color: "#0284c7" }}>📜</div>
// //                     <div style={styles.actionText}>
// //                         <h3>Audit Logs</h3>
// //                         <p>View System History</p>
// //                     </div>
// //                     </div>
// //                 </div>
// //               </>
// //             )}
// //           </section>
// //         )}

// //         {/* 3️⃣ SEARCH RESULTS */}
// //         {showData && (
// //           <section style={styles.resultsSection} ref={resultsRef}>
// //             <div style={styles.resultsHeader}>
// //               <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
// //                 <h4 style={styles.resultsTitle}>Search Results <span style={styles.countBadge}>({filteredProducts.length})</span></h4>

// //                 {filteredProducts.length > 0 && (
// //                   <button onClick={downloadExcel} style={styles.excelBtn} title="Download Excel">
// //                     📥 Export Excel
// //                   </button>
// //                 )}
// //               </div>

// //               <button onClick={() => setShowData(false)} style={styles.closeBtn}>
// //                 ✕ Close Results
// //               </button>
// //             </div>

// //             <div style={styles.listWrapper}>
// //               <ProductList
// //                 products={filteredProducts}
// //                 onEdit={() => toast("View details to edit")}
// //                 onDelete={async (id) => {
// //                   if (!canEdit) return toast.error("Access Denied");
// //                   if (window.confirm("Delete item?")) {
// //                     await api.delete(`/products/${id}`);
// //                     fetchProducts();
// //                     toast.success("Deleted");
// //                   }
// //                 }}
// //               />
// //             </div>
// //           </section>
// //         )}

// //       </main>
// //     </div>
// //   );
// // }

// // // ✨ STYLES (SAME AS BEFORE)
// // const styles = {
// //   container: {
// //     minHeight: "100vh",
// //     backgroundColor: "#f1f5f9",
// //     fontFamily: "'Inter', 'Segoe UI', sans-serif",
// //     display: "flex",
// //     flexDirection: "column",
// //   },
// //   mainContent: {
// //     padding: "30px 20px",
// //     width: "100%",
// //     maxWidth: "1200px",
// //     margin: "0 auto",
// //     boxSizing: "border-box",
// //     display: "flex",
// //     flexDirection: "column",
// //     gap: "25px",
// //   },
// //   searchCard: {
// //     backgroundColor: "#ffffff",
// //     padding: "25px 30px",
// //     borderRadius: "12px",
// //     boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
// //     border: "1px solid #e2e8f0",
// //   },
// //   sectionTitle: {
// //     margin: "0 0 15px 0",
// //     fontSize: "18px",
// //     fontWeight: "700",
// //     color: "#334155",
// //   },
// //   searchBarWrapper: {
// //     display: "flex",
// //     gap: "15px",
// //     flexWrap: "wrap",
// //     alignItems: "center",
// //   },
// //   searchInput: {
// //     flex: "2",
// //     minWidth: "250px",
// //     padding: "12px 15px",
// //     borderRadius: "8px",
// //     border: "1px solid #cbd5e1",
// //     fontSize: "15px",
// //     outline: "none",
// //     backgroundColor: "#f8fafc",
// //     transition: "border 0.2s",
// //   },
// //   searchSelect: {
// //     flex: "1",
// //     minWidth: "180px",
// //     padding: "12px 15px",
// //     borderRadius: "8px",
// //     border: "1px solid #cbd5e1",
// //     fontSize: "15px",
// //     outline: "none",
// //     cursor: "pointer",
// //     backgroundColor: "#fff",
// //   },
// //   searchBtn: {
// //     padding: "12px 25px",
// //     borderRadius: "8px",
// //     border: "none",
// //     backgroundColor: "#2563eb",
// //     color: "#fff",
// //     fontSize: "15px",
// //     fontWeight: "600",
// //     cursor: "pointer",
// //     boxShadow: "0 2px 4px rgba(37, 99, 235, 0.2)",
// //     transition: "background 0.2s",
// //   },
// //   actionsSection: {
// //     marginTop: "10px",
// //   },
// //   gridLabel: {
// //     fontSize: "14px",
// //     color: "#64748b",
// //     textTransform: "uppercase",
// //     letterSpacing: "0.5px",
// //     fontWeight: "700",
// //     marginBottom: "15px",
// //   },
// //   actionsGrid: {
// //     display: "grid",
// //     gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
// //     gap: "20px",
// //   },
// //   actionCard: {
// //     backgroundColor: "#ffffff",
// //     padding: "20px",
// //     borderRadius: "12px",
// //     boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
// //     cursor: "pointer",
// //     display: "flex",
// //     alignItems: "center",
// //     gap: "20px",
// //     border: "1px solid #e2e8f0",
// //     transition: "transform 0.2s, box-shadow 0.2s",
// //   },
// //   iconCircle: {
// //     width: "50px",
// //     height: "50px",
// //     borderRadius: "50%",
// //     display: "flex",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     fontSize: "24px",
// //     flexShrink: 0,
// //   },
// //   actionText: { textAlign: "left" },
// //   resultsSection: {
// //     backgroundColor: "#ffffff",
// //     borderRadius: "12px",
// //     boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
// //     border: "1px solid #e2e8f0",
// //     overflow: "hidden",
// //     marginTop: "20px",
// //   },
// //   resultsHeader: {
// //     padding: "15px 25px",
// //     borderBottom: "1px solid #f1f5f9",
// //     display: "flex",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     backgroundColor: "#ffffff",
// //   },
// //   resultsTitle: {
// //     margin: 0,
// //     fontSize: "18px",
// //     color: "#1e293b",
// //     fontWeight: "700",
// //   },
// //   countBadge: {
// //     color: "#64748b",
// //     fontWeight: "500",
// //     fontSize: "16px",
// //   },
// //   excelBtn: {
// //     backgroundColor: "#16a34a",
// //     color: "#fff",
// //     border: "none",
// //     padding: "8px 16px",
// //     borderRadius: "6px",
// //     cursor: "pointer",
// //     fontSize: "13px",
// //     fontWeight: "600",
// //     display: "flex",
// //     alignItems: "center",
// //     gap: "6px",
// //     transition: "background 0.2s",
// //   },
// //   closeBtn: {
// //     background: "transparent",
// //     border: "1px solid #ef4444",
// //     color: "#ef4444",
// //     padding: "6px 12px",
// //     borderRadius: "6px",
// //     cursor: "pointer",
// //     fontSize: "13px",
// //     fontWeight: "600",
// //     transition: "all 0.2s",
// //   },
// //   listWrapper: { padding: "0" }








// import React, { useState, useEffect, useRef } from "react";
// import { useSelector } from "react-redux";
// import api from "../api/axios";
// import ProductList from "../components/ProductList";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import Header from "../components/Header";
// import * as XLSX from "xlsx";

// export default function Home() {
//   // 👇 STATE KO SESSION STORAGE SE INITIALIZE KIYA
//   const [products, setProducts] = useState(() => {
//     const saved = sessionStorage.getItem("home_products");
//     return saved ? JSON.parse(saved) : [];
//   });

//   const [search, setSearch] = useState(() => sessionStorage.getItem("home_search") || "");
//   const [categoryFilter, setCategoryFilter] = useState(() => sessionStorage.getItem("home_filter") || "");
  
//   const [showData, setShowData] = useState(() => {
//     return sessionStorage.getItem("home_showData") === "true";
//   });

//   const [loading, setLoading] = useState(false);
//   const resultsRef = useRef(null);

//   const user = useSelector((state) => state.user.userData);
//   const navigate = useNavigate();

//   const isAdmin = user?.userType === "admin";
//   const isSuperUser = user?.userType === "superuser";
//   const canEdit = isAdmin || isSuperUser;

//   // 👇 JAB BHI STATE CHANGE HO, SESSION STORAGE ME SAVE KARO
//   useEffect(() => {
//     sessionStorage.setItem("home_search", search);
//     sessionStorage.setItem("home_filter", categoryFilter);
//     sessionStorage.setItem("home_products", JSON.stringify(products));
//     sessionStorage.setItem("home_showData", showData);
//   }, [search, categoryFilter, products, showData]);

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get("/products");
//       setProducts(res.data);
//       // Note: Data yaha set hoga to upar wala useEffect khud save kar lega
//     } catch (err) {
//       console.error("Fetch Error:", err);
//       toast.error("Failed to fetch inventory");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearchInput = (e) => {
//     const value = e.target.value;
//     if (/^[a-zA-Z\s]*$/.test(value)) {
//       setSearch(value);
//     } else {
//       toast.error("Only alphabets (A-Z) are allowed!");
//     }
//   };

//   const handleSearch = async () => {
//     if (!search.trim() && !categoryFilter) {
//       return toast.error("Please enter a keyword or select a category");
//     }
//     await fetchProducts();
//     setShowData(true);
//   };

//   useEffect(() => {
//     const delayDebounceFn = setTimeout(() => {
//       // Sirf tab search kare agar search text hai aur pehle se data loaded nahi hai (optional optimization)
//       if (search.trim()) {
//         handleSearch();
//       }
//     }, 800); 
//     return () => clearTimeout(delayDebounceFn);
//   }, [search]); 

//   // Auto Scroll to results if showing data on mount
//   useEffect(() => {
//     if (showData && resultsRef.current) {
//       // Thoda delay diya taaki render hone ke baad scroll ho
//       setTimeout(() => {
//          resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
//       }, 100);
//     }
//   }, [showData]);

//   const filteredProducts = products.filter((p) => {
//     const s = search.toLowerCase();
//     const matchSearch =
//       p.name.toLowerCase().includes(s) ||
//       p.color.toLowerCase().includes(s) ||
//       p.category.toLowerCase().includes(s);

//     const matchCategory =
//       !categoryFilter || categoryFilter === "All" || categoryFilter === ""
//         ? true
//         : p.category === categoryFilter;

//     return matchSearch && matchCategory;
//   });

//   // Agar user sab kuch clear kar de to results hata do
//   useEffect(() => {
//     if (!search.trim() && !categoryFilter) {
//       // Lekin agar pehle se data tha aur user wapas aaya hai, to turant hide mat karo jab tak wo clear na kare
//       // Is logic ko adjust kiya taaki wapas aane par data gayab na ho
//        if(search === "" && categoryFilter === "" && !sessionStorage.getItem("home_showData")){
//           setShowData(false);
//        }
//     }
//   }, [search, categoryFilter]);

//   // Reset Function (Optional: Agar user manually sab clear karna chahe)
//   const clearAll = () => {
//       setSearch("");
//       setCategoryFilter("");
//       setShowData(false);
//       setProducts([]);
//       sessionStorage.removeItem("home_search");
//       sessionStorage.removeItem("home_filter");
//       sessionStorage.removeItem("home_products");
//       sessionStorage.removeItem("home_showData");
//   };

//   const downloadExcel = () => {
//     if (filteredProducts.length === 0) {
//       return toast.error("No data to export");
//     }
//     const dataToExport = filteredProducts.map((p) => ({
//       Name: p.name,
//       SKU: p.sku,
//       Category: p.category,
//       Color: p.color,
//       Size: p.size,
//       Price: p.price,
//       "Cost Price": canEdit ? p.costing_price : "N/A",
//       Stock: p.Qty,
//       Supplier: canEdit ? p.Supplier_name : "N/A",
//       Status: p.Qty > 0 ? "In Stock" : "Out of Stock",
//       "Product Image URL": p.img || "No Image",
//       "Barcode Image URL": p.barcodeImg || "No Barcode"
//     }));
//     const worksheet = XLSX.utils.json_to_sheet(dataToExport);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory Data");
//     XLSX.writeFile(workbook, "Inventory_With_Links.xlsx");
//     toast.success("Excel downloaded with Image Links!");
//   };

//   return (
//     <div style={styles.container}>
//       <Header />
//       <main style={styles.mainContent}>

//         {/* 1️⃣ SEARCH SECTION */}
//         <section style={styles.searchCard}>
//           <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
//              <h2 style={styles.sectionTitle}>Search Inventory</h2>
//              {/* Clear Button added just in case */}
//              {(search || categoryFilter || showData) && (
//                  <button onClick={clearAll} style={{...styles.closeBtn, border:'none', fontSize:'12px'}}>Reset Search</button>
//              )}
//           </div>
          
//           <div style={styles.searchBarWrapper}>
//             <input
//               type="text"
//               placeholder="Search Name, Color, or Category..."
//               value={search}
//               onChange={handleSearchInput}
//               style={styles.searchInput}
//               onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
//             />

//             <select
//               value={categoryFilter}
//               onChange={(e) => setCategoryFilter(e.target.value)}
//               style={styles.searchSelect}
//             >
//               <option value="">Select Category</option>
//               <option value="All">All Categories</option>
//               <option value="Die-cast">Die-cast</option>
//               <option value="Remote Control">Remote Control</option>
//               <option value="Soft Toy">Soft Toy</option>
//               <option value="Board Game">Board Game</option>
//               <option value="Scooter">Scooter</option>
//             </select>

//             <button onClick={handleSearch} disabled={loading} style={styles.searchBtn}>
//               {loading ? "Searching..." : "🔍 Search"}
//             </button>
//           </div>
//         </section>

//         {/* 2️⃣ QUICK ACTIONS GRID - Hide if showing data */}
//         {!showData && (
//           <section style={styles.actionsSection}>
//             <h3 style={styles.gridLabel}>Quick Actions</h3>
//             <div style={styles.actionsGrid}>
//               {canEdit && (
//                 <div style={styles.actionCard} onClick={() => navigate("/add-product")}>
//                   <div style={{ ...styles.iconCircle, background: "#dbeafe", color: "#2563eb" }}>➕</div>
//                   <div style={styles.actionText}>
//                     <h3>Add Product</h3>
//                     <p>Create new inventory entry</p>
//                   </div>
//                 </div>
//               )}
//               <div style={styles.actionCard} onClick={() => navigate("/graphs")}>
//                 <div style={{ ...styles.iconCircle, background: "#f3e8ff", color: "#9333ea" }}>📊</div>
//                 <div style={styles.actionText}>
//                   <h3>Analytics</h3>
//                   <p>View visual data reports</p>
//                 </div>
//               </div>
//               {isAdmin && (
//                 <div style={styles.actionCard} onClick={() => navigate("/users")}>
//                   <div style={{ ...styles.iconCircle, background: "#ffedd5", color: "#ea580c" }}>👤</div>
//                   <div style={styles.actionText}>
//                     <h3>Manage Users</h3>
//                     <p>Admin controls & Staff</p>
//                   </div>
//                 </div>
//               )}
//             </div>
//              {isAdmin && (
//               <div style={{...styles.actionsGrid, marginTop: '20px' }}>
//                   <div style={styles.actionCard} onClick={() => navigate("/logs")}>
//                   <div style={{ ...styles.iconCircle, background: "#e0f2fe", color: "#0284c7" }}>📜</div>
//                   <div style={styles.actionText}>
//                       <h3>Audit Logs</h3>
//                       <p>View System History</p>
//                   </div>
//                   </div>
//               </div>
//             )}
//           </section>
//         )}

//         {/* 3️⃣ SEARCH RESULTS */}
//         {showData && (
//           <section style={styles.resultsSection} ref={resultsRef}>
//             <div style={styles.resultsHeader}>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
//                 <h4 style={styles.resultsTitle}>Search Results <span style={styles.countBadge}>({filteredProducts.length})</span></h4>

//                 {filteredProducts.length > 0 && (
//                   <button onClick={downloadExcel} style={styles.excelBtn} title="Download Excel">
//                     📥 Export Excel
//                   </button>
//                 )}
//               </div>

//               <button onClick={clearAll} style={styles.closeBtn}>
//                 ✕ Close Results
//               </button>
//             </div>

//             <div style={styles.listWrapper}>
//               <ProductList
//                 products={filteredProducts}
//                 onEdit={() => toast("View details to edit")}
//                 onDelete={async (id) => {
//                   if (!canEdit) return toast.error("Access Denied");
//                   if (window.confirm("Delete item?")) {
//                     await api.delete(`/products/${id}`);
//                     fetchProducts();
//                     toast.success("Deleted");
//                   }
//                 }}
//               />
//             </div>
//           </section>
//         )}

//       </main>
//     </div>
//   );
// }

// // STYLES SAME AS BEFORE...
// const styles = {
//     // ... (Aapke purane styles yaha rahenge)
//     container: { minHeight: "100vh", backgroundColor: "#f1f5f9", fontFamily: "'Inter', 'Segoe UI', sans-serif", display: "flex", flexDirection: "column" },
//     mainContent: { padding: "30px 20px", width: "100%", maxWidth: "1200px", margin: "0 auto", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "25px" },
//     searchCard: { backgroundColor: "#ffffff", padding: "25px 30px", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)", border: "1px solid #e2e8f0" },
//     sectionTitle: { margin: "0 0 15px 0", fontSize: "18px", fontWeight: "700", color: "#334155" },
//     searchBarWrapper: { display: "flex", gap: "15px", flexWrap: "wrap", alignItems: "center" },
//     searchInput: { flex: "2", minWidth: "250px", padding: "12px 15px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "15px", outline: "none", backgroundColor: "#f8fafc", transition: "border 0.2s" },
//     searchSelect: { flex: "1", minWidth: "180px", padding: "12px 15px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "15px", outline: "none", cursor: "pointer", backgroundColor: "#fff" },
//     searchBtn: { padding: "12px 25px", borderRadius: "8px", border: "none", backgroundColor: "#2563eb", color: "#fff", fontSize: "15px", fontWeight: "600", cursor: "pointer", boxShadow: "0 2px 4px rgba(37, 99, 235, 0.2)", transition: "background 0.2s" },
//     actionsSection: { marginTop: "10px" },
//     gridLabel: { fontSize: "14px", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: "700", marginBottom: "15px" },
//     actionsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" },
//     actionCard: { backgroundColor: "#ffffff", padding: "20px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", cursor: "pointer", display: "flex", alignItems: "center", gap: "20px", border: "1px solid #e2e8f0", transition: "transform 0.2s, box-shadow 0.2s" },
//     iconCircle: { width: "50px", height: "50px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", flexShrink: 0 },
//     actionText: { textAlign: "left" },
//     resultsSection: { backgroundColor: "#ffffff", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)", border: "1px solid #e2e8f0", overflow: "hidden", marginTop: "20px" },
//     resultsHeader: { padding: "15px 25px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#ffffff" },
//     resultsTitle: { margin: 0, fontSize: "18px", color: "#1e293b", fontWeight: "700" },
//     countBadge: { color: "#64748b", fontWeight: "500", fontSize: "16px" },
//     excelBtn: { backgroundColor: "#16a34a", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: "600", display: "flex", alignItems: "center", gap: "6px", transition: "background 0.2s" },
//     closeBtn: { background: "transparent", border: "1px solid #ef4444", color: "#ef4444", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: "600", transition: "all 0.2s" },
//     listWrapper: { padding: "0" }
// };
// // };








import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import api from "../api/axios";
import ProductList from "../components/ProductList";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Header from "../components/Header";
import * as XLSX from "xlsx";
import ImportModal from "../components/ImportModal"; 
import ImageUploadModal from "../components/ImageUploadModal"; 

export default function Home() {
  const [products, setProducts] = useState(() => {
    const saved = sessionStorage.getItem("home_products");
    return saved ? JSON.parse(saved) : [];
  });

  const [search, setSearch] = useState(() => sessionStorage.getItem("home_search") || "");
  const [categoryFilter, setCategoryFilter] = useState(() => sessionStorage.getItem("home_filter") || "");
  const [showData, setShowData] = useState(() => sessionStorage.getItem("home_showData") === "true");
  const [loading, setLoading] = useState(false);
  
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false); 

  const resultsRef = useRef(null);
  const user = useSelector((state) => state.user.userData);
  const navigate = useNavigate();

  const isAdmin = user?.userType === "admin";
  const isSuperUser = user?.userType === "superuser";
  const canEdit = isAdmin || isSuperUser;

  useEffect(() => {
    sessionStorage.setItem("home_search", search);
    sessionStorage.setItem("home_filter", categoryFilter);
    sessionStorage.setItem("home_products", JSON.stringify(products));
    sessionStorage.setItem("home_showData", showData);
  }, [search, categoryFilter, products, showData]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      toast.error("Failed to fetch inventory");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchInput = (e) => {
    const value = e.target.value;
    // SKU me dash (-) ya numbers hote hain, isliye ye validation theek hai
    if (/^[a-zA-Z0-9\s-]*$/.test(value)) {  
      setSearch(value);
    } else {
      toast.error("Only alphabets and numbers are allowed!");
    }
  };

  const handleSearch = async () => {
    if (!search.trim() && !categoryFilter) {
      return toast.error("Please enter a keyword or select a category");
    }
    await fetchProducts();
    setShowData(true);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search.trim()) handleSearch();
    }, 800); 
    return () => clearTimeout(delayDebounceFn);
  }, [search]); 

  useEffect(() => {
    if (showData && resultsRef.current) {
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }
  }, [showData]);

  // 🔥 FIX 1: Search Logic Updated (Added SKU support)
  const filteredProducts = products.filter((p) => {
    const s = search.toLowerCase();
    
    // Check if SKU exists before converting to lowerCase to prevent crash
    const skuMatch = p.sku ? p.sku.toLowerCase().includes(s) : false;
    // ✅ NAYA: Supplier/Vendor matching logic
  const supplierMatch = p.Supplier_name ? p.Supplier_name.toLowerCase().includes(s) : false;

    const matchSearch = 
        p.name.toLowerCase().includes(s) || 
        p.color.toLowerCase().includes(s) || 
        p.category.toLowerCase().includes(s) ||
        skuMatch || 
      supplierMatch; // ✅ Ab SKU bhi search hoga

    const matchCategory = !categoryFilter || categoryFilter === "All" || categoryFilter === "" ? true : p.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  useEffect(() => {
    if (!search.trim() && !categoryFilter && search === "" && categoryFilter === "" && !sessionStorage.getItem("home_showData")) {
      setShowData(false);
    }
  }, [search, categoryFilter]);

  const clearAll = () => {
    setSearch(""); setCategoryFilter(""); setShowData(false); setProducts([]);
    sessionStorage.removeItem("home_search"); sessionStorage.removeItem("home_filter");
    sessionStorage.removeItem("home_products"); sessionStorage.removeItem("home_showData");
  };

  // 🔥 FIX 2: Excel Export Logic Updated (Added Description & GST)
  const downloadExcel = () => {
    if (filteredProducts.length === 0) return toast.error("No data to export");
    
    const dataToExport = filteredProducts.map((p) => ({
      Name: p.name, 
      SKU: p.sku, 
      Description: p.description || "-", // ✅ Added Description
      Category: p.category, 
      Color: p.color, 
      Size: p.size,
      Price: p.price, 
      GST: p.gst ? `${p.gst}%` : "0%", // ✅ Added GST with % sign
      "Cost Price": canEdit ? p.costing_price : "N/A", 
      Stock: p.Qty,
      Supplier: canEdit ? p.Supplier_name : "N/A", 
      Status: p.Qty > 0 ? "In Stock" : "Out of Stock",
      "Product Image URL": p.img || "No Image", 
      "Barcode Image URL": p.barcodeImg || "No Barcode"
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory Data");
    XLSX.writeFile(workbook, "Inventory_With_Links.xlsx");
    toast.success("Excel downloaded!");
  };

  return (
    <div style={styles.container}>
      <Header />
      
      <ImportModal 
        isOpen={isImportModalOpen} 
        onClose={() => setIsImportModalOpen(false)}
        onSuccess={() => { fetchProducts(); setShowData(true); }} 
      />

      <ImageUploadModal 
        isOpen={isImageModalOpen} 
        onClose={() => setIsImageModalOpen(false)} 
      />

      <main style={styles.mainContent}>

        {/* 1️⃣ SEARCH SECTION */}
        <section style={styles.searchCard}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: '15px'}}>
             <h2 style={styles.sectionTitle}>Search Inventory</h2>
             
             <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                
                {canEdit && (
                  <>
                    <button 
                      onClick={() => setIsImageModalOpen(true)} 
                      style={styles.imageToolBtn} 
                      title="Upload Image & Get URL"
                    >
                      📷 Get Img URL
                    </button>

                    <button 
                      onClick={() => setIsImportModalOpen(true)}
                      style={styles.importBtn}
                    >
                      📤 Import Excel
                    </button>
                  </>
                )}

                {(search || categoryFilter || showData) && (
                   <button onClick={clearAll} style={{...styles.closeBtn, border:'none', fontSize:'12px'}}>Reset Search</button>
                )}
             </div>
          </div>
          
          <div style={styles.searchBarWrapper}>
            <input 
              type="text" 
              placeholder="Search Name, SKU, Color..." 
              value={search} 
              onChange={handleSearchInput} 
              style={styles.searchInput} 
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()} 
            />
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} style={styles.searchSelect}>
              <option value="">Select Category</option><option value="All">All Categories</option>
              <option value="Die-cast">Die-cast</option><option value="Remote Control">Remote Control</option>
              <option value="Soft Toy">Soft Toy</option><option value="Board Game">Board Game</option>
              <option value="Scooter">Scooter</option>
              <option value="Gun">Gun</option>
            </select>
            <button onClick={handleSearch} disabled={loading} style={styles.searchBtn}>{loading ? "Searching..." : "🔍 Search"}</button>
          </div>
        </section>

        {/* ... Rest of your component remains exactly same ... */}
        {/* 2️⃣ QUICK ACTIONS GRID */}
        {!showData && (
          <section style={styles.actionsSection}>
            <h3 style={styles.gridLabel}>Quick Actions</h3>
            <div style={styles.actionsGrid}>
              {canEdit && (
                <div style={styles.actionCard} onClick={() => navigate("/add-product")}>
                  <div style={{ ...styles.iconCircle, background: "#dbeafe", color: "#2563eb" }}>➕</div>
                  <div style={styles.actionText}><h3>Add Product</h3><p>Create new inventory entry</p></div>
                </div>
              )}
              <div style={styles.actionCard} onClick={() => navigate("/graphs")}>
                <div style={{ ...styles.iconCircle, background: "#f3e8ff", color: "#9333ea" }}>📊</div>
                <div style={styles.actionText}><h3>Analytics</h3><p>View visual data reports</p></div>
              </div>
              {isAdmin && (
                <div style={styles.actionCard} onClick={() => navigate("/users")}>
                  <div style={{ ...styles.iconCircle, background: "#ffedd5", color: "#ea580c" }}>👤</div>
                  <div style={styles.actionText}><h3>Manage Users</h3><p>Admin controls & Staff</p></div>
                </div>
              )}
            </div>
             {isAdmin && (
              <div style={{...styles.actionsGrid, marginTop: '20px' }}>
                  <div style={styles.actionCard} onClick={() => navigate("/logs")}>
                  <div style={{ ...styles.iconCircle, background: "#e0f2fe", color: "#0284c7" }}>📜</div>
                  <div style={styles.actionText}><h3>Audit Logs</h3><p>View System History</p></div>
                  </div>
              </div>
            )}
          </section>
        )}

        {/* 3️⃣ SEARCH RESULTS */}
        {showData && (
          <section style={styles.resultsSection} ref={resultsRef}>
            <div style={styles.resultsHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <h4 style={styles.resultsTitle}>Search Results <span style={styles.countBadge}>({filteredProducts.length})</span></h4>
                {filteredProducts.length > 0 && <button onClick={downloadExcel} style={styles.excelBtn} title="Download Excel">📥 Export Excel</button>}
              </div>
              <button onClick={clearAll} style={styles.closeBtn}>✕ Close Results</button>
            </div>
            <div style={styles.listWrapper}>
              <ProductList
                products={filteredProducts}
                onEdit={() => toast("View details to edit")}
                onDelete={async (id) => {
                  if (!canEdit) return toast.error("Access Denied");
                  if (window.confirm("Delete item?")) {
                    await api.delete(`/products/${id}`);
                    fetchProducts();
                    toast.success("Deleted");
                  }
                }}
              />
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

// STYLES
const styles = {
    // ... (Baki purane styles same) ...
    container: { minHeight: "100vh", backgroundColor: "#f1f5f9", fontFamily: "'Inter', 'Segoe UI', sans-serif", display: "flex", flexDirection: "column" },
    mainContent: { padding: "30px 20px", width: "100%", maxWidth: "1200px", margin: "0 auto", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "25px" },
    searchCard: { backgroundColor: "#ffffff", padding: "25px 30px", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)", border: "1px solid #e2e8f0" },
    sectionTitle: { margin: "0", fontSize: "18px", fontWeight: "700", color: "#334155" },
    
    // 👇 New Styles Added
    importBtn: {
      backgroundColor: "#ea580c",
      color: "white",
      border: "none",
      padding: "8px 14px",
      borderRadius: "6px",
      fontSize: "12px",
      fontWeight: "600",
      cursor: "pointer",
      display: "flex", alignItems: "center", gap: "5px", transition: "background 0.2s"
    },
    imageToolBtn: {
      backgroundColor: "#0ea5e9", // Sky Blue
      color: "white",
      border: "none",
      padding: "8px 14px",
      borderRadius: "6px",
      fontSize: "12px",
      fontWeight: "600",
      cursor: "pointer",
      display: "flex", alignItems: "center", gap: "5px", transition: "background 0.2s"
    },

    searchBarWrapper: { display: "flex", gap: "15px", flexWrap: "wrap", alignItems: "center" },
    searchInput: { flex: "2", minWidth: "250px", padding: "12px 15px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "15px", outline: "none", backgroundColor: "#f8fafc", transition: "border 0.2s" },
    searchSelect: { flex: "1", minWidth: "180px", padding: "12px 15px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "15px", outline: "none", cursor: "pointer", backgroundColor: "#fff" },
    searchBtn: { padding: "12px 25px", borderRadius: "8px", border: "none", backgroundColor: "#2563eb", color: "#fff", fontSize: "15px", fontWeight: "600", cursor: "pointer", boxShadow: "0 2px 4px rgba(37, 99, 235, 0.2)", transition: "background 0.2s" },
    actionsSection: { marginTop: "10px" },
    gridLabel: { fontSize: "14px", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: "700", marginBottom: "15px" },
    actionsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" },
    actionCard: { backgroundColor: "#ffffff", padding: "20px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", cursor: "pointer", display: "flex", alignItems: "center", gap: "20px", border: "1px solid #e2e8f0", transition: "transform 0.2s, box-shadow 0.2s" },
    iconCircle: { width: "50px", height: "50px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", flexShrink: 0 },
    actionText: { textAlign: "left" },
    resultsSection: { backgroundColor: "#ffffff", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)", border: "1px solid #e2e8f0", overflow: "hidden", marginTop: "20px" },
    resultsHeader: { padding: "15px 25px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#ffffff" },
    resultsTitle: { margin: 0, fontSize: "18px", color: "#1e293b", fontWeight: "700" },
    countBadge: { color: "#64748b", fontWeight: "500", fontSize: "16px" },
    excelBtn: { backgroundColor: "#16a34a", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: "600", display: "flex", alignItems: "center", gap: "6px", transition: "background 0.2s" },
    closeBtn: { background: "transparent", border: "1px solid #ef4444", color: "#ef4444", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: "600", transition: "all 0.2s" },
    listWrapper: { padding: "0" }
};

// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom"; // Navigation ke liye

// // function ProductList({ products }) {
// //   const [view, setView] = useState("table");
// //   const navigate = useNavigate();

// //   // Detail Page par jaane ka function
// //   const handleView = (id) => {
// //     navigate(`/product/${id}`);
// //   };

// //   return (
// //     <div style={{ padding: "10px" }}>
// //       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
// //         <h2>📦 Products ({products.length})</h2>
// //         <button
// //           style={styles.toggleBtn}
// //           onClick={() => setView(view === "table" ? "box" : "table")}
// //         >
// //           {view === "table" ? "Show Grid View" : "Show Table View"}
// //         </button>
// //       </div>

// //       {view === "table" ? (
// //         <div style={styles.tableWrapper}>
// //           <table style={styles.table}>
// //             <thead>
// //               <tr>
// //                 <th style={styles.th}>S.No.</th>
// //                 <th style={styles.th}>Image</th>
// //                 <th style={styles.th}>Name</th>
// //                 <th style={styles.th}>SKU</th>
// //                 <th style={styles.th}>Category</th>
// //                 <th style={styles.th}>Price</th>
// //                 <th style={styles.th}>Qty</th>
// //                 <th style={styles.th}>Actions</th>
// //               </tr>
// //             </thead>

// //             <tbody>
// //               {products.map((product, index) => (
// //                 <tr key={product._id} style={styles.row}>
// //                   <td style={styles.td}>{index + 1}</td>
                  
// //                   {/* Image Column */}
// //                   <td style={styles.td}>
// //                     {product.img ? (
// //                       <img
// //                         src={product.img}
// //                         alt={product.name}
// //                         style={{ width: "40px", height: "40px", borderRadius: "4px", objectFit: "cover" }}
// //                       />
// //                     ) : "-"}
// //                   </td>

// //                   {/* Name Clickable */}
// //                   <td style={styles.td}>
// //                     <b 
// //                       style={{ color: "#1976D2", cursor: "pointer" }} 
// //                       onClick={() => handleView(product._id)}
// //                     >
// //                       {product.name}
// //                     </b>
// //                   </td>

// //                   <td style={styles.td}>{product.sku}</td>
// //                   <td style={styles.td}>{product.category}</td>
// //                   <td style={styles.td}>₹{product.price}</td>
                  
// //                   {/* Qty with Color Logic */}
// //                   <td style={styles.td}>
// //                     <span style={{ 
// //                         padding: "2px 6px", 
// //                         borderRadius: "4px",
// //                         background: product.Qty < 5 ? "#ffebee" : "#e8f5e9",
// //                         color: product.Qty < 5 ? "red" : "green",
// //                         fontWeight: "bold"
// //                     }}>
// //                       {product.Qty}
// //                     </span>
// //                   </td>

// //                   <td style={styles.td}>
// //                     <button onClick={() => handleView(product._id)} style={styles.viewBtn}>View</button>
// //                     {/* <button onClick={() => onEdit(product)} style={styles.editBtn}>Edit</button>
// //                     <button onClick={() => onDelete(product._id)} style={styles.delBtn}>Del</button> */}
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       ) : (
// //         // GRID VIEW (Simple Cards)
// //         <div style={styles.grid}>
// //           {products.map((product) => (
// //             <div key={product._id} style={styles.card} onClick={() => handleView(product._id)}>
// //               {product.img && (
// //                 <img src={product.img} alt={product.name} style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }} />
// //               )}
// //               <h4 style={{ margin: "10px 0 5px 0" }}>{product.name}</h4>
// //               <p style={{ margin: 0, color: "#666" }}>SKU: {product.sku}</p>
// //               <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
// //                 <b>₹{product.price}</b>
// //                 <span style={{ color: product.Qty < 5 ? "red" : "green" }}>Qty: {product.Qty}</span>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // const styles = {
// //   toggleBtn: { padding: "8px 15px", background: "#1976D2", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "13px" },
// //   tableWrapper: { maxHeight: "75vh", overflow: "auto", border: "1px solid #d0d0d0", borderRadius: "8px", background: "#fff" },
// //   table: { width: "100%", borderCollapse: "collapse" },
// //   th: { padding: "12px 10px", background: "#f1f3f4", textAlign: "left", fontWeight: "600", borderBottom: "2px solid #ddd", position: "sticky", top: 0 },
// //   td: { padding: "10px", borderBottom: "1px solid #eee", fontSize: "14px" },
// //   row: { background: "#fff" },
// //   viewBtn: { marginRight: "5px", padding: "5px 10px", background: "#2196F3", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" },
// //   editBtn: { marginRight: "5px", padding: "5px 10px", background: "#FF9800", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" },
// //   delBtn: { padding: "5px 10px", background: "#E53935", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" },
// //   grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" },
// //   card: { padding: "10px", border: "1px solid #e0e0e0", borderRadius: "8px", background: "#fff", cursor: "pointer", transition: "0.2s" },
// // };

// // export default ProductList;






























// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";

// // function ProductList({ products }) {
// //   const [view, setView] = useState("table");
// //   const navigate = useNavigate();

// //   const handleView = (id) => {
// //     navigate(`/product/${id}`);
// //   };

// //   return (
// //     <div style={{ padding: "0 10px" }}> {/* Side padding rakhi, top/bottom hata di */}
      
// //       {/* HEADER SECTION */}
// //       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px", marginTop: "10px" }}>
// //         <h3 style={{ margin: 0, fontSize: "18px", color: "#333" }}>📦 Products ({products.length})</h3>
// //         <button
// //           style={styles.toggleBtn}
// //           onClick={() => setView(view === "table" ? "box" : "table")}
// //         >
// //           {view === "table" ? "Show Grid" : "Show Table"}
// //         </button>
// //       </div>

// //       {view === "table" ? (
// //         <div style={styles.tableWrapper}>
// //           <table style={styles.table}>
// //             <thead>
// //               <tr>
// //                 <th style={styles.th}>S no.</th>
// //                 <th style={styles.th}>Img</th>
// //                 <th style={styles.th}>Name</th>
// //                 <th style={styles.th}>SKU</th>
// //                 <th style={styles.th}>Cat.</th>
// //                 <th style={styles.th}>Price</th>
// //                 <th style={styles.th}>Qty</th>
// //                 <th style={styles.th}>Action</th>
// //               </tr>
// //             </thead>

// //             <tbody>
// //               {products.map((product, index) => (
// //                 <tr key={product._id} style={styles.row}>
// //                   <td style={styles.td}>{index + 1}</td>
                  
// //                   {/* Image Choti kar di (32px) */}
// //                   <td style={styles.td}>
// //                     {product.img ? (
// //                       <img
// //                         src={product.img}
// //                         alt={product.name}
// //                         style={{ width: "32px", height: "32px", borderRadius: "4px", objectFit: "cover", display: "block" }}
// //                       />
// //                     ) : "-"}
// //                   </td>

// //                   <td style={styles.td}>
// //                     <b 
// //                       style={{ color: "#1976D2", cursor: "pointer", fontSize: "13px" }} 
// //                       onClick={() => handleView(product._id)}
// //                     >
// //                       {product.name}
// //                     </b>
// //                   </td>

// //                   <td style={{...styles.td, fontSize: "12px", color: "#555"}}>{product.sku}</td>
// //                   <td style={styles.td}>{product.category}</td>
// //                   <td style={styles.td}>₹{product.price}</td>
                  
// //                   <td style={styles.td}>
// //                     <span style={{ 
// //                         padding: "1px 6px", 
// //                         borderRadius: "3px",
// //                         fontSize: "11px", // Font chota kiya badge ka
// //                         background: product.Qty < 5 ? "#ffebee" : "#e8f5e9",
// //                         color: product.Qty < 5 ? "red" : "green",
// //                         fontWeight: "bold",
// //                         border: product.Qty < 5 ? "1px solid #ffcdd2" : "1px solid #c8e6c9"
// //                     }}>
// //                       {product.Qty}
// //                     </span>
// //                   </td>

// //                   <td style={styles.td}>
// //                     <button onClick={() => handleView(product._id)} style={styles.viewBtn}>View</button>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       ) : (
// //         // GRID VIEW COMPACT
// //         <div style={styles.grid}>
// //           {products.map((product) => (
// //             <div key={product._id} style={styles.card} onClick={() => handleView(product._id)}>
// //               {product.img && (
// //                 <img src={product.img} alt={product.name} style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "6px" }} />
// //               )}
// //               <h5 style={{ margin: "8px 0 4px 0", fontSize: "14px" }}>{product.name}</h5>
// //               <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
// //                 <b>₹{product.price}</b>
// //                 <span style={{ color: product.Qty < 5 ? "red" : "green" }}>Qty: {product.Qty}</span>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // // ✨ COMPACT STYLES
// // const styles = {
// //   toggleBtn: { padding: "5px 10px", background: "#1976D2", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "12px" },
  
// //   tableWrapper: { maxHeight: "80vh", overflow: "auto", border: "1px solid #e0e0e0", borderRadius: "6px", background: "#fff", boxShadow: "0 2px 5px rgba(0,0,0,0.05)" },
  
// //   table: { width: "100%", borderCollapse: "collapse" },
  
// //   // 🔹 HEADER STYLE (Height Kam Ki)
// //   th: { 
// //     padding: "8px 10px", // Padding kam ki (pehle 12px thi)
// //     background: "#f8f9fa", 
// //     textAlign: "left", 
// //     fontWeight: "700", 
// //     fontSize: "12px", // Font chota kiya
// //     color: "#555",
// //     textTransform: "uppercase",
// //     borderBottom: "1px solid #ccc", 
// //     position: "sticky", 
// //     top: 0,
// //     zIndex: 2
// //   },
  
// //   // 🔹 ROW STYLE (Height Kam Ki)
// //   td: { 
// //     padding: "6px 10px", // Padding kam ki (pehle 10px thi)
// //     borderBottom: "1px solid #eee", 
// //     fontSize: "13px", // Text size adjust kiya
// //     color: "#333",
// //     verticalAlign: "middle" // Content beech me rahega
// //   },
  
// //   row: { background: "#fff", transition: "0.1s" },
  
// //   viewBtn: { padding: "4px 8px", background: "#2196F3", color: "#fff", border: "none", borderRadius: "3px", cursor: "pointer", fontSize: "11px" },
  
// //   grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "15px" },
// //   card: { padding: "8px", border: "1px solid #eee", borderRadius: "6px", background: "#fff", cursor: "pointer", transition: "0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" },
// // };

// // export default ProductList;













// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// function ProductList({ products, onEdit, onDelete }) { // onEdit/onDelete props pass kiye
//   // 👇 Default state session storage se uthaya
//   const [view, setView] = useState(() => sessionStorage.getItem("productList_view") || "table");
//   const navigate = useNavigate();

//   // 👇 Jab view change ho, save kar lo
//   useEffect(() => {
//     sessionStorage.setItem("productList_view", view);
//   }, [view]);

//   const handleView = (id) => {
//     navigate(`/product/${id}`);
//   };

//   return (
//     <div style={{ padding: "0 10px" }}>
      
//       {/* HEADER SECTION */}
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px", marginTop: "10px" }}>
//         <h3 style={{ margin: 0, fontSize: "18px", color: "#333" }}>📦 Products ({products.length})</h3>
//         <button
//           style={styles.toggleBtn}
//           onClick={() => setView(view === "table" ? "box" : "table")}
//         >
//           {view === "table" ? "Show Grid" : "Show Table"}
//         </button>
//       </div>

//       {view === "table" ? (
//         <div style={styles.tableWrapper}>
//           <table style={styles.table}>
//             <thead>
//               <tr>
//                 <th style={styles.th}>S no.</th>
//                 <th style={styles.th}>Img</th>
//                 <th style={styles.th}>Name</th>
//                 <th style={styles.th}>Color</th>
//                 <th style={styles.th}>SKU</th>
//                 <th style={styles.th}>Cat.</th>
//                 <th style={styles.th}>MRP</th>
//                 <th style={styles.th}>Qty</th>
//                 <th style={styles.th}>Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {products.map((product, index) => (
//                 <tr key={product._id} style={styles.row}>
//                   <td style={styles.td}>{index + 1}</td>
                  
//                   <td style={styles.td}>
//                     {product.img ? (
//                       <img
//                         src={product.img}
//                         alt={product.name}
//                         style={{ width: "32px", height: "32px", borderRadius: "4px", objectFit: "cover", display: "block" }}
//                       />
//                     ) : "-"}
//                   </td>

//                   <td style={styles.td}>
//                     <b 
//                       style={{ color: "#1976D2", cursor: "pointer", fontSize: "13px" }} 
//                       onClick={() => handleView(product._id)}
//                     >
//                       {product.name}
//                     </b>
//                   </td>
//                   <td style={{...styles.td, fontSize: "12px", color: "#555"}}>{product.color}</td>

//                   <td style={{...styles.td, fontSize: "12px", color: "#555"}}>{product.sku}</td>
//                   <td style={styles.td}>{product.category}</td>
//                   <td style={styles.td}>₹{product.price}</td>
                  
//                   <td style={styles.td}>
//                     <span style={{ 
//                         padding: "1px 6px", 
//                         borderRadius: "3px",
//                         fontSize: "11px", 
//                         background: product.Qty < 5 ? "#ffebee" : "#e8f5e9",
//                         color: product.Qty < 5 ? "red" : "green",
//                         fontWeight: "bold",
//                         border: product.Qty < 5 ? "1px solid #ffcdd2" : "1px solid #c8e6c9"
//                     }}>
//                       {product.Qty}
//                     </span>
//                   </td>

//                   <td style={styles.td}>
//                     <button onClick={() => handleView(product._id)} style={styles.viewBtn}>View</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         // GRID VIEW
//         <div style={styles.grid}>
//           {products.map((product) => (
//             <div key={product._id} style={styles.card} onClick={() => handleView(product._id)}>
//               {product.img && (
//                 <img src={product.img} alt={product.name} style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "6px" }} />
//               )}
//               <h5 style={{ margin: "8px 0 4px 0", fontSize: "14px" }}>{product.name}</h5>
//               <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
//                 <b>₹{product.price}</b>
//                 <span style={{ color: product.Qty < 5 ? "red" : "green" }}>Qty: {product.Qty}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// // ... styles same as your previous code
// const styles = {
//   toggleBtn: { padding: "5px 10px", background: "#1976D2", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "12px" },
//   tableWrapper: { maxHeight: "80vh", overflow: "auto", border: "1px solid #e0e0e0", borderRadius: "6px", background: "#fff", boxShadow: "0 2px 5px rgba(0,0,0,0.05)" },
//   table: { width: "100%", borderCollapse: "collapse" },
//   th: { padding: "8px 10px", background: "#f8f9fa", textAlign: "left", fontWeight: "700", fontSize: "12px", color: "#555", textTransform: "uppercase", borderBottom: "1px solid #ccc", position: "sticky", top: 0, zIndex: 2 },
//   td: { padding: "6px 10px", borderBottom: "1px solid #eee", fontSize: "13px", color: "#333", verticalAlign: "middle" },
//   row: { background: "#fff", transition: "0.1s" },
//   viewBtn: { padding: "4px 8px", background: "#2196F3", color: "#fff", border: "none", borderRadius: "3px", cursor: "pointer", fontSize: "11px" },
//   grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "15px" },
//   card: { padding: "8px", border: "1px solid #eee", borderRadius: "6px", background: "#fff", cursor: "pointer", transition: "0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" },
// };

// export default ProductList;























import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function ProductList({ products, onEdit, onDelete }) {
  // 👇 Default state session storage se uthaya
  const [view, setView] = useState(() => sessionStorage.getItem("productList_view") || "table");
  
  // 👇 Sorting States
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null }); // { key: 'price', direction: 'asc' }
  const [showSortMenu, setShowSortMenu] = useState(false);
  const sortMenuRef = useRef(null); // Click outside close karne ke liye

  const navigate = useNavigate();

  // 👇 Jab view change ho, save kar lo
  useEffect(() => {
    sessionStorage.setItem("productList_view", view);
  }, [view]);

  // 👇 Dropdown ke bahar click karne par menu band karne ka logic
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortMenuRef.current && !sortMenuRef.current.contains(event.target)) {
        setShowSortMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleView = (id) => {
    navigate(`/product/${id}`);
  };

  // 👇 SORTING LOGIC (Main Magic Here 🪄)
  const handleSort = (key, direction) => {
    setSortConfig({ key, direction });
    setShowSortMenu(false); // Selection ke baad menu band karein
  };

  // Original products array ko modify kiye bina sort karna
  const sortedProducts = [...products].sort((a, b) => {
    if (!sortConfig.key) return 0; // Agar koi sort selected nahi hai to default order

    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];

    // Numbers ke liye (Price, Qty)
    if (sortConfig.key === "price" || sortConfig.key === "Qty") {
      aValue = Number(aValue);
      bValue = Number(bValue);
    } 
    // Strings ke liye (Name) - Case insensitive
    else if (typeof aValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (aValue < bValue) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Helper function to show active checkmark
  const isActive = (key, dir) => sortConfig.key === key && sortConfig.direction === dir;

  return (
    <div style={{ padding: "0 10px" }}>
      
      {/* HEADER SECTION */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px", marginTop: "10px" }}>
        <h3 style={{ margin: 0, fontSize: "18px", color: "#333" }}>📦 Products ({products.length})</h3>
        
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          
          {/* 👇 SORT BUTTON with DROPDOWN */}
          <div style={{ position: "relative" }} ref={sortMenuRef}>
            <button 
              style={styles.actionBtn} 
              onClick={() => setShowSortMenu(!showSortMenu)}
            >
              🔃 Sort {sortConfig.key ? `(${sortConfig.key})` : ""}
            </button>

            {showSortMenu && (
              <div style={styles.dropdownMenu}>
                <div style={styles.dropdownHeader}>Sort By</div>
                
                {/* Price Options */}
                <div 
                  style={{ ...styles.dropdownItem, ...(isActive('price', 'asc') ? styles.activeItem : {}) }} 
                  onClick={() => handleSort('price', 'asc')}
                >
                  Price: Low to High ⬆️
                </div>
                <div 
                  style={{ ...styles.dropdownItem, ...(isActive('price', 'desc') ? styles.activeItem : {}) }} 
                  onClick={() => handleSort('price', 'desc')}
                >
                  Price: High to Low ⬇️
                </div>

                <hr style={{ margin: "4px 0", border: "0", borderTop: "1px solid #eee" }} />

                {/* Qty Options */}
                <div 
                  style={{ ...styles.dropdownItem, ...(isActive('Qty', 'asc') ? styles.activeItem : {}) }} 
                  onClick={() => handleSort('Qty', 'asc')}
                >
                  Qty: Low to High ⬆️
                </div>
                <div 
                  style={{ ...styles.dropdownItem, ...(isActive('Qty', 'desc') ? styles.activeItem : {}) }} 
                  onClick={() => handleSort('Qty', 'desc')}
                >
                  Qty: High to Low ⬇️
                </div>

                <hr style={{ margin: "4px 0", border: "0", borderTop: "1px solid #eee" }} />

                {/* Name Options */}
                <div 
                  style={{ ...styles.dropdownItem, ...(isActive('name', 'asc') ? styles.activeItem : {}) }} 
                  onClick={() => handleSort('name', 'asc')}
                >
                  Name: A to Z
                </div>
                <div 
                  style={{ ...styles.dropdownItem, ...(isActive('name', 'desc') ? styles.activeItem : {}) }} 
                  onClick={() => handleSort('name', 'desc')}
                >
                  Name: Z to A
                </div>
                
                {/* Clear Sort */}
                {sortConfig.key && (
                  <>
                    <hr style={{ margin: "4px 0", border: "0", borderTop: "1px solid #eee" }} />
                    <div 
                      style={{ ...styles.dropdownItem, color: "#d32f2f", fontWeight: "bold" }} 
                      onClick={() => handleSort(null, null)}
                    >
                      ✕ Clear Sort
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* View Toggle Button */}
          <button
            style={styles.toggleBtn}
            onClick={() => setView(view === "table" ? "box" : "table")}
          >
            {view === "table" ? "🔲 Grid View" : "📋 List View"}
          </button>
        </div>
      </div>

      {view === "table" ? (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>S no.</th>
                <th style={styles.th}>Img</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Supplier name</th>
                <th style={styles.th}>Color</th>
                <th style={styles.th}>SKU</th>
                <th style={styles.th}>Cat.</th>
                
                {/* Visual Indicator for Sorting in Table Head */}
                <th style={styles.th} onClick={() => handleSort('price', sortConfig.direction === 'asc' ? 'desc' : 'asc')}>
                  MRP {sortConfig.key === 'price' ? (sortConfig.direction === 'asc' ? '⬆' : '⬇') : ''}
                </th>
                <th style={styles.th} onClick={() => handleSort('Qty', sortConfig.direction === 'asc' ? 'desc' : 'asc')}>
                  Qty {sortConfig.key === 'Qty' ? (sortConfig.direction === 'asc' ? '⬆' : '⬇') : ''}
                </th>
                
                <th style={styles.th}>Action</th>
              </tr>
            </thead>

            {/* 👇 Use sortedProducts here instead of products */}
            <tbody>
              {sortedProducts.map((product, index) => (
                <tr key={product._id} style={styles.row}>
                  <td style={styles.td}>{index + 1}</td>
                  
                  <td style={styles.td}>
                    {product.img ? (
                      <img
                        src={product.img}
                        alt={product.name}
                        style={{ width: "32px", height: "32px", borderRadius: "4px", objectFit: "cover", display: "block" }}
                      />
                    ) : "-"}
                  </td>

                  <td style={styles.td}>
                    <b 
                      style={{ color: "#1976D2", cursor: "pointer", fontSize: "13px" }} 
                      onClick={() => handleView(product._id)}
                    >
                      {product.name}
                    </b>
                  </td>

                  
                  <td style={{...styles.td, fontSize: "12px", color: "#555"}}> <b>{product.Supplier_name}</b></td>


                  <td style={{...styles.td, fontSize: "12px", color: "#555"}}>{product.color}</td>

                  <td style={{...styles.td, fontSize: "12px", color: "#555"}}>{product.sku}</td>
                  <td style={styles.td}>{product.category}</td>
                  <td style={styles.td}>₹{product.price}</td>
                  
                  <td style={styles.td}>
                    <span style={{ 
                        padding: "1px 6px", 
                        borderRadius: "3px",
                        fontSize: "11px", 
                        background: product.Qty < 5 ? "#ffebee" : "#e8f5e9",
                        color: product.Qty < 5 ? "red" : "green",
                        fontWeight: "bold",
                        border: product.Qty < 5 ? "1px solid #ffcdd2" : "1px solid #c8e6c9"
                    }}>
                      {product.Qty}
                    </span>
                  </td>

                  <td style={styles.td}>
                    <button onClick={() => handleView(product._id)} style={styles.viewBtn}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // GRID VIEW
        // 👇 Use sortedProducts here too
        <div style={styles.grid}>
          {sortedProducts.map((product) => (
            <div key={product._id} style={styles.card} onClick={() => handleView(product._id)}>
              {product.img && (
                <img src={product.img} alt={product.name} style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "6px" }} />
              )}
              <h5 style={{ margin: "8px 0 4px 0", fontSize: "14px" }}>{product.name}</h5>
              <h5 style={{ margin: "5px 0 4px 0", fontSize: "10px" }}>SKU : {product.sku}</h5>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
                <b>₹{product.price}</b>
                <span style={{ color: product.Qty < 5 ? "red" : "green" }}>Qty: {product.Qty}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  // Existing Styles
  toggleBtn: { padding: "6px 12px", background: "#333", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "600" },
  tableWrapper: { maxHeight: "80vh", overflow: "auto", border: "1px solid #e0e0e0", borderRadius: "6px", background: "#fff", boxShadow: "0 2px 5px rgba(0,0,0,0.05)" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { padding: "8px 10px", background: "#f8f9fa", textAlign: "left", fontWeight: "700", fontSize: "12px", color: "#555", textTransform: "uppercase", borderBottom: "1px solid #ccc", position: "sticky", top: 0, zIndex: 2, cursor: 'pointer' },
  td: { padding: "6px 10px", borderBottom: "1px solid #eee", fontSize: "13px", color: "#333", verticalAlign: "middle" },
  row: { background: "#fff", transition: "0.1s" },
  viewBtn: { padding: "4px 8px", background: "#2196F3", color: "#fff", border: "none", borderRadius: "3px", cursor: "pointer", fontSize: "11px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "15px" },
  card: { padding: "8px", border: "1px solid #eee", borderRadius: "6px", background: "#fff", cursor: "pointer", transition: "0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" },
  
  // 👇 New Styles for Sort Button & Dropdown
  actionBtn: { padding: "6px 12px", background: "#fff", color: "#333", border: "1px solid #ccc", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "600", display: "flex", alignItems: "center", gap: "5px" },
  
  dropdownMenu: {
    position: "absolute",
    top: "110%",
    right: 0,
    width: "180px",
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    zIndex: 100,
    overflow: "hidden",
    padding: "5px 0"
  },
  dropdownHeader: {
    padding: "8px 12px",
    fontSize: "11px",
    fontWeight: "bold",
    color: "#888",
    textTransform: "uppercase",
    background: "#f9f9f9",
    borderBottom: "1px solid #eee"
  },
  dropdownItem: {
    padding: "10px 12px",
    fontSize: "13px",
    color: "#333",
    cursor: "pointer",
    transition: "background 0.2s",
    display: "flex",
    justifyContent: "space-between"
  },
  activeItem: {
    background: "#e3f2fd",
    color: "#1976D2",
    fontWeight: "600"
  }
};

export default ProductList;

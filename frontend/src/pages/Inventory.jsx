// // src/pages/Inventory.jsx
// import React, { useState, useEffect, useRef } from "react";
// import { useSelector } from "react-redux";
// import api from "../api/axios";
// import ProductList from "../components/ProductList";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import * as XLSX from "xlsx";
// import ImportModal from "../components/ImportModal"; 
// import ImageUploadModal from "../components/ImageUploadModal"; 

// export default function Inventory() {
//   const [products, setProducts] = useState(() => {
//     const saved = sessionStorage.getItem("home_products");
//     return saved ? JSON.parse(saved) : [];
//   });

//   const [search, setSearch] = useState(() => sessionStorage.getItem("home_search") || "");
//   const [categoryFilter, setCategoryFilter] = useState(() => sessionStorage.getItem("home_filter") || "");
//   const [showData, setShowData] = useState(() => sessionStorage.getItem("home_showData") === "true");
//   const [loading, setLoading] = useState(false);
  
//   const [isImportModalOpen, setIsImportModalOpen] = useState(false);
//   const [isImageModalOpen, setIsImageModalOpen] = useState(false); 

//   const resultsRef = useRef(null);
//   const productListRef = useRef(null); 
//   const user = useSelector((state) => state.user.userData);
//   const navigate = useNavigate();

//   // 👇 TCode Based Access Control (Magic Here ✨)
//   const isAdmin = user?.userType === "admin";
//   const canCreate = isAdmin || (user?.tcodes && user.tcodes.includes("INV_CREATE"));
//   const canEdit = isAdmin || (user?.tcodes && user.tcodes.includes("INV_EDIT"));
//   const canDelete = isAdmin || (user?.tcodes && user.tcodes.includes("INV_DELETE"));

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
//     } catch (err) {
//       toast.error("Failed to fetch inventory");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearchInput = (e) => {
//     const value = e.target.value;
//     if (/^[a-zA-Z0-9\s-]*$/.test(value)) {  
//       setSearch(value);
//     } else {
//       toast.error("Only alphabets and numbers are allowed!");
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
//       if (search.trim()) handleSearch();
//     }, 800); 
//     return () => clearTimeout(delayDebounceFn);
//   }, [search]); 

//   useEffect(() => {
//     if (showData && resultsRef.current) {
//       setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
//     }
//   }, [showData]);

//   const filteredProducts = products.filter((p) => {
//     const s = search.toLowerCase();
//     const skuMatch = p.sku ? p.sku.toLowerCase().includes(s) : false;
//     const supplierMatch = p.Supplier_name ? p.Supplier_name.toLowerCase().includes(s) : false;

//     const matchSearch = 
//         p.name.toLowerCase().includes(s) || 
//         p.color.toLowerCase().includes(s) || 
//         p.category.toLowerCase().includes(s) ||
//         skuMatch || 
//         supplierMatch; 

//     const matchCategory = !categoryFilter || categoryFilter === "All" || categoryFilter === "" ? true : p.category === categoryFilter;
//     return matchSearch && matchCategory;
//   });

//   useEffect(() => {
//     if (!search.trim() && !categoryFilter && search === "" && categoryFilter === "" && !sessionStorage.getItem("home_showData")) {
//       setShowData(false);
//     }
//   }, [search, categoryFilter]);

//   const clearAll = () => {
//     setSearch(""); setCategoryFilter(""); setShowData(false); setProducts([]);
//     sessionStorage.removeItem("home_search"); sessionStorage.removeItem("home_filter");
//     sessionStorage.removeItem("home_products"); sessionStorage.removeItem("home_showData");
//     if (productListRef.current) {
//       productListRef.current.clearSelection();
//     }
//   };

//   const downloadExcel = () => {
//     if (filteredProducts.length === 0) return toast.error("No data to export");
    
//     let itemsToExport = filteredProducts;
    
//     if (productListRef.current) {
//       const selectedItems = productListRef.current.getSelectedProducts();
//       if (selectedItems.length > 0) {
//         itemsToExport = selectedItems; 
//       }
//     }
    
//     const dataToExport = itemsToExport.map((p) => ({
//       Name: p.name, SKU: p.sku, Description: p.description || "-", Category: p.category, 
//       Color: p.color, Size: p.size, Price: p.price, GST: p.gst ? `${p.gst}%` : "0%", 
//       "Cost Price": canEdit ? p.costing_price : "N/A", Stock: p.Qty, Supplier: canEdit ? p.Supplier_name : "N/A", 
//       Status: p.Qty > 0 ? "In Stock" : "Out of Stock", "Product Image URL": p.img || "No Image", 
//       "Barcode Image URL": p.barcodeImg || "No Barcode"
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(dataToExport);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory Data");
//     XLSX.writeFile(workbook, "Inventory_With_Links.xlsx");
//     toast.success(`Excel downloaded with ${itemsToExport.length} items!`);
//   };

//   return (
//     <div style={styles.container}>
      
//       <ImportModal 
//         isOpen={isImportModalOpen} 
//         onClose={() => setIsImportModalOpen(false)}
//         onSuccess={() => { fetchProducts(); setShowData(true); }} 
//       />

//       <ImageUploadModal 
//         isOpen={isImageModalOpen} 
//         onClose={() => setIsImageModalOpen(false)} 
//       />

//       {/* Page Title */}
//       <div style={styles.pageHeader}>
//          <h1 style={styles.pageTitle}>Inventory Management</h1>
//       </div>

//       <main style={styles.mainContent}>
//         <section style={styles.searchCard}>
//           <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: '15px'}}>
//              <h2 style={styles.sectionTitle}>Search Inventory</h2>
             
//              <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
//                 {/* 👇 Sirf wo Image aur Import use kar payega jiske paas INV_CREATE hai */}
//                 {canCreate && (
//                   <>
//                     <button onClick={() => setIsImageModalOpen(true)} style={styles.imageToolBtn} title="Upload Image & Get URL">📷 Get Img URL</button>
//                     <button onClick={() => setIsImportModalOpen(true)} style={styles.importBtn}>📤 Import Excel</button>
//                   </>
//                 )}
//                 {(search || categoryFilter || showData) && (
//                    <button onClick={clearAll} style={{...styles.closeBtn, border:'none', fontSize:'12px'}}>Reset Search</button>
//                 )}
//              </div>
//           </div>
          
//           <div style={styles.searchBarWrapper}>
//             <input type="text" placeholder="Search Name, SKU, Color..." value={search} onChange={handleSearchInput} style={styles.searchInput} onKeyPress={(e) => e.key === 'Enter' && handleSearch()} />
//             <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} style={styles.searchSelect}>
//               <option value="">Select Category</option><option value="All">All Categories</option>
//               <option value="Die-cast">Die-cast</option><option value="Remote Control">Remote Control</option>
//               <option value="Soft Toy">Soft Toy</option><option value="Board Game">Board Game</option>
//               <option value="Scooter">Scooter</option><option value="Gun">Gun</option>
//             </select>
//             <button onClick={handleSearch} disabled={loading} style={styles.searchBtn}>{loading ? "Searching..." : "🔍 Search"}</button>
//           </div>
//         </section>

//         {showData && (
//           <section style={styles.resultsSection} ref={resultsRef}>
//             <div style={styles.resultsHeader}>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
//                 <h4 style={styles.resultsTitle}>Search Results <span style={styles.countBadge}>({filteredProducts.length})</span></h4>
//                 {filteredProducts.length > 0 && <button onClick={downloadExcel} style={styles.excelBtn} title="Download Excel">📥 Export Excel</button>}
//               </div>
//               <button onClick={clearAll} style={styles.closeBtn}>✕ Close Results</button>
//             </div>
//             <div style={styles.listWrapper}>
//               <ProductList
//                 ref={productListRef} 
//                 products={filteredProducts}
//                 onEdit={() => toast("View details to edit")}
//                 onDelete={async (id) => {
//                   // 👇 Agar permission nahi hai delete ki, toh rok do
//                   if (!canDelete) return toast.error("Access Denied: You don't have permission to delete.");
//                   if (window.confirm("Are you sure you want to delete this item?")) {
//                     await api.delete(`/products/${id}`);
//                     fetchProducts();
//                     toast.success("Deleted Successfully");
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

// // ✨ Cleaned Up STYLES
// const styles = {
//   container: { display: "flex", flexDirection: "column", height: "100%" },
//   pageHeader: { marginBottom: '15px' },
//   pageTitle: { fontSize: '24px', fontWeight: 'bold', margin: '0', color: '#1e293b' },
//   mainContent: { width: "100%", maxWidth: "1200px", display: "flex", flexDirection: "column", gap: "20px" },
  
//   searchCard: { backgroundColor: "#ffffff", padding: "20px 25px", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)", border: "1px solid #e2e8f0" },
//   sectionTitle: { margin: "0", fontSize: "18px", fontWeight: "700", color: "#334155" },
//   importBtn: { backgroundColor: "#ea580c", color: "white", border: "none", padding: "8px 14px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", transition: "background 0.2s" },
//   imageToolBtn: { backgroundColor: "#0ea5e9", color: "white", border: "none", padding: "8px 14px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", transition: "background 0.2s" },
  
//   searchBarWrapper: { display: "flex", gap: "15px", flexWrap: "wrap", alignItems: "center" },
//   searchInput: { flex: "2", minWidth: "250px", padding: "12px 15px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", outline: "none", backgroundColor: "#f8fafc" },
//   searchSelect: { flex: "1", minWidth: "180px", padding: "12px 15px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", outline: "none", cursor: "pointer", backgroundColor: "#fff" },
//   searchBtn: { padding: "12px 25px", borderRadius: "8px", border: "none", backgroundColor: "#2563eb", color: "#fff", fontSize: "14px", fontWeight: "600", cursor: "pointer" },
  
//   resultsSection: { backgroundColor: "#ffffff", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)", border: "1px solid #e2e8f0", overflow: "hidden" },
//   resultsHeader: { padding: "15px 25px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#ffffff" },
//   resultsTitle: { margin: 0, fontSize: "18px", color: "#1e293b", fontWeight: "700" },
//   countBadge: { color: "#64748b", fontWeight: "500", fontSize: "16px" },
//   excelBtn: { backgroundColor: "#16a34a", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: "600", display: "flex", alignItems: "center", gap: "6px" },
//   closeBtn: { background: "transparent", border: "1px solid #ef4444", color: "#ef4444", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: "600" },
//   listWrapper: { padding: "0" }
// };














// src/pages/Inventory.jsx
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import api from "../api/axios"; // 👈 Axios ki jagah tumhara configured api use karenge
import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm"; // 👈 Form import kar liya
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";
import ImportModal from "../components/ImportModal"; 
import ImageUploadModal from "../components/ImageUploadModal"; 
import { FaBackspace } from "react-icons/fa";

export default function Inventory() {
  // --- STATES ---
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

  // 👇 Naya State: Form dikhana hai ya List? (false = list, true = form)
  const [showAddForm, setShowAddForm] = useState(false); 

  const resultsRef = useRef(null);
  const productListRef = useRef(null); 
  const user = useSelector((state) => state.user.userData);
  const navigate = useNavigate();

  // --- PERMISSIONS ---
  const isAdmin = user?.userType === "admin";
  const canCreate = isAdmin || (user?.tcodes && user.tcodes.includes("INV_CREATE"));
  const canEdit = isAdmin || (user?.tcodes && user.tcodes.includes("INV_EDIT"));
  const canDelete = isAdmin || (user?.tcodes && user.tcodes.includes("INV_DELETE"));

  // --- EFFECTS ---
  useEffect(() => {
    sessionStorage.setItem("home_search", search);
    sessionStorage.setItem("home_filter", categoryFilter);
    sessionStorage.setItem("home_products", JSON.stringify(products));
    sessionStorage.setItem("home_showData", showData);
  }, [search, categoryFilter, products, showData]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search.trim()) handleSearch();
    }, 800); 
    return () => clearTimeout(delayDebounceFn);
  }, [search]); 

  useEffect(() => {
    if (showData && resultsRef.current && !showAddForm) {
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }
  }, [showData, showAddForm]);

  useEffect(() => {
    if (!search.trim() && !categoryFilter && search === "" && categoryFilter === "" && !sessionStorage.getItem("home_showData")) {
      setShowData(false);
    }
  }, [search, categoryFilter]);

  // --- FUNCTIONS ---
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

  const clearAll = () => {
    setSearch(""); setCategoryFilter(""); setShowData(false); setProducts([]);
    sessionStorage.removeItem("home_search"); sessionStorage.removeItem("home_filter");
    sessionStorage.removeItem("home_products"); sessionStorage.removeItem("home_showData");
    if (productListRef.current) {
      productListRef.current.clearSelection();
    }
  };

  const downloadExcel = () => {
    if (filteredProducts.length === 0) return toast.error("No data to export");
    let itemsToExport = filteredProducts;
    if (productListRef.current) {
      const selectedItems = productListRef.current.getSelectedProducts();
      if (selectedItems.length > 0) itemsToExport = selectedItems; 
    }
    const dataToExport = itemsToExport.map((p) => ({
      Name: p.name, SKU: p.sku, Description: p.description || "-", Category: p.category, 
      Color: p.color, Size: p.size, Price: p.price, GST: p.gst ? `${p.gst}%` : "0%", 
      "Cost Price": canEdit ? p.costing_price : "N/A", Stock: p.Qty, Supplier: canEdit ? p.Supplier_name : "N/A", 
      Status: p.Qty > 0 ? "In Stock" : "Out of Stock", "Product Image URL": p.img || "No Image", 
      "Barcode Image URL": p.barcodeImg || "No Barcode"
    }));
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory Data");
    XLSX.writeFile(workbook, "Inventory_With_Links.xlsx");
    toast.success(`Excel downloaded with ${itemsToExport.length} items!`);
  };

  // 👇 NAYA FUNCTION: Product Save karne ke liye (AddProduct se laya hua)
  const saveNewProduct = async (data) => {
    const toastId = toast.loading("Saving Product...");
    try {
      // Axios ki jagah tumhara configure kiya hua 'api' use kar rahe hain
      const res = await api.post("/products", data); 
      if (res.status === 201) {
        const newSku = res.data.sku;
        toast.success("Product Added Successfully!", { id: toastId, duration: 3000 });
        
        // 1. Naya data fetch kar lo
        await fetchProducts(); 
        
        // 2. Barcode page par bhej do
        setTimeout(() => {
          navigate(`/generate-barcode/${newSku}`);
        }, 1500);
      }
    } catch (err) {
      console.error("Add Product Error:", err);
      toast.error(err.response?.data?.message || "Failed to add product", { id: toastId });
    }
  };

  const filteredProducts = products.filter((p) => {
    const s = search.toLowerCase();
    const matchSearch = p.name.toLowerCase().includes(s) || p.color.toLowerCase().includes(s) || 
        p.category.toLowerCase().includes(s) || (p.sku && p.sku.toLowerCase().includes(s)) || 
        (p.Supplier_name && p.Supplier_name.toLowerCase().includes(s)); 
    const matchCategory = !categoryFilter || categoryFilter === "All" || categoryFilter === "" ? true : p.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  return (
    <div style={styles.container}>
      
      <ImportModal isOpen={isImportModalOpen} onClose={() => setIsImportModalOpen(false)} onSuccess={() => { fetchProducts(); setShowData(true); }} />
      <ImageUploadModal isOpen={isImageModalOpen} onClose={() => setIsImageModalOpen(false)} />

      {/* --- HEADER SECTION --- */}
      <div style={styles.pageHeader}>
         <h1 style={styles.pageTitle}>
           {showAddForm ? "" : "Inventory Management"}
         </h1>
         
         {/* Agar List view hai aur permission hai, toh 'Add Product' button dikhao */}
         {!showAddForm && canCreate && (
           <button onClick={() => setShowAddForm(true)} style={styles.addNewBtn}>
             ➕ Add New Product
           </button>
         )}
      </div>

      {/* --- CONDITIONAL RENDERING --- */}
      {showAddForm ? (
        
        // 🟢 FORM VIEW (Agar Add Product click kiya hai)
        <main style={styles.formContent}>
          <div style={styles.headerWrapper}>
            <button onClick={() => setShowAddForm(false)} style={styles.backBtn}><FaBackspace style={{fontSize:"15px"}}/></button>
            <p style={styles.subtitle}>Enter product details to add to inventory.</p>
          </div>

          <div style={styles.card}>
            <ProductForm 
              onSubmit={saveNewProduct} 
              onCancel={() => setShowAddForm(false)} 
            />
          </div>
        </main>

      ) : (

        // 🔵 LIST VIEW (Default Search & Results View)
        <main style={styles.mainContent}>
          <section style={styles.searchCard}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: '15px'}}>
               <h2 style={styles.sectionTitle}>Search Inventory</h2>
               <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                  {canCreate && (
                    <>
                      <button onClick={() => setIsImageModalOpen(true)} style={styles.imageToolBtn}>📷 Get Img URL</button>
                      <button onClick={() => setIsImportModalOpen(true)} style={styles.importBtn}>📤 Import Excel</button>
                    </>
                  )}
                  {(search || categoryFilter || showData) && (
                     <button onClick={clearAll} style={{...styles.closeBtn, border:'none', fontSize:'12px'}}>Reset</button>
                  )}
               </div>
            </div>
            
            <div style={styles.searchBarWrapper}>
              <input type="text" placeholder="Search Name, SKU, Color..." value={search} onChange={handleSearchInput} style={styles.searchInput} onKeyPress={(e) => e.key === 'Enter' && handleSearch()} />
              <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} style={styles.searchSelect}>
                <option value="">Select Category</option><option value="All">All Categories</option>
                <option value="Die-cast">Die-cast</option><option value="Remote Control">Remote Control</option>
                <option value="Soft Toy">Soft Toy</option><option value="Board Game">Board Game</option>
                <option value="Scooter">Scooter</option><option value="Gun">Gun</option>
              </select>
              <button onClick={handleSearch} disabled={loading} style={styles.searchBtn}>{loading ? "Searching..." : "🔍 Search"}</button>
            </div>
          </section>

          {showData && (
            <section style={styles.resultsSection} ref={resultsRef}>
              <div style={styles.resultsHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <h4 style={styles.resultsTitle}>Search Results <span style={styles.countBadge}>({filteredProducts.length})</span></h4>
                  {filteredProducts.length > 0 && <button onClick={downloadExcel} style={styles.excelBtn}>📥 Export Excel</button>}
                </div>
                <button onClick={clearAll} style={styles.closeBtn}>✕ Close Results</button>
              </div>
              <div style={styles.listWrapper}>
                <ProductList
                  ref={productListRef} 
                  products={filteredProducts}
                  onEdit={() => toast("View details to edit")}
                  onDelete={async (id) => {
                    if (!canDelete) return toast.error("Access Denied: You don't have permission to delete.");
                    if (window.confirm("Are you sure you want to delete this item?")) {
                      await api.delete(`/products/${id}`);
                      fetchProducts();
                      toast.success("Deleted Successfully");
                    }
                  }}
                />
              </div>
            </section>
          )}
        </main>
      )}

    </div>
  );
}

// ✨ UPDATED STYLES
const styles = {
  container: { display: "flex", flexDirection: "column", height: "100%",fontFamily: "'Inter', sans-serif"},
  pageHeader: { marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  pageTitle: { fontSize: '24px', fontWeight: 'bold', margin: '0', color: '#1e293b' },
  
  // Naya button design add product ke liye
  addNewBtn: { backgroundColor: "#10b981", color: "#fff", border: "none", padding: "10px 18px", borderRadius: "8px", fontSize: "14px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", boxShadow: "0 2px 4px rgba(16, 185, 129, 0.2)" },
  
  mainContent: { width: "100%", maxWidth: "1200px", display: "flex", flexDirection: "column", gap: "20px" },
  
  // Form View Styles
  formContent: { width: "100%", maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column" },
  headerWrapper: { width: "100%", textAlign: "left", marginBottom: "20px" },
  backBtn: { background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontWeight: '600', fontSize: '13px', padding: 0, marginBottom: '10px' },
  subtitle: { fontSize: "15px", color: "#64748b", margin: 0 },
  card: { backgroundColor: "#ffffff", width: "100%", padding: "30px", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)", border: "1px solid #e2e8f0", boxSizing: "border-box" },

  // Search View Styles
  searchCard: { backgroundColor: "#ffffff", padding: "20px 25px", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)", border: "1px solid #e2e8f0" },
  sectionTitle: { margin: "0", fontSize: "18px", fontWeight: "700", color: "#334155" },
  importBtn: { backgroundColor: "#ea580c", color: "white", border: "none", padding: "8px 14px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", transition: "background 0.2s" },
  imageToolBtn: { backgroundColor: "#0ea5e9", color: "white", border: "none", padding: "8px 14px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", transition: "background 0.2s" },
  searchBarWrapper: { display: "flex", gap: "15px", flexWrap: "wrap", alignItems: "center" },
  searchInput: { flex: "2", minWidth: "250px", padding: "12px 15px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", outline: "none", backgroundColor: "#f8fafc" },
  searchSelect: { flex: "1", minWidth: "180px", padding: "12px 15px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", outline: "none", cursor: "pointer", backgroundColor: "#fff" },
  searchBtn: { padding: "12px 25px", borderRadius: "8px", border: "none", backgroundColor: "#2563eb", color: "#fff", fontSize: "14px", fontWeight: "600", cursor: "pointer" },
  resultsSection: { backgroundColor: "#ffffff", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)", border: "1px solid #e2e8f0", overflow: "hidden" },
  resultsHeader: { padding: "15px 25px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#ffffff" },
  resultsTitle: { margin: 0, fontSize: "18px", color: "#1e293b", fontWeight: "700" },
  countBadge: { color: "#64748b", fontWeight: "500", fontSize: "16px" },
  excelBtn: { backgroundColor: "#16a34a", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: "600", display: "flex", alignItems: "center", gap: "6px" },
  closeBtn: { background: "transparent", border: "1px solid #ef4444", color: "#ef4444", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: "600" },
  listWrapper: { padding: "0" }
};
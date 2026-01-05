import React, { useState, useEffect, useRef } from "react"; // 👈 1. useRef Import kiya
import { useSelector } from "react-redux";
import api from "../api/axios";
import ProductList from "../components/ProductList";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Header from "../components/Header";
import * as XLSX from "xlsx";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showData, setShowData] = useState(false);
  const [loading, setLoading] = useState(false);

  // 👇 2. Ref create kiya scroll ke liye
  const resultsRef = useRef(null);

  const user = useSelector((state) => state.user.userData);
  const navigate = useNavigate();

  const isAdmin = user?.userType === "admin";
  const isSuperUser = user?.userType === "superuser";
  const canEdit = isAdmin || isSuperUser;

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
      toast.error("Failed to fetch inventory");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!search.trim() && !categoryFilter) {
      return toast.error("Please enter a keyword or select a category");
    }
    await fetchProducts();
    setShowData(true);
  };

  // 👇 3. Ye Effect tab chalega jab showData TRUE hoga (Search complete hone par)
  useEffect(() => {
    if (showData && resultsRef.current) {
      // Thoda smooth scroll effect
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showData]); // Dependency: showData

  const filteredProducts = products.filter((p) => {
    const s = search.toLowerCase();
    const matchSearch =
      p.name.toLowerCase().includes(s) ||
      p.color.toLowerCase().includes(s) ||
      p.category.toLowerCase().includes(s);

    const matchCategory =
      !categoryFilter || categoryFilter === "All" || categoryFilter === ""
        ? true
        : p.category === categoryFilter;

    return matchSearch && matchCategory;
  });

  useEffect(() => {
    if (!search.trim() && !categoryFilter) {
      setShowData(false);
    }
  }, [search, categoryFilter]);

  const downloadExcel = () => {
    if (filteredProducts.length === 0) {
      return toast.error("No data to export");
    }

    const dataToExport = filteredProducts.map((p) => ({
      Name: p.name,
      SKU: p.sku,
      Category: p.category,
      Color: p.color,
      Size: p.size,
      Price: p.price,
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
    toast.success("Excel downloaded with Image Links!");
  };

  return (
    <div style={styles.container}>

      <Header />

      <main style={styles.mainContent}>

        {/* 1️⃣ SEARCH SECTION */}
        <section style={styles.searchCard}>
          <h2 style={styles.sectionTitle}>Search Inventory</h2>
          <div style={styles.searchBarWrapper}>
            <input
              type="text"
              placeholder="Search Name, Color, or Category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.searchInput}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={styles.searchSelect}
            >
              <option value="">Select Category</option>
              <option value="All">All Categories</option>
              <option value="Die-cast">Die-cast</option>
              <option value="Remote Control">Remote Control</option>
              <option value="Soft Toy">Soft Toy</option>
              <option value="Board Game">Board Game</option>
              <option value="Scooter">Scooter</option>
            </select>

            <button onClick={handleSearch} disabled={loading} style={styles.searchBtn}>
              {loading ? "Searching..." : "🔍 Search"}
            </button>
          </div>
        </section>

        {/* 2️⃣ QUICK ACTIONS GRID */}
        {!showData && (
          <section style={styles.actionsSection}>
            <h3 style={styles.gridLabel}>Quick Actions</h3>
            <div style={styles.actionsGrid}>

              {canEdit && (
                <div style={styles.actionCard} onClick={() => navigate("/add-product")}>
                  <div style={{ ...styles.iconCircle, background: "#dbeafe", color: "#2563eb" }}>➕</div>
                  <div style={styles.actionText}>
                    <h3>Add Product</h3>
                    <p>Create new inventory entry</p>
                  </div>
                </div>
              )}

              <div style={styles.actionCard} onClick={() => navigate("/graphs")}>
                <div style={{ ...styles.iconCircle, background: "#f3e8ff", color: "#9333ea" }}>📊</div>
                <div style={styles.actionText}>
                  <h3>Analytics</h3>
                  <p>View visual data reports</p>
                </div>
              </div>

              {isAdmin && (
                <div style={styles.actionCard} onClick={() => navigate("/users")}>
                  <div style={{ ...styles.iconCircle, background: "#ffedd5", color: "#ea580c" }}>👤</div>
                  <div style={styles.actionText}>
                    <h3>Manage Users</h3>
                    <p>Admin controls & Staff</p>
                  </div>
                </div>
              )}
            </div>
            {/* Quick Actions Grid ke andar, Admin section me add kar */}
            {isAdmin && (
              <>
              

                {/* 👇 NEW BUTTON */}
                <div style={styles.actionCard} onClick={() => navigate("/logs")}>
                  <div style={{ ...styles.iconCircle, background: "#e0f2fe", color: "#0284c7" }}>📜</div>
                  <div style={styles.actionText}>
                    <h3>Audit Logs</h3>
                    <p>View System History</p>
                  </div>
                </div>
              </>
            )}
          </section>
        )}

        {/* 3️⃣ SEARCH RESULTS */}
        {showData && (
          // 👇 4. Ref yahan attach kiya (Jahan scroll karke aana hai)
          <section style={styles.resultsSection} ref={resultsRef}>
            <div style={styles.resultsHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <h4 style={styles.resultsTitle}>Search Results <span style={styles.countBadge}>({filteredProducts.length})</span></h4>

                {filteredProducts.length > 0 && (
                  <button onClick={downloadExcel} style={styles.excelBtn} title="Download Excel">
                    📥 Export Excel
                  </button>
                )}
              </div>

              <button onClick={() => setShowData(false)} style={styles.closeBtn}>
                ✕ Close Results
              </button>
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

// ✨ STYLES (SAME AS BEFORE)
const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f1f5f9",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    display: "flex",
    flexDirection: "column",
  },
  mainContent: {
    padding: "30px 20px",
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    gap: "25px",
  },
  searchCard: {
    backgroundColor: "#ffffff",
    padding: "25px 30px",
    borderRadius: "12px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
    border: "1px solid #e2e8f0",
  },
  sectionTitle: {
    margin: "0 0 15px 0",
    fontSize: "18px",
    fontWeight: "700",
    color: "#334155",
  },
  searchBarWrapper: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
    alignItems: "center",
  },
  searchInput: {
    flex: "2",
    minWidth: "250px",
    padding: "12px 15px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    fontSize: "15px",
    outline: "none",
    backgroundColor: "#f8fafc",
    transition: "border 0.2s",
  },
  searchSelect: {
    flex: "1",
    minWidth: "180px",
    padding: "12px 15px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    fontSize: "15px",
    outline: "none",
    cursor: "pointer",
    backgroundColor: "#fff",
  },
  searchBtn: {
    padding: "12px 25px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#2563eb",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(37, 99, 235, 0.2)",
    transition: "background 0.2s",
  },
  actionsSection: {
    marginTop: "10px",
  },
  gridLabel: {
    fontSize: "14px",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    fontWeight: "700",
    marginBottom: "15px",
  },
  actionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
  },
  actionCard: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    border: "1px solid #e2e8f0",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  iconCircle: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    flexShrink: 0,
  },
  actionText: { textAlign: "left" },
  resultsSection: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
    border: "1px solid #e2e8f0",
    overflow: "hidden",
    marginTop: "20px",
  },
  resultsHeader: {
    padding: "15px 25px",
    borderBottom: "1px solid #f1f5f9",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  resultsTitle: {
    margin: 0,
    fontSize: "18px",
    color: "#1e293b",
    fontWeight: "700",
  },
  countBadge: {
    color: "#64748b",
    fontWeight: "500",
    fontSize: "16px",
  },
  excelBtn: {
    backgroundColor: "#16a34a",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    transition: "background 0.2s",
  },
  closeBtn: {
    background: "transparent",
    border: "1px solid #ef4444",
    color: "#ef4444",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
    transition: "all 0.2s",
  },
  listWrapper: { padding: "0" }
};
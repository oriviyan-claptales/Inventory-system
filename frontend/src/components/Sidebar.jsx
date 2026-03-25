// src/components/Sidebar.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const user = useSelector((state) => state.user.userData);
  const [menuSearch, setMenuSearch] = useState("");
  const navigate = useNavigate();

  // TCode Check Helper
  const hasAccess = (tcode) => {
    if (!user) return false;
    if (user.userType === "admin") return true;
    return user.tcodes && user.tcodes.includes(tcode);
  };

  // Saare features ki list aur unke required TCodes
  const allMenuItems = [
    { title: "Dashboard Home", path: "/dashboard", icon: "🏠", tcode: "HOME_VIEW", alwaysShow: true },
    { title: "Inventory Management", path: "/inventory", icon: "📦", tcode: "INV_VIEW" },
    // { title: "Add Product", path: "/add-product", icon: "➕", tcode: "INV_CREATE" },
    { title: "Sales Management", path: "/sales", icon: "💰", tcode: "SLS_VIEW" },
    { title: "Packzone (Materials)", path: "/packzone", icon: "🏷️", tcode: "PKG_VIEW" },
    { title: "Analytics & Graphs", path: "/graphs", icon: "📊", tcode: "ANL_VIEW" },
    { title: "Manage Users", path: "/users", icon: "👤", adminOnly: true },
    { title: "System Logs", path: "/logs", icon: "📜", adminOnly: true },
  ];

  // 1. Pehle filter karo ki user ko kya dekhne ka haq hai
  const allowedMenus = allMenuItems.filter(item => {
    if (item.alwaysShow) return true;
    if (item.adminOnly) return user?.userType === "admin";
    return hasAccess(item.tcode);
  });

  // 2. Phir filter karo jo user ne search box mein type kiya hai
  const searchedMenus = allowedMenus.filter(item => 
    item.title.toLowerCase().includes(menuSearch.toLowerCase())
  );

  return (
    <div style={styles.sidebar}>
      <div style={styles.logoArea} onClick={() => navigate("/dashboard")}>
                <h2>Oriviyan ERP</h2>
      </div>

      <div style={styles.searchBox}>
        <input 
          type="text" 
          placeholder="Search sections..." 
          value={menuSearch}
          onChange={(e) => setMenuSearch(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      <nav style={styles.navMenu}>
        {searchedMenus.length > 0 ? (
          searchedMenus.map((menu, index) => (
            <NavLink 
              key={index} 
              to={menu.path} 
              style={({ isActive }) => ({
                ...styles.navItem,
                ...(isActive ? styles.navItemActive : {})
              })}
            >
              <span style={styles.icon}>{menu.icon}</span>
              {menu.title}
            </NavLink>
          ))
        ) : (
          <p style={styles.noMatchText}>No matching sections found.</p>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;

const styles = {
  sidebar: { width: "260px",fontFamily: "'Inter', sans-serif", backgroundColor: "#1e293b", color: "#fff", display: "flex", flexDirection: "column", height: "100vh", borderRight: "1px solid #334155" },
  logoArea: { padding: "20px", borderBottom: "1px solid #334155", textAlign: "center", cursor: "pointer" },
  searchBox: { padding: "15px" },
  searchInput: { width: "100%", padding: "10px", borderRadius: "6px", border: "none", backgroundColor: "#334155", color: "#fff", outline: "none", boxSizing: "border-box" },
  navMenu: { padding: "10px", display: "flex", flexDirection: "column", gap: "5px", overflowY: "auto", flex: 1 },
  navItem: { display: "flex", alignItems: "center", gap: "12px", padding: "12px 15px", borderRadius: "8px", color: "#cbd5e1", textDecoration: "none", transition: "all 0.2s" },
  navItemActive: { backgroundColor: "#3b82f6", color: "#fff", fontWeight: "600" },
  icon: { fontSize: "18px" },
  noMatchText: { color: "#94a3b8", fontSize: "13px", textAlign: "center", marginTop: "20px" }
};
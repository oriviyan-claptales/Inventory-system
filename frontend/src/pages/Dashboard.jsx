// import { useEffect, useState } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom"; // Logout ke liye

// export default function Dashboard() {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Current user fetch karo
//     api.get("/users/current")
//       .then((res) => {
//         console.log("Backend se ye data aaya:", res.data);
//         setUser(res.data);
//       })
//       .catch((err) => {
//         console.log("Auth error:", err.response?.status);
      
//       });
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await api.post("/auth/signout"); // Backend route name check kar lena (signout vs logout)
//       navigate("/"); // Logout ke baad home ya login par bhej do
//     } catch (err) {
//       console.log("Logout failed", err);
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Dashboard</h2>
//       {user ? (
//         <>
//           <p>Welcome, <strong>{user.name || user.email}</strong></p>
//           <button onClick={handleLogout} style={{ background: "red", color: "white", border: "none", padding: "8px 15px", borderRadius: "5px", cursor: "pointer" }}>
//             Logout
//           </button>
//         </>
//       ) : (
//         <p>Loading user data...</p>
//       )}
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; // Notification ke liye

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Current user fetch karo
    const fetchUser = async () => {
      try {
        const res = await api.get("/users/current");
        setUser(res.data);
      } catch (err) {
        console.log("Auth error:", err.response?.status);
        // Agar auth fail ho to login par bhej do
        // navigate("/login"); 
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/auth/signout");
      toast.success("Logged out successfully");
      navigate("/");
    } catch (err) {
      console.log("Logout failed", err);
      toast.error("Logout failed");
    }
  };

  // Agar loading hai to spinner dikhao
  if (loading) return <div style={styles.loadingScreen}>Loading Dashboard...</div>;

  return (
    <div style={styles.container}>
      
      {/* --- SIDEBAR --- */}
      <aside style={styles.sidebar}>
        <div style={styles.logoArea}>
          <h2 style={{ margin: 0, color: "#fff" }}>🚀 AdminPanel</h2>
        </div>
        
        <nav style={styles.nav}>
          <p style={styles.navTitle}>INVENTORY</p>
          <button style={styles.navLink} onClick={() => navigate("/products")}>📦 Product List</button>
          <button style={styles.navLink} onClick={() => navigate("/add-product")}>➕ Add Product</button>
          
          <p style={styles.navTitle}>MANAGEMENT</p>
          <button style={styles.navLink} onClick={() => navigate("/create-user")}>👤 Create User</button>
          <button style={styles.navLink}>⚙️ Settings</button>
        </nav>

        <div style={styles.sidebarFooter}>
          <p style={{ fontSize: "12px", color: "#94a3b8" }}>v1.0.0</p>
        </div>
      </aside>


      {/* --- MAIN CONTENT --- */}
      <main style={styles.mainContent}>
        
        {/* --- TOP HEADER --- */}
        <header style={styles.header}>
          <div>
            <h3 style={styles.pageTitle}>Dashboard Overview</h3>
          </div>
          
          <div style={styles.profileSection}>
            <div style={styles.userInfo}>
              <span style={styles.userName}>{user?.name || "User"}</span>
              <span style={styles.userRole}>{user?.userType || "Admin"}</span>
            </div>
            <button onClick={handleLogout} style={styles.logoutBtn}>
              Logout ↪
            </button>
          </div>
        </header>

        {/* --- STATS CARDS (Dummy Data for UI) --- */}
        <div style={styles.statsGrid}>
          <div style={styles.card}>
            <span style={styles.cardIcon}>📦</span>
            <div>
              <p style={styles.cardLabel}>Total Products</p>
              <h2 style={styles.cardValue}>124</h2>
            </div>
          </div>
          
          <div style={styles.card}>
            <span style={styles.cardIcon}>💰</span>
            <div>
              <p style={styles.cardLabel}>Total Value</p>
              <h2 style={styles.cardValue}>₹4.5L</h2>
            </div>
          </div>

          <div style={styles.card}>
            <span style={styles.cardIcon}>⚠️</span>
            <div>
              <p style={styles.cardLabel}>Low Stock</p>
              <h2 style={{...styles.cardValue, color: "#d32f2f"}}>5 Items</h2>
            </div>
          </div>
        </div>

        {/* --- QUICK ACTIONS --- */}
        <h4 style={styles.sectionTitle}>Quick Actions</h4>
        <div style={styles.actionsGrid}>
          <div style={styles.actionCard} onClick={() => navigate("/add-product")}>
            <span style={{fontSize: "30px"}}>➕</span>
            <p>Add New Product</p>
          </div>
          
          <div style={styles.actionCard} onClick={() => navigate("/products")}>
            <span style={{fontSize: "30px"}}>📋</span>
            <p>View Inventory</p>
          </div>

          <div style={styles.actionCard} onClick={() => navigate("/create-user")}>
            <span style={{fontSize: "30px"}}>👤</span>
            <p>Add Staff Member</p>
          </div>
        </div>

      </main>
    </div>
  );
}

// --- PROFESSIONAL STYLES ---
const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f1f5f9", // Very light grey bg
    fontFamily: "'Segoe UI', sans-serif",
  },
  loadingScreen: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "20px",
    color: "#64748b",
  },

  // Sidebar
  sidebar: {
    width: "250px",
    backgroundColor: "#1e293b", // Dark Blue/Grey
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    position: "fixed", // Fixed sidebar
    height: "100vh",
    zIndex: 10,
  },
  logoArea: {
    padding: "25px",
    borderBottom: "1px solid #334155",
  },
  nav: {
    padding: "20px",
    flex: 1,
  },
  navTitle: {
    fontSize: "11px",
    fontWeight: "bold",
    color: "#94a3b8",
    marginTop: "20px",
    marginBottom: "10px",
    letterSpacing: "1px",
  },
  navLink: {
    display: "block",
    width: "100%",
    padding: "12px",
    marginBottom: "5px",
    backgroundColor: "transparent",
    border: "none",
    color: "#e2e8f0",
    textAlign: "left",
    cursor: "pointer",
    fontSize: "15px",
    borderRadius: "6px",
    transition: "0.2s",
  },
  sidebarFooter: {
    padding: "20px",
    borderTop: "1px solid #334155",
    textAlign: "center",
  },

  // Main Content
  mainContent: {
    flex: 1,
    marginLeft: "250px", // Sidebar jitna space choda
    padding: "30px",
  },

  // Header
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40px",
    backgroundColor: "#fff",
    padding: "15px 30px",
    borderRadius: "12px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
  },
  pageTitle: {
    margin: 0,
    fontSize: "22px",
    color: "#1e293b",
  },
  profileSection: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  userInfo: {
    textAlign: "right",
  },
  userName: {
    display: "block",
    fontWeight: "bold",
    color: "#334155",
    fontSize: "15px",
  },
  userRole: {
    display: "block",
    fontSize: "12px",
    color: "#64748b",
    textTransform: "uppercase",
  },
  logoutBtn: {
    padding: "8px 16px",
    backgroundColor: "#fee2e2",
    color: "#dc2626",
    border: "1px solid #fecaca",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
  },

  // Stats Grid
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginBottom: "40px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  cardIcon: {
    fontSize: "30px",
    backgroundColor: "#f1f5f9",
    padding: "15px",
    borderRadius: "50%",
  },
  cardLabel: {
    margin: 0,
    fontSize: "14px",
    color: "#64748b",
  },
  cardValue: {
    margin: "5px 0 0 0",
    fontSize: "24px",
    color: "#0f172a",
  },

  // Quick Actions
  sectionTitle: {
    fontSize: "18px",
    color: "#334155",
    marginBottom: "20px",
  },
  actionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
  },
  actionCard: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    textAlign: "center",
    cursor: "pointer",
    border: "2px dashed #cbd5e1",
    color: "#475569",
    fontWeight: "600",
    transition: "0.2s",
  },
};
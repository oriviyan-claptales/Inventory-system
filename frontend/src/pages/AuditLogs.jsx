

import React, { useEffect, useState, useMemo } from "react";
import api from "../api/axios";
import Header from "../components/Header";
import toast from "react-hot-toast";

export default function LogHistory() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  // --- 📅 DATE FILTER STATES ---
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // --- 📄 PAGINATION STATES (NEW) ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // Har page par 15 logs dikhenge

  useEffect(() => {
    fetchLogs();
    // eslint-disable-next-line
  }, []);

  const fetchLogs = async (sDate = "", eDate = "") => {
    setLoading(true);
    setCurrentPage(1); // Naya data aane par page 1 par reset karein
    try {
      // Backend ko dates bhej rahe hain query params mein
      const res = await api.get(`/logs`, {
        params: { startDate: sDate, endDate: eDate }
      });
      setLogs(res.data);
    } catch (error) {
      toast.error("Failed to fetch logs");
    } finally {
      setLoading(false);
    }
  };

  // Filter apply karne wala function
  const handleApplyFilter = () => {
    if (!startDate || !endDate) {
      return toast.error("Please select both Start and End dates");
    }
    fetchLogs(startDate, endDate);
  };

  // Sab clear karne wala function
  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    fetchLogs("", ""); // Khali bhejenge toh "All" aayega
  };

  // --- CATEGORY FILTER LOGIC ---
  const filteredLogs = useMemo(() => {
    if (activeTab === "all") return logs;
    return logs.filter((log) => {
      const action = log.action;
      if (activeTab === "auth") return action === "LOGIN" || action === "LOGOUT";
      if (activeTab === "products") return action.includes("PRODUCT") || action.includes("STOCK") || action.includes("BARCODE");
      if (activeTab === "users") return action.includes("USER") || action.includes("CREATE_USER");
      return true;
    });
  }, [logs, activeTab]);

  // --- 📄 PAGINATION LOGIC (CALCULATION) ---
  const indexOfLastLog = currentPage * itemsPerPage;
  const indexOfFirstLog = indexOfLastLog - itemsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getActionStyles = (action) => {
    if (action.includes("DELETE")) return { bg: "#fee2e2", text: "#dc2626" };
    if (action.includes("CREATE") || action.includes("ADD")) return { bg: "#dcfce7", text: "#166534" };
    if (action.includes("LOGIN")) return { bg: "#e0f2fe", text: "#0284c7" };
    if (action.includes("LOGOUT")) return { bg: "#f3f4f6", text: "#4b5563" };
    if (action.includes("FREEZE")) return { bg: "#ffedd5", text: "#ea580c" };
    return { bg: "#f3f4f6", text: "#374151" };
  };

  return (
    <div style={styles.container}>
      <Header />
      <div style={styles.mainContent}>
        <div style={styles.headerWrapper}>
          <h2 style={styles.title}>System Audit Logs</h2>
          <p style={styles.subtitle}>Filter logs by date range and category.</p>
        </div>

        {/* --- 🔍 DATE FILTER BAR --- */}
        <div style={styles.filterBar}>
          <div style={styles.inputGroup}>
            <label style={styles.miniLabel}>FROM DATE</label>
            <input 
              type="date" 
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)} 
              style={styles.dateInput} 
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.miniLabel}>TO DATE</label>
            <input 
              type="date" 
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)} 
              style={styles.dateInput} 
            />
          </div>
          <button onClick={handleApplyFilter} style={styles.applyBtn}>🔍 Apply</button>
          <button onClick={handleReset} style={styles.resetBtn}>🔄 Reset All</button>
        </div>

        {/* --- TABS --- */}
        <div style={styles.tabBar}>
          {["all", "auth", "products", "users"].map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setCurrentPage(1); }} // Tab change par page 1 par wapas
              style={{ ...styles.tabItem, ...(activeTab === tab ? styles.activeTab : {}) }}
            >
              {tab === "all" ? "📂 All" : tab === "auth" ? "🔐 Auth" : tab === "products" ? "📦 Products" : "👥 Users"}
            </button>
          ))}
        </div>

        {/* --- TABLE --- */}
        <div style={styles.card}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={{ ...styles.th, width: '20%' }}>Timestamp</th>
                <th style={{ ...styles.th, width: '15%' }}>Actor</th>
                <th style={{ ...styles.th, width: '15%' }}>Action</th>
                <th style={{ ...styles.th, width: '50%' }}>Details</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="4" style={styles.loader}>Loading logs...</td></tr>
              ) : filteredLogs.length === 0 ? (
                <tr><td colSpan="4" style={styles.loader}>No activity found for this period.</td></tr>
              ) : (
                // 👇 Using 'currentLogs' instead of 'filteredLogs' for pagination
                currentLogs.map((log) => {
                  const theme = getActionStyles(log.action);
                  return (
                    <tr key={log._id} style={styles.row}>
                      <td style={styles.td}>{new Date(log.timestamp).toLocaleString()}</td>
                      <td style={{ ...styles.td, fontWeight: "600" }}>{log.actorName}</td>
                      <td style={styles.td}>
                        <span style={{ ...styles.badge, backgroundColor: theme.bg, color: theme.text }}>
                          {log.action}
                        </span>
                      </td>
                      <td style={{ ...styles.td, fontSize: '13px', lineHeight: '1.4' }}>{log.details}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* 👇 PAGINATION CONTROLS */}
        {!loading && filteredLogs.length > itemsPerPage && (
            <div style={styles.paginationWrapper}>
                <button 
                    onClick={() => paginate(currentPage - 1)} 
                    disabled={currentPage === 1}
                    style={currentPage === 1 ? styles.disabledBtn : styles.pageBtn}
                >
                    Previous
                </button>

                <span style={styles.pageInfo}>
                    Page {currentPage} of {totalPages}
                </span>

                <button 
                    onClick={() => paginate(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                    style={currentPage === totalPages ? styles.disabledBtn : styles.pageBtn}
                >
                    Next
                </button>
            </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "'Inter', sans-serif" },
  mainContent: { padding: "20px", maxWidth: "1100px", margin: "0 auto" },
  headerWrapper: { marginBottom: "20px" },
  title: { fontSize: "22px", fontWeight: "800", color: "#0f172a", margin: 0 },
  subtitle: { fontSize: "14px", color: "#64748b" },

  // Filter Bar Styles
  filterBar: { 
    display: 'flex', gap: '15px', alignItems: 'flex-end', marginBottom: '20px', 
    backgroundColor: '#fff', padding: '15px', borderRadius: '12px', border: '1px solid #e2e8f0',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
  },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '5px' },
  miniLabel: { fontSize: '10px', fontWeight: 'bold', color: '#94a3b8', letterSpacing: '0.5px' },
  dateInput: { 
    padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', 
    fontSize: '13px', outline: 'none', color: '#334155' 
  },
  applyBtn: { 
    background: '#2563eb', color: '#fff', border: 'none', padding: '9px 18px', 
    borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '13px', transition: '0.2s' 
  },
  resetBtn: { 
    background: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1', padding: '9px 18px', 
    borderRadius: '6px', cursor: 'pointer', fontSize: '13px', transition: '0.2s' 
  },

  tabBar: { display: 'flex', gap: '8px', marginBottom: '20px' },
  tabItem: { 
    padding: '10px 18px', border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', 
    fontSize: '13px', fontWeight: '600', color: '#64748b', borderRadius: '8px', transition: '0.2s' 
  },
  activeTab: { backgroundColor: '#2563eb', color: '#fff', border: '1px solid #2563eb' },

  card: { backgroundColor: "#fff", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: '1px solid #e2e8f0', overflow: "hidden" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { padding: "12px 15px", backgroundColor: "#f8fafc", textAlign: "left", fontSize: "11px", fontWeight: "700", color: "#475569", textTransform: "uppercase", borderBottom: '1px solid #e2e8f0' },
  td: { padding: "12px 15px", borderBottom: "1px solid #f1f5f9", fontSize: "14px", color: "#334155" },
  badge: { padding: "4px 10px", borderRadius: "6px", fontSize: "10px", fontWeight: "800" },
  loader: { padding: "40px", textAlign: "center", color: "#64748b" },
  row: { transition: "0.2s" },

  // 👇 New Styles for Pagination
  paginationWrapper: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '20px' },
  pageBtn: { background: '#2563eb', border: '1px solid #2563eb', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', color: '#fff', fontSize: '13px', fontWeight: '600' },
  disabledBtn: { background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '8px 16px', borderRadius: '6px', cursor: 'not-allowed', color: '#94a3b8', fontSize: '13px' },
  pageInfo: { fontSize: '14px', fontWeight: '600', color: '#334155' },
};

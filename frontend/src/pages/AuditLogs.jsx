import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Header from "../components/Header";
import toast from "react-hot-toast";

export default function LogHistory() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await api.get("/logs"); // Backend route
      setLogs(res.data);
    } catch (error) {
      toast.error("Failed to fetch logs");
    } finally {
      setLoading(false);
    }
  };

  // Helper for Badge Color
  const getActionColor = (action) => {
    if (action.includes("DELETE")) return "#fee2e2"; // Red
    if (action.includes("CREATE") || action.includes("ADD")) return "#dcfce7"; // Green
    if (action.includes("LOGIN")) return "#e0f2fe"; // Blue
    if (action.includes("FREEZE")) return "#ffedd5"; // Orange
    return "#f3f4f6"; // Grey
  };

  const getActionTextColor = (action) => {
    if (action.includes("DELETE")) return "#dc2626";
    if (action.includes("CREATE") || action.includes("ADD")) return "#166534";
    if (action.includes("LOGIN")) return "#0284c7";
    if (action.includes("FREEZE")) return "#ea580c";
    return "#374151";
  };

  return (
    <div style={styles.container}>
      <Header />
      <div style={styles.mainContent}>
        <div style={styles.headerWrapper}>
            <h2 style={styles.title}>System Audit Logs</h2>
            <p style={styles.subtitle}>Track all user activities and system changes.</p>
        </div>

        <div style={styles.card}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Time</th>
                <th style={styles.th}>Actor (User)</th>
                <th style={styles.th}>Action</th>
                <th style={styles.th}>Details</th>
                <th style={styles.th}>IP Address</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="5" style={{padding: "20px", textAlign: "center"}}>Loading Logs...</td></tr>
              ) : (
                logs.map((log) => (
                  <tr key={log._id} style={styles.row}>
                    <td style={styles.td}>
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td style={{...styles.td, fontWeight: "600"}}>
                      {log.actorName || "Unknown"}
                    </td>
                    <td style={styles.td}>
                      <span style={{
                        padding: "4px 8px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: "700",
                        backgroundColor: getActionColor(log.action),
                        color: getActionTextColor(log.action)
                      }}>
                        {log.action}
                      </span>
                    </td>
                    <td style={styles.td}>{log.details}</td>
                    <td style={{...styles.td, fontSize: "12px", color: "#666"}}>
                      {log.ip}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", backgroundColor: "#f3f4f6", fontFamily: "'Segoe UI', sans-serif" },
  mainContent: { padding: "30px 20px", maxWidth: "1200px", margin: "0 auto" },
  headerWrapper: { marginBottom: "20px" },
  title: { fontSize: "24px", fontWeight: "700", color: "#1e293b", margin: 0 },
  subtitle: { fontSize: "14px", color: "#64748b", margin: "5px 0 0 0" },
  card: { backgroundColor: "#fff", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)", overflow: "hidden" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { padding: "15px", backgroundColor: "#f8fafc", textAlign: "left", fontSize: "13px", fontWeight: "600", color: "#64748b", borderBottom: "1px solid #e2e8f0" },
  td: { padding: "12px 15px", borderBottom: "1px solid #f1f5f9", fontSize: "14px", color: "#334155" },
  row: { transition: "background 0.1s" },
};
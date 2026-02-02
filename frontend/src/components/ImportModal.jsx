import React, { useState } from "react";
import * as XLSX from "xlsx";
import api from "../api/axios";
import toast from "react-hot-toast";

const ImportModal = ({ isOpen, onClose, onSuccess }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]); // Error list store karne ke liye
  const [summary, setSummary] = useState(null); // Success summary

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setErrors([]);
    setSummary(null);
  };

  const handleUpload = () => {
    if (!file) return toast.error("Please select a file first!");

    setLoading(true);
    const reader = new FileReader();
    reader.readAsBinaryString(file);

    reader.onload = async (e) => {
      try {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        if (jsonData.length === 0) {
          setLoading(false);
          return toast.error("Excel sheet is empty!");
        }

        // Backend Call
        const res = await api.post("/products/import", jsonData, {
          withCredentials: true,
        });

        // Agar response me failedProducts hain
        if (res.data.failedCount > 0) {
          setErrors(res.data.failedProducts); // Errors ko state me set karo
          toast.error(`Import finished with ${res.data.failedCount} errors.`);
        } else {
          toast.success("All products imported successfully!");
          onSuccess(); // Parent ko batao success ho gaya
          onClose(); // Modal band kar do
        }

        if (res.data.success) {
           // Agar kuch pass huye aur kuch fail, tab bhi refresh to karna hi hai
           if(res.data.failedCount > 0) onSuccess();
        }

      } catch (error) {
        toast.error("Server Error or Invalid File Format");
        console.error("Import Error:", error);
        
        // Agar backend se koi specific message aaya hai to wo dikhao
        const serverMsg = error.response?.data?.message;
        if (serverMsg) {
            toast.error(`Error: ${serverMsg}`);
        } else {
            toast.error("Import Failed! Check console for details.");
        }
        
        // Agar Failed Products ki list error object ke andar hai (Optional handling)
        if (error.response?.data?.failedProducts) {
             setErrors(error.response.data.failedProducts);
        }
      } finally {
        setLoading(false);
      }
    };
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>📤 Import Products from Excel</h2>
          <button onClick={onClose} style={styles.closeBtn}>✕</button>
        </div>

        {/* Body */}
        <div style={styles.body}>
          {!errors.length ? (
            <>
              <p style={styles.instructions}>
                Select an Excel file (.xlsx) with columns: <b>name, category, price, Qty</b> etc.
              </p>
              
              <div style={styles.uploadBox}>
                <input 
                  type="file" 
                  accept=".xlsx, .xls" 
                  onChange={handleFileChange} 
                  style={styles.fileInput}
                />
              </div>

              {/* Action Buttons */}
              <div style={styles.footer}>
                <button onClick={onClose} style={styles.cancelBtn} disabled={loading}>Cancel</button>
                <button 
                  onClick={handleUpload} 
                  style={styles.uploadBtn}
                  disabled={loading || !file}
                >
                  {loading ? "Processing..." : "Upload & Process"}
                </button>
              </div>
            </>
          ) : (
            /* Error Report View */
            <div style={styles.errorSection}>
              <div style={styles.errorHeader}>
                <span style={{color: '#dc2626'}}>⚠️ {errors.length} Products Failed</span>
                <button onClick={() => setErrors([])} style={styles.retryBtn}>Try Again</button>
              </div>
              
              <div style={styles.errorTableWrapper}>
                <table style={styles.errorTable}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Product Name</th>
                      <th style={styles.th}>Error Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {errors.map((err, index) => (
                      <tr key={index}>
                        <td style={styles.td}>{err.name}</td>
                        <td style={{...styles.td, color: '#dc2626'}}>{err.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p style={styles.note}>*Please fix these rows in Excel and upload again.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000
  },
  modal: {
    backgroundColor: "#fff", width: "90%", maxWidth: "500px", borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)", overflow: "hidden", animation: "fadeIn 0.2s ease-in-out"
  },
  header: {
    padding: "15px 20px", borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#f8fafc"
  },
  title: { margin: 0, fontSize: "16px", fontWeight: "600", color: "#334155" },
  closeBtn: { background: "none", border: "none", fontSize: "18px", cursor: "pointer", color: "#64748b" },
  body: { padding: "20px" },
  instructions: { fontSize: "13px", color: "#64748b", marginBottom: "15px", lineHeight: "1.5" },
  uploadBox: { border: "2px dashed #cbd5e1", borderRadius: "8px", padding: "20px", textAlign: "center", marginBottom: "20px", backgroundColor: "#f1f5f9" },
  fileInput: { width: "100%" },
  footer: { display: "flex", justifyContent: "flex-end", gap: "10px" },
  cancelBtn: { padding: "8px 16px", border: "1px solid #cbd5e1", background: "#fff", borderRadius: "6px", cursor: "pointer" },
  uploadBtn: { padding: "8px 16px", border: "none", background: "#2563eb", color: "#fff", borderRadius: "6px", cursor: "pointer", fontWeight: "600" },
  
  // Error Styles
  errorSection: { textAlign: "left" },
  errorHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px", fontWeight: "bold" },
  retryBtn: { fontSize: "12px", textDecoration: "underline", background: "none", border: "none", color: "#2563eb", cursor: "pointer" },
  errorTableWrapper: { maxHeight: "200px", overflowY: "auto", border: "1px solid #e2e8f0", borderRadius: "6px" },
  errorTable: { width: "100%", borderCollapse: "collapse", fontSize: "13px" },
  th: { padding: "8px", borderBottom: "1px solid #e2e8f0", background: "#f8fafc", textAlign: "left", position: "sticky", top: 0 },
  td: { padding: "8px", borderBottom: "1px solid #f1f5f9" },
  note: { fontSize: "12px", color: "#94a3b8", marginTop: "10px", fontStyle: "italic" }
};

export default ImportModal;

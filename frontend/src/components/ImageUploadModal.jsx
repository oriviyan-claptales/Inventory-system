import React, { useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

const ImageUploadModal = ({ isOpen, onClose }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadedUrl(""); // Nayi file lene par purana URL hata do
  };

  const handleUpload = async () => {
    if (!file) return toast.error("Please select an image first!");

    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      // Wahi API use kar rahe hain jo ProductForm me ki thi
      const res = await api.post("/products/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.url) {
        setUploadedUrl(res.data.url);
        toast.success("Image uploaded! URL generated.");
      }
    } catch (error) {
      console.error("Upload Error:", error);
      toast.error("Upload failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(uploadedUrl);
    toast.success("URL Copied to Clipboard! 📋");
  };

  const handleClose = () => {
    setFile(null);
    setUploadedUrl("");
    onClose();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>📷 Get Image URL</h2>
          <button onClick={handleClose} style={styles.closeBtn}>✕</button>
        </div>

        {/* Body */}
        <div style={styles.body}>
          {!uploadedUrl ? (
            // State 1: Upload UI
            <div style={{ textAlign: "center" }}>
              <div style={styles.uploadBox}>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                  style={styles.fileInput} 
                />
                {file && <p style={styles.fileName}>Selected: {file.name}</p>}
              </div>
              <button 
                onClick={handleUpload} 
                style={styles.uploadBtn}
                disabled={loading || !file}
              >
                {loading ? "Uploading..." : "☁️ Upload & Generate Link"}
              </button>
            </div>
          ) : (
            // State 2: Result UI (URL + Copy Button)
            <div style={styles.resultBox}>
              <p style={styles.label}>✅ Here is your Image URL:</p>
              
              <div style={styles.urlContainer}>
                <input type="text" value={uploadedUrl} readOnly style={styles.urlInput} />
                <button onClick={copyToClipboard} style={styles.copyBtn}>Copy</button>
              </div>

              {/* Preview */}
              <div style={styles.previewContainer}>
                  <img src={uploadedUrl} alt="Preview" style={styles.preview} />
              </div>

              <button onClick={() => setUploadedUrl("")} style={styles.resetBtn}>
                 Upload Another Image
              </button>
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
    backgroundColor: "rgba(0, 0, 0, 0.6)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1100
  },
  modal: {
    backgroundColor: "#fff", width: "90%", maxWidth: "450px", borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)", overflow: "hidden", animation: "popIn 0.2s"
  },
  header: {
    padding: "15px 20px", borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#f8fafc"
  },
  title: { margin: 0, fontSize: "16px", fontWeight: "600", color: "#334155" },
  closeBtn: { background: "none", border: "none", fontSize: "18px", cursor: "pointer", color: "#64748b" },
  body: { padding: "20px" },
  
  // Upload Styles
  uploadBox: { border: "2px dashed #cbd5e1", borderRadius: "8px", padding: "30px 20px", marginBottom: "20px", backgroundColor: "#f1f5f9" },
  fileInput: { width: "100%" },
  fileName: { fontSize: "13px", color: "#2563eb", marginTop: "10px", fontWeight: "500" },
  uploadBtn: { width: "100%", padding: "10px", border: "none", background: "#2563eb", color: "#fff", borderRadius: "6px", cursor: "pointer", fontWeight: "600", fontSize: "14px" },

  // Result Styles
  resultBox: { textAlign: "center" },
  label: { fontSize: "14px", fontWeight: "600", color: "#166534", marginBottom: "10px" },
  urlContainer: { display: "flex", gap: "8px", marginBottom: "15px" },
  urlInput: { flex: 1, padding: "8px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "12px", backgroundColor: "#f8fafc", color: "#334155" },
  copyBtn: { padding: "8px 12px", background: "#16a34a", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "600", fontSize: "12px" },
  previewContainer: { marginBottom: "15px", border: "1px solid #eee", borderRadius: "6px", padding: "5px" },
  preview: { maxWidth: "100%", maxHeight: "150px", borderRadius: "4px" },
  resetBtn: { background: "none", border: "1px solid #94a3b8", color: "#64748b", padding: "6px 12px", borderRadius: "4px", cursor: "pointer", fontSize: "12px" }
};

export default ImageUploadModal;

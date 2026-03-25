import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Header from "../components/Header";

export default function AddLabelStock() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    labelName: "",
    labelType: "",
    customTypeName: "",
    currentStock: 0,
    minimumStock: 100,
    description: "",
    size: "",
    isActive: true
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ 
      ...form, 
      [name]: type === "checkbox" ? checked : value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.labelName.trim()) {
      return toast.error("Label name is required");
    }
    if (!form.labelType) {
      return toast.error("Please select a label type");
    }
    if (form.labelType === "Custom" && !form.customTypeName.trim()) {
      return toast.error("Please enter custom type name");
    }
    if (form.currentStock < 0) {
      return toast.error("Stock quantity cannot be negative");
    }
    if (form.minimumStock < 0) {
      return toast.error("Minimum stock cannot be negative");
    }

    setLoading(true);
    const toastId = toast.loading("Creating label stock...");

    try {
      await api.post("/label-stocks", form);

      toast.success("Label stock created successfully!", { id: toastId });
      
      setTimeout(() => {
        navigate("/label-stocks");
      }, 1500);

    } catch (err) {
      console.error("Error creating label stock:", err);
      toast.error(err.response?.data?.message || "Failed to create label stock", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div style={styles.container}>
        
        {/* Header Section */}
        <div style={styles.headerWrapper}>
          <button 
            onClick={() => navigate("/label-stocks")} 
            style={styles.backBtn}
          >
            <span style={{marginRight: "8px"}}>⬅</span> Back
          </button>
          <h1 style={styles.pageTitle}>Label Stock Management</h1>
        </div>

        {/* Card Section */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.title}>🏷️ Add New Label Stock</h2>
            <p style={styles.subtitle}>Enter details for new label/sticker inventory</p>
          </div>

          <form onSubmit={handleSubmit}>
            
            {/* Label Name */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Label Name *</label>
              <input
                type="text"
                name="labelName"
                placeholder="e.g., Product Label - White (Back)"
                value={form.labelName}
                onChange={handleChange}
                required
                style={styles.input}
              />
              <small style={styles.hint}>Give a descriptive name for this label type</small>
            </div>

            {/* Label Type */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Label Type *</label>
              <select
                name="labelType"
                value={form.labelType}
                onChange={handleChange}
                required
                style={styles.select}
              >
                <option value="">Select Label Type...</option>
                <option value="Product Label">📦 Product Label (Details on back)</option>
                <option value="Barcode Sticker">🏷️ Barcode Sticker</option>
                <option value="Shipping Label">📮 Shipping Label</option>
                <option value="Thank You Card">💌 Thank You Card</option>
                <option value="Custom">⚙️ Custom (Define your own)</option>
              </select>
            </div>

            {/* Custom Type Name (if Custom selected) */}
            {form.labelType === "Custom" && (
              <div style={styles.inputGroup}>
                <label style={styles.label}>Custom Type Name *</label>
                <input
                  type="text"
                  name="customTypeName"
                  placeholder="e.g., Warranty Seal, Gift Tag"
                  value={form.customTypeName}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>
            )}

            {/* Current Stock */}
            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Current Stock Quantity *</label>
                <input
                  type="number"
                  name="currentStock"
                  placeholder="0"
                  value={form.currentStock}
                  onChange={handleChange}
                  required
                  min="0"
                  style={styles.input}
                />
                <small style={styles.hint}>How many units you have right now</small>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Minimum Stock Level *</label>
                <input
                  type="number"
                  name="minimumStock"
                  placeholder="100"
                  value={form.minimumStock}
                  onChange={handleChange}
                  required
                  min="0"
                  style={styles.input}
                />
                <small style={styles.hint}>Alert when stock goes below this</small>
              </div>
            </div>

            {/* Size */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Size / Dimensions</label>
              <input
                type="text"
                name="size"
                placeholder="e.g., 10cm x 5cm, A4, 2x2 inch"
                value={form.size}
                onChange={handleChange}
                style={styles.input}
              />
              <small style={styles.hint}>Optional - Physical size of the label</small>
            </div>

            {/* Description */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Description / Notes</label>
              <textarea
                name="description"
                placeholder="Any additional details about this label stock..."
                value={form.description}
                onChange={handleChange}
                style={{...styles.input, minHeight: "100px"}}
                rows="4"
              />
              <small style={styles.hint}>Optional - Any special notes or details</small>
            </div>

            {/* Active Status */}
            <div style={styles.checkboxGroup}>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="isActive"
                  checked={form.isActive}
                  onChange={handleChange}
                  style={styles.checkbox}
                />
                <span>Make this label stock active immediately</span>
              </label>
              <small style={styles.hint}>Inactive items won't show in main list by default</small>
            </div>

            {/* Preview Box */}
            <div style={styles.previewBox}>
              <h4 style={styles.previewTitle}>📋 Preview</h4>
              <div style={styles.previewContent}>
                <div style={styles.previewRow}>
                  <strong>Name:</strong> {form.labelName || "Not set"}
                </div>
                <div style={styles.previewRow}>
                  <strong>Type:</strong> {
                    form.labelType === "Custom" && form.customTypeName 
                      ? form.customTypeName 
                      : (form.labelType || "Not selected")
                  }
                </div>
                <div style={styles.previewRow}>
                  <strong>Current Stock:</strong> {form.currentStock} units
                </div>
                <div style={styles.previewRow}>
                  <strong>Minimum Stock:</strong> {form.minimumStock} units
                </div>
                {form.size && (
                  <div style={styles.previewRow}>
                    <strong>Size:</strong> {form.size}
                  </div>
                )}
                <div style={styles.previewRow}>
                  <strong>Status:</strong>{" "}
                  <span style={form.isActive ? styles.activeTag : styles.inactiveTag}>
                    {form.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
                {parseInt(form.currentStock) <= parseInt(form.minimumStock) && (
                  <div style={styles.warningBox}>
                    ⚠️ Warning: Current stock is at or below minimum level!
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div style={styles.buttonGroup}>
              <button 
                type="button"
                onClick={() => navigate("/label-stocks")}
                style={styles.cancelButton}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={loading}
                style={loading ? styles.buttonDisabled : styles.button}
              >
                {loading ? "Creating..." : "Create Label Stock"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

// ==================== STYLES ====================
const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
    padding: "40px 20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  headerWrapper: {
    width: "100%",
    maxWidth: "800px",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    gap: "16px"
  },
  backBtn: {
    padding: "10px 16px",
    backgroundColor: "white",
    border: "2px solid #e5e7eb",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
    cursor: "pointer",
    transition: "all 0.2s",
    display: "flex",
    alignItems: "center"
  },
  pageTitle: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#1f2937",
    margin: 0
  },
  card: {
    backgroundColor: "white",
    borderRadius: "16px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.07)",
    padding: "32px",
    width: "100%",
    maxWidth: "800px",
  },
  cardHeader: {
    marginBottom: "32px",
    paddingBottom: "20px",
    borderBottom: "2px solid #f3f4f6"
  },
  title: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: "8px"
  },
  subtitle: {
    fontSize: "14px",
    color: "#6b7280",
    margin: 0
  },
  inputGroup: {
    marginBottom: "24px"
  },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "8px"
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    fontSize: "14px",
    border: "2px solid #e5e7eb",
    borderRadius: "8px",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
    fontFamily: "inherit"
  },
  select: {
    width: "100%",
    padding: "12px 16px",
    fontSize: "14px",
    border: "2px solid #e5e7eb",
    borderRadius: "8px",
    backgroundColor: "white",
    cursor: "pointer",
    boxSizing: "border-box"
  },
  hint: {
    display: "block",
    marginTop: "6px",
    fontSize: "12px",
    color: "#9ca3af"
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginBottom: "24px"
  },
  checkboxGroup: {
    marginBottom: "24px"
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
    color: "#374151",
    cursor: "pointer",
    gap: "8px",
    fontWeight: "500"
  },
  checkbox: {
    width: "18px",
    height: "18px",
    cursor: "pointer"
  },
  previewBox: {
    backgroundColor: "#f9fafb",
    padding: "20px",
    borderRadius: "12px",
    border: "2px dashed #d1d5db",
    marginBottom: "24px"
  },
  previewTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#6b7280",
    marginBottom: "16px",
    marginTop: 0
  },
  previewContent: {
    fontSize: "14px"
  },
  previewRow: {
    marginBottom: "10px",
    color: "#374151",
    lineHeight: "1.6"
  },
  activeTag: {
    padding: "2px 10px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600",
    backgroundColor: "#d1fae5",
    color: "#065f46"
  },
  inactiveTag: {
    padding: "2px 10px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600",
    backgroundColor: "#fee2e2",
    color: "#991b1b"
  },
  warningBox: {
    marginTop: "12px",
    padding: "12px",
    backgroundColor: "#fef3c7",
    border: "1px solid #fbbf24",
    borderRadius: "8px",
    color: "#92400e",
    fontSize: "13px",
    fontWeight: "500"
  },
  buttonGroup: {
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end",
    paddingTop: "24px",
    borderTop: "2px solid #f3f4f6"
  },
  cancelButton: {
    padding: "12px 32px",
    fontSize: "15px",
    fontWeight: "600",
    color: "#374151",
    backgroundColor: "white",
    border: "2px solid #e5e7eb",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  button: {
    padding: "12px 32px",
    fontSize: "15px",
    fontWeight: "600",
    color: "white",
    backgroundColor: "#3b82f6",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  buttonDisabled: {
    padding: "12px 32px",
    fontSize: "15px",
    fontWeight: "600",
    color: "white",
    backgroundColor: "#9ca3af",
    border: "none",
    borderRadius: "8px",
    cursor: "not-allowed",
    opacity: 0.6
  }
};
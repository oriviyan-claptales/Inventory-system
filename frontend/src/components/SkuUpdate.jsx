import React, { useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function SkuUpdate({ onUpdated, prefillProduct }) {
  const [sku, setSku] = useState("");
  const [qty, setQty] = useState("");
  const [action, setAction] = useState("add"); 
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const targetSku = prefillProduct ? prefillProduct.sku : sku;

    if (!targetSku) return toast.error("SKU is missing");
    if (!qty || Number(qty) <= 0) return toast.error("Enter valid quantity");

    setLoading(true);

    try {
      const payload = { sku: targetSku };
      if (action === "add") payload.addedQty = Number(qty);
      else payload.removeQty = Number(qty);

      await api.put("/products/update-qty-sku", payload);
      toast.success(`Stock ${action === "add" ? "Added" : "Removed"} Successfully!`);
      
      setQty("");
      if (!prefillProduct) setSku("");
      if (onUpdated) onUpdated();

    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Update Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.card}>
      
      {/* HEADER */}
      {prefillProduct ? (
        <div style={styles.header}>
           <span style={{color: "#666", fontSize: "12px"}}>Update Stock:</span>
           <h5 style={{margin: "2px 0", color: "#1976D2", fontSize: "14px"}}>{prefillProduct.name}</h5>
           <span style={{fontSize: "12px", color: "#333"}}>
             Current: <b>{prefillProduct.Qty}</b>
           </span>
        </div>
      ) : (
        <input
          type="text"
          placeholder="Enter SKU"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          style={styles.input}
        />
      )}

      {/* COMPACT FORM */}
      <form onSubmit={handleUpdate} style={styles.form}>
        
        <div style={styles.row}>
          {/* Action Select */}
          <select 
            value={action} 
            onChange={(e) => setAction(e.target.value)}
            style={styles.select}
          >
            <option value="add">➕ Add</option>
            <option value="remove">➖ Remove</option>
          </select>

          {/* Quantity Input */}
          <input
            type="number"
            placeholder="Qty"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            style={styles.inputQty}
            min="1"
          />
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={loading} 
          style={action === 'add' ? styles.addBtn : styles.removeBtn}
        >
          {loading ? "..." : (action === 'add' ? "Update" : "Update")}
        </button>

      </form>
    </div>
  );
}

// ✨ UPDATED COMPACT STYLES
const styles = {
  card: {
    padding: "5px", // Kam kiya
    backgroundColor: "#fff",
    borderRadius: "8px",
    fontFamily: "'Segoe UI', sans-serif",
    border: "1px solid #e0e0e0",
    maxWidth: "100%", // Parent container ke hisaab se fit hoga
  },
  header: {
    marginBottom: "10px",
    paddingBottom: "8px",
    borderBottom: "1px dashed #e0e0e0"
  },
  
  // 🔹 Sleek Inputs
  input: {
    width: "100%", 
    padding: "8px", // 10px se 8px kiya
    marginBottom: "8px", 
    borderRadius: "4px", 
    border: "1px solid #ccc", 
    fontSize: "13px", // Font chota kiya
    outline: "none"
  },
  
  form: { display: "flex", flexDirection: "column", gap: "8px" },
  row: { display: "flex", gap: "8px" },
  
  select: {
    flex: "1", 
    padding: "6px 8px", // Padding kam ki
    borderRadius: "4px", 
    border: "1px solid #ccc", 
    backgroundColor: "#f9f9f9", 
    cursor: "pointer",
    fontSize: "13px",
    outline: "none"
  },
  
  inputQty: {
    flex: "0.4", // Width thodi kam ki
    padding: "6px 8px", // Padding kam ki
    borderRadius: "4px", 
    border: "1px solid #ccc", 
    textAlign: "center",
    fontSize: "13px",
    outline: "none"
  },
  
  // 🔹 Buttons Chote kiye
  addBtn: {
    padding: "8px", // 12px se 8px kiya
    borderRadius: "4px", 
    border: "none", 
    backgroundColor: "#2e7d32", 
    color: "#fff", 
    fontWeight: "600", 
    fontSize: "13px",
    cursor: "pointer", 
    width: "100%"
  },
  removeBtn: {
    padding: "8px",
    borderRadius: "4px", 
    border: "none", 
    backgroundColor: "#c62828", 
    color: "#fff", 
    fontWeight: "600", 
    fontSize: "13px",
    cursor: "pointer", 
    width: "100%"
  }
};
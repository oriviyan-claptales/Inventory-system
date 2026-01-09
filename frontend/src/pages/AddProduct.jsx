import React from "react";
import axios from "axios";
import ProductForm from "../components/ProductForm";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Header from "../components/Header";

export default function AddProduct() {
  const navigate = useNavigate();

  const saveProduct = async (data) => {
    const toastId = toast.loading("Saving Product...");
    

    try {
      const res = await axios.post("https://inventory-system-uvj3.onrender.com/api/products", data, {
        withCredentials: true,
      });

      if (res.status === 201) {
        const newSku = res.data.sku;

        toast.success("Product Added Successfully!", {
          id: toastId,
          duration: 3000,
        });

        setTimeout(() => {
          navigate(`/generate-barcode/${newSku}`);
        }, 1500);
      }
    } catch (err) {
      console.error("Add Product Error:", err);
      toast.error(err.response?.data?.message || "Failed to add product", {
        id: toastId,
      });
    }
  };

  return (
    // 1️⃣ Outer Container (Full Layout)
    <div style={styles.container}>
      
      {/* ✅ Header ab sabse upar aur full width rahega */}
      <Header />

      {/* 2️⃣ Main Content (Isme padding aur center alignment hai) */}
      <main style={styles.mainContent}>
        
        {/* Page Title Section */}
        <div style={styles.headerWrapper}>
           <h1 style={styles.title}>Add New Product</h1>
           <p style={styles.subtitle}>Enter product details to add to inventory.</p>
        </div>

        {/* Form Card */}
        <div style={styles.card}>
          <ProductForm
            onSubmit={saveProduct}
            onCancel={() => navigate("/add-product")}
          />
        </div>

      </main>
    </div>
  );
}

// ✨ Fixed Styles (Home page jaisa structure)
const styles = {
  // Pura page container (Background color yahan hai)
  container: {
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
    fontFamily: "'Segoe UI', sans-serif",
    display: "flex",
    flexDirection: "column",
  },

  // Sirf Content wala hissa (Header ke neeche)
  mainContent: {
    padding: "30px 20px",
    width: "100%",
    maxWidth: "800px", // Form jyada faila hua na dikhe isliye width control ki
    margin: "0 auto",  // Center karne ke liye
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Content center karne ke liye
    boxSizing: "border-box",
  },

  headerWrapper: { 
    width: "100%", 
    textAlign: "left", // Title left me acha lagta hai form ke upar
    marginBottom: "25px" 
  },

  title: { 
    fontSize: "28px", 
    fontWeight: "700", 
    color: "#1e293b", // Darker text matches Home theme
    margin: "0 0 5px 0" 
  },
  
  subtitle: { 
    fontSize: "15px", 
    color: "#64748b", 
    margin: 0 
  },

  card: {
    backgroundColor: "#ffffff",
    width: "100%",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  },
};

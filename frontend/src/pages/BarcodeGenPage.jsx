import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BarcodeGenPage = () => {
  const { sku } = useParams(); // URL se SKU nikalenge
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const generateBarcode = async () => {
      try {
        // Backend API call to generate and save barcode
        const res = await axios.post(
          `http://localhost:7000/api/products/generate-barcode/${sku}`,
          {},
          { withCredentials: true }
        );
        setProduct(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to generate barcode.");
        setLoading(false);
      }
    };

    if (sku) {
      generateBarcode();
    }
  }, [sku]);

  if (loading) return <h2>Generating Barcode... ⏳</h2>;
  if (error) return <h2 style={{ color: "red" }}>{error}</h2>;

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Product Created Successfully! ✅</h1>
      
      <div style={{ margin: "30px auto", border: "1px solid #ccc", padding: "20px", maxWidth: "400px", borderRadius: "10px" }}>
        <h3>{product?.name}</h3>
        <p><strong>SKU:</strong> {product?.sku}</p>
        
        {/* BARCODE IMAGE */}
        {product?.barcodeImg && (
            <div>
                <img 
                  src={product.barcodeImg} 
                  alt="Barcode" 
                  style={{ width: "100%", maxWidth: "300px", height: "auto" }} 
                />
                <br />
                <a 
                  href={product.barcodeImg} 
                  download 
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: "inline-block", marginTop: "10px", color: "blue", textDecoration: "underline" }}
                >
                  Download / Print Barcode
                </a>
            </div>
        )}
      </div>

      <button 
        onClick={() => navigate("/dashboard")}
        style={{ padding: "10px 20px", background: "#1976D2", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default BarcodeGenPage;
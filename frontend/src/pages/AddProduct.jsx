// // import React from "react";
// // import axios from "axios";
// // import ProductForm from "../components/ProductForm";
// // import { useNavigate } from "react-router-dom";

// // export default function AddProduct() {
// //   const navigate = useNavigate();

// //   // API Call: Add product to database
// //   // AddProduct.jsx ke andar

// // const saveProduct = async (data) => {
// //   try {
// //     // 1️⃣ Response ko 'res' variable mein store kar
// //     const res = await axios.post("http://localhost:7000/api/products", data, {
// //       withCredentials: true,
// //     });

// //     if (res.status === 201) {
// //       // 2️⃣ Yahan 'newSku' ko define kar response data se
// //       const newSku = res.data.sku; 

// //       alert("Product Added Successfully! Generating Barcode...");

// //       // 3️⃣ Ab 'newSku' defined hai, to ye line chal jayegi
// //       navigate(`/generate-barcode/${newSku}`);
// //     }

// //   } catch (err) {
// //     console.error("Add Product Error:", err);
// //     alert("Failed to add product. Check console!");
// //   }
// // };

// //   return (
// //     <div
// //       style={{
// //         minHeight: "100vh",
// //         display: "flex",
// //         flexDirection: "column",
// //         alignItems: "center",
// //         justifyContent: "flex-start",
// //         paddingTop: 80,
// //         background: "#f8f9fa",
// //         fontFamily: "'Roboto', sans-serif",
// //       }}
// //     >
// //       {/* Header */}
// //       <div style={{ width: "90%", maxWidth: "600px", textAlign: "center", marginBottom: 40 }}>
// //         <button
// //           onClick={() => navigate("/dashboard")}
// //           style={{
// //             background: "transparent",
// //             border: "none",
// //             color: "#1a73e8",
// //             fontSize: 14,
// //             cursor: "pointer",
// //             marginBottom: 20,
// //           }}
// //         >
// //           ⬅ Back
// //         </button>

// //         <h1 style={{ fontWeight: 400, fontSize: 32, marginBottom: 8 }}>Add New Product</h1>
// //         <p style={{ color: "#5f6368", fontSize: 16 }}>
// //           Fill out the form below to add a product to your inventory.
// //         </p>
// //       </div>

// //       {/* Form Container */}
// //       <div
// //         style={{
// //           width: "90%",
// //           maxWidth: "500px",
// //           background: "#ffffff",
// //           padding: "30px 35px",
// //           borderRadius: 8,
// //           boxShadow: "0 1px 6px rgba(32,33,36,0.28)",
// //         }}
// //       >
// //         <ProductForm
// //           onSubmit={saveProduct}
// //           onCancel={() => navigate("/dashboard")}
// //         />
// //       </div>
// //     </div>
// //   );
// // }



// import React from "react";
// import axios from "axios";
// import ProductForm from "../components/ProductForm";
// import { useNavigate } from "react-router-dom";

// export default function AddProduct() {
//   const navigate = useNavigate();

//   // API Call: Add product to database
//   const saveProduct = async (data) => {
//     try {
//       const res = await axios.post("http://localhost:7000/api/products", data, {
//         withCredentials: true,
//       });

//       if (res.status === 201) {
//         const newSku = res.data.sku;
//         alert("Product Added Successfully! Generating Barcode...");
//         navigate(`/generate-barcode/${newSku}`);
//       }
//     } catch (err) {
//       console.error("Add Product Error:", err);
//       alert("Failed to add product. Check console!");
//     }
//   };

//   return (
//     <div style={styles.pageContainer}>
//       {/* Header Section */}
//       <div style={styles.headerWrapper}>
//         {/* <button onClick={() => navigate("/dashboard")} style={styles.backBtn}>
//           ← Back to Dashboard
//         </button> */}

//         <button
//           onClick={() => navigate("/dashboard")}
//           style={styles.backBtn}
//           onMouseEnter={(e) => e.currentTarget.style.borderColor = "#9ca3af"} // Hover effect
//           onMouseLeave={(e) => e.currentTarget.style.borderColor = "#e5e7eb"}
//         >
//           <span style={styles.icon}>⬅</span> Back to Dashboard
//         </button>

//         <h1 style={styles.title}>Add New Product</h1>
//         <p style={styles.subtitle}>Enter product details to add to inventory.</p>
//       </div>

//       {/* Form Card */}
//       <div style={styles.card}>
//         <ProductForm
//           onSubmit={saveProduct}
//           onCancel={() => navigate("/dashboard")}
//         />
//       </div>
//     </div>
//   );
// }

// const styles = {
//   pageContainer: {
//     minHeight: "100vh",
//     backgroundColor: "#f3f4f6", // Modern Grey Background
//     padding: "40px 20px",
//     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   headerWrapper: {
//     width: "100%",
//     maxWidth: "800px",
//     marginBottom: "20px",
//   },
//   // backBtn: {
//   //   background: "none",
//   //   border: "none",
//   //   color: "#6b7280",
//   //   fontSize: "14px",
//   //   cursor: "pointer",
//   //   marginBottom: "10px",
//   //   fontWeight: "500",
//   //   display: "flex",
//   //   alignItems: "center",
//   //   gap: "5px",
//   // },

//   backBtn: {
//     display: "inline-flex",       // Icon aur text ko line me lane ke liye
//     alignItems: "center",         // Center align vertically
//     padding: "10px 20px",         // Thoda bada click area
//     backgroundColor: "#ffffff",   // White background
//     border: "1px solid #e5e7eb",  // Light Grey Border
//     borderRadius: "8px",          // Rounded corners
//     color: "#374151",             // Dark Grey Text
//     fontSize: "14px",
//     fontWeight: "600",            // Thoda bold text
//     cursor: "pointer",
//     marginBottom: "20px",         // Neeche gap
//     boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)", // Bahut halka shadow
//     transition: "all 0.2s ease",  // Smooth transition
//   },

//   icon: {
//     marginRight: "8px",           // Arrow aur text ke beech gap
//     fontSize: "16px",
//   },
//   title: {
//     fontSize: "28px",
//     fontWeight: "700",
//     color: "#111827",
//     margin: "0 0 5px 0",
//   },
//   subtitle: {
//     fontSize: "15px",
//     color: "#6b7280",
//     margin: 0,
//   },
//   card: {
//     backgroundColor: "#ffffff",
//     width: "100%",
//     maxWidth: "800px",
//     padding: "40px",
//     borderRadius: "12px",
//     boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
//   },
// };

import React from "react";
import axios from "axios";
import ProductForm from "../components/ProductForm";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; // 👈 Library import ki

export default function AddProduct() {
  const navigate = useNavigate();

  const saveProduct = async (data) => {
    // Loading toast start kar sakte hain (Optional but cool)
    const toastId = toast.loading("Saving Product...");

    try {
      const res = await axios.post("http://localhost:7000/api/products", data, {
        withCredentials: true,
      });

      if (res.status === 201) {
        const newSku = res.data.sku;

        // ✅ Success Toast (Loading wala replace ho jayega)
        toast.success("Product Added Successfully!", {
          id: toastId, // Purane toast ko update karega
          duration: 3000,
        });

        // Redirect after delay
        setTimeout(() => {
          navigate(`/generate-barcode/${newSku}`);
        }, 1500);
      }
    } catch (err) {
      console.error("Add Product Error:", err);
      
      // ❌ Error Toast
      toast.error(err.response?.data?.message || "Failed to add product", {
        id: toastId,
      });
    }
  };

  return (
    <div style={styles.pageContainer}>
      
      {/* Ab yahan koi custom Banner div lagane ki zarurat nahi hai */}

      {/* Header Section */}
      <div style={styles.headerWrapper}>
        <button 
          onClick={() => navigate("/dashboard")} 
          style={styles.backBtn}
        >
          <span style={{marginRight: "8px"}}>⬅</span> Back to Dashboard
        </button>
        <h1 style={styles.title}>Add New Product</h1>
        <p style={styles.subtitle}>Enter product details to add to inventory.</p>
      </div>

      {/* Form Card */}
      <div style={styles.card}>
        <ProductForm
          onSubmit={saveProduct}
          onCancel={() => navigate("/dashboard")}
        />
      </div>
    </div>
  );
}

// Styles wahi purane wale (bas SuccessBanner/ErrorBanner hata diya)
const styles = {
  pageContainer: {
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
    padding: "40px 20px",
    fontFamily: "'Segoe UI', sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  headerWrapper: { width: "100%", maxWidth: "800px", marginBottom: "20px" },
  backBtn: {
    display: "inline-flex",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    color: "#374151",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    marginBottom: "20px",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  },
  title: { fontSize: "28px", fontWeight: "700", color: "#111827", margin: "0 0 5px 0" },
  subtitle: { fontSize: "15px", color: "#6b7280", margin: 0 },
  card: {
    backgroundColor: "#ffffff",
    width: "100%",
    maxWidth: "800px",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  },
};
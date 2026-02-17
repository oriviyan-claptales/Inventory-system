


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// // import { useNavigate } from "react-router-dom"; // navigate ki ab zaroorat nahi hai
// import Header from "../components/Header"; // ✅ Header Import

// // Imports
// import BarChartFilter from "../components/charts/BarChartFilter";
// import PieChartFilter from "../components/charts/PieChartFilter";
// import LineChartFilter from "../components/charts/LineChartFilter";
// import DoughnutChartFilter from "../components/charts/DoughnutChartFilter";
// import AdvancedAnalytics from "../components/charts/AdvancedAnalytics";

// export default function Graphs() {
//   const [products, setProducts] = useState([]);
//   // const navigate = useNavigate(); // Not needed anymore

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       // Agar aapke paas 'api' instance hai to use use karein, warna axios theek hai
//       const res = await axios.get("https://inventory-system-uvj3.onrender.com/api/products", {
//          withCredentials: true 
//       });
//       setProducts(res.data);
//     } catch (error) {
//       console.error("Error fetching data", error);
//     }
//   };

//   return (
//     <div style={styles.container}>
      
//       {/* ✅ HEADER ADDED (Full Width) */}
//       <Header />

//       {/* MAIN CONTENT (Centered & Padded) */}
//       <div style={styles.mainContent}>
        
//         {/* Title Section */}
//         <div style={styles.titleSection}>
//           <h1 style={styles.pageTitle}>📊 Inventory Analytics</h1>
//           <p style={styles.pageSubtitle}>Visual insights and deep dive into stock data</p>
//         </div>

//         {/* GRAPHS GRID */}
//         <div style={styles.gridContainer}>
          
//           {/* 1️⃣ ADVANCED ANALYTICS (Full Width) */}
//           <div style={{ ...styles.card, gridColumn: "1 / -1" }}>
//             <AdvancedAnalytics data={products} />
//           </div>

//           {/* 2️⃣ DOUGHNUT CHART (Stock Status) */}
//           <div style={styles.card}>
//              <DoughnutChartFilter data={products} />
//           </div>

//           {/* 3️⃣ BAR CHART (Categorical Data) */}
//           <div style={styles.card}>
//             <BarChartFilter data={products} />
//           </div>

//           {/* 4️⃣ PIE CHART (Distribution) */}
//           <div style={styles.card}>
//             <PieChartFilter data={products} />
//           </div>

//           {/* 5️⃣ LINE CHART (Trends) */}
//           <div style={styles.card}>
//             <LineChartFilter data={products} />
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

// // ✨ Consistent Styles (Matching Home & AddProduct)
// const styles = {
//   // Pura Page Wrapper
//   container: {
//     minHeight: "100vh",
//     backgroundColor: "#f3f4f6", // Light grey clean background
//     fontFamily: "'Segoe UI', sans-serif",
//     display: "flex",
//     flexDirection: "column",
//   },

//   // Content Area (Header ke neeche wala hissa)
//   mainContent: {
//     padding: "30px 20px",
//     width: "100%",
//     maxWidth: "1200px", // Graphs ke liye thoda chauda container rakha hai
//     margin: "0 auto",
//     boxSizing: "border-box",
//   },

//   // Title Section
//   titleSection: {
//     marginBottom: "30px",
//     textAlign: "center",
//   },
//   pageTitle: {
//     margin: "0",
//     fontSize: "28px",
//     color: "#1e293b",
//     fontWeight: "700",
//   },
//   pageSubtitle: {
//     margin: "5px 0 0 0",
//     color: "#64748b",
//     fontSize: "15px",
//   },
  
//   // Grid System
//   gridContainer: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))", // Responsive Columns
//     gap: "25px",
//   },
  
//   // Graph Card Style
//   card: {
//     background: "#ffffff",
//     borderRadius: "16px",
//     padding: "25px",
//     boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
//     transition: "transform 0.2s",
//     border: "1px solid #e2e8f0",
//   },
// };


















import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { useNavigate } from "react-router-dom"; // navigate ki ab zaroorat nahi hai
import Header from "../components/Header"; // ✅ Header Import

// Imports
import BarChartFilter from "../components/charts/BarChartFilter";
import PieChartFilter from "../components/charts/PieChartFilter";
import LineChartFilter from "../components/charts/LineChartFilter";
import DoughnutChartFilter from "../components/charts/DoughnutChartFilter";
import AdvancedAnalytics from "../components/charts/AdvancedAnalytics";

export default function Graphs() {
  const [products, setProducts] = useState([]);
  // const navigate = useNavigate(); // Not needed anymore

  const navigate = useNavigate()
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Agar aapke paas 'api' instance hai to use use karein, warna axios theek hai
      const res = await axios.get("https://inventory-system-uvj3.onrender.com/api/products", {
         withCredentials: true 
      });
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  return (
    <div style={styles.container}>
      
      {/* ✅ HEADER ADDED (Full Width) */}
      <Header />

      {/* MAIN CONTENT (Centered & Padded) */}
      <div style={styles.mainContent}>
        
        {/* Title Section */}
        <div style={styles.titleSection}>
          <button onClick={() => navigate("/dashboard")} style={styles.backBtn}>⬅ Back</button>
          <h1 style={styles.pageTitle}>📊 Inventory Analytics</h1>
          <p style={styles.pageSubtitle}>Visual insights and deep dive into stock data</p>
        </div>

        {/* GRAPHS GRID */}
        <div style={styles.gridContainer}>
          
          {/* 1️⃣ ADVANCED ANALYTICS (Full Width) */}
          <div style={{ ...styles.card, gridColumn: "1 / -1" }}>
            <AdvancedAnalytics data={products} />
          </div>

          {/* 2️⃣ DOUGHNUT CHART (Stock Status) */}
          <div style={styles.card}>
             <DoughnutChartFilter data={products} />
          </div>

          {/* 3️⃣ BAR CHART (Categorical Data) */}
          <div style={styles.card}>
            <BarChartFilter data={products} />
          </div>

          {/* 4️⃣ PIE CHART (Distribution) */}
          <div style={styles.card}>
            <PieChartFilter data={products} />
          </div>

          {/* 5️⃣ LINE CHART (Trends) */}
          <div style={styles.card}>
            <LineChartFilter data={products} />
          </div>

        </div>
      </div>
    </div>
  );
}

// ✨ Consistent Styles (Matching Home & AddProduct)
const styles = {
  backBtn: {
  background: 'none',
  border: 'none',
  color: '#64748b',
  cursor: 'pointer',
  fontWeight: '600',
  fontSize: '13px',
  position: 'absolute',   // ✅ ADD
  left: '0',               // already hai
  top: '0'                 // already hai
},

  // Pura Page Wrapper
  container: {
    minHeight: "100vh",
    backgroundColor: "#f3f4f6", // Light grey clean background
    fontFamily: "'Segoe UI', sans-serif",
    display: "flex",
    flexDirection: "column",
  },

  // Content Area (Header ke neeche wala hissa)
  mainContent: {
    padding: "30px 20px",
    width: "100%",
    maxWidth: "1200px", // Graphs ke liye thoda chauda container rakha hai
    margin: "0 auto",
    boxSizing: "border-box",
  },

  // Title Section
  // titleSection: {
  //   marginBottom: "30px",
  //   textAlign: "center",
  // },
  titleSection: {
  marginBottom: "30px",
  textAlign: "center",
  position: 'relative',   // ✅ ADD
},


  pageTitle: {
    margin: "0",
    fontSize: "28px",
    color: "#1e293b",
    fontWeight: "700",
  },
  pageSubtitle: {
    margin: "5px 0 0 0",
    color: "#64748b",
    fontSize: "15px",
  },
  
  // Grid System
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))", // Responsive Columns
    gap: "25px",
  },
  
  // Graph Card Style
  card: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "25px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    transition: "transform 0.2s",
    border: "1px solid #e2e8f0",
  },
};

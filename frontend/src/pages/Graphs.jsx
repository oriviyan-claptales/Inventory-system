// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import BarChartFilter from "../components/charts/BarChartFilter";
// import PieChartFilter from "../components/charts/PieChartFilter";
// import LineChartFilter from "../components/charts/LineChartFilter";
// import DoughnutChartFilter from "../components/charts/DoughnutChartFilter";
// import { useNavigate } from "react-router-dom";

// export default function Graphs() {
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     const res = await axios.get("http://localhost:7000/api/products");
//     setProducts(res.data);
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: "#f5f7fa",
//         padding: "40px 20px",
//       }}
//     >
//       {/* Back Button */}
//       <button
//         onClick={() => navigate("/dashboard")}
//         style={{
//           background: "#1976D2",
//           color: "#fff",
//           padding: "10px 15px",
//           borderRadius: 6,
//           border: "none",
//           cursor: "pointer",
//           fontSize: 14,
//           marginBottom: 25,
//         }}
//       >
//         ⬅ Back to Home
//       </button>

//       <h1
//         style={{
//           textAlign: "center",
//           marginBottom: 10,
//           fontSize: "32px",
//           color: "#222",
//         }}
//       >
//         📊 Graphical Representation
//       </h1>

//       <p style={{ textAlign: "center", color: "#666", marginBottom: 30 }}>
//         Complete visual insights of your inventory.
//       </p>

//       {/* CHARTS CENTERED & REDUCED WIDTH */}
//       <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

//         <div
//           style={{
//             background: "#fff",
//             padding: 25,
//             marginBottom: 30,
//             borderRadius: 12,
//             boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//             maxWidth: "750px",
//             margin: "0 auto",
//           }}
//         >
//           <PieChartFilter data={products} />
//         </div>

//         <div
//           style={{
//             background: "#fff",
//             padding: 25,
//             marginBottom: 30,
//             borderRadius: 12,
//             boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//             maxWidth: "750px",
//             margin: "0 auto",
//           }}
//         >
//           <BarChartFilter data={products} />
//         </div>

//         <div
//           style={{
//             background: "#fff",
//             padding: 25,
//             marginBottom: 30,
//             borderRadius: 12,
//             boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//             maxWidth: "750px",
//             margin: "0 auto",
//           }}
//         >
//           <LineChartFilter data={products} />
//         </div>

//         <div
//           style={{
//             background: "#fff",
//             padding: 25,
//             marginBottom: 30,
//             borderRadius: 12,
//             boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//             maxWidth: "750px",
//             margin: "0 auto",
//           }}
//         >
//           <DoughnutChartFilter data={products} />
//         </div>

//       </div>
//     </div>
//   );
// }




































import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Imports
import BarChartFilter from "../components/charts/BarChartFilter";
import PieChartFilter from "../components/charts/PieChartFilter";
import LineChartFilter from "../components/charts/LineChartFilter";
import DoughnutChartFilter from "../components/charts/DoughnutChartFilter";
import AdvancedAnalytics from "../components/charts/AdvancedAnalytics"; // ✅ Naya Import

export default function Graphs() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:7000/api/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  return (
    <div style={styles.pageContainer}>
      
      {/* HEADER SECTION */}
      <div style={styles.header}>
        <button onClick={() => navigate("/dashboard")} style={styles.backBtn}>
          ⬅ Dashboard
        </button>
        <h1 style={styles.pageTitle}>📊 Inventory Analytics</h1>
        <p style={styles.pageSubtitle}>Visual insights and deep dive into stock data</p>
      </div>

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
  );
}

// ✨ Professional Dashboard Styles
const styles = {
  pageContainer: {
    minHeight: "100vh",
    background: "#f3f4f6", // Light grey clean background
    padding: "30px",
    fontFamily: "'Segoe UI', sans-serif",
  },
  header: {
    maxWidth: "1200px",
    margin: "0 auto 30px auto",
    textAlign: "center",
  },
  backBtn: {
    background: "transparent",
    color: "#1976D2",
    border: "1px solid #1976D2",
    padding: "8px 16px",
    borderRadius: "20px",
    cursor: "pointer",
    fontWeight: "600",
    marginBottom: "15px",
    transition: "0.2s",
  },
  pageTitle: {
    margin: "0",
    fontSize: "28px",
    color: "#1f2937",
    fontWeight: "700",
  },
  pageSubtitle: {
    margin: "5px 0 0 0",
    color: "#6b7280",
    fontSize: "15px",
  },
  
  // GRID SYSTEM
  gridContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))", // Responsive Columns
    gap: "25px",
  },
  card: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "25px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    transition: "transform 0.2s",
    border: "1px solid #f1f5f9",
  },
};
// import React, { useState, useEffect } from "react";
// import { Bar } from "react-chartjs-2";
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// export default function AdvancedAnalytics({ data }) {
//   // Filters State
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [selectedColor, setSelectedColor] = useState("All");

//   // Unique Options Nikalo
//   const categories = ["All", ...new Set(data.map((item) => item.category))];
//   const colors = ["All", ...new Set(data.map((item) => item.color))];

//   // 🔹 MAIN LOGIC: Data Filter Karo
//   const filteredData = data.filter((item) => {
//     const categoryMatch = selectedCategory === "All" || item.category === selectedCategory;
//     const colorMatch = selectedColor === "All" || item.color === selectedColor;
//     return categoryMatch && colorMatch;
//   });

//   // Chart Data Prepare Karo
//   const chartData = {
//     labels: filteredData.map((item) => item.name), // X-Axis par Product Name
//     datasets: [
//       {
//         label: "Quantity Available",
//         data: filteredData.map((item) => item.Qty), // Y-Axis par Quantity
//         backgroundColor: filteredData.map((item) => 
//           item.Qty < 5 ? "#ef5350" : "#66bb6a" // Kam stock red, zyada green
//         ),
//         borderRadius: 5,
//       },
//     ],
//   };

//   return (
//     <div style={styles.container}>
//       <h3 style={styles.title}>🚀 Custom Deep Analysis</h3>
//       <p style={styles.subtitle}>Select filters to see specific stock breakdown.</p>

//       {/* FILTERS ROW */}
//       <div style={styles.filterRow}>
        
//         {/* Category Filter */}
//         <div style={styles.filterGroup}>
//           <label style={styles.label}>Select Category:</label>
//           <select 
//             value={selectedCategory} 
//             onChange={(e) => setSelectedCategory(e.target.value)} 
//             style={styles.select}
//           >
//             {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
//           </select>
//         </div>

//         {/* Color Filter */}
//         <div style={styles.filterGroup}>
//           <label style={styles.label}>Select Color:</label>
//           <select 
//             value={selectedColor} 
//             onChange={(e) => setSelectedColor(e.target.value)} 
//             style={styles.select}
//           >
//             {colors.map((col) => <option key={col} value={col}>{col}</option>)}
//           </select>
//         </div>

//       </div>

//       {/* RESULT SUMMARY */}
//       <div style={styles.summary}>
//         Found <strong>{filteredData.length}</strong> products matching criteria.
//         Total Stock: <strong>{filteredData.reduce((acc, curr) => acc + curr.Qty, 0)}</strong> units.
//       </div>

//       {/* CHART AREA */}
//       <div style={styles.chartWrapper}>
//         {filteredData.length > 0 ? (
//           <Bar 
//             data={chartData} 
//             options={{
//               responsive: true,
//               plugins: { legend: { display: false } },
//               scales: { y: { beginAtZero: true } }
//             }} 
//           />
//         ) : (
//           <p style={{textAlign: "center", color: "#888", marginTop: "20px"}}>No Data Found for these filters.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: { width: "100%" },
//   title: { margin: "0 0 5px 0", color: "#333" },
//   subtitle: { margin: "0 0 20px 0", color: "#666", fontSize: "14px" },
//   filterRow: { display: "flex", gap: "20px", marginBottom: "20px", flexWrap: "wrap" },
//   filterGroup: { flex: "1", minWidth: "200px" },
//   label: { display: "block", marginBottom: "5px", fontWeight: "600", fontSize: "13px", color: "#555" },
//   select: { width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "14px", outline: "none" },
//   summary: { background: "#e3f2fd", padding: "10px", borderRadius: "8px", marginBottom: "20px", color: "#1565c0", fontSize: "14px" },
//   chartWrapper: { height: "300px" }
// };




import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function AdvancedAnalytics({ data }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedColor, setSelectedColor] = useState("All");

  const categories = ["All", ...new Set(data.map((item) => item.category))];
  const colors = ["All", ...new Set(data.map((item) => item.color))];

  // 🔹 Filter Logic
  const filteredData = data.filter((item) => {
    const categoryMatch = selectedCategory === "All" || item.category === selectedCategory;
    const colorMatch = selectedColor === "All" || item.color === selectedColor;
    return categoryMatch && colorMatch;
  });

  const totalValue = filteredData.reduce((acc, item) => acc + (item.price * item.Qty), 0);

  // 🔹 CHART DATA SETTINGS (Spacing Fix)
  const chartData = {
    labels: filteredData.map((item) => item.name.substring(0, 15) + "..."), 
    datasets: [
      {
        label: "Quantity",
        data: filteredData.map((item) => item.Qty),
        backgroundColor: filteredData.map((item) => 
          item.Qty < 5 ? "#ef5350" : "#66bb6a"
        ),
        borderRadius: 4,
        
        // ⭐ MAIN FIX: Spacing Badhane ke liye settings
        barPercentage: 0.6,       // Bar ki chaudai (0.6 matlab 60% jagah lega, 40% gap rahega)
        categoryPercentage: 0.8,  // Categories ke beech ka gap
        maxBarThickness: 40,      // Bar kabhi bhi 40px se mota nahi hoga
      },
    ],
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <div>
          <h3 style={styles.title}>🚀 Custom Deep Analysis</h3>
          <p style={styles.subtitle}>Filter data to see trends & details.</p>
        </div>
        <div style={styles.valueBadge}>
          <span style={{fontSize: "12px", color: "#fff", opacity: 0.9}}>Est. Stock Value</span>
          <span style={{fontSize: "18px", fontWeight: "bold", color: "#fff"}}>₹{totalValue.toLocaleString()}</span>
        </div>
      </div>

      <div style={styles.filterRow}>
        <div style={styles.filterGroup}>
          <label style={styles.label}>Select Category:</label>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} style={styles.select}>
            {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <div style={styles.filterGroup}>
          <label style={styles.label}>Select Color:</label>
          <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)} style={styles.select}>
            {colors.map((col) => <option key={col} value={col}>{col}</option>)}
          </select>
        </div>
      </div>

      <div style={styles.splitLayout}>
        
        {/* LEFT SIDE: GRAPH */}
        <div style={styles.leftPanel}>
          {filteredData.length > 0 ? (
            <div style={{ height: "320px", width: "100%" }}>
              <Bar 
                data={chartData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: { 
                    y: { beginAtZero: true, grid: { color: "#f0f0f0" } },
                    x: { 
                      grid: { display: false }, // X-axis ki grid lines hata di taaki clean dikhe
                      ticks: { font: { size: 11 } } 
                    }
                  }
                }} 
              />
            </div>
          ) : (
            <div style={styles.noData}>Select filters to view data</div>
          )}
        </div>

        {/* RIGHT SIDE: LIST */}
        <div style={styles.rightPanel}>
          <h4 style={styles.listTitle}>Product Breakdown ({filteredData.length})</h4>
          
          <div style={styles.scrollList}>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <div key={item._id} style={styles.listItem}>
                  <div>
                    <div style={styles.itemName}>{item.name}</div>
                    <div style={styles.itemMeta}>SKU: {item.sku}</div>
                  </div>
                  <div style={{textAlign: "right"}}>
                    <div style={{
                      ...styles.qtyBadge, 
                      background: item.Qty < 5 ? "#ffebee" : "#e8f5e9",
                      color: item.Qty < 5 ? "#c62828" : "#2e7d32"
                    }}>
                      Qty: {item.Qty}
                    </div>
                    <div style={styles.itemPrice}>₹{item.price}</div>
                  </div>
                </div>
              ))
            ) : (
               <p style={{textAlign: "center", color: "#999", fontSize: "13px"}}>No items found</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

const styles = {
  container: { width: "100%" },
  headerRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" },
  title: { margin: "0 0 5px 0", color: "#333" },
  subtitle: { margin: "0", color: "#666", fontSize: "14px" },
  
  valueBadge: { 
    background: "linear-gradient(135deg, #1976D2, #64b5f6)", 
    padding: "10px 20px", 
    borderRadius: "10px", 
    display: "flex", 
    flexDirection: "column", 
    alignItems: "flex-end",
    boxShadow: "0 4px 6px rgba(25, 118, 210, 0.2)"
  },

  filterRow: { display: "flex", gap: "15px", marginBottom: "20px", background: "#f8f9fa", padding: "15px", borderRadius: "10px" },
  filterGroup: { flex: "1" },
  label: { display: "block", marginBottom: "5px", fontWeight: "600", fontSize: "12px", color: "#555", textTransform: "uppercase" },
  select: { width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ddd", fontSize: "14px", outline: "none", background: "#fff" },

  splitLayout: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "20px",
    alignItems: "start"
  },

  leftPanel: {
    background: "#fff",
    border: "1px solid #eee",
    borderRadius: "12px",
    padding: "15px",
    minHeight: "300px"
  },
  
  rightPanel: {
    background: "#fff",
    border: "1px solid #eee",
    borderRadius: "12px",
    padding: "15px",
    height: "320px",
    display: "flex",
    flexDirection: "column"
  },

  listTitle: { margin: "0 0 15px 0", fontSize: "15px", color: "#333", borderBottom: "1px solid #eee", paddingBottom: "10px" },
  
  scrollList: {
    overflowY: "auto",
    flex: 1,
    paddingRight: "5px"
  },

  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0",
    borderBottom: "1px dashed #eee"
  },
  itemName: { fontSize: "13px", fontWeight: "600", color: "#333", marginBottom: "2px" },
  itemMeta: { fontSize: "11px", color: "#999" },
  
  qtyBadge: { fontSize: "12px", fontWeight: "bold", padding: "2px 8px", borderRadius: "4px", marginBottom: "2px", display: "inline-block" },
  itemPrice: { fontSize: "12px", color: "#555" },

  noData: { display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#aaa" }
};
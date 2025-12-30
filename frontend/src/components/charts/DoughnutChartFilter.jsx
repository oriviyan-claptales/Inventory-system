// import React from "react";
// import { Doughnut } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// ChartJS.register(ArcElement, Tooltip, Legend);

// export default function DoughnutChartFilter({ data }) {

//   const inStockItems = data.filter((p) => p.Qty > 0);
//   const outStockItems = data.filter((p) => p.Qty === 0);

//   return (
//     <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
      
//       {/* LEFT SIDE: Doughnut Chart */}
//       <div style={{ width: "300px" }}>
//         <h3>Stock Status</h3>
//         <Doughnut
//           data={{
//             labels: ["In Stock", "Out of Stock"],
//             datasets: [
//               {
//                 data: [inStockItems.length, outStockItems.length],
//                 backgroundColor: ["#42a5f5", "#ef5350"],
//               },
//             ],
//           }}
//         />
//       </div>

//       {/* RIGHT SIDE: ITEM LIST */}
//       <div style={{ width: "250px" }}>
//         <h4>Out of Stock Items:</h4>
//         {outStockItems.length === 0 ? (
//           <p style={{ color: "green" }}>No Out of Stock Items</p>
//         ) : (
//           <ul>
//             {outStockItems.map((item) => (
//               <li key={item._id} style={{ color: "red" }}>
//                 {item.name} — Qty: {item.Qty}
//               </li>
//             ))}
//           </ul>
//         )}
//         </div>
// <div>
//         <h4 style={{ marginTop: "20px" }}>In Stock Items:</h4>
//         <ul>
//           {inStockItems.map((item) => (
//             <li key={item._id} style={{ color: "green" }}>
//               {item.name} — Qty: {item.Qty}
//             </li>
//           ))}
//         </ul>
//         </div>
      

//     </div>
//   );
// }





















import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChartFilter({ data }) {
  const inStock = data.filter((p) => p.Qty > 0).length;
  const outStock = data.filter((p) => p.Qty === 0).length;
  const outStockItems = data.filter((p) => p.Qty === 0);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <h3 style={{ margin: "0 0 15px 0", color: "#333" }}>Stock Status Overview</h3>
      
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap", gap: "20px" }}>
        
        {/* Chart */}
        <div style={{ width: "220px", height: "220px" }}>
          <Doughnut
            data={{
              labels: ["In Stock", "Out of Stock"],
              datasets: [{
                data: [inStock, outStock],
                backgroundColor: ["#4caf50", "#ef5350"],
                borderWidth: 0,
              }],
            }}
            options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }}
          />
        </div>

        {/* Stats & List */}
        <div style={{ flex: 1, minWidth: "200px" }}>
          <div style={{ marginBottom: "15px", padding: "10px", background: "#fafafa", borderRadius: "8px" }}>
             <p style={{ margin: "5px 0", color: "#4caf50", fontWeight: "bold" }}>✅ Available: {inStock}</p>
             <p style={{ margin: "5px 0", color: "#ef5350", fontWeight: "bold" }}>❌ Out of Stock: {outStock}</p>
          </div>

          <div style={{ maxHeight: "150px", overflowY: "auto", border: "1px solid #eee", borderRadius: "8px", padding: "10px" }}>
             <h5 style={{ margin: "0 0 5px 0" }}>Needs Restock:</h5>
             {outStockItems.length === 0 ? (
               <small style={{ color: "grey" }}>All items are in stock!</small>
             ) : (
               <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "13px", color: "#d32f2f" }}>
                 {outStockItems.map(item => <li key={item._id}>{item.name}</li>)}
               </ul>
             )}
          </div>
        </div>

      </div>
    </div>
  );
}
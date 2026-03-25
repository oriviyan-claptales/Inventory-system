// // src/layouts/MainLayout.jsx
// import React from "react";
// import { Outlet } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import Header from "../components/Header";

// const MainLayout = () => {
//   return (
//     <div style={styles.layoutContainer}>
//       {/* Left Side: Fixed Sidebar */}
//       <Sidebar />

//       {/* Right Side: Header + Dynamic Content */}
//       <div style={styles.mainContentArea}>
//         {/* Tumhara existing Header component */}
//         <Header /> 
        
//         {/* Outlet ki jagah par jo page tum open karoge wo load hoga */}
//         <div style={styles.pageContent}>
//           <Outlet /> 
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MainLayout;

// const styles = {
//   layoutContainer: { display: "flex", height: "100vh", overflow: "hidden", backgroundColor: "#f1f5f9" },
//   mainContentArea: { flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" },
//   pageContent: { flex: 1, padding: "20px", overflowY: "auto", boxSizing: "border-box" }
// };






// src/layouts/MainLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
// 👇 Import the new Global Search Component
import GlobalSearch from "../components/GlobalSearch"; 

const MainLayout = () => {
  return (
    <div style={styles.layoutContainer}>
      {/* 👇 Ye component background me sune-ga aur popup dikhayega */}
      <GlobalSearch />

      <Sidebar />

      <div style={styles.mainContentArea}>
        <Header /> 
        
        <div style={styles.pageContent}>
          <Outlet /> 
        </div>
      </div>
    </div>
  );
};

export default MainLayout;

// ... styles yahan same rahenge

const styles = {
  layoutContainer: { display: "flex", height: "100vh", overflow: "hidden", backgroundColor: "#f1f5f9" },
  mainContentArea: { flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" },
  pageContent: { flex: 1, padding: "20px", overflowY: "auto", boxSizing: "border-box" }
};
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// 👉 Layouts
import MainLayout from "./components/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";

// 👉 Pages
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import DashboardWelcome from "./pages/DashboardWelcome"; // Naya welcome page
import Inventory from "./pages/Inventory"; // Purana "Home" ab "Inventory" ban gaya
import AddProduct from "./pages/AddProduct";
import CreateUser from "./pages/CreateUser";
import Graphs from "./pages/Graphs";
import BarcodeGenPage from "./pages/BarcodeGenPage";
import ProductDetails from "./pages/ProductDetails";
import UserManagement from "./pages/UserManagement";
import LogHistory from "./pages/AuditLogs";
import Sales from "./pages/Sales";

// 👉 PACKZONE Pages
import PackZoneManagement from "./pages/PackZoneManagement";
import AddPackZone from "./pages/AddPackZone";
import PackZoneDetail from "./pages/PackZoneDetail"; 
import Snowfall from "react-snowfall"

export default function App() {
  return (
    <BrowserRouter>
   <Snowfall color="#fffff1" />
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontFamily: "'Inter', sans-serif",
            fontSize: '14px',
            fontWeight: 'bold',
            borderRadius: '8px',
            background: '#333',
            color: '#fff',
          },
        }}
      />
      <Routes>
        {/* ----- PUBLIC ROUTES (Bina Sidebar aur Header ke) ----- */}
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* ----- PROTECTED ROUTES (Sidebar + Header Layout ke andar) ----- */}
        <Route element={<MainLayout />}>
          
          {/* Default Page Jab Koi Login Karta Hai */}
          <Route 
            path="/dashboard" 
            element={ <ProtectedRoute><DashboardWelcome /></ProtectedRoute> } 
          />

          {/* 📦 INVENTORY MODULE */}
          <Route 
            path="/inventory" 
            element={ <ProtectedRoute requiredTCode="INV_VIEW"><Inventory /></ProtectedRoute> } 
          />
          <Route 
            path="/product/:id" 
            element={ <ProtectedRoute requiredTCode="INV_VIEW"><ProductDetails /></ProtectedRoute> } 
          />
          <Route 
            path="/add-product" 
            element={ <ProtectedRoute requiredTCode="INV_CREATE"><AddProduct /></ProtectedRoute> } 
          />
          <Route 
            path="/generate-barcode/:sku" 
            element={ <ProtectedRoute requiredTCode="INV_CREATE"><BarcodeGenPage /></ProtectedRoute> } 
          />

          {/* 📊 ANALYTICS MODULE */}
          <Route 
            path="/graphs" 
            element={ <ProtectedRoute requiredTCode="ANL_VIEW"><Graphs /></ProtectedRoute> } 
          />

          {/* 🏷️ PACKZONE MODULE */}
          <Route 
            path="/packzone" 
            element={ <ProtectedRoute requiredTCode="PKG_VIEW"><PackZoneManagement /></ProtectedRoute> } 
          />
          <Route 
            path="/add-packzone" 
            element={ <ProtectedRoute requiredTCode="PKG_CREATE"><AddPackZone /></ProtectedRoute> } 
          />
          <Route 
            path="/packzone/:id" 
            element={ <ProtectedRoute requiredTCode="PKG_VIEW"><PackZoneDetail /></ProtectedRoute> } 
          />

          {/* 💰 SALES MODULE */}
          <Route 
            path="/sales" 
            element={ <ProtectedRoute requiredTCode="SLS_VIEW"><Sales /></ProtectedRoute> } 
          />

          {/* 👤 ADMIN ONLY MODULES (Inme TCode ki zarurat nahi, sirf Admin access kar sakta hai) */}
          <Route 
            path="/create-user" 
            element={ <ProtectedRoute allowedRoles={["admin"]}><CreateUser /></ProtectedRoute> } 
          />
          <Route 
            path="/users" 
            element={ <ProtectedRoute allowedRoles={["admin"]}><UserManagement /></ProtectedRoute> } 
          />
          <Route 
            path="/logs" 
            element={ <ProtectedRoute allowedRoles={["admin"]}><LogHistory /></ProtectedRoute> } 
          />

        </Route> {/* MainLayout End */}

        {/* 404 Fallback */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}
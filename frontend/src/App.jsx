import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

// Pages
import Login from "./pages/Login";

import ForgotPassword from "./pages/ForgotPassword";

import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import CreateUser from "./pages/CreateUser";
import Graphs from "./pages/Graphs";
import BarcodeGenPage from "./pages/BarcodeGenPage";
import ProductDetails from "./pages/ProductDetails";
import UserManagement from "./pages/UserManagement";

// Component
import ProtectedRoute from "./components/ProtectedRoute";
import LogHistory from "./pages/AuditLogs";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontSize: '14px',
            fontWeight: 'bold',
            borderRadius: '8px',
            background: '#333',
            color: '#fff',
          },
        }}
      />
      <Routes>
        {/* ----- PUBLIC ROUTES ----- */}
        <Route path="/" element={<Login />} />
        {/* <Route path="/signup" element={<Signup />} /> */}
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* ----- PROTECTED ROUTES ----- */}

        {/* 1. SABKE LIYE (Bas login hona chahiye) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          }
        />

        {/* 2. ADMIN & SUPERUSER ONLY (Product Management) */}
        <Route
          path="/add-product"
          element={
            <ProtectedRoute allowedRoles={["admin", "superuser"]}>
              <AddProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/generate-barcode/:sku"
          element={
            <ProtectedRoute allowedRoles={["admin", "superuser"]}>
              <BarcodeGenPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/graphs"
          element={
            <ProtectedRoute allowedRoles={["admin", "superuser","user"]}>
              <Graphs />
            </ProtectedRoute>
          }
        />

        {/* 3. SIRF ADMIN ONLY (User Management) */}
        {/* Naya user banana ya delete karna sirf 'admin' karega */}
        <Route
          path="/create-user"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <CreateUser />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <UserManagement />
            </ProtectedRoute>
          }
        />

        <Route
  path="/logs"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <LogHistory />
    </ProtectedRoute>
  }
/>

        {/* 404 Fallback */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}
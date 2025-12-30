import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/axios";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

 useEffect(() => {
  api.get("/users/current") // baseURL me /api hai toh ye sahi hai
    .then((res) => {
      setIsAuth(true);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Auth check failed:", err.response?.status);
      setIsAuth(false);
      setLoading(false);
    });
}, []);

  if (loading) return <h3>Checking auth...</h3>;
  if (!isAuth) return <Navigate to="/" />;

  return children;
}

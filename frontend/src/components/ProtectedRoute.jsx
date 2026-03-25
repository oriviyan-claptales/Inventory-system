// import { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import api from "../api/axios";

// // 1. 'allowedRoles' prop receive karo
// export default function ProtectedRoute({ children, allowedRoles }) {
//   const [loading, setLoading] = useState(true);
  
//   // 2. isAuth (true/false) ki jagah pura 'user' object store karenge
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     api.get("/users/current")
//       .then((res) => {
//         // Backend se user data mila (isme userType hona chahiye)
//         setUser(res.data); 
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Auth check failed:", err.response?.status);
//         setUser(null); // Login nahi hai
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <h3>Checking auth...</h3>;

//   // 3. Agar User Login hi nahi hai -> Login page par bhejo
//   if (!user) return <Navigate to="/" replace />;

//   // 4. --- MAIN MAGIC (Role Check) ---
//   // Agar is route ke liye kuch khaas roles chahiye (jaise ['admin'])
//   // Aur current user ka role us list mein nahi hai
//   if (allowedRoles && !allowedRoles.includes(user.userType)) {
//      // Toh usko Dashboard par wapis bhej do
//      return <Navigate to="/dashboard" replace />;
//   }

//   // 5. Sab sahi hai, page dikhao
//   return children;
// }













// import { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import api from "../api/axios";

// // 1. 'allowedRoles' prop receive karo
// export default function ProtectedRoute({ children, allowedRoles }) {
//   const [loading, setLoading] = useState(true);
  
//   // 2. isAuth (true/false) ki jagah pura 'user' object store karenge
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     api.get("/users/current")
//       .then((res) => {
//         // Backend se user data mila (isme userType hona chahiye)
//         setUser(res.data); 
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Auth check failed:", err.response?.status);
        
//         // 👇 MAIN FIX: Agar backend se fail ho, toh local storage ka kachra saaf kar do
//         localStorage.removeItem("user"); 
        
//         setUser(null); // Login nahi hai
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <h3>Checking auth...</h3>;

//   // 3. Agar User Login hi nahi hai -> Login page par bhejo
//   if (!user) return <Navigate to="/" replace />;

//   // 4. --- MAIN MAGIC (Role Check) ---
//   // Agar is route ke liye kuch khaas roles chahiye (jaise ['admin'])
//   // Aur current user ka role us list mein nahi hai
//   if (allowedRoles && !allowedRoles.includes(user.userType)) {
//      // Toh usko Dashboard par wapis bhej do
//      return <Navigate to="/dashboard" replace />;
//   }

//   // 5. Sab sahi hai, page dikhao
//   return children;
// }






import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast"; // 👉 UX ke liye toast add kiya

// 1. 'allowedRoles' ke sath 'requiredTCode' prop bhi receive karo
export default function ProtectedRoute({ children, allowedRoles, requiredTCode }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // ⚠️ IMPORTANT: Backend me check kar lena ki /users/current API 
    // user object ke sath uska 'tcodes' array bhi return kar rahi ho!
    api.get("/users/current")
      .then((res) => {
        setUser(res.data); 
        setLoading(false);
      })
      .catch((err) => {
        console.error("Auth check failed:", err.response?.status);
        localStorage.removeItem("user"); 
        setUser(null); 
        setLoading(false);
      });
  }, []);

  if (loading) return <h3 style={{ textAlign: "center", marginTop: "50px" }}>Checking access...</h3>;

  // 2. Agar User Login hi nahi hai -> Login page par bhejo
  if (!user) return <Navigate to="/" replace />;

  // 3. --- ROLE CHECK (For rigid roles like Admin only pages) ---
  if (allowedRoles && !allowedRoles.includes(user.userType)) {
     // Agar permission nahi hai toh error message dikhao aur dashboard bhej do
     toast.error("Access Denied: Only Admins can access this page.");
     return <Navigate to="/dashboard" replace />;
  }

  // 4. --- TCODE CHECK (For feature access) ---
  if (requiredTCode) {
    // Admin ko sab kuch allowed hai, toh usko check skip karne do
    if (user.userType !== "admin") {
      // Normal user ke tcodes array me check karo
      if (!user.tcodes || !user.tcodes.includes(requiredTCode)) {
        toast.error(`Access Denied: Missing Permission (${requiredTCode}).`);
        return <Navigate to="/dashboard" replace />;
      }
    }
  }

  // 5. Sab sahi hai, permission pass ho gayi -> page dikhao
  return children;
}
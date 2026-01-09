// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast"; // 👈 Notification ke liye
// import Header from "../components/Header";

// export default function CreateUser() {
//   const navigate = useNavigate();

//   // States
//   const [form, setForm] = useState({
//     username:"",
//     name: "",
//     email: "",
//     password: "",
//     userType: "",
//   });
  
//   const [showPassword, setShowPassword] = useState(false); // Eye toggle state
//   const [loading, setLoading] = useState(false); // Button loading state

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validation
//     if(!form.userType) return toast.error("Please select a User Type");

//     setLoading(true);
//     const toastId = toast.loading("Creating User...");

//     try {
//       await axios.post("http://localhost:7000/api/auth/create-user", form, {
//         withCredentials: true,
//       });

//       toast.success("User Created Successfully!", { id: toastId });
      
//       // Thoda ruk kar redirect
//       setTimeout(() => {
//         navigate("/dashboard");
//       }, 1500);

//     } catch (err) {
//       console.error("Error creating user:", err);
//       toast.error(err.response?.data?.message || "Failed to create user", { id: toastId });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//        <Header/>

    
//     <div style={styles.container}>
     
      
//       {/* Header Section */}
//       <div style={styles.headerWrapper}>
//         <button 
//           // onClick={() => navigate("/dashboard")} 
//           onClick={() => navigate("/users")} 
//           style={styles.backBtn}
//           onMouseEnter={(e) => e.currentTarget.style.borderColor = "#9ca3af"}
//           onMouseLeave={(e) => e.currentTarget.style.borderColor = "#e5e7eb"}
//         >
//           <span style={{marginRight: "8px"}}>⬅</span> Back
//         </button>
//         <h1 style={styles.pageTitle}>User Management</h1>
//       </div>

//       {/* Card Section */}
//       <div style={styles.card}>
//         <div style={styles.cardHeader}>
//           <h2 style={styles.title}>Create New User</h2>
//           <p style={styles.subtitle}>Fill in the details to register a new admin or employee.</p>
//         </div>

//         <form onSubmit={handleSubmit}>
          
//           {/* Username Input */}
//           <div style={styles.inputGroup}>
//             <label style={styles.label}>UserName</label>
//             <input
//               type="text"
//               name="username"
//               placeholder="e.g. Rahul Sharma"
//               value={form.username}
//               onChange={handleChange}
//               required
//               style={styles.input}
//             />
//           </div>
//           {/* Name Input */}
//           <div style={styles.inputGroup}>
//             <label style={styles.label}>Full Name</label>
//             <input
//               type="text"
//               name="name"
//               placeholder="e.g. Rahul Sharma"
//               value={form.name}
//               onChange={handleChange}
//               required
//               style={styles.input}
//             />
//           </div>

//           {/* Email Input */}
//           <div style={styles.inputGroup}>
//             <label style={styles.label}>Email Address</label>
//             <input
//               type="email"
//               name="email"
//               placeholder="e.g. rahul@company.com"
//               value={form.email}
//               onChange={handleChange}
//               required
//               style={styles.input}
//             />
//           </div>

//           {/* Password Input with Eye Icon */}
//           <div style={styles.inputGroup}>
//             <label style={styles.label}>Password</label>
//             <div style={styles.passwordWrapper}>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="Enter strong password"
//                 value={form.password}
//                 onChange={handleChange}
//                 required
//                 style={styles.input}
//               />
//               <span 
//                 onClick={() => setShowPassword(!showPassword)} 
//                 style={styles.eyeIcon}
//                 title={showPassword ? "Hide Password" : "Show Password"}
//               >
//                 {showPassword ? "👁️" : "🙈"} 
//               </span>
//             </div>
//           </div>

//           {/* User Type Select */}
//           <div style={styles.inputGroup}>
//             <label style={styles.label}>Role / User Type</label>
//             <div style={{position: 'relative'}}>
//               <select
//                 name="userType"
//                 value={form.userType}
//                 onChange={handleChange}
//                 required
//                 style={styles.select}
//               >
//                 <option value="">Select Role...</option>
//                 <option value="admin">Admin (Full Access)</option>
//                 <option value="superuser">Superuser (Limited Access)</option>
//                 <option value="user">User (View Only)</option>
//               </select>
//               <span style={styles.selectArrow}>▼</span>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button 
//             type="submit" 
//             disabled={loading}
//             style={loading ? styles.buttonDisabled : styles.button}
//           >
//             {loading ? "Creating..." : "Create User"}
//           </button>

//         </form>
//       </div>
//     </div>
//     </div>
//   );
// }

// // Professional CSS-in-JS Styles
// const styles = {
//   container: {
//     minHeight: "100vh",
//     backgroundColor: "#f3f4f6", // Modern Grey
//     padding: "40px 20px",
//     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   headerWrapper: {
//     width: "100%",
//     maxWidth: "500px",
//     marginBottom: "20px",
//   },
//   backBtn: {
//     display: "inline-flex",
//     alignItems: "center",
//     padding: "8px 16px",
//     backgroundColor: "#ffffff",
//     border: "1px solid #e5e7eb",
//     borderRadius: "8px",
//     color: "#374151",
//     fontSize: "14px",
//     fontWeight: "600",
//     cursor: "pointer",
//     marginBottom: "15px",
//     transition: "all 0.2s",
//   },
//   pageTitle: {
//     fontSize: "24px",
//     fontWeight: "700",
//     color: "#111827",
//     margin: 0,
//     display: "none", // Mobile pe dikha sakte ho agar chaho
//   },
  
//   // Card Styles
//   card: {
//     backgroundColor: "#ffffff",
//     width: "100%",
//     maxWidth: "500px", // Form thoda compact rakha hai
//     padding: "40px",
//     borderRadius: "16px",
//     boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
//   },
//   cardHeader: {
//     textAlign: "center",
//     marginBottom: "30px",
//   },
//   title: {
//     fontSize: "26px",
//     fontWeight: "bold",
//     color: "#1f2937",
//     marginBottom: "8px",
//   },
//   subtitle: {
//     fontSize: "14px",
//     color: "#6b7280",
//     margin: 0,
//   },

//   // Form Elements
//   inputGroup: {
//     marginBottom: "20px",
//   },
//   label: {
//     display: "block",
//     fontSize: "14px",
//     fontWeight: "600",
//     color: "#374151",
//     marginBottom: "8px",
//   },
//   input: {
//     width: "100%",
//     padding: "12px 15px",
//     fontSize: "15px",
//     borderRadius: "8px",
//     border: "1px solid #d1d5db",
//     outline: "none",
//     boxSizing: "border-box",
//     transition: "border-color 0.2s",
//     backgroundColor: "#f9fafb",
//   },
//   select: {
//     width: "100%",
//     padding: "12px 15px",
//     fontSize: "15px",
//     borderRadius: "8px",
//     border: "1px solid #d1d5db",
//     outline: "none",
//     boxSizing: "border-box",
//     backgroundColor: "#f9fafb",
//     appearance: "none", // Remove default arrow
//     cursor: "pointer",
//   },
//   selectArrow: {
//     position: "absolute",
//     right: "15px",
//     top: "50%",
//     transform: "translateY(-50%)",
//     pointerEvents: "none",
//     fontSize: "12px",
//     color: "#6b7280",
//   },
  
//   // Password Eye
//   passwordWrapper: {
//     position: "relative",
//     display: "flex",
//     alignItems: "center",
//   },
//   eyeIcon: {
//     position: "absolute",
//     right: "15px",
//     cursor: "pointer",
//     fontSize: "18px",
//     background: "transparent",
//     color: "#6b7280",
//   },

//   // Buttons
//   button: {
//     width: "100%",
//     padding: "14px",
//     backgroundColor: "#1976D2", // Brand Blue
//     color: "#fff",
//     border: "none",
//     borderRadius: "8px",
//     fontSize: "16px",
//     fontWeight: "600",
//     cursor: "pointer",
//     transition: "background-color 0.2s",
//     marginTop: "10px",
//   },
//   buttonDisabled: {
//     width: "100%",
//     padding: "14px",
//     backgroundColor: "#93c5fd",
//     color: "#fff",
//     border: "none",
//     borderRadius: "8px",
//     cursor: "not-allowed",
//     marginTop: "10px",
//   },
// };




// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast"; 
// import Header from "../components/Header";

// export default function CreateUser() {
//   const navigate = useNavigate();

//   // States
//   const [form, setForm] = useState({
//     username: "",
//     name: "",
//     email: "",
//     password: "",
//     userType: "",
//   });
  
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // 👇 VALIDATION: Full Name (Sirf Alphabets)
//     if (name === "name") {
//       if (value === "") {
//         setForm({ ...form, [name]: value });
//         return;
//       }
//       // Check: Koi number ya symbol allowed nahi (sirf A-Z aur Space)
//       // Regex: ^[a-zA-Z\s]*$ -> Sirf letters aur space allow karega
//       if (!/^[a-zA-Z\s]*$/.test(value)) {
//         toast.error("Name should only contain Alphabets!");
//         return;
//       }
//     }

//     // 👇 USERNAME: Sab kuch allow hai (Alphabets, Numbers, @, ., _, -)
//     // Bas space allow nahi karenge username mein (usually username me space nahi hota)
//     if (name === "username") {
//        if (/\s/.test(value)) {
//          toast.error("Username cannot contain spaces!");
//          return;
//        }
//     }

//     setForm({ ...form, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // --- 🔒 STRONG PASSWORD VALIDATION ---
//     const { password } = form;

//     // Check 1: Length
//     if (password.length < 6) {
//       return toast.error("Password must be at least 6 characters long!");
//     }

//     // Check 2: Must contain a Number
//     if (!/\d/.test(password)) {
//       return toast.error("Password must contain at least one Number (0-9)!");
//     }

//     // Check 3: Must contain a Special Character (@, #, $, etc.)
//     if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
//       return toast.error("Password must contain at least one Special Character (@, #, $, etc.)!");
//     }

//     // Check 4: User Type Selection
//     if (!form.userType) return toast.error("Please select a User Type");

//     setLoading(true);
//     const toastId = toast.loading("Creating User...");

//     try {
//       await axios.post("http://localhost:7000/api/auth/create-user", form, {
//         withCredentials: true,
//       });

//       toast.success("User Created Successfully!", { id: toastId });
      
//       setTimeout(() => {
//         navigate("/dashboard");
//       }, 1500);

//     } catch (err) {
//       console.error("Error creating user:", err);
//       toast.error(err.response?.data?.message || "Failed to create user", { id: toastId });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//        <Header/>

    
//     <div style={styles.container}>
     
      
//       {/* Header Section */}
//       <div style={styles.headerWrapper}>
//         <button 
//           onClick={() => navigate("/users")} 
//           style={styles.backBtn}
//           onMouseEnter={(e) => e.currentTarget.style.borderColor = "#9ca3af"}
//           onMouseLeave={(e) => e.currentTarget.style.borderColor = "#e5e7eb"}
//         >
//           <span style={{marginRight: "8px"}}>⬅</span> Back
//         </button>
//         <h1 style={styles.pageTitle}>User Management</h1>
//       </div>

//       {/* Card Section */}
//       <div style={styles.card}>
//         <div style={styles.cardHeader}>
//           <h2 style={styles.title}>Create New User</h2>
//           <p style={styles.subtitle}>Fill in the details to register a new admin or employee.</p>
//         </div>

//         <form onSubmit={handleSubmit}>
          
//           {/* Username Input */}
//           <div style={styles.inputGroup}>
//             <label style={styles.label}>UserName</label>
//             <input
//               type="text"
//               name="username"
//               placeholder="e.g. Rahul_01@"
//               value={form.username}
//               onChange={handleChange}
//               required
//               style={styles.input}
//             />
//           </div>

//           {/* Name Input */}
//           <div style={styles.inputGroup}>
//             <label style={styles.label}>Full Name</label>
//             <input
//               type="text"
//               name="name"
//               placeholder="e.g. Rahul Sharma"
//               value={form.name}
//               onChange={handleChange} // 👈 Validation here
//               required
//               style={styles.input}
//             />
//           </div>

//           {/* Email Input */}
//           <div style={styles.inputGroup}>
//             <label style={styles.label}>Email Address</label>
//             <input
//               type="email"
//               name="email"
//               placeholder="e.g. rahul@company.com"
//               value={form.email}
//               onChange={handleChange}
//               required
//               style={styles.input}
//             />
//           </div>

//           {/* Password Input with Eye Icon */}
//           <div style={styles.inputGroup}>
//             <label style={styles.label}>Password</label>
//             <div style={styles.passwordWrapper}>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="Strong Password"
//                 value={form.password}
//                 onChange={handleChange}
//                 required
//                 style={styles.input}
//               />
//               <span 
//                 onClick={() => setShowPassword(!showPassword)} 
//                 style={styles.eyeIcon}
//                 title={showPassword ? "Hide Password" : "Show Password"}
//               >
//                 {showPassword ? "👁️" : "🙈"} 
//               </span>
//             </div>
//           </div>

//           {/* User Type Select */}
//           <div style={styles.inputGroup}>
//             <label style={styles.label}>Role / User Type</label>
//             <div style={{position: 'relative'}}>
//               <select
//                 name="userType"
//                 value={form.userType}
//                 onChange={handleChange}
//                 required
//                 style={styles.select}
//               >
//                 <option value="">Select Role...</option>
//                 <option value="admin">Admin (Full Access)</option>
//                 <option value="superuser">Superuser (Limited Access)</option>
//                 <option value="user">User (View Only)</option>
//               </select>
//               <span style={styles.selectArrow}>▼</span>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button 
//             type="submit" 
//             disabled={loading}
//             style={loading ? styles.buttonDisabled : styles.button}
//           >
//             {loading ? "Creating..." : "Create User"}
//           </button>

//         </form>
//       </div>
//     </div>
//     </div>
//   );
// }

// // Styles (Same as before)
// const styles = {
//   container: {
//     minHeight: "100vh",
//     backgroundColor: "#f3f4f6", 
//     padding: "40px 20px",
//     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   headerWrapper: {
//     width: "100%",
//     maxWidth: "500px",
//     marginBottom: "20px",
//   },
//   backBtn: {
//     display: "inline-flex",
//     alignItems: "center",
//     padding: "8px 16px",
//     backgroundColor: "#ffffff",
//     border: "1px solid #e5e7eb",
//     borderRadius: "8px",
//     color: "#374151",
//     fontSize: "14px",
//     fontWeight: "600",
//     cursor: "pointer",
//     marginBottom: "15px",
//     transition: "all 0.2s",
//   },
//   pageTitle: {
//     fontSize: "24px",
//     fontWeight: "700",
//     color: "#111827",
//     margin: 0,
//     display: "none", 
//   },
//   card: {
//     backgroundColor: "#ffffff",
//     width: "100%",
//     maxWidth: "500px", 
//     padding: "40px",
//     borderRadius: "16px",
//     boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
//   },
//   cardHeader: {
//     textAlign: "center",
//     marginBottom: "30px",
//   },
//   title: {
//     fontSize: "26px",
//     fontWeight: "bold",
//     color: "#1f2937",
//     marginBottom: "8px",
//   },
//   subtitle: {
//     fontSize: "14px",
//     color: "#6b7280",
//     margin: 0,
//   },
//   inputGroup: {
//     marginBottom: "20px",
//   },
//   label: {
//     display: "block",
//     fontSize: "14px",
//     fontWeight: "600",
//     color: "#374151",
//     marginBottom: "8px",
//   },
//   input: {
//     width: "100%",
//     padding: "12px 15px",
//     fontSize: "15px",
//     borderRadius: "8px",
//     border: "1px solid #d1d5db",
//     outline: "none",
//     boxSizing: "border-box",
//     transition: "border-color 0.2s",
//     backgroundColor: "#f9fafb",
//   },
//   select: {
//     width: "100%",
//     padding: "12px 15px",
//     fontSize: "15px",
//     borderRadius: "8px",
//     border: "1px solid #d1d5db",
//     outline: "none",
//     boxSizing: "border-box",
//     backgroundColor: "#f9fafb",
//     appearance: "none", 
//     cursor: "pointer",
//   },
//   selectArrow: {
//     position: "absolute",
//     right: "15px",
//     top: "50%",
//     transform: "translateY(-50%)",
//     pointerEvents: "none",
//     fontSize: "12px",
//     color: "#6b7280",
//   },
//   passwordWrapper: {
//     position: "relative",
//     display: "flex",
//     alignItems: "center",
//   },
//   eyeIcon: {
//     position: "absolute",
//     right: "15px",
//     cursor: "pointer",
//     fontSize: "18px",
//     background: "transparent",
//     color: "#6b7280",
//   },
//   button: {
//     width: "100%",
//     padding: "14px",
//     backgroundColor: "#1976D2", 
//     color: "#fff",
//     border: "none",
//     borderRadius: "8px",
//     fontSize: "16px",
//     fontWeight: "600",
//     cursor: "pointer",
//     transition: "background-color 0.2s",
//     marginTop: "10px",
//   },
//   buttonDisabled: {
//     width: "100%",
//     padding: "14px",
//     backgroundColor: "#93c5fd",
//     color: "#fff",
//     border: "none",
//     borderRadius: "8px",
//     cursor: "not-allowed",
//     marginTop: "10px",
//   },
// };


















import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; 
import Header from "../components/Header";

export default function CreateUser() {
  const navigate = useNavigate();

  // States
  const [form, setForm] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "", // 👈 Added Confirm Password field
    userType: "",
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // 👈 State for 2nd eye icon
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // 👇 VALIDATION: Full Name (Sirf Alphabets)
    if (name === "name") {
      if (value === "") {
        setForm({ ...form, [name]: value });
        return;
      }
      if (!/^[a-zA-Z\s]*$/.test(value)) {
        toast.error("Name should only contain Alphabets!");
        return;
      }
    }

    // 👇 USERNAME: No spaces
    if (name === "username") {
       if (/\s/.test(value)) {
         toast.error("Username cannot contain spaces!");
         return;
       }
    }

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // --- 🔒 STRONG PASSWORD VALIDATION ---
    const { password, confirmPassword } = form;

    // Check 0: Match Passwords
    if (password !== confirmPassword) {
        return toast.error("Passwords do not match!");
    }

    // Check 1: Length
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters long!");
    }

    // Check 2: Must contain a Number
    if (!/\d/.test(password)) {
      return toast.error("Password must contain at least one Number (0-9)!");
    }

    // Check 3: Must contain a Special Character
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return toast.error("Password must contain at least one Special Character (@, #, $, etc.)!");
    }

    // Check 4: User Type Selection
    if (!form.userType) return toast.error("Please select a User Type");

    setLoading(true);
    const toastId = toast.loading("Creating User...");

    try {
      // ⚠️ Backend ko 'confirmPassword' nahi bhejna, isliye usse hata rahe hain
      const { confirmPassword, ...payload } = form;

      await axios.post("http://localhost:7000/api/auth/create-user", payload, {
        withCredentials: true,
      });

      toast.success("User Created Successfully!", { id: toastId });
      
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);

    } catch (err) {
      console.error("Error creating user:", err);
      toast.error(err.response?.data?.message || "Failed to create user", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
       <Header/>

    
    <div style={styles.container}>
     
      
      {/* Header Section */}
      <div style={styles.headerWrapper}>
        <button 
          onClick={() => navigate("/users")} 
          style={styles.backBtn}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = "#9ca3af"}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = "#e5e7eb"}
        >
          <span style={{marginRight: "8px"}}>⬅</span> Back
        </button>
        <h1 style={styles.pageTitle}>User Management</h1>
      </div>

      {/* Card Section */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h2 style={styles.title}>Create New User</h2>
          <p style={styles.subtitle}>Fill in the details to register a new admin or employee.</p>
        </div>

        <form onSubmit={handleSubmit}>
          
          {/* Username Input */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>UserName<span style={styles.requiredStar}>*</span></label>
            <input
              type="text"
              name="username"
              placeholder="e.g. Rahul_01@"
              value={form.username}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          {/* Name Input */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name<span style={styles.requiredStar}>*</span></label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Rahul Sharma"
              value={form.name}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          {/* Email Input */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address <span style={styles.requiredStar}>*</span></label>
            <input
              type="email"
              name="email"
              placeholder="e.g. rahul@company.com"
              value={form.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          {/* Password Input */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password<span style={styles.requiredStar}>*</span></label>
            <div style={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Strong Password"
                value={form.password}
                onChange={handleChange}
                required
                style={styles.input}
              />
              <span 
                onClick={() => setShowPassword(!showPassword)} 
                style={styles.eyeIcon}
                title={showPassword ? "Hide Password" : "Show Password"}
              >
                {showPassword ? "👁️" : "🙈"} 
              </span>
            </div>
          </div>

          {/* 👇 NEW FIELD: Confirm Password */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm Password<span style={styles.requiredStar}>*</span></label>
            <div style={styles.passwordWrapper}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Repeat Password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                style={styles.input}
              />
              <span 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                style={styles.eyeIcon}
                title={showConfirmPassword ? "Hide Password" : "Show Password"}
              >
                {showConfirmPassword ? "👁️" : "🙈"} 
              </span>
            </div>
          </div>

          {/* User Type Select */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Role / User Type <span style={styles.requiredStar}>*</span></label>
            <div style={{position: 'relative'}}>
              <select
                name="userType"
                value={form.userType}
                onChange={handleChange}
                required
                style={styles.select}
              >
                <option value="">Select Role...</option>
                <option value="admin">Admin (Full Access)</option>
                <option value="superuser">Superuser (Limited Access)</option>
                <option value="user">User (View Only)</option>
              </select>
              <span style={styles.selectArrow}>▼</span>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            style={loading ? styles.buttonDisabled : styles.button}
          >
            {loading ? "Creating..." : "Create User"}
          </button>

        </form>
      </div>
    </div>
    </div>
  );
}

// Styles (Same as before)
const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f3f4f6", 
    padding: "40px 20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  headerWrapper: {
    width: "100%",
    maxWidth: "500px",
    marginBottom: "20px",
  },
  backBtn: {
    display: "inline-flex",
    alignItems: "center",
    padding: "8px 16px",
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    color: "#374151",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    marginBottom: "15px",
    transition: "all 0.2s",
  },
  pageTitle: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#111827",
    margin: 0,
    display: "none", 
  },
  card: {
    backgroundColor: "#ffffff",
    width: "100%",
    maxWidth: "500px", 
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  },
  cardHeader: {
    textAlign: "center",
    marginBottom: "30px",
  },
  title: {
    fontSize: "26px",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "8px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#6b7280",
    margin: 0,
  },
  inputGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "8px",
  },
  input: {
    width: "100%",
    padding: "12px 15px",
    fontSize: "15px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
    backgroundColor: "#f9fafb",
  },
  select: {
    width: "100%",
    padding: "12px 15px",
    fontSize: "15px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    outline: "none",
    boxSizing: "border-box",
    backgroundColor: "#f9fafb",
    appearance: "none", 
    cursor: "pointer",
  },
  selectArrow: {
    position: "absolute",
    right: "15px",
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
    fontSize: "12px",
    color: "#6b7280",
  },
  passwordWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  eyeIcon: {
    position: "absolute",
    right: "15px",
    cursor: "pointer",
    fontSize: "18px",
    background: "transparent",
    color: "#6b7280",
  },
  button: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#1976D2", 
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s",
    marginTop: "10px",
  },
  requiredStar: {
    color: "#ef4444", // Red color
    marginLeft: "4px",
  },
  buttonDisabled: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#93c5fd",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "not-allowed",
    marginTop: "10px",
  },
};
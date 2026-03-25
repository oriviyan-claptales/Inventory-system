// // import React from "react";
// // import { useNavigate } from "react-router-dom";
// // import { useSelector, useDispatch } from "react-redux";
// // import api from "../api/axios";
// // import { logoutUser } from "../redux/userSlice";
// // import toast from "react-hot-toast";

// // const Header = () => {
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();
// //   const user = useSelector((state) => state.user.userData);

// //   // const logout = async () => {
// //   //   try {
// //   //     // 1. Backend se cookie clear karo
// //   //     await api.post("/auth/signout");

// //   //     // 2. Local storage saaf karo
// //   //     localStorage.removeItem("user");

// //   //     // 3. Redux state clear karo
// //   //     dispatch(logoutUser());

// //   //     toast.success("Logged out successfully");

// //   //     // ✅ FIX: 'navigate' ki jagah Hard Redirect use karo
// //   //     // Ye browser ko force karega page reload karne ke liye
// //   //     window.location.href = "/"; 

// //   //   } catch (error) {
// //   //     console.error("Logout failed", error);
// //   //     // Agar error aaye tab bhi user ko bahar fek do (Safety fallback)
// //   //     localStorage.removeItem("user");
// //   //     dispatch(logoutUser());
// //   //     window.location.href = "/";
// //   //   }
// //   // };



// //   const logout = async () => {
// //     try {
// //       // 1. Backend se cookie clear karo
// //       // { withCredentials: true } pass karna zaroori hai agar global set nahi hai
// //       await api.post("/auth/signout", {}, { withCredentials: true });

// //       // 2. Local storage saaf karo
// //       localStorage.removeItem("user");

// //       // 3. Redux state clear karo
// //       dispatch(logoutUser());

// //       toast.success("Logged out successfully");

// //       // Hard redirect to clear any residual memory/state
// //       window.location.href = "/"; 

// //     } catch (error) {
// //       console.error("Logout failed", error);
// //       localStorage.removeItem("user");
// //       dispatch(logoutUser());
// //       window.location.href = "/";
// //     }
// //   };


// //   return (
// //     <header style={styles.header}>
// //       <div 
// //         style={styles.logoArea} 
// //         onClick={() => navigate("/dashboard")}
// //         title="Go to Dashboard"
// //       >
// //         <h3 style={styles.appTitle}>📦 InventoryHub</h3>
// //       </div>

// //       <div style={styles.userArea}>
// //         <div style={{ textAlign: "right", lineHeight: "1.2" }}>
// //           <span style={styles.userName}>Hello, {user?.name || "User"}</span>
// //           <span style={styles.userRole}>{user?.userType || "Guest"}</span>
// //         </div>
// //         <button onClick={logout} style={styles.logoutBtn}>
// //           Logout
// //         </button>
// //       </div>
// //     </header>
// //   );
// // };

// // const styles = {
// //   header: {
// //     backgroundColor: "#1e293b",
// //     padding: "10px 20px",
// //     display: "flex",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
// //     height: "50px",
// //     color: "#fff",
// //     position: "sticky",
// //     top: 0,
// //     zIndex: 100
// //   },
// //   logoArea: { cursor: "pointer", userSelect: "none" },
// //   appTitle: { color: "#fff", fontSize: "18px", margin: 0, fontWeight: "600" },
// //   userArea: { display: "flex", alignItems: "center", gap: "15px" },
// //   userName: { color: "#cbd5e1", fontSize: "13px", display: "block", fontWeight: "600" },
// //   userRole: { color: "#94a3b8", fontSize: "11px", display: "block", textTransform: "uppercase" },
// //   logoutBtn: {
// //     backgroundColor: "#ef4444",
// //     color: "#fff",
// //     border: "none",
// //     padding: "5px 12px",
// //     borderRadius: "4px",
// //     cursor: "pointer",
// //     fontSize: "12px",
// //     fontWeight: "600",
// //   },
// // };

// // export default Header;


// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { useSelector, useDispatch } from "react-redux";
// // import api from "../api/axios";
// // import { logoutUser } from "../redux/userSlice";
// // import toast from "react-hot-toast";

// // const Header = () => {
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();
// //   const user = useSelector((state) => state.user.userData);

// //   const [showForgot, setShowForgot] = useState(false);
// //   const [step, setStep] = useState(1); // 1=email, 2=otp, 3=password
// //   const [email, setEmail] = useState("");
// //   const [otp, setOtp] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [confirmPassword, setConfirmPassword] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   const logout = async () => {
// //     try {
// //       await api.post("/auth/signout", {}, { withCredentials: true });
// //     } catch { }
// //     localStorage.removeItem("user");
// //     dispatch(logoutUser());
// //     window.location.href = "/";
// //   };

// //   // STEP 1 – Send OTP
// //   const sendResetOTP = async () => {
// //     if (!email) return toast.error("Enter email");

// //     try {
// //       setLoading(true);
// //       await api.post("/password/forgot", { email });
// //       toast.success("OTP sent to your email");
// //       setStep(2);
// //     } catch (err) {
// //       toast.error(err.response?.data?.message || "Failed to send OTP");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // STEP 2 – Verify OTP
// //   const verifyOTP = async () => {
// //     if (!otp) return toast.error("Enter OTP");

// //     try {
// //       setLoading(true);
// //       await api.post("/password/verify", { email, code: otp });
// //       toast.success("OTP verified");
// //       setStep(3);
// //     } catch {
// //       toast.error("Invalid OTP");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // STEP 3 – Reset Password
// //   const resetPassword = async () => {
// //     if (password.length < 6)
// //       return toast.error("Minimum 6 characters");

// //     if (password !== confirmPassword)
// //       return toast.error("Passwords do not match");

// //     try {
// //       setLoading(true);
// //       await api.post("/password/reset", { email, password });
// //       toast.success("Password reset successful");

// //       setShowForgot(false);
// //       setStep(1);
// //       setEmail("");
// //       setOtp("");
// //       setPassword("");
// //       setConfirmPassword("");
// //     } catch {
// //       toast.error("Failed to reset password");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <>
// //       <header style={styles.header}>
// //         <div style={styles.logoArea} onClick={() => navigate("/dashboard")}>
// //           <h3 style={styles.appTitle}>📦 InventoryHub</h3>
// //         </div>

// //         <div style={styles.userArea}>
// //           <span onClick={() => setShowForgot(true)} style={styles.forgotLink}>
// //             Change Password?
// //           </span>


// //           <div style={{ textAlign: "right", lineHeight: "1.2" }}>
// //             <span style={styles.userName}>Hello, {user?.name}</span>
// //             <span style={styles.userRole}>{user?.userType}</span>
// //           </div>

// //           <button onClick={logout} style={styles.logoutBtn}>Logout</button>
// //         </div>
// //       </header>

// //       {/* ===== FORGOT PASSWORD MODAL ===== */}
// //       {showForgot && (
// //         <div style={styles.modalBackdrop}>
// //           <div style={styles.modal}>
// //             <h3 style={{ marginBottom: "10px" }}>Reset Password</h3>

// //             {step === 1 && (
// //               <>
// //                 <input
// //                   placeholder="Enter your email"
// //                   value={email}
// //                   onChange={(e) => setEmail(e.target.value)}
// //                   style={styles.modalInput}
// //                 />
// //                 <button onClick={sendResetOTP} style={styles.sendBtn}>
// //                   {loading ? "Sending..." : "Send OTP"}
// //                 </button>
// //               </>
// //             )}

// //             {step === 2 && (
// //               <>
// //                 <input
// //                   placeholder="Enter OTP"
// //                   value={otp}
// //                   onChange={(e) => setOtp(e.target.value)}
// //                   style={styles.modalInput}
// //                 />
// //                 <button onClick={verifyOTP} style={styles.sendBtn}>
// //                   {loading ? "Verifying..." : "Verify OTP"}
// //                 </button>
// //               </>
// //             )}

// //             {step === 3 && (
// //               <>
// //                 <input
// //                   type="password"
// //                   placeholder="New Password"
// //                   value={password}
// //                   onChange={(e) => setPassword(e.target.value)}
// //                   style={styles.modalInput}
// //                 />
// //                 <input
// //                   type="password"
// //                   placeholder="Confirm Password"
// //                   value={confirmPassword}
// //                   onChange={(e) => setConfirmPassword(e.target.value)}
// //                   style={styles.modalInput}
// //                 />
// //                 <button onClick={resetPassword} style={styles.sendBtn}>
// //                   {loading ? "Saving..." : "Reset Password"}
// //                 </button>
// //               </>
// //             )}

// //             <button onClick={() => setShowForgot(false)} style={styles.cancelBtn}>
// //               Cancel
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // };

// // export default Header;

// // const styles = {
// //   header: {
// //     backgroundColor: "#1e293b",
// //     padding: "10px 20px",
// //     display: "flex",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     height: "50px",
// //     color: "#fff"
// //   },
// //   logoArea: { cursor: "pointer" },
// //   appTitle: { margin: 0, fontSize: "18px" },
// //   userArea: { display: "flex", alignItems: "center", gap: "15px" },
// //   userName: { fontSize: "13px", display: "block", color: "#cbd5e1" },
// //   userRole: { fontSize: "11px", color: "#94a3b8" },
// //   // forgotLink: {
// //   //   color: "#93c5fd",
// //   //   fontSize: "12px",
// //   //   cursor: "pointer",
// //   //   textDecoration: "underline"
// //   // },
// //   forgotLink: {
// //     background: "linear-gradient(135deg, #274575, #243b6e)",
// //     color: "#fff",
// //     fontSize: "11px",
// //     padding: "6px 12px",
// //     borderRadius: "999px",
// //     cursor: "pointer",
// //     fontWeight: "600",
// //     boxShadow: "0 2px 8px rgba(37,99,235,0.4)",
// //     transition: "0.2s ease",
// //     userSelect: "none"
// //   },

// //   logoutBtn: {
// //     backgroundColor: "#ef4444",
// //     border: "none",
// //     color: "#fff",
// //     padding: "6px 12px",
// //     borderRadius: "5px",
// //     cursor: "pointer",
// //     fontSize: "12px"
// //   },
// //   modalBackdrop: {
// //     position: "fixed",
// //     inset: 0,
// //     background: "rgba(0,0,0,0.4)",
// //     display: "flex",
// //     justifyContent: "center",
// //     alignItems: "center",
// //     zIndex: 999
// //   },
// //   modal: {
// //     background: "#fff",
// //     padding: "25px",
// //     borderRadius: "10px",
// //     width: "100%",
// //     maxWidth: "360px",
// //     textAlign: "center"
// //   },
// //   modalInput: {
// //     width: "100%",
// //     padding: "12px",
// //     border: "1px solid #d1d5db",
// //     borderRadius: "6px",
// //     marginTop: "10px"
// //   },
// //   cancelBtn: {
// //     marginTop: "10px",
// //     width: "100%",
// //     padding: "10px",
// //     background: "#e5e7eb",
// //     border: "none",
// //     borderRadius: "6px",
// //     cursor: "pointer"
// //   },
// //   sendBtn: {
// //     marginTop: "10px",
// //     width: "100%",
// //     padding: "10px",
// //     background: "#2563eb",
// //     color: "#fff",
// //     border: "none",
// //     borderRadius: "6px",
// //     cursor: "pointer"
// //   }
// // };















// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import api from "../api/axios";
// import { logoutUser } from "../redux/userSlice";
// import toast from "react-hot-toast";

// const Header = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.user.userData);

//   const [showForgot, setShowForgot] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const dropdownRef = useRef(null);

//   const [step, setStep] = useState(1); // 1=email, 2=otp, 3=password
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Close dropdown on outside click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const logout = async () => {
//     try {
//       await api.post("/auth/signout", {}, { withCredentials: true });
//     } catch { }
//     localStorage.removeItem("user");
//     dispatch(logoutUser());
//     window.location.href = "/";
//   };

//   // STEP 1 – Send OTP
//   const sendResetOTP = async () => {
//     if (!email) return toast.error("Please enter your email");
//     try {
//       setLoading(true);
//       await api.post("/password/forgot", { email });
//       toast.success("OTP sent to your email");
//       setStep(2);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to send OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // STEP 2 – Verify OTP
//   const verifyOTP = async () => {
//     if (!otp) return toast.error("Please enter the verification code");
//     try {
//       setLoading(true);
//       await api.post("/password/verify", { email, code: otp });
//       toast.success("OTP verified");
//       setStep(3);
//     } catch {
//       toast.error("Invalid OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // STEP 3 – Reset Password with STRICT VALIDATION
//   const resetPassword = async () => {
//     // 1. Empty Check
//     if (!password || !confirmPassword) {
//         return toast.error("Please fill in both password fields.");
//     }

//     // 2. Matching Check
//     if (password !== confirmPassword) {
//       return toast.error("Passwords do not match!");
//     }

//     // 3. Length Check
//     if (password.length < 6) {
//       return toast.error("Password must be at least 6 characters long!");
//     }

//     // 4. Number Check
//     if (!/\d/.test(password)) {
//       return toast.error("Password must contain at least one Number (0-9)!");
//     }

//     // 5. Special Character Check
//     if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
//       return toast.error("Password must contain at least one Special Character (@, #, etc.)!");
//     }

//     try {
//       setLoading(true);
//       await api.post("/password/reset", { email, password });
//       toast.success("Password reset successful");

//       // Reset everything
//       setShowForgot(false);
//       setStep(1);
//       setEmail(""); setOtp(""); setPassword(""); setConfirmPassword("");
//     } catch {
//       toast.error("Failed to reset password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <header style={styles.header}>
//         <div style={styles.logoArea} onClick={() => navigate("/dashboard")}>
//           <h3 style={styles.appTitle}>Inventory Hub</h3>
//         </div>

//         <div style={styles.userArea} ref={dropdownRef}>
//           <div style={styles.profileTrigger} onClick={() => setShowDropdown(!showDropdown)}>
//             <div style={styles.avatar}>{user?.name?.charAt(0).toUpperCase() || "U"}</div>
//             <span style={styles.arrow}>{showDropdown ? "▲" : "▼"}</span>
//           </div>

//           {showDropdown && (
//             <div style={styles.dropdownMenu}>
//               <div style={styles.userInfoSection}>
//                 <p style={styles.menuName}>{user?.name || "User"}</p>
//                 <p style={styles.menuRole}>{user?.userType || "Member"}</p>
//               </div>
//               <hr style={styles.divider} />
//               <div style={styles.menuItem} onClick={() => { setShowForgot(true); setShowDropdown(false); }}>
//                 🔑 Change Password
//               </div>
//               <div style={{...styles.menuItem, color: "#ef4444"}} onClick={logout}>
//                 Logout
//               </div>
//             </div>
//           )}
//         </div>
//       </header>

//       {/* Modal with Updated Validations */}
//       {showForgot && (
//         <div style={styles.modalBackdrop}>
//           <div style={styles.modal}>
//             <h3 style={{ marginBottom: "5px" }}>
//                 {step === 1 ? "Forgot Password" : step === 2 ? "Verify OTP" : "New Password"}
//             </h3>
//             <p style={{ fontSize: '12px', color: '#666', marginBottom: '15px' }}>
//                 {step === 3 && "Use 6+ chars, 1 number & 1 special char"}
//             </p>

//             {step === 1 && (
//               <>
//                 <input placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.modalInput} />
//                 <button onClick={sendResetOTP} style={styles.sendBtn}>{loading ? "Sending..." : "Send OTP"}</button>
//               </>
//             )}

//             {step === 2 && (
//               <>
//                 <input placeholder="Enter 6-digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)} style={styles.modalInput} />
//                 <button onClick={verifyOTP} style={styles.sendBtn}>{loading ? "Verifying..." : "Verify OTP"}</button>
//               </>
//             )}

//             {step === 3 && (
//               <>
//                 <input type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.modalInput} />
//                 <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={styles.modalInput} />
                
//                 {confirmPassword && (
//                     <p style={{ fontSize: '11px', color: password === confirmPassword ? 'green' : 'red', marginTop: '5px' }}>
//                         {password === confirmPassword ? "✓ Match" : "✗ No Match"}
//                     </p>
//                 )}

//                 <button onClick={resetPassword} style={styles.sendBtn}>{loading ? "Saving..." : "Update Password"}</button>
//               </>
//             )}

//             <button onClick={() => { setShowForgot(false); setStep(1); }} style={styles.cancelBtn}>Cancel</button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Header;

// const styles = {
//   header: { backgroundColor: "#1e293b", padding: "0 20px", display: "flex", justifyContent: "space-between", alignItems: "center", height: "55px", color: "#fff" },
//   logoArea: { cursor: "pointer" },
//   appTitle: { margin: 0, fontSize: "18px" },
//   userArea: { position: "relative" },
//   profileTrigger: { display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", background: "#334155", padding: "5px 12px", borderRadius: "20px" },
//   avatar: { width: "28px", height: "28px", borderRadius: "50%", backgroundColor: "#4f46e5", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "13px", fontWeight: "bold" },
//   arrow: { fontSize: "9px" },
//   dropdownMenu: { position: "absolute", top: "45px", right: "0", backgroundColor: "#fff", minWidth: "180px", borderRadius: "8px", boxShadow: "0 10px 15px rgba(0,0,0,0.1)", zIndex: 1000, overflow: "hidden", border: "1px solid #e2e8f0" },
//   userInfoSection: { padding: "12px", backgroundColor: "#f8fafc" },
//   menuName: { margin: 0, color: "#1e293b", fontSize: "13px", fontWeight: "600" },
//   menuRole: { margin: 0, color: "#64748b", fontSize: "11px" },
//   divider: { margin: "0", border: "none", borderTop: "1px solid #e2e8f0" },
//   menuItem: { padding: "10px 12px", color: "#334155", fontSize: "13px", cursor: "pointer", textAlign: "left" },
//   modalBackdrop: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 2000 },
//   modal: { background: "#fff", padding: "20px", borderRadius: "10px", width: "90%", maxWidth: "320px", textAlign: "center" },
//   modalInput: { width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "5px", marginTop: "10px", boxSizing: "border-box" },
//   cancelBtn: { marginTop: "10px", width: "100%", padding: "10px", background: "#eee", border: "none", borderRadius: "5px", cursor: "pointer" },
//   sendBtn: { marginTop: "15px", width: "100%", padding: "10px", background: "#4f46e5", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "600" }
// };






























// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import api from "../api/axios";
// import { logoutUser } from "../redux/userSlice";
// import toast from "react-hot-toast";

// const Header = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.user.userData);

//   // const logout = async () => {
//   //   try {
//   //     // 1. Backend se cookie clear karo
//   //     await api.post("/auth/signout");

//   //     // 2. Local storage saaf karo
//   //     localStorage.removeItem("user");

//   //     // 3. Redux state clear karo
//   //     dispatch(logoutUser());

//   //     toast.success("Logged out successfully");

//   //     // ✅ FIX: 'navigate' ki jagah Hard Redirect use karo
//   //     // Ye browser ko force karega page reload karne ke liye
//   //     window.location.href = "/"; 

//   //   } catch (error) {
//   //     console.error("Logout failed", error);
//   //     // Agar error aaye tab bhi user ko bahar fek do (Safety fallback)
//   //     localStorage.removeItem("user");
//   //     dispatch(logoutUser());
//   //     window.location.href = "/";
//   //   }
//   // };



//   const logout = async () => {
//     try {
//       // 1. Backend se cookie clear karo
//       // { withCredentials: true } pass karna zaroori hai agar global set nahi hai
//       await api.post("/auth/signout", {}, { withCredentials: true });

//       // 2. Local storage saaf karo
//       localStorage.removeItem("user");

//       // 3. Redux state clear karo
//       dispatch(logoutUser());

//       toast.success("Logged out successfully");

//       // Hard redirect to clear any residual memory/state
//       window.location.href = "/"; 

//     } catch (error) {
//       console.error("Logout failed", error);
//       localStorage.removeItem("user");
//       dispatch(logoutUser());
//       window.location.href = "/";
//     }
//   };


//   return (
//     <header style={styles.header}>
//       <div 
//         style={styles.logoArea} 
//         onClick={() => navigate("/dashboard")}
//         title="Go to Dashboard"
//       >
//         <h3 style={styles.appTitle}>📦 InventoryHub</h3>
//       </div>

//       <div style={styles.userArea}>
//         <div style={{ textAlign: "right", lineHeight: "1.2" }}>
//           <span style={styles.userName}>Hello, {user?.name || "User"}</span>
//           <span style={styles.userRole}>{user?.userType || "Guest"}</span>
//         </div>
//         <button onClick={logout} style={styles.logoutBtn}>
//           Logout
//         </button>
//       </div>
//     </header>
//   );
// };

// const styles = {
//   header: {
//     backgroundColor: "#1e293b",
//     padding: "10px 20px",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//     height: "50px",
//     color: "#fff",
//     position: "sticky",
//     top: 0,
//     zIndex: 100
//   },
//   logoArea: { cursor: "pointer", userSelect: "none" },
//   appTitle: { color: "#fff", fontSize: "18px", margin: 0, fontWeight: "600" },
//   userArea: { display: "flex", alignItems: "center", gap: "15px" },
//   userName: { color: "#cbd5e1", fontSize: "13px", display: "block", fontWeight: "600" },
//   userRole: { color: "#94a3b8", fontSize: "11px", display: "block", textTransform: "uppercase" },
//   logoutBtn: {
//     backgroundColor: "#ef4444",
//     color: "#fff",
//     border: "none",
//     padding: "5px 12px",
//     borderRadius: "4px",
//     cursor: "pointer",
//     fontSize: "12px",
//     fontWeight: "600",
//   },
// };

// export default Header;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import api from "../api/axios";
// import { logoutUser } from "../redux/userSlice";
// import toast from "react-hot-toast";

// const Header = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.user.userData);

//   const [showForgot, setShowForgot] = useState(false);
//   const [step, setStep] = useState(1); // 1=email, 2=otp, 3=password
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const logout = async () => {
//     try {
//       await api.post("/auth/signout", {}, { withCredentials: true });
//     } catch { }
//     localStorage.removeItem("user");
//     dispatch(logoutUser());
//     window.location.href = "/";
//   };

//   // STEP 1 – Send OTP
//   const sendResetOTP = async () => {
//     if (!email) return toast.error("Enter email");

//     try {
//       setLoading(true);
//       await api.post("/password/forgot", { email });
//       toast.success("OTP sent to your email");
//       setStep(2);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to send OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // STEP 2 – Verify OTP
//   const verifyOTP = async () => {
//     if (!otp) return toast.error("Enter OTP");

//     try {
//       setLoading(true);
//       await api.post("/password/verify", { email, code: otp });
//       toast.success("OTP verified");
//       setStep(3);
//     } catch {
//       toast.error("Invalid OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // STEP 3 – Reset Password
//   const resetPassword = async () => {
//     if (password.length < 6)
//       return toast.error("Minimum 6 characters");

//     if (password !== confirmPassword)
//       return toast.error("Passwords do not match");

//     try {
//       setLoading(true);
//       await api.post("/password/reset", { email, password });
//       toast.success("Password reset successful");

//       setShowForgot(false);
//       setStep(1);
//       setEmail("");
//       setOtp("");
//       setPassword("");
//       setConfirmPassword("");
//     } catch {
//       toast.error("Failed to reset password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <header style={styles.header}>
//         <div style={styles.logoArea} onClick={() => navigate("/dashboard")}>
//           <h3 style={styles.appTitle}>📦 InventoryHub</h3>
//         </div>

//         <div style={styles.userArea}>
//           <span onClick={() => setShowForgot(true)} style={styles.forgotLink}>
//             Change Password?
//           </span>


//           <div style={{ textAlign: "right", lineHeight: "1.2" }}>
//             <span style={styles.userName}>Hello, {user?.name}</span>
//             <span style={styles.userRole}>{user?.userType}</span>
//           </div>

//           <button onClick={logout} style={styles.logoutBtn}>Logout</button>
//         </div>
//       </header>

//       {/* ===== FORGOT PASSWORD MODAL ===== */}
//       {showForgot && (
//         <div style={styles.modalBackdrop}>
//           <div style={styles.modal}>
//             <h3 style={{ marginBottom: "10px" }}>Reset Password</h3>

//             {step === 1 && (
//               <>
//                 <input
//                   placeholder="Enter your email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   style={styles.modalInput}
//                 />
//                 <button onClick={sendResetOTP} style={styles.sendBtn}>
//                   {loading ? "Sending..." : "Send OTP"}
//                 </button>
//               </>
//             )}

//             {step === 2 && (
//               <>
//                 <input
//                   placeholder="Enter OTP"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   style={styles.modalInput}
//                 />
//                 <button onClick={verifyOTP} style={styles.sendBtn}>
//                   {loading ? "Verifying..." : "Verify OTP"}
//                 </button>
//               </>
//             )}

//             {step === 3 && (
//               <>
//                 <input
//                   type="password"
//                   placeholder="New Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   style={styles.modalInput}
//                 />
//                 <input
//                   type="password"
//                   placeholder="Confirm Password"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   style={styles.modalInput}
//                 />
//                 <button onClick={resetPassword} style={styles.sendBtn}>
//                   {loading ? "Saving..." : "Reset Password"}
//                 </button>
//               </>
//             )}

//             <button onClick={() => setShowForgot(false)} style={styles.cancelBtn}>
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Header;

// const styles = {
//   header: {
//     backgroundColor: "#1e293b",
//     padding: "10px 20px",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     height: "50px",
//     color: "#fff"
//   },
//   logoArea: { cursor: "pointer" },
//   appTitle: { margin: 0, fontSize: "18px" },
//   userArea: { display: "flex", alignItems: "center", gap: "15px" },
//   userName: { fontSize: "13px", display: "block", color: "#cbd5e1" },
//   userRole: { fontSize: "11px", color: "#94a3b8" },
//   // forgotLink: {
//   //   color: "#93c5fd",
//   //   fontSize: "12px",
//   //   cursor: "pointer",
//   //   textDecoration: "underline"
//   // },
//   forgotLink: {
//     background: "linear-gradient(135deg, #274575, #243b6e)",
//     color: "#fff",
//     fontSize: "11px",
//     padding: "6px 12px",
//     borderRadius: "999px",
//     cursor: "pointer",
//     fontWeight: "600",
//     boxShadow: "0 2px 8px rgba(37,99,235,0.4)",
//     transition: "0.2s ease",
//     userSelect: "none"
//   },

//   logoutBtn: {
//     backgroundColor: "#ef4444",
//     border: "none",
//     color: "#fff",
//     padding: "6px 12px",
//     borderRadius: "5px",
//     cursor: "pointer",
//     fontSize: "12px"
//   },
//   modalBackdrop: {
//     position: "fixed",
//     inset: 0,
//     background: "rgba(0,0,0,0.4)",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 999
//   },
//   modal: {
//     background: "#fff",
//     padding: "25px",
//     borderRadius: "10px",
//     width: "100%",
//     maxWidth: "360px",
//     textAlign: "center"
//   },
//   modalInput: {
//     width: "100%",
//     padding: "12px",
//     border: "1px solid #d1d5db",
//     borderRadius: "6px",
//     marginTop: "10px"
//   },
//   cancelBtn: {
//     marginTop: "10px",
//     width: "100%",
//     padding: "10px",
//     background: "#e5e7eb",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer"
//   },
//   sendBtn: {
//     marginTop: "10px",
//     width: "100%",
//     padding: "10px",
//     background: "#2563eb",
//     color: "#fff",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer"
//   }
// };















// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import api from "../api/axios";
// import { logoutUser } from "../redux/userSlice";
// import toast from "react-hot-toast";

// const Header = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.user.userData);

//   const [showForgot, setShowForgot] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const dropdownRef = useRef(null);

//   const [step, setStep] = useState(1); // 1=email, 2=otp, 3=password
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Close dropdown on outside click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const logout = async () => {
//     try {
//       await api.post("/auth/signout", {}, { withCredentials: true });
//     } catch { }
//     localStorage.removeItem("user");
//     dispatch(logoutUser());
//     window.location.href = "/";
//   };

//   // STEP 1 – Send OTP
//   const sendResetOTP = async () => {
//     if (!email) return toast.error("Please enter your email");
//     try {
//       setLoading(true);
//       await api.post("/password/forgot", { email });
//       toast.success("OTP sent to your email");
//       setStep(2);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to send OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // STEP 2 – Verify OTP
//   const verifyOTP = async () => {
//     if (!otp) return toast.error("Please enter the verification code");
//     try {
//       setLoading(true);
//       await api.post("/password/verify", { email, code: otp });
//       toast.success("OTP verified");
//       setStep(3);
//     } catch {
//       toast.error("Invalid OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // STEP 3 – Reset Password with STRICT VALIDATION
//   const resetPassword = async () => {
//     // 1. Empty Check
//     if (!password || !confirmPassword) {
//         return toast.error("Please fill in both password fields.");
//     }

//     // 2. Matching Check
//     if (password !== confirmPassword) {
//       return toast.error("Passwords do not match!");
//     }

//     // 3. Length Check
//     if (password.length < 6) {
//       return toast.error("Password must be at least 6 characters long!");
//     }

//     // 4. Number Check
//     if (!/\d/.test(password)) {
//       return toast.error("Password must contain at least one Number (0-9)!");
//     }

//     // 5. Special Character Check
//     if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
//       return toast.error("Password must contain at least one Special Character (@, #, etc.)!");
//     }

//     try {
//       setLoading(true);
//       await api.post("/password/reset", { email, password });
//       toast.success("Password reset successful");

//       // Reset everything
//       setShowForgot(false);
//       setStep(1);
//       setEmail(""); setOtp(""); setPassword(""); setConfirmPassword("");
//     } catch {
//       toast.error("Failed to reset password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <header style={styles.header}>
//         {/* <div style={styles.logoArea} onClick={() => navigate("/dashboard")}>
//           <h3 style={styles.appTitle}>Inventory Hub</h3>
//         </div> */}

//         <div style={styles.userArea} ref={dropdownRef}>
//           <div style={styles.profileTrigger} onClick={() => setShowDropdown(!showDropdown)}>
//             <div style={styles.avatar}>{user?.name?.charAt(0).toUpperCase() || "U"}</div>
//             <span style={styles.arrow}>{showDropdown ? "▲" : "▼"}</span>
//           </div>

//           {showDropdown && (
//             <div style={styles.dropdownMenu}>
//               <div style={styles.userInfoSection}>
//                 <p style={styles.menuName}>{user?.name || "User"}</p>
//                 <p style={styles.menuRole}>{user?.userType || "Member"}</p>
//               </div>
//               <hr style={styles.divider} />
//               <div style={styles.menuItem} onClick={() => { setShowForgot(true); setShowDropdown(false); }}>
//                 🔑 Change Password
//               </div>
//               <div style={{...styles.menuItem, color: "#ef4444"}} onClick={logout}>
//                 Logout
//               </div>
//             </div>
//           )}
//         </div>
//       </header>

//       {/* Modal with Updated Validations */}
//       {showForgot && (
//         <div style={styles.modalBackdrop}>
//           <div style={styles.modal}>
//             <h3 style={{ marginBottom: "5px" }}>
//                 {step === 1 ? "Forgot Password" : step === 2 ? "Verify OTP" : "New Password"}
//             </h3>
//             <p style={{ fontSize: '12px', color: '#666', marginBottom: '15px' }}>
//                 {step === 3 && "Use 6+ chars, 1 number & 1 special char"}
//             </p>

//             {step === 1 && (
//               <>
//                 <input placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.modalInput} />
//                 <button onClick={sendResetOTP} style={styles.sendBtn}>{loading ? "Sending..." : "Send OTP"}</button>
//               </>
//             )}

//             {step === 2 && (
//               <>
//                 <input placeholder="Enter 6-digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)} style={styles.modalInput} />
//                 <button onClick={verifyOTP} style={styles.sendBtn}>{loading ? "Verifying..." : "Verify OTP"}</button>
//               </>
//             )}

//             {step === 3 && (
//               <>
//                 <input type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.modalInput} />
//                 <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={styles.modalInput} />
                
//                 {confirmPassword && (
//                     <p style={{ fontSize: '11px', color: password === confirmPassword ? 'green' : 'red', marginTop: '5px' }}>
//                         {password === confirmPassword ? "✓ Match" : "✗ No Match"}
//                     </p>
//                 )}

//                 <button onClick={resetPassword} style={styles.sendBtn}>{loading ? "Saving..." : "Update Password"}</button>
//               </>
//             )}

//             <button onClick={() => { setShowForgot(false); setStep(1); }} style={styles.cancelBtn}>Cancel</button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Header;

// const styles = {
//   header: { backgroundColor: "#1e293b", padding: "0 20px", display: "flex", justifyContent: "space-between", fontFamily: "'Inter', sans-serif", alignItems: "center", height: "55px", color: "#fff" },
//   logoArea: { cursor: "pointer" },
//   appTitle: { margin: 0, fontSize: "18px" },
//   // userArea: { position: "relative" },
//   profileTrigger: { display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", background: "#334155", padding: "5px 12px", borderRadius: "20px" },
//   avatar: { width: "28px", height: "28px", borderRadius: "50%", backgroundColor: "#4f46e5", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "13px", fontWeight: "bold" },
//   arrow: { fontSize: "9px" },
//   dropdownMenu: { position: "absolute", top: "45px", right: "0", backgroundColor: "#fff", minWidth: "180px", borderRadius: "8px", boxShadow: "0 10px 15px rgba(0,0,0,0.1)", zIndex: 1000, overflow: "hidden", border: "1px solid #e2e8f0" },
//   userInfoSection: { padding: "12px", backgroundColor: "#f8fafc" },
//   menuName: { margin: 0, color: "#1e293b", fontSize: "13px", fontWeight: "600" },
//   menuRole: { margin: 0, color: "#64748b", fontSize: "11px" },
//   divider: { margin: "0", border: "none", borderTop: "1px solid #e2e8f0" },
//   menuItem: { padding: "10px 12px", color: "#334155", fontSize: "13px", cursor: "pointer", textAlign: "left" },
//   modalBackdrop: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 2000 },
//   modal: { background: "#fff", padding: "20px", borderRadius: "10px", width: "90%", maxWidth: "320px", textAlign: "center" },
//   modalInput: { width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "5px", marginTop: "10px", boxSizing: "border-box" },
//   cancelBtn: { marginTop: "10px", width: "100%", padding: "10px", background: "#eee", border: "none", borderRadius: "5px", cursor: "pointer" },
//   sendBtn: { marginTop: "15px", width: "100%", padding: "10px", background: "#4f46e5", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "600" }
// };
























import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import api from "../api/axios";
import { logoutUser } from "../redux/userSlice";
import toast from "react-hot-toast";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);

  const [showForgot, setShowForgot] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const [step, setStep] = useState(1); 
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logout = async () => {
    try {
      await api.post("/auth/signout", {}, { withCredentials: true });
    } catch {}
    localStorage.removeItem("user");
    dispatch(logoutUser());
    window.location.href = "/";
  };

  const sendResetOTP = async () => {
    if (!email) return toast.error("Please enter your email");
    try {
      setLoading(true);
      await api.post("/password/forgot", { email });
      toast.success("OTP sent to your email");
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (!otp) return toast.error("Please enter the verification code");
    try {
      setLoading(true);
      await api.post("/password/verify", { email, code: otp });
      toast.success("OTP verified");
      setStep(3);
    } catch {
      toast.error("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    if (!password || !confirmPassword) return toast.error("Please fill in both password fields.");
    if (password !== confirmPassword) return toast.error("Passwords do not match!");
    if (password.length < 6) return toast.error("Password must be at least 6 characters long!");
    if (!/\d/.test(password)) return toast.error("Password must contain at least one Number (0-9)!");
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return toast.error("Password must contain at least one Special Character (@, #, etc.)!");

    try {
      setLoading(true);
      await api.post("/password/reset", { email, password });
      toast.success("Password reset successful");

      setShowForgot(false);
      setStep(1);
      setEmail(""); setOtp(""); setPassword(""); setConfirmPassword("");
    } catch {
      toast.error("Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header style={styles.header}>
        {/* 👇 FIX: userArea pe marginLeft: auto aur position: relative lagaya */}
        <div style={styles.userArea} ref={dropdownRef}>
          <div style={styles.profileTrigger} onClick={() => setShowDropdown(!showDropdown)}>
            <div style={styles.avatar}>{user?.name?.charAt(0).toUpperCase() || "U"}</div>
            <span style={styles.arrow}>{showDropdown ? "▲" : "▼"}</span>
          </div>

          {showDropdown && (
            <div style={styles.dropdownMenu}>
              <div style={styles.userInfoSection}>
                <p style={styles.menuName}>{user?.name || "User"}</p>
                <p style={styles.menuRole}>{user?.userType || "Member"}</p>
              </div>
              <hr style={styles.divider} />
              <div style={{...styles.menuItem, borderBottom: '1px solid #f1f5f9'}} onClick={() => { setShowForgot(true); setShowDropdown(false); }}>
                Change Password
              </div>
              <div style={{...styles.menuItem, color: "#ef4444"}} onClick={logout}>
                Logout
              </div>
            </div>
          )}
        </div>
      </header>

      {showForgot && (
        <div style={styles.modalBackdrop}>
          <div style={styles.modal}>
            <h3 style={{ marginBottom: "5px" }}>
                {step === 1 ? "Forgot Password" : step === 2 ? "Verify OTP" : "New Password"}
            </h3>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '15px' }}>
                {step === 3 && "Use 6+ chars, 1 number & 1 special char"}
            </p>

            {step === 1 && (
              <>
                <input placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.modalInput} />
                <button onClick={sendResetOTP} style={styles.sendBtn}>{loading ? "Sending..." : "Send OTP"}</button>
              </>
            )}

            {step === 2 && (
              <>
                <input placeholder="Enter 6-digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)} style={styles.modalInput} />
                <button onClick={verifyOTP} style={styles.sendBtn}>{loading ? "Verifying..." : "Verify OTP"}</button>
              </>
            )}

            {step === 3 && (
              <>
                <input type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.modalInput} />
                <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={styles.modalInput} />
                
                {confirmPassword && (
                    <p style={{ fontSize: '11px', color: password === confirmPassword ? 'green' : 'red', marginTop: '5px' }}>
                        {password === confirmPassword ? "✓ Match" : "✗ No Match"}
                    </p>
                )}

                <button onClick={resetPassword} style={styles.sendBtn}>{loading ? "Saving..." : "Update Password"}</button>
              </>
            )}

            <button onClick={() => { setShowForgot(false); setStep(1); }} style={styles.cancelBtn}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

const styles = {
  header: { 
    backgroundColor: "#ffffff", // Changed to white for a cleaner look, optional
    borderBottom: "1px solid #e2e8f0", // Clean border below header
    padding: "0 25px", 
    display: "flex", 
    alignItems: "center", 
    height: "60px", 
    color: "#1e293b",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
  },
  
  // 👇 FIX: Is se right side chala jayega aur dropdown sahi position me khulega
  userArea: { 
    marginLeft: "auto", 
    position: "relative" 
  },
  
  profileTrigger: { 
    display: "flex", 
    alignItems: "center", 
    gap: "10px", 
    cursor: "pointer", 
    background: "#f1f5f9", // Light grey background
    padding: "6px 14px", 
    borderRadius: "20px",
    transition: "background 0.2s"
  },
  avatar: { width: "30px", height: "30px", borderRadius: "50%", backgroundColor: "#2563eb", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "14px", fontWeight: "bold", color: "#fff" },
  arrow: { fontSize: "10px", color: "#64748b" },
  dropdownMenu: { position: "absolute", top: "55px", right: "0", backgroundColor: "#fff", minWidth: "180px", borderRadius: "10px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)", zIndex: 1000, overflow: "hidden", border: "1px solid #e2e8f0" },
  userInfoSection: { padding: "15px", backgroundColor: "#f8fafc" },
  menuName: { margin: 0, color: "#1e293b", fontSize: "14px", fontWeight: "700" },
  menuRole: { margin: 0, color: "#64748b", fontSize: "12px", textTransform: 'capitalize' },
  divider: { margin: "0", border: "none", borderTop: "1px solid #e2e8f0" },
  menuItem: { padding: "12px 15px", color: "#334155", fontSize: "13px", cursor: "pointer", textAlign: "left", transition: "background 0.2s" },
  
  modalBackdrop: { position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.6)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 2000, backdropFilter: 'blur(4px)' },
  modal: { background: "#fff", padding: "25px", borderRadius: "12px", width: "90%", maxWidth: "340px", textAlign: "center", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)" },
  modalInput: { width: "100%", padding: "12px", border: "1px solid #cbd5e1", borderRadius: "8px", marginTop: "12px", boxSizing: "border-box", fontSize: "14px", outline: "none" },
  cancelBtn: { marginTop: "12px", width: "100%", padding: "12px", background: "#f1f5f9", color: "#475569", border: "1px solid #cbd5e1", borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "14px" },
  sendBtn: { marginTop: "20px", width: "100%", padding: "12px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "14px" }
};
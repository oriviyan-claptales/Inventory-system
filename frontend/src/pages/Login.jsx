



// // // import { useState, useEffect } from "react";
// // // import api from "../api/axios";
// // // import { useNavigate } from "react-router-dom";
// // // import { useDispatch } from "react-redux";
// // // import { setUserData } from "../redux/userSlice";
// // // import toast from "react-hot-toast";

// // // export default function Login() {
// // //   const navigate = useNavigate();
// // //   const dispatch = useDispatch();

// // //   // --- STATES ---
// // //   const [stage, setStage] = useState(1);
// // //   const [form, setForm] = useState({ identifier: "", password: "" });
// // //   const [otp, setOtp] = useState("");
// // //   const [emailForOTP, setEmailForOTP] = useState("");
  
// // //   const [showPassword, setShowPassword] = useState(false);
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState("");
// // //   const [timer, setTimer] = useState(30);

// // //   // Timer Logic
// // //   useEffect(() => {
// // //     let interval;
// // //     if (stage === 2 && timer > 0) {
// // //       interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
// // //     }
// // //     return () => clearInterval(interval);
// // //   }, [stage, timer]);

// // //   // --- HANDLERS (Same as your logic) ---
// // //   const handleLogin = async (e) => {
// // //     e.preventDefault();
// // //     setLoading(true);
// // //     setError("");
// // //     try {
// // //       const result = await api.post("/auth/signin", form);
// // //       if (result.data.mfaRequired) {
// // //         setEmailForOTP(result.data.email);
// // //         setStage(2);
// // //         setTimer(30);
// // //         toast.success("OTP sent to your email!");
// // //       } else {
// // //         completeLogin(result.data);
// // //       }
// // //     } catch (err) {
// // //       setError(err.response?.data?.message || "Login failed. Check credentials.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleVerifyOTP = async (e) => {
// // //     e.preventDefault();
// // //     if (!otp) return setError("Please enter the OTP.");
// // //     setLoading(true);
// // //     try {
// // //       const result = await api.post("/auth/verify-login-otp", { 
// // //         email: emailForOTP, 
// // //         code: otp 
// // //       });
// // //       completeLogin(result.data);
// // //     } catch (err) {
// // //       setError(err.response?.data?.message || "Invalid or expired OTP.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const completeLogin = (userData) => {
// // //     localStorage.setItem("user", JSON.stringify(userData));
// // //     dispatch(setUserData(userData));
// // //     toast.success("Welcome back!");
// // //     navigate("/dashboard");
// // //   };

// // //   const resendOTP = async () => {
// // //     if (timer > 0) return;
// // //     try {
// // //       await api.post("/auth/signin", form);
// // //       setTimer(30);
// // //       toast.success("New OTP sent!");
// // //     } catch (err) {
// // //       toast.error("Failed to resend OTP");
// // //     }
// // //   };

// // //   const handleChange = (e) => {
// // //     setForm({ ...form, [e.target.name]: e.target.value });
// // //     if (error) setError("");
// // //   };

// // //   return (
// // //     <div style={styles.container}>
// // //       {/* CSS Animation for the spinner */}
// // //       <style>
// // //         {`
// // //           @keyframes spin {
// // //             0% { transform: rotate(0deg); }
// // //             100% { transform: rotate(360deg); }
// // //           }
// // //           .spinner {
// // //             border: 3px solid rgba(255, 255, 255, 0.3);
// // //             border-top: 3px solid #ffffff;
// // //             border-radius: 50%;
// // //             width: 20px;
// // //             height: 20px;
// // //             animation: spin 1s linear infinite;
// // //           }
// // //         `}
// // //       </style>

// // //       <div style={styles.card}>
// // //         <div style={styles.header}>
// // //           <h2 style={styles.title}>InventoryHub</h2>
// // //           <p style={styles.subtitle}>
// // //             {stage === 1 ? "Sign in to your account" : `Enter 6-digit code sent to ${emailForOTP}`}
// // //           </p>
// // //         </div>

// // //         {error && <p style={styles.errorMessage}>⚠️ {error}</p>}

// // //         {stage === 1 ? (
// // //           /* --- CREDENTIALS FORM --- */
// // //           <form onSubmit={handleLogin} style={styles.form}>
// // //             <div style={styles.inputGroup}>
// // //               <label style={styles.label}>Email or Username</label>
// // //               <input
// // //                 type="text"
// // //                 name="identifier"
// // //                 required
// // //                 placeholder="Enter email or username"
// // //                 style={styles.input}
// // //                 value={form.identifier}
// // //                 onChange={handleChange}
// // //               />
// // //             </div>

// // //             <div style={styles.inputGroup}>
// // //               <label style={styles.label}>Password</label>
// // //               <div style={styles.passwordWrapper}>
// // //                 <input
// // //                   type={showPassword ? "text" : "password"}
// // //                   name="password"
// // //                   required
// // //                   placeholder="Enter your password"
// // //                   style={styles.input}
// // //                   value={form.password}
// // //                   onChange={handleChange}
// // //                 />
// // //                 <span onClick={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
// // //                   {showPassword ? "👁️" : "🙈"}
// // //                 </span>
// // //               </div>
// // //             </div>

// // //             <div style={styles.forgotPassContainer}>
// // //               <span onClick={() => navigate("/forgot-password")} style={styles.link}>
// // //                 Forgot Password?
// // //               </span>
// // //             </div>

// // //             <button type="submit" disabled={loading} style={loading ? styles.buttonDisabled : styles.button}>
// // //               {loading ? <div className="spinner"></div> : "Continue"}
// // //             </button>
// // //           </form>
// // //         ) : (
// // //           /* --- OTP VERIFICATION FORM --- */
// // //           <form onSubmit={handleVerifyOTP} style={styles.form}>
// // //             <div style={styles.inputGroup}>
// // //               <label style={styles.label}>Verification Code</label>
// // //               <input
// // //                 type="text"
// // //                 maxLength="6"
// // //                 required
// // //                 placeholder="000000"
// // //                 style={{ ...styles.input, textAlign: "center", fontSize: "20px", letterSpacing: "8px" }}
// // //                 value={otp}
// // //                 onChange={(e) => setOtp(e.target.value)}
// // //               />
// // //             </div>

// // //             <button type="submit" disabled={loading} style={loading ? styles.buttonDisabled : styles.button}>
// // //               {loading ? <div className="spinner"></div> : "Secure Login"}
// // //             </button>

// // //             <div style={styles.resendContainer}>
// // //               {timer > 0 ? (
// // //                 <p style={styles.timerText}>Resend code in {timer}s</p>
// // //               ) : (
// // //                 <p onClick={resendOTP} style={styles.resendLink}>Resend Code</p>
// // //               )}
// // //             </div>

// // //             <p style={styles.linkText} onClick={() => { setStage(1); setError(""); }}>
// // //                Back to Login
// // //             </p>
// // //           </form>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // // --- UPDATED STYLES ---
// // // const styles = {
// // //   container: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f3f4f6", fontFamily: "'Segoe UI', sans-serif" },
// // //   card: { backgroundColor: "#ffffff", width: "100%", maxWidth: "400px", padding: "40px", borderRadius: "12px", boxShadow: "0 10px 25px rgba(0,0,0,0.05)", border: "1px solid #e5e7eb" },
// // //   header: { textAlign: "center", marginBottom: "30px" },
// // //   title: { fontSize: "26px", fontWeight: "700", color: "#1a1a1a", marginBottom: "8px" },
// // //   subtitle: { fontSize: "14px", color: "#6b7280", margin: 0 },
// // //   form: { display: "flex", flexDirection: "column" },
// // //   inputGroup: { marginBottom: "20px" },
// // //   label: { display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "8px" },
// // //   input: { width: "100%", padding: "12px 15px", fontSize: "15px", borderRadius: "6px", border: "1px solid #d1d5db", outline: "none", boxSizing: "border-box" },
// // //   passwordWrapper: { position: "relative", display: "flex", alignItems: "center" },
// // //   eyeIcon: { position: "absolute", right: "15px", cursor: "pointer", fontSize: "18px" },
// // //   errorMessage: { color: "#dc2626", fontSize: "13px", marginBottom: "15px", textAlign: "center", backgroundColor: "#fef2f2", padding: "8px", borderRadius: "4px" },
// // //   forgotPassContainer: { textAlign: "right", marginBottom: "20px" },
// // //   link: { fontSize: "13px", color: "#1976D2", cursor: "pointer" },
  
// // //   // Updated Button Styles for Centering Spinner
// // //   button: { 
// // //     width: "100%", 
// // //     padding: "14px", 
// // //     backgroundColor: "#1976D2", 
// // //     color: "#fff", 
// // //     border: "none", 
// // //     borderRadius: "6px", 
// // //     fontSize: "16px", 
// // //     fontWeight: "600", 
// // //     cursor: "pointer",
// // //     display: "flex",           // Added for centering
// // //     justifyContent: "center",  // Added for centering
// // //     alignItems: "center",      // Added for centering
// // //     minHeight: "50px"          // Fixed height taaki loader aane pe button ka size na hile
// // //   },
// // //   buttonDisabled: { 
// // //     width: "100%", 
// // //     padding: "14px", 
// // //     backgroundColor: "#93c5fd", 
// // //     color: "#fff", 
// // //     border: "none", 
// // //     borderRadius: "6px", 
// // //     cursor: "not-allowed",
// // //     display: "flex",           // Added for centering
// // //     justifyContent: "center",  // Added for centering
// // //     alignItems: "center",      // Added for centering
// // //     minHeight: "50px"          // Fixed height
// // //   },

// // //   resendContainer: { textAlign: "center", marginTop: "15px" },
// // //   timerText: { fontSize: "13px", color: "#9ca3af" },
// // //   resendLink: { fontSize: "13px", color: "#1976D2", cursor: "pointer", fontWeight: "bold" },
// // //   linkText: { textAlign: "center", marginTop: "15px", fontSize: "13px", color: "#6b7280", cursor: "pointer", textDecoration: "underline" }
// // // };






















// // import { useState, useEffect } from "react";
// // import api from "../api/axios";
// // import { useNavigate } from "react-router-dom";
// // import { useDispatch } from "react-redux";
// // import { setUserData } from "../redux/userSlice";
// // import toast from "react-hot-toast";

// // export default function Login() {
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();

// //   // --- STATES ---
// //   const [stage, setStage] = useState(1);

// //   const [form, setForm] = useState({ password: "" });

// //   // 👇 NEW
// //   const [emailPrefix, setEmailPrefix] = useState("");
// //   const [emailDomain, setEmailDomain] = useState("@oriviyan.com");

// //   const [otp, setOtp] = useState("");
// //   const [emailForOTP, setEmailForOTP] = useState("");

// //   const [showPassword, setShowPassword] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");
// //   const [timer, setTimer] = useState(30);

// //   // Timer Logic
// //   useEffect(() => {
// //     let interval;
// //     if (stage === 2 && timer > 0) {
// //       interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
// //     }
// //     return () => clearInterval(interval);
// //   }, [stage, timer]);

// //   // --- LOGIN ---
// //   const handleLogin = async (e) => {
// //     e.preventDefault();

// //     const fullEmail = emailPrefix + emailDomain; // 👈 yahin email ban raha hai

// //     setLoading(true);
// //     setError("");

// //     try {
// //       const result = await axios.post("/auth/signin",
// //   {
// //     identifier: fullEmail,
// //     password: form.password,
// //   },
// //   {
// //     withCredentials: true, // ✅ Ye must hai cookie ke liye
// //   }
// // );

// //       // const result = await api.post("/auth/signin", {
// //       //   identifier: fullEmail,
// //       //   password: form.password,
// //       // });

// //       if (result.data.mfaRequired) {
// //         setEmailForOTP(result.data.email);
// //         setStage(2);
// //         setTimer(30);
// //         toast.success("OTP sent to your email!");
// //       } else {
// //         completeLogin(result.data);
// //       }
// //     } catch (err) {
// //       setError(err.response?.data?.message || "Login failed.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleVerifyOTP = async (e) => {
// //     e.preventDefault();
// //     if (!otp) return setError("Please enter the OTP.");

// //     setLoading(true);
// //     try {
// //       const result = await api.post("/auth/verify-login-otp", {
// //         email: emailForOTP,
// //         code: otp,
// //       });
// //       completeLogin(result.data);
// //     } catch (err) {
// //       setError(err.response?.data?.message || "Invalid or expired OTP.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const completeLogin = (userData) => {
// //     localStorage.setItem("user", JSON.stringify(userData));
// //     dispatch(setUserData(userData));
// //     toast.success("Welcome back!");
// //     navigate("/dashboard");
// //   };

// //   const resendOTP = async () => {
// //     if (timer > 0) return;

// //     try {
// //       const fullEmail = emailPrefix + emailDomain;
// //       await api.post("/auth/signin", {
// //         identifier: fullEmail,
// //         password: form.password,
// //       });
// //       setTimer(30);
// //       toast.success("New OTP sent!");
// //     } catch (err) {
// //       toast.error("Failed to resend OTP");
// //     }
// //   };

// //   const handlePasswordChange = (e) => {
// //     setForm({ ...form, password: e.target.value });
// //     if (error) setError("");
// //   };

// //   return (
// //     <div style={styles.container}>
// //       <div style={styles.card}>
// //         <div style={styles.header}>
// //           <h2 style={styles.title}>InventoryHub</h2>
// //           <p style={styles.subtitle}>
// //             {stage === 1
// //               ? "Sign in to your account"
// //               : `Enter 6-digit code sent to ${emailForOTP}`}
// //           </p>
// //         </div>

// //         {error && <p style={styles.errorMessage}>⚠️ {error}</p>}

// //         {stage === 1 ? (
// //           <form onSubmit={handleLogin} style={styles.form}>
// //             {/* EMAIL PREFIX + DOMAIN */}
// //             <div style={styles.inputGroup}>
// //               <label style={styles.label}>Email</label>

// //               {/* <div style={{ display: "flex", gap: "6px" }}>
// //                 <input
// //                   type="text"
// //                   placeholder="atif.ansari"
// //                   value={emailPrefix}
// //                   onChange={(e) => setEmailPrefix(e.target.value.toLowerCase())}
// //                   required
// //                   style={{ ...styles.input, flex: 1 }}
// //                 />

// //                 <select
// //                   value={emailDomain}
// //                   onChange={(e) => setEmailDomain(e.target.value)}
// //                   style={{ ...styles.input, width: "170px" }}
// //                 >
// //                   <option value="@oriviyan.com">@oriviyan.com</option>
// //                   <option value="@mattrade.in">@mattrade.in</option>
// //                 </select>
// //               </div> */}
// //               <div style={styles.emailWrapper}>
// //                 <input
// //                   type="text"
// //                   placeholder="example:name"
// //                   value={emailPrefix}
// //                   onChange={(e) => setEmailPrefix(e.target.value.toLowerCase())}
// //                   required
// //                   style={styles.emailPrefix}
// //                 />

// //                 <select
// //                   value={emailDomain}
// //                   onChange={(e) => setEmailDomain(e.target.value)}
// //                   style={styles.emailDomain}
// //                 >
// //                   <option value="@oriviyan.com">@oriviyan.com</option>
// //                   <option value="@mattrade.in">@mattrade.in</option>
// //                 </select>
// //               </div>

// //             </div>

// //             {/* PASSWORD */}
// //             <div style={styles.inputGroup}>
// //               <label style={styles.label}>Password</label>
// //               <div style={styles.passwordWrapper}>
// //                 <input
// //                   type={showPassword ? "text" : "password"}
// //                   required
// //                   placeholder="Enter your password"
// //                   style={styles.input}
// //                   value={form.password}
// //                   onChange={handlePasswordChange}
// //                 />
// //                 <span
// //                   onClick={() => setShowPassword(!showPassword)}
// //                   style={styles.eyeIcon}
// //                 >
// //                   {showPassword ? "👁️" : "🙈"}
// //                 </span>
// //               </div>
// //             </div>

// //             <div style={styles.forgotPassContainer}>
// //               <span onClick={() => navigate("/forgot-password")} style={styles.link}>
// //                 Forgot Password?
// //               </span>
// //             </div>

// //             <button type="submit" disabled={loading} style={styles.button}>
// //               {loading ? "..." : "Continue"}
// //             </button>
// //           </form>
// //         ) : (
// //           <form onSubmit={handleVerifyOTP} style={styles.form}>
// //             <div style={styles.inputGroup}>
// //               <label style={styles.label}>Verification Code</label>
// //               <input
// //                 type="text"
// //                 maxLength="6"
// //                 required
// //                 placeholder="000000"
// //                 style={{ ...styles.input, textAlign: "center", fontSize: "20px" }}
// //                 value={otp}
// //                 onChange={(e) => setOtp(e.target.value)}
// //               />
// //             </div>

// //             <button type="submit" disabled={loading} style={styles.button}>
// //               Secure Login
// //             </button>

// //             <div style={styles.resendContainer}>
// //               {timer > 0 ? (
// //                 <p>Resend code in {timer}s</p>
// //               ) : (
// //                 <p onClick={resendOTP} style={styles.link}>Resend Code</p>
// //               )}
// //             </div>
// //           </form>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }


// // const styles = {
// //   container: {
// //     minHeight: "100vh",
// //     display: "flex",
// //     justifyContent: "center",
// //     alignItems: "center",
// //     background: "#ffffff",
// //     fontFamily: "'Segoe UI', sans-serif"
// //   },

// //   card: {
// //     width: "100%",
// //     maxWidth: "420px",
// //     backgroundColor: "#ffffff",
// //     borderRadius: "14px",
// //     padding: "40px 35px",
// //     boxShadow: "0 20px 50px rgba(0,0,0,0.15)"
// //   },

// //   header: {
// //     textAlign: "center",
// //     marginBottom: "30px"
// //   },

// //   title: {
// //     fontSize: "28px",
// //     fontWeight: "800",
// //     color: "#1e3a8a",
// //     marginBottom: "6px"
// //   },

// //   subtitle: {
// //     fontSize: "14px",
// //     color: "#6b7280"
// //   },

// //   form: {
// //     display: "flex",
// //     flexDirection: "column"
// //   },

// //   inputGroup: {
// //     width:"400px",
// //     marginBottom: "18px"
// //   },

// //   label: {
// //     fontSize: "13px",
// //     fontWeight: "600",
// //     color: "#374151",
// //     marginBottom: "6px",
// //     display: "block"
// //   },

// //   input: {
// //     width: "100%",
// //     padding: "13px 14px",
// //     borderRadius: "8px",
// //     border: "1px solid #d1d5db",
// //     fontSize: "14px",
// //     backgroundColor: "#f9fafb",
// //     outline: "none"
// //   },

// //   passwordWrapper: {
// //     position: "relative"
// //   },

// //   eyeIcon: {
// //     position: "absolute",
// //     right: "14px",
// //     top: "12px",
// //     cursor: "pointer",
// //     fontSize: "18px",
// //     opacity: 0.6
// //   },

// //   errorMessage: {
// //     backgroundColor: "#fee2e2",
// //     color: "#b91c1c",
// //     fontSize: "13px",
// //     padding: "10px",
// //     borderRadius: "8px",
// //     textAlign: "center",
// //     marginBottom: "15px"
// //   },

// //   forgotPassContainer: {
// //     textAlign: "right",
// //     marginBottom: "18px"
// //   },

// //   link: {
// //     fontSize: "13px",
// //     fontWeight: "600",
// //     color: "#2563eb",
// //     cursor: "pointer"
// //   },

// //   button: {
// //     width: "100%",
// //     padding: "14px",
// //     background: "linear-gradient(135deg, #2563eb, #1e3a8a)",
// //     color: "#ffffff",
// //     border: "none",
// //     borderRadius: "10px",
// //     fontSize: "15px",
// //     fontWeight: "700",
// //     cursor: "pointer",
// //     transition: "0.3s",
// //     boxShadow: "0 10px 20px rgba(37,99,235,0.3)"
// //   },

// //   buttonDisabled: {
// //     width: "100%",
// //     padding: "14px",
// //     backgroundColor: "#93c5fd",
// //     color: "#ffffff",
// //     border: "none",
// //     borderRadius: "10px",
// //     cursor: "not-allowed"
// //   },

// //   resendContainer: {
// //     textAlign: "center",
// //     marginTop: "16px"
// //   },

// //   timerText: {
// //     fontSize: "13px",
// //     color: "#9ca3af"
// //   },

// //   resendLink: {
// //     fontSize: "13px",
// //     color: "#2563eb",
// //     fontWeight: "700",
// //     cursor: "pointer"
// //   },

// //   linkText: {
// //     textAlign: "center",
// //     marginTop: "16px",
// //     fontSize: "13px",
// //     color: "#6b7280",
// //     cursor: "pointer",
// //     textDecoration: "underline"
// //   },

// //   // 🔥 Email field styling
// //   emailWrapper: {
// //     display: "flex",
// //     border: "1px solid #d1d5db",
// //     borderRadius: "8px",
// //     overflow: "hidden",
// //     backgroundColor: "#f9fafb"
// //   },

// //   emailPrefix: {
// //     flex: 1,
// //     padding: "13px 14px",
// //     border: "none",
// //     outline: "none",
// //     backgroundColor: "transparent",
// //     fontSize: "14px"
// //   },

// //   emailDomain: {
// //     border: "none",
// //     backgroundColor: "#e5e7eb",
// //     padding: "0 14px",
// //     fontSize: "14px",
// //     fontWeight: "700",
// //     cursor: "pointer",
// //     outline: "none"
// //   }
// // };

// // // const styles = {
// // //   container: { minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#f3f4f6" },
// // //   card: { background: "#fff", padding: "30px", borderRadius: "10px", width: "100%", maxWidth: "420px" },
// // //   header: { textAlign: "center", marginBottom: "20px" },
// // //   title: { fontSize: "24px", fontWeight: "700" },
// // //   subtitle: { fontSize: "14px", color: "#6b7280" },
// // //   form: { display: "flex", flexDirection: "column" },
// // //   inputGroup: { marginBottom: "15px" },
// // //   label: { fontSize: "13px", marginBottom: "5px", display: "block" },
// // //   input: { padding: "10px", borderRadius: "6px", border: "1px solid #d1d5db" },
// // //   passwordWrapper: { position: "relative" },
// // //   eyeIcon: { position: "absolute", right: "10px", top: "10px", cursor: "pointer" },
// // //   button: { padding: "12px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" },
// // //   forgotPassContainer: { textAlign: "right", marginBottom: "10px" },
// // //   link: { width: "80%", color: "#2563eb", cursor: "pointer" },
// // //   errorMessage: { color: "red", fontSize: "13px", textAlign: "center", marginBottom: "10px" },
// // //   resendContainer: { textAlign: "center", marginTop: "10px" }
// // // };








































// import { useState, useEffect } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setUserData } from "../redux/userSlice";
// import toast from "react-hot-toast";

// export default function Login() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [stage, setStage] = useState(1);
//   const [form, setForm] = useState({ password: "" });
//   const [emailPrefix, setEmailPrefix] = useState("");
//   const [emailDomain, setEmailDomain] = useState("@oriviyan.com");
//   const [otp, setOtp] = useState("");
//   const [emailForOTP, setEmailForOTP] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [timer, setTimer] = useState(30);

//   useEffect(() => {
//     let interval;
//     if (stage === 2 && timer > 0) {
//       interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
//     }
//     return () => clearInterval(interval);
//   }, [stage, timer]);

//   // --- LOGIN ---
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const fullEmail = emailPrefix + emailDomain;

//     setLoading(true);
//     setError("");

//     try {
//       const result = await api.post(
//         "/auth/signin",
//         {
//           identifier: fullEmail,
//           password: form.password,
//         },
//         { withCredentials: true } // ✅ FIX: Send cookies
//       );

//       if (result.data.mfaRequired) {
//         setEmailForOTP(result.data.email);
//         setStage(2);
//         setTimer(30);
//         toast.success("OTP sent to your email!");
//       } else {
//         completeLogin(result.data);
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyOTP = async (e) => {
//     e.preventDefault();
//     if (!otp) return setError("Please enter the OTP.");

//     setLoading(true);
//     try {
//       const result = await api.post(
//         "/auth/verify-login-otp",
//         {
//           email: emailForOTP,
//           code: otp,
//         },
//         { withCredentials: true } // ✅ FIX: Send cookies
//       );
//       completeLogin(result.data);
//     } catch (err) {
//       setError(err.response?.data?.message || "Invalid or expired OTP.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const completeLogin = (userData) => {
//     localStorage.setItem("user", JSON.stringify(userData));
//     dispatch(setUserData(userData));
//     toast.success("Welcome back!");
//     navigate("/dashboard");
//   };

//   const resendOTP = async () => {
//     if (timer > 0) return;
//     try {
//       const fullEmail = emailPrefix + emailDomain;
//       await api.post(
//         "/auth/signin",
//         {
//           identifier: fullEmail,
//           password: form.password,
//         },
//         { withCredentials: true } // ✅ FIX
//       );
//       setTimer(30);
//       toast.success("New OTP sent!");
//     } catch (err) {
//       toast.error("Failed to resend OTP");
//     }
//   };

//   const handlePasswordChange = (e) => {
//     setForm({ ...form, password: e.target.value });
//     if (error) setError("");
//   };

//   // ------------------- JSX -------------------
//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <div style={styles.header}>
//           <h2 style={styles.title}>InventoryHub</h2>
//           <p style={styles.subtitle}>
//             {stage === 1
//               ? "Sign in to your account"
//               : `Enter 6-digit code sent to ${emailForOTP}`}
//           </p>
//         </div>

//         {error && <p style={styles.errorMessage}>⚠️ {error}</p>}

//         {stage === 1 ? (
//           <form onSubmit={handleLogin} style={styles.form}>
//             <div style={styles.inputGroup}>
//               <label style={styles.label}>Email</label>
//               <div style={styles.emailWrapper}>
//                 <input
//                   type="text"
//                   placeholder="example:name"
//                   value={emailPrefix}
//                   onChange={(e) => setEmailPrefix(e.target.value.toLowerCase())}
//                   required
//                   style={styles.emailPrefix}
//                 />
//                 <select
//                   value={emailDomain}
//                   onChange={(e) => setEmailDomain(e.target.value)}
//                   style={styles.emailDomain}
//                 >
//                   <option value="@oriviyan.com">@oriviyan.com</option>
//                   <option value="@mattrade.in">@mattrade.in</option>
//                 </select>
//               </div>
//             </div>

//             <div style={styles.inputGroup}>
//               <label style={styles.label}>Password</label>
//               <div style={styles.passwordWrapper}>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   required
//                   placeholder="Enter your password"
//                   style={styles.input}
//                   value={form.password}
//                   onChange={handlePasswordChange}
//                 />
//                 <span
//                   onClick={() => setShowPassword(!showPassword)}
//                   style={styles.eyeIcon}
//                 >
//                   {showPassword ? "👁️" : "🙈"}
//                 </span>
//               </div>
//             </div>

//             <div style={styles.forgotPassContainer}>
//               <span onClick={() => navigate("/forgot-password")} style={styles.link}>
//                 Forgot Password?
//               </span>
//             </div>

//             <button type="submit" disabled={loading} style={styles.button}>
//               {loading ? "..." : "Continue"}
//             </button>
//           </form>
//         ) : (
//           <form onSubmit={handleVerifyOTP} style={styles.form}>
//             <div style={styles.inputGroup}>
//               <label style={styles.label}>Verification Code</label>
//               <input
//                 type="text"
//                 maxLength="6"
//                 required
//                 placeholder="000000"
//                 style={{ ...styles.input, textAlign: "center", fontSize: "20px" }}
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//               />
//             </div>

//             <button type="submit" disabled={loading} style={styles.button}>
//               Secure Login
//             </button>

//             <div style={styles.resendContainer}>
//               {timer > 0 ? (
//                 <p>Resend code in {timer}s</p>
//               ) : (
//                 <p onClick={resendOTP} style={styles.link}>Resend Code</p>
//               )}
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// }

// // ------------------ STYLES -------------------
// // const styles = { /* same as before */ emailWrapper: {...}, emailPrefix: {...}, emailDomain: {...}, ... };

// const styles = {
//   container: {
//     minHeight: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     background: "#ffffff",
//     fontFamily: "'Segoe UI', sans-serif"
//   },

//   card: {
//     width: "100%",
//     maxWidth: "420px",
//     backgroundColor: "#ffffff",
//     borderRadius: "14px",
//     padding: "40px 35px",
//     boxShadow: "0 20px 50px rgba(0,0,0,0.15)"
//   },

//   header: {
//     textAlign: "center",
//     marginBottom: "30px"
//   },

//   title: {
//     fontSize: "28px",
//     fontWeight: "800",
//     color: "#1e3a8a",
//     marginBottom: "6px"
//   },

//   subtitle: {
//     fontSize: "14px",
//     color: "#6b7280"
//   },

//   form: {
//     display: "flex",
//     flexDirection: "column"
//   },

//   inputGroup: {
//     width:"400px",
//     marginBottom: "18px"
//   },

//   label: {
//     fontSize: "13px",
//     fontWeight: "600",
//     color: "#374151",
//     marginBottom: "6px",
//     display: "block"
//   },

//   input: {
//     width: "100%",
//     padding: "13px 14px",
//     borderRadius: "8px",
//     border: "1px solid #d1d5db",
//     fontSize: "14px",
//     backgroundColor: "#f9fafb",
//     outline: "none"
//   },

//   passwordWrapper: {
//     position: "relative"
//   },

//   eyeIcon: {
//     position: "absolute",
//     right: "14px",
//     top: "12px",
//     cursor: "pointer",
//     fontSize: "18px",
//     opacity: 0.6
//   },

//   errorMessage: {
//     backgroundColor: "#fee2e2",
//     color: "#b91c1c",
//     fontSize: "13px",
//     padding: "10px",
//     borderRadius: "8px",
//     textAlign: "center",
//     marginBottom: "15px"
//   },

//   forgotPassContainer: {
//     textAlign: "right",
//     marginBottom: "18px"
//   },

//   link: {
//     fontSize: "13px",
//     fontWeight: "600",
//     color: "#2563eb",
//     cursor: "pointer"
//   },

//   button: {
//     width: "100%",
//     padding: "14px",
//     background: "linear-gradient(135deg, #2563eb, #1e3a8a)",
//     color: "#ffffff",
//     border: "none",
//     borderRadius: "10px",
//     fontSize: "15px",
//     fontWeight: "700",
//     cursor: "pointer",
//     transition: "0.3s",
//     boxShadow: "0 10px 20px rgba(37,99,235,0.3)"
//   },

//   buttonDisabled: {
//     width: "100%",
//     padding: "14px",
//     backgroundColor: "#93c5fd",
//     color: "#ffffff",
//     border: "none",
//     borderRadius: "10px",
//     cursor: "not-allowed"
//   },

//   resendContainer: {
//     textAlign: "center",
//     marginTop: "16px"
//   },

//   timerText: {
//     fontSize: "13px",
//     color: "#9ca3af"
//   },

//   resendLink: {
//     fontSize: "13px",
//     color: "#2563eb",
//     fontWeight: "700",
//     cursor: "pointer"
//   },

//   linkText: {
//     textAlign: "center",
//     marginTop: "16px",
//     fontSize: "13px",
//     color: "#6b7280",
//     cursor: "pointer",
//     textDecoration: "underline"
//   },

//   // 🔥 Email field styling
//   emailWrapper: {
//     display: "flex",
//     border: "1px solid #d1d5db",
//     borderRadius: "8px",
//     overflow: "hidden",
//     backgroundColor: "#f9fafb"
//   },

//   emailPrefix: {
//     flex: 1,
//     padding: "13px 14px",
//     border: "none",
//     outline: "none",
//     backgroundColor: "transparent",
//     fontSize: "14px"
//   },

//   emailDomain: {
//     border: "none",
//     backgroundColor: "#e5e7eb",
//     padding: "0 14px",
//     fontSize: "14px",
//     fontWeight: "700",
//     cursor: "pointer",
//     outline: "none"
//   }
// };




















import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [stage, setStage] = useState(1);
  const [form, setForm] = useState({ password: "" });
  const [emailPrefix, setEmailPrefix] = useState("");
  const [emailDomain, setEmailDomain] = useState("@oriviyan.com");
  const [otp, setOtp] = useState("");
  const [emailForOTP, setEmailForOTP] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    let interval;
    if (stage === 2 && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [stage, timer]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const fullEmail = emailPrefix + emailDomain;
    setLoading(true);
    setError("");
    try {
      const result = await api.post("/auth/signin", {
        identifier: fullEmail,
        password: form.password,
      });
      if (result.data.mfaRequired) {
        setEmailForOTP(result.data.email);
        setStage(2);
        setTimer(30);
        toast.success("OTP sent to your email!");
      } else {
        completeLogin(result.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!otp) return setError("Please enter the OTP.");
    setLoading(true);
    try {
      const result = await api.post("/auth/verify-login-otp", {
        email: emailForOTP,
        code: otp,
      });
      completeLogin(result.data);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired OTP.");
    } finally {
      setLoading(false);
    }
  };

  const completeLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    dispatch(setUserData(userData));
    toast.success("Welcome back!");
    navigate("/dashboard");
  };

  const resendOTP = async () => {
    if (timer > 0) return;
    try {
      const fullEmail = emailPrefix + emailDomain;
      await api.post("/auth/signin", {
        identifier: fullEmail,
        password: form.password,
      });
      setTimer(30);
      toast.success("New OTP sent!");
    } catch (err) {
      toast.error("Failed to resend OTP");
    }
  };

  const handlePasswordChange = (e) => {
    setForm({ ...form, password: e.target.value });
    if (error) setError("");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>InventoryHub</h2>
          <p style={styles.subtitle}>
            {stage === 1
              ? "Sign in to your account"
              : `Enter 6-digit code sent to ${emailForOTP}`}
          </p>
        </div>

        {error && <p style={styles.errorMessage}>⚠️ {error}</p>}

        {stage === 1 ? (
          <form onSubmit={handleLogin} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <div style={styles.emailWrapper}>
                <input
                  type="text"
                  placeholder="username"
                  value={emailPrefix}
                  onChange={(e) => setEmailPrefix(e.target.value.toLowerCase())}
                  required
                  style={styles.emailPrefix}
                />
                <select
                  value={emailDomain}
                  onChange={(e) => setEmailDomain(e.target.value)}
                  style={styles.emailDomain}
                >
                  <option value="@oriviyan.com">@oriviyan.com</option>
                  <option value="@mattrade.in">@mattrade.in</option>
                </select>
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <div style={styles.passwordWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  style={styles.input}
                  value={form.password}
                  onChange={handlePasswordChange}
                />
                <span onClick={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                  {showPassword ? "👁️" : "🙈"}
                </span>
              </div>
            </div>

            <div style={styles.forgotPassContainer}>
              <span onClick={() => navigate("/forgot-password")} style={styles.link}>
                Forgot Password?
              </span>
            </div>

            <button type="submit" disabled={loading} style={loading ? styles.buttonDisabled : styles.button}>
              {loading ? "Signing in..." : "Continue"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Verification Code</label>
              <input
                type="text"
                maxLength="6"
                required
                placeholder="000000"
                style={{ ...styles.input, textAlign: "center", fontSize: "20px", letterSpacing: "4px" }}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>

            <button type="submit" disabled={loading} style={loading ? styles.buttonDisabled : styles.button}>
              {loading ? "Verifying..." : "Secure Login"}
            </button>

            <div style={styles.resendContainer}>
              {timer > 0 ? (
                <p style={styles.timerText}>Resend code in {timer}s</p>
              ) : (
                <p onClick={resendOTP} style={styles.link}>Resend Code</p>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f3f4f6", // Subtle gray background
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    padding: "20px"
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "40px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    boxSizing: "border-box"
  },
  header: { textAlign: "center", marginBottom: "30px" },
  title: { fontSize: "26px", fontWeight: "800", color: "#1e3a8a", marginBottom: "8px", margin: 0 },
  subtitle: { fontSize: "14px", color: "#6b7280", margin: 0 },
  form: { display: "flex", flexDirection: "column" },
  inputGroup: { width: "100%", marginBottom: "20px" },
  label: { fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "8px", display: "block" },
  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "15px",
    backgroundColor: "#fff",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s"
  },
  emailWrapper: {
    display: "flex",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: "#fff"
  },
  emailPrefix: {
    flex: 1,
    padding: "12px 14px",
    border: "none",
    outline: "none",
    fontSize: "15px",
    width: "100%"
  },
  emailDomain: {
    border: "none",
    borderLeft: "1px solid #d1d5db",
    backgroundColor: "#f3f4f6",
    padding: "0 10px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#4b5563",
    cursor: "pointer",
    outline: "none"
  },
  passwordWrapper: { position: "relative" },
  eyeIcon: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    fontSize: "18px",
    opacity: 0.5
  },
  errorMessage: {
    backgroundColor: "#fee2e2",
    color: "#b91c1c",
    fontSize: "13px",
    padding: "12px",
    borderRadius: "8px",
    textAlign: "center",
    marginBottom: "20px",
    border: "1px solid #fecaca"
  },
  forgotPassContainer: { textAlign: "right", marginBottom: "20px" },
  link: { fontSize: "13px", fontWeight: "600", color: "#2563eb", cursor: "pointer", textDecoration: "none" },
  button: {
    width: "100%",
    padding: "14px",
    background: "#1e3a8a",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  buttonDisabled: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#93c5fd",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    cursor: "not-allowed"
  },
  resendContainer: { textAlign: "center", marginTop: "20px" },
  timerText: { fontSize: "13px", color: "#9ca3af" }
};

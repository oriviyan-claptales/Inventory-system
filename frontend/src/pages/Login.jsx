// import { useState } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setUserData } from "../redux/userSlice";

// export default function Login() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // State: 'email' ko badal kar 'identifier' kar diya
//   const [form, setForm] = useState({ identifier: "", password: "" });
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(""); 

//   const login = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(""); 
    
//     try {
//       // Backend ko 'identifier' aur 'password' bhej rahe hain
//       const result = await api.post("/auth/signin", form);
      
//       localStorage.setItem("user", JSON.stringify(result.data));
//       dispatch(setUserData(result.data));
//       navigate("/dashboard");
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed. Please check credentials.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     if (error) setError(""); 
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <div style={styles.header}>
//           <h2 style={styles.title}>Inventory Management</h2>
//           <p style={styles.subtitle}>Login with your Email or Username</p>
//         </div>

//         <form onSubmit={login} style={styles.form}>
          
//           <div style={styles.inputGroup}>
//             <label style={styles.label}>Email or Username</label>
//             <input
//               type="text" // 'email' se 'text' kar diya taaki username bhi allow ho
//               name="identifier"
//               required
//               placeholder="Enter email or username"
//               style={error ? styles.inputError : styles.input}
//               value={form.identifier}
//               onChange={handleChange}
//             />
//           </div>

//           <div style={styles.inputGroup}>
//             <label style={styles.label}>Password</label>
//             <div style={styles.passwordWrapper}>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 required
//                 placeholder="Enter your password"
//                 style={error ? styles.inputError : styles.input}
//                 value={form.password}
//                 onChange={handleChange}
//               />
//               <span 
//                 onClick={() => setShowPassword(!showPassword)} 
//                 style={styles.eyeIcon}
//               >
//                 {showPassword ? "👁️" : "🙈"} 
//               </span>
//             </div>
//             {error && <p style={styles.errorMessage}>⚠️ {error}</p>}
//           </div>

//           <div style={styles.forgotPassContainer}>
//             <span onClick={() => navigate("/forgot-password")} style={styles.link}>
//               Forgot Password?
//             </span>
//           </div>

//           <button type="submit" disabled={loading} style={loading ? styles.buttonDisabled : styles.button}>
//             {loading ? "Signing in..." : "Sign In"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// // ... Styles (Same as before)
// const styles = {
//   container: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f3f4f6", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" },
//   card: { backgroundColor: "#ffffff", width: "100%", maxWidth: "400px", padding: "40px", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)" },
//   header: { textAlign: "center", marginBottom: "30px" },
//   title: { fontSize: "26px", fontWeight: "700", color: "#1a1a1a", marginBottom: "8px" },
//   subtitle: { fontSize: "14px", color: "#6b7280", margin: 0 },
//   form: { display: "flex", flexDirection: "column" },
//   inputGroup: { marginBottom: "20px" },
//   label: { display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "8px" },
//   input: { width: "100%", padding: "12px 15px", fontSize: "15px", borderRadius: "6px", border: "1px solid #d1d5db", outline: "none", transition: "border-color 0.2s", boxSizing: "border-box" },
//   inputError: { width: "100%", padding: "12px 15px", fontSize: "15px", borderRadius: "6px", border: "1px solid #dc2626", outline: "none", transition: "border-color 0.2s", boxSizing: "border-box", backgroundColor: "#fef2f2" },
//   passwordWrapper: { position: "relative", display: "flex", alignItems: "center" },
//   eyeIcon: { position: "absolute", right: "15px", cursor: "pointer", fontSize: "18px", userSelect: "none", background: "transparent" },
//   errorMessage: { color: "#dc2626", fontSize: "13px", marginTop: "5px", fontWeight: "500", display: "flex", alignItems: "center", gap: "5px" },
//   forgotPassContainer: { textAlign: "right", marginBottom: "20px" },
//   link: { fontSize: "13px", color: "#1976D2", cursor: "pointer", textDecoration: "none" },
//   button: { width: "100%", padding: "14px", backgroundColor: "#1976D2", color: "#fff", border: "none", borderRadius: "6px", fontSize: "16px", fontWeight: "600", cursor: "pointer", transition: "background-color 0.2s" },
//   buttonDisabled: { width: "100%", padding: "14px", backgroundColor: "#93c5fd", color: "#fff", border: "none", borderRadius: "6px", cursor: "not-allowed" },
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

  // --- STATES ---
  const [stage, setStage] = useState(1); // 1: Credentials, 2: OTP
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [otp, setOtp] = useState("");
  const [emailForOTP, setEmailForOTP] = useState(""); // OTP verify ke liye zaroori hai
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(30);

  // Timer Logic for Resend OTP
  useEffect(() => {
    let interval;
    if (stage === 2 && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [stage, timer]);

  // --- STAGE 1: SIGN IN (Check Credentials) ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await api.post("/auth/signin", form);

      // Agar Backend se mfaRequired aaya hai
      if (result.data.mfaRequired) {
        setEmailForOTP(result.data.email);
        setStage(2);
        setTimer(30);
        toast.success("OTP sent to your email!");
      } else {
        // Fallback: Agar kisi user ka 2FA off ho (Optional logic)
        completeLogin(result.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Check credentials.");
    } finally {
      setLoading(false);
    }
  };

  // --- STAGE 2: VERIFY OTP ---
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!otp) return setError("Please enter the OTP.");
    setLoading(true);

    try {
      const result = await api.post("/auth/verify-login-otp", { 
        email: emailForOTP, 
        code: otp 
      });

      completeLogin(result.data);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired OTP.");
    } finally {
      setLoading(false);
    }
  };

  // Final Success Login Helper
  const completeLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    dispatch(setUserData(userData));
    toast.success("Welcome back!");
    navigate("/dashboard");
  };

  const resendOTP = async () => {
    if (timer > 0) return;
    try {
      await api.post("/auth/signin", form); // Dobara signin call karke OTP bhej do
      setTimer(30);
      toast.success("New OTP sent!");
    } catch (err) {
      toast.error("Failed to resend OTP");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>InventoryHub</h2>
          <p style={styles.subtitle}>
            {stage === 1 ? "Sign in to your account" : `Enter 6-digit code sent to ${emailForOTP}`}
          </p>
        </div>

        {error && <p style={styles.errorMessage}>⚠️ {error}</p>}

        {stage === 1 ? (
          /* --- CREDENTIALS FORM --- */
          <form onSubmit={handleLogin} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email or Username</label>
              <input
                type="text"
                name="identifier"
                required
                placeholder="Enter email or username"
                style={styles.input}
                value={form.identifier}
                onChange={handleChange}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <div style={styles.passwordWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="Enter your password"
                  style={styles.input}
                  value={form.password}
                  onChange={handleChange}
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
              {loading ? "Checking..." : "Continue"}
            </button>
          </form>
        ) : (
          /* --- OTP VERIFICATION FORM --- */
          <form onSubmit={handleVerifyOTP} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Verification Code</label>
              <input
                type="text"
                maxLength="6"
                required
                placeholder="000000"
                style={{ ...styles.input, textAlign: "center", fontSize: "20px", letterSpacing: "8px" }}
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
                <p onClick={resendOTP} style={styles.resendLink}>Resend Code</p>
              )}
            </div>

            <p style={styles.linkText} onClick={() => { setStage(1); setError(""); }}>
               Back to Login
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

// ... Styles (Same as before, added a few)
const styles = {
  container: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f3f4f6", fontFamily: "'Segoe UI', sans-serif" },
  card: { backgroundColor: "#ffffff", width: "100%", maxWidth: "400px", padding: "40px", borderRadius: "12px", boxShadow: "0 10px 25px rgba(0,0,0,0.05)", border: "1px solid #e5e7eb" },
  header: { textAlign: "center", marginBottom: "30px" },
  title: { fontSize: "26px", fontWeight: "700", color: "#1a1a1a", marginBottom: "8px" },
  subtitle: { fontSize: "14px", color: "#6b7280", margin: 0 },
  form: { display: "flex", flexDirection: "column" },
  inputGroup: { marginBottom: "20px" },
  label: { display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "8px" },
  input: { width: "100%", padding: "12px 15px", fontSize: "15px", borderRadius: "6px", border: "1px solid #d1d5db", outline: "none", boxSizing: "border-box" },
  passwordWrapper: { position: "relative", display: "flex", alignItems: "center" },
  eyeIcon: { position: "absolute", right: "15px", cursor: "pointer", fontSize: "18px" },
  errorMessage: { color: "#dc2626", fontSize: "13px", marginBottom: "15px", textAlign: "center", backgroundColor: "#fef2f2", padding: "8px", borderRadius: "4px" },
  forgotPassContainer: { textAlign: "right", marginBottom: "20px" },
  link: { fontSize: "13px", color: "#1976D2", cursor: "pointer" },
  button: { width: "100%", padding: "14px", backgroundColor: "#1976D2", color: "#fff", border: "none", borderRadius: "6px", fontSize: "16px", fontWeight: "600", cursor: "pointer" },
  buttonDisabled: { width: "100%", padding: "14px", backgroundColor: "#93c5fd", color: "#fff", border: "none", borderRadius: "6px", cursor: "not-allowed" },
  resendContainer: { textAlign: "center", marginTop: "15px" },
  timerText: { fontSize: "13px", color: "#9ca3af" },
  resendLink: { fontSize: "13px", color: "#1976D2", cursor: "pointer", fontWeight: "bold" },
  linkText: { textAlign: "center", marginTop: "15px", fontSize: "13px", color: "#6b7280", cursor: "pointer", textDecoration: "underline" }
};
import User from "../models/User.js";
import genToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import { logActivity } from "../utils/logger.js";
import Log from "../models/Log.js";
import sendEmail from "../utils/sendEmail.js";



// Check Auth (Protected)
// export const checkAuth = (req, res) => {
//   res.status(200).json({ success: true, userId: req.user });
// };
export const checkAuth = (req, res) => {
  // isAuth ne req.user me database se pura user (without password) daal diya hai
  res.status(200).json(req.user); 
};

export const signIn = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // 1. User dhundo (Email ya Username)
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }]
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    // 2. Pehle check karo account frozen toh nahi hai
    if (user.isFrozen) {
      return res.status(403).json({ 
        message: "Account is Frozen contact Admin " 
      });
    }

    // 3. Password Check karo
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      // ❌ WRONG PASSWORD LOGIC
      user.failedLoginAttempts += 1;

      if (user.failedLoginAttempts >= 5) {
        user.isFrozen = true;
        await user.save();
        
        // Log the freeze event
        await logActivity(req, "USER_FREEZE", `Account frozen: ${user.email} (5 failed attempts)`, user);
        
        return res.status(403).json({ 
          message: "Too many attempts. Your account has been FROZEN." 
        });
      }

      await user.save();
      return res.status(400).json({ 
        message: `Invalid Password. ${5 - user.failedLoginAttempts} attempts left.` 
      });
    }

    // ✅ SAHI PASSWORD LOGIC (2FA Trigger)
    // Sahi password par attempts reset kar do
    user.failedLoginAttempts = 0;
    
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.loginCode = otp;
    user.loginCodeExpire = Date.now() + 5 * 60 * 1000; // 5 min
    await user.save();

    // OTP Email bhejo
    await sendEmail({
      to: user.email,
      subject: "Login Verification Code",
      html: `<h2>Your Login OTP is ${otp}</h2><p>Security Alert: Your password was correct. Use this code to finish login.</p>`,
    });

    res.status(200).json({ 
      mfaRequired: true, 
      email: user.email, 
      message: "Password correct! Please enter the OTP sent to your email." 
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// --- 2. VERIFY LOGIN OTP (Stage 2: Final Login) ---
export const verifyLoginOTP = async (req, res) => {
  try {
    const { email, code } = req.body;

    const user = await User.findOne({
      email,
      loginCode: code,
      loginCodeExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // ✅ OTP SAHI HAI -> Ab final Login karo (Token & Cookie)
    user.loginCode = undefined;
    user.loginCodeExpire = undefined;
    user.failedLoginAttempts = 0;
    await user.save();

    const token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const { password: userPass, ...userDetails } = user._doc;
    
    // Log Activity
    await logActivity(req, "LOGIN_SUCCESS", `Logged in with 2FA: ${user.email}`, user);

    res.status(200).json(userDetails);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 1️⃣ Helper function for allowed domains
const isCompanyEmail = (email) => {
  const allowedDomains = ["oriviyan.com", "mattrade.in"];
  const domain = email.split("@")[1]?.toLowerCase();
  return allowedDomains.includes(domain);
};

// 2️⃣ Controller me check add karo
// export const createUser = async (req, res) => {
//   try {
//     const { name, email, password, userType, username } = req.body;

//     if (!name || !email || !password || !userType) {
//       return res.status(400).json({ message: "All fields are required (including Username)" });
//     }

//     // 🔴 NEW: Domain validation
//     if (!isCompanyEmail(email)) {
//       return res.status(400).json({ message: "Only @oriviyan.com or @mattrade.in emails are allowed" });
//     }

//     const userExists = await User.findOne({
//       $or: [{ email: email }, { username: username }]
//     });

//     if (userExists) {
//       return res.status(400).json({ message: "User with this Email or Username already exists" });
//     }

//     if (password.length < 6) {
//       return res.status(400).json({ message: "Password must be at least 6 characters" });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const user = await User.create({
//       username,
//       name,
//       email,
//       password: hashedPassword,
//       userType,
//     });

//     await logActivity(req, "CREATE_USER", `Created user: ${username} (${userType})`);
//     // 📧 Send account created email
// const loginUrl = "https://inventory-system-f.onrender.com/"; // apna frontend URL

// await sendEmail({
//   to: email,
//   subject: "Your Oriviyan Inventory Account is Ready",
//   html: `
//     <div style="font-family: Arial, sans-serif; line-height:1.6">
//       <h2>Welcome to Oriviyan Inventory System</h2>

//       <p>Hello <b>${name}</b>,</p>

//       <p>Your account has been successfully created by the admin.</p>

//       <p>You can login using the link below:</p>

//       <p>
//         <a href="${loginUrl}" style="background:#2563eb;color:white;padding:10px 18px;text-decoration:none;border-radius:6px;">
//           Login to Inventory
//         </a>
//       </p>

//       <p><b>Email:</b> ${email}</p>
//       <p><b>Password:</b> ${password}</p>

//       <p style="color:red">
//         Please change your password after first login.
//       </p>

//       <br/>
//       <p>— Oriviyan IT Team</p>
//     </div>
//   `
// });


//     return res.status(201).json({
//       success: true,
//       message: "User created successfully",
//       user,
//     });

//   } catch (error) {
//     console.error("Create User Error:", error);
//     if (error.code === 11000) {
//       return res.status(400).json({ message: "Username or Email already exists" });
//     }
//     return res.status(500).json({ message: `Create user error: ${error.message}` });
//   }
// };
export const createUser = async (req, res) => {
  try {
    const { name, email, password, userType, tcodes } = req.body;

    if (!name || !email || !password || !userType) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!isCompanyEmail(email)) {
      return res.status(400).json({ message: "Only @oriviyan.com or @mattrade.in emails are allowed" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User with this Email already exists" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      userType,
      tcodes: tcodes || [], 
    });

    await logActivity(req, "CREATE_USER", `Created user: ${email} (${userType})`);
    
    const loginUrl = "https://inventory-system-f.onrender.com/";

    // --- 🔑 Permissions (TCodes) List taiyar karna ---
    // Agar admin hai toh "Full Access", warna list dikhao
    const permissionsList = userType === 'admin' 
      ? "<li><b>Full System Access (Administrator)</b></li>"
      : (tcodes && tcodes.length > 0) 
        ? tcodes.map(code => `<li>${code.replace('_', ' ')}</li>`).join('')
        : "<li>View Only Access</li>";

    await sendEmail({
      to: email,
      subject: "Your Oriviyan Inventory Account is Ready",
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background-color: #ffffff;">
          <div style="background-color: #1e293b; padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">Oriviyan Inventory Hub</h1>
          </div>

          <div style="padding: 30px; line-height: 1.6; color: #334155;">
            <h2 style="color: #1e293b; margin-top: 0;">Welcome, ${name}!</h2>
            <p>Your professional account has been successfully created by the administrator. Below are your secure login credentials:</p>
            
            <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
              <p style="margin: 0 0 10px 0;"><strong>Email:</strong> <span style="color: #2563eb;">${email}</span></p>
              <p style="margin: 0;"><strong>Password:</strong> <span style="color: #2563eb;">${password}</span></p>
            </div>

            <h3 style="color: #1e293b; font-size: 16px; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">Your Assigned Permissions:</h3>
            <ul style="padding-left: 20px; color: #475569; font-size: 14px;">
              ${permissionsList}
            </ul>

            <div style="text-align: center; margin-top: 35px; margin-bottom: 35px;">
              <a href="${loginUrl}" style="background-color: #2563eb; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Login to Your Dashboard</a>
            </div>

            <p style="font-size: 13px; color: #ef4444; background-color: #fef2f2; padding: 10px; border-radius: 6px; border: 1px solid #fee2e2;">
              <strong>Security Alert:</strong> For your protection, please change your password immediately after your first login.
            </p>
          </div>

          <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8;">
            <p style="margin: 0;">&copy; 2026 Oriviyan IT Team. All rights reserved.</p>
            <p style="margin: 5px 0 0 0;">This is an automated system email. Please do not reply.</p>
          </div>
        </div>
      `
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });

  } catch (error) {
    console.error("Create User Error:", error);
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    return res.status(500).json({ message: `Create user error: ${error.message}` });
  }
};

// Signout
export const signOut = async (req, res) => {
  try {
    // 🛑 STEP 1: LOGOUT LOG (Cookie clear karne se pehle)
    // Hum check karenge ki kya user login tha? (req.user middleware se aayega)
    if (req.user) {
      try {
        await logActivity(
            req, 
            "LOGOUT", 
            `User Logged Out: ${req.user.name || req.user.username}`
        );
      } catch (logError) {
        console.log("⚠️ Logout log failed, but proceeding to clear cookie.");
      }
    } else {
        console.log("⚠️ Logout called without valid user session (req.user missing)");
    }

    // 🛑 STEP 2: Clear Cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Production me true
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `signOut error ${error.message}`,
    });
  }
};
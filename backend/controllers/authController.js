// // import User from "../models/User.js";
// // import genToken from "../utils/generateToken.js";
// // import bcrypt from "bcryptjs";
// // import { logActivity } from "../utils/logger.js";
// // import Log from "../models/Log.js";
// // import sendEmail from "../utils/sendEmail.js";



// // // Check Auth (Protected)
// // export const checkAuth = (req, res) => {
// //   res.status(200).json({ success: true, userId: req.user });
// // };

// // // import LoginHistory from "../models/LoginHistory.js";

// // // ... tumhara existing login code ...

// // // Jab user successfully login ho jaye (password check ke baad):
// // // if (isMatch) {
// // //   // === YE CODE ADD KARO ===
// // //   await Log.create({
// // //     userId: user._id,
// // //     username: user.name, // Agar user model me name hai to
// // //     email: user.email,
// // //     action: "LOGIN",
// // //     ipAddress: req.ip, // IP address store karne ke liye
// // //     device: req.headers["user-agent"], // Browser details ke liye
// // //   });
// // //   // ========================

// // //   // Uske baad token return karo jo pehle kar rahe the
// // //   res.json({ token, user });
// // // }




// // // authController.js

// // // --- 1. SIGN IN (Stage 1: Check Password & Send OTP) ---


// // // export const signIn = async (req, res) => {
// // //   try {
// // //     const { identifier, password } = req.body;

// // //     const user = await User.findOne({
// // //       $or: [{ email: identifier }, { username: identifier }]
// // //     });

// // //     if (!user) return res.status(400).json({ message: "Invalid Credentials" });
// // //     if (user.isFrozen) return res.status(403).json({ message: "Account Frozen!" });

// // //     const isMatch = await bcrypt.compare(password, user.password);
// // //     if (!isMatch) {
// // //       // (Attempts wala logic yahan rehne dena...)
// // //       return res.status(400).json({ message: "Invalid Password" });
// // //     }

// // //     // ✅ PASSWORD SAHI HAI -> Ab OTP bhejo (Login mat karo abhi)
// // //     const otp = Math.floor(100000 + Math.random() * 900000).toString();
// // //     user.loginCode = otp;
// // //     user.loginCodeExpire = Date.now() + 5 * 60 * 1000; // 5 min valid
// // //     await user.save();

// // //     await sendEmail({
// // //       to: user.email,
// // //       subject: "Login Verification Code",
// // //       html: `<h2>Your Login OTP is ${otp}</h2><p>Security Alert: Do not share this code.</p>`,
// // //     });

// // //     // Frontend ko batao ki password sahi hai, ab OTP stage pe jao
// // //     res.status(200).json({ 
// // //       mfaRequired: true, 
// // //       email: user.email, 
// // //       message: "Please enter the OTP sent to your email" 
// // //     });

// // //   } catch (error) {
// // //     res.status(500).json({ message: error.message });
// // //   }
// // // };
// // export const signIn = async (req, res) => {
// //   try {
// //     const { identifier, password } = req.body;

// //     // 1. User dhundo (Email ya Username)
// //     const user = await User.findOne({
// //       $or: [{ email: identifier }, { username: identifier }]
// //     });

// //     if (!user) return res.status(404).json({ message: "User not found" });

// //     // 2. Pehle check karo account frozen toh nahi hai
// //     if (user.isFrozen) {
// //       return res.status(403).json({ 
// //         message: "Account is Frozen contact Admin " 
// //       });
// //     }

// //     // 3. Password Check karo
// //     const isMatch = await bcrypt.compare(password, user.password);

// //     if (!isMatch) {
// //       // ❌ WRONG PASSWORD LOGIC
// //       user.failedLoginAttempts += 1;

// //       if (user.failedLoginAttempts >= 5) {
// //         user.isFrozen = true;
// //         await user.save();
        
// //         // Log the freeze event
// //         await logActivity(req, "USER_FREEZE", `Account frozen: ${user.email} (5 failed attempts)`, user);
        
// //         return res.status(403).json({ 
// //           message: "Too many attempts. Your account has been FROZEN." 
// //         });
// //       }

// //       await user.save();
// //       return res.status(400).json({ 
// //         message: `Invalid Password. ${5 - user.failedLoginAttempts} attempts left.` 
// //       });
// //     }

// //     // ✅ SAHI PASSWORD LOGIC (2FA Trigger)
// //     // Sahi password par attempts reset kar do
// //     user.failedLoginAttempts = 0;
    
// //     const otp = Math.floor(100000 + Math.random() * 900000).toString();
// //     user.loginCode = otp;
// //     user.loginCodeExpire = Date.now() + 5 * 60 * 1000; // 5 min
// //     await user.save();

// //     // OTP Email bhejo
// //     await sendEmail({
// //       to: user.email,
// //       subject: "Login Verification Code",
// //       html: `<h2>Your Login OTP is ${otp}</h2><p>Security Alert: Your password was correct. Use this code to finish login.</p>`,
// //     });

// //     res.status(200).json({ 
// //       mfaRequired: true, 
// //       email: user.email, 
// //       message: "Password correct! Please enter the OTP sent to your email." 
// //     });

// //   } catch (error) {
// //     console.error("Login Error:", error);
// //     res.status(500).json({ message: "Server Error" });
// //   }
// // };

// // // --- 2. VERIFY LOGIN OTP (Stage 2: Final Login) ---
// // export const verifyLoginOTP = async (req, res) => {
// //   try {
// //     const { email, code } = req.body;

// //     const user = await User.findOne({
// //       email,
// //       loginCode: code,
// //       loginCodeExpire: { $gt: Date.now() },
// //     });

// //     if (!user) {
// //       return res.status(400).json({ message: "Invalid or expired OTP" });
// //     }

// //     // ✅ OTP SAHI HAI -> Ab final Login karo (Token & Cookie)
// //     user.loginCode = undefined;
// //     user.loginCodeExpire = undefined;
// //     user.failedLoginAttempts = 0;
// //     await user.save();

// //     const token = await genToken(user._id);
// //     res.cookie("token", token, {
// //       httpOnly: true,
// //       secure: process.env.NODE_ENV === "production",
// //       sameSite: "none",
// //       maxAge: 7 * 24 * 60 * 60 * 1000,
// //     });

// //     // const token = await genToken(user._id);
// //     // res.cookie("token", token, {
// //     //   httpOnly: true,
// //     //   secure: true,
// //     //   sameSite: "none",
// //     //   maxAge: 7 * 24 * 60 * 60 * 1000,
// //     // });

// //     const { password: userPass, ...userDetails } = user._doc;
    
// //     // Log Activity
// //     await logActivity(req, "LOGIN_SUCCESS", `Logged in with 2FA: ${user.email}`, user);

// //     res.status(200).json(userDetails);

// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// // // export const signIn = async (req, res) => {
// // //   try {
// // //     const { identifier, password } = req.body;

// // //     if (!identifier || !password) {
// // //       return res.status(400).json({ message: "All fields are required" });
// // //     }

// // //     // 1. User dhundho
// // //     const user = await User.findOne({
// // //       $or: [{ email: identifier }, { username: identifier }]
// // //     });

// // //     if (!user) {
// // //       // Security: User nahi mila to bhi Generic error do
// // //       return res.status(400).json({ message: "Invalid Credentials" });
// // //     }

// // //     // 🛑 2. Check karo agar Account Frozen hai
// // //     if (user.isFrozen) {
// // //       return res.status(403).json({
// // //         message: "Account is Frozen due to multiple failed attempts. Contact Admin."
// // //       });
// // //     }

// // //     // 3. Password Check karo
// // //     const isMatch = await bcrypt.compare(password, user.password);

// // //     if (!isMatch) {
// // //       // ❌ Password Galat hai -> Count Badhao
// // //       user.failedLoginAttempts += 1;

// // //       // Agar 5 ya usse zyada attempts ho gaye to Freeze kar do
// // //       if (user.failedLoginAttempts >= 5) {
// // //         user.isFrozen = true;
// // //         await user.save();
// // //         return res.status(403).json({ message: "Account Frozen! Too many wrong attempts." });
// // //       }

// // //       await user.save();
// // //       const attemptsLeft = 5 - user.failedLoginAttempts;
// // //       return res.status(400).json({ message: `Invalid Password. ${attemptsLeft} attempts remaining.` });
// // //     }

// // //     // ✅ 4. Password Sahi hai (Login Success)

// // //     // 👇 LOG ADD KARO
// // //     await logActivity(req, "LOGIN", "User Logged In", user);


// // //     // Count reset karo 0 par aur Frozen hatao (just in case)
// // //     user.failedLoginAttempts = 0;
// // //     user.isFrozen = false;
// // //     await user.save();

// // //     // Token generate karo
// // //     const token = await genToken(user._id);
// // //     res.cookie("token", token, {
// // //       httpOnly: true,
// // //       secure: process.env.NODE_ENV === "production",
// // //       sameSite: "strict",
// // //       maxAge: 7 * 24 * 60 * 60 * 1000,
// // //     });

// // //     const { password: userPass, ...userDetails } = user._doc;
// // //     return res.status(200).json(userDetails);

// // //   } catch (error) {
// // //     console.log("Error:", error);
// // //     return res.status(500).json({ message: `Signin error: ${error.message}` });
// // //   }
// // // };




// // // Create User (Admin Only)
// // export const createUser = async (req, res) => {
// //   try {
// //     // 1️⃣ Username bhi receive karo
// //     const { name, email, password, userType, username } = req.body;

// //     // 2️⃣ Validation mein username add karo
// //     if (!name || !email || !password || !userType || !username) {
// //       return res.status(400).json({ message: "All fields are required (including Username)" });
// //     }

// //     // 3️⃣ Check karo User exist karta hai ya nahi (Email YA Username dono check karo)
// //     const userExists = await User.findOne({
// //       $or: [{ email: email }, { username: username }]
// //     });

// //     if (userExists) {
// //       return res.status(400).json({ message: "User with this Email or Username already exists" });
// //     }

// //     if (password.length < 6) {
// //       return res.status(400).json({ message: "Password must be at least 6 characters" });
// //     }

// //     // Hash Password
// //     const salt = await bcrypt.genSalt(10);
// //     const hashedPassword = await bcrypt.hash(password, salt);

// //     // 4️⃣ User create karte waqt username save karo
// //     const user = await User.create({
// //       username, // 👈 Ye zaroori hai
// //       name,
// //       email,
// //       password: hashedPassword,
// //       userType,
// //     });

// //     // 👇 LOG ADD KARO (req.user wo hai jo create kar raha hai ie Admin)
// //     await logActivity(req, "CREATE_USER", `Created user: ${username} (${userType})`);

// //     return res.status(201).json({
// //       success: true,
// //       message: "User created successfully",
// //       user,
// //     });

// //   } catch (error) {
// //     console.error("Create User Error:", error);

// //     // Duplicate Key Error ko handle karna (Safety ke liye)
// //     if (error.code === 11000) {
// //       return res.status(400).json({ message: "Username or Email already exists" });
// //     }

// //     return res.status(500).json({ message: `Create user error: ${error.message}` });
// //   }
// // };







// // // Signout
// // export const signOut = async (req, res) => {
// //   try {
// //     // 🛑 STEP 1: LOGOUT LOG (Cookie clear karne se pehle)
// //     // Hum check karenge ki kya user login tha? (req.user middleware se aayega)
// //     if (req.user) {
// //       try {
// //         await logActivity(
// //             req, 
// //             "LOGOUT", 
// //             `User Logged Out: ${req.user.name || req.user.username}`
// //         );
// //       } catch (logError) {
// //         console.log("⚠️ Logout log failed, but proceeding to clear cookie.");
// //       }
// //     } else {
// //         console.log("⚠️ Logout called without valid user session (req.user missing)");
// //     }

// //     // 🛑 STEP 2: Clear Cookie
// //     // res.clearCookie("token", {
// //     //   httpOnly: true,
// //     //   secure: process.env.NODE_ENV === "production", // Production me true
// //     //   sameSite: "strict",
// //     // });

// //      res.clearCookie("token", {
// //       httpOnly: true,
// //       secure: true, // Production me true
// //       sameSite: "none",
// //     });

// //     return res.status(200).json({
// //       success: true,
// //       message: "Logout successful",
// //     });

// //   } catch (error) {
// //     return res.status(500).json({
// //       success: false,
// //       message: `signOut error ${error.message}`,
// //     });
// //   }
// // };



// // // // signout
// // // export const signOut = async (req, res) => {
// // //   try {
// // //     res.clearCookie("token", {
// // //       httpOnly: true,
// // //       secure: false,     // production me true
// // //       sameSite: "strict",
// // //     });

// // //     return res.status(200).json({
// // //       success: true,
// // //       message: "Logout successful",
// // //     });
// // //   } catch (error) {
// // //     return res.status(500).json({
// // //       success: false,
// // //       message: `signOut error ${error.message}`,
// // //     });
// // //   }
// // // };




// import User from "../models/User.js";
// import genToken from "../utils/generateToken.js";
// import bcrypt from "bcryptjs";
// import { logActivity } from "../utils/logger.js";
// import Log from "../models/Log.js";
// import sendEmail from "../utils/sendEmail.js";



// // Check Auth (Protected)
// export const checkAuth = (req, res) => {
//   res.status(200).json({ success: true, userId: req.user });
// };

// // import LoginHistory from "../models/LoginHistory.js";

// // ... tumhara existing login code ...

// // Jab user successfully login ho jaye (password check ke baad):
// // if (isMatch) {
// //   // === YE CODE ADD KARO ===
// //   await Log.create({
// //     userId: user._id,
// //     username: user.name, // Agar user model me name hai to
// //     email: user.email,
// //     action: "LOGIN",
// //     ipAddress: req.ip, // IP address store karne ke liye
// //     device: req.headers["user-agent"], // Browser details ke liye
// //   });
// //   // ========================

// //   // Uske baad token return karo jo pehle kar rahe the
// //   res.json({ token, user });
// // }




// // authController.js

// // --- 1. SIGN IN (Stage 1: Check Password & Send OTP) ---


// // export const signIn = async (req, res) => {
// //   try {
// //     const { identifier, password } = req.body;

// //     const user = await User.findOne({
// //       $or: [{ email: identifier }, { username: identifier }]
// //     });

// //     if (!user) return res.status(400).json({ message: "Invalid Credentials" });
// //     if (user.isFrozen) return res.status(403).json({ message: "Account Frozen!" });

// //     const isMatch = await bcrypt.compare(password, user.password);
// //     if (!isMatch) {
// //       // (Attempts wala logic yahan rehne dena...)
// //       return res.status(400).json({ message: "Invalid Password" });
// //     }

// //     // ✅ PASSWORD SAHI HAI -> Ab OTP bhejo (Login mat karo abhi)
// //     const otp = Math.floor(100000 + Math.random() * 900000).toString();
// //     user.loginCode = otp;
// //     user.loginCodeExpire = Date.now() + 5 * 60 * 1000; // 5 min valid
// //     await user.save();

// //     await sendEmail({
// //       to: user.email,
// //       subject: "Login Verification Code",
// //       html: `<h2>Your Login OTP is ${otp}</h2><p>Security Alert: Do not share this code.</p>`,
// //     });

// //     // Frontend ko batao ki password sahi hai, ab OTP stage pe jao
// //     res.status(200).json({ 
// //       mfaRequired: true, 
// //       email: user.email, 
// //       message: "Please enter the OTP sent to your email" 
// //     });

// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };


// // export const signIn = async (req, res) => {
// //   try {
// //     const { identifier, password } = req.body;

// //     // 1. User dhundo (Email ya Username)
// //     const user = await User.findOne({
// //       $or: [{ email: identifier }, { username: identifier }]
// //     });

// //     if (!user) return res.status(404).json({ message: "User not found" });

// //     // 2. Pehle check karo account frozen toh nahi hai
// //     if (user.isFrozen) {
// //       return res.status(403).json({ 
// //         message: "Account is Frozen contact Admin " 
// //       });
// //     }

// //     // 3. Password Check karo
// //     const isMatch = await bcrypt.compare(password, user.password);

// //     if (!isMatch) {
// //       // ❌ WRONG PASSWORD LOGIC
// //       user.failedLoginAttempts += 1;

// //       if (user.failedLoginAttempts >= 5) {
// //         user.isFrozen = true;
// //         await user.save();
        
// //         // Log the freeze event
// //         await logActivity(req, "USER_FREEZE", `Account frozen: ${user.email} (5 failed attempts)`, user);
        
// //         return res.status(403).json({ 
// //           message: "Too many attempts. Your account has been FROZEN." 
// //         });
// //       }

// //       await user.save();
// //       return res.status(400).json({ 
// //         message: `Invalid Password. ${5 - user.failedLoginAttempts} attempts left.` 
// //       });
// //     }

// //     // ✅ SAHI PASSWORD LOGIC (2FA Trigger)
// //     // Sahi password par attempts reset kar do
// //     user.failedLoginAttempts = 0;
    
// //     const otp = Math.floor(100000 + Math.random() * 900000).toString();
// //     user.loginCode = otp;
// //     user.loginCodeExpire = Date.now() + 5 * 60 * 1000; // 5 min
// //     await user.save();

// //     // OTP Email bhejo
// //     await sendEmail({
// //       to: user.email,
// //       subject: "Login Verification Code",
// //       html: `<h2>Your Login OTP is ${otp}</h2><p>Security Alert: Your password was correct. Use this code to finish login.</p>`,
// //     });

// //     res.status(200).json({ 
// //       mfaRequired: true, 
// //       email: user.email, 
// //       message: "Password correct! Please enter the OTP sent to your email." 
// //     });

// //   } catch (error) {
// //     console.error("Login Error:", error);
// //     res.status(500).json({ message: "Server Error" });
// //   }
// // };

// // --- 2. VERIFY LOGIN OTP (Stage 2: Final Login) ---
// // export const verifyLoginOTP = async (req, res) => {
// //   try {
// //     const { email, code } = req.body;

// //     const user = await User.findOne({
// //       email,
// //       loginCode: code,
// //       loginCodeExpire: { $gt: Date.now() },
// //     });

// //     if (!user) {
// //       return res.status(400).json({ message: "Invalid or expired OTP" });
// //     }

// //     // ✅ OTP SAHI HAI -> Ab final Login karo (Token & Cookie)
// //     user.loginCode = undefined;
// //     user.loginCodeExpire = undefined;
// //     user.failedLoginAttempts = 0;
// //     await user.save();

// //     // const token = await genToken(user._id);
// //     // res.cookie("token", token, {
// //     //   httpOnly: true,
// //     //   secure: process.env.NODE_ENV === "production",
// //     //   sameSite: "strict",
// //     //   maxAge: 7 * 24 * 60 * 60 * 1000,
// //     // });
// // const token = await genToken(user._id);
// // res.cookie("token", token, {
// //   httpOnly: true,
// //   secure: process.env.NODE_ENV === "production",  // leave as is
// //   sameSite: "lax",                               // <-- change strict -> lax
// //   domain: ".oriviyan.com",                        // <-- add this line
// //   maxAge: 7 * 24 * 60 * 60 * 1000,
// // });


// //     const { password: userPass, ...userDetails } = user._doc;
    
// //     // Log Activity
// //     await logActivity(req, "LOGIN_SUCCESS", `Logged in with 2FA: ${user.email}`, user);

// //     res.status(200).json(userDetails);

// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };




// // export const signIn = async (req, res) => {
// //   try {
// //     const { identifier, password } = req.body;

// //     if (!identifier || !password) {
// //       return res.status(400).json({ message: "All fields are required" });
// //     }

// //     // 1. User dhundho
// //     const user = await User.findOne({
// //       $or: [{ email: identifier }, { username: identifier }]
// //     });

// //     if (!user) {
// //       // Security: User nahi mila to bhi Generic error do
// //       return res.status(400).json({ message: "Invalid Credentials" });
// //     }

// //     // 🛑 2. Check karo agar Account Frozen hai
// //     if (user.isFrozen) {
// //       return res.status(403).json({
// //         message: "Account is Frozen due to multiple failed attempts. Contact Admin."
// //       });
// //     }

// //     // 3. Password Check karo
// //     const isMatch = await bcrypt.compare(password, user.password);

// //     if (!isMatch) {
// //       // ❌ Password Galat hai -> Count Badhao
// //       user.failedLoginAttempts += 1;

// //       // Agar 5 ya usse zyada attempts ho gaye to Freeze kar do
// //       if (user.failedLoginAttempts >= 5) {
// //         user.isFrozen = true;
// //         await user.save();
// //         return res.status(403).json({ message: "Account Frozen! Too many wrong attempts." });
// //       }

// //       await user.save();
// //       const attemptsLeft = 5 - user.failedLoginAttempts;
// //       return res.status(400).json({ message: `Invalid Password. ${attemptsLeft} attempts remaining.` });
// //     }

// //     // ✅ 4. Password Sahi hai (Login Success)

// //     // 👇 LOG ADD KARO
// //     await logActivity(req, "LOGIN", "User Logged In", user);


// //     // Count reset karo 0 par aur Frozen hatao (just in case)
// //     user.failedLoginAttempts = 0;
// //     user.isFrozen = false;
// //     await user.save();

// //     // Token generate karo
// //     const token = await genToken(user._id);
// //     res.cookie("token", token, {
// //       httpOnly: true,
// //       secure: process.env.NODE_ENV === "production",
// //       sameSite: "strict",
// //       maxAge: 7 * 24 * 60 * 60 * 1000,
// //     });

// //     const { password: userPass, ...userDetails } = user._doc;
// //     return res.status(200).json(userDetails);

// //   } catch (error) {
// //     console.log("Error:", error);
// //     return res.status(500).json({ message: `Signin error: ${error.message}` });
// //   }
// // };




// // // Create User (Admin Only)
// // export const createUser = async (req, res) => {
// //   try {
// //     // 1️⃣ Username bhi receive karo
// //     const { name, email, password, userType, username } = req.body;

// //     // 2️⃣ Validation mein username add karo
// //     if (!name || !email || !password || !userType || !username) {
// //       return res.status(400).json({ message: "All fields are required (including Username)" });
// //     }

// //     // 3️⃣ Check karo User exist karta hai ya nahi (Email YA Username dono check karo)
// //     const userExists = await User.findOne({
// //       $or: [{ email: email }, { username: username }]
// //     });

// //     if (userExists) {
// //       return res.status(400).json({ message: "User with this Email or Username already exists" });
// //     }

// //     if (password.length < 6) {
// //       return res.status(400).json({ message: "Password must be at least 6 characters" });
// //     }

// //     // Hash Password
// //     const salt = await bcrypt.genSalt(10);
// //     const hashedPassword = await bcrypt.hash(password, salt);

// //     // 4️⃣ User create karte waqt username save karo
// //     const user = await User.create({
// //       username, // 👈 Ye zaroori hai
// //       name,
// //       email,
// //       password: hashedPassword,
// //       userType,
// //     });

// //     // 👇 LOG ADD KARO (req.user wo hai jo create kar raha hai ie Admin)
// //     await logActivity(req, "CREATE_USER", `Created user: ${username} (${userType})`);

// //     return res.status(201).json({
// //       success: true,
// //       message: "User created successfully",
// //       user,
// //     });

// //   } catch (error) {
// //     console.error("Create User Error:", error);

// //     // Duplicate Key Error ko handle karna (Safety ke liye)
// //     if (error.code === 11000) {
// //       return res.status(400).json({ message: "Username or Email already exists" });
// //     }

// //     return res.status(500).json({ message: `Create user error: ${error.message}` });
// //   }
// // };



// // 1️⃣ Helper function for allowed domains
// const isCompanyEmail = (email) => {
//   const allowedDomains = ["oriviyan.com", "mattrade.in"];
//   const domain = email.split("@")[1]?.toLowerCase();
//   return allowedDomains.includes(domain);
// };


// export const signIn = async (req, res) => {
//   try {
//     const { identifier, password } = req.body;

//     // Find user by email or username
//     const user = await User.findOne({
//       $or: [{ email: identifier }, { username: identifier }]
//     });

//     if (!user) return res.status(404).json({ message: "User not found" });
//     if (user.isFrozen) return res.status(403).json({ message: "Account is Frozen. Contact Admin." });

//     // Check password
//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       user.failedLoginAttempts += 1;

//       if (user.failedLoginAttempts >= 5) {
//         user.isFrozen = true;
//         await user.save();
//         await logActivity(req, "USER_FREEZE", `Account frozen: ${user.email} (5 failed attempts)`, user);
//         return res.status(403).json({ message: "Too many attempts. Your account has been FROZEN." });
//       }

//       await user.save();
//       return res.status(400).json({ message: `Invalid Password. ${5 - user.failedLoginAttempts} attempts left.` });
//     }

//     // ✅ Password correct → send OTP
//     user.failedLoginAttempts = 0;
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     user.loginCode = otp;
//     user.loginCodeExpire = Date.now() + 5 * 60 * 1000; // 5 min
//     await user.save();

//     await sendEmail({
//       to: user.email,
//       subject: "Login Verification Code",
//       html: `<h2>Your Login OTP is ${otp}</h2><p>Security Alert: Your password was correct. Use this code to finish login.</p>`,
//     });

//     res.status(200).json({
//       mfaRequired: true,
//       email: user.email,
//       message: "Password correct! Please enter the OTP sent to your email."
//     });

//   } catch (error) {
//     console.error("Login Error:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // ---------------------- VERIFY LOGIN OTP (Stage 2: Final Login) ----------------------
// export const verifyLoginOTP = async (req, res) => {
//   try {
//     const { email, code } = req.body;

//     const user = await User.findOne({
//       email,
//       loginCode: code,
//       loginCodeExpire: { $gt: Date.now() },
//     });

//     if (!user) return res.status(400).json({ message: "Invalid or expired OTP" });

//     user.loginCode = undefined;
//     user.loginCodeExpire = undefined;
//     user.failedLoginAttempts = 0;
//     await user.save();

//     const token = await genToken(user._id);
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       // sameSite: "lax",
//       sameSite: "none",
//       domain: ".oriviyan.com",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     const { password: userPass, ...userDetails } = user._doc;
//     await logActivity(req, "LOGIN_SUCCESS", `Logged in with 2FA: ${user.email}`, user);

//     res.status(200).json(userDetails);

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // 2️⃣ Controller me check add karo
// export const createUser = async (req, res) => {
//   try {
//     const { name, email, password, userType, username } = req.body;

//     if (!name || !email || !password || !userType || !username) {
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
// const loginUrl = "https://inventory.oriviyan.com/"; // apna frontend URL

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

//       <p><b>Username:</b> ${username}</p>
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








// // Signout
// export const signOut = async (req, res) => {
//   try {
//     // 🛑 STEP 1: LOGOUT LOG (Cookie clear karne se pehle)
//     // Hum check karenge ki kya user login tha? (req.user middleware se aayega)
//     if (req.user) {
//       try {
//         await logActivity(
//             req, 
//             "LOGOUT", 
//             `User Logged Out: ${req.user.name || req.user.username}`
//         );
//       } catch (logError) {
//         console.log("⚠️ Logout log failed, but proceeding to clear cookie.");
//       }
//     } else {
//         console.log("⚠️ Logout called without valid user session (req.user missing)");
//     }

//     // 🛑 STEP 2: Clear Cookie
//     res.clearCookie("token", {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production", // Production me true
//       sameSite: "none",
//     });

//     return res.status(200).json({
//       success: true,
//       message: "Logout successful",
//     });

//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: `signOut error ${error.message}`,
//     });
//   }
// };
























import User from "../models/User.js";
import genToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import { logActivity } from "../utils/logger.js";
import sendEmail from "../utils/sendEmail.js";

// ------------------- HELPER -------------------
const isCompanyEmail = (email) => {
  const allowedDomains = ["oriviyan.com", "mattrade.in"];
  const domain = email.split("@")[1]?.toLowerCase();
  return allowedDomains.includes(domain);
};

// ------------------- CHECK AUTH -------------------
export const checkAuth = (req, res) => {
  res.status(200).json({ success: true, userId: req.user });
};

// ------------------- SIGN IN (Stage 1) -------------------
export const signIn = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // 1️⃣ Find user by email or username
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.isFrozen) return res.status(403).json({ message: "Account is Frozen. Contact Admin." });

    // 2️⃣ Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      user.failedLoginAttempts += 1;

      if (user.failedLoginAttempts >= 5) {
        user.isFrozen = true;
        await user.save();
        await logActivity(req, "USER_FREEZE", `Account frozen: ${user.email} (5 failed attempts)`, user);
        return res.status(403).json({ message: "Too many attempts. Your account has been FROZEN." });
      }

      await user.save();
      return res.status(400).json({ message: `Invalid Password. ${5 - user.failedLoginAttempts} attempts left.` });
    }

    // ✅ Password correct → send OTP
    user.failedLoginAttempts = 0;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.loginCode = otp;
    user.loginCodeExpire = Date.now() + 5 * 60 * 1000; // 5 min
    await user.save();

    // Send OTP email
    await sendEmail({
      to: user.email,
      subject: "Login Verification Code",
      html: `<h2>Your Login OTP is ${otp}</h2><p>Security Alert: Your password was correct. Use this code to finish login.</p>`,
    });

    res.status(200).json({
      mfaRequired: true,
      email: user.email,
      message: "Password correct! Please enter the OTP sent to your email.",
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ------------------- VERIFY LOGIN OTP (Stage 2) -------------------
export const verifyLoginOTP = async (req, res) => {
  try {
    const { email, code } = req.body;

    const user = await User.findOne({
      email,
      loginCode: code,
      loginCodeExpire: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired OTP" });

    user.loginCode = undefined;
    user.loginCodeExpire = undefined;
    user.failedLoginAttempts = 0;
    await user.save();

    // ✅ Generate token & set cookie
    // const token = await genToken(user._id);
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production", // Production me true
    //   sameSite: "none",                               // Browser ke liye fixed
    //   domain: ".oriviyan.com",                        // Cookie domain fix
    //   maxAge: 7 * 24 * 60 * 60 * 1000,               // 7 days
    // });

// const token = await genToken(user._id);
// res.cookie("token", token, {
//   httpOnly: true,
//   secure: process.env.NODE_ENV === "production", // prod me https required
//   sameSite: "lax",   // cross-domain friendly, dev + prod dono me kaam kare
//   maxAge: 7 * 24 * 60 * 60 * 1000,
// });

          
const token = await genToken(user._id);
res.cookie("token", token, {
  httpOnly: true,
  secure: true,       // HTTPS required for "none"
  sameSite: "none",   // cross-origin friendly
  maxAge: 7 * 24 * 60 * 60 * 1000,
  // domain: ".oriviyan.com",   <-- free plan me hatao
});



    const { password: userPass, ...userDetails } = user._doc;

    await logActivity(req, "LOGIN_SUCCESS", `Logged in with 2FA: ${user.email}`, user);

    res.status(200).json(userDetails);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ------------------- CREATE USER (Admin) -------------------
export const createUser = async (req, res) => {
  try {
    const { name, email, password, userType } = req.body;

    if (!name || !email || !password || !userType) {
      return res.status(400).json({ message: "All fields are required (including Username)" });
    }

    // Domain validation
    if (!isCompanyEmail(email)) {
      return res.status(400).json({ message: "Only @oriviyan.com or @mattrade.in emails are allowed" });
    }

    const userExists = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });

    if (userExists) {
      return res.status(400).json({ message: "User with this Email or Username already exists" });
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
    });

    await logActivity(req, "CREATE_USER", `Created user: ${username} (${userType})`);

    // Send account created email
    const loginUrl = "https://inventory.oriviyan.com/";

    await sendEmail({
      to: email,
      subject: "Your Oriviyan Inventory Account is Ready",
      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.6">
          <h2>Welcome to Oriviyan Inventory System</h2>
          <p>Hello <b>${name}</b>,</p>
          <p>Your account has been successfully created by the admin.</p>
          <p>You can login using the link below:</p>
          <p>
            <a href="${loginUrl}" style="background:#2563eb;color:white;padding:10px 18px;text-decoration:none;border-radius:6px;">
              Login to Inventory
            </a>
          </p>
          <p><b>Username:</b> ${username}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Password:</b> ${password}</p>
          <p style="color:red">Please change your password after first login.</p>
          <br/>
          <p>— Oriviyan IT Team</p>
        </div>
      `
    });

    return res.status(201).json({ success: true, message: "User created successfully", user });

  } catch (error) {
    console.error("Create User Error:", error);
    if (error.code === 11000) {
      return res.status(400).json({ message: "Username or Email already exists" });
    }
    return res.status(500).json({ message: `Create user error: ${error.message}` });
  }
};

// ------------------- SIGN OUT -------------------
export const signOut = async (req, res) => {
  try {
    if (req.user) {
      try {
        await logActivity(req, "LOGOUT", `User Logged Out: ${req.user.name || req.user.username}`);
      } catch (logError) {
        console.log("⚠️ Logout log failed, proceeding to clear cookie.");
      }
    } else {
      console.log("⚠️ Logout called without valid user session (req.user missing)");
    }

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });

    return res.status(200).json({ success: true, message: "Logout successful" });

  } catch (error) {
    return res.status(500).json({ success: false, message: `signOut error ${error.message}` });
  }
};

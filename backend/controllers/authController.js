import User from "../models/User.js";
import genToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import { logActivity } from "../utils/logger.js";
import Log from "../models/Log.js";



// Check Auth (Protected)
export const checkAuth = (req, res) => {
  res.status(200).json({ success: true, userId: req.user });
};

// import LoginHistory from "../models/LoginHistory.js";

// ... tumhara existing login code ...

// Jab user successfully login ho jaye (password check ke baad):
// if (isMatch) {
//   // === YE CODE ADD KARO ===
//   await Log.create({
//     userId: user._id,
//     username: user.name, // Agar user model me name hai to
//     email: user.email,
//     action: "LOGIN",
//     ipAddress: req.ip, // IP address store karne ke liye
//     device: req.headers["user-agent"], // Browser details ke liye
//   });
//   // ========================

//   // Uske baad token return karo jo pehle kar rahe the
//   res.json({ token, user });
// }



export const signIn = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 1. User dhundho
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }]
    });

    if (!user) {
      // Security: User nahi mila to bhi Generic error do
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // 🛑 2. Check karo agar Account Frozen hai
    if (user.isFrozen) {
      return res.status(403).json({
        message: "Account is Frozen due to multiple failed attempts. Contact Admin."
      });
    }

    // 3. Password Check karo
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      // ❌ Password Galat hai -> Count Badhao
      user.failedLoginAttempts += 1;

      // Agar 5 ya usse zyada attempts ho gaye to Freeze kar do
      if (user.failedLoginAttempts >= 5) {
        user.isFrozen = true;
        await user.save();
        return res.status(403).json({ message: "Account Frozen! Too many wrong attempts." });
      }

      await user.save();
      const attemptsLeft = 5 - user.failedLoginAttempts;
      return res.status(400).json({ message: `Invalid Password. ${attemptsLeft} attempts remaining.` });
    }

    // ✅ 4. Password Sahi hai (Login Success)

    // 👇 LOG ADD KARO
    await logActivity(req, "LOGIN", "User Logged In", user);


    // Count reset karo 0 par aur Frozen hatao (just in case)
    user.failedLoginAttempts = 0;
    user.isFrozen = false;
    await user.save();

    // Token generate karo
    const token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const { password: userPass, ...userDetails } = user._doc;
    return res.status(200).json(userDetails);

  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ message: `Signin error: ${error.message}` });
  }
};




// Create User (Admin Only)
export const createUser = async (req, res) => {
  try {
    // 1️⃣ Username bhi receive karo
    const { name, email, password, userType, username } = req.body;

    // 2️⃣ Validation mein username add karo
    if (!name || !email || !password || !userType || !username) {
      return res.status(400).json({ message: "All fields are required (including Username)" });
    }

    // 3️⃣ Check karo User exist karta hai ya nahi (Email YA Username dono check karo)
    const userExists = await User.findOne({
      $or: [{ email: email }, { username: username }]
    });

    if (userExists) {
      return res.status(400).json({ message: "User with this Email or Username already exists" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4️⃣ User create karte waqt username save karo
    const user = await User.create({
      username, // 👈 Ye zaroori hai
      name,
      email,
      password: hashedPassword,
      userType,
    });

    // 👇 LOG ADD KARO (req.user wo hai jo create kar raha hai ie Admin)
    await logActivity(req, "CREATE_USER", `Created user: ${username} (${userType})`);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });

  } catch (error) {
    console.error("Create User Error:", error);

    // Duplicate Key Error ko handle karna (Safety ke liye)
    if (error.code === 11000) {
      return res.status(400).json({ message: "Username or Email already exists" });
    }

    return res.status(500).json({ message: `Create user error: ${error.message}` });
  }
};

// signout
export const signOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,     // production me true
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


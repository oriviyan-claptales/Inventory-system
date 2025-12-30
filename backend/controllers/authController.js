import User from "../models/User.js";
import genToken from "../utils/generateToken.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";


// Check Auth (Protected)
export const checkAuth = (req, res) => {
    res.status(200).json({ success: true, userId: req.user });
};

export const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Body check
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        if(password.length < 6){
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        // 🔐 password hash
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const token = await genToken(user._id);

        // Set cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
        });

        return res.status(201).json(user);

    } catch (error) {
        return res.status(500).json({ message: `Signup error: ${error.message}` });
    }
}

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // 2. Check password (with await)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password or Email" });
        }

        // 3. Generate Token
        const token = await genToken(user._id);

        // 4. Set Cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // development mein false rakhein
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, 
        });

        // 5. Send FINAL Response (Corrected Status)
        return res.status(200).json(user);

    } catch (error) {
        console.log("Internal Server Error:", error);
        return res.status(500).json({ message: `signin error: ${error.message}` });
    }
};

// Create User (Admin Only)
// export const createUser = async (req, res) => {
//   try {
//     const { username, name, email, password, userType } = req.body;

//     // Validate required fields
//     if (!username || !name || !email || !password || !userType) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Check if user already exists
//     // const userExists = await User.findOne({ email });
//     // if (userExists) {
//     //   return res.status(400).json({ message: "User already exists" });
//     // }
//     const userExists = await User.findOne({ 
//       $or: [{ email: email }, { username: username }] 
//     });

//     if (password.length < 6) {
//       return res.status(400).json({ message: "Password must be at least 6 characters" });
//     }

//     // Hash Password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create User
//     const user = await User.create({
//       username,
//       name,
//       email,
//       password: hashedPassword,
//       userType, // admin / superuser / user
//     });

//     return res.status(201).json({
//       success: true,
//       message: "User created successfully",
//       user,
//     });

//   } catch (error) {
//     console.error("Create User Error:", error);
//     return res.status(500).json({ message: `Create user error: ${error.message}` });
//   }
// };


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
      sameSite: "lax",
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


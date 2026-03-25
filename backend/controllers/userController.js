// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import { logActivity } from "../utils/logger.js";

// // 1️⃣ Get Current User (Jo pehle se tha)
// export const getCurrentUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.userId).select("-password");
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching user" });
//   }
// };

// // ✅ NEW: Toggle User Freeze Status (Admin Only)
// export const toggleUserFreeze = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findById(id);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Status palat do (Freeze <-> Unfreeze)
//     user.isFrozen = !user.isFrozen;
    
//     // Agar Unfreeze kar rahe hain, to attempts bhi 0 kar do
//     if (!user.isFrozen) {
//       user.failedLoginAttempts = 0;
//     }

//     await user.save();
//     // 👇 LOG
//     const action = user.isFrozen ? "USER_FREEZE" : "USER_UNFREEZE";
//     await logActivity(req, action, `Target User: ${user.name} (${user.email})`);

//     res.status(200).json({ 
//       message: user.isFrozen ? "User Frozen" : "User Unfrozen successfully", 
//       user 
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // 2️⃣ Get All Users (Admin Only)
// export const getAllUsers = async (req, res) => {
//   try {
//     // Password mat bhejo security ke liye
//     const users = await User.find({}).select("-password").sort({ createdAt: -1 });
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // // 3️⃣ Delete User
// // export const deleteUser = async (req, res) => {
// //   try {
// //     const user = await User.findById(req.params.id);
// //     if (!user) return res.status(404).json({ message: "User not found" });

// //     // Khud ko delete karne se roko
// //     if (user._id.toString() === req.userId) {
// //       return res.status(400).json({ message: "You cannot delete yourself!" });
// //     }

// //     await User.findByIdAndDelete(req.params.id);
// //     // 👇 LOG
// //     await logActivity(req, "USER_DELETE", `Deleted User: ${user.name}`);
    
// //     res.json({ message: "User deleted successfully" });
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };





// // 3️⃣ Delete User (Fixed)
// export const deleteUser = async (req, res) => {
//   try {
//     const userId = req.params.id; // Jisko delete karna hai
//     const currentAdminId = req.userId; // Jo delete kar raha hai (Logged in admin)

//     // 🛑 1. Delete karne se PEHLE user ko dhoondho
//     const userToDelete = await User.findById(userId);

//     if (!userToDelete) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // 🛑 2. Khud ko delete karne se roko (Safe Check)
//     // Humne req.user._id hata kar currentAdminId (req.userId) kar diya hai
//     if (currentAdminId && currentAdminId.toString() === userToDelete._id.toString()) {
//         return res.status(400).json({ message: "You cannot delete yourself!" });
//     }

//     // 🛑 3. Ab Delete Karo
//     await User.findByIdAndDelete(userId);

//     // 🛑 4. Logging (Safe Mode)
//     try {
//         if (typeof logActivity === 'function') {
//             await logActivity(
//                 req, 
//                 "USER_DELETE", 
//                 `Deleted User: ${userToDelete.name} (${userToDelete.email})`
//             );
//         }
//     } catch (logError) {
//         console.log("Log failed but user deleted:", logError.message);
//     }

//     res.status(200).json({ message: "User deleted successfully" });

//   } catch (error) {
//     console.error("Delete Error in Controller:", error); // Terminal check karna iske baad
//     res.status(500).json({ message: "Server error while deleting user" });
//   }
// };




// // export const deleteUser = async (req, res) => {
// //   try {
// //     const userId = req.params.id;

// //     // 🛑 1. Delete karne se PEHLE user ko dhoondho (Details ke liye)
// //     const userToDelete = await User.findById(userId);

// //     if (!userToDelete) {
// //       return res.status(404).json({ message: "User not found" });
// //     }

// //     // Khud ko delete karne se roko
// //     if (req.user._id.toString() === userToDelete._id.toString()) {
// //         return res.status(400).json({ message: "You cannot delete yourself!" });
// //     }

// //     // 🛑 2. Ab Delete Karo
// //     await User.findByIdAndDelete(userId);

// //     // 🛑 3. Ab Log banao (Humare paas userToDelete me details saved hain)
// //     // Try-Catch lagaya hai taaki agar Log fail ho, tab bhi Frontend ko Success mile
// //     try {
// //         await logActivity(
// //             req, 
// //             "USER_DELETE", 
// //             `Deleted User: ${userToDelete.name} (${userToDelete.email})`
// //         );
// //     } catch (logError) {
// //         console.log("User deleted, but log failed:", logError.message);
// //     }

// //     res.status(200).json({ message: "User deleted successfully" });

// //   } catch (error) {
// //     console.error("Delete Error:", error); // Terminal me asli error dikhega
// //     res.status(500).json({ message: "Server error while deleting user" });
// //   }
// // };


// // 4️⃣ Update User Details (Name, Email, Role)
// export const updateUser = async (req, res) => {
//   try {
//     const { name, email, username, userType } = req.body;
    
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       { name, email, username, userType },
//       { new: true } // Return updated doc
//     ).select("-password");

//     res.json(updatedUser);
//   } catch (error) {
//     res.status(500).json({ message: "Update failed" });
//   }
// };

// // 5️⃣ Admin Reset Password (Directly)
// export const adminResetPassword = async (req, res) => {
//   try {
//     const { newPassword } = req.body;
//     if (newPassword.length < 6) return res.status(400).json({ message: "Password too short" });

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(newPassword, salt);

//     await User.findByIdAndUpdate(req.params.id, { password: hashedPassword });

//     res.json({ message: "Password reset successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Reset failed" });
//   }
// };







import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { logActivity } from "../utils/logger.js";

// 1️⃣ Get Current User
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user" });
  }
};

// 2️⃣ Toggle User Freeze Status (Admin Only)
export const toggleUserFreeze = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Status palat do (Freeze <-> Unfreeze)
    user.isFrozen = !user.isFrozen;
    
    // Agar Unfreeze kar rahe hain, to attempts bhi 0 kar do
    if (!user.isFrozen) {
      user.failedLoginAttempts = 0;
    }

    await user.save();
    
    // 👇 LOG (Safe Logging)
    try {
        const action = user.isFrozen ? "USER_FREEZE" : "USER_UNFREEZE";
        await logActivity(req, action, `Target User: ${user.name} (${user.email})`);
    } catch (logError) {
        console.log("Freeze toggle success, but log failed:", logError.message);
    }

    res.status(200).json({ 
      message: user.isFrozen ? "User Frozen" : "User Unfrozen successfully", 
      user 
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3️⃣ Get All Users (Admin Only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4️⃣ Delete User (✅ Updated Logic)


// 4️⃣ Delete User (Crash Proof Version)
// 4️⃣ Delete User (Final Crash-Proof Version)
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id; // Jisko delete karna hai

    // 🛑 SAFETY CHECK: Agar req.user middleware se nahi aaya, to manually dhundo
    // Ye line "Cannot read properties of undefined" error rokegi
    let adminUser = req.user;
    
    if (!adminUser && req.userId) {
        // Agar userId hai par user object nahi, to database se nikal lo
        adminUser = await User.findById(req.userId);
    }

    // Agar abhi bhi admin nahi mila, to Auth fail hai
    if (!adminUser) {
        console.log("❌ Auth Error: req.user and req.userId missing");
        return res.status(401).json({ message: "Unauthorized: User identification failed" });
    }

    // Logger ke liye req.user set kar do (taaki logger.js khush rahe)
    req.user = adminUser; 

    // 1️⃣ Delete karne se PEHLE target user ko dhoondho
    const userToDelete = await User.findById(userId);

    if (!userToDelete) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2️⃣ Khud ko delete karne se roko
    if (adminUser._id.toString() === userToDelete._id.toString()) {
        return res.status(400).json({ message: "You cannot delete yourself!" });
    }

    // 3️⃣ LOGGING (Ab ye fail nahi hoga kyunki humne req.user set kar diya hai)
    try {
        await logActivity(
            req, 
            "USER_DELETE", 
            `Deleted User: ${userToDelete.name} (${userToDelete.email})`
        );
    } catch (logError) {
        console.log("⚠️ Log failed but proceeding:", logError.message);
    }

    // 4️⃣ DELETE
    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "User deleted successfully" });

  } catch (error) {
    console.error("❌ Critical Delete Error:", error); 
    res.status(500).json({ message: "Server error while deleting user" });
  }
};


// 5️⃣ Update User Details (Name, Email, Role)
// 5️⃣ Update User Details (Name, Email, Role, TCodes)
const isCompanyEmail = (email) => {
  const allowedDomains = ["oriviyan.com", "mattrade.in"];
  const domain = email.split("@")[1]?.toLowerCase();
  return allowedDomains.includes(domain);
};

export const updateUser = async (req, res) => {
  try {
    // 1. 👇 'username' hata diya hai, aur 'tcodes' ko receive kiya hai
    const { name, email, userType, tcodes } = req.body;
    const userId = req.params.id;

    // 2. Purana data dhoondho comparison ke liye
    const oldUser = await User.findById(userId);
    if (!oldUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // 3. Email domain validation
    if (email && !isCompanyEmail(email)) {
      return res.status(400).json({ message: "Only @oriviyan.com or @mattrade.in emails are allowed" });
    }

    // 4. Check karo kya badla hai (Logs ke liye)
    let changes = [];
    const fieldsToCompare = { name, email, userType }; // username hata diya
    for (let key in fieldsToCompare) {
      if (fieldsToCompare[key] && oldUser[key] !== fieldsToCompare[key]) {
        changes.push(`${key}: (${oldUser[key]} ➔ ${fieldsToCompare[key]})`);
      }
    }
    
    // Agar TCodes array me length alag hai toh log me add karlo (optional)
    if (tcodes && JSON.stringify(oldUser.tcodes) !== JSON.stringify(tcodes)) {
       changes.push("Permissions updated");
    }

    // 5. 👇 TCodes Setup
    let newTcodes = tcodes;
    // Agar userType 'admin' banaya hai, toh uske tcodes empty kar do (kyunki admin ko default full access hai)
    if (userType === 'admin') {
      newTcodes = [];
    } else if (tcodes === undefined) {
      // Agar request me tcodes nahi aayi, toh purani wali hi rakho
      newTcodes = oldUser.tcodes;
    }

    // 6. Database Update
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { 
        name, 
        email, 
        userType,
        tcodes: newTcodes // 👈 Ye add kiya taaki database me save ho
      },
      { new: true }
    ).select("-password");

    // 7. Agar kuch badla hai, toh Log banao
    if (changes.length > 0) {
      try {
        await logActivity(
          req,
          "USER_UPDATE",
          `Updated Profile of ${oldUser.email}. Changes: ${changes.join(", ")}` // username ki jagah email
        );
      } catch (logError) {
        console.log("Log failed:", logError.message);
      }
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("Update User Error:", error);
    res.status(500).json({ message: "Update failed" });
  }
};

// 6️⃣ Admin Reset Password (With Logging)
export const adminResetPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const userId = req.params.id;

    if (newPassword.length < 6) return res.status(400).json({ message: "Password too short" });

    // 🛑 1. Target user dhundo details ke liye
    const targetUser = await User.findById(userId);
    if (!targetUser) return res.status(404).json({ message: "User not found" });

    // 🛑 2. Hash and Update
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await User.findByIdAndUpdate(userId, { password: hashedPassword });

    // 🛑 3. Log the Password Reset action
    try {
      await logActivity(
        req,
        "USER_PASSWORD_RESET",
        `Admin reset password for user: ${targetUser.username} (${targetUser.email})`
      );
    } catch (logError) {
      console.log("Log failed:", logError.message);
    }

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ message: "Reset failed" });
  }
};
// export const updateUser = async (req, res) => {
//   try {
//     const { name, email, username, userType } = req.body;
    
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       { name, email, username, userType },
//       { new: true }
//     ).select("-password");

//     res.json(updatedUser);
//   } catch (error) {
//     res.status(500).json({ message: "Update failed" });
//   }
// };

// 6️⃣ Admin Reset Password (Directly)
// export const adminResetPassword = async (req, res) => {
//   try {
//     const { newPassword } = req.body;
//     if (newPassword.length < 6) return res.status(400).json({ message: "Password too short" });

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(newPassword, salt);

//     await User.findByIdAndUpdate(req.params.id, { password: hashedPassword });

//     res.json({ message: "Password reset successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Reset failed" });
//   }
// };
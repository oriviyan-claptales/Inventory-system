// import Log from "../models/Log.js";

// export const logActivity = async (req, action, details, userOverride = null) => {
//   try {
//     const user = userOverride || req.user; // Kabhi req.user hoga, kabhi manually pass karenge
    
//     if (!user) return; // Agar user nahi hai to log mat karo (safety)

//     await Log.create({
//       actorId: user._id,
//       actorName: user.name || user.username,
//       action: action,
//       details: details,
//       ip: req.ip || req.connection.remoteAddress,
//     });
//   } catch (error) {
//     console.error("Logging Error:", error);
//   }
// };
import Log from "../models/Log.js";

export const logActivity = async (req, action, details, targetUser = null) => {
  try {
    // Check 1: Kya req.user exist karta hai?
    const actor = req.user || targetUser;

    if (!actor) {
      console.log("❌ LOG FAILED: User not found in req (Auth Middleware Issue?)");
      return; 
    }

    console.log(`✅ LOGGING: ${action} by ${actor.name || actor.username}`);

    await Log.create({
      actorId: actor._id,
      actorName: actor.name || actor.username || "Unknown",
      email: actor.email,
      role: actor.userType || "user",
      action: action,
      details: details,
      ip: req.ip || req.connection?.remoteAddress,
    });

  } catch (error) {
    console.error("❌ LOGGING ERROR (DB):", error.message);
  }
};
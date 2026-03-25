// // import Log from "../models/Log.js";
// import Log from "../models/Log.js";
// // export const getLogs = async (req, res) => {
// //   try {
// //     // Latest pehle dikhaye (sort -1)
// //     const logs = await Log.find().sort({ timestamp: -1 }); // Last 100 logs
// //     res.json(logs);
// //   } catch (error) {
// //     res.status(500).json({ message: "Error fetching logs" });
// //   }
// // };

// export const getLogs = async (req, res) => {
//   try {
//     const { startDate, endDate, action } = req.query; // Query params se dates nikalenge
//     let query = {};

//     // 📅 Date Filter Logic
//     if (startDate && endDate) {
//       query.timestamp = {
//         $gte: new Date(startDate), // Start date se bada ya barabar
//         $lte: new Date(endDate + "T23:59:59.999Z"), // End date ke din ke aakhir tak
//       };
//     }

//     // Agar action filter bhi hai (pehle wala)
//     if (action && action !== "all") {
//       query.action = action;
//     }

//     const logs = await Log.find(query)
//       .sort({ timestamp: -1 })
//       .limit(500); // Date filter hai toh limit thodi badha sakte hain

//     res.json(logs);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching logs" });
//   }
// };

// export const getUserLogs = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     // Hum actorId se filter karenge kyunki logger mein wahi save ho raha hai
//     const logs = await Log.find({ actorId: userId }).sort({ timestamp: -1 });
//     res.json(logs);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching user logs" });
//   }
// };

// // export const getProductLogs = async (req, res) => {
// //   try {
// //     const { productId } = req.params;
// //     // Hum details ya kisi specific field mein product ID search karenge
// //     // Best practice: Product updates ke waqt hum Log mein productId bhi save kar rahe hain
// //     const logs = await Log.find({ 
// //         $or: [
// //             { details: { $regex: productId, $options: 'i' } },
// //             { details: { $regex: req.query.sku, $options: 'i' } } // Fallback SKU search
// //         ]
// //     }).sort({ timestamp: -1 });
    
// //     res.json(logs);
// //   } catch (error) {
// //     console.error("Backend Error:", error);
// //     res.status(500).json({ message: "Error fetching product history" });
// //   }
// // };

// // controllers/logController.js
// // controllers/logController.js
// export const getProductLogs = async (req, res) => {
//   try {
//     const { productId } = req.params;
//     const { sku } = req.query; // Frontend se ?sku=... aayega

//     console.log(`🔍 Backend Received - ID: ${productId}, SKU: ${sku}`);

//     // Ek khali array banao filters ke liye
//     let filters = [];

//     // Agar ID hai toh ID wala filter dalo
//     if (productId && productId !== "undefined") {
//       filters.push({ details: { $regex: String(productId), $options: "i" } });
//     }

//     // Agar SKU hai aur "undefined" nahi hai, toh SKU wala filter dalo
//     if (sku && sku !== "undefined") {
//       filters.push({ details: { $regex: String(sku), $options: "i" } });
//     }

//     // Agar dono nahi hain, toh khali array bhej do
//     if (filters.length === 0) {
//       return res.json([]);
//     }

//     const logs = await Log.find({ $or: filters }).sort({ timestamp: -1 });

//     console.log(`✅ Logs found: ${logs.length}`);
//     res.status(200).json(logs);
//   } catch (error) {
//     console.error("❌ Log Fetch Error:", error.message);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };











import Log from "../models/Log.js";

// --- 🛠️ HELPER: Date Filter Logic ---
// Ye function dates ko MongoDB format mein convert karega
const getDateQuery = (startDate, endDate) => {
  if (startDate && endDate) {
    return {
      $gte: new Date(startDate), // Start of the day (00:00:00)
      $lte: new Date(endDate + "T23:59:59.999Z"), // End of the day (23:59:59)
    };
  }
  return null;
};

// 1️⃣ Get Global Logs (Used in LogHistory Page)
export const getLogs = async (req, res) => {
  try {
    const { startDate, endDate, action } = req.query;
    let query = {};

    // Date filtering
    const dateRange = getDateQuery(startDate, endDate);
    if (dateRange) query.timestamp = dateRange;

    // Action filtering (All, Auth, Products, etc.)
    if (action && action !== "all") query.action = action;

    const logs = await Log.find(query).sort({ timestamp: -1 }).limit(500);
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching logs" });
  }
};

// 2️⃣ Get Individual User Logs (Used in UserManagement Modal)
export const getUserLogs = async (req, res) => {
  try {
    const { userId } = req.params;
    const { startDate, endDate } = req.query; // Query params se dates aayengi
    
    let query = { actorId: userId };

    // Date filtering add karo
    const dateRange = getDateQuery(startDate, endDate);
    if (dateRange) query.timestamp = dateRange;

    const logs = await Log.find(query).sort({ timestamp: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user logs" });
  }
};

// 3️⃣ Get Individual Product Logs (Used in ProductDetails Page)
export const getProductLogs = async (req, res) => {
  try {
    const { productId } = req.params;
    const { sku, startDate, endDate } = req.query;

    console.log(`🔍 Backend Request - ID: ${productId}, SKU: ${sku}, Dates: ${startDate} to ${endDate}`);

    let filters = [];
    if (productId && productId !== "undefined") {
      filters.push({ details: { $regex: String(productId), $options: "i" } });
    }
    if (sku && sku !== "undefined") {
      filters.push({ details: { $regex: String(sku), $options: "i" } });
    }

    if (filters.length === 0) return res.json([]);

    // Base query with ID/SKU match
    let query = { $or: filters };

    // 📅 Date filtering add karo
    const dateRange = getDateQuery(startDate, endDate);
    if (dateRange) query.timestamp = dateRange;

    const logs = await Log.find(query).sort({ timestamp: -1 });

    console.log(`✅ Logs found: ${logs.length}`);
    res.status(200).json(logs);
  } catch (error) {
    console.error("❌ Log Fetch Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
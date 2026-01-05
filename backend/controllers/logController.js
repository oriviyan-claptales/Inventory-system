import Log from "../models/Log.js";

export const getLogs = async (req, res) => {
  try {
    // Latest pehle dikhaye (sort -1)
    const logs = await Log.find().sort({ timestamp: -1 }).limit(100); // Last 100 logs
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching logs" });
  }
};
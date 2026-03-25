import Sale from "../models/Sale.js";

export const getDashboardStats = async (req, res) => {
  try {
    const data = await Sale.aggregate([
      {
        $group: {
          _id: null,
          totalUnits: { $sum: "$quantity" },
          totalRevenue: { $sum: "$totalAmount" },
          totalProfit: { $sum: "$profit" }
        }
      }
    ]);

    res.json(data[0] || { totalUnits: 0, totalRevenue: 0, totalProfit: 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

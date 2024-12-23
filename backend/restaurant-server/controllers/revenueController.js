// controllers/revenueController.js
const RevenueModel = require("../models/revenueModel");

const RevenueController = {

  getDailyRevenue: async (req, res) => {
    try {
      const dailyRevenue = await RevenueModel.getDailyRevenue();
      res.json({ daily_revenue: dailyRevenue });
    } catch (err) {
      console.error("Error fetching daily revenue:", err);
      res.status(500).json({ message: "Server error" });
    }
  },
};

module.exports = RevenueController;

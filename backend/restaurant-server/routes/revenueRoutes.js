
const express = require("express");
const RevenueController = require("../controllers/revenueController");
const router = express.Router();


router.get("/daily-revenue", RevenueController.getDailyRevenue);

module.exports = router;


const db = require("../config/db");

const RevenueModel = {
  getDailyRevenue: () => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT DATE(created_at) AS date, SUM(total_price) AS total_revenue
        FROM orders
        GROUP BY DATE(created_at)
        ORDER BY DATE(created_at)
      `;
      db.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
};

module.exports = RevenueModel;

const express = require("express");
const Order = require("../models/Order");
const Menu = require("../models/Menu"); // Assuming you have a Menu model
const router = express.Router();

// Create a new order
router.post("/", (req, res) => {
  const { customer_name, phone, address, order_items } = req.body;

  if (!customer_name || !phone || !address || !order_items || order_items.length === 0) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Initialize total price
  let totalPrice = 0;

  // Replace menu_id with product details and calculate total price
  const updatedOrderItems = [];

  order_items.forEach((item) => {
    Menu.getById(item.menu_id, (err, menuItem) => {
      if (err) {
        return res.status(500).json({ error: "Error fetching menu item" });
      }

      const itemTotal = menuItem.price * item.quantity;
      totalPrice += itemTotal;

      updatedOrderItems.push({
        product_name: menuItem.name, // Add product name
        price: menuItem.price,
        quantity: item.quantity,
        total: itemTotal,
      });

      // If all items have been processed, insert order
      if (updatedOrderItems.length === order_items.length) {
        const orderData = {
          customer_name,
          phone,
          address,
          total_price: totalPrice,
          order_items: updatedOrderItems,
        };

        Order.create(orderData, (err, result) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          res.status(201).json({ message: "Order created successfully", orderId: result.insertId });
        });
      }
    });
  });
});

module.exports = router;

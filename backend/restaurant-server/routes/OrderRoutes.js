const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

// Get all orders
router.get('/', (req, res) => {
  Order.getAll((err, results) => {
    if (err) {
      console.error("Error fetching orders:", err);
      return res.status(500).json({ error: "Failed to retrieve orders" });
    }
    res.json(results);
  });
});

// Get a specific order by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;

  Order.getById(id, (err, result) => {
    if (err) {
      console.error("Error fetching order by ID:", err);
      return res.status(500).json({ error: "Failed to retrieve order" });
    }
    if (!result) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(result);
  });
});

// Create a new order
router.post('/', (req, res) => {
  const { customer_name, phone, address, order_items } = req.body;

  // Log incoming request data for debugging
  console.log("Received order data:", req.body);

  // Check if all required fields are provided
  if (!customer_name || !phone || !address || !order_items || order_items.length === 0) {
    console.log("Missing required fields:", { customer_name, phone, address, order_items });
    return res.status(400).json({ error: "All fields are required" });
  }

  const orderData = { customer_name, phone, address, order_items };

  Order.create(orderData, (err, result) => {
    if (err) {
      console.error("Error creating order:", err); // Log database error
      return res.status(500).json({ error: "Failed to create order" });
    }
    res.status(201).json({ message: "Order created successfully", orderId: result.orderId });
  });
});

// Delete an order by ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Order.deleteById(id, (err, result) => {
    if (err) {
      console.error("Error deleting order:", err);
      return res.status(500).json({ error: "Failed to delete order" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully' });
  });
});

module.exports = router;

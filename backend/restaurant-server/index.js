const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const revenueRoutes = require("./routes/revenueRoutes");
const menuRoutes = require('./routes/MenuRoutes');
const orderRoutes = require('./routes/OrderRoutes');
const orderItemRoutes = require('./routes/OrderListRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const authRoutes = require('./routes/AuthRoutes'); 
const inventoryRoutes = require('./routes/inventoryRoutes');
const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/order-items', orderItemRoutes);
app.use('/api/employee', employeeRoutes);
app.use("/api/auth", authRoutes); // Đảm bảo đường dẫn đúng
app.use("/api/revenue", revenueRoutes);
app.use('/api/inventory', inventoryRoutes);
// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

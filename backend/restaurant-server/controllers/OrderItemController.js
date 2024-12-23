const OrderItem = require('../models/OrderItem');

class OrderItemController {
    // Lấy tất cả các mục
    static getAll(req, res) {
        OrderItem.getAll((err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        });
    }

    // Lấy mục theo ID
    static getById(req, res) {
        const { id } = req.params;
        OrderItem.getById(id, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!result.length) return res.status(404).json({ error: 'Order item not found' });
            res.json(result[0]);
        });
    }

    // Tạo mục mới
    static create(req, res) {
        const { order_id, menu_id, quantity } = req.body;
        if (!order_id || !menu_id || !quantity) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const data = { order_id, menu_id, quantity };
        OrderItem.create(data, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'Order item created successfully', id: result.insertId });
        });
    }

    // Cập nhật mục
    static update(req, res) {
        const { id } = req.params;
        const { order_id, menu_id, quantity } = req.body;
        if (!order_id || !menu_id || !quantity) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const data = { order_id, menu_id, quantity };
        OrderItem.updateById(id, data, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ error: 'Order item not found' });
            res.json({ message: 'Order item updated successfully' });
        });
    }

    // Xóa mục
    static delete(req, res) {
        const { id } = req.params;
        OrderItem.deleteById(id, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ error: 'Order item not found' });
            res.json({ message: 'Order item deleted successfully' });
        });
    }
}

module.exports = OrderItemController;

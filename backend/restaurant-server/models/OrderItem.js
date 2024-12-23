const db = require('../config/db');

class OrderItem {
    // Lấy tất cả các mục trong bảng order_items
    static getAll(callback) {
        const sql = 'SELECT * FROM order_items';
        db.query(sql, callback);
    }

    // Lấy mục cụ thể theo ID
    static getById(id, callback) {
        const sql = 'SELECT * FROM order_items WHERE id = ?';
        db.query(sql, [id], callback);
    }

    // Thêm mục mới
    static create(data, callback) {
        const sql = 'INSERT INTO order_items (order_id, menu_id, quantity) VALUES (?, ?, ?)';
        db.query(sql, [data.order_id, data.menu_id, data.quantity], callback);
    }

    // Cập nhật mục
    static updateById(id, data, callback) {
        const sql = 'UPDATE order_items SET order_id = ?, menu_id = ?, quantity = ? WHERE id = ?';
        db.query(sql, [data.order_id, data.menu_id, data.quantity, id], callback);
    }

    // Xóa mục theo ID
    static deleteById(id, callback) {
        const sql = 'DELETE FROM order_items WHERE id = ?';
        db.query(sql, [id], callback);
    }
}

module.exports = OrderItem;

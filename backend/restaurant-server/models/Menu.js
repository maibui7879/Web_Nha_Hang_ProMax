const db = require('../config/db');

class Menu {
    // Get all menu items
    static getAll(callback) {
        const sql = 'SELECT * FROM menu';
        db.query(sql, callback);
    }

    static getById(id, callback) {
        const sql = 'SELECT * FROM menu WHERE id = ?';
        db.query(sql, [id], (err, results) => {
            if (err) return callback(err);
            if (results.length === 0) {
                return callback(new Error("Menu item not found"));
            }
            callback(null, results[0]);
        });
    }

    static create(menuData, callback) {
        const { name, description, price, category, image_url } = menuData;
        const sql = 'INSERT INTO menu (name, description, price, category, image_url) VALUES (?, ?, ?, ?, ?)';
        db.query(sql, [name, description, price, category, image_url], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    }


    static update(id, menuData, callback) {
        const { name, description, price, category, image_url } = menuData;
        const sql = 'UPDATE menu SET name = ?, description = ?, price = ?, category = ?, image_url = ? WHERE id = ?';
        db.query(sql, [name, description, price, category, image_url, id], (err, result) => {
            if (err) return callback(err);
            if (result.affectedRows === 0) {
                return callback(new Error("Menu item not found"));
            }
            callback(null, result);
        });
    }


    static delete(id, callback) {
        const sql = 'DELETE FROM menu WHERE id = ?';
        db.query(sql, [id], (err, result) => {
            if (err) return callback(err);
            if (result.affectedRows === 0) {
                return callback(new Error("Menu item not found"));
            }
            callback(null, result);
        });
    }
}

module.exports = Menu;


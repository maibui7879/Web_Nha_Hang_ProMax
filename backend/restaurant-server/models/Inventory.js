const db = require('../config/db');

const Inventory = {
  getAll: (callback) => {
    db.query('SELECT * FROM inventory', callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM inventory WHERE id = ?', [id], callback);
  },

  add: (data, callback) => {
    // Loại bỏ `tong_gia` trước khi thêm
    const { tong_gia, ...filteredData } = data;
    db.query('INSERT INTO inventory SET ?', [filteredData], callback);
  },

  update: (id, data, callback) => {
    // Loại bỏ `tong_gia` trước khi cập nhật
    const { tong_gia, ...filteredData } = data;
    db.query('UPDATE inventory SET ? WHERE id = ?', [filteredData, id], callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM inventory WHERE id = ?', [id], callback);
  },
};

module.exports = Inventory;

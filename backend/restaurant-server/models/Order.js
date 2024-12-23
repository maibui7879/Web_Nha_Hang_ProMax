const db = require('../config/db');
const Menu = require('./Menu'); // Assuming you have a Menu model to get menu items

class Order {
  static create(orderData, callback) {
    const { customer_name, phone, address, order_items } = orderData;
    let totalPrice = 0;
    
    // Fetch menu items and calculate total price
    const itemPricePromises = order_items.map((item) => {
      return new Promise((resolve, reject) => {
        Menu.getById(item.menu_id, (err, menuItem) => {
          if (err || !menuItem) {
            reject(new Error('Menu item not found'));
          } else {
            totalPrice += menuItem.price * item.quantity;
            resolve({
              product_name: menuItem.name,
              price: menuItem.price,
              quantity: item.quantity,
              total: menuItem.price * item.quantity,
              menu_id: item.menu_id,  // Retaining menu_id for order items insertion
            });
          }
        });
      });
    });

    // Wait for all price calculations to complete
    Promise.all(itemPricePromises)
      .then((updatedOrderItems) => {
        const sql = 'INSERT INTO orders (customer_name, phone, address, total_price) VALUES (?, ?, ?, ?)';
        db.query(sql, [customer_name, phone, address, totalPrice], (err, result) => {
          if (err) {
            return callback(err);
          }

          const orderId = result.insertId;

          // Insert order items into order_items table
          const orderItemPromises = updatedOrderItems.map((item) => {
            const sqlItems = 'INSERT INTO order_items (order_id, menu_id, quantity) VALUES (?, ?, ?)';
            return new Promise((resolve, reject) => {
              db.query(sqlItems, [orderId, item.menu_id, item.quantity], (err) => {
                if (err) reject(err);
                else resolve();
              });
            });
          });

          // Wait for all order items to be inserted
          Promise.all(orderItemPromises)
            .then(() => {
              callback(null, { orderId, totalPrice });
            })
            .catch((err) => callback(err));
        });
      })
      .catch((err) => callback(err));
  }

  // Example to get all orders
  static getAll(callback) {
    const sql = 'SELECT * FROM orders';
    db.query(sql, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }

  // Example to get a specific order by ID
  static getById(orderId, callback) {
    const sql = 'SELECT * FROM orders WHERE id = ?';
    db.query(sql, [orderId], (err, result) => {
      if (err) return callback(err);
      callback(null, result[0]);
    });
  }
  static deleteById(id, callback) {
    const deleteItemsSql = 'DELETE FROM order_items WHERE order_id = ?';
    const deleteOrderSql = 'DELETE FROM orders WHERE id = ?';

    db.query(deleteItemsSql, [id], (err) => {
        if (err) return callback(err);

        db.query(deleteOrderSql, [id], callback);
    });
}


}

module.exports = Order;

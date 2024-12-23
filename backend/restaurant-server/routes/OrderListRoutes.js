const express = require('express');
const OrderItemController = require('../controllers/OrderItemController');

const router = express.Router();

router.get('/', OrderItemController.getAll);          // Lấy tất cả các mục
router.get('/:id', OrderItemController.getById);      // Lấy mục theo ID
router.post('/', OrderItemController.create);         // Tạo mục mới
router.put('/:id', OrderItemController.update);       // Cập nhật mục
router.delete('/:id', OrderItemController.delete);    // Xóa mục

module.exports = router;

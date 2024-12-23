const express = require('express');
const MenuController = require('../controllers/MenuController');
const router = express.Router();

// Lấy toàn bộ menu
router.get('/', MenuController.getMenu);

// Lấy menu theo ID
router.get('/:id', MenuController.getMenuById);

// Thêm món ăn mới vào menu
router.post('/', MenuController.createMenu);

// Cập nhật thông tin món ăn
router.put('/:id', MenuController.updateMenu);

// Xóa món ăn
router.delete('/:id', MenuController.deleteMenu);

module.exports = router;

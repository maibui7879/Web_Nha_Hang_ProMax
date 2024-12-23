// authRoutes.js
const express = require("express");
const router = express.Router();
const db = require("../config/db");


router.get("/accounts", (req, res) => {
  const query = "SELECT taiKhoan, matKhau FROM nhanvien"; 

  db.query(query, (err, results) => {
    if (err) {
      console.error("Lỗi truy vấn: ", err);
      return res.status(500).json({ message: "Lỗi máy chủ." });
    }

    if (results.length > 0) {
      return res.status(200).json({
        message: "Lấy tất cả tài khoản thành công.",
        accounts: results 
      });
    } else {
      return res.status(404).json({ message: "Không có tài khoản nào." });
    }
  });
});


router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT taiKhoan, matKhau FROM nhanvien WHERE taiKhoan = ? AND matKhau = ?";

  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error("Lỗi truy vấn: ", err);
      return res.status(500).json({ message: "Lỗi máy chủ." });
    }

    if (results.length > 0) {
      return res.status(200).json({
        message: "Đăng nhập thành công.",
      });
    } else {
      return res.status(401).json({
        message: "Sai tài khoản hoặc mật khẩu.",
      });
    }
  });
});

module.exports = router;

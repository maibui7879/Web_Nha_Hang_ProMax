const db = require('../config/db');

class Employee {
    static getAll(callback) {
        db.query('SELECT * FROM NhanVien', callback);
    }

    static create(data, callback) {
        const query = `INSERT INTO NhanVien (ten, taiKhoan, matKhau, tuoi, sdt, ngaySinh, gioiTinh, chucVu) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        db.query(query, [data.ten, data.taiKhoan, data.matKhau, data.tuoi, data.sdt, data.ngaySinh, data.gioiTinh, data.chucVu], callback);
    }

    static update(id, data, callback) {
        const query = `UPDATE NhanVien SET ten = ?, taiKhoan = ?, matKhau = ?, tuoi = ?, sdt = ?, ngaySinh = ?, gioiTinh = ?, chucVu = ? 
                       WHERE id = ?`;
        db.query(query, [data.ten, data.taiKhoan, data.matKhau, data.tuoi, data.sdt, data.ngaySinh, data.gioiTinh, data.chucVu, id], callback);
    }

    static delete(id, callback) {
        db.query('DELETE FROM NhanVien WHERE id = ?', [id], callback);
    }
}

module.exports = Employee;

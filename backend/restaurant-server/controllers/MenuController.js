const Menu = require('../models/Menu');

class MenuController {

    static getMenu(req, res) {
        Menu.getAll((err, results) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json(results);
        });
    }

    static getMenuById(req, res) {
        const { id } = req.params;
        Menu.getById(id, (err, result) => {
            if (err) {
                if (err.message === "Menu item not found") {
                    return res.status(404).json({ error: err.message });
                }
                res.status(500).json({ error: err.message });
                return;
            }
            res.json(result);
        });
    }

static createMenu(req, res) {
    const { name, description, price, category, image_url } = req.body;
    if (!name || !price || !category || !image_url) {
        return res.status(400).json({ error: "Name, price, category, and image_url are required" });
    }
    const menuData = { name, description, price, category, image_url };
    Menu.create(menuData, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ message: "Menu item created successfully", result });
    });
}

// Cập nhật menu item
static updateMenu(req, res) {
    const { id } = req.params;
    const { name, description, price, category, image_url } = req.body;
    if (!name || !price || !category || !image_url) {
        return res.status(400).json({ error: "Name, price, category, and image_url are required" });
    }
    const menuData = { name, description, price, category, image_url };
    Menu.update(id, menuData, (err, result) => {
        if (err) {
            if (err.message === "Menu item not found") {
                return res.status(404).json({ error: err.message });
            }
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: "Menu item updated successfully", result });
    });
}


    // Xóa menu item
    static deleteMenu(req, res) {
        const { id } = req.params;
        Menu.delete(id, (err, result) => {
            if (err) {
                if (err.message === "Menu item not found") {
                    return res.status(404).json({ error: err.message });
                }
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ message: "Menu item deleted successfully" });
        });
    }
}

module.exports = MenuController;

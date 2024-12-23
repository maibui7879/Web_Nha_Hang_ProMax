const Inventory = require('../models/Inventory');

const getAllItems = (req, res) => {
  Inventory.getAll((err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving items', error: err });
    }
    res.json(rows);
  });
};

const getItemById = (req, res) => {
  const { id } = req.params;
  Inventory.getById(id, (err, row) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving item', error: err });
    }
    if (!row.length) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(row[0]);
  });
};

const addItem = (req, res) => {
  const newItem = req.body;
  Inventory.add(newItem, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error adding item', error: err });
    }
    res.status(201).json({ message: 'Item added', id: result.insertId });
  });
};

const updateItem = (req, res) => {
  const { id } = req.params;
  const updatedItem = req.body;
  Inventory.update(id, updatedItem, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating item', error: err });
    }
    res.json({ message: 'Item updated', affectedRows: result.affectedRows });
  });
};

const deleteItem = (req, res) => {
  const { id } = req.params;
  Inventory.delete(id, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting item', error: err });
    }
    res.json({ message: 'Item deleted', affectedRows: result.affectedRows });
  });
};

module.exports = {
  getAllItems,
  getItemById,
  addItem,
  updateItem,
  deleteItem,
};

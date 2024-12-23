const Employee = require('../models/Employee');

class employeeController {
    static getAll(req, res) {
        Employee.getAll((err, results) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.json(results);
            }
        });
    }

    static create(req, res) {
        const data = req.body;
        Employee.create(data, (err, results) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.status(201).json({ message: 'Created successfully', id: results.insertId });
            }
        });
    }

    static update(req, res) {
        const id = req.params.id;
        const data = req.body;
        Employee.update(id, data, (err) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.json({ message: 'Updated successfully' });
            }
        });
    }

    static delete(req, res) {
        const id = req.params.id;
        Employee.delete(id, (err) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.json({ message: 'Deleted successfully' });
            }
        });
    }
}

module.exports = employeeController;

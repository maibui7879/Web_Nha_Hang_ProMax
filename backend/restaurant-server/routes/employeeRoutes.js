const express = require('express');
const EmployeeController = require('../controllers/employeeController');

const router = express.Router();

router.get('/', EmployeeController.getAll);
router.post('/', EmployeeController.create);
router.put('/:id', EmployeeController.update);
router.delete('/:id', EmployeeController.delete);

module.exports = router;

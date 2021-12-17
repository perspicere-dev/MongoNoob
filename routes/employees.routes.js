const express = require('express');
const router = express.Router();
const EmployeesController = require('../controllers/employees.controller')

router.get('/employees', EmployeesController.getAll);

router.get('/employees/random', EmployeesController.getRandom);

router.get('/employees/:id', EmployeesController.getOneById);

router.post('/employees', EmployeesController.post);

router.put('/employees/:id', EmployeesController.putById);

router.delete('/employees/:id', EmployeesController.deleteById);

module.exports = router;


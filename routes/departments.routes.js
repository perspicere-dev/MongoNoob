const express = require('express');
const router = express.Router();
const Department = require('../models/department.model');
const DepartmentController = require('../controllers/departments.controller')

router.get('/departments', DepartmentController.getAll);

router.get('/departments/random', DepartmentController.getRandom);

router.get('/departments/:id', DepartmentController.getOneById);

router.post('/departments', DepartmentController.post);

router.put('/departments/:id', DepartmentController.putById);

router.delete('/departments/:id', DepartmentController.deleteById);

module.exports = router;


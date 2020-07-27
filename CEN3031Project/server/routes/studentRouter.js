var express = require('express');
var students = require('../controllers/studentController.js');
var verifyToken = require('../authHelperFunctions').verifyToken;

const studentRouter = new express.Router();

studentRouter.post('/', students.create);

studentRouter.post('/authenticate', students.authenticateStudent);

studentRouter.get('/getStudent/:id', students.getOneStudent);

studentRouter.get('/getAllStudents', students.getAllStudents);

studentRouter.use(verifyToken);//middleware to protect routes

// did not do /:id to update/delete yet

module.exports = studentRouter;
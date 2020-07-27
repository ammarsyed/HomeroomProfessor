var express = require('express');
var professors = require('../controllers/professorController.js')
var verifyToken = require('../authHelperFunctions').verifyToken;

const professorRouter = new express.Router();

professorRouter.post('/', professors.create);

professorRouter.post('/addRequest', professors.addStudentToProfessor)

professorRouter.post('/authenticate', professors.authenticateProfessor);

professorRouter.get('/getStudent/:id', professors.getOneProfessor);

professorRouter.use(verifyToken);//middleware to protect routes

// did not do /:id to update/delete yet


module.exports = professorRouter;
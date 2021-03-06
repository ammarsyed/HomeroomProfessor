var express = require('express');
var professors = require('../controllers/professorController.js')
var verifyToken = require('../authHelperFunctions').verifyToken;

const professorRouter = new express.Router();

professorRouter.post('/', professors.create);

professorRouter.get('/', professors.checkLogin);

professorRouter.post('/addRequest', professors.addStudentToProfessor);

professorRouter.post('/confirmRequest', professors.addMeetingDate);

professorRouter.post('/authenticate', professors.authenticateProfessor);

professorRouter.get('/getProfessor/:id', professors.getOneProfessor);

professorRouter.get('/getAllProfessors', professors.getAllProfessors);

professorRouter.post('/getUpdatedProfessor', professors.getUpdatedProfessor);


professorRouter.use(verifyToken);//middleware to protect routes

// did not do /:id to update/delete yet


module.exports = professorRouter;
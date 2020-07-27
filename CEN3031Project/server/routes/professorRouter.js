// import express from 'express';
// import * as professors from '../controllers/professorController.js';

var express = require('express');
var professors = require('../controllers/professorController.js')
var verifyToken = require('../authHelperFunctions').verifyToken;

// const professorRouter = express.Router();
const professorRouter = new express.Router();

professorRouter.post('/', professors.create);

professorRouter.get('/', professors.checkLogin);//not to be used anymore

professorRouter.post('/authenticate', professors.authenticateProfessor);

professorRouter.get('/getProfessor/:id', professors.getOneProfessor); //fixed typo to getProfessor

professorRouter.use(verifyToken);//middleware to protect routes

// did not do /:id to update/delete yet


// export default professorRouter;
// module.exports.professorRouter = professorRouter;
module.exports = professorRouter;
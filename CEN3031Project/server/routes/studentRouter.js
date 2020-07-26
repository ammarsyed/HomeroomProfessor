// import express from 'express';
// import * as students from '../controllers/studentController.js';

// import {verifyToken} from '../authHelperFunctions.js';

var express = require('express');
var students = require('../controllers/studentController.js');
var verifyToken = require('../authHelperFunctions').verifyToken;

// const studentRouter = express.Router();
const studentRouter = new express.Router();

studentRouter.post('/', students.create);

studentRouter.get('/', students.checkLogin);//not to be used anymore

studentRouter.post('/authenticate', students.authenticateStudent);

studentRouter.get('/getStudent/:id', students.getOneStudent);


studentRouter.use(verifyToken);//middleware to protect routes

// did not do /:id to update/delete yet

// export default studentRouter;

module.exports = studentRouter;
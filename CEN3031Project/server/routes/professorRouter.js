// import express from 'express';
// import * as professors from '../controllers/professorController.js';

var express = require('express');
var professors = require('../controllers/professorController.js')

// const professorRouter = express.Router();
const professorRouter = new express.Router();

professorRouter.post('/', professors.create);

professorRouter.get('/', professors.checkLogin);

// export default professorRouter;
// module.exports.professorRouter = professorRouter;
module.exports = professorRouter;
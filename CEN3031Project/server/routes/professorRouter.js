import express from 'express';
import * as professors from '../controllers/professorController.js';

const professorRouter = express.Router();

professorRouter.post('/', professors.create);

export default professorRouter;
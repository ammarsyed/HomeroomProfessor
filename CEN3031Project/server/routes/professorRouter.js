import express from 'express';
import * as professors from '../controllers/professorController.js';

const professorRouter = express.Router();

professorRouter.post('/', professors.create);

professorRouter.get('/', professors.checkLogin);

professorRouter.get('/professorList', professors.professorList)

export default professorRouter;
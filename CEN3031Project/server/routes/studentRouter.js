import express from 'express';
import * as students from '../controllers/studentController.js';

const studentRouter = express.Router();

studentRouter.post('/', students.create);

export default studentRouter;
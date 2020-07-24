import express from 'express';
import * as students from '../controllers/studentController.js';

import {verifyToken} from '../authHelperFunctions.js';

const studentRouter = express.Router();

studentRouter.post('/', students.create);

studentRouter.get('/', students.checkLogin);//not to be used anymore

studentRouter.post('/authenticate', students.authenticateStudent);

studentRouter.use(verifyToken);//middleware to protect routes

// did not do /:id to update/delete yet

export default studentRouter;
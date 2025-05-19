import express from 'express';
import { getDivisions, createDivision, uploadMiddleware } from '../controllers/divisionController.js';

const divisionRoutes = express.Router();

divisionRoutes.get('/', getDivisions);
divisionRoutes.post('/', uploadMiddleware, createDivision);

export default divisionRoutes;
import express from 'express';
import { getDivisions, createDivision } from '../controllers/divisionController.js';

const divisionRoutes = express.Router();

divisionRoutes.get('/', getDivisions);
divisionRoutes.post('/', createDivision);

export default divisionRoutes;
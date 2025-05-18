import express from 'express';
import { getQuestions, createQuestion } from '../controllers/questionController.js';

const questionRoutes = express.Router();

questionRoutes.get('/', getQuestions);
questionRoutes.post('/', createQuestion);

export default questionRoutes;
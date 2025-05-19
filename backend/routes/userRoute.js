import express from 'express';
import {
  createUser,
  deleteUser,
  getUsers,
  loginUser,
  updateScore,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/create-user', createUser);
router.get('/users', getUsers);
router.post('/login', loginUser);
router.post('/update-score', updateScore);
router.delete('/users/:id', deleteUser);

export default router;

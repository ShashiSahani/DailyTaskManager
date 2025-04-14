// routes/userRoutes.js
import express from 'express';
import {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
  toggleActiveStatus,
  resetPassword,
  updateUserRole,
} from '../controllers/userController.js';

const router = express.Router();

// Routes
router.get('/', getAllUsers); // GET all users
router.post('/', addUser); // POST new user
router.put('/:id', updateUser); // PUT update user
router.delete('/:id', deleteUser); // DELETE user
router.patch('/toggle/:id', toggleActiveStatus); // PATCH activate/deactivate
router.patch('/reset-password/:id', resetPassword); // PATCH reset password
router.patch('/role/:id', updateUserRole); // PATCH update role

export default router;

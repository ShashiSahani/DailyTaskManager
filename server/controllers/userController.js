// userController.js (ES Module format)

import User from '../models/userModel.js';
import bcrypt from 'bcrypt';

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Add a user
export const addUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashed, role });
    res.status(201).json({ message: 'User created', user: newUser });
  } catch (error) {
    res.status(400).json({ error: 'Failed to add user', detail: error });
  }
};

// Edit a user
export const updateUser = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update user' });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete user' });
  }
};

// Activate/Deactivate
// controllers/userController.js
export const toggleActiveStatus = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Ensure user model has `isActive` field
      user.isActive = !user.isActive;
      await user.save();
  
      res.json({ message: `User ${user.isActive ? 'activated' : 'deactivated'}`, user });
    } catch (error) {
      console.error('Toggle error:', error);
      res.status(400).json({ error: 'Failed to toggle status', details: error.message });
    }
  };
  

// Reset password
export const resetPassword = async (req, res) => {
  try {
    const hashed = await bcrypt.hash(req.body.password, 10);
    await User.findByIdAndUpdate(req.params.id, { password: hashed });
    res.json({ message: 'Password updated' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to reset password' });
  }
};

// Update role
export const updateUserRole = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { role: req.body.role });
    res.json({ message: 'Role updated' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update role' });
  }
};

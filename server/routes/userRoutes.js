// Import necessary modules
import express from 'express';
import { getUserProfile, followUser } from '../controllers/userController.js';

// Create an Express router
const router = express.Router();

// Define API routes
router.get('/profile/:id', getUserProfile);
// router.post('/follow/:userId', followUser);

// Export the router
export default router;

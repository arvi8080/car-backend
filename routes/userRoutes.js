import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.js';

const router = express.Router();

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// GET route for testing (returns a message)
router.get('/login', (req, res) => {
  res.json({ message: 'Login endpoint is working. Use POST to login.' });
});

export default router;

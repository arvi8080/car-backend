import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import connectDB from './configs/db.js';
import User from './models/User.js';
import bcrypt from 'bcryptjs';
import { registerUser } from './controllers/userController.js';

import userRoutes from './routes/userRoutes.js';
import paymentRoutes from './routes/payment.js';
import { createBooking, getBookings, updateBookingStatus } from './controllers/bookingController.js';
import auth from './middleware/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

// Connect to MongoDB
connectDB();

// Allowed origins for frontend
const ALLOWED_ORIGINS = [
  "http://localhost:5173", // local Vite dev
  "http://localhost:5174", // local Vite preview
  "http://localhost:4173", // local Vite preview
  "http://localhost:4174", // local Vite preview (current)
  "http://localhost:3000", // local React dev
  "https://caronchoice.netlify.app" // your Netlify production site
];

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (ALLOWED_ORIGINS.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  })
);

// Health check route
app.get('/', (req, res) => {
  res.send({ status: 'OK', message: 'RentCar API is running!' });
});

// Routes
app.use('/api/user', userRoutes);
app.use('/api', paymentRoutes);

// Booking routes
app.post('/api/booking', auth, createBooking);
app.get('/api/booking', auth, getBookings);
app.put('/api/booking/:id/pay', auth, updateBookingStatus);

// Example Cars route
app.get('/api/cars', (req, res) => {
  res.json([
    { id: 1, brand: 'Toyota', model: 'Camry', year: 2022 },
    { id: 2, brand: 'Honda', model: 'Civic', year: 2021 }
  ]);
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

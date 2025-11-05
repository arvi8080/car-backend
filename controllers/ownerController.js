// Owner controller for backend API
// Add car, get cars, update car, delete car, etc.
import Car from '../models/Car.js';

export const addCar = async (req, res) => {
  // Implement add car logic here
  res.json({ success: true, message: 'Car added (stub)' });
};

export const getOwnerCars = async (req, res) => {
  // Implement logic to get cars for owner here
  res.json({ success: true, cars: [] });
};
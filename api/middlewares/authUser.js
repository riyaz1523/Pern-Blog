import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';
import dotenv from 'dotenv';
dotenv.config();

export const authUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from `Authorization` header

  console.log('Token received in middleware:', token);

  if (!token) return next(errorHandler(401, 'You are not authenticated!'));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, 'Token is not valid!'));

    req.user = user;
    next();
  });
};

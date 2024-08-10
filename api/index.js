import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
const app = express();
import pool from './db/index.js';
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import storyRoutes from './routes/storyRoutes.js'
import commentRoutes from './routes/commentRoutes.js'
import likeRoutes from './routes/likeRoutes.js'

const allowedOrigins = [
    'http://localhost:5173',
  ];

  app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, // Allow credentials (cookies) to be sent
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
  
  
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/story', storyRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/like', likeRoutes);
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

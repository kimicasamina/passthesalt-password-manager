import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from './v2/middlewares/error.middleware.js';
import authRoutes from './v2/routes/auth.routes.js';

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(helmet());

// Routes
app.use('/api/v2/auths', authRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;

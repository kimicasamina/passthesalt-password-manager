import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import { corsOption } from './v2/utils/corsOption.js';
import helmet from 'helmet';
import authRoutes from './v2/routes/auth.routes.js';
import loginRoutes from './v2/routes/login.routes.js';
import folderRoutes from './v2/routes/folder.routes.js';
import noteRoutes from './v2/routes/note.routes.js';
// import { errorHandler } from './v2/middlewares/error.middleware.js';
import { ErrorHandler } from './v2/middlewares/error.handler.middleware.js';
dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
app.use(corsOption);

app.use('/api/v2/auths', authRoutes);
app.use('/api/v2/logins', loginRoutes);
app.use('/api/v2/folders', folderRoutes);
app.use('/api/v2/notes', noteRoutes);

// Global error handler
// app.use(ErrorHandler);

// // global error handler
app.use('*', (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err.message);
});

export default app;

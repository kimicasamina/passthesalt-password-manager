import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { logger } from './v1/middleware/logEvents';
import connection from './v1/db/config/connection';
import userRouter from './v1/api/routes/user';
import authRouter from './v1/api/routes/auth';
import loginRouter from './v1/api/routes/login';
import folderRouter from './v1/api/routes/folder';
import noteRouter from './v1/api/routes/note';
import verifyToken from './v1/middleware/verifyToken';

dotenv.config();

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? process.env.CLIENT_URL
        : 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true, // Allow sending cookies
  }),
);

// custom middleware logger
app.use(logger);

// Serve static files from the 'client/build' folder
app.use(express.static(path.join(__dirname, '../../client/dist')));

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  const rootDir = path.resolve(__dirname, '..');

  app.get('*', (req, res) =>
    res.sendFile(path.join(rootDir, 'client', 'dist', 'index.html')),
  );
} else {
  app.get('/', (req, res) => res.send('Server is ready...'));
}

// endpoints
app.get('/api', (req, res) => {
  console.log('API...');
  return res.json({ msg: 'API ENDPOINT' });
});

app.use('/api/users', verifyToken, userRouter);
app.use('/api/logins', verifyToken, loginRouter);
app.use('/api/notes', verifyToken, noteRouter);
app.use('/api/folders', verifyToken, folderRouter);
app.use('/api/auth', authRouter);

if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React app
  app.use(express.static(path.resolve(__dirname, '../client/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
  });
}

// global error handler
app.use('*', (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err.message);
});

// app.listen(process.env.PORT, async () => {
//   console.log(
//     `Server running on port ${process.env.PORT} \nin ${process.env.NODE_ENV} mode`
//   );

//   connection();
// });

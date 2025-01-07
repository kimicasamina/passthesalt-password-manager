import express from 'express';
import app from './app';
import logger from './utils/logger';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5555;
const NODE_ENV = process.env.NODE_ENV;

app.listen(PORT, async () => {
  NODE_ENV === 'development'
    ? console.log(`Server running on port ${PORT} \nin ${NODE_ENV} mode`)
    : logger();
  //   connection();
});

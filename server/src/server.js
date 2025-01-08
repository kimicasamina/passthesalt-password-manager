import app from './app';
import dotenv from 'dotenv';
import sequelize from './v2/config/db.config';

dotenv.config();

const PORT = process.env.PORT || 5555;
const NODE_ENV = process.env.NODE_ENV || 'development';

const startServer = async () => {
  try {
    // await sequelize.authenticate(); // For prod
    await sequelize.sync({ force: true }); // For dev
    // await sequelize.sync({ alter: true }); // For dev
    console.log('Database connected successfully');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} in ${NODE_ENV} mode`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1); // Exit on DB connection failure
  }
};

startServer();

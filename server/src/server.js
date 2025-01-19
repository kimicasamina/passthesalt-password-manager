// server.js
import app from './app';
import dotenv from 'dotenv';
import sequelize from './v2/config/db.config';

dotenv.config();

const PORT = process.env.PORT || 5555;

const startServer = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database connected successfully');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

startServer();

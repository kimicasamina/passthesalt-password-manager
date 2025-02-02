import { sequelize } from "../models";

async function connection() {
  try {
    await sequelize.sync({ force: true });
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

export default connection;

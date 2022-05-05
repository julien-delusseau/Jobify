import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: "localhost",
    dialect: "mariadb",
    logging: false,
    dialectOptions: {
      timezone: "local",
    },
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { connectDB, sequelize };

import { Sequelize } from "sequelize";

// import * as pg from 'pg'

// Connect to database
export const db = new Sequelize(process.env.DB_URL as string, {
  dialect: "postgres",
});

import { DataTypes } from "sequelize";
import { db } from "..";

export const RadonGwl = db.define(
  "radon_gwl",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    radon_concentration: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    ground_water_level: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    createdAt: true,
    freezeTableName: true,
  },
);

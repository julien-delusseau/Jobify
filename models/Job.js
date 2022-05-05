import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.js";
import User from "./User.js";

class Job extends Model {}

Job.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["entrevue", "refusé", "en cours"],
      defaultValue: "en cours",
      validate: {
        isIn: {
          args: [["entrevue", "refusé", "en cours"]],
          msg: "Le status doit être: 'entrevue', 'refusé' ou 'en cours'",
        },
      },
    },
    jobType: {
      type: DataTypes.ENUM,
      values: ["CDI", "CDD", "télétravail", "stage"],
      defaultValue: "CDI",
      validate: {
        isIn: {
          args: [["CDI", "CDD", "télétravail", "stage"]],
          msg: "Le type doit être: 'CDI', 'CDD', 'télétravail' ou 'stage'",
        },
      },
    },
    jobLocation: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Ma ville",
    },
  },
  {
    sequelize,
    modelName: "Job",
  }
);

User.hasMany(Job);
Job.belongsTo(User);

Job.sync();

export default Job;

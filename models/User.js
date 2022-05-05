import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class User extends Model {
  createJWT() {
    return jwt.sign({ userId: this.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME,
    });
  }

  decodePassword(password) {
    return bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue("name");
      },
      set(value) {
        return this.setDataValue("name", value.trim());
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email déjà présente en base de données",
      },
      validate: {
        isEmail: {
          msg: "Adresse email invalide",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      defaultValue: "Non défini",
      get() {
        return this.getDataValue("lastname");
      },
      set(value) {
        return this.setDataValue("lastname", value.trim());
      },
    },
    location: {
      type: DataTypes.STRING,
      defaultValue: "Non défini",
      get() {
        return this.getDataValue("location");
      },
      set(value) {
        return this.setDataValue("location", value.trim());
      },
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

User.sync();

User.beforeCreate(async (user, options) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

User.afterCreate(async (user, options) => {
  delete user.dataValues.password;
});

User.afterUpdate(async (user, options) => {
  delete user.dataValues.password;
});

export default User;

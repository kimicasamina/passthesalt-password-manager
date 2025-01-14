// models/user.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { encrypt } from '../utils/encryptionHandler.js';

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: uuidv4,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // id: {
    //   type: DataTypes.UUID,
    //   primaryKey: true,
    //   defaultValue: uuidv4,
    // },
    // username: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   unique: true,
    // },
    // email: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   unique: true,
    // },
    // password: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
  },
  {
    timestamps: true,
    hooks: {
      beforeCreate: async (user) => {
        const hashed = await hashPassword(user.password); // Encrypt password
        user.password = hashed;
      },
    },
  },
);

// Utility function to hash passwords
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export default User;

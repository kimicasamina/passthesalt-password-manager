// models/user.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { encrypt } from '../utils/encryptionHandler.js';
import { hashPassword } from '../utils/bcryptUtils.js';

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
        // Hash password before storing
        if (user.password) {
          const hashedPassword = await hashPassword(user.password, 10);
          user.password = hashedPassword;
        }
      },
    },
    defaultScope: {
      attributes: {
        exclude: ['password'], // Exclude password by default
      },
    },
    scopes: {
      withPassword: {
        attributes: { include: ['password'] }, // Include password
      },
      withoutPassword: {
        attributes: { exclude: ['password'] }, // Exclude password
      },
    },
  },
);

// Utility function to hash passwords
// const hashPassword = async (password) => {
//   const salt = await bcrypt.genSalt(10);
//   return await bcrypt.hash(password, salt);
// };

export default User;

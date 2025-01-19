import { encrypt } from '../utils/encryptionHandler.js';
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';
import { v4 as uuidv4 } from 'uuid';

const Login = sequelize.define(
  'Login',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: uuidv4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    iv: {
      type: DataTypes.STRING,
      allowNull: true, // iv cannot be null
    },
    website: {
      type: DataTypes.STRING,
    },
    favorites: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    // folder_id: {
    //   type: DataTypes.UUID,
    //   allowNull: true,
    // },
    // user_id: {
    //   type: DataTypes.UUID,
    //   allowNull: false,
    // },
  },
  {
    timestamps: true,
    hooks: {
      beforeCreate: async (login) => {
        try {
          // Encrypt the password before saving to the database
          const encryptedData = await encrypt(login.password);
          login.password = encryptedData.password; // Store the encrypted password
          login.iv = encryptedData.iv; // Store the IV
        } catch (error) {
          console.error('Error encrypting password:', error);
          throw new Error('Failed to encrypt password');
        }
      },
      beforeUpdate: async (login) => {
        if (login.changed('password')) {
          try {
            // Encrypt password if it has changed
            const encryptedData = await encrypt(login.password);
            login.password = encryptedData.password;
            login.iv = encryptedData.iv;
          } catch (error) {
            console.error('Error encrypting password:', error);
            throw new Error('Failed to encrypt password');
          }
        }
      },
    },
  },
);

export default Login;

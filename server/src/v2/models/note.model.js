import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';
import { v4 as uuidv4 } from 'uuid';

const Note = sequelize.define(
  'Note',
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
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // folder_id: {
    //   type: DataTypes.UUID,
    //   allowNull: true,
    // },
    // user_id: {
    //   type: DataTypes.UUID,
    //   allowNull: true,
    // },
  },
  {
    timestamps: true,
  },
);

export default Note;

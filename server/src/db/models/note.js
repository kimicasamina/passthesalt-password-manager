"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, { foreignKey: "user_id", as: "user" });
    }
    toJSON() {
      return { ...this.get(), id: undefined, user_id: undefined };
    }
  }
  Note.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Name is already taken",
        },
        validate: {
          notNull: { msg: "A name is required" },
          notEmpty: { msg: "Please provide a name" },
        },
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "A content is required" },
          notEmpty: { msg: "Please provide a content" },
        },
      },
    },
    {
      sequelize,
      tableName: "notes",
      modelName: "Note",
    }
  );
  return Note;
};

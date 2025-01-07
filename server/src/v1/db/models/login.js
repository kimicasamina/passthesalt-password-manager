"use strict";
const { Model } = require("sequelize");
const { encrypt } = require("../../middleware/encryptionHandler");
module.exports = (sequelize, DataTypes) => {
  class Login extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Folder }) {
      // define association here
      this.belongsTo(User, { foreignKey: "user_id", as: "user" });
      this.belongsTo(Folder, { foreignKey: "folder_id", as: "folder" });
    }
    toJSON() {
      return { ...this.get(), id: undefined, user_id: undefined };
    }
  }
  Login.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Name is required" },
          notEmpty: { msg: "Please provide a name" },
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Username is required" },
          notEmpty: { msg: "Please provide a username" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Email is required" },
          notEmpty: { msg: "Please provide an email" },
          isEmail: { msg: "Please provide a valid email" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Password is required" },
          notEmpty: { msg: "Please provide a password" },
        },
      },
      iv: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      website: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "logins",
      modelName: "Login",
    }
  );
  return Login;
};

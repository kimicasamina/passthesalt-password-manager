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
    static associate({ User }) {
      // define association here
      this.belongsTo(User, { foreignKey: "user_id", as: "user" });
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
        unique: {
          msg: "Name is already taken",
        },
        validate: {
          notNull: { msg: "A name is required" },
          notEmpty: { msg: "Please provide a name" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Email is already taken",
        },
        validate: {
          notNull: { msg: "An email is required" },
          notEmpty: { msg: "Please provide an email" },
          isEmail: {
            msg: "Please use the correct email format: user@example.com",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "A password is required" },
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

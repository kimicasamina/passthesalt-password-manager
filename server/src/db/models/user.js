"use strict";

const bcrypt = require("bcrypt");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Login, Note }) {
      // define association here
      this.hasMany(Login, { foreignKey: "user_id", as: "logins" });
      this.hasMany(Note, { foreignKey: "user_id", as: "notes" });
    }

    validPassword(password) {
      return bcrypt.compareSync(password, this.password);
    }

    toJSON() {
      return { ...this.get(), id: undefined };

      let user = { ...this.get(), id: undefined };
      // delete user.password;
      // return user;
    }
  }
  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Username is already taken",
        },
        validate: {
          notNull: { msg: "A username is required" },
          notEmpty: { msg: "Please provide a username" },
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
          len: {
            args: [8, 20],
            msg: "The password must be 8 to 20 characters long",
          },
        },
      },
    },
    {
      sequelize,
      tableName: "users",
      modelName: "User",
      hooks: {
        beforeCreate: (user) => {
          const salt = bcrypt.genSaltSync();
          user.password = bcrypt.hashSync(user.password, salt);
        },
      },
      instanceMethods: {
        validatePassword: (password) => {
          return bcrypt.compareSync(password, this.password);
        },
      },
      defaultScope: {
        attributes: { exclude: ["password"] },
      },
      scopes: {
        withoutPassword: {
          attributes: { exclude: ["password"] },
        },
        withPassword: {
          attributes: { include: ["password"] },
        },
      },
    }
  );
  return User;
};

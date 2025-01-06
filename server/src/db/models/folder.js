"use strict";
const { Model } = require("sequelize");
const { encrypt } = require("../../middleware/encryptionHandler");
module.exports = (sequelize, DataTypes) => {
  class Folder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Login, Note }) {
      // define association here
      this.belongsTo(User, { foreignKey: "user_id", as: "user" });
      this.hasMany(Login, { foreignKey: "user_id", as: "logins" });
      this.hasMany(Note, { foreignKey: "user_id", as: "notes" });
    }
    // toJSON() {
    //   return { ...this.get(), id: undefined, user_id: undefined };
    // }
  }
  Folder.init(
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
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "folders",
      modelName: "Folder",
    }
  );
  return Folder;
};

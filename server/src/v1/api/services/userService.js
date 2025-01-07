// services/userService.js
import { User } from "../../db/models";

export const findUserByEmail = async (email) => {
  try {
    return await User.findOne({
      where: { email },
      attributes: ["uuid", "email", "username", "password"],
      include: ["logins", "notes"],
    });
  } catch (error) {
    throw new Error("Database error: Unable to find user.");
  }
};

export const createUser = async (username, email, password) => {
  try {
    return await User.create({ username, email, password });
  } catch (error) {
    throw new Error("Database error: Unable to create user.");
  }
};

export const findUserByUuid = async (uuid) => {
  try {
    return await User.scope("withoutPassword").findOne({
      where: { uuid },
      include: ["logins", "notes"],
    });
  } catch (error) {
    throw new Error("Database error: Unable to fetch user by UUID.");
  }
};

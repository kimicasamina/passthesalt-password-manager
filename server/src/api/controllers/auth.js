import { User } from "../../db/models";
import bcrypt from "bcrypt";
import { compareHashPassword } from "../../utils/compareHashPassword";
import { generateToken } from "../../utils/generateToken";

export const registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  let existingUser;

  // check if user already exists
  try {
    existingUser = await User.findOne({ where: { email } });
    console.log("USER", existingUser);

    if (existingUser) {
      return res
        .status(401)
        .json({ error: "User already registered. Sign in instead" });
    }

    const newUser = await User.create({
      username,
      email,
      password,
    });

    return res.status(201).json({ msg: "Successfully created a new user" });
  } catch (error) {
    return res.status(401).json({ error: "Registration failed" });
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({
      where: { email: email },
      include: ["logins", "notes"],
      attributes: { include: ["password"] },
    });

    console.log("USER FOUND:", user.password);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const isValid = await user.validPassword(password);
    if (!isValid) {
      return res.status(404).json({ error: "Password is incorrect" });
    }

    const token = generateToken(user.uuid);
    res.cookie("access_token", token, {
      httpOnly: true,
      expiresIn: "30m",
    });
    res.status(201).json({
      msg: "User successfully logged in.",
      user: {
        uuid: user.uuid,
        username: user.username,
        email: user.email,
        logins: user.logins,
      },
    });
  } catch (error) {
    res.status(401).json({ error: "fail to login" });
  }
};

export const logoutUser = async (req, res, next) => {
  let token = req.cookies.access_token;
  console.log("DELETE TOKEN", token);
  try {
    res.clearCookie("access_token");
    res.json({ msg: "You are logged out." });
  } catch (err) {
    console.log(err);
  }
};

export const getUserWithoutPassword = async (req, res, next) => {
  let token = req.user;
  console.log("REQ USER_ID", token);

  try {
    const user = await User.scope("withoutPassword").findOne({
      where: { uuid: token.uuid },
      include: ["logins"],
    });
    return res.status(200).json({ user });
  } catch (err) {
    console.log(err);

    return res.status(401).json({ msg: "User not found" });
  }
};

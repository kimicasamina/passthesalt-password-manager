import { User } from "../../db/models";
import bcrypt from "bcrypt";
import { compareHashPassword } from "../../utils/compareHashPassword";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ where: { email } });
  } catch (error) {
    return res.status(401).json({ error: "Registration failed" });
  }

  if (existingUser) {
    return res
      .status(401)
      .json({ error: "User is registered already, sign in instead." });
  }

  const newUser = await User.create({
    username,
    email,
    password,
  });

  return res.status(201).json({ msg: "Successfully created a new user" });
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: { email },
      attributes: ["uuid", "password", "email", "username", "logins"],
    });

    console.log("USER: ", user);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const isValid = await user.validPassword(password);
    if (!isValid) {
      return res.status(404).json({ error: "Password is incorrect" });
    }

    console.log("Valid: ", isValid);

    // Generate JWT token
    const token = jwt.sign({ uuid: user.uuid }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send token as cookie
    res.cookie("access_token", token, {
      httpOnly: true,
      expiresIn: "1h",
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        uuid: user.uuid,
        email: user.email,
        username: user.username,
        logins: user.logins,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

export const logoutUser = async (req, res, next) => {
  let token = req.cookies.access_token;
  console.log("DELETE TOKEN", token);
  try {
    if (token) {
      res.clearCookie("access_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "None",
        path: "/",
      });
      res.status(200).json({ msg: "Logged out successfully" });
    } else {
      res.status(400).json({ msg: "No token found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Logout failed" });
  }
};

export const getAuth = async (req, res, next) => {
  console.log("GET AUTH: ", req.user);
  const { uuid } = req.user; // Destructure `uuid` directly from req.user

  try {
    const user = await User.scope("withoutPassword").findOne({
      where: { uuid },
      include: ["logins"],
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
};

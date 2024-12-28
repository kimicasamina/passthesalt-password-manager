import {
  findUserByEmail,
  createUser,
  findUserByUuid,
} from "../services/userService";
import { validatePassword } from "../../utils/passwordUtils";
import { generateJWT } from "../../utils/jwtUtils";

// Register user
export const registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res
        .status(401)
        .json({ error: "User is already registered, please sign in." });
    }

    const newUser = await createUser(username, email, password);
    return res.status(201).json({ message: "Successfully created a new user" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Registration failed" });
  }
};

// Login user
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const isValid = validatePassword(password, user.password);
    if (!isValid) {
      return res.status(404).json({ error: "Password is incorrect" });
    }

    const token = generateJWT(user.uuid, process.env.JWT_SECRET);

    res.cookie("access_token", token, {
      httpOnly: true, // Prevents JS access
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "Strict", // Ensure cookie is sent only with same-site requests
      maxAge: 3600000, // 1 hour
      path: "/",
    });

    const { password: _, ...userDetails } = user.get();

    res.status(200).json({
      message: "Login successful",
      user: userDetails,
    });
  } catch (error) {
    console.error("Login failed error:", error);
    res.status(500).json({ error: "Login failed" });
  }
};

// Logout user
export const logoutUser = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (token) {
      console.log("Clearing cookie...");
      res.clearCookie("access_token");
      res.status(200).json({ message: "Logged out successfully" });
    } else {
      res.status(400).json({ message: "No token found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Logout failed" });
  }
};

// Get authenticated user info
export const getAuth = async (req, res, next) => {
  const { uuid } = req.user;

  try {
    const user = await findUserByUuid(uuid);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
};

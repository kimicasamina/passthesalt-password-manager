import { User, Login } from "../../db/models";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.scope("withoutPassword").findAll({
      include: ["logins", "notes"],
    });
    return res.json({ users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const getUserByUuid = async (req, res, next) => {
  const uuid = req.params.uuid;
  try {
    const user = await User.scope("withoutPassword").findOne({
      where: { uuid },
      include: ["logins", "notes"],
    });
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res, next) => {
  const uuid = req.params.uuid;
  try {
    const user = await User.scope("withoutPassword").findOne({
      where: { uuid },
      include: ["logins", "notes"],
    });
    user.username = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;

    await user.save();
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res, next) => {
  const uuid = req.params.uuid;
  try {
    const user = await User.findOne({ where: { uuid } });
    await user.destroy();
    return res.json({ msg: "Successfully deleted a user" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const createUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.create({
      username,
      email,
      password,
    });

    return res.json({ user: { ...user, password: undefined } });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

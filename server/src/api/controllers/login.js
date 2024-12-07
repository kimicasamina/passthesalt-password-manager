import { Login, User } from "../../db/models";
import { encrypt, decrypt } from "../../middleware/encryptionHandler";

export const getAllLogins = async (req, res, next) => {
  try {
    const logins = await Login.findAll({
      include: ["user"],
    });
    return res.json({ logins });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const getLoginByUuid = async (req, res, next) => {
  const { uuid } = req.params;
  try {
    const login = await Login.findOne({
      where: { uuid },
      include: ["user"],
    });
    return res.json({ login });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const createNewLogin = async (req, res, next) => {
  const { userUuid, password } = req.body;
  try {
    const user = await User.findOne({ where: { uuid: userUuid } });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const encrypted = encrypt(password);
    const login = await Login.create({
      name: req.body.name,
      email: req.body.email,
      password: encrypted.password,
      iv: encrypted.iv,
      user_id: user.id,
      website: req.body.website,
    });

    return res.json(login);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const getPassword = async (req, res, next) => {
  try {
    const password = decrypt({
      iv: req.body.iv,
      password: req.body.password,
    });
    return res.status(200).json({ password });
    // return res.send(decrypt(req.body))
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const updateLogin = async (req, res, next) => {
  const uuid = req.params.uuid;
  try {
    const login = await Login.findOne({
      where: { uuid },
      include: ["user"],
    });

    if (!login) {
      return res.status(400).json({ error: "Login not found" });
    }

    const encrypted = encrypt(req.body.password);
    login.name = req.body.name;
    login.email = req.body.email;
    login.password = encrypted.password;
    login.iv = encrypted.iv;
    login.website = req.body.website;

    await login.save();
    return res.json(login);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const deleteLogin = async (req, res, next) => {
  const uuid = req.params.uuid;
  try {
    const login = await Login.findOne({
      where: { uuid },
      include: ["user"],
    });

    if (!login) {
      return res.status(400).json({ error: "Data does not exist" });
    }

    await login.destroy();
    return res.status(200).json({ msg: "Login deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

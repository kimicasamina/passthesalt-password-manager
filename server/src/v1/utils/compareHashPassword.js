import bcrypt from "bcrypt";

export const compareHashPassword = async (password, hashPassword) => {
  const isValid = bcrypt.compareSync(password, hashPassword);

  return isValid;
};

import React, { useState } from "react";
import PasswordService from "../../services/passwordService";

export default function useDecryptPassword() {
  const [decrypedPassword, setDecryptedPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState(null);

  const getDecryptedPassword = async (iv, password) => {
    try {
      // Send request to the backend to decrypt the password
      const data = await PasswordService.decryptPassword(iv, password);
      console.log("DATA: ", data);
      setDecryptedPassword(data.password);
      return data.password;
    } catch (error) {
      console.error("Decryption failed:", error);
    }
  };

  return {
    decrypedPassword,
    getDecryptedPassword,
  };
}

import React, { useState, useEffect } from "react";
import { FiEye, FiEyeOff, FiClipboard } from "react-icons/fi";
import PasswordService from "../../services/passwordService";

const PasswordDetails = ({ passwordData, showPassword, setShowPassword }) => {
  const [decryptedPassword, setDecryptedPassword] = useState(null);

  useEffect(() => {
    // Reset decrypted password when passwordData changes
    setDecryptedPassword(null);
    setShowPassword(false); // Reset password visibility

    if (passwordData?.iv && passwordData?.password) {
      console.log("DECRYPTING PASSWORD...");
      decryptPassword(passwordData.iv, passwordData.password);
    }
  }, [passwordData, setShowPassword]); // Reset on passwordData change

  // Decrypt the password using PasswordService
  const decryptPassword = async (iv, password) => {
    try {
      const { password: decrypted } = await PasswordService.decryptPassword(
        iv,
        password
      );
      setDecryptedPassword(decrypted);
    } catch (error) {
      console.error("Decryption failed:", error);
    }
  };

  // Toggle password visibility with auto-hide after 3 seconds
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
    setTimeout(() => setShowPassword(false), 3000); // Auto-hide after 3 seconds
  };

  // Copy decrypted password to clipboard
  const copyToClipboard = async () => {
    if (decryptedPassword) {
      await navigator.clipboard.writeText(decryptedPassword);
      alert("Password copied to clipboard!");
    } else {
      alert("Password is not yet decrypted.");
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <p className="flex-1">{showPassword ? decryptedPassword : "••••••••"}</p>
      <button
        onClick={togglePasswordVisibility}
        className="p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
      >
        {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
      </button>
      <button
        onClick={copyToClipboard}
        className="p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
      >
        <FiClipboard size={20} />
      </button>
    </div>
  );
};

export default PasswordDetails;

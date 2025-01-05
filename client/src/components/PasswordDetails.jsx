import React, { useState } from "react";
import { FiEye, FiEyeOff, FiClipboard } from "react-icons/fi";
import PasswordService from "../services/passwordService";

export default function PasswordDetails({ passwordData }) {
  console.log("PASSWORD DATA: ", passwordData);
  const [showPassword, setShowPassword] = useState(false);
  const [decryptedPassword, setDecryptedPassword] = useState(null);

  const togglePasswordVisibility = async () => {
    setShowPassword(!showPassword);
    decryptPassword(passwordData.iv, passwordData.password);
    // setTimeout(() => {
    // }, 3000);
    // hidePassword();
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Password copied to clipboard!");
    });
  };

  const decryptPassword = async (iv, password) => {
    console.log(`PASSWORD TO POST TO THE SERVER, ${iv} ${password}`);
    const data = await PasswordService.decryptPassword(
      passwordData.iv,
      passwordData.password
    );
    console.log("PASSWORD: ", data);
    setDecryptedPassword(data);
  };

  const hidePassword = () => {
    setDecryptedPassword(null);
    setShowPassword(false);
  };

  return (
    <div className="flex items-center space-x-2">
      <p className="flex-1">{showPassword ? decryptedPassword : "••••••••"}</p>

      {/* Toggle Button */}
      <button
        onClick={togglePasswordVisibility}
        className="p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
      >
        {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
      </button>

      {/* Copy Button */}
      <button
        onClick={() => copyToClipboard(decryptedPassword)}
        className="p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
      >
        <FiClipboard size={20} />
      </button>
    </div>
  );
}

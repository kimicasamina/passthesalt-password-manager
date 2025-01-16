import React, { useState, useEffect } from "react";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { RiClipboardLine } from "react-icons/ri";
import PasswordService from "../../../../../../services/passwordService"; // Assuming this service exists

const PasswordDetails = ({ passwordData }) => {
  const [decryptedPassword, setDecryptedPassword] = useState(null);
  const [showDecryptedPassword, setShowDecryptedPassword] = useState(false);

  // Decrypt the password using PasswordService
  const decryptPassword = async () => {
    try {
      // Send request to the backend to decrypt the password
      const data = await PasswordService.decryptPassword(
        passwordData.iv,
        passwordData.password
      );
      console.log("DATA: ", data);
      setDecryptedPassword(data.password);
      setShowDecryptedPassword(true);

      // Hide the decrypted password after 3000ms (3 seconds)
      setTimeout(() => {
        setShowDecryptedPassword(false);
      }, 3000);
    } catch (error) {
      console.error("Decryption failed:", error);
    }
  };

  // Toggle password visibility: decrypts the password
  const togglePasswordVisibility = () => {
    if (!showDecryptedPassword) {
      decryptPassword(); // Decrypt the password when the user opts to show it
    } else {
      setShowDecryptedPassword(false); // Hide the password if it's currently decrypted
    }
  };

  // Copy the decrypted password to clipboard
  const copyToClipboard = async () => {
    if (decryptedPassword) {
      await navigator.clipboard.writeText(decryptedPassword);
      alert("Decrypted password copied to clipboard!");
    } else {
      alert("No decrypted password to copy.");
    }
  };

  // Reset the decrypted password and visibility when passwordData changes
  useEffect(() => {
    setDecryptedPassword(null); // Reset the decrypted password
    setShowDecryptedPassword(false); // Hide the decrypted password
  }, [passwordData]); // Re-run this effect when passwordData changes

  return (
    <div className="flex items-center space-x-2">
      <p className="flex-1">
        {/* Show the decrypted password if available and visibility is toggled */}
        {showDecryptedPassword ? decryptedPassword : "********"}
      </p>

      {/* Toggle visibility of the password */}
      <button
        onClick={togglePasswordVisibility}
        className="p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
      >
        {showDecryptedPassword ? (
          <RiEyeLine size={20} />
        ) : (
          <RiEyeOffLine size={20} />
        )}
      </button>

      {/* Copy the decrypted password to clipboard */}
      <button
        onClick={copyToClipboard}
        className="p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
      >
        <RiClipboardLine size={20} />
      </button>
    </div>
  );
};

export default PasswordDetails;

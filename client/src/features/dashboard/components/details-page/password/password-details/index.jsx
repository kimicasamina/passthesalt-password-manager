import React, { useState, useEffect } from "react";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { RiClipboardLine } from "react-icons/ri";

import useDecryptPassword from "../../../../../../hooks/passwords/useDecryptPassword";

const PasswordDetails = ({ passwordData }) => {
  const [decryptedPassword, setDecryptedPassword] = useState(null);
  const [showDecryptedPassword, setShowDecryptedPassword] = useState(false);
  const { getDecryptedPassword } = useDecryptPassword();

  // Toggle password visibility: decrypts the password
  const togglePasswordVisibility = async () => {
    if (!showDecryptedPassword) {
      // decryptPassword(); // Decrypt the password when the user opts to show it
      const password = await getDecryptedPassword(
        passwordData.iv,
        passwordData.password
      );
      setDecryptedPassword(password);
      setShowDecryptedPassword(true);

      // Hide the decrypted password after 3000ms (3 seconds)
      setTimeout(() => {
        setShowDecryptedPassword(false);
      }, 3000);
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
    <div className="flex items-center">
      <div className="flex-1 flex items-center ">
        {/* Show the decrypted password if available and visibility is toggled */}
        {showDecryptedPassword ? decryptedPassword : "**********"}
      </div>

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

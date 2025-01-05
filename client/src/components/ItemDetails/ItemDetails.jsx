import React, { useState } from "react";
import PasswordDetails from "../PasswordDetails";
import { FiEye, FiEyeOff, FiClipboard } from "react-icons/fi";

const ItemDetails = ({ selectedItem }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Password copied to clipboard!");
    });
  };

  if (!selectedItem) {
    return <p>No selected item</p>;
  }

  console.log(`DETAILS: ${selectedItem.iv} ${selectedItem.password}`);

  return (
    <div className="h-full max-w-lg mx-auto bg-white space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">{selectedItem.name}</h2>
      <div className="space-y-2">
        <p className="">{selectedItem.username}</p>
        <p className="">{selectedItem.email}</p>
      </div>
      <PasswordDetails
        passwordData={{ iv: selectedItem.iv, password: selectedItem.password }}
      />

      <div className="space-y-2">
        <p>{selectedItem?.createdAt?.toString()}</p>
        <p>{selectedItem?.updatedAt?.toString()}</p>
      </div>
    </div>
  );
};

export default ItemDetails;

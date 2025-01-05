import React, { useState, useEffect } from "react";
import PasswordDetails from "../PasswordDetails";
import FormattedDate from "../common/FormattedDate";

const ItemDetails = ({ selectedItem }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({ iv: "", password: "" });

  useEffect(() => {
    if (selectedItem) {
      setPasswordData({
        iv: selectedItem.iv,
        password: selectedItem.password,
      });
    }
  }, [selectedItem]); // Update passwordData when selectedItem changes

  // Display an indication if no item is selected
  if (!selectedItem || Object.keys(selectedItem).length === 0) {
    return <p>No item selected. Please select an item from the list.</p>;
  }

  return (
    <div className="h-full w-full bg-white space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">{selectedItem.name}</h2>
      <div className="space-y-2">
        <p>{selectedItem.username}</p>
        <p>{selectedItem.email}</p>
      </div>
      <PasswordDetails
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        passwordData={passwordData}
      />
      <div className="flex flex-col space-y-2">
        <div className="w-full flex flex-col space-y-2">
          Created At:
          <FormattedDate date={selectedItem?.createdAt} />
        </div>
        <div className="w-full flex flex-col space-y-2">
          Updated At:
          <FormattedDate date={selectedItem?.updatedAt} />
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;

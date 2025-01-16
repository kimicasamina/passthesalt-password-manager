import React, { useState, useEffect } from "react";
import PasswordDetails from "./password-details";
import FormattedDate from "../../../../../components/FormattedDate";

export default function Password({ selectedItem }) {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({ iv: "", password: "" });

  useEffect(() => {
    if (selectedItem) {
      setPasswordData({
        iv: selectedItem.iv,
        password: selectedItem.password,
      });
    }
  }, [selectedItem]);

  console.log("SELECTED ITEM: ", selectedItem);

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
        // iv={selectedItem.iv}
        // password={selectedItem.password}
        // showPassword={showPassword}
        // setShowPassword={setShowPassword}
        passwordData={passwordData}
      />
      <div className="flex flex-col space-y-2">
        <div>
          Created At: <FormattedDate date={selectedItem.createdAt} />
        </div>
        <div>
          Updated At: <FormattedDate date={selectedItem.updatedAt} />
        </div>
      </div>
    </div>
  );
}

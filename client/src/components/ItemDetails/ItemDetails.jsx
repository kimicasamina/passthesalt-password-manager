import React from "react";

const ItemDetails = ({ selectedItem }) => {
  if (!selectedItem) {
    return <p>No selected item</p>;
  }

  return (
    <div className="flex flex-col gap-y-2">
      <p>{selectedItem.name}</p>
      <p>{selectedItem.username}</p>
      <p>{selectedItem.email}</p>
      <p>***********</p>
      <p>{selectedItem?.createdAt?.toLocaleDateString()}</p>
      <p>{selectedItem?.updatedAt?.toLocaleDateString()}</p>
    </div>
  );
};

export default ItemDetails;

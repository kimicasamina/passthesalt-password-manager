import React from "react";
import Notes from "./notes";
import Password from "./password";

export default function DetailsPage({ selectedItem, itemType }) {
  console.log("TYPE...", itemType);

  // Handle case when no item is selected
  if (!selectedItem) {
    return <h1 className="text-center">SELECTED ITEM IS EMPTY</h1>;
  }

  // Return the appropriate component based on itemType
  if (itemType === "note") {
    return <Notes selectedItem={selectedItem} />;
  } else if (itemType === "password") {
    return <Password selectedItem={selectedItem} />;
  }

  // Default case when no type is selected
  return <h1 className="text-center">Please select a valid item type.</h1>;
}

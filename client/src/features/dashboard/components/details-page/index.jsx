import React, { useEffect, useState } from "react";
import Notes from "./notes";
import Password from "./password";
import { useSelector } from "react-redux";

export default function DetailsPage({ selectedItem, itemType }) {
  const [item, setItem] = useState(null);
  const { logins, notes } = useSelector((state) => state.user);

  console.log("ITEM TYPE:", itemType);

  useEffect(() => {
    // Ensure passwords and notes are arrays before trying to iterate over them
    const validLogins = Array.isArray(logins) ? logins : [];
    const validNotes = Array.isArray(notes) ? notes : [];

    console.log("selectedItem", selectedItem); // Log selectedItem to debug
    console.log("logins", validLogins); // Log passwords to debug
    console.log("notes", validNotes); // Log notes to debug

    // Find the correct item based on selectedItem and itemType
    let foundItem = null;
    if (itemType === "logins") {
      foundItem = validLogins.find((i) => i.id === selectedItem) || null;
    } else if (itemType === "notes") {
      foundItem = validNotes.find((i) => i.id === selectedItem) || null;
    }

    setItem(foundItem);
  }, [selectedItem, itemType, logins, notes]);

  return (
    <div className="w-full h-full pl-4 pr-8 py-8 bg-lightBackground">
      {!item && <p>No item selected. Please select an item from the list.</p>}
      {itemType === "notes" && item && <Notes selectedItem={item} />}
      {itemType === "logins" && item && <Password selectedItem={item} />}
    </div>
  );
}

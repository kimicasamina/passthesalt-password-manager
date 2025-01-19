import React, { useState } from "react";
import { useSelector } from "react-redux";
import DetailsPage from "../details-page";
import ItemList from "../item-list";
import SidebarMenu from "../sidebar-menu";

export default function Container() {
  const [selectedMenu, setSelectedMenu] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemType, setItemType] = useState(null);

  // Correctly accessing the state
  const { folders, notes, logins } = useSelector((state) => state.user); // Extract user data from state

  console.log(`hello`, folders);

  const handleSelectMenu = (menu) => {
    setSelectedMenu(menu);
    setSelectedItem(null);
    setItemType(null);
  };

  const handleSelectItem = (id) => {
    setSelectedItem(id);
    setItemType(null);
  };

  const onSelectType = (type) => {
    setItemType(type);
  };

  return (
    <div className="w-full h-full grid grid-cols-3 bg-lightBackground">
      <SidebarMenu
        selectedMenu={selectedMenu}
        onSelect={handleSelectMenu}
        folders={folders}
      />
      <ItemList
        selectedMenu={selectedMenu}
        selectedItem={selectedItem}
        onSelect={handleSelectItem}
        onSelectType={onSelectType}
        notes={notes}
        logins={logins}
        folders={folders}
      />
      <DetailsPage selectedItem={selectedItem} itemType={itemType} />
    </div>
  );
}

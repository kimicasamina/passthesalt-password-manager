import React, { useState } from "react";
import SidebarMenu from "../components/SidebarMenu/SidebarMenu";
import ItemList from "../components/ItemList/ItemList";
import ItemDetails from "../components/ItemDetails/ItemDetails";

export default function Home() {
  const [selectedMenu, setSelectedMenu] = useState("all");
  const [selectedItem, setSelectedItem] = useState({});

  const handleSelectMenu = (menu) => {
    setSelectedMenu(menu);
    setSelectedItem(null); // Reset selected item when menu changes
  };

  const handleSelectItem = (item) => {
    setSelectedItem((prev) => (prev = item));
  };

  console.log("CURRENT SELECTED ITEM", selectedItem);

  return (
    <div className="flex w-full h-full">
      <div className="w-[25%] bg-gray-800 text-white p-4">
        <SidebarMenu onSelect={handleSelectMenu} selectedMenu={selectedMenu} />
      </div>

      <div className="w-[25%] p-4 border-r-2 border-gray-500">
        <ItemList
          onSelect={handleSelectItem}
          selectedItem={selectedItem}
          selectedMenu={selectedMenu}
        />
      </div>

      <div className="p-4 flex-1">
        <ItemDetails selectedItem={selectedItem} />
      </div>
    </div>
  );
}

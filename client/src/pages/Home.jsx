import React, { useEffect, useState } from "react";
import SidebarMenu from "../components/SidebarMenu/SidebarMenu";
import ItemList from "../components/ItemList/ItemList";
import ItemDetails from "../components/ItemDetails/ItemDetails";
import FolderService from "../services/folderService";
import Dashboard from "../features/dashboard";

export default function Home() {
  const [selectedMenu, setSelectedMenu] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null); // Set to null for better state control

  const handleSelectMenu = (menu) => {
    setSelectedMenu(menu);
    setSelectedItem(null); // Reset selected item when menu changes
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item); // Set selected item
  };

  return (
    <Dashboard />
    // <div className="flex w-full h-full">
    //   <SidebarMenu selectedMenu={selectedMenu} onSelect={handleSelectMenu} />
    //   <ItemList
    //     selectedMenu={selectedMenu}
    //     selectedItem={selectedItem}
    //     onSelect={handleSelectItem}
    //   />
    //   <ItemDetails selectedItem={selectedItem} />
    // </div>
  );
}

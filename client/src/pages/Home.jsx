import React, { useEffect, useState } from "react";
import SidebarMenu from "../components/SidebarMenu/SidebarMenu";
import ItemList from "../components/ItemList/ItemList";
import ItemDetails from "../components/ItemDetails/ItemDetails";
import FolderService from "../services/folderService";

export default function Home() {
  const [folders, setFolders] = useState(null);
  const [passwords, setPasswords] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null); // Set to null for better state control

  const handleSelectMenu = (menu) => {
    setSelectedMenu(menu);
    setSelectedItem(null); // Reset selected item when menu changes
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item); // Set selected item
  };

  useEffect(() => {
    async function fetchFolders() {
      const data = await FolderService.getAllFolders();
      console.log("DATA...", data);
      setFolders([...data.folders]);
    }

    fetchFolders();
  }, []);

  return (
    <div className="flex w-full h-full">
      <SidebarMenu
        folders={folders}
        selectedMenu={selectedMenu}
        onSelect={handleSelectMenu}
      />
      <ItemList
        selectedMenu={selectedMenu}
        selectedItem={selectedItem}
        onSelect={handleSelectItem}
      />
      <ItemDetails selectedItem={selectedItem} />
    </div>
  );
}

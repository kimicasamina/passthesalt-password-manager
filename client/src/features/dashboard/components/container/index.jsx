import React, { useState } from "react";
import DetailsPage from "../details-page";
import ItemList from "../item-list";
import SidebarMenu from "../sidebar-menu";
import useFetchFolders from "../../hooks/folders/useFetchFolders";
import useFetchPasswords from "../../hooks/passwords/useFetchPasswords";

export default function Container() {
  const [selectedMenu, setSelectedMenu] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null); // Set to null for better state control
  const [itemType, setItemType] = useState(null);
  const { folders } = useFetchFolders();
  const { passwords } = useFetchPasswords();

  const handleSelectMenu = (menu) => {
    setSelectedMenu(menu);
    setSelectedItem(null); // Reset selected item when menu changes
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item); // Set selected item
    setItemType(null);
  };

  const onSelectType = (type) => {
    setItemType(type);
  };

  return (
    <div className="w-full h-full grid grid-cols-3">
      {/* <SidebarMenu selectedMenu={selectedMenu} onSelect={handleSelectMenu} />
      <ItemList
        selectedMenu={selectedMenu}
        selectedItem={selectedItem}
        onSelect={handleSelectItem}
      />
      <ItemDetails selectedItem={selectedItem} /> */}

      <SidebarMenu
        folders={folders}
        selectedMenu={selectedMenu}
        onSelect={handleSelectMenu}
      />
      <ItemList
        folders={folders}
        passwords={passwords}
        selectedMenu={selectedMenu}
        selectedItem={selectedItem}
        onSelect={handleSelectItem}
        onSelectType={onSelectType}
      />
      <DetailsPage selectedItem={selectedItem} itemType={itemType} />
    </div>
  );
}

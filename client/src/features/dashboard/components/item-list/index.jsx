import React, { forwardRef, useEffect, useMemo, useState } from "react";
import PasswordService from "../../../../services/passwordService";
import ListItem from "./list-item";
import useFetchFolders from "../../hooks/folders/useFetchFolders";
import useFetchPasswords from "../../hooks/passwords/useFetchPasswords";
import useNotes from "../../hooks/notes/useNotes";

export default function ItemList({
  onSelectType,
  selectedMenu,
  selectedItem,
  onSelect,
}) {
  const [all, setAll] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const { folders } = useFetchFolders();
  const { passwords } = useFetchPasswords();
  const { notes } = useNotes();

  console.log("SELECTED ITEM: ", selectedMenu);
  console.log("FOLDERS: ", folders);

  const menuDataMap = useMemo(
    () => ({
      all: all || [],
      passwords: passwords || [],
      favorites: favorites || [],
      notes: notes || [],
    }),
    [selectedMenu]
  );

  // const foldersDataMap =

  const renderList = () => {
    let items =
      menuDataMap[selectedMenu] ||
      folders?.map((folder) => {
        if (folder.id == selectedMenu) {
          console.log("MATCH", folder.name);
          // items = [...folder.logins];
          return [...folder.logins, ...folder.notes];
        }
      });
    [];

    folders?.forEach((folder) => {
      if (folder.id == selectedMenu) {
        console.log("MATCH", folder.name);
        items = [...folder.logins];
      }
    });

    return items.length !== 0 ? (
      <ul className="">
        {items.map((item, index) => (
          <ListItem
            key={index}
            item={item}
            selectedItem={selectedItem}
            onSelect={onSelect}
            onSelectType={onSelectType}
          />
        ))}
      </ul>
    ) : (
      <h1 className="">No Items...</h1>
    );
  };

  return <div className="w-full">{renderList()}</div>;
}

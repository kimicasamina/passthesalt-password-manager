import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import ListItem from "./list-item";

export default function ItemList({
  onSelectType,
  selectedMenu,
  selectedItem,
  onSelect,
  logins,
  notes,
  folders,
}) {
  const [favorites, setFavorites] = useState([]);
  const [all, setAll] = useState([]);

  // Update items based on logins and notes
  useEffect(() => {
    const combinedItems = [...logins, ...notes].sort(
      (a, b) => a.createdAt - b.createdAt
    );

    setAll((prevAll) => {
      const isSame =
        prevAll.length === combinedItems.length &&
        prevAll.every((item, index) => item.id === combinedItems[index].id);
      return isSame ? prevAll : combinedItems;
    });

    setFavorites((prevFavorites) => {
      const filteredFavorites = [...logins, ...notes]
        .filter((item) => item.favorites)
        .sort((a, b) => a.createdAt - b.createdAt);

      const isSame =
        prevFavorites.length === filteredFavorites.length &&
        prevFavorites.every(
          (item, index) => item.id === filteredFavorites[index].id
        );
      return isSame ? prevFavorites : filteredFavorites;
    });
  }, [logins, notes]);

  // Menu data map
  const menuDataMap = useMemo(
    () => ({
      all,
      logins,
      favorites,
      notes,
    }),
    [all, favorites, logins, notes]
  );

  const renderList = () => {
    // Try to fetch items from the menuDataMap first
    let items = menuDataMap[selectedMenu];

    // If no items are found in menuDataMap, try to find the matching folder and get notes or logins
    if (!items) {
      const matchingFolder = folders.find((item) => item.id === selectedMenu);

      if (matchingFolder) {
        items = [...matchingFolder.notes, ...matchingFolder.logins].sort(
          (a, b) => a.createdAt - b.createdAt
        );
      }
    }

    // If no items found, default to an empty array
    if (!Array.isArray(items)) {
      console.error("Expected 'items' to be an array, but got:", items);
      items = [];
    }

    // If items is empty, return an empty message
    if (items.length === 0) return <h1>List is empty</h1>;

    return (
      <ul className="w-full flex flex-col gap-y-4 h-full bg-lightBackground">
        {items.map((item) => (
          <ListItem
            key={item.id}
            item={item}
            selectedItem={selectedItem}
            onSelect={onSelect}
            onSelectType={onSelectType}
          />
        ))}
      </ul>
    );
  };

  return (
    <div className="w-full h-full px-4 py-8 overflow-y-scroll scroll-hidden">
      {renderList()}
    </div>
  );
}

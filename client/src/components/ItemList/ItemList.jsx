import React, { useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import ListItem from "./ListItem";

const ItemList = ({ selectedMenu, selectedItem, onSelect }) => {
  const { user } = useAuth();

  const menuDataMap = useMemo(
    () => ({
      all: user.logins || [],
      passwords: user.logins || [],
      favorites: user.logins || [],
    }),
    [user]
  );

  const headerTextMap = useMemo(
    () => ({
      all: "All Items",
      passwords: "Password Lists",
      favorites: "Favorites Lists",
    }),
    []
  );

  const getHeaderText = () =>
    headerTextMap[selectedMenu] || "Select a category";

  const renderList = () => {
    const items = menuDataMap[selectedMenu] || [];
    return items.length === 0 ? (
      <p>No {selectedMenu} available</p>
    ) : (
      <ul className="w-full h-full flex flex-col">
        {items.map((item) => (
          <ListItem
            key={item.id}
            item={item}
            selectedItem={selectedItem}
            onSelect={onSelect}
          />
        ))}
      </ul>
    );
  };

  return (
    <div className="w-full flex flex-col">
      <h1>{getHeaderText()}</h1>
      {renderList()}
    </div>
  );
};

export default ItemList;

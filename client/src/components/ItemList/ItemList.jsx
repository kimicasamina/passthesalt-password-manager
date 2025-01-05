import React, { useMemo } from "react";
import { useAuth } from "../../context/AuthContext";

// Memoize the ListItem component to prevent unnecessary re-renders
const ListItem = React.memo(({ item, selectedItem, onSelect }) => {
  const isSelected = selectedItem && selectedItem.id === item.id;

  return (
    <li className="w-full flex">
      <span
        className={`w-full mb-2 hover:text-accent cursor-pointer ${
          isSelected ? "text-accent" : "text-blue-500"
        }`}
        onClick={() => onSelect(item)}
      >
        {item.name}
      </span>
    </li>
  );
});

const ItemList = ({ selectedMenu, onSelect, selectedItem }) => {
  const { user } = useAuth();

  // Memoize the mapping of selectedMenu to corresponding user data to avoid recalculating on every render
  const menuDataMap = useMemo(
    () => ({
      all: user.logins || [],
      passwords: user.logins || [],
      favorites: user.logins || [],
    }),
    [user] // Recalculate only if the user object changes
  );

  // Memoize the header text mapping to avoid recalculating on every render
  const headerTextMap = useMemo(
    () => ({
      all: "All Items",
      passwords: "Password Lists",
      favorites: "Favorites Lists",
    }),
    []
  );

  const getHeaderText = () =>
    headerTextMap[selectedMenu] || "Please select a category";

  const renderList = () => {
    const items = menuDataMap[selectedMenu] || [];

    if (items.length === 0) {
      return <p>No {selectedMenu} available</p>;
    }

    // Memoize the list of ListItem components to avoid unnecessary re-renders
    return useMemo(
      () => (
        <ul className="w-full h-full flex flex-col">
          {items.map((item) => (
            <ListItem
              key={item.id} // Use item.id as the key instead of index for better performance
              item={item}
              selectedItem={selectedItem}
              onSelect={onSelect}
            />
          ))}
        </ul>
      ),
      [items, selectedItem, onSelect] // Recalculate only when the items, selectedItem, or onSelect changes
    );
  };

  return (
    <>
      <h1>{getHeaderText()}</h1>
      {renderList()}
    </>
  );
};

export default ItemList;

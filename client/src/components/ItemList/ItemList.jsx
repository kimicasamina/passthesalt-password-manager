import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import ListItem from "./ListItem";
import PasswordService from "../../services/passwordService";

const ItemList = ({ selectedMenu, selectedItem, onSelect }) => {
  const { user } = useAuth();
  const [passwords, setPasswords] = useState(null);
  const [all, setAll] = useState(null);

  const menuDataMap = useMemo(
    () => ({
      all: user.logins || [],
      passwords: passwords ? passwords : [],
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

  useEffect(() => {
    async function fetchAllPasswords() {
      const data = await PasswordService.getAllPassword();
      console.log("DATA:", data);
      setPasswords([...data.logins]);
    }

    fetchAllPasswords();
  }, []);

  return (
    <div className="w-full flex flex-col">
      <h1>{getHeaderText()}</h1>
      {renderList()}
    </div>
  );
};

export default ItemList;

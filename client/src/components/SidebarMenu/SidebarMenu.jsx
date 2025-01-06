import React, { useMemo } from "react";
import { Link } from "react-router-dom";

const SidebarMenu = ({ onSelect, selectedMenu }) => {
  const menuList = useMemo(
    () => [
      { id: "all", label: "All Items" },
      { id: "favorites", label: "Favorites" },
      { id: "passwords", label: "Passwords" },
      { id: "notes", label: "Notes" },
    ],
    []
  );

  const categories = useMemo(
    () => [
      { id: "banking", label: "Banking" },
      { id: "socialmedia", label: "Social Media" },
    ],
    []
  );

  return (
    <div className="w-full">
      <ul className="flex flex-col gap-y-1 mb-10">
        {menuList.map((item) => (
          <MenuItem
            key={item.id}
            item={item}
            selectedMenu={selectedMenu}
            onSelect={onSelect}
          />
        ))}
      </ul>

      <h2 className="text-xs font-semibold text-accent mb-2">Folders</h2>
      <ul className="flex flex-col gap-y-1">
        {categories.map((item) => (
          <MenuItem
            key={item.id}
            item={item}
            selectedMenu={selectedMenu}
            onSelect={onSelect}
          />
        ))}
      </ul>
    </div>
  );
};

const MenuItem = ({ item, selectedMenu, onSelect }) => (
  <div onClick={() => onSelect(item.id)} className="cursor-pointer">
    <span
      className={`text-sm hover:text-accent ${
        selectedMenu === item.id ? "text-accent" : "text-text"
      }`}
    >
      {item.label}
    </span>
  </div>
);

export default SidebarMenu;

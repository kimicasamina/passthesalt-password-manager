import React, { useMemo } from "react";
import { Link } from "react-router-dom";

const SidebarMenu = ({ onSelect, selectedMenu }) => {
  const menuList = useMemo(
    () => [
      { id: "all", label: "All Items", path: "/" },
      { id: "favorites", label: "Favorites", path: "/favorites" },
      { id: "passwords", label: "Passwords", path: "/passwords" },
      { id: "notes", label: "Notes", path: "/notes" },
    ],
    []
  );

  const categories = useMemo(
    () => [
      { id: "banking", label: "Banking", path: "banking" },
      { id: "socialmedia", label: "Social Media", path: "social media" },
    ],
    []
  );

  return (
    <div className="w-full">
      <ul className="w-full flex flex-col gap-y-1 mb-10">
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
      <ul className="w-full flex flex-col gap-y-1">
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
  <div className="w-full" onClick={() => onSelect(item.id)}>
    <span
      className={`text-sm hover:text-accent cursor-pointer ${
        selectedMenu == item.id ? "text-accent" : "text-text"
      }`}
    >
      {item.label}
    </span>
  </div>
);

export default SidebarMenu;

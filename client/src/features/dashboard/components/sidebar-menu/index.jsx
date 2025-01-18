import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import MenuItem from "./menu-item";

export default function SidebarMenu({ selectedMenu, onSelect, folders }) {
  const menuList = useMemo(
    () => [
      { id: "all", name: "All" },
      { id: "favorites", name: "Favorites" },
      { id: "logins", name: "Logins" },
      { id: "notes", name: "Notes" },
    ],
    []
  );

  return (
    <div className="w-full h-full bg-darkBackground px-8 py-8">
      <h2 className="text-xs font-semibold text-secondary mb-2">Menu</h2>
      <ul className="flex flex-col gap-y-0 mb-10">
        {menuList.map((item) => (
          <MenuItem
            key={item.id}
            item={item}
            selectedMenu={selectedMenu}
            onSelect={onSelect}
          />
        ))}
      </ul>

      <h2 className="text-xs font-semibold text-secondary mb-2">Folders</h2>
      <ul className="flex flex-col gap-y-0">
        {folders && folders.length > 0 ? (
          folders.map((folder) => (
            <MenuItem
              key={folder.id}
              item={folder}
              selectedMenu={selectedMenu}
              onSelect={onSelect}
            />
          ))
        ) : (
          <li>No folders available</li>
        )}
      </ul>
    </div>
  );
}

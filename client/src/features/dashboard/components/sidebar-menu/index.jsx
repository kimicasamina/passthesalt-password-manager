import React, { useEffect, useMemo, useState } from "react";
import MenuItem from "./menu-item";

export default function SidebarMenu({ folders, selectedMenu, onSelect }) {
  const menuList = useMemo(
    () => [
      { id: "all", name: "All Items" },
      { id: "favorites", name: "Favorites" },
      { id: "passwords", name: "Passwords" },
      { id: "notes", name: "Notes" },
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
        {folders
          ? folders.map((item, index) => (
              <MenuItem
                key={index}
                item={item}
                selectedMenu={selectedMenu}
                onSelect={onSelect}
              />
            ))
          : null}
      </ul>
    </div>
  );
}

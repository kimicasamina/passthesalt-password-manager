import React, { useMemo } from "react";
import { FaKey, FaRegStickyNote, FaFolder } from "react-icons/fa";

export default function DropDownMenu({ dropdownRef, toggleModal }) {
  const menuList = useMemo(
    () => [
      {
        id: "logins",
        label: "Add Password",
        icon: <FaKey className="w-4 h-4" />,
      },
      {
        id: "secret_note",
        label: "Add Secret Note",
        icon: <FaRegStickyNote className="w-4 h-4" />,
      },
      {
        id: "folder",
        label: "Add Folder",
        icon: <FaFolder className="w-4 h-4" />,
      },
    ],
    []
  );

  return (
    <div
      ref={dropdownRef}
      className="absolute bg-gray-800 text-white rounded-md shadow-md mt-2 w-48"
    >
      {menuList.map((menu) => (
        <button
          key={menu.id}
          className="w-full text-left px-4 py-2 hover:bg-gray-700 focus:outline-none flex gap-x-2 items-center rounded-md"
          onClick={() => toggleModal(menu.id)}
        >
          <span>{menu.icon}</span>
          <span>{menu.label}</span>
        </button>
      ))}
    </div>
  );
}

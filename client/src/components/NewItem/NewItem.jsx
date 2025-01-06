import React, { useState, useMemo, useRef, useEffect } from "react";
import { FaKey } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { FaRegStickyNote } from "react-icons/fa";
import { FaFolder } from "react-icons/fa";

export default function NewItem() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const menuList = useMemo(
    () => [
      {
        id: "password",
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

  const dropdownRef = useRef(null);

  // Close the dropdown if clicked outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative inline-block">
      <button
        className="bg-accent text-white p-2 rounded-md hover:bg-accent-dark focus:outline-none flex items-center gap-x-2"
        onClick={toggleDropdown}
      >
        <FaPlusCircle className="w-6 h-6" />
        <span className="">Add New</span>
      </button>
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute bg-gray-800 text-white rounded-md shadow-md mt-2 w-48"
        >
          {menuList.map((menu) => (
            <button
              key={menu.id}
              className="w-full text-left px-4 py-2 hover:bg-gray-700 focus:outline-none flex gap-x-2 items-center rounded-md"
            >
              <span className="">{menu.icon}</span>
              <span className="">{menu.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

import React, { useState, useRef, useEffect } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { FaCog } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";

import { Link } from "react-router-dom";

export default function User({ user, logout }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Close dropdown when clicked outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block">
      <button
        className="bg-accent text-white p-2 rounded-md hover:bg-accent-dark focus:outline-none flex items-center gap-x-2"
        onClick={toggleDropdown}
      >
        <FaRegUserCircle className="w-6 h-6" />
        <span>{user.username}</span>
      </button>
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute bg-gray-800 text-white rounded-md shadow-md mt-2 right-0 w-48"
        >
          <Link
            to="/profile"
            className="w-full text-left px-4 py-2 hover:bg-gray-700 focus:outline-none flex gap-x-2 items-center rounded-md"
          >
            <FaCog className="w-4 h-4" />
            <span className="">Profile Settings</span>
          </Link>
          <button
            onClick={logout}
            className="w-full text-left px-4 py-2 hover:bg-gray-700 focus:outline-none flex gap-x-2 items-center rounded-md"
          >
            <FaSignOutAlt className="w-4 h-4" />
            <span className="">Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}

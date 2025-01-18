import React, { useState, useRef, useEffect } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { FaCog } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../services/authService";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function User({ user }) {
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

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

  const handleLogout = async () => {
    try {
      const data = await AuthService.logoutUser();
      console.log("DATA: ", data);
      dispatch(logout());
      navigate("/login");
      toast.success("Successfully logged out.");
    } catch (error) {
      console.log("ERROR", error);
      toast.error("Failed to logout.");
    }
  };

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
            onClick={handleLogout}
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

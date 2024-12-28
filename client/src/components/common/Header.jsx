import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import AuthService from "../../services/authService";
import { Link } from "react-router-dom";

export default function Header() {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div className="w-full bg-primary text-white">
      <nav className="w-full max-w-[1440px] flex items-center px-8 py-4 justify-between gap-x-4 shadow-subtle">
        <Link to="/">
          <span className="w-auto ">Passthesalt</span>
        </Link>

        <div className="flex-1">
          <input
            type="text"
            className="w-full py-1 px-2 text-sm"
            placeholder="Search password..."
          />
        </div>
        {user ? (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              <span>{user.username}</span>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-black hover:bg-gray-200"
                >
                  Profile Settings
                </Link>
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-black hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="w-auto flex items-center justify-end gap-x-4 ">
            <Link to="/login">
              <button className="bg-secondary text-white hover:shadow-mild px-2 py-1">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-secondary text-white hover:shadow-mild px-2 py-1">
                Register
              </button>
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}

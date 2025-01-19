import React, { useState } from "react";
import { Link } from "react-router-dom";
import User from "./User";
import AddItem from "../features/add-item";
import salt_logo from "../assets/salt_logo.svg";
import { useSelector } from "react-redux";

export default function Header() {
  const user = useSelector((state) => state.user.user);

  return (
    <div className="w-full bg-darkBackground border-b-borderDark shadow-subtle">
      <nav className="w-full max-w-[1440px] flex items-center px-8 py-4 justify-between gap-x-4 ">
        <Link
          to="/"
          className="flex items-center gap-x-0 py-2 text-darkText group"
        >
          {/* <img
            src={hand}
            alt=""
            className="w-6 h-6 object-contain text-darkText"
          /> */}
          <img
            src={salt_logo}
            alt=""
            className="w-10 h-10 transform group-hover:translate-x-32 rotate-45 transition-transform duration-300 group-hover:rotate-180 "
          />
          <span className="w-auto ">Passthesalt</span>
        </Link>

        <div className="w-full max-w-[400px]">
          <input
            type="text"
            className="w-full py-2 px-2 text-sm rounded-md focus:outline-none text-black"
            placeholder="Search..."
          />
        </div>
        {user ? (
          <div className="flex gap-x-2">
            <AddItem />
            <User user={user} />
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

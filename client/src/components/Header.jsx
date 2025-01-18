import React, { useState } from "react";
import { Link } from "react-router-dom";
import User from "./User/User";
import AddItem from "../features/add-item";
import hand from "../assets/hand.png";
import { useSelector } from "react-redux";

export default function Header() {
  const user = useSelector((state) => state.user.user);

  return (
    <div className="w-full bg-darkBackground border-b-borderDark shadow-subtle">
      <nav className="w-full max-w-[1440px] flex items-center px-8 py-4 justify-between gap-x-4 ">
        <Link to="/" className="flex items-center gap-x-2 py-2 text-darkText">
          <img
            src={hand}
            alt=""
            className="w-6 h-6 object-contain text-darkText"
          />
          <span className="w-auto ">Passthesalt</span>
        </Link>

        <div className="w-full max-w-[500px]">
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

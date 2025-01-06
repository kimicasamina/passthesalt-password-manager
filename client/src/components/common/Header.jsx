import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import NewItem from "../NewItem/NewItem";
import User from "../User/User";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <div className="w-full bg-primary text-white">
      <nav className="w-full max-w-[1440px] flex items-center px-8 py-4 justify-between gap-x-4 shadow-subtle">
        <Link to="/">
          <span className="w-auto ">Passthesalt</span>
        </Link>

        <div className="w-full max-w-[500px]">
          <input
            type="text"
            className="w-full py-1 px-2 text-sm"
            placeholder="Search password..."
          />
        </div>
        {user ? (
          <div className="flex gap-x-2">
            <NewItem />
            <User user={user} logout={logout} />
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

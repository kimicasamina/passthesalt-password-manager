import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

export default function GuessLayout() {
  return (
    <div className="w-full max-w-[1440px] mx-auto h-screen flex flex-col bg-lightBackground">
      <Header />
      <main className="w-full flex-1">
        <Outlet />
      </main>
    </div>
  );
}

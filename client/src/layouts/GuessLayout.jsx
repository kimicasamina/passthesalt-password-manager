import React from "react";
import Header from "../components/common/Header";
import { Outlet } from "react-router-dom";

export default function GuessLayout() {
  return (
    <div className="w-full h-screen flex flex-col">
      <Header />
      <main className="w-full flex-1">
        <Outlet />
      </main>
    </div>
  );
}

import React from "react";
import Header from "../components/common/Header";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function GuessLayout() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  return (
    <div className="w-full h-screen flex flex-col">
      <Header />
      <main className="w-full mt=auto">
        <Outlet />
      </main>
    </div>
  );
}

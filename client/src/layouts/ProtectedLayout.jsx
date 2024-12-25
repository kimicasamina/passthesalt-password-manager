import React from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedLayout() {
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

// layouts/CustomLayout.js
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "../components/common/Header";

const CustomLayout = ({ isProtected = false }) => {
  const { user } = useAuth();

  // Redirect user based on authentication status
  if (isProtected && !user) return <Navigate to="/login" />;

  return (
    <div className="w-full h-screen flex flex-col">
      <Header />
      <main className="w-full h-full">
        <Outlet />
      </main>
    </div>
  );
};

export default CustomLayout;

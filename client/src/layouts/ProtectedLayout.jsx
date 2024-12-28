import React from "react";
import { useAuth } from "../context/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedLayout() {
  const { user, loading, error } = useAuth();

  if (loading) return <div>Loading...</div>; // Show loading state
  if (!user && !loading) return <Navigate to="/login" />;

  return (
    <div className="w-full h-screen flex flex-col">
      <Outlet />
    </div>
  );
}

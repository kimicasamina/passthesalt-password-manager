import React from "react";
import { useAuth } from "../context/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedLayout() {
  const { user, loading, error } = useAuth();

  if (loading) return <LoadingPage />; // Show loading state
  if (error) return <div>{error}</div>; // Show error state
  if (!user) return <Navigate to="/login" />; // Redirect to login if not authenticated

  console.log("HELLO WORLD...");
  return (
    <div className="h-full w-full flex flex-col">
      <Outlet />
    </div>
  );
}

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import AuthService from "../services/authService";
import { setInitialData } from "../store/slice/userSlice";

export default function ProtectedLayout() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user); // Ensure you are accessing `user` data

  console.log("USER", user);
  // If user is not logged in, redirect to login page

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await AuthService.getCurrentUser();
        const user = {
          user: data.user,
          ...data.user,
        };
        dispatch(setInitialData(user)); // Dispatch user data
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    // Only fetch user data if it's not already in the store
    if (!user) {
      fetchUserData();
    }
  }, [user, dispatch]);

  // Loading state while waiting for user data
  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import AuthService from "../services/authService";
import { setInitialData } from "../store/slice/userSlice";
import LoadingPage from "../components/LoadingPage";

export default function ProtectedLayout() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user.user); // Ensure you are accessing `user` data

  console.log("USER", user);
  // If user is not logged in, redirect to login page

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const data = await AuthService.getCurrentUser();
        const user = {
          user: data.user,
          ...data.user,
        };
        dispatch(setInitialData(user)); // Dispatch user data
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!user && loading) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [user, dispatch, loading]);

  //

  // If still loading, don't redirect yet
  if (loading) {
    return <LoadingPage />;
  }

  // If no user data is available after fetching, redirect to login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

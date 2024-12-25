// routes/router.js
import { createBrowserRouter } from "react-router-dom";
import CustomLayout from "../layouts/CustomLayouts";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CustomLayout isProtected={false} />, // Guest layout (unauthenticated users)
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/",
    element: <CustomLayout isProtected={true} />, // Protected layout (authenticated users)
    children: [
      {
        index: true,
        element: <Home />, // Home is protected
      },
      {
        path: "/profile",
        element: <Profile />, // Profile is protected
      },
    ],
  },
]);

export default router;

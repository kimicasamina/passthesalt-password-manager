import { createBrowserRouter } from "react-router-dom";
import GuessLayout from "../layouts/GuessLayout";
import ProtectedLayout from "../layouts/ProtectedLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GuessLayout />,
    children: [
      {
        path: "/",
        element: <ProtectedLayout />,
        children: [
          { index: true, element: <Home /> },
          { path: "/profile", element: <Profile /> },
        ],
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;

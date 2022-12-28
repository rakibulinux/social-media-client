import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import About from "../pages/About/About";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Friends from "../pages/Friends/Friends";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Messages from "../pages/Messages/Messages";
import Profile from "../pages/Profile/Profile";
import Register from "../pages/Register/Register";
import Settings from "../pages/Settings/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/messages",
        element: <Messages />,
      },
      {
        path: "/friends",
        element: <Friends />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export default router;

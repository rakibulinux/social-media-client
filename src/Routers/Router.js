import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import About from "../pages/About/About";
import UpdateAbout from "../pages/About/UpdateAbout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Friends from "../pages/Friends/Friends";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Media from "../pages/Media/Media";
import Messages from "../pages/Messages/Messages";
import PostDetails from "../pages/PostDetails/PostDetails";
import Profile from "../pages/Profile/Profile";
import Register from "../pages/Register/Register";
import Settings from "../pages/Settings/Settings";
import PrivateRoute from "./PrivateRoute";

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
        path: "/media",
        element: <Media />,
      },
      {
        path: "/posts/:id",
        element: <PostDetails />,
        loader: ({ params }) =>
          fetch(`${process.env.REACT_APP_API_URL}/posts/${params.id}`),
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
        element: (
          <PrivateRoute>
            <About />
          </PrivateRoute>
        ),
      },
      {
        path: "/about/edit/:id",
        element: (
          <PrivateRoute>
            <UpdateAbout />
          </PrivateRoute>
        ),
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

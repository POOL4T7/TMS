import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./screens/Home/Home";
import Login from "./screens/Auth/SignIn";
import Register from "./screens/Auth/Signup";
import Profile from "./screens/Company/Profile";
import NotFound from "./screens/NotFound";
import DashBoard from "./screens/Company/DashBoard";
import { AuthState } from "./models/custom";
import CompanyLayout from "./components/Layout/CompanyLayout";
import Team from "./screens/Company/Team";
import Users from "./screens/Company/Users";
import Position from "./screens/Company/Position";

const router = (authState: AuthState) => {
  return createBrowserRouter([
    {
      path: "/",
      element: authState?.type === "company" ? <CompanyLayout /> : <Layout />,
      children: [
        {
          path: "",
          element: authState?.type === "company" ? <DashBoard /> : <Home />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        // {
        //   path: "/dashboard",
        //   element: <DashBoard />,
        // },
        {
          path: "/teams",
          element: <Team />,
        },
        {
          path: "/users",
          element: <Users />,
        },
        {
          path: "/positions",
          element: <Position />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Register />,
    },
    {
      path: "404",
      element: <NotFound />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
};

export default router;

import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { CssBaseline } from "@mui/material";

const Layout = () => {
  return (
    <>
    <CssBaseline />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;

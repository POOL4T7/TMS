import { Outlet } from "react-router-dom";
import Header from "./common/Header";
import Footer from "./common/Footer";
import { Box } from "@mui/material";

const Layout = () => {
  return (
    <>
      <Header SideBar={() => <> </>} />
      <Box
        sx={{
          top: "68.5px",
          position: "relative",
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </>
  );
};

export default Layout;

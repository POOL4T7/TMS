import SideNav from "./common/SideNav";
import Header from "./common/Header";
import { Box, Stack, Theme, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";

const CompanyLayout = () => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );
  return (
    <>
      <Header />
      <Stack direction="row" spacing={2}>
        <SideNav />
        <Box
          flex={8}
          sx={{
            backgroundColor: "#F9FAFB",
            position: "relative",
            left: isMobile ? "0px" : "280px",
            top: 69,
            maxWidth: isMobile ? "100vw" : "calc(100vw - 296px)",
            width: "100%",
            height: "100vh",
          }}
        >
          <Outlet />
        </Box>
      </Stack>
    </>
  );
};

export default CompanyLayout;

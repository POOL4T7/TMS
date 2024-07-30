import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useTypedSelector } from "@/redux/store";
import { userInfo } from "@/redux/features/authSlice";
import { emptyStorage, setLocalStorage } from "@/utils/storage";
import { Theme, useMediaQuery } from "@mui/material";
import logo from "@/assets/logo.gif";
import { changeLanguage } from "@/redux/features/languageSlice";
import { useTranslation } from "react-i18next";

const pages: string[] = [];

interface PropType {
  SideBar: () => JSX.Element;
}

function Navbar({ SideBar }: PropType) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElLang, setAnchorElLang] = React.useState<null | HTMLElement>(
    null
  );
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );
  const { t } = useTranslation();

  const lang = useTypedSelector((state) => state.lang);

  const handleChangeLanguage = (lng: string) => {
    setLocalStorage("lang", lng);
    dispatch(changeLanguage(lng));
  };
  const dispatch = useAppDispatch();

  const authState = useTypedSelector((state) => state.authState);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    emptyStorage();
    dispatch(userInfo({}));
    window.location.href = "/login";
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <img src={logo} alt="logo" style={{ height: "35px" }} />
          <Typography
            variant="h6"
            noWrap
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          >
            <Link style={{ textDecoration: "none", color: "white" }} to={"/"}>
              {t("brandName")}
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            {isMobile && <SideBar />}

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages?.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            GenZ
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {authState.isAuthenticated ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  onMouseEnter={handleOpenUserMenu}
                  sx={{ p: 0 }}
                >
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={() => setAnchorElUser(null)}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
                <MenuItem>
                  <NavLink to={"/profile"}>Profile</NavLink>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Link to={"/login"} style={{ color: "white" }}>
                Login
              </Link>
            </Box>
          )}

          <Box sx={{ flexGrow: 0, margin: "5px" }}>
            <Tooltip title="select languages">
              <IconButton
                onClick={(e) => setAnchorElLang(e.currentTarget)}
                onMouseEnter={(e) => setAnchorElLang(e.currentTarget)}
                // onMouseLeave={() => setAnchorElLang(null)}
                sx={{ p: 0 }}
              >
                <Avatar variant="rounded">{lang}</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElLang}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElLang)}
              onClose={() => setAnchorElLang(null)}
            >
              {["en", "fr", "hi"]
                .filter((l) => l != lang)
                .map((item) => (
                  <MenuItem
                    key={item}
                    onClick={() => handleChangeLanguage(item)}
                  >
                    <Typography>{item}</Typography>
                  </MenuItem>
                ))}
              <MenuItem></MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;

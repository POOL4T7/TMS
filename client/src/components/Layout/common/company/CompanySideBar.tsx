import {
  Box,
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import {
  Groups,
  WebStories,
  QueryStats,
  FolderShared,
  People,
} from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import { useCompanyProfileQuery } from "../../../../redux/services/company";
import Loader from "../../../Loader";

const CompanySideBar = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useCompanyProfileQuery();

  return (
    <Stack direction="row" spacing={2}>
      <Box
        flex={2}
        sx={{
          display: { xs: "none", sm: "block" },
          backgroundColor: "#F9FAFB",
          height: "90vh",
          maxHeight: "100vh",
          position: "fixed",
          left: 0,
          top: 69,
          width: "100%",
          maxWidth: "280px",
        }}
      >
        <Box
          sx={{
            margin: "24px 20px",
            padding: "16px 20px",
            backgroundColor: "#EDEFF2",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
          }}
          className="profile-card"
          onClick={() => navigate("/profile")}
        >
          <Avatar alt={"User"} src={"/"} sx={{ marginRight: "10px" }} />
          {isLoading ? <Loader /> : <Typography>{data?.name}</Typography>}
        </Box>

        <Box>
          <List>
            <ListItem>
              <ListItemButton
                sx={{ "&:hover": { backgroundColor: "#e8effa" } }}
              >
                <ListItemIcon>
                  <QueryStats />
                </ListItemIcon>
                <NavLink
                  to={"/"}
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  <ListItemText primary="Dashboard" />
                </NavLink>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                sx={{ "&:hover": { backgroundColor: "#e8effa" } }}
              >
                <ListItemIcon>
                  <WebStories />
                </ListItemIcon>
                <NavLink
                  to={"/projects"}
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  <ListItemText primary="Projects" />
                </NavLink>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                sx={{ "&:hover": { backgroundColor: "#e8effa" } }}
              >
                <ListItemIcon>
                  <Groups />
                </ListItemIcon>
                <NavLink
                  to={"/teams"}
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  <ListItemText primary="Teams" />
                </NavLink>
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton
                sx={{ "&:hover": { backgroundColor: "#e8effa" } }}
              >
                <ListItemIcon>
                  <FolderShared />
                </ListItemIcon>
                <NavLink
                  to={"/positions"}
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  <ListItemText primary="Position & Roles" />
                </NavLink>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                sx={{ "&:hover": { backgroundColor: "#e8effa" } }}
              >
                <ListItemIcon>
                  <People />
                </ListItemIcon>
                <NavLink
                  to={"/users"}
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  <ListItemText primary="Users" />
                </NavLink>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Box>
    </Stack>
  );
};

export default CompanySideBar;

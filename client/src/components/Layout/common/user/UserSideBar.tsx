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
import { WebStories, QueryStats } from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import Loader from "../../../Loader";
import { useOwnProfileQuery } from "../../../../redux/services/user";

const UserSideBar = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useOwnProfileQuery();

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
          {isLoading ? <Loader /> : <Typography>{data?.firstName}</Typography>}
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
          </List>
        </Box>
      </Box>
    </Stack>
  );
};

export default UserSideBar;

import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../config/constants";
import GridViewIcon from "@mui/icons-material/GridView";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ModelTrainingOutlinedIcon from "@mui/icons-material/ModelTrainingOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAppDispatch } from "../../config/store";
import { logout } from "../../features/auth/authSlice";

export default function Navbar({ width }: { width?: number }) {
  const dispatch = useAppDispatch();

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      width={width || 240}
      minWidth={width || 240}
      height={"100%"}
      borderRight={1}
      borderColor={"#ccc"}
      overflow={"auto"}
    >
      <Box
        p={2}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <img src="/logo.png" alt="" width={100} />
      </Box>
      <Box>
        <List component={"nav"}>
          <ListItem>
            <NavLink to={ROUTES.dashboard} className={"nav-link"}>
              <ListItemButton>
                <ListItemIcon>
                  <GridViewIcon />
                </ListItemIcon>
                <ListItemText>Dashboard</ListItemText>
              </ListItemButton>
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink to={ROUTES.users} className={"nav-link"}>
              <ListItemButton>
                <ListItemIcon>
                  <PersonOutlineIcon />
                </ListItemIcon>
                <ListItemText>Users</ListItemText>
              </ListItemButton>
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink to={ROUTES.ips} className={"nav-link"}>
              <ListItemButton>
                <ListItemIcon>
                  <ModelTrainingOutlinedIcon />
                </ListItemIcon>
                <ListItemText>IPs</ListItemText>
              </ListItemButton>
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink
              to={ROUTES.signIn}
              className={"nav-link"}
              onClick={() => dispatch(logout())}
            >
              <ListItemButton>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText>Sign Out</ListItemText>
              </ListItemButton>
            </NavLink>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}

import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { NavLink, useSearchParams } from "react-router-dom";
import { ROUTES, SEARCH_PARAMS } from "../../config/constants";
import DownloadingIcon from "@mui/icons-material/Downloading";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import GridViewIcon from "@mui/icons-material/GridView";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Navbar({ width }: { width?: number }) {
  let [searchParams] = useSearchParams();

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      width={width || 240}
      minWidth={width || 240}
      height={"100%"}
      borderRight={1}
      borderColor={"#ccc"}
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
          <ListSubheader>Cases</ListSubheader>
          <ListItem>
            <NavLink
              to={`${ROUTES.cases}/${ROUTES.pending}`}
              className={`nav-link${
                searchParams.get(SEARCH_PARAMS.status) &&
                searchParams.get(SEARCH_PARAMS.status) === ROUTES.pending
                  ? " active"
                  : ""
              }`}
            >
              <ListItemButton>
                <ListItemIcon>
                  <DownloadingIcon />
                </ListItemIcon>
                <ListItemText>Pending</ListItemText>
              </ListItemButton>
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink
              to={`${ROUTES.cases}/${ROUTES.inProgress}`}
              className={`nav-link${
                searchParams.get(SEARCH_PARAMS.status) &&
                searchParams.get(SEARCH_PARAMS.status) === ROUTES.inProgress
                  ? " active"
                  : ""
              }`}
            >
              <ListItemButton>
                <ListItemIcon>
                  <AutoModeIcon />
                </ListItemIcon>
                <ListItemText>In Progress</ListItemText>
              </ListItemButton>
            </NavLink>
          </ListItem>

          <ListSubheader>Ips</ListSubheader>
          <ListItem>
            <NavLink
              to={`${ROUTES.ip}/${ROUTES.published}`}
              className={`nav-link${
                searchParams.get(SEARCH_PARAMS.status) &&
                searchParams.get(SEARCH_PARAMS.status) === ROUTES.published
                  ? " active"
                  : ""
              }`}
            >
              <ListItemButton>
                <ListItemIcon>
                  <DownloadingIcon />
                </ListItemIcon>
                <ListItemText>Published</ListItemText>
              </ListItemButton>
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink
              to={`${ROUTES.ip}/${ROUTES.inactive}`}
              className={`nav-link${
                searchParams.get(SEARCH_PARAMS.status) &&
                searchParams.get(SEARCH_PARAMS.status) === ROUTES.inactive
                  ? " active"
                  : ""
              }`}
            >
              <ListItemButton>
                <ListItemIcon>
                  <DownloadingIcon />
                </ListItemIcon>
                <ListItemText>In Active</ListItemText>
              </ListItemButton>
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink
              to={`${ROUTES.ip}/${ROUTES.draft}`}
              className={`nav-link${
                searchParams.get(SEARCH_PARAMS.status) &&
                searchParams.get(SEARCH_PARAMS.status) === ROUTES.draft
                  ? " active"
                  : ""
              }`}
            >
              <ListItemButton>
                <ListItemIcon>
                  <DownloadingIcon />
                </ListItemIcon>
                <ListItemText>Draft</ListItemText>
              </ListItemButton>
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink
              to={`${ROUTES.ip}/${ROUTES.appliedForPatent}`}
              className={`nav-link${
                searchParams.get(SEARCH_PARAMS.status) &&
                searchParams.get(SEARCH_PARAMS.status) ===
                  ROUTES.appliedForPatent
                  ? " active"
                  : ""
              }`}
            >
              <ListItemButton>
                <ListItemIcon>
                  <DownloadingIcon />
                </ListItemIcon>
                <ListItemText>Applied For Patent</ListItemText>
              </ListItemButton>
            </NavLink>
          </ListItem>

          <ListSubheader>Auth</ListSubheader>
          <ListItem>
            <NavLink to={ROUTES.profile} className={"nav-link"}>
              <ListItemButton>
                <ListItemIcon>
                  <PersonOutlineIcon />
                </ListItemIcon>
                <ListItemText>Profile</ListItemText>
              </ListItemButton>
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink to={ROUTES.signIn} className={"nav-link"}>
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

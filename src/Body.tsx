import { Box } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./config/store";
import { getIPsThunk } from "./features/ip/ipSlice";
import { getUsersThunk } from "./features/user/userSlice";

const headerHeight = 64;
const navBarWidth = 240;

export default function Body() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { accessToken } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!accessToken) return navigate("/sign-in");
    dispatch(getIPsThunk());
    dispatch(getUsersThunk());
  }, [accessToken]);

  return (
    <Box height={"100%"} display={"flex"}>
      <Navbar width={navBarWidth} />
      <Box display={"flex"} flexDirection={"column"} width={"100%"}>
        <Header height={headerHeight} />
        <Box
          height={"100%"}
          maxHeight={`calc(100% - ${headerHeight}px)`}
          overflow={"auto"}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

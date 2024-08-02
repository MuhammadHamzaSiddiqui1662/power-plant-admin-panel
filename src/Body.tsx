import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import { useEffect } from "react";
import { useAppDispatch } from "./config/store";
import { getSaleDeedsThunk } from "./features/saleDeed/saleDeedSlice";

const headerHeight = 64;
const navBarWidth = 240;

export default function Body() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSaleDeedsThunk());
  }, []);

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

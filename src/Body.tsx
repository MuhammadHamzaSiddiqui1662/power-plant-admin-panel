import { Box } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./config/store";
import { api } from "./config/axios";
import { logout, refreshTokenThunk } from "./features/auth/authSlice";
import { ROUTES } from "./config/constants";

const headerHeight = 64;
const navBarWidth = 240;

export default function Body() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { accessToken } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!accessToken) return navigate(`/${ROUTES.signIn}`);
  }, [accessToken]);

  useEffect(() => {
    api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // Handle token expiration and retry the request with a refreshed token
        if (
          error.response &&
          error.response.status === 401 &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;
          const { payload }: any = await dispatch(refreshTokenThunk());
          if (payload.status === 200) {
            return api(originalRequest);
          } else {
            await dispatch(logout());
            navigate(`/${ROUTES.signIn}`, {
              state: { from: pathname },
              replace: true,
            });
            return Promise.reject(error);
          }
        }

        // Logout on expired token
        if (
          error.response &&
          error.response.status === 401 &&
          originalRequest._retry
        ) {
          await dispatch(logout());
        }

        return Promise.reject(error);
      }
    );
  }, [dispatch]);

  return (
    <Box height={"100%"} display={"flex"}>
      <Navbar width={navBarWidth} />
      <Box
        display={"flex"}
        flexDirection={"column"}
        width={`calc(100% - ${navBarWidth}px)`}
      >
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

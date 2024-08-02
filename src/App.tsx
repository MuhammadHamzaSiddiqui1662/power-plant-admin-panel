import { useEffect } from "react";
import { Outlet, useRoutes } from "react-router-dom";
import { ROUTES } from "./config/constants";
import Body from "./Body";
import Pending from "./pages/Cases/Pending/Pending";
import InProgress from "./pages/Cases/InProgress/InProgress";
import SaleDeed from "./pages/Cases/SaleDeed/SaleDeed";
import Profile from "./pages/Profile/Profile";
import Dashboard from "./pages/Dashboard/Dashboard";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import VerifyOtp from "./pages/VerifyOtp/VerifyOtp";
import "./App.css";

function App() {
  useEffect(() => {
    document.title = "Registrar Portal";
  }, []);

  const routes = useRoutes([
    {
      path: ROUTES.signIn,
      element: <SignIn />,
    },
    {
      path: ROUTES.signUp,
      element: <SignUp />,
    },
    {
      path: ROUTES.verifyOtp,
      element: <VerifyOtp />,
    },
    {
      path: "/",
      element: <Body />,
      children: [
        {
          path: ROUTES.dashboard,
          element: <Dashboard />,
        },
        {
          path: ROUTES.forgotPassword,
          element: <></>,
        },
        {
          path: ROUTES.profile,
          element: <Profile />,
        },
        {
          path: ROUTES.cases,
          element: <Outlet />,
          children: [
            {
              path: ROUTES.saleDeed,
              element: <SaleDeed />,
            },
            {
              path: ROUTES.pending,
              element: <Pending />,
            },
            {
              path: ROUTES.inProgress,
              element: <InProgress />,
            },
          ],
        },
      ],
    },
  ]);
  return <>{routes}</>;
}

export default App;

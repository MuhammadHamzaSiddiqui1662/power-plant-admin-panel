import { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import { ROUTES } from "./config/constants";
import SignIn from "./pages/SignIn/SignIn";
import Body from "./Body";
import Dashboard from "./pages/Dashboard/Dashboard";
import Users from "./pages/Users/Users";
import UserDetails from "./pages/UserDetails/UserDetails";
import IPs from "./pages/Ip/Ips";
import IpDetailsPage from "./pages/IpDetails/IpDetails";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  useEffect(() => {
    document.title = "Admin Panel";
  }, []);

  const routes = useRoutes([
    {
      path: ROUTES.signIn,
      element: <SignIn />,
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
          path: ROUTES.users,
          element: <Users />,
        },
        {
          path: `${ROUTES.users}/:id`,
          element: <UserDetails />,
        },
        {
          path: `${ROUTES.ips}`,
          element: <IPs />,
        },
        {
          path: `${ROUTES.ips}/:id`,
          element: <IpDetailsPage />,
        },
      ],
    },
  ]);
  return <>{routes}</>;
}

export default App;

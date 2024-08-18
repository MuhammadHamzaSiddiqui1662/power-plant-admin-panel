import { useEffect } from "react";
import { Outlet, useRoutes } from "react-router-dom";
import { ROUTES } from "./config/constants";
import Body from "./Body";
// import Pending from "./pages/Cases/Pending/Pending";
// import InProgress from "./pages/Cases/InProgress/InProgress";
// import SaleDeed from "./pages/Cases/SaleDeed/SaleDeed";
import Published from "./pages/Ip/Published/published";
// import Profile from "./pages/Profile/Profile";
import Dashboard from "./pages/Dashboard/Dashboard";
import SignIn from "./pages/SignIn/SignIn";
// import SignUp from "./pages/SignUp/SignUp";
// import VerifyOtp from "./pages/VerifyOtp/VerifyOtp";
import "./App.css";
import InactiveIPs from "./pages/Ip/Inactive/inActive";
import DraftIPs from "./pages/Ip/Draft/draft";
import AppliedForPatentIPs from "./pages/Ip/AppliedForPatent/appliedForPatent";
import Users from "./pages/Users/Users";
import ApprovedBrokers from "./pages/Brokers/Approved/Approved";
import UnApprovedBrokers from "./pages/Brokers/UnApproved/UnApproved";
import UserDetails from "./components/UserDetails/UserDetails";
import IpDetailsPage from "./components/IpDetails/IpDetails";
import "react-toastify/dist/ReactToastify.css";
import PendingIPs from "./pages/Ip/Pending/pending";
import SuspendedBrokers from "./pages/Brokers/Suspended/Suspended";

function App() {
  useEffect(() => {
    document.title = "Admin Panel";
  }, []);

  const routes = useRoutes([
    {
      path: ROUTES.signIn,
      element: <SignIn />,
    },
    // {
    //   path: ROUTES.signUp,
    //   element: <SignUp />,
    // },
    // {
    //   path: ROUTES.verifyOtp,
    //   element: <VerifyOtp />,
    // },
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
          path: `${ROUTES.ip}/:id`,
          element: <IpDetailsPage />,
        },
        // {
        //   path: ROUTES.forgotPassword,
        //   element: <></>,
        // },
        // {
        //   path: ROUTES.profile,
        //   element: <Profile />,
        // },

        // {
        //   path: ROUTES.cases,
        //   element: <Outlet />,
        //   children: [
        //     {
        //       path: ROUTES.saleDeed,
        //       element: <SaleDeed />,
        //     },
        //     {
        //       path: ROUTES.pending,
        //       element: <Pending />,
        //     },
        //     {
        //       path: ROUTES.inProgress,
        //       element: <InProgress />,
        //     },
        //   ],
        // },
        {
          path: ROUTES.brokers,
          element: <Outlet />,
          children: [
            {
              path: ROUTES.approved,
              element: <ApprovedBrokers />,
            },
            {
              path: ROUTES.unapproved,
              element: <UnApprovedBrokers />,
            },
            {
              path: ROUTES.suspended,
              element: <SuspendedBrokers />,
            },
          ],
        },
        {
          path: ROUTES.ip,
          element: <Outlet />,
          children: [
            {
              path: ROUTES.published,
              element: <Published />,
            },
            {
              path: ROUTES.inactive,
              element: <InactiveIPs />,
            },
            {
              path: ROUTES.draft,
              element: <DraftIPs />,
            },
            {
              path: ROUTES.appliedForPatent,
              element: <AppliedForPatentIPs />,
            },
            {
              path: ROUTES.pending,
              element: <PendingIPs />,
            },
          ],
        },
      ],
    },
  ]);
  return <>{routes}</>;
}

export default App;

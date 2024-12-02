import { Box, Typography } from "@mui/material";
import StatsCard from "../../components/StatsCard/StatsCard";
import { useAppSelector } from "../../config/store";
import { ROUTES } from "../../config/constants";
import { NavLink } from "react-router-dom";

export default function Dashboard() {
  const {
    user: { users, approvedBrokers, unApprovedBrokers },
    ip: { ips, appliedForPatentIPs, publishedIPs },
  } = useAppSelector((state) => state);

  return (
    <Box p={4} display={"flex"} flexDirection={"column"} gap={3}>
      <Typography variant="h4">Dashboard</Typography>
      <Box display={"grid"} gridTemplateColumns={"1fr 1fr 1fr"} gap={5}>
        <NavLink to={`${ROUTES.brokers}/unapproved`} className={"nav-link"}>
          <StatsCard
            variant="contained"
            title="Un Approved Brokers"
            value={unApprovedBrokers.length.toString()}
          />
        </NavLink>
        <NavLink to={`${ROUTES.brokers}/approved`} className={"nav-link"}>
          <StatsCard
            variant="outlined"
            title="Approved Brokers"
            value={approvedBrokers.length.toString()}
          />
        </NavLink>
        <NavLink to={ROUTES.users} className={"nav-link"}>
          <StatsCard
            variant="outlined"
            title="Total Users"
            value={users.length.toString()}
          />
        </NavLink>
        <NavLink to={`${ROUTES.ips}/appliedForPatent`} className={"nav-link"}>
          <StatsCard
            variant="outlined"
            title="Applied for patent"
            value={appliedForPatentIPs.length.toString()}
          />
        </NavLink>
        <NavLink to={`${ROUTES.ips}/published`} className={"nav-link"}>
          <StatsCard
            variant="outlined"
            title="Published"
            value={publishedIPs.length.toString()}
          />
        </NavLink>
        <StatsCard
          variant="contained"
          title="Total IPs"
          value={ips.length.toString()}
        />
      </Box>
    </Box>
  );
}

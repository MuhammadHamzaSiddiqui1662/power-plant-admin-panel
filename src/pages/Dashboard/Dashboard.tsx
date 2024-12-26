import { Box, Typography } from "@mui/material";
import StatsCard from "../../components/StatsCard/StatsCard";
import { ROUTES } from "../../config/constants";
import { NavLink } from "react-router-dom";
import { useGetDashboardDataQuery } from "../../services/dashboard";

export default function Dashboard() {
  const { data, isLoading } = useGetDashboardDataQuery("");

  return (
    <Box p={4} display={"flex"} flexDirection={"column"} gap={3}>
      <Typography variant="h4">Dashboard</Typography>
      <Box display={"grid"} gridTemplateColumns={"1fr 1fr 1fr"} gap={5}>
        <NavLink to={`${ROUTES.brokers}/unapproved`} className={"nav-link"}>
          <StatsCard
            variant="contained"
            title="Un Approved Brokers"
            value={data?.unApprovedBrokers}
            isLoading={isLoading}
          />
        </NavLink>
        <NavLink to={`${ROUTES.brokers}/approved`} className={"nav-link"}>
          <StatsCard
            variant="outlined"
            title="Approved Brokers"
            value={data?.approvedBrokers}
            isLoading={isLoading}
          />
        </NavLink>
        <NavLink to={ROUTES.users} className={"nav-link"}>
          <StatsCard
            variant="outlined"
            title="Total Users"
            value={data?.totalUsers}
            isLoading={isLoading}
          />
        </NavLink>
        <NavLink to={`${ROUTES.ips}/appliedForPatent`} className={"nav-link"}>
          <StatsCard
            variant="outlined"
            title="Applied for patent"
            value={data?.appliedForPatentIPs}
            isLoading={isLoading}
          />
        </NavLink>
        <NavLink to={`${ROUTES.ips}/published`} className={"nav-link"}>
          <StatsCard
            variant="outlined"
            title="Published"
            value={data?.publishedIPs}
            isLoading={isLoading}
          />
        </NavLink>
        <StatsCard
          variant="contained"
          title="Total IPs"
          value={data?.totalIPs}
          isLoading={isLoading}
        />
      </Box>
    </Box>
  );
}

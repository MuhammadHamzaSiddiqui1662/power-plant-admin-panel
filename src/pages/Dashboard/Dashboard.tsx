import { Box, Typography } from "@mui/material";
import StatsCard from "../../components/StatsCard/StatsCard";
import { useAppSelector } from "../../config/store";

export default function Dashboard() {
  // const { activeIPs, archivedIPs, draftIPs, pendingIPs } = useAppSelector(
  //   (state) => state.ip
  // );
  const {
    user: { users, approvedBrokers, unApprovedBrokers },
    ip: { ips, pendingIPs, activeIPs },
  } = useAppSelector((state) => state);

  return (
    <Box p={4} display={"flex"} flexDirection={"column"} gap={3}>
      <Typography variant="h4">Dashboard</Typography>
      <Box display={"grid"} gridTemplateColumns={"1fr 1fr 1fr"} gap={5}>
        <StatsCard
          variant="contained"
          title="Un Approved Brokers"
          value={unApprovedBrokers.length.toString()}
        />
        <StatsCard
          variant="outlined"
          title="Approved Brokers"
          value={approvedBrokers.length.toString()}
        />
        <StatsCard
          variant="outlined"
          title="Total Users"
          value={users.length.toString()}
        />
        <StatsCard
          variant="outlined"
          title="Applied for patent"
          value={pendingIPs.length.toString()}
        />
        <StatsCard
          variant="outlined"
          title="Published"
          value={activeIPs.length.toString()}
        />
        <StatsCard
          variant="contained"
          title="Total IPs"
          value={ips.length.toString()}
        />
      </Box>
    </Box>
  );
}
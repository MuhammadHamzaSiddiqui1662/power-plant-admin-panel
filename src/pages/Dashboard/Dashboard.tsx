import { Box, Typography } from "@mui/material";
import StatsCard from "../../components/StatsCard/StatsCard";
import { useAppSelector } from "../../config/store";

export default function Dashboard() {
  const { activeIPs, archivedIPs, draftIPs, pendingIPs } = useAppSelector(
    (state) => state.ip
  );

  return (
    <Box p={4} display={"flex"} flexDirection={"column"} gap={3}>
      <Typography variant="h4">Dashboard</Typography>
      <Box display={"grid"} gridTemplateColumns={"1fr 1fr"} gap={5}>
        <StatsCard
          variant="contained"
          title="Applied for patent"
          value={pendingIPs.length.toString()}
        />
        <StatsCard
          variant="outlined"
          title="In Active"
          value={archivedIPs.length.toString()}
        />
        <StatsCard
          variant="outlined"
          title="Draft"
          value={draftIPs.length.toString()}
        />
        <StatsCard
          variant="contained"
          title="Published"
          value={activeIPs.length.toString()}
        />
      </Box>
    </Box>
  );
}

import { Box, Typography } from "@mui/material";
import StatsCard from "../../components/StatsCard/StatsCard";
import { useAppSelector } from "../../config/store";

export default function Dashboard() {
  const { cityCourt, inProgressSaleDeeds, pendingSaleDeeds, transferred } =
    useAppSelector((state) => state.saleDeed);

  return (
    <Box p={4} display={"flex"} flexDirection={"column"} gap={3}>
      <Typography variant="h4">Dashboard</Typography>
      <Box display={"grid"} gridTemplateColumns={"1fr 1fr"} gap={5}>
        <StatsCard
          variant="contained"
          title="Pending"
          value={pendingSaleDeeds.length.toString()}
        />
        <StatsCard
          variant="outlined"
          title="In Progress"
          value={inProgressSaleDeeds.length.toString()}
        />
        <StatsCard
          variant="outlined"
          title="City Court"
          value={cityCourt.length.toString()}
        />
        <StatsCard
          variant="contained"
          title="Transfered"
          value={transferred.length.toString()}
        />
      </Box>
    </Box>
  );
}

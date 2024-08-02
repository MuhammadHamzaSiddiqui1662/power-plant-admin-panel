import { Box, Typography } from "@mui/material";
import { Plot } from "../../types/saleDeed";

interface Props {
  plot: Plot;
}

export default function PlotDetails({ plot }: Props) {
  if (!plot) return <></>;
  return (
    <Box display={"flex"} flexDirection={"column"} gap={1}>
      <Typography variant="h5">Plot Details</Typography>
      <Box display={"grid"} gridTemplateColumns={"1fr 1fr 1fr"} gap={1}>
        <Box display={"flex"} gap={1}>
          <Typography>Category:</Typography>
          <Typography fontWeight={600}>{plot.plotCategory}</Typography>
        </Box>
        <Box display={"flex"} gap={1}>
          <Typography>No:</Typography>
          <Typography fontWeight={600}>{plot.plotNumber}</Typography>
        </Box>
        <Box display={"flex"} gap={1}>
          <Typography>Block:</Typography>
          <Typography fontWeight={600}>{plot.blockNumber}</Typography>
        </Box>
        <Box display={"flex"} gap={1}>
          <Typography>Scheme:</Typography>
          <Typography fontWeight={600}>{plot.scheme}</Typography>
        </Box>
        <Box display={"flex"} gap={1}>
          <Typography>Nature:</Typography>
          <Typography fontWeight={600}>{plot.plotNature}</Typography>
        </Box>
        <Box display={"flex"} gap={1}>
          <Typography>Size:</Typography>
          <Typography fontWeight={600}>{plot.plotSize} sq yards</Typography>
        </Box>
        <Box display={"flex"} gap={1}>
          <Typography>Corner Plot:</Typography>
          <Typography fontWeight={600}>
            {plot.plotIsCorner ? "Yes" : "No"}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

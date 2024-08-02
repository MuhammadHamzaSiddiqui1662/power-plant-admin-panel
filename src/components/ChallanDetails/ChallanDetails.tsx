import { Box, Typography } from "@mui/material";
import { SaleDeedChalan } from "../../types/saleDeed";
import dayjs from "dayjs";

interface Props {
  chalan: SaleDeedChalan;
}

export default function ChallanDetails({ chalan }: Props) {
  if (!chalan) return <></>;
  return (
    <Box display={"flex"} flexDirection={"column"} gap={1}>
      <Typography variant="h5">Chalan Details</Typography>
      <Box display={"grid"} gridTemplateColumns={"1fr 1fr 1fr"} gap={1}>
        <Box display={"flex"} gap={1}>
          <Typography>Chalan No:</Typography>
          <Typography fontWeight={600}>32</Typography>
        </Box>
        <Box display={"flex"} gap={1}>
          <Typography>Amount:</Typography>
          <Typography fontWeight={600}>
            {chalan.saleDeedChalanValue.toLocaleString("en-US", {
              style: "currency",
              currency: "PKR",
            })}
          </Typography>
        </Box>
        <Box display={"flex"} gap={1}>
          <Typography>Dated:</Typography>
          <Typography fontWeight={600}>
            {dayjs(chalan.saleDeedChalanDate).format("MMM DD, YYYY")}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

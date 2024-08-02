import { Box, Typography } from "@mui/material";
import { getUser } from "../../services/auth";

export default function Profile() {
  const user = getUser();
  console.log(user);

  return (
    <Box p={4} height={"100%"}>
      <Typography variant="h4">Profile</Typography>
    </Box>
  );
}

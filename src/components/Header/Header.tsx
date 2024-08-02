import { Box } from "@mui/material";

export default function Header({ height }: { height?: number }) {
  return (
    <Box
      width={"100%"}
      minHeight={height || 64}
      borderBottom={1}
      borderColor={"#ccc"}
    ></Box>
  );
}

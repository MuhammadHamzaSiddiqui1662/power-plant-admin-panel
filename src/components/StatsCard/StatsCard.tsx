import { Box, BoxProps, Typography } from "@mui/material";

interface Props extends BoxProps {
  variant: "outlined" | "contained";
  title: string;
  value: string;
}

export default function StatsCard({ variant, title, value, ...props }: Props) {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      gap={8}
      p={3}
      borderRadius={2}
      border={1}
      borderColor={"primary.main"}
      color={variant === "contained" ? "primary.contrastText" : "primary.main"}
      bgcolor={variant === "contained" ? "primary.main" : undefined}
      {...props}
      sx={{
        ...props.sx,
      }}
    >
      <Typography variant="h4">{title}</Typography>
      <Typography variant="h3" fontWeight={600} ml={"auto"}>
        {value}
      </Typography>
    </Box>
  );
}

import { Box, Typography } from "@mui/material";
import StickyHeadTable from "../../../components/Table/StickyHeadTable";
import { useNavigate } from "react-router-dom";
import { IP_COLUMNS, ROUTES } from "../../../config/constants";
import { useAppSelector } from "../../../config/store";
import { IP } from "../../../types/ip";
import { formatIPRows } from "../../../utils";

export default function PendingIPs() {
  const navigate = useNavigate();
  const data = useAppSelector((state) => state.ip.pendingIPs);

  const handleRowClick = (row: IP) => {
    navigate(`/${ROUTES.ips}/${row._id}`);
  };

  return (
    <Box p={4}>
      <Typography variant="h4">Pending IPs</Typography>
      <StickyHeadTable
        columns={IP_COLUMNS}
        rows={formatIPRows(data)}
        onRowClick={handleRowClick}
        sx={{
          mt: 5,
        }}
      />
    </Box>
  );
}

import { Box, Typography } from "@mui/material";
import StickyHeadTable from "../../../components/Table/StickyHeadTable";
import { useNavigate } from "react-router-dom";
import { IP_COLUMNS, ROUTES, SEARCH_PARAMS } from "../../../config/constants";
import { useAppSelector } from "../../../config/store";
import { IP } from "../../../types/ip";
import { formatIPRows } from "../../../utils";

export default function InactiveIPs() {
  const navigate = useNavigate();
  const data = useAppSelector((state) => state.ip.archivedIPs);

  const handleRowClick = (row: IP) => {
    navigate(`../${row._id}?${SEARCH_PARAMS.status}=${ROUTES.inactive}`);
  };

  return (
    <Box p={4}>
      <Typography variant="h4">Inactive IPs</Typography>
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
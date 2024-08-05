import { Box, Typography } from "@mui/material";
import StickyHeadTable from "../../../components/Table/StickyHeadTable";
import { useNavigate } from "react-router-dom";
import {
  BROKERS_COLUMNS,
  ROUTES,
  SEARCH_PARAMS,
} from "../../../config/constants";
import { useAppSelector } from "../../../config/store";
import { formatBrokerRows } from "../../../utils";

export default function UnApprovedBrokers() {
  const navigate = useNavigate();
  const data = useAppSelector((state) => state.user.unApprovedBrokers);

  const handleRowClick = (row: any) => {
    navigate(`../${row.id}?${SEARCH_PARAMS.status}=${ROUTES.published}`);
  };

  return (
    <Box p={4}>
      <Typography variant="h4">Un Approved Brokers</Typography>
      <StickyHeadTable
        columns={BROKERS_COLUMNS}
        rows={formatBrokerRows(data)}
        onRowClick={handleRowClick}
        sx={{
          mt: 5,
        }}
      />
    </Box>
  );
}

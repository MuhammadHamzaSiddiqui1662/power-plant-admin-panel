import { Box, Typography } from "@mui/material";
import StickyHeadTable from "../../../components/Table/StickyHeadTable";
import { useNavigate } from "react-router-dom";
import {
  ROUTES,
  SEARCH_PARAMS,
  BROKERS_COLUMNS,
} from "../../../config/constants";
import { useAppSelector } from "../../../config/store";
import { formatBrokerRows } from "../../../utils";

export default function SuspendedBrokers() {
  const navigate = useNavigate();
  const data = useAppSelector((state) => state.user.suspendedBrokers);

  const handleRowClick = (row: any) => {
    navigate(
      `/${ROUTES.users}/${row.id}?${SEARCH_PARAMS.status}=${ROUTES.approved}`
    );
  };

  return (
    <Box p={4}>
      <Typography variant="h4">Suspended Brokers</Typography>
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

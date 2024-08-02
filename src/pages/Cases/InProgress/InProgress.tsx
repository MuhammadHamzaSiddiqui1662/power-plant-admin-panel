import { Box, Typography } from "@mui/material";
import StickyHeadTable from "../../../components/Table/StickyHeadTable";
import { useNavigate } from "react-router-dom";
import { COLUMNS, ROUTES, SEARCH_PARAMS } from "../../../config/constants";
import { useAppSelector } from "../../../config/store";
import { Data } from "../../../types/saleDeed";
import { formatRows } from "../../../utils";

export default function InProgress() {
  const navigate = useNavigate();
  const data = useAppSelector((state) => state.saleDeed.inProgressSaleDeeds);

  const handleRowClick = (row: Data) => {
    navigate(`../${row.id}?${SEARCH_PARAMS.status}=${ROUTES.inProgress}`);
  };

  return (
    <Box p={4}>
      <Typography variant="h4">In Progress Cases</Typography>
      <StickyHeadTable
        columns={COLUMNS}
        rows={formatRows(data)}
        onRowClick={handleRowClick}
        sx={{
          mt: 5,
        }}
      />
    </Box>
  );
}

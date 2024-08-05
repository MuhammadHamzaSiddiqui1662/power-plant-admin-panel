import { Box, Typography } from "@mui/material";
import StickyHeadTable from "../../components/Table/StickyHeadTable";
import { useNavigate } from "react-router-dom";
import { ROUTES, SEARCH_PARAMS, USERS_COLUMNS } from "../../config/constants";
import { useAppSelector } from "../../config/store";
import { formatUserRows } from "../../utils";

export default function Users() {
  const navigate = useNavigate();
  const data = useAppSelector((state) => state.user.users);

  const handleRowClick = (row: any) => {
    navigate(`../${row.id}?${SEARCH_PARAMS.status}=${ROUTES.published}`);
  };

  return (
    <Box p={4}>
      <Typography variant="h4">Users</Typography>
      <StickyHeadTable
        columns={USERS_COLUMNS}
        rows={formatUserRows(data)}
        onRowClick={handleRowClick}
        sx={{
          mt: 5,
        }}
      />
    </Box>
  );
}

import { Box, Typography } from "@mui/material";
import StickyHeadTable from "../../components/Table/StickyHeadTable";
import { useNavigate } from "react-router-dom";
import { ROUTES, USERS_COLUMNS } from "../../config/constants";
import { useAppSelector, useAppDispatch } from "../../config/store";
import { deleteUserThunk } from "../../features/user/userSlice";
import { formatUserRows } from "../../utils";

export default function Users() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.user.users);

  const handleRowClick = (row: any) => {
    navigate(`/${ROUTES.users}/${row.id}`);
  };

  const handleDeleteRow = (rowId: any) => {
    dispatch(deleteUserThunk(rowId));
  };

  return (
    <Box p={4}>
      <Typography variant="h4">Users</Typography>
      <StickyHeadTable
        columns={USERS_COLUMNS}
        rows={formatUserRows(data)}
        onRowClick={handleRowClick}
        onDeleteRow={handleDeleteRow}
        sx={{
          mt: 5,
        }}
      />
    </Box>
  );
}

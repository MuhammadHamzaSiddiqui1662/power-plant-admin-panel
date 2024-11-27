import { Box, Typography } from "@mui/material";
import StickyHeadTable from "../../../components/Table/StickyHeadTable";
import { useNavigate } from "react-router-dom";
import { IP_COLUMNS, ROUTES } from "../../../config/constants";
import { useAppDispatch, useAppSelector } from "../../../config/store";
import { IP } from "../../../types/ip";
import { formatIPRows } from "../../../utils";
import { deleteIPThunk } from "../../../features/ip/ipSlice";

export default function PendingIPs() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.ip.pendingIPs);

  const handleRowClick = (row: IP) => {
    navigate(`/${ROUTES.ip}/${row._id}`);
  };

  const handleDeleteRow = (rowId: any) => {
    dispatch(deleteIPThunk(rowId));
  };

  return (
    <Box p={4}>
      <Typography variant="h4">Pending IPs</Typography>
      <StickyHeadTable
        columns={IP_COLUMNS}
        rows={formatIPRows(data)}
        onRowClick={handleRowClick}
        onDeleteRow={handleDeleteRow}
        sx={{
          mt: 5,
        }}
      />
    </Box>
  );
}

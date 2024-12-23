import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import StickyHeadTable from "../../components/Table/StickyHeadTable";
import { useNavigate } from "react-router-dom";
import { ROUTES, USERS_COLUMNS } from "../../config/constants";
import { useAppDispatch } from "../../config/store";
import { deleteUserThunk } from "../../features/user/userSlice";
import { formatUserRows } from "../../utils";
import { useCallback, useEffect, useState } from "react";
import { useGetFilteredUsersQuery } from "../../services/user";
import { UserStatus } from "../../types/user";

export default function Users() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    search: "",
    page: 1,
    limit: 10,
  });

  const formatQueryString = useCallback(
    (filters: Record<string, string | number>) => {
      return Object.keys(filters)
        .filter((key) => filters[key])
        .map((key) => `${key}=${filters[key]}`)
        .join("&");
    },
    []
  );
  const { data } = useGetFilteredUsersQuery(formatQueryString(filters));

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  const handleRowClick = (row: any) => {
    navigate(`/${ROUTES.users}/${row.id}`);
  };

  const handleDeleteRow = (rowId: any) => {
    dispatch(deleteUserThunk(rowId));
  };

  // debounce function to set the value of search state to the value of search property of filter object after 2 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilters({
        ...filters,
        search,
      });
    }, 2000);
    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <Stack p={4} gap={2}>
      <Stack direction="row" justifyContent={"space-between"} spacing={2}>
        <Typography variant="h4">Users</Typography>
        {/* filters */}
        <FormControl size="small" sx={{ width: 160 }}>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filters.status}
            label="Status"
            name="status"
            onChange={handleFilterChange}
          >
            <MenuItem value={""}>All</MenuItem>
            <MenuItem value={UserStatus.Active}>{UserStatus.Active}</MenuItem>
            <MenuItem value={UserStatus.Pending}>{UserStatus.Pending}</MenuItem>
            <MenuItem value={UserStatus.Suspended}>
              {UserStatus.Suspended}
            </MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {/* Search Bar */}
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        size="small"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <StickyHeadTable
        columns={USERS_COLUMNS}
        rows={data?.data ? formatUserRows(data.data) : []}
        onRowClick={handleRowClick}
        onDeleteRow={handleDeleteRow}
        pagination={{
          page: filters.page - 1,
          rowsPerPage: filters.limit,
          total: data?.pagination.totalRecords,
          handleChangePage: (_event, newPage) =>
            setFilters({ ...filters, page: newPage + 1 }),
          handleChangeRowsPerPage: (event) => {
            setFilters({ ...filters, limit: +event.target.value, page: 1 });
          },
        }}
      />
    </Stack>
  );
}

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
import { IP_COLUMNS, ROUTES } from "../../config/constants";
import { IP } from "../../types/ip";
import { formatIPRows } from "../../utils";
import { useGetFilteredIpsQuery } from "../../services/ip";
import { useCallback, useEffect, useState } from "react";
import { IpStatus } from "../../enums";

export default function IPs() {
  const navigate = useNavigate();
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
  const { data } = useGetFilteredIpsQuery(formatQueryString(filters));

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  const handleRowClick = (row: IP) => {
    navigate(`/${ROUTES.ips}/${row._id}`);
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
      {/* heading and filters section */}
      <Stack direction="row" justifyContent={"space-between"} spacing={2}>
        <Typography variant="h4">Intelactual Properties</Typography>
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
            <MenuItem value={IpStatus.AppliedForPatent}>
              {IpStatus.AppliedForPatent}
            </MenuItem>
            <MenuItem value={IpStatus.Pending}>{IpStatus.Pending}</MenuItem>
            <MenuItem value={IpStatus.Published}>{IpStatus.Published}</MenuItem>
            <MenuItem value={IpStatus.Draft}>{IpStatus.Draft}</MenuItem>
            <MenuItem value={IpStatus.InActive}>{IpStatus.InActive}</MenuItem>
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

      {/* table */}
      <StickyHeadTable
        columns={IP_COLUMNS}
        rows={data?.data ? formatIPRows(data.data) : []}
        onRowClick={handleRowClick}
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

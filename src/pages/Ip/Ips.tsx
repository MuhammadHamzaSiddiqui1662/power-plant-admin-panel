import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import StickyHeadTable from "../../components/Table/StickyHeadTable";
import { useNavigate } from "react-router-dom";
import { IP_COLUMNS, ROUTES } from "../../config/constants";
import { IP } from "../../types/ip";
import { formatIPRows } from "../../utils";
import { useGetFilteredIpsQuery } from "../../services/ip";
import { useCallback, useState } from "react";
import { IpStatus } from "../../enums";

export default function IPs() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    status: "",
  });

  const formatQueryString = useCallback((filters: Record<string, string>) => {
    return Object.keys(filters)
      .filter((key) => filters[key])
      .map((key) => `${key}=${filters[key]}`)
      .join("&");
  }, []);
  const { data } = useGetFilteredIpsQuery(formatQueryString(filters));

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  const handleRowClick = (row: IP) => {
    navigate(`/${ROUTES.ip}/${row._id}`);
  };

  return (
    <Box p={4}>
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
      {/* table */}
      <StickyHeadTable
        columns={IP_COLUMNS}
        rows={data ? formatIPRows(data) : []}
        onRowClick={handleRowClick}
        sx={{
          mt: 5,
        }}
      />
    </Box>
  );
}

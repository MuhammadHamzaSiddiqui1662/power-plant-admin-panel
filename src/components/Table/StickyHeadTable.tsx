import * as React from "react";
import Paper, { PaperProps } from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { SxProps, Theme } from "@mui/material";

interface Props extends PaperProps {
  columns: any[];
  rows: any[];
  onRowClick?: (row?: any) => any;
  onDeleteRow?: (rowId: any) => void;
  sx?: SxProps<Theme>;
  pagination?: {
    page: number;
    rowsPerPage: number;
    total: number;
    handleChangePage: (event: unknown, newPage: number) => void;
    handleChangeRowsPerPage: (
      event: React.ChangeEvent<HTMLInputElement>
    ) => void;
  };
}

export default function StickyHeadTable({
  columns,
  rows,
  onRowClick,
  onDeleteRow,
  sx,
  pagination,
  ...props
}: Props) {
  const handleDelete = (event: React.MouseEvent, rowId: any) => {
    event.stopPropagation(); // Prevent row click from triggering
    if (onDeleteRow) {
      const confirmed = window.confirm(
        "Are you sure you want to delete this record?"
      );
      if (confirmed) {
        onDeleteRow(rowId);
      }
    }
  };

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        border: 1,
        borderColor: "#e0e0e0",
        ...sx,
      }}
      {...props}
    >
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell align="center">Actions</TableCell>{" "}
              {/* Action column */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={row.id}
                sx={onRowClick ? { cursor: "pointer" } : undefined}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
              >
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.format && typeof value === "number"
                        ? column.format(value)
                        : value}
                    </TableCell>
                  );
                })}
                <TableCell align="center">
                  <IconButton
                    onClick={(event) => handleDelete(event, row.id || row._id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {pagination && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={pagination.total}
          rowsPerPage={pagination.rowsPerPage}
          page={pagination.page}
          onPageChange={pagination.handleChangePage}
          onRowsPerPageChange={pagination.handleChangeRowsPerPage}
          sx={{ borderTop: 1, borderColor: "#e0e0e0" }}
        />
      )}
    </Paper>
  );
}

import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { usePositionListQuery } from "../../../redux/services/position";
import { Box, Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import TableToolBar from "../../../components/TableToolBar";
import Loader from "../../../components/Loader";

interface Column {
  id: "_id" | "name" | "totalMembers" | "status" | "action" |"teamId";
  label: string;
  maxWidth?: number;
  align?: "right";
  status?: string;
}

const columns: readonly Column[] = [
  { id: "_id", label: "#id", maxWidth: 100 },
  { id: "name", label: "Name", maxWidth: 100 },
  { id: "teamId", label: "Team Name", maxWidth: 100 },
  {
    id: "totalMembers",
    label: "Total Members",
    maxWidth: 100,
  },
  {
    id: "status",
    label: "Status",
  },
  {
    id: "action",
    label: "Action",
  },
];

export default function Position() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data, isLoading } = usePositionListQuery({ page, rowsPerPage });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box
      sx={{
        margin: "20px",
      }}
    >
      {isLoading ? <Loader size={100} thickness={1.5} /> : null}
      {data && (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableToolBar numSelected={0} title="Position & Roles" />
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <caption>Team listing with stats</caption>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      indeterminate={false}
                      checked={false}
                      // onChange={onSelectAllClick}
                      inputProps={{
                        "aria-label": "select all desserts",
                      }}
                    />
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      // style={{ maxWidth: column.maxWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.positionList?.map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={false}
                          inputProps={{
                            "aria-labelledby": row._id,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        {row._id.substring(row._id.length - 6)}
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.team.name || "null"}</TableCell>
                      <TableCell>{row.totalMembers || 0}</TableCell>
                      <TableCell>{row.status}</TableCell>
                      <TableCell>
                        <IconButton aria-label="delete" color="error">
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={data?.totalPosition || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </Box>
  );
}

import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {
  useDeletePostMutation,
  usePositionListQuery,
} from "../../../redux/services/position";
import { Box, Checkbox, IconButton, TableSortLabel } from "@mui/material";
import { Delete, ModeEdit } from "@mui/icons-material";
import TableToolBar from "../../../components/TableToolBar";
import Loader from "../../../components/Loader";
import AddPosition from "../../../components/Position/AddPosition";

interface Column {
  id: "id" | "name" | "totalMembers" | "status" | "action" | "team";
  label: string;
  maxWidth?: number;
  align?: "right";
  status?: string;
}

const columns: readonly Column[] = [
  { id: "id", label: "#id", maxWidth: 100 },
  { id: "name", label: "Name", maxWidth: 100 },
  { id: "team", label: "Team Name", maxWidth: 100 },
  {
    id: "totalMembers",
    label: "Total Members",
    maxWidth: 100,
  },
  {
    id: "status",
    label: "Status",
  },
];
type Order = "asc" | "desc";

export default function Position() {
  console.log("Position page is rendering");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<string>("id");
  const { data, isFetching, isLoading } = usePositionListQuery({
    page,
    rowsPerPage,
    orderBy,
    order,
  });

  const [deletePosition, { isLoading: deletePostLoading }] =
    useDeletePostMutation();

  const [selected, setSelected] = useState<readonly string[]>([]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick = (id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const deletePositionHandler = (id: string) => async () => {
    console.log(id);
    await deletePosition(id);
  };
  // const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.checked) {
  //     const newSelected = data?.positionList.map(
  //       (n) => n._id
  //     ) as readonly string[];
  //     setSelected(newSelected);
  //     return;
  //   }
  //   setSelected([]);
  // };

  const isSelected = (id: string) => selected?.indexOf(id) != -1;

  return (
    <Box
      sx={{
        margin: "15px",
      }}
    >
      {isLoading && <Loader size={100} thickness={1.5} />}
      {data && (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableToolBar
            numSelected={0}
            title="Position & Roles"
            component={AddPosition}
            toolTipText="Add Position"
          />
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
                      sortDirection={orderBy === column.id ? order : "asc"}
                    >
                      <TableSortLabel
                        active={orderBy === column.id}
                        direction={orderBy === column.id ? order : "asc"}
                        onClick={() => handleRequestSort(column.id)}
                      >
                        {column.label}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                  <TableCell align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              {/* {true && <Loader size={50} thickness={2} />} */}
              <TableBody>
                {!isFetching &&
                  data.positionList?.map((row, index) => {
                    const isItemSelected = isSelected(row._id);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        aria-checked={isItemSelected}
                        selected={isItemSelected}
                        key={row._id}
                        onClick={() => handleClick(row._id)}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                            onClick={() => handleClick(row._id)}
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
                          <IconButton aria-label="delete" color="success">
                            <ModeEdit />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            color="error"
                            onClick={deletePositionHandler(row._id)}
                          >
                            {deletePostLoading ? <Loader /> : <Delete />}
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

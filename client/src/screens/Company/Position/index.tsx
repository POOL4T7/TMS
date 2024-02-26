import { useState } from "react";
import {
  Box,
  IconButton,
  TableSortLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Alert,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import {
  useDeletePostMutation,
  usePositionListQuery,
} from "../../../redux/services/position";
import TableToolBar from "../../../components/TableToolBar";
import Loader from "../../../components/Loader";
import AddPosition from "../../../components/Position/AddPosition";

interface Column {
  id: "id" | "name" | "totalMembers" | "status" | "action" | "team";
  label: string;
  maxWidth?: number;
  align?: "right";
  status?: string;
  showOrder: boolean;
}

const columns: readonly Column[] = [
  { id: "id", label: "#id", maxWidth: 100, showOrder: true },
  { id: "name", label: "Name", maxWidth: 100, showOrder: true },
  { id: "team", label: "Team Name", maxWidth: 100, showOrder: false },
  {
    id: "totalMembers",
    label: "Total Members",
    maxWidth: 100,
    showOrder: false,
  },
  {
    id: "status",
    label: "Status",
    showOrder: true,
  },
];
type Order = "asc" | "desc";

export default function Position() {
  console.log("Position page is rendering");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState<Order>("desc");
  const [orderBy, setOrderBy] = useState<string>("id");
  const { data, isFetching, isLoading, error, isError } = usePositionListQuery({
    page: page + 1,
    rowsPerPage,
    orderBy,
    order,
  });

  const [deletePosition, { isLoading: deletePostLoading }] =
    useDeletePostMutation();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const deletePositionHandler = (id: string) => async () => {
    console.log(id);
    try {
      await deletePosition(id);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box
      sx={{
        margin: "15px",
      }}
    >
      {isLoading && <Loader size={100} thickness={1.5} />}
      {isError && <Alert severity="error">{error?.message}</Alert>}
      {data && (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableToolBar
            numSelected={0}
            title="Position & Roles"
            Children={<AddPosition positionId="" />}
            toolTipText="Add Position"
          />
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <caption>Team listing with stats</caption>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      // sortDirection={orderBy === column.id ? order : "asc"}
                    >
                      {column.showOrder ? (
                        <TableSortLabel
                          active={orderBy === column.id}
                          direction={orderBy === column.id ? order : "asc"}
                          onClick={() => handleRequestSort(column.id)}
                        >
                          {column.label}
                        </TableSortLabel>
                      ) : (
                        column.label
                      )}
                    </TableCell>
                  ))}
                  <TableCell align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              {/* <TableBody>
                <TableRow sx={{}}>
                  <TableCell>
                    {true && <Loader size={50} thickness={2} />}
                  </TableCell>
                </TableRow>
              </TableBody> */}
              <TableBody>
                {!isFetching &&
                  data.positionList?.map((row) => {
                    return (
                      <TableRow hover tabIndex={-1} key={row._id}>
                        <TableCell>
                          {row._id.substring(row._id.length - 6)}
                        </TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.team.name || "null"}</TableCell>
                        <TableCell>{row.totalMembers || 0}</TableCell>
                        <TableCell>{row.status}</TableCell>
                        <TableCell>
                          <AddPosition positionId={row._id} />
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

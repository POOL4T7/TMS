import { Dispatch } from "react";
import { ProjectTeamData } from "@/models/Project";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

interface Column {
  id: "id" | "name" | "position" | "team" | "Action";
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
];

interface Proptype {
  teamData: ProjectTeamData[];
  setUserList: Dispatch<React.SetStateAction<ProjectTeamData[]>>;
}
const TeamList = ({ teamData, setUserList }: Proptype) => {
  const removeUser = (id: number) => () => {
    const newArray = [...teamData];
    newArray.splice(id, 1);
    setUserList(newArray);
  };
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <caption>Project Team listing</caption>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align}>
                  {column.label}
                </TableCell>
              ))}
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teamData?.map((row, idx) => {
              return (
                <TableRow hover tabIndex={-1} key={idx}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{row.user.name}</TableCell>
                  <TableCell>{row.team.name}</TableCell>
                  <TableCell>
                    <IconButton onClick={removeUser(idx)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TeamList;

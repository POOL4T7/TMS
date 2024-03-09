import {
  Box,
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useFilteredUserListQuery } from "../../../redux/services/user";
import Loader from "../../../components/Loader";
import { useAllTeamsQuery } from "../../../redux/services/teams";
import { usePositionListByTeamIdQuery } from "../../../redux/services/position";
import { ProjectTeamData } from "../../../models/Project";
import TeamList from "../../../components/Project/TeamList";

const CUPage = () => {
  const [filter, setFilter] = useState({
    teamId: "",
    positionId: "",
    userId: "",
  });
  const [projectData, setProjectData] = useState({
    name: "",
    slug: "",
    shortDesc: "",
    description: "",
    owner: "",
    manager: "",
    teachLead: [],
    team: [],
    status: "",
  });
  const [userList, setUserList] = useState<ProjectTeamData[]>([]);
  const { data: managerList, isLoading: managerLoading } =
    useFilteredUserListQuery({});
  const { data: teamLead, isLoading: teamLeadLoading } =
    useFilteredUserListQuery({ role: "teamlead" });
  const { data: teamMemberList, isLoading: teamMemberLoading } =
    useFilteredUserListQuery(
      {
        role: "employee",
        departmentId: filter.teamId,
        positionId: filter.positionId,
      },
      { skip: !filter.teamId || !filter.positionId }
    );
  const { data: teamList, isFetching } = useAllTeamsQuery();
  const { data: positionList, isLoading: positionListLoading } =
    usePositionListByTeamIdQuery(
      {
        page: 1,
        rowsPerPage: 100,
        order: "asc",
        orderBy: "name",
        teamId: filter.teamId,
      },
      { skip: !filter.teamId }
    );

  const addUser = () => {
    if (!filter.teamId || !filter.positionId || !filter.userId) {
      alert("Complete all fields to add the user");
      return;
    }
    const data: ProjectTeamData = {
      team: {
        name: teamList?.find((team) => team._id === filter.teamId)?.name || "",
        _id: filter.teamId || "",
      },
      position: {
        name:
          positionList?.positionList?.find(
            (position) => position._id === filter.positionId
          )?.name || "",
        _id: filter.positionId || "",
      },
      user: {
        name:
          teamMemberList?.userList.find((user) => user._id === filter.userId)
            ?.firstName || "",
        _id: filter.userId || "",
      },
    };
    setUserList([...userList, data]);
    setFilter({ ...filter, positionId: "", userId: "" });
  };

  return (
    <Box marginTop={"10px"} padding={"10px"}>
      <Typography variant="h4">Add Product</Typography>
      <Box component={"form"}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box
              component={"div"}
              sx={{
                maxHeight: "450px",
                maxWidth: "100%",
                height: "100%",
                backgroundColor: "grey",
                border: "2px solid black",
                borderRadius: "10px",
              }}
            >
              <img src="" />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl sx={{ width: "100%" }} margin="normal">
              <TextField
                name="name"
                required
                label="Project Name"
                id="name"
                fullWidth
              />
            </FormControl>
            <FormControl sx={{ width: "100%" }} margin="normal">
              <TextField
                name="slug"
                required
                label="Slug"
                id="slug"
                fullWidth
              />
            </FormControl>
            <FormControl sx={{ width: "100%" }} margin="normal">
              <Stack direction={"row"} spacing={2}>
                <FormControl sx={{ width: "100%" }} margin="normal">
                  <Input type="date" name="startDate" placeholder="StartDate" />
                </FormControl>
                <FormControl sx={{ width: "100%" }} margin="normal">
                  <Input type="date" name="endDate" placeholder="endDate" />
                </FormControl>
              </Stack>
            </FormControl>
            <FormControl sx={{ width: "100%" }} margin="normal">
              <InputLabel id="status-select-label">Status</InputLabel>
              <Select
                labelId="status-select-label"
                id="status-select"
                value={"active"}
                // onChange={(e: SelectChangeEvent) => setStatus(e.target.value)}
                input={<OutlinedInput label="Status" />}
                name="status"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="inactive">
                  <em>In Active</em>
                </MenuItem>
                <MenuItem value="active">
                  <em>Active</em>
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormControl sx={{ width: "100%" }} margin="normal">
              <InputLabel id="manager-select-label">Manager</InputLabel>
              <Select
                labelId="manager-select-label"
                id="manager-select"
                value={projectData.manager}
                // onChange={handleChange}
                input={<OutlinedInput label="manager" />}
                name="manager"
              >
                <MenuItem value="">Select Manager</MenuItem>
                {managerLoading && (
                  <MenuItem value="" disabled>
                    <Loader size={20} thickness={2} />
                  </MenuItem>
                )}
                {managerList?.userList?.map((user) => (
                  <MenuItem value={user._id} key={user._id}>
                    {user.firstName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl sx={{ width: "100%" }} margin="normal">
              <InputLabel id="teachlead-select-label">Teach Lead</InputLabel>
              <Select
                labelId="teachlead-select-label"
                id="teachlead-select"
                // value={teachlead}
                value={projectData.manager}
                // onChange={handleChange}
                input={<OutlinedInput label="teachlead" />}
                name="teachlead"
              >
                <MenuItem value="">Select Manager</MenuItem>
                {teamLeadLoading && (
                  <MenuItem value="" disabled>
                    <Loader size={20} thickness={2} />
                  </MenuItem>
                )}
                {teamLead?.userList?.map((user) => (
                  <MenuItem value={user._id} key={user._id}>
                    {user.firstName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="About the project!"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel>Add Team Members </InputLabel>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <FormControl sx={{ width: "100%" }} margin="normal">
                  <InputLabel id="team-select-label">Team</InputLabel>
                  <Select
                    labelId="team-select-label"
                    id="team-select"
                    value={filter.teamId}
                    onChange={(e) =>
                      setFilter({ ...filter, teamId: e.target.value as string })
                    }
                    input={<OutlinedInput label="Team" />}
                    name="team"
                  >
                    {isFetching && (
                      <MenuItem value="" disabled>
                        <Loader size={20} thickness={2} />
                      </MenuItem>
                    )}
                    {teamList?.map((team) => (
                      <MenuItem value={team._id} key={team._id}>
                        {team.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl sx={{ width: "100%" }} margin="normal">
                  <InputLabel id="team-select-label">Position</InputLabel>
                  <Select
                    labelId="team-select-label"
                    id="team-select"
                    value={filter.positionId}
                    onChange={(e) =>
                      setFilter({
                        ...filter,
                        positionId: e.target.value as string,
                      })
                    }
                    input={<OutlinedInput label="Position" />}
                    name="positionId"
                  >
                    {positionListLoading && (
                      <MenuItem value={""} disabled>
                        <Loader size={20} thickness={2} />
                      </MenuItem>
                    )}
                    {positionList?.positionList?.map((position) => (
                      <MenuItem value={position._id} key={position._id}>
                        {position.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl sx={{ width: "100%" }} margin="normal">
                  <InputLabel id="team-select-label">User</InputLabel>
                  <Select
                    labelId="team-select-label"
                    id="team-select"
                    value={filter.userId}
                    onChange={(e) =>
                      setFilter({
                        ...filter,
                        userId: e.target.value as string,
                      })
                    }
                    input={<OutlinedInput label="User Name" />}
                    name="userId"
                  >
                    {teamMemberLoading && (
                      <MenuItem value={""} disabled>
                        <Loader size={20} thickness={2} />
                      </MenuItem>
                    )}
                    {teamMemberList?.userList?.map((user) => (
                      <MenuItem value={user._id} key={user._id}>
                        {user.firstName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={2}>
                <FormControl sx={{ width: "100%" }} margin="normal">
                  <Button onClick={addUser}>Add User</Button>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <InputLabel id="team-select-label">User</InputLabel>
      <TeamList teamData={userList} setUserList={setUserList} />
    </Box>
  );
};

export default CUPage;

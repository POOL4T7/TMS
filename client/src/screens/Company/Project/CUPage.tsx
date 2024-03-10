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
import { ProjectAddData, ProjectTeamData } from "../../../models/Project";
import TeamList from "../../../components/Project/TeamList";
import { useCreateProjectMutation } from "../../../redux/services/project";

const CUPage = () => {
  const [filter, setFilter] = useState({
    teamId: "",
    positionId: "",
    userId: "",
  });
  const [projectData, setProjectData] = useState({
    name: "",
    slug: "",
    description: "",
    owner: "",
    manager: "",
    teamLead: "",
    team: [],
    status: "",
  });
  const [userList, setUserList] = useState<ProjectTeamData[]>([]);

  const [createProject] = useCreateProjectMutation();

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

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const body: ProjectAddData = {
        name: formData.get("name")?.toString() || "",
        slug: formData.get("slug")?.toString() || "",
        startDate: formData.get("startDate")?.toString() || "",
        endDate: formData.get("endDate")?.toString() || "",
        manager: formData.get("manager")?.toString() || "",
        status: formData.get("status")?.toString() || "",
        teamLead: formData.get("teamLead")?.toString() || "",
        description: formData.get("description")?.toString() || "",
        team: userList.map((user) => {
          return { departmentId: user.team._id, userId: user.user._id };
        }),
      };
      console.log(body);
      await createProject(body);
    } catch (e) {
      console.log(e);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (name: string) => (e: any) => {
    console.log(name, e);
    setProjectData({ ...projectData, [name]: e.target.value });
  };

  return (
    <Box
      marginTop={"10px"}
      padding={"10px"}
      component={"form"}
      onSubmit={submitHandler}
    >
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography variant="h4">Add Project</Typography>
        <Button variant="contained" color="success" type="submit">
          Add
        </Button>
      </Stack>
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
              onChange={handleChange("name")}
            />
          </FormControl>
          <FormControl sx={{ width: "100%" }} margin="normal">
            <TextField
              name="slug"
              required
              label="Slug"
              id="slug"
              fullWidth
              onChange={handleChange("slug")}
            />
          </FormControl>
          <FormControl sx={{ width: "100%" }} margin="normal">
            <Stack direction={"row"} spacing={2}>
              <FormControl sx={{ width: "100%" }} margin="normal">
                <Input
                  type="date"
                  name="startDate"
                  placeholder="StartDate"
                  onChange={handleChange("startDate")}
                />
              </FormControl>
              <FormControl sx={{ width: "100%" }} margin="normal">
                <Input
                  type="date"
                  name="endDate"
                  placeholder="endDate"
                  onChange={handleChange("endDate")}
                />
              </FormControl>
            </Stack>
          </FormControl>
          <FormControl sx={{ width: "100%" }} margin="normal">
            <InputLabel id="status-select-label">Status</InputLabel>
            <Select
              labelId="status-select-label"
              id="status-select"
              value={projectData.status}
              onChange={handleChange("status")}
              input={<OutlinedInput label="Status" />}
              name="status"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="draft">
                <em>Draft</em>
              </MenuItem>
              <MenuItem value="publish">
                <em>Publish</em>
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
              onChange={handleChange("manager")}
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
            <InputLabel id="teamLead-select-label">Teach Lead</InputLabel>
            <Select
              labelId="teamLead-select-label"
              id="teamLead-select"
              value={projectData.teamLead}
              onChange={handleChange("teamLead")}
              input={<OutlinedInput label="teamLead" />}
              name="teamLead"
            >
              <MenuItem value="">Select Team Lead</MenuItem>
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
            value={projectData.description}
            onChange={handleChange("description")}
            name="description"
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
      <InputLabel id="team-select-label">User</InputLabel>
      <TeamList teamData={userList} setUserList={setUserList} />
    </Box>
  );
};

export default CUPage;

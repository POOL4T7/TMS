import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  DialogContentText,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Add, ModeEdit } from "@mui/icons-material";
import { useAllTeamsQuery } from "@/redux/services/teams";
import Loader from "../Loader";
import {
  useUserDetailsQuery,
  useUpdateUserMutation,
  useRegisterUserMutation,
} from "@/redux/services/user";
import { usePositionListByTeamIdQuery } from "@/redux/services/position";

interface PropTypes {
  userId: string;
}

export default function AddUpdate({ userId }: PropTypes) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    departmentId: "",
    positionId: "",
    employeeId: "",
    status: "",
    email: "",
    password: "",
  });

  const { data: teamList, isFetching: teamListIsFetching } = useAllTeamsQuery();

  const { data: positionList, isLoading: positionListLoading } =
    usePositionListByTeamIdQuery(
      {
        page: 1,
        rowsPerPage: 100,
        order: "asc",
        orderBy: "name",
        teamId: user.departmentId,
      },
      { skip: !user.departmentId }
    );

  const { data: userDetails, isFetching: userDetailsIsFetching } =
    useUserDetailsQuery(userId, {
      skip: !userId || !open,
    });
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [registerUser, { isLoading: userAddLoading }] =
    useRegisterUserMutation();

  useEffect(() => {
    if (open && userId && userDetails?._id) {
      setUser({
        ...user,
        ...userDetails,
        positionId: userDetails.positionId?._id,
        departmentId: userDetails.departmentId?._id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, userId, userDetails]);

  const changeHandler =
    (name: string) =>
    (
      e:
        | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        | SelectChangeEvent
    ) => {
      setUser({ ...user, [name]: e.target.value });
    };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (isLoading || userAddLoading) return;
    setOpen(false);
    setUser({
      firstName: "",
      lastName: "",
      departmentId: "",
      positionId: "",
      employeeId: "",
      status: "",
      email: "",
      password: "",
    });
  };

  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const body = {
        firstName: formData.get("firstName")!.toString(),
        lastName: formData.get("lastName")!.toString(),
        departmentId: formData.get("team")!.toString(),
        positionId: formData.get("positionId")!.toString(),
        status: formData.get("status")!.toString() || "active",
        _id: userId,
        employeeId: formData.get("employeeId")!.toString(),
        email: formData.get("email")!.toString(),
        password: userId ? "" : formData.get("password")!.toString(),
      };
      if (userId) await updateUser(body);
      else await registerUser(body);
      handleClose();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <IconButton onClick={handleClickOpen} color="success">
        {userId ? <ModeEdit /> : <Add />}
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handlesubmit,
        }}
        fullWidth={true}
      >
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <DialogContentText color={"error"}>
            {/* {isError || (updateIsError && "something went wrong")} */}
          </DialogContentText>
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoFocus
            value={user.firstName}
            onChange={changeHandler("firstName")}
          />
          <TextField
            margin="normal"
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            value={user.lastName}
            onChange={changeHandler("lastName")}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            value={user.email}
            onChange={changeHandler("email")}
          />
          {!userId && (
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              value={user.password}
              onChange={changeHandler("password")}
            />
          )}
          <FormControl sx={{ width: "100%" }} margin="normal">
            <InputLabel id="team-select-label">Team</InputLabel>
            <Select
              labelId="team-select-label"
              id="team-select"
              value={user.departmentId}
              onChange={changeHandler("departmentId")}
              input={<OutlinedInput label="Team" />}
              name="team"
            >
              {teamListIsFetching && (
                <MenuItem value={""} disabled>
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
          <FormControl sx={{ width: "100%" }} margin="normal">
            <InputLabel id="team-select-label">Position</InputLabel>
            <Select
              labelId="team-select-label"
              id="team-select"
              value={user.positionId}
              onChange={changeHandler("positionId")}
              input={<OutlinedInput label="Team" />}
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
          <FormControl sx={{ width: "100%" }} margin="normal">
            <InputLabel id="status-select-label">Status</InputLabel>
            <Select
              labelId="status-select-label"
              id="status-select"
              value={user.status}
              onChange={changeHandler("status")}
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
          <TextField
            margin="normal"
            required
            fullWidth
            id="employeeId"
            label="Employee Id"
            name="employeeId"
            value={user.employeeId}
            onChange={changeHandler("employeeId")}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="error"
            onClick={handleClose}
            disabled={userDetailsIsFetching}
          >
            Cancel
          </Button>
          <Button
            color="success"
            variant="outlined"
            type="submit"
            disabled={userDetailsIsFetching}
          >
            {userDetailsIsFetching || isLoading || userAddLoading ? (
              <Loader />
            ) : userId ? (
              "Update"
            ) : (
              "Add"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

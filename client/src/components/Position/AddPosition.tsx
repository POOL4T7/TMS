import { useState } from "react";
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
import { Add } from "@mui/icons-material";
import { useAllTeamsQuery } from "../../redux/services/teams";
import Loader from "../Loader";
import { useCompanyProfileQuery } from "../../redux/services/company";
import { useAddPositionMutation } from "../../redux/services/position";

export default function AddPosition() {
  const [open, setOpen] = useState(false);
  const [team, setTeam] = useState("");
  const [status, setStatus] = useState("");
  const [positionName, setPositionName] = useState("");
  const { data: teamList, isFetching } = useAllTeamsQuery();
  const { data: companyDetails } = useCompanyProfileQuery();
  const [addPosition, { isError, isLoading }] = useAddPositionMutation();
  const handleChange = (event: SelectChangeEvent) => {
    setTeam(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTeam("");
    setStatus("");
    setPositionName("");
  };

  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(
      formData.get("status"),
      formData.get("team"),
      formData.get("positionName")
    );
    const body = {
      name: formData.get("positionName")!.toString(),
      teamId: formData.get("team")!.toString(),
      status: formData.get("status")!.toString() || "active",
      companyId: companyDetails!._id.toString(),
      slug: `${companyDetails!._id.slice(-6)}-${positionName
        .split(" ")
        .join("-")}`,
    };
    await addPosition(body);
    console.log(body);
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <Add />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handlesubmit,
        }}
        // maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle>Add New Position</DialogTitle>
        <DialogContent>
          <DialogContentText color={"error"}>
            {isError && "something went wrong"}
          </DialogContentText>
          <TextField
            margin="normal"
            required
            fullWidth
            id="positionName"
            label="Position Name"
            name="positionName"
            autoFocus
            value={positionName}
            onChange={(e) => setPositionName(e.target.value)}
          />
          <DialogContentText fontSize={14}>{`${companyDetails?._id.slice(
            -6
          )}-${positionName.split(" ").join("-")}`}</DialogContentText>
          <FormControl sx={{ width: "100%" }} margin="normal">
            <InputLabel id="team-select-label">Team</InputLabel>
            <Select
              labelId="team-select-label"
              id="team-select"
              value={team}
              onChange={handleChange}
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
          <FormControl sx={{ width: "100%" }} margin="normal">
            <InputLabel id="status-select-label">Status</InputLabel>
            <Select
              labelId="status-select-label"
              id="status-select"
              value={status}
              onChange={(e: SelectChangeEvent) => setStatus(e.target.value)}
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
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            color="success"
            variant="outlined"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <Loader /> : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

import { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  DialogContentText,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  SvgIconTypeMap,
} from "@mui/material";
import { Add, ModeEdit } from "@mui/icons-material";
import Loader from "../Loader";
import { useCompanyProfileQuery } from "../../redux/services/company";
import {
  useCreateTeamMutation,
  useUpdateTeamMutation,
} from "../../redux/services/teams";
import { useUploadImageMutation } from "../../redux/services/custom";
import { OverridableComponent } from "@mui/material/OverridableComponent";

interface PropTypes {
  teamId?: string;
  teamName?: string;
  teamStatus?: string;
  teamImage?: string;
  Icon?: OverridableComponent<SvgIconTypeMap>;
  teamSlug?: string;
}

interface Team {
  name: string;
  status: string;
  image: string;
  slug: string;
}

export default function AddUpdateTeam({
  teamId,
  teamName,
  teamStatus,
  teamImage,
  Icon,
  teamSlug,
}: PropTypes) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = useState(false);
  const [teamData, setTeamData] = useState<Team>({
    name: "",
    status: "",
    image: "",
    slug: "",
  });
  const { name, status, image } = teamData;
  const { data: companyDetails } = useCompanyProfileQuery();
  const [createTeam, { isError, isLoading }] = useCreateTeamMutation();
  const [updateTeam, { isError: updateIsError, isLoading: updateIsLoading }] =
    useUpdateTeamMutation();
  const [uploadImage] = useUploadImageMutation();

  useEffect(() => {
    if (open && teamId) {
      setTeamData({
        ...teamData,
        name: teamName!,
        image: teamImage!,
        status: teamStatus!,
        slug: teamSlug!,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, teamId, teamImage, teamName, teamStatus]);
  console.log("teamData", teamData);
  const handleChange =
    (name: string) =>
    (
      e:
        | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        | SelectChangeEvent
    ) => {
      setTeamData({
        ...teamData,
        [name]: e?.target.value,
        slug: teamData.name.split(" ").join("-"),
      });
    };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (updateIsLoading || isLoading) return;
    setOpen(false);
    setTeamData({
      name: "",
      status: "",
      image: "",
      slug: "",
    });
  };

  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const body = {
        _id: teamId || "",
        name: formData.get("name")!.toString(),
        status: formData.get("status")!.toString() || "active",
        companyId: companyDetails!._id.toString(),
        slug: `${companyDetails!._id.slice(-6)}-${name.split(" ").join("-")}`,
        image: teamData.image,
      };
      if (teamId) await updateTeam(body);
      else await createTeam(body);
      handleClose();
    } catch (e) {
      console.log(e);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uploadFile = async (e: any) => {
    console.log(e?.target?.files);
    try {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      console.log("formData", formData);
      const data = await uploadImage(formData).unwrap();
      console.log("data", data);
      setTeamData({ ...teamData, image: data.fileLocation });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <IconButton onClick={handleClickOpen} color="success">
        {Icon ? <Icon /> : teamId ? <ModeEdit /> : <Add />}
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
        <DialogTitle>Add New Team</DialogTitle>
        <DialogContent>
          <DialogContentText color={"error"}>
            {isError || (updateIsError && "something went wrong")}
          </DialogContentText>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Team Name"
            name="name"
            autoFocus
            value={name}
            onChange={(e) => {
              setTeamData({
                ...teamData,
                name: e.target.value,
                slug: `${companyDetails!._id.slice(-6)}-${e.target.value
                  .split(" ")
                  .join("-")}`,
              });
            }}
          />
          <DialogContentText fontSize={14}>{teamData.slug}</DialogContentText>

          <FormControl sx={{ width: "100%" }} margin="normal">
            <InputLabel id="status-select-label">Status</InputLabel>
            <Select
              labelId="status-select-label"
              id="status-select"
              value={status}
              onChange={handleChange("status")}
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
          {image && (
            <Box
              sx={{
                maxWidth: "320px",
                maxHeight: "320px",
              }}
            >
              <img src={image} height="100%" width="100%" />
            </Box>
          )}
          <InputLabel
            htmlFor="file-upload"
            sx={{
              cursor: "pointer",
              border: "2px dashed",
              borderRadius: "4px",
              display: "block",
              textAlign: "center",
              padding: "1rem 0px",
            }}
            onClick={() => {
              if (fileInputRef.current) {
                fileInputRef.current.click();
              }
            }}
          >
            {image ? image : "Drag and drop a file or click to select"}
            <input
              ref={fileInputRef}
              type="file"
              name="image"
              id="image"
              style={{ width: "100%", display: "none" }}
              onChange={uploadFile}
            />
          </InputLabel>
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
            {isLoading || updateIsLoading ? (
              <Loader />
            ) : teamId ? (
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

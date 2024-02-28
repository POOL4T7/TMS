import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useIndustryListQuery } from "../../../redux/services/industry";
import {
  Chip,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import {
  useCompanyProfileQuery,
  useUpdateProfileMutation,
} from "../../../redux/services/company";
import Loader from "../../../components/Loader";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Profile = () => {
  const { data, isLoading } = useCompanyProfileQuery();

  const [industryId, setIndustryId] = useState<string[]>([]);

  const [companyDetails, setCompanyDetails] = useState({
    name: "",
    email: "",
  });

  const { data: industryList, isFetching: industryListFetching } =
    useIndustryListQuery();

  const [updateProfile, { isLoading: updateIsLoading }] =
    useUpdateProfileMutation();

  useEffect(() => {
    if (data) {
      setCompanyDetails({
        ...companyDetails!,
        name: data.name,
        email: data.email,
      });
      setIndustryId(data?.industry?.map((idu) => idu._id) as string[]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handle =
    (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setCompanyDetails({ ...companyDetails!, [name]: event.target.value });
    };

  const handleChange = (event: SelectChangeEvent<typeof industryId>) => {
    const {
      target: { value },
    } = event;
    setIndustryId(typeof value === "string" ? value.split(",") : value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    try {
      await updateProfile({
        name: data.get("name")?.toString(),
        industry: data.get("industryList")?.toString().split(","),
        // companyId
      }).unwrap();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      {isLoading && <Loader size={100} thickness={1.5} margin="100px" />}
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Update Profile
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                required
                fullWidth
                id="name"
                label="Company Name"
                autoFocus
                value={companyDetails?.name}
                onChange={handle("name")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={companyDetails?.email}
                onChange={handle("email")}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="demo-multiple-checkbox-label">
                  Industry
                </InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={industryId}
                  onChange={handleChange}
                  input={<OutlinedInput label="Industry" />}
                  renderValue={(selected) => (
                    <Box>
                      {selected.map((value) => {
                        const option = industryList?.find(
                          (o) => o._id === value
                        );
                        return <Chip key={value} label={option?.name} />;
                      })}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                  name="industryList"
                >
                  {industryListFetching && (
                    <MenuItem disabled>
                      <ListItemText primary={"Loading.."} />
                    </MenuItem>
                  )}
                  {industryList?.map((item, idx) => (
                    <MenuItem key={idx} value={item._id}>
                      <Checkbox checked={industryId.indexOf(item._id) > -1} />
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={updateIsLoading}
          >
            {updateIsLoading ? <Loader /> : "Update"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2"></Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;

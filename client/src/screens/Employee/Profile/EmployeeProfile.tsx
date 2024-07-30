import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Loader from "@/components/Loader";
import {
  useOwnProfileQuery,
  useUpdateUserMutation,
} from "@/redux/services/user";

const EmployeeProfile = () => {
  const { data, isLoading } = useOwnProfileQuery();

  const [userDetails, setCompanyDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    position: "",
    team: "",
    company: "",
    status: "",
    _id: "",
  });

  const [updateUser, { isLoading: updateIsLoading }] = useUpdateUserMutation();

  useEffect(() => {
    if (data) {
      setCompanyDetails({
        ...userDetails!,
        firstName: data.firstName,
        email: data.email,
        lastName: data.lastName || "",
        position: data?.positionId?.name,
        team: data?.departmentId?.name,
        company: data.companyId?.name,
        status: data.status,
        _id: data._id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handle =
    (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setCompanyDetails({ ...userDetails!, [name]: event.target.value });
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    try {
      await updateUser({
        _id: userDetails._id,
        firstName: data.get("firstName")?.toString() || "",
        lastName: data.get("lastName")?.toString() || "",
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
            <Grid></Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={userDetails?.firstName}
                onChange={handle("firstName")}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="lastName"
                required
                fullWidth
                id="lastName"
                label="First Name"
                autoFocus
                value={userDetails?.lastName}
                onChange={handle("lastName")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={userDetails?.email}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="team"
                label="Team"
                name="team"
                value={userDetails?.team}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="position"
                label="Position"
                name="position"
                value={userDetails?.position}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="company"
                label="Company"
                name="company"
                value={userDetails?.company}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="status"
                label="Status"
                name="status"
                autoComplete="status"
                value={userDetails?.status}
                disabled
              />
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

export default EmployeeProfile;

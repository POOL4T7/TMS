import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { useCreateCompanyMutation } from "../../redux/services/auth";
import { useIndustryListQuery } from "../../redux/services/industry";
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
import { useAppDispatch } from "../../redux/store";
import { userInfo } from "../../redux/features/authSlice";
import { useTypedSelector } from "../../redux/store";
import { addToStrorage } from "../../utils/storage";

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignUp() {
  const selector = useTypedSelector((state) => state.authState);
  const navigate =useNavigate();
  
  const [industryId, setIndustryId] = useState<string[]>([]);

  const [createCompany] = useCreateCompanyMutation();

  const { data, isFetching } = useIndustryListQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selector.isAuthenticated) {
      navigate("/");
    }
  
  }, [selector.isAuthenticated, navigate])
  
  
  const handleChange = (event: SelectChangeEvent<typeof industryId>) => {
    const {
      target: { value },
    } = event;
    setIndustryId(typeof value === "string" ? value.split(",") : value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const response = await createCompany({
        name: data.get("name")?.toString() || "",
        industry: data.get("industryList")?.toString()?.split(",") || [],
        email: data.get("email")?.toString() || "",
        password: data.get("password")?.toString() || "",
      }).unwrap();
      addToStrorage(
        "auth",
        JSON.stringify(response),
        data.get("remember") ? 2 : -1
      );
      dispatch(userInfo(response));
      // navigate("/")
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Company Name"
                  autoFocus
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
                          const option = data?.find((o) => o._id === value);
                          return <Chip key={value} label={option?.name} />;
                        })}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                    name="industryList"
                  >
                    {isFetching && (
                      <MenuItem disabled>
                        <ListItemText primary={"Loading.."} />
                      </MenuItem>
                    )}
                    {data?.map((item, idx) => (
                      <MenuItem key={idx} value={item._id}>
                        <Checkbox checked={industryId.indexOf(item._id) > -1} />
                        <ListItemText primary={item.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value={true} color="primary" />
                  }
                  label="I accept the terms and conditions"
                  name="remember"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </>
  );
}

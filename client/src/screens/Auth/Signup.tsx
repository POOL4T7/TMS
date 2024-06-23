import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import { Link } from "react-router-dom";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../../schema/authSchema";
import { useForm } from "react-hook-form";

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

type SignupFormInputs = {
  email: string;
  password: string;
  name: string;
  remember: boolean;
};

export default function SignUp() {
  const selector = useTypedSelector((state) => state.authState);
  const navigate = useNavigate();

  const [industryId, setIndustryId] = useState<string[]>([]);

  const [createCompany] = useCreateCompanyMutation();

  const { data, isFetching } = useIndustryListQuery();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
  });

  useEffect(() => {
    if (selector.isAuthenticated) {
      navigate("/");
    }
  }, [selector.isAuthenticated, navigate]);

  const handleChange = (event: SelectChangeEvent<typeof industryId>) => {
    const {
      target: { value },
    } = event;
    setIndustryId(typeof value === "string" ? value.split(",") : value);
  };

  const onSubmit = async (data: SignupFormInputs) => {
    try {
      const response = await createCompany({
        name: data.name,
        industry: industryId,
        email: data.email,
        password: data.password,
      }).unwrap();
      addToStrorage("auth", JSON.stringify(response), data.remember ? 2 : -1);
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
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  required
                  fullWidth
                  id="name"
                  label="Company Name"
                  autoFocus
                  {...register("name")}
                  error={!!errors.name?.message}
                  helperText={errors.name?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  {...register("email")}
                  error={!!errors.email?.message}
                  helperText={errors.email?.message}
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
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...register("password")}
                  error={!!errors.password?.message}
                  helperText={errors.password?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value={true} color="primary" />}
                  label="I accept the terms and conditions"
                  {...register("remember")}
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
                <Link to="/login" color={"text.secondary"}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}

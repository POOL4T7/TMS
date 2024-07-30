import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTypedSelector } from '@/redux/store';
import AssignmentIcon from '@mui/icons-material/Assignment';

type TaskCreate = {
  title: string;
  description: string;
  assignedTo: string;
  projectID: string;
  assignedBy: string;
};

export default function CreateTask() {
  const selector = useTypedSelector((state) => state.authState);
  const navigate = useNavigate();

  const [industryId, setIndustryId] = useState<string[]>([]);

  //   const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskCreate>({});

  useEffect(() => {
    if (!selector.isAuthenticated) {
      navigate('/');
    }
  }, [selector.isAuthenticated, navigate]);

  const handleChange = (event: SelectChangeEvent<typeof industryId>) => {
    const {
      target: { value },
    } = event;
    setIndustryId(typeof value === 'string' ? value.split(',') : value);
  };

  const onSubmit = async (data: TaskCreate) => {
    try {
      console.log('data', data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AssignmentIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create Task
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
                  autoComplete="task-title"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  autoFocus
                  {...register('title')}
                  error={!!errors.title?.message}
                  helperText={errors.title?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  rows={3}
                  maxRows={6}
                  id="description"
                  label="Description"
                  autoComplete="description"
                  {...register('description')}
                  error={!!errors.description?.message}
                  helperText={errors.description?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ width: '100%' }}>
                  <InputLabel id="demo-multiple-checkbox-label">
                    Industry
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    value={industryId}
                    onChange={handleChange}
                    input={<OutlinedInput label="Industry" />}
                    // renderValue={(selected) => (
                    //   <Box>
                    //     {selected.map((value) => {
                    //       const option = data?.find((o) => o._id === value);
                    //       return <Chip key={value} label={option?.name} />;
                    //     })}
                    //   </Box>
                    // )}
                    // MenuProps={MenuProps}
                    name="assignedTo"
                  >
                    {/* {isFetching && (
                      <MenuItem disabled>
                        <ListItemText primary={'Loading..'} />
                      </MenuItem>
                    )}
                    {data?.map((item, idx) => (
                      <MenuItem key={idx} value={item._id}>
                        <Checkbox checked={industryId.indexOf(item._id) > -1} />
                        <ListItemText primary={item.name} />
                      </MenuItem>
                    ))} */}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Project ID"
                  type="text"
                  id="projectID"
                  autoComplete="projectID"
                  {...register('projectID')}
                  error={!!errors.projectID?.message}
                  helperText={errors.projectID?.message}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

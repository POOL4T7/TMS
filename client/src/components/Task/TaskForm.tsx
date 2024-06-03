import React, { useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useEffect } from 'react';
import { Add } from '@mui/icons-material';
import dayjs, { Dayjs } from 'dayjs';
import { Task } from '../../models/Task';
import {
  useAddTaskMutation,
  useGetTaskDetailsQuery,
  useUpdateTaskMutation,
} from '../../redux/services/task';
import { labelList } from '../../data';
import { useProjectListQuery } from '../../redux/services/project';

const TaskForm = ({ taskId }: { taskId: string }) => {
  const [taskDetails, setTaskDetails] = useState<Task>({
    _id: '',
    title: '',
    status: '',
    projectID: { _id: '', name: '' },
    assignedTo: [],
    assignedBy: { _id: '', firstName: '' },
    labels: [],
    taskType: '',
    priority: '',
    description: '',
    startDate: '',
    dueDate: '',
    logs: [],
  });
  const {
    _id,
    title,
    status,
    projectID,
    // assignedTo,
    // labels,
    taskType,
    priority,
    description,
    startDate,
    dueDate,
  } = taskDetails;

  const [updateTask] = useUpdateTaskMutation();
  const [createTask] = useAddTaskMutation();

  const { data } = useGetTaskDetailsQuery(taskId, {
    skip: !taskId,
  });

  const { data: projectList } = useProjectListQuery({
    page: 1,
    rowsPerPage: 100,
    orderBy: '_id',
    order: 'desc',
  });

  useEffect(() => {
    setTaskDetails({ ...taskDetails, ...data?.taskDetails });
    console.log('data', data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskId, data]);

  const handleStartDateTimeChange = (newValue: Dayjs | null) => {
    setTaskDetails({
      ...taskDetails,
      startDate: newValue?.format().toString() || '',
    });
    // if (newValue && (!dueDate || dayjs(dueDate).isBefore(dayjs(newValue)))) {
    //   setTaskDetails({
    //     ...taskDetails,
    //     dueDate: newValue?.format().toString() || '',
    //   });
    // }
  };

  const handleSelectChange = (name: string) => (event: SelectChangeEvent) => {
    setTaskDetails({ ...taskDetails, [name]: event.target.value });
  };

  const handleChange =
    (name: string) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setTaskDetails({ ...taskDetails, [name]: event.target.value });
    };

  const submitHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      if (taskId) {
        await updateTask({
          _id: taskDetails._id,
          title: taskDetails.title,
          description: taskDetails.description,
          startDate: taskDetails.startDate,
          dueDate: taskDetails.dueDate,
          priority: priority,
          status: taskDetails.status,
        });
      } else {
        await createTask({
          _id: taskDetails._id,
          title: taskDetails.title,
          description: taskDetails.description,
          startDate: taskDetails.startDate,
          dueDate: taskDetails.dueDate,
          priority: priority,
          status: taskDetails.status,
          projectID: taskDetails.projectID,
          taskType: taskDetails.taskType,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box margin={'10px'} component={'form'}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Box>
          <Typography component={'span'} variant="h5">
            #{_id}{' '}
          </Typography>
        </Box>
        <IconButton>
          <Add />
        </IconButton>
      </Stack>
      <FormControl fullWidth>
        <TextField
          margin="normal"
          id="title"
          label="Title"
          variant="outlined"
          value={title}
          onChange={handleChange('title')}
        />
      </FormControl>
      <Stack direction={'row'} spacing={1} marginBottom={'10px'}>
        <FormControl fullWidth>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker']}>
              <DateTimePicker
                label="Start Date"
                minDateTime={
                  dayjs().valueOf() > dayjs(startDate).valueOf()
                    ? dayjs(startDate)
                    : dayjs()
                }
                onChange={handleStartDateTimeChange}
                value={dayjs(startDate)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </FormControl>
        <FormControl fullWidth>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker']}>
              <DateTimePicker
                label="Due Date"
                minDateTime={dayjs(startDate) || dayjs()}
                onChange={(endDate) =>
                  setTaskDetails({
                    ...taskDetails,
                    dueDate: endDate?.toString() || '',
                  })
                }
                value={dayjs(dueDate)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </FormControl>
      </Stack>
      <FormControl fullWidth>
        <TextField
          multiline
          id="title"
          label="Description"
          placeholder="Add about project"
          value={description}
          minRows={3}
          maxRows={5}
          onChange={handleChange('description')}
        />
      </FormControl>
      <Stack direction={'row'} spacing={1} mt={'15px'}>
        <FormControl required fullWidth>
          <InputLabel id="priority">Priority</InputLabel>
          <Select
            labelId="priority"
            id="priority"
            name="priority"
            value={priority}
            label="Priority *"
            onChange={handleSelectChange('priority')}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={'low'}>Low</MenuItem>
            <MenuItem value={'medium'}>Medium</MenuItem>
            <MenuItem value={'moderate'}>Moderate</MenuItem>
            <MenuItem value={'high'}>High</MenuItem>
          </Select>
        </FormControl>
        <FormControl required fullWidth>
          <InputLabel id="type">Task type</InputLabel>
          <Select
            labelId="type"
            id="type"
            name="type"
            value={taskType}
            label="Task Type *"
            onChange={handleSelectChange('taskType')}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={'feature'}>Feature</MenuItem>
            <MenuItem value={'issue'}>Issue</MenuItem>
            <MenuItem value={'bug'}>Bug</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Grid container spacing={1} marginTop={'10px'}>
        <Grid item xs={12} sm={9}>
          <FormControl fullWidth>
            <Autocomplete
              multiple
              disablePortal
              id="combo-box-demo"
              options={labelList}
              getOptionLabel={(label) => label.name}
              sx={{ maxHeight: '200px', overflow: 'auto' }}
              renderInput={(params) => <TextField {...params} label="labels" />}
              // value={labels}
              // inputValue={labels.join(',')}
              onChange={(e) => {
                console.log(e.preventDefault());
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel id="status">Status</InputLabel>
            <Select
              labelId="status"
              id="type"
              name="status"
              value={status}
              label="Status *"
              onChange={handleSelectChange('status')}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'pending'}>Pending</MenuItem>
              <MenuItem value={'inprogress'}>In-progress</MenuItem>
              <MenuItem value={'review'}>In-review</MenuItem>
              <MenuItem value={'completed'}>Completed</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <FormControl
        fullWidth
        style={{
          marginTop: '10px',
        }}
      >
        <InputLabel id="status">Status</InputLabel>
        <Select
          labelId="projectId"
          id="type"
          name="projectId"
          value={
            typeof projectID != 'string'
              ? projectID._id.toString()
              : projectID.toString()
          }
          label="Status *"
          onChange={handleSelectChange('projectID')}
          required
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {projectList?.projectList.map((project) => {
            return (
              <MenuItem key={project._id} value={project._id}>
                {project.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Stack direction={'row'} marginTop={'15px'}></Stack>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={submitHandler}
      >
        {taskId ? 'Upadte' : 'Add'}
      </Button>
    </Box>
  );
};

export default TaskForm;

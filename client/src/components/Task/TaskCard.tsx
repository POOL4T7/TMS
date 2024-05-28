import {
  Autocomplete,
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Chip,
  Drawer,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
  Zoom,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useState, useCallback, useEffect } from 'react';
import { Add } from '@mui/icons-material';
import dayjs, { Dayjs } from 'dayjs';
import { Task } from '../../models/Task';

const userList = [
  {
    _id: 'sjdc',
    name: 'john',
  },
  {
    _id: 'sjdc2',
    name: 'doe',
  },
  {
    _id: 'sjdc3',
    name: 'alice',
  },
];

interface PropType {
  task: Task;
  index: string;
  onDragStart: (index: string, status: string) => void;
}

const getColor = (label: string) => {
  switch (label) {
    case 'server':
    case 'web':
      return 'success';
    case 'employeePanel':
    case 'companyPanel':
    case 'high':
      return 'error';
    case 'UI':
    case 'medium':
      return 'secondary';
    case 'low':
      return 'info';
    default:
      return 'primary';
  }
};

const LabelsAndPriority = ({
  labels,
  priority,
}: {
  labels: string[];
  priority: string;
}) => (
  <Box>
    {labels.slice(0, 2).map((label) => (
      <Chip
        key={label}
        label={label}
        color={getColor(label)}
        size="small"
        variant="outlined"
        sx={{
          fontWeight: '700',
          margin: '2px',
        }}
      />
    ))}
    <Chip
      icon={<AccessTimeIcon />}
      label={priority}
      color={getColor(priority)}
      size="small"
      sx={{
        margin: '2px',
      }}
    />
  </Box>
);

const TaskUpdateForm = ({
  taskDetails,
  setTaskDetails,
}: {
  taskDetails: Task;
  setTaskDetails: (task: Task) => void;
}) => {
  const {
    _id,
    title,
    // status,
    // project,
    // assignedTo,
    // labels,
    taskType,
    priority,
    description,
    startDate,
    dueDate,
  } = taskDetails;

  useEffect(() => {
    setTaskDetails(taskDetails);
  }, [setTaskDetails, taskDetails]);

  const handleStartDateTimeChange = (newValue: Dayjs | null) => {
    setTaskDetails({
      ...taskDetails,
      startDate: newValue?.format().toString() || '',
    });
    if (newValue && (!dueDate || dayjs(dueDate).isBefore(dayjs(newValue)))) {
      setTaskDetails({
        ...taskDetails,
        dueDate: newValue?.format().toString() || '',
      });
    }
  };

  console.log('taskDetails', taskDetails);
  const handleSelectChange = (name: string) => (event: SelectChangeEvent) => {
    setTaskDetails({ ...taskDetails, [name]: event.target.value });
  };

  const handleChange =
    (name: string) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setTaskDetails({ ...taskDetails, [name]: event.target.value });
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
                minDateTime={dayjs()}
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
            onChange={handleSelectChange('type')}
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
              options={userList}
              getOptionLabel={(user) => user.name}
              sx={{ maxHeight: '200px', overflow: 'auto' }}
              renderInput={(params) => (
                <TextField {...params} label="Assign To" />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel id="type">Status</InputLabel>
            <Select
              labelId="type"
              id="type"
              name="type"
              value={taskType}
              label="Task Type *"
              onChange={handleSelectChange('type')}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'feature'}>Feature</MenuItem>
              <MenuItem value={'issue'}>Issue</MenuItem>
              <MenuItem value={'bug'}>Bug</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Stack direction={'row'} marginTop={'15px'}></Stack>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Update
      </Button>
    </Box>
  );
};

const TaskCard = ({ task, index, onDragStart }: PropType) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [taskDetails, setTaskDetails] = useState(task);
  const open = Boolean(anchorEl);

  const { title, projectID, labels, priority, description } = taskDetails;

  useEffect(() => {
    setTaskDetails(task);
  }, [task]);

  const handleDragStart = () => {
    onDragStart(index, task.status);
  };

  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const toggleDrawer =
    (isOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setDrawerOpen(isOpen);
      handleClose();
    };

  return (
    <Box
      component="div"
      draggable
      onDragStart={handleDragStart}
      sx={{
        padding: '10px',
        margin: '10px',
        borderRadius: '10px',
        backgroundColor: 'primary.light',
        '&:hover': {
          transform: 'scale(1.04)',
          transition: 'transform 0.2s',
        },
        maxWidth: '100%',
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <LabelsAndPriority labels={labels} priority={priority} />
        </Grid>
        <Grid item xs={2}>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Zoom}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <MenuItem onClick={toggleDrawer(true)}>Edit</MenuItem>
            <MenuItem onClick={handleClose}>Mark as Completed</MenuItem>
          </Menu>
        </Grid>
      </Grid>
      <Typography
        sx={{
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
          whiteSpace: 'normal',
          fontWeight: 'bold',
        }}
      >
        {title}
      </Typography>
      <Box sx={{ marginTop: '10px' }}>
        <Typography noWrap>{description}</Typography>
      </Box>
      <Box sx={{ marginTop: '10px' }}>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Box>
            <Chip
              label={projectID.name}
              size="small"
              variant="outlined"
              color="secondary"
            />
          </Box>
          <Box>
            <AvatarGroup
              max={4}
              sx={{
                '& .MuiAvatar-root': {
                  transition: 'transform 0.3s ease-in-out',
                },
                '& .MuiAvatar-root:hover': {
                  transform: 'scale(1.2)', // Adjust the scale factor as per your preference
                },
              }}
            >
              <Avatar
                sx={{ width: 30, height: 30 }}
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
              />
              <Avatar
                sx={{ width: 30, height: 30 }}
                alt="Travis Howard"
                src="/static/images/avatar/2.jpg"
              />
            </AvatarGroup>
          </Box>
        </Stack>
      </Box>
      <Drawer
        anchor={'right'}
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        className="drawer-testing"
      >
        <Box sx={{ maxWidth: '100vw', width: '100%' }} role="presentation">
          <TaskUpdateForm
            taskDetails={taskDetails}
            setTaskDetails={setTaskDetails}
          />
        </Box>
      </Drawer>
    </Box>
  );
};

export default TaskCard;

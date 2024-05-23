import {
  Avatar,
  AvatarGroup,
  Box,
  Chip,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
  Zoom,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useState, useCallback } from 'react';

interface Task {
  _id: string;
  title: string;
  status: string;
  project: {
    _id: string;
    name: string;
  };
  assignedTo: {
    _id: string;
    firstName: string;
  };
  labels: string[];
  priority: string;
  type: string;
  description: string;
}

interface PropType {
  task: Task;
  index: string;
  onDragStart: (index: string) => void;
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

const TaskCard = ({ task, index, onDragStart }: PropType) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleDragStart = useCallback(() => {
    onDragStart(index);
  }, [index, onDragStart]);

  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

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
          <LabelsAndPriority labels={task.labels} priority={task.priority} />
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
            <MenuItem onClick={handleClose}>Edit</MenuItem>
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
        {task.title}
      </Typography>
      <Box sx={{ marginTop: '10px' }}>
        <Typography noWrap>{task.description}</Typography>
      </Box>
      <Box sx={{ marginTop: '10px' }}>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Box>
            <Chip
              label={task.project.name}
              size="small"
              variant="outlined"
              color="secondary"
            />
          </Box>
          <Box>
            <AvatarGroup max={4}>
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
    </Box>
  );
};

export default TaskCard;

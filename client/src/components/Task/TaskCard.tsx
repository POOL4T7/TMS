import {
  Avatar,
  AvatarGroup,
  Box,
  Chip,
  Drawer,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
  Zoom,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useState, useCallback, useEffect, Suspense, lazy } from 'react';
import { Task } from '@/models/Task';
import { User } from '@/models/users';

const TaskForm = lazy(() => import('./TaskForm'));

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

const TaskCard = ({ task, index, onDragStart }: PropType) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [taskDetails, setTaskDetails] = useState(task);
  const open = Boolean(anchorEl);

  const {
    title,
    projectID,
    labels,
    priority,
    description,
    assignedTo,
    assignedBy,
  } = taskDetails;

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
              label={typeof projectID !== 'string' && projectID?.name}
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
              <Tooltip
                title={`${assignedBy.firstName} ${
                  assignedBy?.lastName ? assignedBy?.lastName : ''
                }`}
              >
                <Avatar
                  sx={{ width: 30, height: 30 }}
                  alt="Travis Howard"
                  src={assignedBy.profilePicture}
                />
              </Tooltip>
              {assignedTo.map((user: Partial<User>) => {
                return (
                  <Tooltip
                    title={`${user.firstName} ${
                      user?.lastName ? user?.lastName : ''
                    }`}
                    key={user._id}
                  >
                    <Avatar
                      sx={{ width: 30, height: 30 }}
                      alt="Travis Howard"
                      src={user.profilePicture}
                    />
                  </Tooltip>
                );
              })}
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
          <Suspense fallback={<div>Loading...</div>}>
            <TaskForm taskId={taskDetails._id} />
          </Suspense>
        </Box>
      </Drawer>
    </Box>
  );
};

export default TaskCard;

import {
  Box,
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import {
  Groups,
  WebStories,
  QueryStats,
  FolderShared,
  People,
  ChecklistRtl,
  Assignment,
} from '@mui/icons-material';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCompanyProfileQuery } from '../../../../redux/services/company';
import Loader from '../../../Loader';

const CompanySideBar = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useCompanyProfileQuery();

  return (
    <Stack direction="row" spacing={2}>
      <Box
        flex={2}
        sx={{
          display: { xs: 'none', sm: 'block' },
          backgroundColor: '#F9FAFB',
          height: '90vh',
          maxHeight: '100vh',
          position: 'fixed',
          left: 0,
          top: 69,
          width: '100%',
          maxWidth: '280px',
        }}
      >
        <Box
          sx={{
            margin: '24px 20px',
            padding: '16px 20px',
            backgroundColor: '#EDEFF2',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
          }}
          className="profile-card"
          onClick={() => navigate('/profile')}
        >
          <Avatar alt={'User'} src={'/'} sx={{ marginRight: '10px' }} />
          {isLoading ? <Loader /> : <Typography>{data?.name}</Typography>}
        </Box>

        <Box>
          <List>
            <ListItem>
              <NavLink
                to={'/'}
                className={({ isActive }) => (isActive ? 'active-link' : '')}
              >
                <ListItemButton
                  sx={{ '&:hover': { backgroundColor: '#e8effa' } }}
                >
                  <ListItemIcon>
                    <QueryStats />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItemButton>
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink
                to={'/projects'}
                className={({ isActive }) => (isActive ? 'active-link' : '')}
              >
                <ListItemButton
                  sx={{ '&:hover': { backgroundColor: '#e8effa' } }}
                >
                  <ListItemIcon>
                    <WebStories />
                  </ListItemIcon>
                  <ListItemText primary="Projects" />
                </ListItemButton>
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink
                to={'/teams'}
                className={({ isActive }) => (isActive ? 'active-link' : '')}
              >
                <ListItemButton
                  sx={{ '&:hover': { backgroundColor: '#e8effa' } }}
                >
                  <ListItemIcon>
                    <Groups />
                  </ListItemIcon>
                  <ListItemText primary="Teams" />
                </ListItemButton>
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink
                to={'/positions'}
                className={({ isActive }) => (isActive ? 'active-link' : '')}
              >
                <ListItemButton
                  sx={{ '&:hover': { backgroundColor: '#e8effa' } }}
                >
                  <ListItemIcon>
                    <FolderShared />
                  </ListItemIcon>
                  <ListItemText primary="Position & Roles" />
                </ListItemButton>
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink
                to={'/users'}
                className={({ isActive }) => (isActive ? 'active-link' : '')}
              >
                <ListItemButton
                  sx={{ '&:hover': { backgroundColor: '#e8effa' } }}
                >
                  <ListItemIcon>
                    <People />
                  </ListItemIcon>
                  <ListItemText primary="Users" />
                </ListItemButton>
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink
                to={'/task/assigned'}
                className={({ isActive }) => (isActive ? 'active-link' : '')}
              >
                <ListItemButton
                  sx={{
                    '&:hover': { backgroundColor: '#e8effa' },
                  }}
                >
                  <ListItemIcon>
                    <ChecklistRtl />
                  </ListItemIcon>
                  <ListItemText primary="Assigned Task" />
                </ListItemButton>
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink
                to={'/task/own-task-list'}
                className={({ isActive }) => (isActive ? 'active-link' : '')}
              >
                <ListItemButton
                  sx={{
                    '&:hover': { backgroundColor: '#e8effa' },
                  }}
                >
                  <ListItemIcon>
                    <Assignment />
                  </ListItemIcon>
                  <ListItemText primary="Own Task" />
                </ListItemButton>
              </NavLink>
            </ListItem>
          </List>
        </Box>
      </Box>
    </Stack>
  );
};

export default CompanySideBar;

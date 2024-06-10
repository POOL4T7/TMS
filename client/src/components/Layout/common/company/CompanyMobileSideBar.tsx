import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import {
  Assignment,
  FolderShared,
  Groups,
  People,
  QueryStats,
  WebStories,
} from '@mui/icons-material';
import { NavLink, useNavigate } from 'react-router-dom';
import { Avatar, Typography } from '@mui/material';
import Loader from '../../../Loader';
import { useCompanyProfileQuery } from '../../../../redux/services/company';

type Anchor = 'left';

export default function CompanyMobileSideBar() {
  const [state, setState] = React.useState({
    left: false,
    bottom: false,
  });
  const navigate = useNavigate();
  const { data, isLoading } = useCompanyProfileQuery();
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
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
      <List>
        <ListItem>
          <ListItemButton sx={{ '&:hover': { backgroundColor: '#e8effa' } }}>
            <ListItemIcon>
              <QueryStats />
            </ListItemIcon>
            <NavLink
              to={'/'}
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              <ListItemText primary="Dashboard" />
            </NavLink>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton sx={{ '&:hover': { backgroundColor: '#e8effa' } }}>
            <ListItemIcon>
              <WebStories />
            </ListItemIcon>
            <NavLink
              to={'/projects'}
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              <ListItemText primary="Projects" />
            </NavLink>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton sx={{ '&:hover': { backgroundColor: '#e8effa' } }}>
            <ListItemIcon>
              <Groups />
            </ListItemIcon>
            <NavLink
              to={'/teams'}
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              <ListItemText primary="Teams" />
            </NavLink>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton sx={{ '&:hover': { backgroundColor: '#e8effa' } }}>
            <ListItemIcon>
              <FolderShared />
            </ListItemIcon>
            <NavLink
              to={'/positions'}
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              <ListItemText primary="Position & Roles" />
            </NavLink>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton sx={{ '&:hover': { backgroundColor: '#e8effa' } }}>
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <NavLink
              to={'/users'}
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              <ListItemText primary="Users" />
            </NavLink>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton sx={{ '&:hover': { backgroundColor: '#e8effa' } }}>
            <ListItemIcon>
              <ChecklistRtlIcon />
            </ListItemIcon>
            <NavLink
              to={'/task/assigned'}
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              <ListItemText primary="Assigned Task" />
            </NavLink>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton sx={{ '&:hover': { backgroundColor: '#e8effa' } }}>
            <ListItemIcon>
              <Assignment />
            </ListItemIcon>
            <NavLink
              to={'/task/own-task-list'}
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              <ListItemText primary="Own Task" />
            </NavLink>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <Button sx={{ color: '#fff' }} onClick={toggleDrawer('left', true)}>
        <MenuIcon />
      </Button>
      <Drawer
        anchor={'left'}
        open={state['left']}
        onClose={toggleDrawer('left', false)}
      >
        {list('left')}
      </Drawer>
    </div>
  );
}

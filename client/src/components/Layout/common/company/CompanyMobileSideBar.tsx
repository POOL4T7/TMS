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
import {
  Assignment,
  ChecklistRtl,
  FolderShared,
  Groups,
  People,
  QueryStats,
  WebStories,
} from '@mui/icons-material';
import { NavLink, useNavigate } from 'react-router-dom';
import { Avatar, Typography } from '@mui/material';
import Loader from '@/components/Loader';
import { useCompanyProfileQuery } from '@/redux/services/company';
import { t } from 'i18next';

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
      role='presentation'
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
        className='profile-card'
        onClick={() => navigate('/profile')}
      >
        <Avatar alt={'User'} src={'/'} sx={{ marginRight: '10px' }} />
        {isLoading ? <Loader /> : <Typography>{data?.name}</Typography>}
      </Box>
      <List>
        <ListItem>
          <NavLink
            to={'/'}
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            <ListItemButton sx={{ '&:hover': { backgroundColor: '#e8effa' } }}>
              <ListItemIcon>
                <QueryStats />
              </ListItemIcon>
              <ListItemText primary={t('dashboard')} />
            </ListItemButton>
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink
            to={'/projects'}
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            <ListItemButton sx={{ '&:hover': { backgroundColor: '#e8effa' } }}>
              <ListItemIcon>
                <WebStories />
              </ListItemIcon>
              <ListItemText primary={t('project')} />
            </ListItemButton>
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink
            to={'/teams'}
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            <ListItemButton sx={{ '&:hover': { backgroundColor: '#e8effa' } }}>
              <ListItemIcon>
                <Groups />
              </ListItemIcon>
              <ListItemText primary={t('team')} />
            </ListItemButton>
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink
            to={'/positions'}
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            <ListItemButton sx={{ '&:hover': { backgroundColor: '#e8effa' } }}>
              <ListItemIcon>
                <FolderShared />
              </ListItemIcon>
              <ListItemText primary={t('position-role')} />
            </ListItemButton>
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink
            to={'/users'}
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            <ListItemButton sx={{ '&:hover': { backgroundColor: '#e8effa' } }}>
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText primary={t('users')} />
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
              <ListItemText primary={t('assigned-task')} />
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
              <ListItemText primary={t('own-task')} />
            </ListItemButton>
          </NavLink>
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

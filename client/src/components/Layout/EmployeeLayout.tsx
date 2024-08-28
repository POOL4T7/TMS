import { Box, Stack, Theme, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './common/Header';
import UserSideBar from './common/user/UserSideBar';
import UserMobileSideBar from './common/user/UserMobileSideBar';

const EmployeeLayout = () => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md')
  );

  return (
    <>
      <Header SideBar={UserMobileSideBar} />
      <Stack direction='row' spacing={0.5}>
        <UserSideBar />
        <Box
          flex={8}
          sx={{
            backgroundColor: '#F9FAFB',
            position: 'relative',
            left: isMobile ? '0px' : '280px',
            top: 70,
            maxWidth: isMobile ? '100vw' : 'calc(100vw - 284px)',
            width: '100%',
            minHeight: '90vh',
            maxHeight: '100%',
          }}
        >
          <Outlet />
        </Box>
      </Stack>
    </>
  );
};

export default EmployeeLayout;

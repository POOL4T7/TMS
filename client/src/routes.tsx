import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './screens/Home/Home';
import Login from './screens/Auth/SignIn';
import Register from './screens/Auth/Signup';
import Profile from './screens/Company/Profile';
import NotFound from './screens/NotFound';
import DashBoard from './screens/Company/DashBoard';
import { AuthState } from './models/custom';
import CompanyLayout from './components/Layout/CompanyLayout';
import Team from './screens/Company/Team';
import Users from './screens/Company/Users';
import Position from './screens/Company/Position';
import UserSignIn from './screens/Auth/UserSignIn';
import EmployeeLayout from './components/Layout/EmployeeLayout';
import Employeedashboard from './screens/Employee/Dashboard/EmployeeDashboard';
import EmployeeProfile from './screens/Employee/Profile/EmployeeProfile';
import Project from './screens/Project';
import CUPage from './screens/Company/Project/CUPage';
import ForgotPassword from './screens/Auth/ForgotPassword';
import ResetPassword from './screens/Auth/ResetPassword';
import CreateTask from './screens/Company/Task/CreateTask';
import TaskList from './screens/Company/Task/TaskList';

const router = (authState: AuthState) => {
  return createBrowserRouter([
    {
      path: '/',
      element: getLayout(authState),
      children: [
        {
          path: '',
          element: getLandingPage(authState),
        },
        {
          path: '/profile',
          element: getProfile(authState),
        },
        {
          path: '/teams',
          element: <Team />,
        },
        {
          path: '/users',
          element: <Users />,
        },
        {
          path: '/positions',
          element: <Position />,
        },
        {
          path: '/projects',
          element: <Project />,
        },
        {
          path: '/create-project',
          element: <CUPage />,
        },
        {
          path: '/project/:projectID',
          element: <CUPage />,
        },
        {
          path: '/task',
          children: [
            {
              path: 'create',
              element: <CreateTask />,
            },
            {
              path: 'assigned',
              element: <TaskList />,
            },
          ],
        },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/login-user',
      element: <UserSignIn />,
    },
    {
      path: '/signup',
      element: <Register />,
    },
    {
      path: '/forgot-password',
      element: <ForgotPassword />,
    },
    {
      path: '/auth/reset-password',
      element: <ResetPassword />,
    },
    {
      path: '/404',
      element: <NotFound />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);
};

function getLayout(authState: AuthState) {
  if (authState?.type === 'company') {
    return <CompanyLayout />;
  } else if (authState.type === 'employee' || authState?.type == 'manager') {
    return <EmployeeLayout />;
  } else {
    return <Layout />;
  }
}

function getLandingPage(authState: AuthState) {
  if (authState?.type === 'company') {
    return <DashBoard />;
  } else if (authState.type === 'employee') {
    return <Employeedashboard />;
  } else {
    return <Home />;
  }
}
function getProfile(authState: AuthState) {
  if (authState?.type === 'company') {
    return <Profile />;
  } else if (authState.type === 'employee') {
    return <EmployeeProfile />;
  } else {
    return <Home />;
  }
}

// function getProject(authState: AuthState) {
//   if (authState.type === "company") {
//     return <Project />;
//   } else if (authState.type === "employee") {
//     return <EmployeeProject />;
//   }
// }

export default router;

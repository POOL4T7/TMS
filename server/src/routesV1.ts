import { Express } from 'express';
import IndustryRoute from './routes/Industry.route';
import UserRoute from './routes/User.route';
import CompanyRoute from './routes/Company.route';
import AuthRoute from './routes/Auth.route';
import DepartmentRoute from './routes/Department.route';
import PositionRouter from './routes/Position.route';
import ProjectRoute from './routes/Project.route';
import CustomRouter from './routes/Custom.route';
import TaskRouter from './routes/Task.route';

const routesV1 = async (app: Express): Promise<void> => {
  app.use('/tms/industry', IndustryRoute);
  app.use('/user', UserRoute);
  app.use('/company', CompanyRoute);
  app.use('/auth', AuthRoute);
  app.use('/teams', DepartmentRoute);
  app.use('/position', PositionRouter);
  app.use('/project', ProjectRoute);
  app.use('/custom', CustomRouter);
  app.use('/task', TaskRouter);
};

export default routesV1;

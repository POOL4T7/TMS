import { Express } from "express";
import IndustryRoute from './routes/Industry.route';
import UserRoute from './routes/User.route';
import CompanyRoute from "./routes/Company.route";
import AuthRoute from "./routes/Auth.route";

const routesV1 = async (app: Express): Promise<void> => {
    app.use('/tms/industry', IndustryRoute);
    // app.use('/auth', UserRoute);
    app.use('/company', CompanyRoute);
    app.use('/auth', AuthRoute);
};

export default routesV1;

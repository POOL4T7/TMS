// routes/companyRoutes.ts

import express, { Router } from "express";
import CompanyController from "../controllers/Company.controller";
import Auth from "../middlewares/User.middleware";

const router: Router = express.Router();

router
  .route("/company-details")
  .get(
    Auth.isAuth,
    Auth.roleAuthMiddleware(["company"]),
    CompanyController.getOwnCompany
  );

export default router;

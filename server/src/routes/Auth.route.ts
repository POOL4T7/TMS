// routes/AuthRoutes.ts

import express, { Router } from "express";
import CompanyController from "../controllers/Auth.controller";
// import Auth from "../middlewares/User.middleware";

const router: Router = express.Router();

router.route("/company/create").post(
  // Auth.isAuth,
  // Auth.roleAuthMiddleware(["admin"]),
  CompanyController.createCompany,
);

router.route("/company/login").post(CompanyController.companyLogin);

export default router;

// routes/AuthRoutes.ts

import express, { Router } from "express";
import CompanyController from "../controllers/Auth.controller";
// import Auth from "../middlewares/User.middleware";

const router: Router = express.Router();

router.route("/company/create").post(CompanyController.createCompany);
router.route("/login").post(CompanyController.login);

router.route("/company/login").post(CompanyController.companyLogin);
router.route("/user/login").post(CompanyController.userLogin);

export default router;

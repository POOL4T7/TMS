// routes/AuthRoutes.ts

import express, { Router } from "express";
import AuthController from "../controllers/Auth.controller";
// import Auth from "../middlewares/User.middleware";

const router: Router = express.Router();

router.route("/company/create").post(AuthController.createCompany);
router.route("/login").post(AuthController.login);

// router.route("/company/login").post(AuthController.companyLogin);
router.route("/user/login").post(AuthController.userLogin);

router.route("/send-link").post(AuthController.sendLink);

export default router;

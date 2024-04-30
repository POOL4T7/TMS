// routes/AuthRoutes.ts

import express, { Router } from "express";
import AuthController from "../controllers/Auth.controller";

import {
  validator,
  loginValidator,
  companySignUpValidator,
  emailLinkValidator,
} from "../validator/index";

const router: Router = express.Router();

router
  .route("/company/create")
  .post( AuthController.createCompany);
router.route("/login").post(loginValidator, validator, AuthController.login);

// router.route("/user/login").post(AuthController.userLogin);

router
  .route("/send-link")
  .post(emailLinkValidator, validator, AuthController.sendLink);

// ------------------------------------DS------------------------------------------
// this route for forgot password
router
  .route("/forgot-password")
  .post(emailLinkValidator, validator, AuthController.sendResetToken);

router
  .route("/reset-password")
  .post(AuthController.resetPassword);

export default router;

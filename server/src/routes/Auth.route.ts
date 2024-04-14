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
  .post(companySignUpValidator, validator, AuthController.createCompany);
router.route("/login").post(loginValidator, validator, AuthController.login);

// router.route("/user/login").post(AuthController.userLogin);

router
  .route("/send-link")
  .post(emailLinkValidator, validator, AuthController.sendLink);

export default router;

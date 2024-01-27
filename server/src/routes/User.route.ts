// routes/industryRoutes.ts

import express, { Router } from "express";
import UserController from "../controllers/User.controller";
const router: Router = express.Router();

router
  .route("/register/employee")
  .post(
    UserController.registerUser
  )

export default router;

// routes/industryRoutes.ts

import express, { Router } from "express";
import UserController from "../controllers/User.controller";
const router: Router = express.Router();
import Auth from "../middlewares/User.middleware";

router
  .route("/register/employee")
  .post(
    Auth.isAuth,
    Auth.roleAuthMiddleware(["company"]),
    UserController.registerUser
  )

router
  .route("/users-list")
  .get(
    Auth.isAuth,
    Auth.roleAuthMiddleware(["company"]),
    UserController.getCompanyUsers
  )

export default router;

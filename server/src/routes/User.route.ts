// routes/industryRoutes.ts

import express, { Router } from "express";
import UserController from "../controllers/User.controller";
const router: Router = express.Router();
import Auth from "../middlewares/User.middleware";

router
  .route("/register")
  .post(
    Auth.isAuth,
    Auth.roleAuthMiddleware(["company"]),
    UserController.registerUser,
  );

router
  .route("/users-list")
  .get(
    Auth.isAuth,
    Auth.roleAuthMiddleware(["company"]),
    UserController.getCompanyUsers,
  );

router
  .route("/:userId")
  .get(
    Auth.isAuth,
    Auth.roleAuthMiddleware(["company"]),
    UserController.userDetails,
  )
  .patch(
    Auth.isAuth,
    Auth.roleAuthMiddleware(["company"]),
    UserController.updateProfile,
  );

export default router;

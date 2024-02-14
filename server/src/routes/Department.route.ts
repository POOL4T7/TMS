// routes/industryRoutes.ts

import express, { Router, Request, Response } from "express";
import DepartmentController from "../controllers/Department.controller";
import Auth from "../middlewares/User.middleware";

const router: Router = express.Router();

router
  .route("/")
  .post(
    Auth.isAuth,
    Auth.roleAuthMiddleware(["company"]),
    DepartmentController.createDepartment
  );

router.get(
  "/all",
  Auth.isAuth,
  Auth.roleAuthMiddleware(["company"]),
  DepartmentController.getDepartments
);

router.get(
  "/get-list",
  Auth.isAuth,
  Auth.roleAuthMiddleware(["company"]),
  DepartmentController.getDepartmentList
);

export default router;

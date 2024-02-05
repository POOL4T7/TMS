// routes/industryRoutes.ts

import express, { Router, Request, Response } from "express";
import DepartmentController from "../controllers/Department.controller";
import Auth from "../middlewares/User.middleware";

const router: Router = express.Router();

router.route("/").post(DepartmentController.createDepartment);

router.get(
  "/all",
  Auth.isAuth,
  Auth.roleAuthMiddleware(["company"]),
  DepartmentController.getDepartments
);

export default router;

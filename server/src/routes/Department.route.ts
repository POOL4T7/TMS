// routes/industryRoutes.ts

import express, { Router } from "express";
import DepartmentController from "../controllers/Department.controller";
import AuthMiddleware from "../middlewares/Auth.middleware";

const router: Router = express.Router();

router
  .route("/")
  .post(
    AuthMiddleware.isAuth,
    AuthMiddleware.roleAuthMiddleware(["company"]),
    DepartmentController.createDepartment,
  );

router.get(
  "/all",
  AuthMiddleware.isAuth,
  AuthMiddleware.roleAuthMiddleware(["company"]),
  DepartmentController.getDepartments,
);

router.get(
  "/get-list",
  AuthMiddleware.isAuth,
  AuthMiddleware.roleAuthMiddleware(["company"]),
  DepartmentController.getDepartmentList,
);

export default router;

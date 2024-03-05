import express, { Router } from "express";
import ProjectController from "../controllers/Project.controller";
import AuthMiddleware from "../middlewares/Auth.middleware";
const projectRoute: Router = express.Router();

projectRoute
  .route("/")
  .post(
    AuthMiddleware.isAuth,
    AuthMiddleware.roleAuthMiddleware(["company"]),
    ProjectController.createProject
  )
  .get(
    AuthMiddleware.isAuth,
    AuthMiddleware.roleAuthMiddleware([
      "company",
      "manager",
      "employee",
      "teamlead",
    ]),
    ProjectController.getProjectList
  );

export default projectRoute;

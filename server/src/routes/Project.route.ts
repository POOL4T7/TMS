import express, { Router } from "express";
import ProjectController from "../controllers/Project.controller";
import AuthMiddleware from "../middlewares/Auth.middleware";
const ProjectRoute: Router = express.Router();

ProjectRoute.route("/")
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

export default ProjectRoute;

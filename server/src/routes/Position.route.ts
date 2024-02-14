// routes/industryRoutes.ts

import express, { Router } from "express";
import PositionController from "../controllers/Position.controller";
import Auth from "../middlewares/User.middleware";

const PositionRouter: Router = express.Router();

PositionRouter.route("/")
  .post(
    Auth.isAuth,
    Auth.roleAuthMiddleware(["company"]),
    PositionController.createPosition
  )
  .get(
    Auth.isAuth,
    Auth.roleAuthMiddleware(["company"]),
    PositionController.getAllPosition
  )
  .delete(
    Auth.isAuth,
    Auth.roleAuthMiddleware(["company"]),
    PositionController.deletePosition
  );

export default PositionRouter;

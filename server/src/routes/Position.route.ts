import express, { Router } from "express";
import PositionController from "../controllers/Position.controller";
import AuthMiddleware from "../middlewares/Auth.middleware";

const PositionRouter: Router = express.Router();

PositionRouter.route("/")
  .post(
    AuthMiddleware.isAuth,
    AuthMiddleware.roleAuthMiddleware(["company"]),
    PositionController.createPosition,
  )
  .get(
    AuthMiddleware.isAuth,
    AuthMiddleware.roleAuthMiddleware(["company"]),
    PositionController.getPositionWithStats,
  )
  .delete(
    AuthMiddleware.isAuth,
    AuthMiddleware.roleAuthMiddleware(["company"]),
    PositionController.deletePosition,
  )
  .patch(
    AuthMiddleware.isAuth,
    AuthMiddleware.roleAuthMiddleware(["company"]),
    PositionController.updatePosition,
  );

PositionRouter.route("/:positionId").get(
  AuthMiddleware.isAuth,
  AuthMiddleware.roleAuthMiddleware(["company"]),
  PositionController.getPosition,
);

PositionRouter.route("/team/:teamId").get(
  AuthMiddleware.isAuth,
  AuthMiddleware.roleAuthMiddleware(["company"]),
  PositionController.getPositionByDepartmentId,
);

export default PositionRouter;

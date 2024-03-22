// routes/companyRoutes.ts

import express, { Router } from "express";
import CompanyController from "../controllers/Company.controller";
import AuthMiddleware from "../middlewares/Auth.middleware";

const router: Router = express.Router();

router
  .route("/")
  .get(
    AuthMiddleware.isAuth,
    AuthMiddleware.roleAuthMiddleware(["company"]),
    CompanyController.getOwnCompany,
  )
  .patch(
    AuthMiddleware.isAuth,
    AuthMiddleware.roleAuthMiddleware(["company"]),
    CompanyController.updateCompanyDetails,
  );

router.get(
  "/dashboard-counts",
  AuthMiddleware.isAuth,
  AuthMiddleware.roleAuthMiddleware(["company"]),
  CompanyController.dashboardCount,
);

export default router;

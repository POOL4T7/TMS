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

export default router;

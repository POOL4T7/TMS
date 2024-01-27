// routes/industryRoutes.ts

import express, { Router, Request, Response } from "express";
import CompanyController from "../controllers/Company.controller";
// import Auth from "../middlewares/User.middleware";

const router: Router = express.Router();

router
  .route("/:id")
  .get(CompanyController.getIndustryById)
  .put(CompanyController.updateIndustry)
  .delete(CompanyController.deleteIndustry);

router
  .route("/")
  .post(
    // Auth.isAuth,
    // Auth.roleAuthMiddleware(["admin"]),
    CompanyController.createCompany
  )
  .get(CompanyController.getAllIndustries);


export default router;

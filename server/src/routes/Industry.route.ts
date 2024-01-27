// routes/industryRoutes.ts

import express, { Router, Request, Response } from "express";
import IndustryController from "../controllers/Industry.controller";
// import Auth from "../middlewares/User.middleware";

const router: Router = express.Router();

router
  .route("/:id")
  .get(IndustryController.getIndustryById)
  .put(IndustryController.updateIndustry)
  .delete(IndustryController.deleteIndustry);

router
  .route("/")
  .post(
    // Auth.isAuth,
    // Auth.roleAuthMiddleware(["admin"]),
    IndustryController.createIndustry
  )
  .get(IndustryController.getAllIndustries);


export default router;

// routes/industryRoutes.ts

import express, { Router } from "express";
import multer from "multer";
import path from "path";
import DepartmentController from "../controllers/Department.controller";
import AuthMiddleware from "../middlewares/Auth.middleware";

const CustomRouter: Router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Add the file extension to the filename
    const ext = path.extname(file.originalname);
    cb(
      null,
      Date.now() +
        "-" +
        file.originalname.replace(/\s/g, "_").toLowerCase() +
        ext,
    );
  },
});

const upload = multer({ storage: storage });

CustomRouter.route("/upload-image").post(
  AuthMiddleware.isAuth,
  AuthMiddleware.roleAuthMiddleware(["company"]),
  upload.single("image"),
  DepartmentController.uploadImage,
);

export default CustomRouter;

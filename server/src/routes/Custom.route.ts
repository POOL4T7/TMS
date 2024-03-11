// routes/industryRoutes.ts

import express, { Router } from "express";
import multer from "multer";
import path from "path";
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
  async (req, res) => {
    try {
      if (req.file instanceof Error) {
        return res.status(422).json({
          success: 0,
          message: "Violation for file validation ",
          error: req.file.message,
        });
      } else {
        return res.status(200).json({
          success: 1,
          message: "File Uploaded successfully",
          fileLocation: "http://localhost:8080/" + req.file?.path,
        });
      }
    } catch (e: any) {
      return res.status(500).json({
        success: false,
        error: e.message,
        message: "Server error",
      });
    }
  },
);

export default CustomRouter;

// async uploadImage(req: Request, res: Response): Promise<Response> {
//   try {
//     if (req.file instanceof Error) {
//       return res.status(422).json({
//         success: 0,
//         message: "Violation for file validation ",
//         error: req.file.message,
//       });
//     } else {
//       return res.status(200).json({
//         success: 1,
//         message: "File Uploaded successfully",
//         fileLocation: "http://localhost:8080/" + req.file?.path,
//       });
//     }
//   } catch (error: any) {
//     return res.status(500).json({
//       success: false,
//       error: error.message,
//       message: "Server error",
//     });
//   }
// }

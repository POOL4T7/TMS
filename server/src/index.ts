import express, { Express } from "express";
import dotenv from "dotenv";
import connectDB from "../config/db";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import specs from "./swaggerConfig";

dotenv.config();

const app: Express = express();
connectDB();

import routesV1 from "./app";
import path from "path";
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT;
if (process.env.NODE_ENV != "production") {
  app.use("/swagger-api-docs", swaggerUi.serve, swaggerUi.setup(specs));
}

app.use("/uploads", express.static(path.join(__dirname, "../uploads/")));
routesV1(app);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

import express, { Express } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import cors from "cors";

dotenv.config();

const app: Express = express();
connectDB();

import routesV1 from "./src";
import path from "path";
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT;
console.log(path.join(__dirname, "../uploads/"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use("/images", express.static("./src/uploads/"));
routesV1(app);

app.listen(8080, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

import express, { Express } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import cors from "cors";

dotenv.config();

const app: Express = express();
connectDB();

import routesV1 from "./src";
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT;

routesV1(app);

app.listen(8080, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

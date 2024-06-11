import express, { Express } from 'express';
// import dotenv from "dotenv";
// import connectDB from "../config/db";
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import specs from './swaggerConfig';
// dotenv.config();

const app: Express = express();
// connectDB();

import routesV1 from './routesV1';
import path from 'path';

app.use(
  cors({
    origin: '*',
    // credentials: true,
  })
);

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms')
);
// connectRedisClient();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// app.get("/", (req, res) => {
//   const { myHttpOnlyCookie } = req.cookies;
//   console.log("myHttpOnlyCookie", myHttpOnlyCookie);
//   // console.log("res.cookie.length", res.cookie.length);
//   console.log("Cookies: ", req.cookies);
//   // console.log("signedCookies", cookieParser.signedCookies);
//   // res.cookie("myHttpOnlyCookie", "cookieValue", { httpOnly: true });
//   return res.status(200).json(req.cookies);
// });
// const port = process.env.PORT;
if (process.env.NODE_ENV != 'production') {
  app.use('/swagger-api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}

app.use('/uploads', express.static(path.join(__dirname, '../uploads/')));
routesV1(app);

// app.listen(port, () => {
//   console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
// });

export default app;

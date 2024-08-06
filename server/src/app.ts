import express, { Express, NextFunction, Request, Response } from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import specs from './swaggerConfig';

import { typeDefs } from './graphql/schema/user.schema';
import { resolvers } from './graphql/resolvers/user.resolver';

const app: Express = express();
const httpServer = http.createServer(app);

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

server
  .start()
  .then(() => {
    console.log('apollo server started');
    app.use(
      '/graphql',
      cors(),
      express.json(),
      expressMiddleware(server, {
        context: async ({ req }) => ({ token: req.headers.token }),
      })
    );
  })
  .catch((e) => {
    Logger.error(`apollo server starting error: ${e.message}`);
  });

import routesV1 from './routesV1';
import path from 'path';
import Logger from './helpers/Logger';

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

app.get('/', (req, res) => {
  // const { myHttpOnlyCookie } = req.cookies;
  // console.log("myHttpOnlyCookie", myHttpOnlyCookie);
  // console.log("res.cookie.length", res.cookie.length);
  // console.log("Cookies: ", req.cookies);
  // console.log("signedCookies", cookieParser.signedCookies);
  // res.cookie("myHttpOnlyCookie", "cookieValue", { httpOnly: true });
  return res.status(200).json({
    data: [],
    success: true,
  });
});
// const port = process.env.PORT;
if (process.env.NODE_ENV != 'production') {
  app.use('/swagger-api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}

app.use('/uploads', express.static(path.join(__dirname, '../uploads/')));
routesV1(app);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use('*', (err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.log(err);
  if (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      stack: err.stack,
    });
  }
});

export default httpServer;

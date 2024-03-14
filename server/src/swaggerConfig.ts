import swaggerJsdoc from "swagger-jsdoc";
import LoginAPI from "./docs/auth.swagger";
import industrySwagger from "./docs/industry.swagger";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TMS REST API Docs",
      version: "0.1.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        loginSchema: LoginAPI.loginBody,
      },
    },
    servers: [
      {
        url: "http://localhost:8080/",
        description: "Local Server",
      },
      {
        url: "https://api.staging.tmsapp.com",
        description: "Staging Server",
      },
      {
        url: "https://api.tmsapp.com",
        description: "Production Server",
      },
    ],
    tags: [
      {
        name: "Authentication",
      },
      {
        name: "Users",
      },
      {
        name: "Company",
      },
      {
        name: "Industry",
      },
      {
        name: "Teams",
      },
      {
        name: "Position & Roles",
      },
      {
        name: "Projects",
      },
    ],
    security: [
      {
        bearerAuth: [],
      },
    ],
    paths: {
      "/auth/login": {
        post: LoginAPI.loginAPI,
      },
      "/tms/industry": {
        get: industrySwagger.industryList,
      },
    },
  },
  apis: [],
};

const specs = swaggerJsdoc(options);

export default specs;

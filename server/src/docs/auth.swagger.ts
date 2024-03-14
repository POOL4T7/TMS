const loginAPI = {
  tags: ["Authentication"],
  description: "Login API",
  operationId: "loginAPI",
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/loginSchema",
        },
      },
    },
    required: true,
  },
  responses: {
    "200": {
      description: "LoggedIn successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "successfully logged-In",
              },
              success: {
                type: "boolean",
                example: true,
              },
              data: {
                type: "object",
                properties: {
                  accessToken: {
                    type: "string",
                    example: "erfcerfcrfcwerffr",
                  },
                  type: {
                    type: "string",
                    example: "manager",
                  },
                  status: {
                    type: "string",
                    example: "active",
                  },
                },
              },
            },
          },
        },
      },
    },
    "500": {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Internal Server Error",
              },
              error: {
                type: "string",
                example: "Internal Server Error",
              },
              success: {
                type: "boolean",
                example: false,
              },
            },
          },
        },
      },
    },
    "404": {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Internal Server Error",
              },
              success: {
                type: "boolean",
                example: false,
              },
            },
          },
        },
      },
    },
  },
};
const loginBody = {
  type: "object",
  properties: {
    email: {
      type: "string",
      example: "john.snow@email.com",
    },
    password: {
      type: "string",
      description: "unencrypted user's password",
      example: "!1234aWe1Ro3$#",
    },
  },
};

export default { loginAPI, loginBody };

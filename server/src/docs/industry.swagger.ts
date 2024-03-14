const industryList = {
  tags: ["Industry"],
  description: "Get all active industrys",
  operationId: "industryList",
  security: [
    {
      bearerAuth: [],
    },
  ],
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
                example: "Industries list",
              },
              success: {
                type: "boolean",
                example: true,
              },
              industryList: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    _id: {
                      type: "string",
                      example: "65ab9d33ae7a8d2b1dbb03d6",
                    },
                    name: {
                      type: "string",
                      example: "Technology",
                    },
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
                example: "server error",
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
  },
};

export default { industryList };

import swaggerJsDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "all api ",
      version: "1.0.0",
      description: "all api of backend with proper tags",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/module/**/*.route.ts", "./src/module/**/*.controller.ts"], 
};

export const swaggerDocs = swaggerJsDoc(options);

import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fresh-Track API',
      version: '1.0.0',
      description: 'API documentation for Fresh-Track',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
      {
        url: 'https://fresh-track-api.onrender.com',
        description: 'Production server',
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/models/*.ts'], // Adjust the paths as necessary
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;

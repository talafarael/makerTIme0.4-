const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'Описание вашего API',
    },
    servers: [
      {
        url: 'http://localhost:2000', 
      },
    ],
  },
  apis: ['./swaggeschema.js'], 
};

const specs = swaggerJsdoc(options);

module.exports = specs;
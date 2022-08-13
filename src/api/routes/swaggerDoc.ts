import { Router } from 'express';
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../../swagger.json');

export default (app: Router): void => {
  app.use('/apidoc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

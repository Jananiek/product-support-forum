import { Router, Request, Response } from 'express';
import logger, { modules } from '../../loaders/logger/index';
const route = Router();
import { ErrorResponse, SuccessResponse } from '../../utils/responseHandler';

/**
 * Usage
 *
 * 1. logger.info('Message', { module: modules.health, data: 'healthy' });
 * 2. logger.error('Message', { module: modules.health, data: 'healthy' });
 * 3. logger.warn('Message', { module: modules.health, data: 'healthy' });
 * 4. logger.debug('Message', { module: modules.health, data: 'healthy' });
 */

export default (app: Router): void => {
  app.use('/health', route);

  route.get('/', async (req: Request, res: Response) => {
    try {
      logger.info('Health works!', { module: modules.health, data: 'healthy' });
      return SuccessResponse(res, 'Health works!', null, 200);
    } catch (error) {
      return ErrorResponse(res, { message: error.message }, 400);
    }
  });
};

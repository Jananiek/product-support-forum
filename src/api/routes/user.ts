import { Router, Request, Response } from 'express';
import logger, { modules } from '../../loaders/logger';
import { verifyJWT } from '../../middleware/verifyJWT';
import { UserService } from '../../modules/users/services';
import { ErrorResponseHandler, SuccessResponse } from '../../utils/responseHandler';

const route = Router();
const userService = new UserService();

export default (app: Router): void => {
  app.use('/users', route);
  route.get('/', verifyJWT, async (req: Request, res: Response) => {
    const { query } = req;
    try {
      const users = await userService.getAll(query);
      return SuccessResponse(res, users, null, 200);
    } catch (e) {
      logger.error('Get all users', {
        module: modules.post,
        service: 'user',
        data: e.message,
      });
      return ErrorResponseHandler(res, { message: e.message, name: e.name });
    }
  });
};

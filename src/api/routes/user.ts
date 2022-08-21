import { Router, Request, Response } from 'express';
import { UserService } from '../../modules/users/services';

const route = Router();
const userService = new UserService();

export default (app: Router): void => {
  app.use('/user', route);
};

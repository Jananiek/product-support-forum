import { Router, Request, Response } from 'express';
import { plainToClass, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { AuthService } from '../../modules/auth/services/index';
import { UserRegisterDto } from '../../modules/users/dto/userRegisterDto';
import { UserLoginDto } from '../../modules/users/dto/userLoginDto';
import { ErrorResponse, ErrorResponseHandler, SuccessResponse } from '../../utils/responseHandler';
import { DEFAULT_VALIDATION_OPTIONS } from '../../utils/validator';
import logger, { modules } from '../../loaders/logger/index';

const route = Router();
const authService = new AuthService();

export default (app: Router): void => {
  app.use('/auth', route);
  route.post('/register', async (req: Request, res: Response) => {
    const registerDto: UserRegisterDto = plainToInstance(UserRegisterDto, req.body, {
      enableImplicitConversion: false,
      groups: ['register'],
    });

    const errors = await validate(registerDto, DEFAULT_VALIDATION_OPTIONS);
    if (errors.length > 0) {
      return ErrorResponse(res, { message: 'Bad Request, Invalid Query Params Please refer documentation.' });
    }
    const { password, email } = registerDto;
    if (!password || !email) {
      return ErrorResponse(res, { message: 'Email and password are required' });
    }
    try {
      const response = await authService.registerUSer(registerDto);
      return SuccessResponse(res, response, null, 201);
    } catch (e) {
      logger.error('Register User', {
        module: modules.auth,
        service: 'auth',
        data: e.message,
      });
      return ErrorResponseHandler(res, { message: e.message, name: e.name });
    }
  });

  route.post('/login', async (req: Request, res: Response) => {
    const loginDto: UserLoginDto = plainToClass(UserLoginDto, req.body, {
      enableImplicitConversion: false,
      groups: ['login'],
    });

    const errors = await validate(loginDto, DEFAULT_VALIDATION_OPTIONS);
    if (errors.length > 0) {
      return ErrorResponse(res, { message: 'Bad Request, Invalid Query Params Please refer documentation.' });
    }
    const { password, email } = loginDto;
    if (!password || !email) {
      return ErrorResponse(res, { message: 'Email and password are required' });
    }
    try {
      const { accessToken, refreshToken } = await authService.loginUser(loginDto);
      res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
      return SuccessResponse(res, accessToken, null, 200);
    } catch (e) {
      logger.error('Login User', {
        module: modules.auth,
        service: 'auth',
        data: e.message,
      });
      return ErrorResponseHandler(res, { message: e.message, name: e.name });
    }
  });

  route.post('/logout', async (req: Request, res: Response) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) ErrorResponseHandler(res, { message: 'No Content', name: 'NoContent' });
    const refreshToken = cookies.jwt;
    try {
      await authService.logoutUser(refreshToken);
      res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
      return ErrorResponseHandler(res, { message: 'No Content', name: 'NoContent' });
    } catch (e) {
      logger.error('Logout User', {
        module: modules.auth,
        service: 'auth',
        data: e.message,
      });
      return ErrorResponseHandler(res, { message: e.message, name: e.name });
    }
  });

  route.get('/refresh', async (req: Request, res: Response) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return ErrorResponseHandler(res, { message: 'Unauthorized', name: 'UnauthorizedError' });
    const refreshToken = cookies.jwt;

    try {
      const accessToken = await authService.handleRefreshToken(refreshToken);
      return SuccessResponse(res, accessToken, null, 200);
    } catch (e) {
      logger.error('Handle refresh token', {
        module: modules.auth,
        service: 'auth',
        data: e.message,
      });
      return ErrorResponseHandler(res, { message: e.message, name: e.name });
    }
  });
};

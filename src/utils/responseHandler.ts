import { Response } from 'express';
import { ErrorTypes } from './errorHandle/customErrors';
export const ErrorResponse = (res: Response, error: { message: string }, code = 400): Response => {
  return res.status(code).json({ success: false, data: { errorMessage: error.message }, error });
};
export const ErrorResponseHandler = (res: Response, error: { message: string; name: string }): Response => {
  if (error.name === ErrorTypes.NoDataFoundError) {
    return ErrorResponse(res, { message: error.message }, 404);
  }
  if (error.name === ErrorTypes.UnauthorizedError) {
    return ErrorResponse(res, { message: error.message }, 401);
  }
  if (error.name === ErrorTypes.ForbiddenError) {
    return ErrorResponse(res, { message: error.message }, 403);
  }
  if (error.name === ErrorTypes.CustomError) {
    return ErrorResponse(res, { message: error.message }, 400);
  } else {
    return ErrorResponse(res, { message: 'Internal server error' }, 500);
  }
};
export const SuccessResponse = (res: Response, data: any, message: string, code = 200): Response => {
  return res.status(code).json({ success: true, data, message });
};

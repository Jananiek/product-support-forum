import { ErrorResponseHandler } from '../utils/responseHandler.ts';
require('dotenv').config();

export const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return ErrorResponseHandler(res, { message: 'Not authorized', name: 'UnauthorizedError' });
    const rolesArray = [...allowedRoles];
    const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
    if (!result) return ErrorResponseHandler(res, { message: 'Not authorized', name: 'UnauthorizedError' });
    next();
  };
};

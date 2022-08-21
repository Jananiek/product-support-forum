import { ErrorResponseHandler } from '../utils/responseHandler.ts';
const jwt = require('jsonwebtoken');
require('dotenv').config();

export const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader.startsWith('Bearer ')) {
    return ErrorResponseHandler(res, { message: 'Not authorized', name: 'UnauthorizedError' });
  }
  const token = authHeader.split(' ')[1];
  const verify=jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err)
      //invalid token
      return ErrorResponseHandler(res, { message: 'Forbidden: Token is invalid', name: 'ForbiddenError' });
    req.user = decoded.userInfo.email;
    req.roles = decoded.userInfo.roles;
    next();
  });
};

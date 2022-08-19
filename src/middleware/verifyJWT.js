import { ErrorResponseHandler } from '../utils/responseHandler.ts';
const jwt = require('jsonwebtoken');
require('dotenv').config();

export const verifyJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log('authHeader', authHeader);
  if (!authHeader) {
    return ErrorResponseHandler(res, { message: 'Not authorized', name: 'UnauthorizedError' });
  }
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err)
      //invalid token
      return ErrorResponseHandler(res, { message: 'Forbidden: Token is invalid', name: 'ForbiddenError' });

    req.user = decoded.username;
    next();
  });
};

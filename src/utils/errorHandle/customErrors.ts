import AppError from './appError';
export enum ErrorTypes {
  NoDataFoundError = 'NoDataFoundError',
  UnauthorizedError = 'UnauthorizedError',
  ForbiddenError = 'ForbiddenError',
  InternalServerError = 'InternalServerError',
  CustomError = 'CustomError',
}
export class NoDataFoundError extends AppError {
  constructor(message: string) {
    super(message);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(message);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string) {
    super(message);
  }
}

export class CustomError extends AppError {
  constructor(message: string) {
    super(message);
  }
}

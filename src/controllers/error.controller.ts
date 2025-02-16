import { Request, Response } from 'express';
import AppConfig from '../config/app.config';

interface AppError extends Error {
  statusCode?: number;
  status?: string;
  isOperational?: boolean;
}

const sendErrorDev = (err: AppError, req: Request, res: Response) => {
  return res.status(err.statusCode || 500).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err: AppError, req: Request, res: Response) => {
  if (err.isOperational) {
    return res.status(err.statusCode || 500).json({
      status: err.status,
      message: err.message,
    });
  }

  console.error('ERROR 💥', err);
  return res.status(500).json({
    status: 'error',
    message: 'Something went wrong!',
  });
};

export default (err: AppError, req: Request, res: Response) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (AppConfig.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (AppConfig.NODE_ENV === 'production') {
    const error = { ...err };
    error.message = err.message;
    sendErrorProd(error, req, res);
  }
};

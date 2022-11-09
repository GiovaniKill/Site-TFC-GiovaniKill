import { NextFunction, Request, Response } from 'express';
import HTTPError from '../utils/HTTPError';

const errorHandler = (err: HTTPError, req: Request, res: Response, _next: NextFunction) => {
  if (err.status) return res.status(err.status).json({ message: err.message });
  return res.status(500).json({ message: err.message });
};

export default errorHandler;

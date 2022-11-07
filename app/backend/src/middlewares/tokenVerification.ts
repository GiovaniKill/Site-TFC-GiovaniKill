import { NextFunction, Request, Response } from 'express';
import TokenManager from '../utils/TokenManager';
import HTTPError from '../utils/HTTPError';

const tokenVerification = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) throw new HTTPError(401, 'Token must be a valid token');
  TokenManager.validate(authorization);
  next();
};

export default tokenVerification;

import { Application } from 'express';
import userRouter from './user.routes';

export default (app: Application) => {
  app.use('/login', userRouter);
};

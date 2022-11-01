import { Application } from 'express';
import teamsRouter from './teams.routes';
import usersRouter from './users.routes';

export default (app: Application) => {
  app.use('/login', usersRouter);
  app.use('/teams', teamsRouter);
};

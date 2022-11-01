import { Router } from 'express';
import UsersService from '../service/UsersService';
import UsersController from '../controller/UsersController';
import SequelizeUsers from '../repositories/Users.sequelize.repository';

const usersRouter = Router();
const repository = new SequelizeUsers();
const service = new UsersService(repository);
const controller = new UsersController(service);

usersRouter.post('/', controller.login);
usersRouter.get('/validate', controller.validate);

export default usersRouter;

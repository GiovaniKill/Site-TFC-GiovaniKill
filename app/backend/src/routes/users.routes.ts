import { Router } from 'express';
import UsersService from '../service/UsersService';
import UsersController from '../controller/UsersController';
import SequelizeUsers from '../repositories/Users.sequelize.repository';

const usersRouter = Router();
const usersRepository = new SequelizeUsers();
const service = new UsersService(usersRepository);
const controller = new UsersController(service);

usersRouter.post('/', (req, res) => controller.login(req, res));
usersRouter.get('/validate', (req, res) => UsersController.validate(req, res));

export default usersRouter;

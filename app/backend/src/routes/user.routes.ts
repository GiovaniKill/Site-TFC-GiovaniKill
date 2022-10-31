import { Router } from 'express';
import UserService from '../service/UserService';
import UsersController from '../controller/UsersController';
import SequelizeUsers from '../repositories/Users.sequelize.repository';

const userRouter = Router();
const repository = new SequelizeUsers();
const service = new UserService(repository);
const controller = new UsersController(service);

userRouter.post('/', controller.login);
userRouter.get('/validate', controller.validate);

export default userRouter;

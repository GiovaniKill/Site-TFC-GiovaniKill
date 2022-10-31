import { Request, Response } from 'express';
import HTTPError from '../utils/HTTPError';
import UserService from '../service/UserService';

export default class UsersController {
  private service: UserService;

  constructor(service: UserService) {
    this.service = service;
  }

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) throw new HTTPError(400, 'All fields must be filled');
    const token = await this.service.login(email, password);
    res.status(200).json({ token });
  };

  validate = (req: Request, res: Response) => {
    const { authorization } = req.headers;
    if (!authorization) throw new HTTPError(400, 'Invalid token');
    const role = this.service.validate(authorization);
    res.status(200).json({ role });
  };
}

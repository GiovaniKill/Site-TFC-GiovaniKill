import { Request, Response } from 'express';
import HTTPError from '../utils/HTTPError';
import UsersService from '../service/UsersService';

export default class UsersController {
  private service: UsersService;

  constructor(service: UsersService) {
    this.service = service;
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) throw new HTTPError(401, 'All fields must be filled');
    const token = await this.service.login(email, password);
    res.status(200).json({ token });
  }

  static validate(req: Request, res: Response) {
    const { authorization } = req.headers;
    if (!authorization) throw new HTTPError(400, 'Invalid token');
    const role = UsersService.validate(authorization);
    res.status(200).json({ role });
  }
}

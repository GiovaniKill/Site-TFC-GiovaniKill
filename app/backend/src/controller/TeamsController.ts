import { Request, Response } from 'express';
import HTTPError from '../utils/HTTPError';
import TeamService from '../service/TeamsService';

export default class TeamsController {
  private service: TeamService;

  constructor(service: TeamService) {
    this.service = service;
  }

  getAll = async (_req: Request, res: Response): Promise<void> => {
    const teams = await this.service.getAll();
    res.status(200).json(teams);
  };

  findById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    if (!id) throw new HTTPError(400, 'Invalid id');
    const team = await this.service.findById(+id);
    res.status(200).json(team);
  };
}

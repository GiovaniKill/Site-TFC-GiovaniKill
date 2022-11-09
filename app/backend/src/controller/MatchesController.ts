import { Request, Response } from 'express';
import MatchesService from '../service/MatchesService';

export default class MatchesController {
  private service: MatchesService;

  constructor(service: MatchesService) {
    this.service = service;
  }

  isFiltering(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (!inProgress) {
      this.getAll(req, res);
    } else {
      this.findByProgress(req, res);
    }
  }

  async getAll(_req: Request, res: Response) {
    const teams = await this.service.getAll();
    res.status(200).json(teams);
  }

  async findByProgress(req: Request, res: Response) {
    const { inProgress } = req.query;
    const teams = await this.service.findByProgress(inProgress === 'true');
    res.status(200).json(teams);
  }

  async create(req: Request, res: Response) {
    const { body } = req;
    const match = await this.service.create(body);
    res.status(201).json(match);
  }

  async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    await this.service.finishMatch(+id);
    res.status(200).json({ message: 'Finished' });
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;
    await this.service.update(+id, body);
    res.status(200).json({ message: 'Updated succesfully' });
  }
}

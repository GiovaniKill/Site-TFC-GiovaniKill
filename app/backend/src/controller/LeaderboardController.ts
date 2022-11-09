import { Request, Response } from 'express';
import LeaderboardService from '../service/LeaderboardService';

export default class LeaderboardController {
  service: LeaderboardService;

  constructor(service: LeaderboardService) {
    this.service = service;
  }

  async getHomeLeaderboard(_req: Request, res: Response) {
    const leaderboard = await this.service.getLeaderboard('teamHome');
    res.status(200).json(leaderboard);
  }

  async getAwayLeaderboard(_req: Request, res: Response) {
    const leaderboard = await this.service.getLeaderboard('teamAway');
    res.status(200).json(leaderboard);
  }

  async getGeneralLeaderboard(_req: Request, res: Response) {
    const leaderboard = await this.service.getLeaderboard('general');
    res.status(200).json(leaderboard);
  }
}

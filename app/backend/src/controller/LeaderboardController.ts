import { Request, Response } from 'express';
import LeaderboardService from '../service/LeaderboardService';

export default class LeaderboardController {
  service: LeaderboardService;

  constructor(service: LeaderboardService) {
    this.service = service;
  }

  getHomeLeaderboard = async (_req: Request, res: Response) => {
    const leaderboard = await this.service.getLeaderboard('teamHome');
    res.status(200).json(leaderboard);
  };

  getAwayLeaderboard = async (_req: Request, res: Response) => {
    const leaderboard = await this.service.getLeaderboard('teamAway');
    res.status(200).json(leaderboard);
  };

  getGeneralLeaderboard = async (_req: Request, res: Response) => {
    const leaderboard = await this.service.getLeaderboard('general');
    res.status(200).json(leaderboard);
  };
}

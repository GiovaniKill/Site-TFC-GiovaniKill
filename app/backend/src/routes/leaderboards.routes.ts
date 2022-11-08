import { Router } from 'express';
import LeaderboardService from '../service/LeaderboardService';
import LeaderboardController from '../controller/LeaderboardController';
import SequelizeMatches from '../repositories/Matches.sequelize.repository';
import SequelizeTeams from '../repositories/Teams.sequelize.repository';

const teamsRepository = new SequelizeTeams();
const matchesRepository = new SequelizeMatches();
const leaderboardService = new LeaderboardService(matchesRepository, teamsRepository);
const leaderboardController = new LeaderboardController(leaderboardService);

const leaderboardRouter = Router();

leaderboardRouter.get('/home', leaderboardController.getHomeLeaderboard);
leaderboardRouter.get('/away', leaderboardController.getAwayLeaderboard);
leaderboardRouter.get('/', leaderboardController.getGeneralLeaderboard);

export default leaderboardRouter;

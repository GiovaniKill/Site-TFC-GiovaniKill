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

leaderboardRouter.get('/home', (req, res) => leaderboardController.getHomeLeaderboard(req, res));
leaderboardRouter.get('/away', (req, res) => leaderboardController.getAwayLeaderboard(req, res));
leaderboardRouter.get('/', (req, res) => leaderboardController.getGeneralLeaderboard(req, res));

export default leaderboardRouter;

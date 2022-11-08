import { Router } from 'express';
import TeamService from '../service/TeamsService';
import TeamsController from '../controller/TeamsController';
import SequelizeTeams from '../repositories/Teams.sequelize.repository';

const teamsRouter = Router();
const teamsRepository = new SequelizeTeams();
const teamsService = new TeamService(teamsRepository);
const teamsController = new TeamsController(teamsService);

teamsRouter.get('/', teamsController.getAll);
teamsRouter.get('/:id', teamsController.findById);

export default teamsRouter;

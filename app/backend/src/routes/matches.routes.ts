import { Router } from 'express';
import MatchesService from '../service/MatchesService';
import MatchesController from '../controller/MatchesController';
import SequelizeMatches from '../repositories/Matches.sequelize.repository';
import tokenVerification from '../middlewares/tokenVerification';

const matchesRepository = new SequelizeMatches();
const matchesService = new MatchesService(matchesRepository);
const matchesController = new MatchesController(matchesService);

const matchesRouter = Router();

matchesRouter.get('/', matchesController.isFiltering);
matchesRouter.post('/', tokenVerification, matchesController.create);
matchesRouter.patch('/:id/finish', matchesController.finishMatch);
matchesRouter.patch('/:id', matchesController.update);

export default matchesRouter;

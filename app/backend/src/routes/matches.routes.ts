import { Router } from 'express';
import MatchesService from '../service/MatchesService';
import MatchesController from '../controller/MatchesController';
import SequelizeMatches from '../repositories/Matches.sequelize.repository';
import tokenVerification from '../middlewares/tokenVerification';

const matchesRepository = new SequelizeMatches();
const matchesService = new MatchesService(matchesRepository);
const matchesController = new MatchesController(matchesService);

const matchesRouter = Router();

matchesRouter.get('/', (req, res) => matchesController.isFiltering(req, res));
matchesRouter.post('/', tokenVerification, (req, res) => matchesController.create(req, res));
matchesRouter.patch('/:id/finish', (req, res) => matchesController.finishMatch(req, res));
matchesRouter.patch('/:id', (req, res) => matchesController.update(req, res));

export default matchesRouter;

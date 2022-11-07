import { Error } from 'sequelize';
import MatchesModel from '../database/models/MatchesModel';
import IMatchesRepository from './IMatches.repository';
import TeamsModel from '../database/models/TeamsModel';
import IMatch from '../entities/IMatch';
import ICreateMatchBody from '../entities/ICreateMatchBody';
import HTTPError from '../utils/HTTPError';
import IUpdateMatchBody from '../entities/IUpdateMatchBody';

export default class SequelizeMatches implements IMatchesRepository {
  model = MatchesModel;

  getAll = async (): Promise<IMatch[]> => {
    const teams = await this.model.findAll({ include: [
      { model: TeamsModel, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: TeamsModel, as: 'teamAway', attributes: { exclude: ['id'] } },
    ] });
    return teams;
  };

  findByProgress = async (inProgress: boolean): Promise<IMatch[] | null> => {
    const teams = await this.model.findAll({
      where: { inProgress },
      include: [
        { model: TeamsModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: TeamsModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    if (!teams) return null;
    return teams;
  };

  create = async (newMatch: ICreateMatchBody): Promise<IMatch | void> => {
    try {
      const sequelizeMatch = await this.model.create({ ...newMatch, inProgress: true });
      const match: IMatch = {
        id: sequelizeMatch.id,
        homeTeam: sequelizeMatch.homeTeam,
        homeTeamGoals: sequelizeMatch.homeTeamGoals,
        awayTeam: sequelizeMatch.awayTeam,
        awayTeamGoals: sequelizeMatch.awayTeamGoals,
        inProgress: true,
      };
      return match;
    } catch (error) {
      if (error instanceof Error && error.name === 'SequelizeForeignKeyConstraintError') {
        throw new HTTPError(404, 'There is no team with such id!');
      }
    }
  };

  finishMatch = async (id: number): Promise<void> => {
    await this.model.update({ inProgress: false }, { where: { id } });
  };

  update = async (id: number, score: IUpdateMatchBody): Promise<void> => {
    await this.model.update({ ...score }, { where: { id } });
  };
}

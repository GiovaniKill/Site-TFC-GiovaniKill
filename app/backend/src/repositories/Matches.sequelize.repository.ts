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

  async getAll(): Promise<IMatch[]> {
    const teams = await this.model.findAll({ include: [
      { model: TeamsModel, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: TeamsModel, as: 'teamAway', attributes: { exclude: ['id'] } },
    ] }) as unknown;
    return teams as IMatch[];
  }

  async findByProgress(inProgress: boolean): Promise<IMatch[]> {
    const teams = await this.model.findAll({
      where: { inProgress },
      include: [
        { model: TeamsModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: TeamsModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    }) as unknown;
    return teams as IMatch[];
  }

  async create(newMatch: ICreateMatchBody): Promise<IMatch | void> {
    try {
      const sequelizeMatch = await this.model.create({ ...newMatch, inProgress: true }) as unknown;
      const match: IMatch = sequelizeMatch as IMatch;
      return match;
    } catch (error) {
      if (error instanceof Error && error.name === 'SequelizeForeignKeyConstraintError') {
        throw new HTTPError(404, 'There is no team with such id!');
      }
    }
  }

  async finishMatch(id: number): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  async update(id: number, score: IUpdateMatchBody): Promise<void> {
    await this.model.update({ ...score }, { where: { id } });
  }
}

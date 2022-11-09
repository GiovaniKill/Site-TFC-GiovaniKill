import ITeam from '../entities/ITeam';
import TeamsModel from '../database/models/TeamsModel';
import ITeamsRepository from './ITeams.repository';

export default class SequelizeTeams implements ITeamsRepository {
  model = TeamsModel;

  public async getAll(): Promise<ITeam[]> {
    return this.model.findAll();
  }

  findById = async (id: number): Promise<ITeam | null> => {
    const sequelizeTeam = await this.model.findOne({ where: { id } });

    if (!sequelizeTeam) return null;

    const team: ITeam = {
      id: sequelizeTeam.id,
      teamName: sequelizeTeam.teamName,
    };

    return team;
  };
}

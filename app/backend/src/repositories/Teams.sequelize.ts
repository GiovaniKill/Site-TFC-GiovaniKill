import ITeam from '../entities/ITeam';
import TeamsModel from '../database/models/TeamsModel';
import ITeamRepository from './ITeams.repository';

export default class SequelizeTeams implements ITeamRepository {
  model = TeamsModel;

  getAll = async (): Promise<ITeam[]> => this.model.findAll();

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

import HTTPError from '../utils/HTTPError';
import ITeamRepository from '../repositories/ITeams.repository';
import Iteam from '../entities/ITeam';

export default class TeamService {
  repository: ITeamRepository;

  constructor(repository: ITeamRepository) {
    this.repository = repository;
  }

  getAll = (): Promise<Iteam[]> => this.repository.getAll();

  findById = async (id: number): Promise<Iteam> => {
    const team = await this.repository.findById(id);
    if (!team) throw new HTTPError(401, 'Team does not exist');
    return team;
  };
}

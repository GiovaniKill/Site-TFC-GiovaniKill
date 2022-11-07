import HTTPError from '../utils/HTTPError';
import ITeamsRepository from '../repositories/ITeams.repository';
import Iteam from '../entities/ITeam';

export default class TeamService {
  private repository: ITeamsRepository;

  constructor(repository: ITeamsRepository) {
    this.repository = repository;
  }

  getAll = (): Promise<Iteam[]> => this.repository.getAll();

  findById = async (id: number): Promise<Iteam> => {
    const team = await this.repository.findById(id);
    if (!team) throw new HTTPError(404, 'Team does not exist');
    return team;
  };
}

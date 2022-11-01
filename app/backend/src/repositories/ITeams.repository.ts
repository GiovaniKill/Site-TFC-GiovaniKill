import ITeam from '../entities/ITeam';

export default interface ITeamRepository {
  getAll(): Promise<ITeam[]>,
  findById(id: number): Promise<ITeam | null>
}

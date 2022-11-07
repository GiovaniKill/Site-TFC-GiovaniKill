import ITeam from '../entities/ITeam';

export default interface ITeamsRepository {
  getAll(): Promise<ITeam[]>,
  findById(id: number): Promise<ITeam | null>
}

import IUpdateMatchBody from '../entities/IUpdateMatchBody';
import ICreateMatchBody from '../entities/ICreateMatchBody';
import IMatch from '../entities/IMatch';

export default interface IMatchesRepository {
  getAll(): Promise<IMatch[]>,
  findByProgress(inProgress: boolean): Promise<IMatch[]>,
  create(newMatch: ICreateMatchBody): Promise<IMatch | void>,
  finishMatch(id: number): Promise<void>,
  update(id: number, score: IUpdateMatchBody): Promise<void>
}

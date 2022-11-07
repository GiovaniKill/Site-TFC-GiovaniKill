import IMatchesRepository from '../repositories/IMatches.repository';
import IMatch from '../entities/IMatch';
import HTTPError from '../utils/HTTPError';
import IUpdateMatchBody from '../entities/IUpdateMatchBody';

export default class MatchesService {
  private repository: IMatchesRepository;

  constructor(model: IMatchesRepository) {
    this.repository = model;
  }

  getAll = async (): Promise<IMatch[]> => this.repository.getAll();

  findByProgress = async (inProgress: boolean): Promise<IMatch[]> => {
    const teams = await this.repository.findByProgress(inProgress);
    if (!teams) throw new HTTPError(404, 'No match found with the defined parameters');
    return teams;
  };

  create = async (newMatch: IMatch): Promise<IMatch | void> => {
    if (newMatch.homeTeam === newMatch.awayTeam) {
      throw new HTTPError(422, 'It is not possible to create a match with two equal teams');
    }
    const match = await this.repository.create(newMatch);
    return match;
  };

  finishMatch = async (id: number): Promise<void> => {
    await this.repository.finishMatch(id);
  };

  update = async (id: number, score: IUpdateMatchBody): Promise<void> => {
    await this.repository.update(id, score);
  };
}

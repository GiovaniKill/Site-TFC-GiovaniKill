import IMatchesRepository from '../repositories/IMatches.repository';
import IMatch from '../entities/IMatch';
import HTTPError from '../utils/HTTPError';
import IUpdateMatchBody from '../entities/IUpdateMatchBody';

export default class MatchesService {
  private repository: IMatchesRepository;

  constructor(model: IMatchesRepository) {
    this.repository = model;
  }

  async getAll(): Promise<IMatch[]> {
    return this.repository.getAll();
  }

  async findByProgress(inProgress: boolean): Promise<IMatch[]> {
    const teams = await this.repository.findByProgress(inProgress);
    if (!teams) throw new HTTPError(404, 'No match found with the defined parameters');
    return teams;
  }

  async create(newMatch: IMatch): Promise<IMatch | void> {
    if (newMatch.homeTeam === newMatch.awayTeam) {
      throw new HTTPError(422, 'It is not possible to create a match with two equal teams');
    }
    const match = await this.repository.create(newMatch);
    return match;
  }

  async finishMatch(id: number): Promise<void> {
    await this.repository.finishMatch(id);
  }

  async update(id: number, score: IUpdateMatchBody): Promise<void> {
    await this.repository.update(id, score);
  }
}

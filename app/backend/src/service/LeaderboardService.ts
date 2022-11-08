import IMatch from '../entities/IMatch';
import ITeamRank from '../entities/ITeamRank';
import IMatchesRepository from '../repositories/IMatches.repository';
import ITeamsRepository from '../repositories/ITeams.repository';

export default class LeaderboardService {
  private matchesRepository: IMatchesRepository;
  private teamsRepository: ITeamsRepository;
  private leaderboard: ITeamRank[];

  constructor(matchesRepository: IMatchesRepository, teamsRepository: ITeamsRepository) {
    this.matchesRepository = matchesRepository;
    this.teamsRepository = teamsRepository;
  }

  private createDefaultLeaderboard = async (): Promise<ITeamRank[]> => {
    const teams = await this.teamsRepository.getAll();
    const defaultLeaderboard = teams.map((curr) => (
      {
        name: curr.teamName,
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
        goalsBalance: 0,
        efficiency: 0,
      }
    ));
    return defaultLeaderboard;
  };

  private getMatchPoints = (match: IMatch, team: 'teamAway' | 'teamHome'): number => {
    if (team === 'teamAway') {
      if (match.awayTeamGoals > match.homeTeamGoals) {
        return 3;
      }
      if (match.awayTeamGoals < match.homeTeamGoals) {
        return 0;
      }
      return 1;
    }
    if (match.homeTeamGoals > match.awayTeamGoals) {
      return 3;
    }
    if (match.homeTeamGoals < match.awayTeamGoals) {
      return 0;
    }
    return 1;
  };

  // Essa função recebe opcionalmente um array de critérios de desempate em ordem, permitindo que eles sejam facilmente alterados
  private rankTeams = (
    a: ITeamRank,
    b: ITeamRank,
    tieBrakers: Array<'totalPoints' | 'totalGames' | 'totalVictories' | 'totalDraws' |
    'totalLosses' | 'goalsFavor' | 'goalsOwn' | 'goalsBalance' | 'efficiency'> = [
      'totalPoints', 'totalVictories', 'goalsBalance', 'goalsFavor', 'goalsOwn',
    ],
  ): 1 | -1 | 0 => {
    for (let i = 0; i <= tieBrakers.length; i += 1) {
      if (a[tieBrakers[i]] - b[tieBrakers[i]] > 0) {
        if (tieBrakers[i] === 'goalsOwn') return 1;
        return -1;
      }
      if (a[tieBrakers[i]] - b[tieBrakers[i]] < 0) {
        if (tieBrakers[i] === 'goalsOwn') return -1;
        return 1;
      }
    }
    return 0;
  };

  calcHomePoints = (match: IMatch) => {
    const homePoints = this.getMatchPoints(match, 'teamHome');
    const homeIndex = this.leaderboard.findIndex((curr) => curr.name === match.teamHome.teamName);
    const { homeTeamGoals, awayTeamGoals } = match;
    this.leaderboard[homeIndex].totalPoints += homePoints;
    this.leaderboard[homeIndex].totalGames += 1;
    this.leaderboard[homeIndex].totalVictories += homePoints === 3 ? 1 : 0;
    this.leaderboard[homeIndex].totalDraws += homePoints === 1 ? 1 : 0;
    this.leaderboard[homeIndex].totalLosses += homePoints === 0 ? 1 : 0;
    this.leaderboard[homeIndex].goalsFavor += homeTeamGoals;
    this.leaderboard[homeIndex].goalsOwn += awayTeamGoals;
    const { totalPoints, totalGames, goalsFavor, goalsOwn } = this.leaderboard[homeIndex];
    this.leaderboard[homeIndex].goalsBalance = goalsFavor - goalsOwn;
    this.leaderboard[homeIndex].efficiency = +((totalPoints / (totalGames * 3)) * 100).toFixed(2);
  };

  calcAwayPoints = (match: IMatch) => {
    const awayPoints = this.getMatchPoints(match, 'teamAway');
    const awayIndex = this.leaderboard.findIndex((curr) => curr.name === match.teamAway.teamName);
    const { awayTeamGoals, homeTeamGoals } = match;
    this.leaderboard[awayIndex].totalPoints += awayPoints;
    this.leaderboard[awayIndex].totalGames += 1;
    this.leaderboard[awayIndex].totalVictories += awayPoints === 3 ? 1 : 0;
    this.leaderboard[awayIndex].totalDraws += awayPoints === 1 ? 1 : 0;
    this.leaderboard[awayIndex].totalLosses += awayPoints === 0 ? 1 : 0;
    this.leaderboard[awayIndex].goalsFavor += awayTeamGoals;
    this.leaderboard[awayIndex].goalsOwn += homeTeamGoals;
    const { totalPoints, totalGames, goalsFavor, goalsOwn } = this.leaderboard[awayIndex];
    this.leaderboard[awayIndex].goalsBalance = goalsFavor - goalsOwn;
    this.leaderboard[awayIndex].efficiency = +((totalPoints / (totalGames * 3)) * 100).toFixed(2);
  };

  getLeaderboard = async (team: 'teamAway' | 'teamHome' | 'general'): Promise<ITeamRank[]> => {
    this.leaderboard = await this.createDefaultLeaderboard();
    const matches = await this.matchesRepository.findByProgress(false);
    matches.forEach((match) => {
      if (team === 'teamAway') {
        this.calcAwayPoints(match);
        return;
      }
      if (team === 'teamHome') {
        this.calcHomePoints(match);
        return;
      }
      this.calcAwayPoints(match);
      this.calcHomePoints(match);
    });
    return this.leaderboard.sort((a, b) => this.rankTeams(a, b));
  };
}

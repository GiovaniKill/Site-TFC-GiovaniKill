import IMatch from '../entities/IMatch';
import ITeamRank from '../entities/ITeamRank';
import IMatchesRepository from '../repositories/IMatches.repository';
import ITeamsRepository from '../repositories/ITeams.repository';

export default class LeaderboardService {
  private matchesRepository: IMatchesRepository;
  private teamsRepository: ITeamsRepository;

  constructor(matchesRepository: IMatchesRepository, teamsRepository: ITeamsRepository) {
    this.matchesRepository = matchesRepository;
    this.teamsRepository = teamsRepository;
  }

  private async createDefaultLeaderboard(): Promise<ITeamRank[]> {
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
  }

  private static getMatchPoints(match: IMatch, team: 'teamAway' | 'teamHome'): number {
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
  }

  // Essa função recebe opcionalmente um array de critérios de desempate em ordem, permitindo que eles sejam facilmente alterados
  private static rankTeams(
    a: ITeamRank,
    b: ITeamRank,
    tieBrakers: Array<'totalPoints' | 'totalGames' | 'totalVictories' | 'totalDraws' |
    'totalLosses' | 'goalsFavor' | 'goalsOwn' | 'goalsBalance' | 'efficiency'> = [
      'totalPoints', 'totalVictories', 'goalsBalance', 'goalsFavor', 'goalsOwn',
    ],
  ): 1 | -1 | 0 {
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
  }

  private static calcHomePoints(match: IMatch, preLeaderboard: ITeamRank[]) {
    const leaderboard = [...preLeaderboard];
    const homePoints = LeaderboardService.getMatchPoints(match, 'teamHome');
    const homeIndex = leaderboard.findIndex((curr) => curr.name === match.teamHome.teamName);
    const { homeTeamGoals, awayTeamGoals } = match;
    leaderboard[homeIndex].totalPoints += homePoints;
    leaderboard[homeIndex].totalGames += 1;
    leaderboard[homeIndex].totalVictories += homePoints === 3 ? 1 : 0;
    leaderboard[homeIndex].totalDraws += homePoints === 1 ? 1 : 0;
    leaderboard[homeIndex].totalLosses += homePoints === 0 ? 1 : 0;
    leaderboard[homeIndex].goalsFavor += homeTeamGoals;
    leaderboard[homeIndex].goalsOwn += awayTeamGoals;
    const { totalPoints, totalGames, goalsFavor, goalsOwn } = leaderboard[homeIndex];
    leaderboard[homeIndex].goalsBalance = goalsFavor - goalsOwn;
    leaderboard[homeIndex].efficiency = +((totalPoints / (totalGames * 3)) * 100).toFixed(2);
    return leaderboard;
  }

  private static calcAwayPoints(match: IMatch, preLeaderboard: ITeamRank[]) {
    const leaderboard = [...preLeaderboard];
    const awayPoints = LeaderboardService.getMatchPoints(match, 'teamAway');
    const awayIndex = leaderboard.findIndex((curr) => curr.name === match.teamAway.teamName);
    const { awayTeamGoals, homeTeamGoals } = match;
    leaderboard[awayIndex].totalPoints += awayPoints;
    leaderboard[awayIndex].totalGames += 1;
    leaderboard[awayIndex].totalVictories += awayPoints === 3 ? 1 : 0;
    leaderboard[awayIndex].totalDraws += awayPoints === 1 ? 1 : 0;
    leaderboard[awayIndex].totalLosses += awayPoints === 0 ? 1 : 0;
    leaderboard[awayIndex].goalsFavor += awayTeamGoals;
    leaderboard[awayIndex].goalsOwn += homeTeamGoals;
    const { totalPoints, totalGames, goalsFavor, goalsOwn } = leaderboard[awayIndex];
    leaderboard[awayIndex].goalsBalance = goalsFavor - goalsOwn;
    leaderboard[awayIndex].efficiency = +((totalPoints / (totalGames * 3)) * 100).toFixed(2);
    return leaderboard;
  }

  async getLeaderboard(team: 'teamAway' | 'teamHome' | 'general'): Promise<ITeamRank[]> {
    let leaderboard = await this.createDefaultLeaderboard();
    const matches = await this.matchesRepository.findByProgress(false);
    if (team === 'teamAway') {
      matches.forEach((match) => {
        leaderboard = LeaderboardService.calcAwayPoints(match, leaderboard);
      });
    } else if (team === 'teamHome') {
      matches.forEach((match) => {
        leaderboard = LeaderboardService.calcHomePoints(match, leaderboard);
      });
    } else {
      matches.forEach((match) => {
        leaderboard = LeaderboardService.calcHomePoints(match, leaderboard);
        leaderboard = LeaderboardService.calcAwayPoints(match, leaderboard);
      });
    }

    return leaderboard.sort((a, b) => LeaderboardService.rankTeams(a, b));
  }
}

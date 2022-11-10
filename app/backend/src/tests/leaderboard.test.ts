import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';                                                                   

import SequelizeMatches from '../repositories/Matches.sequelize.repository';
import SequelizeTeams from '../repositories/Teams.sequelize.repository';

import mocks from './mocks';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /leaderboard', () => {
  afterEach(()=>{
    sinon.restore();
  })

  it('Retorna a tabela geral correta ', async () => {
    sinon.stub(SequelizeMatches.prototype, 'findByProgress').resolves([mocks.IMatchMock]);
    sinon.stub(SequelizeTeams.prototype, 'getAll').resolves([mocks.ITeamMock.ITeamMockCor, mocks.ITeamMock.ITeamMockFla]);
    const response = await chai.request(app).get('/leaderboard');
    expect(response.body).to.deep.equal([mocks.ITeamRankMock.ITeamRankFla, mocks.ITeamRankMock.ITeamRankCor]);
  });

  it('Retorna a tabela away correta ', async () => {
    sinon.stub(SequelizeMatches.prototype, 'findByProgress').resolves([mocks.IMatchMock]);
    sinon.stub(SequelizeTeams.prototype, 'getAll').resolves([mocks.ITeamMock.ITeamMockCor, mocks.ITeamMock.ITeamMockFla]);
    const response = await chai.request(app).get('/leaderboard/away');
    expect(response.body).to.deep.equal([mocks.ITeamRankMock.ITeamRankFla, mocks.ITeamRankMock.ITeamRankCorZeroed]);
  });

  it('Retorna a tabela home correta ', async () => {
    sinon.stub(SequelizeMatches.prototype, 'findByProgress').resolves([mocks.IMatchMock]);
    sinon.stub(SequelizeTeams.prototype, 'getAll').resolves([mocks.ITeamMock.ITeamMockCor, mocks.ITeamMock.ITeamMockFla]);
    const response = await chai.request(app).get('/leaderboard/home');
    expect(response.body).to.deep.equal([mocks.ITeamRankMock.ITeamRankFlaZeroed, mocks.ITeamRankMock.ITeamRankCor]);
  });
});

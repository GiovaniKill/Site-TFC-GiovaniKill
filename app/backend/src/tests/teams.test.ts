import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeTeams from '../repositories/Teams.sequelize.repository';
import TeamsModel from '../database/models/TeamsModel';

import mocks from './mocks';

import { Response } from 'superagent';
import Iteam from '../entities/ITeam';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /teams', () => {
  afterEach(()=>{
    sinon.restore();
  })

  it('Retorna o array de times corretamente', async () => {
    sinon.stub(SequelizeTeams.prototype, 'getAll')
    .resolves([mocks.ITeamMock.ITeamMockCor, mocks.ITeamMock.ITeamMockFla] as Iteam[]);
    const response = await chai.request(app).get('/teams');
    expect(response.body).to.deep.equal([mocks.ITeamMock.ITeamMockCor, mocks.ITeamMock.ITeamMockFla]);
  });
});

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
    beforeEach(()=>{
        sinon.stub(SequelizeTeams.prototype, 'getAll').resolves(mocks.ITeamMock as Iteam[]);
    })

  afterEach(()=>{
    sinon.restore();
  })

  it('Retorna o token ao realizar o login corretamente', async () => {
    const response = await chai.request(app).get('/teams');
    expect(response.body).to.deep.equal(mocks.ITeamMock);
  });
});

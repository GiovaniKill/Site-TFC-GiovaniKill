import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';                                                                   

import SequelizeMatches from '../repositories/Matches.sequelize.repository';

import * as jwt from 'jsonwebtoken';

import mocks from './mocks';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /matches', () => {
  afterEach(()=>{
    sinon.restore();
  })

  it('Retorna o token ao realizar o login corretamente', async () => {
    sinon.stub(SequelizeMatches.prototype, 'getAll').resolves([mocks.IMatchMock]);
    const response = await chai.request(app).get('/matches');
    expect(response.body).to.deep.equal([mocks.IMatchMock]);
  });

  it('Não permite criar uma nova partida sem um token válido', async () => {
    sinon.stub(SequelizeMatches.prototype, 'create').resolves(mocks.IMatchMock);
    const response = await chai.request(app).post('/matches').send(mocks.ICreateMatchBody);
    expect(response.body).to.deep.equal({message: 'Token must be a valid token'});
  });

  it('Permite criar uma partida', async () => {
    sinon.stub(SequelizeMatches.prototype, 'create').resolves(mocks.IMatchMock);
    sinon.stub(jwt, 'verify').resolves(mocks.IUserMock);
    const response = await chai.request(app).post('/matches')
    .set('Authorization', 'mock')
    .send(mocks.ICreateMatchBody);
    expect(response.body).to.deep.equal(mocks.IMatchMock);
  });

  it('Permite finalizar uma partida', async () => {
    sinon.stub(SequelizeMatches.prototype, 'finishMatch').resolves();
    const response = await chai.request(app).patch('/matches/1/finish');
    expect(response.body).to.deep.equal({message: 'Finished'});
  });

  it('Permite atualizar uma partida', async () => {
    sinon.stub(SequelizeMatches.prototype, 'update').resolves();
    const response = await chai.request(app).patch('/matches/1');
    expect(response.body).to.deep.equal({message: 'Updated succesfully'});
  });

});

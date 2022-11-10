import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';                                                                   

import SequelizeUsers from '../repositories/Users.sequelize.repository';

import mocks from './mocks';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /login', () => {
  afterEach(()=>{
    sinon.restore();
  })

  it('Retorna o token ao realizar o login corretamente', async () => {
    sinon.stub(SequelizeUsers.prototype, 'findByEmail').resolves(mocks.IUserMock);
    const response = await chai.request(app).post('/login')
    .send({ email: 'admin@admin.com', password: 'secret_admin'});
    expect(typeof response.body.token).to.be.equal('string');
  });
});

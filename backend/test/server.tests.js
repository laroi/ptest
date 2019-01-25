'use strict';

const app = require('../server'),
    chai = require('chai'),
    supertest = require('supertest'),
    request = supertest(app),
    agent = supertest.agent(app),
    expect = chai.expect;

describe('API integration tests', ()=> {
    it('Should greet you', (done) => {
        agent.get('/')
        .end((err, res)=> {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.deep.include({msg: 'Welcome to Turing'});
            done();
        })
    })
})

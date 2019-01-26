'use strict';

const app = require('../server');
const chai = require('chai');
const supertest = require('supertest');
const request = supertest(app);
const agent = supertest.agent(app);
const expect = chai.expect;

describe('API integration tests', () => {
    it('Should greet you', (done) => {
        agent.get('/')
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.deep.include({ msg: 'Welcome to Turing' });
                done();
            });
    });
});

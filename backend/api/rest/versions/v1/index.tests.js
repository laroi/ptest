'use strict';

const app = require('../../../../server');
const chai = require('chai');
const supertest = require('supertest');
const request = supertest(app);
const agent = supertest.agent(app);
const expect = chai.expect;

describe('API integration tests', () => {
    it('List Questions', (done) => {
        agent.get('/api/v1/questions')
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.an('array');
                expect(res.body).to.not.to.be.empty;
                done();
            });
    });
});

'use strict';
let host = 'localhost';
let port = '27017';
let database = 'ptear';
const app = require('../server')(`mongodb://${host}:${port}`, database);
const chai = require('chai');
const supertest = require('supertest');
const request = supertest(app);
const agent = supertest.agent(app);
const expect = chai.expect;
const fetch = require('jest-fetch-mock');
let script = require('../scripts/insertQuestions/insertQuestions.js');
let qId;
describe('API integration tests', () => {
    afterAll(function (done) {
        app.db.dropDatabase(function (err) {
            if (err) {
                return done(err);
            }
            done();
        });
    });
    it('Inserts questions in database', async function () {
        try {
            const data = await script(`mongodb://${host}:${port}`, database);
            expect(data).to.equal(25);
        }
        catch (e) {
            console.log('error', e);
        }
    });
    it('List Questions', (done) => {
        agent.get('/api/v1/questions')
            .end((err, res) => {
                if (err) {
                    console.error(err);
                }
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.an('array');
                expect(res.body).to.not.to.be.empty;
                qId = res.body[0]._id;
                done();
            });
    });
    it('posts answer', (done) => {
        let postObject = { answers: { } };
        postObject.answers[qId] = { 'level1': 'yes' };
        agent.post('/api/v1/answers')
            .send(postObject)
            .end((err, res) => {
                if (err) {
                    console.error(err);
                }
                expect(res.statusCode).to.equal(201);
                expect(res.body).to.have.property('_id');
                done();
            });
    });
    it('should return bad request on posting answer', (done) => {
        agent.post('/api/v1/answers')
            .send({})
            .end((err, res) => {
                if (err) {
                    console.error(err);
                }
                expect(res.statusCode).to.equal(400);
                done();
            });
    });
    it('should return Internal Server Error on posting answe', async () => {
        fetch.mockReject(new Error('An unexpected error occurred. Please try again later'));
        try {
            await agent.post('/api/v1/answers', { data: {} }); // using jest with testContext
        } catch (error) {
            expect(error.message).toBe('An unexpected error occurred. Please try again later');
        }
    });
    it('List Answers', (done) => {
        agent.get('/api/v1/answers')
            .end((err, res) => {
                if (err) {
                    console.error(err);
                }
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.an('array');
                expect(res.body).to.not.to.be.empty;
                done();
            });
    });
});

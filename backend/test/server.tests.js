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
let script = require('../scripts/insertQuestions/insertQuestions.js');
let qId;
describe('API integration tests', () => {
    after(function (done) {
        app.db.dropDatabase(function (err) {
            if (err) {
                return done(err);
            }
            done();
        });
    });
    it('Should greet you', (done) => {
        agent.get('/')
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.deep.include({ msg: 'Welcome to Turing' });
                done();
            });
    });
    it('Inserts questions in database', async function () {
        try {
            const data = await script(`mongodb://${host}:${port}`, database);
            expect(data).to.equal(25);
        }
        catch (e) {
            console.log('error', e)
        }
    });
    it('List Questions', (done) => {
        agent.get('/api/v1/questions')
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.an('array');
                expect(res.body).to.not.to.be.empty;
                qId = res.body[0]._id;
                console.log(qId);
                done();
            });
    });
    it('posts answer', (done) => {
        let postObject = { answers: { } };
        postObject.answers[qId] = { 'level1': 'yes' };
        agent.post('/api/v1/answers')
            .send(postObject)
            .end((err, res) => {
                expect(res.statusCode).to.equal(201);
                expect(res.body).to.have.property('_id');
                done();
            });
    });
});

'use strict';

let app = require('../server'),
    chai = require('chai'),
    request = require('supertest'),
    expect = chai.expect;

describe('API integration tests', ()=> {
    it('Should greet you', (done) => {
        request(app).get('/')
        .end((err, res)=> {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.deep.include({msg: 'Welcome to Turing'});
            done();
        })
    })
})

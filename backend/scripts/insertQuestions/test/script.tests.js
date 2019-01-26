let expect = require('chai').expect;
let script = require('../insertQuestions.js');

describe('main', function () {
    it('Inserts questions in database', function (done) {
        script()
            .then((data) => {
                expect(data).to.equal(25);
                done();
            });
    });
});

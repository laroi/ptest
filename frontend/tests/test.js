 requirejs.config({
      baseUrl: '.',
      paths: {
        'chai':  './chai',
        'mocha': './mocha'
      }
});
requirejs(['../scripts/collections/questionCollection', '../scripts/collections/answerCollection', '../scripts/models/answer', '../scripts/models/question'], (questionsCollection, answerCollection, answerModel, questionModel)=> {
    let spy = sinon.spy;
    let stub = sinon.stub;
    mocha.setup('bdd');

    describe('It should return question with id from array of questions', function () {
        it('It should return question with id from array of questions', function () {
            chai.expect(questionsCollection.getQuestionById('1', [{"_id":'1', 'testObj':'test'}, {_id:'5', 'testObj':'test'}])).to.deep.equal({"_id":'1', 'testObj':'test'})
        });
        it('It should return question Object', function () {
            chai.expect(new questionModel({_id: '1', category: 'test', question_type: {type: 'hard_fact'}})).to.deep.equal({_id: '1', category: 'test', question_type: {type: 'hard_fact'}})
        });
        it('It should return answer object', function () {
            chai.expect(new answerModel({question: 'test question', category: 'test category', type: 'test type', options: ['one', 'two'], selection: 'one'})).to.deep.equal({question: 'test question', category: 'test category', type: 'test type', options: ['one', 'two'], selection: 'one'})
        });

    });

    describe('It should get all the questions', function () {
        let status,
        json,
        res;
        beforeEach(() => {
            status = stub();
            json = spy();
            res = { json, status };
            status.returns(res);
        });
        it('getQuestions', function () {
            beforeEach(() => questionsCollection.getAllQuestions());
            it('calls status with code 200', () =>
                status.calledWith(200).should.be.ok
            );
            it('calls json with success: true', () =>
                json.calledWith({ success: true }).should.be.ok
            );
        });
    });

    describe('It should get all the answers', function () {
        let status,
        json,
        res;
        beforeEach(() => {
            status = stub();
            json = spy();
            res = { json, status };
            status.returns(res);
        });
        it('getAnswers', function () {
            beforeEach(() => answerCollection.getAllAnswers());
            it('calls status with code 200', () =>
                status.calledWith(200).should.be.ok
            );
            it('calls json with success: true', () =>
                json.calledWith({ success: true }).should.be.ok
            );
        });
    });
    mocha.checkLeaks();
    mocha.run();
});





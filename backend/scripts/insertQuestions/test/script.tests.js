/* const expect = require('chai').expect;
const MongodbMemoryServer = require('mongodb-memory-server');
const mongod = new MongodbMemoryServer.default();

let script = require('../insertQuestions.js');
describe('main', function () {
    it('Inserts questions in database', async function() {
    try {
            const uri = await mongod.getConnectionString();
            const data = await script(uri, 'ptest')
            expect(data).to.equal(25);
        }
        catch(e) {
            console.log('error', error)
        }
    });
}); */

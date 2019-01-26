const contactSchema = require(__dirname + '/../../../models/answer.js');
const { validate } = require(__dirname + '/../../../../lib/validate');
const { BadRequestError,
    InvalidParamError,
    NotFoundError,
    ApiError } = require(__dirname + '/../../../../lib/validate/errors.js');
let db;
const test = (req, res) => {
    res.status(200).send({ 'status': 'ok' });
};

const getQuestions = async (req, res) => {
    try {
        res.status(200).send(await db.collection('questions').find().toArray());
    }
    catch (e) {
        let error = new ApiError(e);
        res.status(error.status).send({ name: error.name, type: error.type });
    }
};
module.exports = function registerActions (router, database) {
    db = database;
    router
        .get('/test', test)
        .get('/questions', getQuestions);
    return router;
};

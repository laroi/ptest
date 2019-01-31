const path = require('path');
const answerSchema = require(path.join(__dirname, '/../../../models/answer.js'));
const validate = require(path.join(__dirname, '/../../../../lib/validate/index.js'));
const logger = require(path.join(__dirname, '/../../../../lib/logger.js'));
const { BadRequestError,
    InvalidParamError,
    NotFoundError,
    ApiError } = require(path.join(__dirname, '/../../../../lib/validate/errors.js'));
let db;
const test = (req, res) => {
    res.status(200).send({ 'status': 'ok' });
};
const getIp = function (req) {
        return req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
}
const getQuestions = async (req, res) => {
    try
    {
        logger.log(1, 'get questions', 'Getting all the questions', 'v1/index.js', getIp(req), undefined);
        res.status(200).send(await db.collection('questions').find().toArray());
    }
    catch (e) {
        let error = new ApiError(e);
        logger.log(3, 'get questions', 'Error in getting all the questions', 'v1/index.js', getIp(req), error);
        res.status(error.status).send({ name: error.name, type: error.type });
    }
};
const acceptAnswers = async (req, res) => {
    let answers = req.body.answers || {};
    let answeredQuestions = Object.keys(answers);
    validate(req, { body: answerSchema });
    if (answeredQuestions.length > 0) {
        try
        {
            let success = await db.collection('answers').insertOne({ answers: answers, createdAt: new Date().toISOString() });
            logger.log(1, 'accept answers', 'Accept ' + answers.length + ' submitted answers in doc ' + success.insertedId, 'v1/index.js', getIp(req), undefined);
            res.status(201).send({ _id: success.insertedId });
        }
        catch (e) {
            let error = new ApiError(e);
            logger.log(3, 'accept answers', 'Error in accepting answers', 'v1/index.js', getIp(req), error);
            res.status(error.status).send({ name: error.name, type: error.type });
        }
    } else {
        let error = new BadRequestError();
        res.status(error.status).send({ name: error.name, type: error.type });
    }
};

const getAnswers = async (req, res) => {
    try {
        logger.log(1, 'get answers', 'Getting all the submitted answers', 'v1/index.js', getIp(req), undefined);
        res.status(200).send(await db.collection('answers').find().toArray());
    }
    catch (e) {
        let error = new ApiError(e);
        logger.log(3, 'get answers', 'Error in getting answers', 'v1/index.js', getIp(req), error);
        res.status(error.status).send({ name: error.name, type: error.type });
    }
};
module.exports = function registerActions (router, database) {
    db = database;
    router
        .get('/test', test)
        .get('/questions', getQuestions)
        .get('/answers', getAnswers)
        .post('/answers', acceptAnswers);
    return router;
};

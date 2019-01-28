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
    try
    {
        res.status(200).send(await db.collection('questions').find().toArray());
    }
    catch (e) {
        let error = new ApiError(e);
        res.status(error.status).send({ name: error.name, type: error.type });
    }
};
const acceptAnswers = async (req, res) => {
    let answers = req.body.answers || {};
    let answeredQuestions = Object.keys(answers);
    if (answeredQuestions.length > 0) {
        try
        {
            let success = await db.collection('answers').insertOne({ answers: answers, createdAt: new Date().toISOString() });
            res.status(201).send({ _id: success.insertedId });
        }
        catch (e) {
            let error = new ApiError(e);
            res.status(error.status).send({ name: error.name, type: error.type });
        }
    } else {
        let error = new BadRequestError();
        res.status(error.status).send({ name: error.name, type: error.type });
    }
};

const getAnswers = async (req, res) => {
    try {
        res.status(200).send(await db.collection('answers').find().toArray())
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
        .get('/questions', getQuestions)
        .get('/answers', getAnswers)
        .post('/answers', acceptAnswers);
    return router;
};

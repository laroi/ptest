const Joi = require('joi');
const Answer = Joi.object({
    questionId: Joi.string().required(),
    answer: Joi.string().required()
});

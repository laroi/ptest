const Joi = require('joi');
const Answer = Joi.object({
    answer: Joi.array().items(Joi.object({
        question: Joi.string(),
        category: Joi.string(),
        type: Joi.string(),
        selection: Joi.string()
    }))
});

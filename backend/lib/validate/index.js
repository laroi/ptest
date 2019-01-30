const _ = require('lodash');
const Joi = require('joi');

const {
    InvalidParamError,
    MissingParamError
} = require('./errors');

module.exports = function validate (req, schema, opts = {}) {
    const options = _.merge({
        allowUnknown: true,
        convert: true
    }, opts);
    for (const item of ['body', 'query', 'params']) {
        if (!schema[item]) continue;
        const toValidateObj = item === 'body' ? req.body : req[item];
        const result = Joi.validate(toValidateObj, schema[item], options);
        if (result.error) {
            const detail = result.error.details[0];
            const param = detail.path.join('.');

            if (detail.type === 'any.required') {
                throw new MissingParamError(param);
            }

            throw new InvalidParamError(param);
        }

        _.merge(toValidateObj, result.value);
    }
};

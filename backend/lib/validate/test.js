const validate = require('./');
const Joi = require('joi');

const {
  InvalidParamError,
  MissingParamError,
} = require('./errors');

describe('validate', () => {
  test('should validate requests according to a provided Joi schema', () => {
    const schema = {
      query: {
        limit: Joi.number().required(),
      },
      params: {
        id: Joi.number().required(),
      },
      request: {
        body: {
          offset: Joi.number().required(),
        },
      },
    };

    const ctx = {
      query: {
        limit: 10,
      },
      params: {
        id: 1,
      },
      body: {
        offset: 10,
      },
    };

    validate(ctx, schema);
  });

  test('should throw a MissingParamError when a required param is omitted', (cb) => {
    try {
      validate({
        params: {},
      }, {
        params: {
          id: Joi.number().required(),
        },
      });
    } catch (e) {
      if (e instanceof MissingParamError) {
        cb();
      } else {
        cb('threw an error, but was the wrong type.');
      }

      return;
    }
    cb('failed to throw an error.');
  });

  test('should throw an InvalidParamError when a param is invalid', (cb) => {
    try {
      validate({
        params: {
          id: 'hello',
        },
      }, {
        params: {
          id: Joi.number().required(),
        },
      });
    } catch (e) {
      if (e instanceof InvalidParamError) {
        cb();
      } else {
        cb('threw an error, but was the wrong type.');
      }

      return;
    }
    cb('failed to throw an error.');
  });

  test('should cast values to proper type according to schema', () => {
    const input = {
      params: {
        id: '1',
      },
    };

    validate(input, {
      params: {
        id: Joi.number(),
      },
    });

    expect(input.params.id).toEqual(1);
  });

  test('should set default values according to schema', () => {
    const input = {
      params: {},
    };

    validate(input, {
      params: {
        one: Joi.number().default(1),
        null: Joi.string().allow(null).default(null),
      },
    });

    expect(input.params.one).toEqual(1);
    expect(input.params.null).toEqual(null);
  });
});

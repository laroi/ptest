// HTTP 500
class ApiError extends Error {
  constructor(message = 'An unexpected error occurred. Please try again later.') {
    super(message);
    this.type = 'api_error';
    this.message = message;
    this.name = this.constructor.name;
    this.status = 500;
  }

  get response() {
    return {
      error: {
        type: this.type,
        code: this.code,
        param: this.param,
        message: this.message,
      },
    };
  }
}

// HTTP 400
class BadRequestError extends ApiError {
  constructor(message = 'The request was unacceptable.') {
    super(message);
    this.type = 'invalid_request_error';
    this.status = 400;
  }
}

class MissingParamError extends BadRequestError {
  constructor(param, customMessage) {
    const message = customMessage || `Missing required ${param} argument.`;
    super(message);

    this.param = param;
  }
}

class InvalidParamError extends BadRequestError {
  constructor(param, customMessage) {
    const message = customMessage || `Invalid ${param} argument.`;
    super(message);

    this.param = param;
  }
}

// HTTP 404
class NotFoundError extends ApiError {
  constructor(message = 'The requested resource doesn\'t exist.') {
    super(message);
    this.type = 'invalid_request_error';
    this.status = 404;
  }
}

// HTTP 401
class AuthenticationError extends ApiError {
  constructor(message = 'Authentication error') {
    super(message);
    this.type = 'authentication_error';
    this.status = 401;
  }
}

// HTTP 402
class SubscriptionError extends ApiError {
  constructor(message = 'This feature is not included in your subscription') {
    super(message);
    this.type = 'subscription_error';
    this.status = 402;
  }
}

// HTTP 403
class AuthorizationError extends ApiError {
  constructor(message = 'Insufficient Permissions') {
    super(message);
    this.type = 'authorization_error';
    this.status = 403;
  }
}

module.exports = {
  ApiError,
  AuthenticationError,
  AuthorizationError,
  BadRequestError,
  InvalidParamError,
  MissingParamError,
  NotFoundError,
  SubscriptionError,
};

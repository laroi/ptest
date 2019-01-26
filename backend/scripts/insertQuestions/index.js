const { host, port, database } = require('../../config').mongo;
require('./insertQuestions.js')(`mongodb://${host}:${port}`, database);

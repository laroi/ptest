const { host, port, database } = require('./config').mongo;
require('./server')(`mongodb://${host}:${port}`, database);

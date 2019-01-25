const {
  MONGO_HOST,
  MONGO_PORT,
  MONGO_DB,
  MONGO_USER,
  MONGO_PW,
  NODE_ENV,
} = process.env;
module.exports = {
  env: NODE_ENV,
  mongo: {
    host: MONGO_HOST || 'localhost',
    port: MONGO_PORT || '27017' ,
    database: MONGO_DB || 'rsvp'
  },
};


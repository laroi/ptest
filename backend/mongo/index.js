const MongoClient = require('mongodb').MongoClient;
const { host, port, database } = require('../config').mongo;
module.exports = () => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(`mongodb://${host}:${port}`)
            .then((client) => {
                resolve(client.db(database));
            })
            .catch((err) => {
                reject(err);
            });
    });
};

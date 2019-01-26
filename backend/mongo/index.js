const MongoClient = require('mongodb').MongoClient;
module.exports = (uri, database) => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(uri)
            .then((client) => {
                resolve(client.db(database));
            })
            .catch((err) => {
                reject(err);
            });
    });
};

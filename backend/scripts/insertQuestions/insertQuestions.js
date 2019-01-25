const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const {host, port, database} = require('../../config').mongo;
const questions = JSON.parse(fs.readFileSync(__dirname + '/questions.json', {'encoding': 'utf8'}));
let client;
let insert = () => {
    return MongoClient.connect(`mongodb://${host}:${port}`)
    .then((connection)=> {
        client = connection
        return client.db(database).collection('questions').insertMany(questions, forceServerObjectId=true)
    })
    .then((data)=> {
        console.log('Completed insertion, ', data.insertedCount , ' questions inserted')
        client.close();
        return data.insertedCount;
    })
    .catch((err)=> {
        console.error('Could not insert questions', err);
    })
}

module.exports = insert

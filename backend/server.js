const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const dbConnect = require('./mongo');
app.use(bodyParser.json());

let init = (url, db) => {
    dbConnect(url, db)
        .then((db) => {
            // Db object will be used in router
            app.db = db;
            app.get('/', (req, res) => res.status(200).send({ msg: 'Welcome to Turing' }));
            app.use('/api', require('./api/rest/router')(app));
            app.listen(port, () => console.log(`Turing is listening on port ${port}!`));
        })
        .catch((err) => {
            console.error('Could not connect to database', err);
        });
    return app;
};

module.exports = init;

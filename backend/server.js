const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const dbConnect = require('./mongo');
app.use(bodyParser.json());

let init = (url, db) => {
    dbConnect(url, db)
        .then((db) => {
            app.db = db;
            app.get('/', (req, res) => res.status(200).send({ msg: 'Welcome to Turing' }));
            app.use('/api', require('./api/rest/router')(app));
            app.listen(port, () => console.log(`Turing is listening on port ${port}!`));
        });
    return app;
};

module.exports = init;

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const bodyParser = require('body-parser');
const dbConnect = require('./mongo');
let server;
app.use(bodyParser.json());
dbConnect()
    .then((db)=> {
    app.db = db;
    app.get('/', (req, res) => res.status(200).send({ msg: 'Welcome to Turing' }))
    app.use('/api',require('./api/rest/router')(app));
    server = app.listen(port, () => console.log(`Turing is listening on port ${port}!`))

})
module.exports = app;

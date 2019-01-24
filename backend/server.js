const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => res.status(200).send({ msg: 'Welcome to Turing' }))

app.listen(port, () => console.log(`Turing is listening on port ${port}!`))
module.exports = app

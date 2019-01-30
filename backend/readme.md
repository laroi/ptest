# Backend
A Backend application written in Nodejs to serve the frontend

### Tech

Backend uses the following technologies:

* [Node.js] - awesome server Run Time Engine with evented I/O for backend
* [Express] - fast Node.js network app framework
* [Mocha] - Testing framework
* [Jest] - Code coverage tool
* [lodash] - A Javascript Utility Library
* [Joi] - We're doing schemaless mongodb, so validation right on the start
* [Mongodb] - No SQL schemaless database with partition tolerence
* [Docker] - Virtualization ripped after workout
* [Docker-compose ] - Saving a couple of docker commands

### Installation

Ptest requires [Node.js] And [Mongodb] and the questions. All the parameters are configurable via follwing enviroment variables

* PORT : Port to which the backend application should listen to
* MONGO_HOST : IP where mongo db is availbale
* MONGO_PORT: Port to which Mongodb listen to
* MONGO_DB: Name of the Database that should be used


```sh
$ cd ptest
$ npm install
$ node scripts/insertQuestions/insertQuestions.js
$ npm run test
$ npm run start
```





   [node.js]: <http://nodejs.org>
   [lodash]: <https://lodash.com/>
   [express]: <http://expressjs.com>
   [Mocha]: <https://mochajs.org/>
   [Jest]: <https://jestjs.io/>
   [Joi]: <https://github.com/hapijs/joi>
   [Mongodb]: <https://www.mongodb.com/>
   [Docker]: <https://www.docker.com/>
   [Docker-compose]: <https://docs.docker.com/compose/>


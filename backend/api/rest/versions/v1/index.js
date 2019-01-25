const contactSchema = require('../../../models/answer.js');
const { validate} = require('../../../../lib/validate/errors.js');

const test =  (req, res) => {
	res.status(200).send({"status": "ok"})
}

module.exports = function registerActions(router) {
  router
  .get('/test', test)
  return router;
};


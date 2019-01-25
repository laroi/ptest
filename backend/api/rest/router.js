/*
router.js

Read versions directory, creating crud paths for each api version
*/

const fs = require('fs');
const path = require('path');
const express = require('express');
const router = new express.Router();

function buildApiRoutesForDir(router, dir = 'versions') {
  let latestVersion;
  const versionMap = fs.readdirSync(path.resolve(__dirname, dir))
    .reduce((map, file) => {
      const filePath = path.resolve(__dirname, dir, file);
      const stats = fs.lstatSync(filePath);
      // load all directories
      if (stats.isDirectory()) {
         //map[file] = require('express')
         map[file] = require(filePath); // eslint-disable-line no-param-reassign
      }
      return map;
    }, {});


  for (const version of Object.keys(versionMap).sort()) {
    let versionRouter = new express.Router();
    // add the actions to the versionRouter
    versionRouter = versionMap[version](versionRouter);
    // add the versionRouter to the router, under the proper subpath
    router.use(`/${version}`, versionRouter);
    latestVersion = versionMap[version];
  }
  // last file is the latest version, so default to it
  latestVersion(router);

  return router;
}

function buildApiRoutes(app) {
  router.get('/status', async (req, res) => {
    const stats = await app.db.stats();
    if (stats.ok) {
      res.status(200).send({ status: 'ok' });
    } else {
		res.status(500).send({status: null})
	}
  });
  buildApiRoutesForDir(router, 'versions');
  return router;
}

module.exports = buildApiRoutes;


/*
router.js

Read versions directory, creating crud paths for each api version
*/

const fs = require('fs');
const path = require('path');
const express = require('express');
const router = new express.Router();

function buildApiRoutesForDir (router, db, dir = 'versions') {
    let latestVersion;
    // check the folder to find versions
    const versionMap = fs.readdirSync(path.resolve(__dirname, dir))
        .reduce((map, file) => {
            const filePath = path.resolve(__dirname, dir, file);
            const stats = fs.lstatSync(filePath);
            // load all directories
            if (stats.isDirectory()) {
                map[file] = require(filePath); // eslint-disable-line no-param-reassign
            }
            return map;
        }, {});
    // For each dir found, create router object
    for (const version of Object.keys(versionMap).sort()) {
        let versionRouter = new express.Router();
        // add the actions to the versionRouter
        versionRouter = versionMap[version](versionRouter, db);
        // add the versionRouter to the router, under the proper subpath
        router.use(`/${version}`, versionRouter);
        latestVersion = versionMap[version];
    }
    // last file is the latest version, so default to it
    latestVersion(router, db);
    return router;
}

function buildApiRoutes (app) {
    // Add a status endpoint to the router
    router.get('/status', async (req, res) => {
        const stats = await app.db.stats();
        if (stats.ok) {
            res.status(200).send({ status: 'ok' });
        } else {
            res.status(500).send({ status: null });
        }
    });
    //lets build routes for all the versions
    buildApiRoutesForDir(router, app.db, 'versions');
    return router;
}

module.exports = buildApiRoutes;

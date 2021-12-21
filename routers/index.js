const express = require('express');

const topRouter = require('./top');
const financeRouter = require('./finance');
const securityRouter = require('./securities');

const rootRouter = express.Router();

rootRouter.use('/top', topRouter);
rootRouter.use('/finance', financeRouter);
rootRouter.use('/securities', securityRouter);

module.exports = rootRouter;
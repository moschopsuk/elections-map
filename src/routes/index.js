const { Router } = require('express');
const admin = require('./admin');
const ipad = require('./ipad');
const api = require('./api');

module.exports = (io) => {
  const router = Router();
  router.use('/admin', admin(io));
  router.use('/ipad', ipad());
  router.use('/api', api());
  return router;
};

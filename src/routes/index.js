const { Router } = require('express');
const admin = require('./admin');
const ipad = require('./ipad');
const api = require('./api');

module.exports = () => {
  const router = Router();
  router.use('/admin', admin());
  router.use('/ipad', ipad());
  router.use('/api', api());
  return router;
};

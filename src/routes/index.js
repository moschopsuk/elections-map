const { Router } = require('express');
const admin = require('./admin');
const ipad = require('./ipad');

module.exports = () => {
  const router = Router();
  router.use('/admin', admin());
  router.use('/ipad', ipad());
  return router;
};

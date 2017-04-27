const { Router } = require('express');

module.exports = () => {
  const router = Router();

  router.get('/', (req, res) => {
    res.render('ipad');
  });

  return router;
};

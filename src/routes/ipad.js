const { Router } = require('express');
const LiveResults = require('../models/LiveResults');

module.exports = () => {
  const router = Router();

  router.get('/', async (req, res) => {
    const constituencies = await LiveResults.find({ winningPartyCode: { $exists: true, $ne: '' } }).exec();
    res.render('ipad', { constituencies });
  });

  return router;
};

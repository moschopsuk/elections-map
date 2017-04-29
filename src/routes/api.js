const { Router } = require('express');
const LiveResults = require('../models/LiveResults');

module.exports = () => {
  const router = Router();

  router.get('/results', async (req, res) => {
    const results = await LiveResults.find({ winningPartyCode: { $exists: true, $ne: '' } }).exec();
    const jsonData = {};
    results.forEach((result) => {
      jsonData[result.constituency] = {
        winningPartyCode: result.winningPartyCode,
      };
    });

    res.json(jsonData);
  });

  return router;
};

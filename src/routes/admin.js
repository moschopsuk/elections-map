const { Router } = require('express');
const LiveResults = require('../models/LiveResults');

module.exports = () => {
  const router = Router();

  router.post('/:letter', async (req, res) => {
    const constituency = req.body.constituency;
    const winningPartyCode = req.body.partyCode;
    const letter = req.params.letter;

    await LiveResults.update({ constituency }, { $set: { winningPartyCode } });
    req.flash('success', `Updated ${constituency} to ${winningPartyCode}`);
    res.redirect(`/admin/${letter}`);
  });

  router.get('/:letter', async (req, res) => {
    const letter = req.params.letter;
    const constituencies = await LiveResults.find({ name: { $regex: new RegExp(`^${letter}`), $options: 'i' } }).exec();
    res.render('admin', { constituencies, currentLetter: letter });
  });

  return router;
};

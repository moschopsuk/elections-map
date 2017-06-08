const { Router } = require('express');
const LiveResults = require('../models/LiveResults');
const moment = require('moment');

module.exports = (io) => {
  const router = Router();

  router.post('/:letter', async (req, res) => {
    const constituency = req.body.constituency;
    const winningPartyCode = req.body.partyCode;
    const letter = req.params.letter;
    const declared = (winningPartyCode !== '') ? moment() : '';

    try {
      await LiveResults.update({ constituency }, { $set: { winningPartyCode, declared } });
    } catch (e) {
      req.flash('error', e);
      res.redirect(`/admin/${letter}`);
    }
    io.sockets.emit('api:staleData');
    req.flash('success', `Updated ${constituency} to ${winningPartyCode}`);
    res.redirect(`/admin/${letter}`);
  });

  router.get('/', (req, res) => {
    res.redirect('/admin/A');
  });

  router.get('/:letter', async (req, res) => {
    const letter = req.params.letter;
    const constituencies = await LiveResults.find({ name: { $regex: new RegExp(`^${letter}`), $options: 'i' } }).exec();
    res.render('admin', { constituencies, currentLetter: letter });
  });

  return router;
};

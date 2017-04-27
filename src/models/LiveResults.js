const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LiveResultSchema = new Schema({
  constituency: { type: String, index: true, required: true },
  name: { type: String },
  region: { type: String },
  winningPartyCode: { type: String },
  declared: { type: Date },
});

module.exports = mongoose.model('LiveResult', LiveResultSchema);

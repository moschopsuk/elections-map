const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// TODO: Think of a better model name
const ResultSchema = new Schema({
  constituency: { type: String, index: true, required: true },
  year: { type: Number, required: true },
  geography: {
    name: { type: String },
    county: { type: String },
    region: { type: String },
    type: { type: String },
  },
  winningPartyCode: { type: String, required: true },
  decleared: { type: Date },
  ballot: {
    electorate: { type: Number },
    valid: { type: Number },
    invalid: { type: Number },
    majority: { type: Number },
  },
  parties: {
    con: { type: Number },
    lab: { type: Number },
    ld: { type: Number },
    ukip: { type: Number },
    green: { type: Number },
    snp: { type: Number },
    pc: { type: Number },
    dup: { type: Number },
    sf: { type: Number },
    sdlp: { type: Number },
    uup: { type: Number },
    alliance: { type: Number },
    other: { type: Number },
  },
});

module.exports = mongoose.model('Result', ResultSchema);

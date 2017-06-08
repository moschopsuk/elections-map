/*
   This is a script that has to report back
   to the cli so we will allow console logs
*/
/* eslint-disable no-console */

const fs = require('fs');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const chalk = require('chalk');
const parse = require('csv-parse/lib/sync');
const LiveResult = require('../src/models/LiveResults');

mongoose.Promise = Promise;

const csv = fs.readFileSync(`${__dirname}/sources/hocl-ge2015-results-summary.csv`, 'utf8');
const results = parse(csv, { columns: true });

mongoose.connect('mongodb://localhost:32770/elections', async (err) => {
  if (err) {
    throw err;
  }

  console.log(chalk.blue('Starting Ingest'));
  const ingestJobs = [];

  // Purge Existing
  await LiveResult.remove({}).exec();

  results.forEach((data) => {
    const constituency = new LiveResult({
      constituency: data.ons_id,
      name: data.constituency_name,
      region: data.region_name,
      winningPartyCode: '',
      declared: null,
    });

    ingestJobs.push(constituency.save());
  });

  try {
    const jobresult = await Promise.all(ingestJobs);
    console.log(chalk.dim(`${jobresult.length} parsed...`));
    console.log(chalk.bold.green('Ingest Complete!'));
    mongoose.disconnect();
    process.exit(0);
  } catch (e) {
    console.log(chalk.red(e));
  }
});

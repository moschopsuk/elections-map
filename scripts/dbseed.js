const fs = require('fs');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const chalk = require('chalk');
const parse = require('csv-parse/lib/sync');
const Result = require('../src/models/Results');

mongoose.Promise = Promise;

const csv = fs.readFileSync(`${__dirname}/sources/hocl-ge2015-results-summary.csv`, 'utf8');
const results = parse(csv, {columns: true });

mongoose.connect('mongodb://localhost:32768/elections', async function(err) {
  if (err) {
    throw err;
  }
  console.log(chalk.blue('Starting Ingest'));
  const ingestJobs = [];

  //Purge Existing
  await Result.remove({}).exec();

  results.forEach((data) => {
    const constituency = new Result({
      constituency:   data.ons_id,
      year:   2015,
      geography: {
        name:   data.constituency_name,
        county: data.county_name,
        region: data.region_name,
        type:   data.constituency_type
      },
      winningPartyCode: data.first_party,
      decleared:        data.declaration_time,
      ballot: {
        electorate: data.electorate,
        valid:      data.valid_votes,
        invalid:    data.invalid_votes,
        majority:   data.majority
      },
      parties: {
        con:      data.con,
        lab:      data.lab,
        ld:       data.ld,
        ukip:     data.ukip,
        green:    data.green,
        snp:      data.snp,
        pc:       data.pc,
        dup:      data.dup,
        sf:       data.sf,
        sdlp:     data.sdlp,
        uup:      data.uup,
        alliance: data.alliance,
        other:    data.other
      }
    });

    ingestJobs.push(constituency.save())
  });

  try {
    const jobresult = await Promise.all(ingestJobs)
    console.log(chalk.dim(`${jobresult.length} parsed...`));
    console.log(chalk.bold.green('Ingest Complete!'));
    mongoose.disconnect();
    process.exit(0);
  }
  catch (e) {
    console.log(chalk.red(e));
  }
});

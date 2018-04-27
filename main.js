const csv = require('fast-csv');
const env = require('dotenv').config({
  path: '.env'
});
const {
  Kayn,
  REGIONS
} = require('kayn');

const db = require('./mysql');

const k = Kayn(process.env.RIOT_LOL_API_KEY)({
  requestOptions: {
    burst: false
  }
});

console.log('')

csv.fromPath('test_leagueuuids.csv')
.on('data', (data) => {
  let leagueId = data[0];

  k.League.by.uuid(leagueId).callback((err, league) => {
    if (err) {
      console.error(err);
    }
    console.log(league['name']);


  });



  /*db.query('INSERT INTO leagues SET ?', {
    leagueId: data[0],
  }, (err, results, fields) => {
  
  })*/
})
.on('end', () => {
  console.log('done');
});

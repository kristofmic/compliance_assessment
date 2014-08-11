var
  csv = require('fast-csv'),
  mongoose = require('mongoose'),
  config = require('../config'),
  CsfRequirement = require('../db/csf_requirement'),
  req,
  i = 0;

mongoose.connect(process.env.DB_CONNECTION);

/*
CsfRequirement.find({}).limit(1).exec()
  .then(function(documents) {
    return console.log(documents[0]);
  });
*/

csv
 .fromPath('csf_requirements.csv', { headers: true })
 .on('record', function(data){
    req = new CsfRequirement(data);
    req.save(function(err) {
      if (err) {
        console.log('**ERROR** ', err);
      }
      else {
        console.log('processed row: ', i++);
      }
    });
 })
 .on('end', function(){
    console.log("**done**");
 });

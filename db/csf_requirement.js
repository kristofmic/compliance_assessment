var
  mongoose = require('mongoose'),
  schema,
  CsfRequirement;

schema = mongoose.Schema({
  domain_id: Number,
  domain_name: String,
  objective_id: Number,
  objective_name: String,
  objective_text: String,
  control_id: String,
  control_name: String,
  specification_text: String,
  level: String,
  question_id: Number,
  question_text: String
});

CsfRequirement = mongoose.model('CsfRequirement', schema);

module.exports = CsfRequirement;
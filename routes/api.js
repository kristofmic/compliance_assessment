var
  express = require('express'),
  router = express.Router(),
  CsfRequirement = require('../db/csf_requirement');

router.get('/csf_requirements', getCsfRequirements);

module.exports = router;

function getCsfRequirements(req, res) {
  CsfRequirement.find({}).limit(req.params.limit || 100).exec()
    .then(sendResponse, handleError);

  function sendResponse(requirements) {
    res.json(requirements);
  }

  function handleError(err) {
    res.send(500, 'There was an error getting the CSF Requirements. Please try again.');
  }
}

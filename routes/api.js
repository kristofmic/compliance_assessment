var
  express = require('express'),
  router = express.Router(),
  CsfRequirement = require('../db/csf_requirement');

router.get('/csf_requirements', getCsfRequirements);
router.get('/csf_domains', getCsfDomains);

module.exports = router;

function getCsfRequirements(req, res) {
  CsfRequirement.find({}).limit(req.params.limit || 100).exec()
    .then(sendResponse, handleError);

  function sendResponse(requirements) {
    res.json(requirements);
  }

  function handleError(err) {
    res.send(500, 'There was an error getting the CSF Requirements. Please try again.');
    console.log(err);
  }
}

function getCsfDomains(req, res) {
  CsfRequirement.aggregate(
    {
      $group: {
        _id: '$domain_id',
        domain_name: { $first: '$domain_name' }
      }
    },
    handleResponse
  );

  function handleResponse(err, domains) {
    if (err) {
      res
        .status(500)
        .send('There was an error getting the CSF Requirements. Please try again.');
      console.log(err);
    }
    else {
      res.json(domains);
    }
  }
}

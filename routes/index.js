var
  express = require('express'),
  router = express.Router();

router.get('/', getIndex);

module.exports = router;

function getIndex(req, res) {
  res.render('index');
}

var
  express = require('express'),
  router = express.Router(),
  ran = require('../lib/id_generator'),
  mockActivityFeed = getMockActivityFeed();
  mockSettings = getMockSettings();

router.get('/activity', function(req, res) {
  res.json(mockActivityFeed);
});

router.get('/settings', function(req, res) {
  res.json(mockSettings);
});

module.exports = router;

function getMockActivityFeed() {
  var
    feed = [],
    feedLength = ran.generateNumber(5, 100),
    i;

  for (i = 0; i < feedLength; i++) {
    feed.push({
      name: 'Activity ' + ran.generateId(),
      type: 'Activity Type',
      dateTime: new Date(),
      status: ran.generateNumber(-1, 1)
    });
  }

  return feed;
}

function getMockSettings() {
  var
    settings = {};

  settings.emailSync = !!ran.generateNumber(0, 1);
  settings.contactsSync = !!ran.generateNumber(0, 1);
  settings.leadsSync = !!ran.generateNumber(0, 1);

  settings.rules = [
    'follow-up'
  ];

  settings.blackList = [
    'xerxes@persia.com'
  ];

  return settings;
}

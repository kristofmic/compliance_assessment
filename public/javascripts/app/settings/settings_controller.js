(function(settings) {

  var
    definitions;

  definitions = [
    '$scope',
    'settings',
    settingsController
  ];

  settings.controller('settingsController', definitions);

  function settingsController($scope, settings) {
    $scope.emailSync = settings.emailSync ? 'on' : 'off';
    $scope.contactsSync = settings.contactsSync ? 'on' : 'off';
    $scope.leadsSync = settings.leadsSync ? 'on' : 'off';
    $scope.rules = settings.rules;
    $scope.blackList = settings.blackList;

    $scope.addRule = addRule;
    $scope.removeRule = removeRule;
    $scope.addBlackList = addBlackList;
    $scope.removeBlackList = removeBlackList;

    function addRule(rule) {
      $scope.rules.push(rule);
      $scope.newRule = undefined;
    }

    function removeRule(index) {
      $scope.rules.splice(index, 1);
    }

    function addBlackList(listItem) {
      $scope.blackList.push(listItem);
      $scope.newBlackList = undefined;
    }

    function removeBlackList(index) {
      $scope.blackList.splice(index, 1);
    }
  }

})(vx.settings);
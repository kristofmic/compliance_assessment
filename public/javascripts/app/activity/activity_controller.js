(function(activity) {

  var
    definitions;

  definitions = [
    '$scope',
    'activities',
    activityController
  ];

  activity.controller('activityController', definitions);

  function activityController($scope, activities) {
    var
      successes;

    successes = _.filter(activities, function(activity) {
      return activity.status === 1;
    });

    $scope.activities = activities;
    $scope.hitRate = activities.length / successes.length;
    $scope.expand = expand;

    function expand(activity) {
      activity.expand = !activity.expand;
    }
  }

})(vx.activity);
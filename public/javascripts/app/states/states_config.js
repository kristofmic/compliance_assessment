(function(vx, angular) {
  var
    dependencies,
    configDefinition;

  dependencies = [
    'ui.router'
  ];

  configDefinition = [
    '$stateProvider',
    '$urlRouterProvider',
    statesConfig
  ];

  vx.states = angular.module('vx.States', dependencies);
  vx.states.config(configDefinition);

  function statesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/activity');

    $stateProvider
      .state('settings', {
        url: '/settings',
        templateUrl: 'settings.html',
        controller: 'settingsController',
        resolve: {
          settings: ['$http', function($http) {
            return $http.get('/api/settings')
              .then(function(response) {
                return response.data;
              });
          }]
        }
      })
      .state('activity', {
        url: '/activity',
        templateUrl: 'activity.html',
        controller: 'activityController',
        resolve: {
          activities: ['$http', function($http){
            return $http.get('/api/activity')
              .then(function(response) {
                return response.data;
              });
          }]
        }
      });
  }

})(vx, angular);
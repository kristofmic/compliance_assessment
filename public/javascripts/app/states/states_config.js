(function(angular) {
  var
    definition;

  definition = [
    '$stateProvider',
    '$urlRouterProvider',
    statesConfig
  ];

  angular.module('mr.States')
    .config(definition);

  function statesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/assessment');

    $stateProvider
      .state('assessment', {
        url: '/assessment',
        templateUrl: 'assessment.html',
        controller: 'assessmentController'
      });
  }

})(angular);
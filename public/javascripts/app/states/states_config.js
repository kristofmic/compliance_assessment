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
        controller: 'assessmentController',
        resolve: {
          requirements: ['$http', function resolveAssessment($http) {
            return $http.get('api/csf_requirements', { params: { limit: 50 }})
              .then(function onSuccess(res) {
                return res.data;
              })
              .catch(function onErr(err) {
                alert('There was an error. Please try again.');
                console.log(err);
              });
          }]
        }
      });
  }

})(angular);
(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    'requirements',
    'domains',
    assessmentController
  ];

  angular.module('mr.Assessment')
    .controller('assessmentController', definitions);

  function assessmentController($scope, requirements, domains) {
    $scope.answers = [
      { label: 'Yes', value: 'y' },
      { label: 'No', value: 'n' },
      { label: 'Partial', value: 'p' },
      { label: 'N/A', value: 'na' }
    ];

    $scope.requirements = requirements;
    $scope.domains = domains;

    window.scope = $scope;
  }

})(angular);
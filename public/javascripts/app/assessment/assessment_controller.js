(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    'requirements',
    assessmentController
  ];

  angular.module('mr.Assessment')
    .controller('assessmentController', definitions);

  function assessmentController($scope, requirements) {
    $scope.answers = [
      { label: 'Yes', value: 'y' },
      { label: 'No', value: 'n' },
      { label: 'Partial', value: 'p' },
      { label: 'N/A', value: 'na' }
    ];

    $scope.requirements = requirements;
  }

})(angular);
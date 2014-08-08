(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    assessmentController
  ];

  angular.module('mr.Assessment')
    .controller('assessmentController', definitions);

  function assessmentController($scope) {
    console.log('assessment module!!!');
  }

})(angular);
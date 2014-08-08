
// public/javascripts/app/states/states_module.js
(function(angular) {
  var
    dependencies;

  dependencies = [
    'ui.router'
  ];

  angular.module('mr.States', dependencies);

})(angular);

// public/javascripts/app/states/states_config.js
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

// public/javascripts/app/nav/nav_module.js
(function(angular) {

  var
    dependencies;

  dependencies = [];

  angular.module('mr.Nav', dependencies);

})(angular);

// public/javascripts/app/nav/nav_directive.js
(function(anguar) {

  var
    definitions;

  definitions = [
    navDirective
  ];

  angular.module('mr.Nav')
    .directive('mrNav', definitions);

  function navDirective() {

    return {
      restrict: 'AC',
      link: linker,
      scope: {
        state: '@mrNav'
      }
    };

    function linker(scope, element, attrs) {
      scope.$on('$stateChangeSuccess', setActiveNav);

      function setActiveNav(event, toState, toParams, fromState, fromParams) {
        if (toState.name === scope.state) {
          element.addClass('active');
        }
        else {
          element.removeClass('active');
        }
      }
    }

  }

})(angular);

// public/javascripts/app/assessment/assessment_module.js
(function(angular){

  var
    dependencies;

  dependencies = [];

  angular.module('mr.Assessment', dependencies);

})(angular);

// public/javascripts/app/assessment/assessment_controller.js
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

// public/javascripts/app/templates_module.js
angular.module('mr.Templates', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('assessment.html',
    "<div class=\"row\"><div class=\"col-sm-4\"><h2>Assessment Module!</h2></div></div>"
  );


  $templateCache.put('nav.html',
    "<nav class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\"><div class=\"container-fluid\"><div class=\"navbar-header\"><a class=\"navbar-brand\" href=\"#\">Compliance Assessment</a></div><div class=\"collapse navbar-collapse\"><ul class=\"nav navbar-nav navbar-right\"><li mr-nav=\"reports\"><a ui-sref=\"reports\">Reports</a></li><li mr-nav=\"assessment\"><a ui-sref=\"assessment\">Assessment</a></li><li mr-nav=\"settings\"><a ui-sref=\"settings\">Settings</a></li><li mr-nav=\"logout\"><a ui-sref=\"logout\">Logout</a></li></ul></div></div></nav>"
  );

}]);


// public/javascripts/app/main_module.js
(function(angular) {

  var
    dependencies;

  dependencies = [
    'mr.States',
    'mr.Templates',
    'mr.Nav',
    'mr.Assessment'
  ];

  angular.module('mr.Main', dependencies);

})(angular);
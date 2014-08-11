
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
    $scope.requirements[0].starred = true;
  }

})(angular);

// public/javascripts/app/templates_module.js
angular.module('mr.Templates', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('assessment.html',
    "<div class=\"row\"><div class=\"col-sm-3\"><h2>Left Nav</h2></div><div class=\"col-sm-9\"><table class=\"table table-hover\"><tbody><tr ng-repeat=\"req in requirements\"><td><input type=\"checkbox\" ng-model=\"req.selected\"></td><td><i class=\"glyphicon\" ng-class=\"{'glyphicon-star-empty': !req.starred, 'glyphicon-star': req.starred}\" ng-model=\"req.starred\"></i></td><td>{{req.control_id}}: {{req.control_name}}</td><td>{{req.level}}</td><td>{{req.question_text}}</td><td><select ng-model=\"req.answer\" ng-options=\"answer.value as answer.label for answer in answers\"><option value>- Select -</option></select></td></tr></tbody></table></div></div>"
  );


  $templateCache.put('top_nav.html',
    "<nav class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\"><div class=\"container-fluid\"><div class=\"navbar-header\"><a class=\"navbar-brand\" href=\"#\">Compliance Assessment</a></div><div class=\"collapse navbar-collapse\"><ul class=\"nav navbar-nav navbar-right\"><li mr-nav=\"reports\"><a ui-sref=\"reports\"><i class=\"glyphicon glyphicon-folder-open\"></i> Reports</a></li><li mr-nav=\"assessment\"><a ui-sref=\"assessment\"><i class=\"glyphicon glyphicon-list-alt\"></i> Assessments</a></li><li mr-nav=\"settings\"><a ui-sref=\"settings\"><i class=\"glyphicon glyphicon-cog\"></i> Settings</a></li><li mr-nav=\"logout\"><a ui-sref=\"logout\"><i class=\"glyphicon glyphicon-log-out\"></i> Logout</a></li></ul></div></div></nav>"
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
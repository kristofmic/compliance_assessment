
// public/javascripts/app/nav/nav_module.js
(function(vx, angular) {

  var
    dependencies;

  dependencies = [];

  vx.nav = angular.module('vx.Nav', dependencies);

})(vx, angular);

// public/javascripts/app/nav/nav_directive.js
(function(nav) {

  var
    definitions;

  definitions = [
    navDirective
  ];

  nav.directive('vxNav', definitions);

  function navDirective() {

    return {
      restrict: 'AC',
      link: linker,
      scope: {
        state: '@vxNav'
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

})(window.vx.nav);

// public/javascripts/app/settings/settings_module.js
(function(vx, angular) {

  var
    dependencies;

  dependencies = [
    'ui.bootstrap'
  ];

  vx.settings = angular.module('vx.Settings', dependencies);

})(vx, angular);

// public/javascripts/app/settings/settings_controller.js
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

// public/javascripts/app/activity/activity_module.js
(function(vx, angular){

  var
    dependencies;

  dependencies = [];

  vx.activity = angular.module('vx.Activity', dependencies);

})(vx, angular);

// public/javascripts/app/activity/activity_controller.js
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

// public/javascripts/app/states/states_config.js
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

// public/javascripts/app/templates_module.js
angular.module('vx.Templates', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('activity.html',
    "<div class=\"row\"><div class=\"col-sm-4\"><ul class=\"list-group profile\"><li class=\"list-group-item\"><img src=\"https://github.com/identicons/jasonlong.png\"></li><li class=\"list-group-item row\"><div class=\"col-sm-6\"><span><strong>Processed:</strong></span> <span class=\"lead text-primary\">{{activities.length}}</span></div><div class=\"col-sm-6\"><span><strong>Success:</strong></span> <span class=\"lead text-primary\">{{hitRate | number: 2}}%</span></div></li></ul></div><div class=\"col-sm-6\"><ul class=\"list-group\"><li class=\"list-group-item row\" ng-repeat=\"activity in activities\"><div class=\"col-sm-1\"><span class=\"label\" ng-class=\"{'label-primary': activity.status === 0, 'label-success': activity.status === 1, 'label-danger': activity.status === -1}\"><span class=\"glyphicon\" ng-class=\"{'glyphicon-floppy-save': activity.status === 0, 'glyphicon-floppy-saved': activity.status === 1, 'glyphicon-floppy-remove': activity.status === -1}\"></span></span></div><div class=\"row\"><div class=\"col-sm-10\"><p><strong>{{activity.name}}</strong></p><p class=\"btn btn-link\" ng-click=\"expand(activity)\" ng-switch=\"activity.expand\"><small ng-switch-when=\"false\">See more</small> <small ng-switch-when=\"true\">See less</small> <small ng-switch-default>See more</small></p></div></div><div class=\"row\" ng-show=\"activity.expand\"><div class=\"col-sm-12\"><p><small>{{activity.type}}</small></p><p><small>{{activity.dateTime | date: 'medium'}}</small></p></div></div></li></ul></div></div>"
  );


  $templateCache.put('nav.html',
    "<nav class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\"><div class=\"container-fluid\"><div class=\"navbar-header\"><a class=\"navbar-brand\" href=\"#\">Voxa</a></div><div class=\"collapse navbar-collapse\"><ul class=\"nav navbar-nav navbar-right\"><li vx-nav=\"activity\"><a ui-sref=\"activity\">Activity</a></li><li vx-nav=\"settings\"><a ui-sref=\"settings\">Settings</a></li></ul></div></div></nav>"
  );


  $templateCache.put('settings.html',
    "<div class=\"row\"><div class=\"col-sm-6 col-sm-offset-3\"><ul class=\"list-group\"><li class=\"list-group-item\"><h4 class=\"list-group-item-heading\">Sync Settings</h4><p class=\"list-group-item-text\"><ul class=\"list-unstyled\"><li class=\"sync-setting\"><h5>Email</h5><div class=\"btn-group\"><label class=\"btn btn-primary\" ng-model=\"emailSync\" btn-radio=\"'on'\">On</label><label class=\"btn btn-primary\" ng-model=\"emailSync\" btn-radio=\"'off'\">Off</label></div></li><li class=\"sync-setting\"><h5>Contacts</h5><div class=\"btn-group\"><label class=\"btn btn-primary\" ng-model=\"contactsSync\" btn-radio=\"'on'\">On</label><label class=\"btn btn-primary\" ng-model=\"contactsSync\" btn-radio=\"'off'\">Off</label></div></li><li class=\"sync-setting\"><h5>Leads</h5><div class=\"btn-group\"><label class=\"btn btn-primary\" ng-model=\"leadsSync\" btn-radio=\"'on'\">On</label><label class=\"btn btn-primary\" ng-model=\"leadsSync\" btn-radio=\"'off'\">Off</label></div></li></ul></p></li><li class=\"list-group-item\"><h4 class=\"list-group-item-heading\">Rules</h4><form class=\"list-group-item-text\" ng-submit=\"addRule(newRule)\"><div class=\"input-group\"><input type=\"text\" class=\"form-control\" ng-model=\"newRule\" placeholder=\"(e.g., follow-up)\"> <span class=\"input-group-btn\"><div class=\"btn btn-default\" type=\"submit\" ng-click=\"addRule(newRule)\">Add</div></span></div><ul class=\"list-unstyled\"><li class=\"rule-item\" ng-repeat=\"rule in rules track by $index\"><p>{{rule}} <span class=\"glyphicon glyphicon-remove-circle\" ng-click=\"removeRule($index)\"></span></p></li></ul></form></li><li class=\"list-group-item\"><h4 class=\"list-group-item-heading\">Email Black List</h4><form class=\"list-group-item-text\" ng-submit=\"addBlackList(newBlackList)\"><div class=\"input-group\"><input type=\"email\" ng-required=\"true\" class=\"form-control\" ng-model=\"newBlackList\" placeholder=\"(e.g., noReply@mailinator.com)\"> <span class=\"input-group-btn\"><div class=\"btn btn-default\" type=\"submit\" ng-click=\"addBlackList(newBlackList)\">Add</div></span></div><ul class=\"list-unstyled\"><li class=\"rule-item\" ng-repeat=\"blackListed in blackList track by $index\"><p>{{blackListed}} <span class=\"glyphicon glyphicon-remove-circle\" ng-click=\"removeBlackList($index)\"></span></p></li></ul></form></li></ul></div></div>"
  );

}]);


// public/javascripts/app/main_module.js
(function(vx, angular) {

  var
    dependencies;

  dependencies = [
    'vx.States',
    'vx.Templates',
    'vx.Nav',
    'vx.Activity',
    'vx.Settings'
  ];

  vx.main = angular.module('vx.Main', dependencies);

})(vx, angular);
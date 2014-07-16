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
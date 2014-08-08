angular.module('mr.Templates', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('assessment.html',
    "<div class=\"row\"><div class=\"col-sm-4\"><h2>Assessment Module!</h2></div></div>"
  );


  $templateCache.put('nav.html',
    "<nav class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\"><div class=\"container-fluid\"><div class=\"navbar-header\"><a class=\"navbar-brand\" href=\"#\">Compliance Assessment</a></div><div class=\"collapse navbar-collapse\"><ul class=\"nav navbar-nav navbar-right\"><li mr-nav=\"reports\"><a ui-sref=\"reports\">Reports</a></li><li mr-nav=\"assessment\"><a ui-sref=\"assessment\">Assessment</a></li><li mr-nav=\"settings\"><a ui-sref=\"settings\">Settings</a></li><li mr-nav=\"logout\"><a ui-sref=\"logout\">Logout</a></li></ul></div></div></nav>"
  );

}]);

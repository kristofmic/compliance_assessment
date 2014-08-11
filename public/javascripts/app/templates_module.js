angular.module('mr.Templates', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('assessment.html',
    "<div class=\"row\"><div class=\"col-sm-3\"><h2>Left Nav</h2></div><div class=\"col-sm-9\"><table class=\"table table-hover\"><tbody><tr ng-repeat=\"req in requirements\"><td><input type=\"checkbox\" ng-model=\"req.selected\"></td><td><i class=\"glyphicon\" ng-class=\"{'glyphicon-star-empty': !req.starred, 'glyphicon-star': req.starred}\" ng-model=\"req.starred\"></i></td><td>{{req.control_id}}: {{req.control_name}}</td><td>{{req.level}}</td><td>{{req.question_text}}</td><td><select ng-model=\"req.answer\" ng-options=\"answer.value as answer.label for answer in answers\"><option value>- Select -</option></select></td></tr></tbody></table></div></div>"
  );


  $templateCache.put('top_nav.html',
    "<nav class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\"><div class=\"container-fluid\"><div class=\"navbar-header\"><a class=\"navbar-brand\" href=\"#\">Compliance Assessment</a></div><div class=\"collapse navbar-collapse\"><ul class=\"nav navbar-nav navbar-right\"><li mr-nav=\"reports\"><a ui-sref=\"reports\"><i class=\"glyphicon glyphicon-folder-open\"></i> Reports</a></li><li mr-nav=\"assessment\"><a ui-sref=\"assessment\"><i class=\"glyphicon glyphicon-list-alt\"></i> Assessments</a></li><li mr-nav=\"settings\"><a ui-sref=\"settings\"><i class=\"glyphicon glyphicon-cog\"></i> Settings</a></li><li mr-nav=\"logout\"><a ui-sref=\"logout\"><i class=\"glyphicon glyphicon-log-out\"></i> Logout</a></li></ul></div></div></nav>"
  );

}]);

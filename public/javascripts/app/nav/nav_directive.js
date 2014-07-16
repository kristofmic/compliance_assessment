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
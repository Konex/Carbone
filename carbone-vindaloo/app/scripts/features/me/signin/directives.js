'use strict';

angular.module('me.signin.directives', [])


.directive('formAutofillFix', function ($timeout) {
  return function (scope, element, attrs) {
    element.prop('method', 'post');
    if (attrs.ngSubmit) {
      $timeout(function () {
        element
          .unbind('submit')
          .bind('submit', function (event) {
            event.preventDefault();
            element.find('input')
            .triggerHandler('input')
            .triggerHandler('change')
            .triggerHandler('keydown');
            scope.$apply(attrs.ngSubmit);
          });
      });
    }
  };
})


.directive('signInDialog', function (AUTH_EVENTS) {
	return {
		restrict: 'A',
		template: '<div ng-if="visible" ng-include="templates\'features\'me\'signin\'signin.html\'">',
		link: function (scope) {
			var showDialog = function () {
			scope.visible = true;
			};
			scope.visible = false;
			scope.$on(AUTH_EVENTS.notAuthenticated, showDialog);
			scope.$on(AUTH_EVENTS.sessionTimeout, showDialog);
		}
	};
});
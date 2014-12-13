'use strict';

var signinDirectives = angular.module('me.signin.directives', [])


signinDirectives.directive('formAutofillFix', [
    '$timeout',

    function ($timeout) {
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
    }
]);


signinDirectives.directive('signInDialog', [
    'AUTH_EVENTS',

    function (AUTH_EVENTS) {
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
    }
]);


// TODO: wire it up for sign up feature
signinDirectives.directive('ensureUnique', [
    '$http',

    function($http) {
        return {
            require: 'ngModel',
            link: function(scope, ele, attrs, c) {
              scope.$watch(attrs.ngModel, function() {
                $http({
                    method: 'POST',
                    url: '/api/createProfile/' + attrs.ensureUnique,
                    data: {'field': attrs.ensureUnique}
                }).success(function(data, status, headers, cfg) {
                    c.$setValidity('unique', data.isUnique);
                }).error(function(data, status, headers, cfg) {
                    c.$setValidity('unique', false);
                });
              });
            }
        }
    }
]);

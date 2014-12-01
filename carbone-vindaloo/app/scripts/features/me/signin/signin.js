'use strict';

var signin = angular.module('me.signin', [
  'me.signin.controller',
  'me.signin.directives'
]);

signin.config([
	'$stateProvider',
	'$urlRouterProvider',
	'USER_ROLES',
	
  	function($stateProvider, $urlRouterProvider, USER_ROLES) {
  		$stateProvider
	    .state('signin', {
			url: '/signin',
			templateUrl: 'templates/features/me/signin/signin.html',
			controller: 'SignInCtrl',
			data: {
				authorizedRoles: [USER_ROLES.all]
			}
	    })
	}
]);
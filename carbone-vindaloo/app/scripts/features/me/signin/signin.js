'use strict';

var signin = angular.module('me.signin', [
  'me.signin.controller',
  'me.signin.directives'
]);

signin.config([
	'$stateProvider',
	'$urlRouterProvider',
	'ACCESS_LEVEL',
	
  	function($stateProvider, $urlRouterProvider, ACCESS_LEVEL) {
  		$stateProvider
	    .state('signin', {
			url: '/signin',
			templateUrl: 'templates/features/me/signin/signin.html',
			controller: 'SignInCtrl',
			data: {
				accessLevel: ACCESS_LEVEL.ALL
			}
	    })
	}
]);
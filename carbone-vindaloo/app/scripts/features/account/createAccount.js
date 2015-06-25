'use strict';

var createAccount = angular.module('createAccount', [
  'createAccount.controller'
]);

createAccount.config([
	'$stateProvider',
	'$urlRouterProvider',
	'ACCESS_LEVEL',
	
  	function($stateProvider, $urlRouterProvider, ACCESS_LEVEL) {
  		$stateProvider
	    .state('createAccount', {
			url: '/createAccount',
			templateUrl: 'templates/features/account/createAccount.html',
			controller: 'CreateAccountCtrl',
			data: {
				accessLevel: ACCESS_LEVEL.ALL
			}
	    })
	}
]);
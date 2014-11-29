'use strict';

var me = angular.module('me', [
	'me.controller',
	'me.signin'
]);

me.config([
	'$stateProvider',
    '$urlRouterProvider',
    'USER_ROLES',
    
    function($stateProvider, $urlRouterProvider, USER_ROLES) {

	$stateProvider
	.state('tab.me', {
			url: '/me',
			views: {
			'me-tab': {
  				templateUrl: 'templates/features/me/me.html',
  				controller: 'MeCtrl'
			},
			data: {
	        	authorizedRoles: [USER_ROLES.member]
	      }
		}
	})    	
}]);
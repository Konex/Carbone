'use strict';

var me = angular.module('me', [
	'me.controller',
	'me.signin'
]);

me.config([
	'$stateProvider',
    '$urlRouterProvider',
    'ACCESS_LEVEL',
    
    function($stateProvider, $urlRouterProvider, ACCESS_LEVEL) {
		$stateProvider
		.state('tab.me', {
			url: '/me',
			views: {
				'me-tab': {
	  				templateUrl: 'templates/features/me/me.html',
	  				controller: 'MeCtrl'
				}
			},
			data: {
	        	accessLevel: ACCESS_LEVEL.MEMBER 
	      	}
		})    	
	}
]);
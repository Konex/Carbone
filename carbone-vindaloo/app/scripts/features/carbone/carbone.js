'use strict';

var carbone = angular.module('carbone', [
	'carbone.controller'
]);

carbone.config([
	'$stateProvider',
    '$urlRouterProvider',
    'USER_ROLES',
    function($stateProvider, $urlRouterProvider, USER_ROLES) {
		$stateProvider
		.state('tab.carbone', {
				url: '/carbone',
				views: {
				'carbone-tab': {
	  				templateUrl: 'templates/features/carbone/carbone.html',
	  				controller: 'CarboneCtrl'
				}
			},
			data: {
	            authorizedRoles: [USER_ROLES.member]
	        }
		})    	
	}
]);
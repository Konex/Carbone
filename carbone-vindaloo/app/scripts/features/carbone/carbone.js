'use strict';

var carbone = angular.module('carbone', [
	'carbone.controller'
]);

carbone.config([
	'$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

	$stateProvider
	.state('tab.carbone', {
			url: '/carbone',
			views: {
			'carbone-tab': {
  				templateUrl: 'templates/features/carbone/carbone.html',
  				controller: 'CarboneCtrl'
			}
		}
	})    	
}]);
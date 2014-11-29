'use strict';

var friends = angular.module('friends', [
	'friends.controller'
]);

friends.config([
	'$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

	$stateProvider
	.state('tab.friends', {
			url: '/friends',
			views: {
			'friends-tab': {
  				templateUrl: 'templates/features/friends/friends.html',
  				controller: 'FriendsCtrl'
			}
		}
	})    	
}]);
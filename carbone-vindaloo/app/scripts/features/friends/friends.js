'use strict';

var friends = angular.module('friends', [
	'friends.controller'
]);

friends.config([
	'$stateProvider',
    '$urlRouterProvider',
    'USER_ROLES',

    function($stateProvider, $urlRouterProvider, USER_ROLES) {

	$stateProvider
	.state('tab.friends', {
		url: '/friends',
		views: {
			'friends-tab': {
  				templateUrl: 'templates/features/friends/friends.html',
  				controller: 'FriendsCtrl'
			}
		},
		data: {
        	authorizedRoles: [USER_ROLES.member]
  		}
	})    	
}]);
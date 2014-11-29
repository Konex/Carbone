'use strict';

var signin = angular.module('me.signin', [
  'config',
  'me.signin.controller'
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
}]);
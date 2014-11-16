'use strict';

var signin = angular.module('signin', [
  'config',
  'security.constants',
  'security.auth',
  'signin.controller'
  ]);

signin.config([
	'$stateProvider',
  '$urlRouterProvider',
  'USER_ROLES',
	function($stateProvider, $urlRouterProvider, USER_ROLES) {

  $stateProvider
    .state('signin', {
      url: '/sign-in',
      templateUrl: 'src/signin/signin.html',
      controller: 'SignInCtrl',
      data: {
        authorizedRoles: [USER_ROLES.all]
      }
    })
}]);
'use strict';

var signinController = angular.module('me.signin.controller', []);


signinController.controller('SignInCtrl', [
  '$scope', 
  '$rootScope',
  '$state', 
  'AUTH_EVENTS', 
  'AuthService',
  
  function($scope, $rootScope, $state, AUTH_EVENTS, AuthService) {

    $scope.credentials = {
      username: '',
      password: ''
    };

    $scope.signin = function (credentials) {
      AuthService.signin(credentials).then(
        function(user) {
          $rootScope.$broadcast(AUTH_EVENTS.signinSuccess);
          $scope.setCurrentUser(user);
          $state.go('tab.me');
        },
        function() {
          $rootScope.$broadcast(AUTH_EVENTS.signinFailed);
        });
    };
}]);
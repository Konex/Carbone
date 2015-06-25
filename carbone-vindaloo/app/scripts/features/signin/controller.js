'use strict';

var signinController = angular.module('signin.controller', []);


signinController.controller('SignInCtrl', [
  '$scope', 
  '$rootScope',
  '$state', 
  'AUTH_EVENTS', 
  'AuthService',
  
  function($scope, $rootScope, $state, AUTH_EVENTS, AuthService) {
    $scope.currentYear = new Date().getFullYear();

    $scope.credentials = {
      username: '',
      password: ''
    };

    $scope.signin = function () {
        $scope.signInForm.submitted = false;
        if($scope.signInForm.$valid) {
            AuthService.signin($scope.credentials).then(
                function(user) {
                  $rootScope.$broadcast(AUTH_EVENTS.signinSuccess);
                  $scope.setCurrentUser(user);
                  $state.go('tab.me');
                },
                function() {
                    $rootScope.$broadcast(AUTH_EVENTS.signinFailed);
                }
            );
        } else {
            $scope.signInForm.submitted = true;
        }
    };

    $scope.createAccount = function () {
        $state.go('createAccount');
    };

}]);
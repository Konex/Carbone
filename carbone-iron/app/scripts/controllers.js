'use strict';
angular.module('CarboneIron.controllers', [])

.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})


// A simple controller that fetches a list of data from a service
.controller('PetIndexCtrl', function($scope, PetService) {
  // "Pets" is a service returning mock data (services.js)
  $scope.pets = PetService.all();
})


// A simple controller that shows a tapped item's data
.controller('PetDetailCtrl', function($scope, $stateParams, PetService) {
  // "Pets" is a service returning mock data (services.js)
  $scope.pet = PetService.get($stateParams.petId);
})


.controller('SignInCtrl', function($scope, $rootScope,
  AUTH_EVENTS, AuthService) {

  $scope.credentials = {
    username: '',
    password: ''
    };

    $scope.signin = function () {
      AuthService.signin(credentials).then(
        function(user) {
          $rootScope.$broadcast(AUTH_EVENTS.signinSuccuss);
          $scope.setCurrentUser(user);
        },
        function() {
          $rootScope.$broadcast(AUTH_EVENTS.signinFailed);
        });
    };
});

'use strict';

var carboneIronControllers = angular.module('CarboneIron.controllers', []);


carboneIronControllers.controller('ApplicationController',  
  function ($scope, USER_ROLES, AuthService) {

  $scope.currentUser = null;
  $scope.userRoles = USER_ROLES;
  $scope.isAuthorized = AuthService.isAuthorized;

  // Shadow copying from parent scope to child scope
  // so we need to access parent scope variable this way. 
  $scope.setCurrentUser = function(user) {
    $scope.currentUser = user;
  };
});


// A simple controller that fetches a list of data from a service
carboneIronControllers.controller('PetIndexCtrl', function($scope, PetService) {
  // "Pets" is a service returning mock data (services.js)
  $scope.pets = PetService.all();
})


// A simple controller that shows a tapped item's data
carboneIronControllers.controller('PetDetailCtrl', function($scope, $stateParams, PetService) {
  // "Pets" is a service returning mock data (services.js)
  $scope.pet = PetService.get($stateParams.petId);
});


// sign in
// carboneIronControllers.controller('SignInCtrl', function($scope, $rootScope,
//   AUTH_EVENTS, AuthService) {

//   $scope.credentials = {
//     username: '',
//     password: ''
//     };

//     $scope.signin = function (credentials) {
//       AuthService.signin(credentials).then(
//         function(user) {
//           $rootScope.$broadcast(AUTH_EVENTS.signinSuccuss);
//           $scope.setCurrentUser(user);
//           $state.go('tab.pet-index');
//         },
//         function() {
//           $rootScope.$broadcast(AUTH_EVENTS.signinFailed);
//         });
//     };
// });
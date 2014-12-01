'use strict';

var carbone = angular.module('carbone-vindaloo', [
  'ionic', 
  'config',
  'applicationController',
  'common.security', 
  'me',
  'inox',
  'carbone',
  'friends'
]);


carbone.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});


carbone.run(['$rootScope', 'AUTH_EVENTS', 'AuthService',

  function ($rootScope, AUTH_EVENTS, AuthService) {

  $rootScope.$on('$stateChangeStart', 
    function (event, toState, toParams, fromState, fromParams) {

    $rootScope.isSignInPage = (toState.url === '/signin'); 

    var authorizedRoles = toState.data.authorizedRoles;

    if (!AuthService.isAuthorized(authorizedRoles)) {

      event.preventDefault();
      if (AuthService.isAuthenticated()) {
        // user is not allowed
        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
      } else {
        // user is not logged in
        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
      }
    }
  });
}]);


carbone.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  //$locationProvider.html5Mode(true);

  $stateProvider
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    });

  $urlRouterProvider.otherwise('/signin');
});
//
// Global place for creating, registering and retrieving Angular modules.
//
'use strict';

angular.module('carbone-vindaloo', [
  'ionic', 
  'config',
  'common.security', 
  'me',
  'inox',
  'carbone',
  'friends'])


.run(function($ionicPlatform) {
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
})

.run(['$rootScope', 'AUTH_EVENTS', 'AuthService',

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
}])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    // setup an abstract state for the tabs directive
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    });

  $urlRouterProvider.otherwise('/signin');
});


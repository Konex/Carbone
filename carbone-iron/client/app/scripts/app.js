'use strict';

angular.module('CarboneIron', ['ionic', 'config', 'CarboneIron.directives',
'CarboneIron.constants', 'CarboneIron.services', 'CarboneIron.controllers'])


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory
    // bar above the keyboard for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})


.run(function ($rootScope, AUTH_EVENTS, AuthService) {

  $rootScope.$on('$stateChangeStart', 
    function (event, toState, toParams, fromState, fromParams) {

    $rootScope.isSignInPage = (toState.url === '/sign-in'); 

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
})


.config(function($stateProvider, $urlRouterProvider, USER_ROLES) {

  $stateProvider
    .state('signin', {
      url: '/sign-in',
      templateUrl: 'templates/sign-in.html',
      controller: 'SignInCtrl',
      data: {
        authorizedRoles: [USER_ROLES.all]
      }
    })

    .state('createaccount', {
      url: '/create-account',
      templateUrl: 'templates/create-account.html',
      data: {
        authorizedRoles: [USER_ROLES.all]
      }
    })

    .state('forgotpassword', {
      url: '/forgot-password',
      templateUrl: 'templates/forgot-password.html',
      data: {
        authorizedRoles: [USER_ROLES.all]
      }
    })

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })


    // the pet tab has its own child nav-view and history
    .state('tab.pet-index', {
      url: '/pets',
      views: {
        'pets-tab': {
          templateUrl: 'templates/pet-index.html',
          controller: 'PetIndexCtrl'
        }
      },
      data: {
        authorizedRoles: [USER_ROLES.admin, USER_ROLES.member]
      }
    })

    .state('tab.pet-detail', {
      url: '/pet/:petId',
      views: {
        'pets-tab': {
          templateUrl: 'templates/pet-detail.html',
          controller: 'PetDetailCtrl'
        }
      },
      data: {
        authorizedRoles: [USER_ROLES.admin, USER_ROLES.member]
      }
    })

    .state('tab.adopt', {
      url: '/adopt',
      views: {
        'adopt-tab': {
          templateUrl: 'templates/adopt.html'
        }
      },
      data: {
        authorizedRoles: [USER_ROLES.admin, USER_ROLES.member]
      }
    })

    .state('tab.about', {
      url: '/about',
      views: {
        'about-tab': {
          templateUrl: 'templates/about.html'
        }
      },
      data: {
        authorizedRoles: [USER_ROLES.admin, USER_ROLES.member]
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/sign-in');
});

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
        if(window.cordova && window.cordova.plugins.Keyboard)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        
        if(window.StatusBar)
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
    });
});



carbone.factory('_', [
    '$window',
    function($window) {
        // place lodash include before angular
        return $window._;
    }
]);



carbone.run([
    '$rootScope',
    '$window', 

    function ($rootScope, $window) {
        $rootScope._ = $window._;
}]);



carbone.run(['$rootScope', 'AUTH_EVENTS', 'AuthService',

    function ($rootScope, AUTH_EVENTS, AuthService) {

    $rootScope.$on('$stateChangeStart', 
        function (event, toState, toParams, fromState, fromParams) {

        // TODO: this is to log a flag if user is navigating to signin page
        // then we don't pop up signin page again if their session expires or auth fails.
        // So maybe we should put it somewhere?    
        $rootScope.isSignInPage = (toState.url === '/signin'); 

        var accessLevel = toState.data.accessLevel;

        if (!AuthService.isAuthorized(accessLevel)) {
            event.preventDefault();
            
            if (AuthService.isAuthenticated())
                $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
            else 
                $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        }
    });
}]);


carbone.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
        .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'templates/tabs.html'
        });

    $urlRouterProvider.otherwise('/signin');
});
'use strict';

var inox = angular.module('inox', [
    'inox.controller'
]);

inox.config([
    '$stateProvider',
    '$urlRouterProvider',
    'USER_ROLES',

    function($stateProvider, $urlRouterProvider, USER_ROLES) {
        $stateProvider
        .state('tab.inox', {    
            url: '/inox',
            views: {
                'inox-tab': {
                    templateUrl: 'templates/features/inox/inox.html',
                    controller: 'InoxCtrl'
                }
            },
            data: {
                authorizedRoles: [USER_ROLES.member]
            }
        })      
    }
]);
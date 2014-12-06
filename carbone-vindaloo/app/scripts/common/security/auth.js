'use strict';

var auth = angular.module('common.security.auth', []);


auth.service('Session', function () {
    this.create = function (sessionId, userId, userRoles) {
        this.id = sessionId;
        this.userId = userId;
        this.userRoles = userRoles;
    };
    
    this.destroy = function () {
        this.id = null;
        this.userId = null;
        this.userRoles = null;
    };
    return this;
});



auth.config(function ($httpProvider) {
    $httpProvider.interceptors.push([
        '$injector',
        function ($injector) {
            return $injector.get('AuthInterceptor');
        }
    ]);
});



auth.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
    return {
        responseError: function (response) {
            $rootScope.$broadcast({
                401: AUTH_EVENTS.notAuthenticated,
                403: AUTH_EVENTS.notAuthorized,
                419: AUTH_EVENTS.sessionTimeout,
                440: AUTH_EVENTS.sessionTimeout
            } [response.status], response);
                
            return $q.reject(response);
        }
    };
});


auth.factory('AuthService', function ($http, Session) {
    var authService = {};

    authService.signin = function (credentials) {
        return $http
        .get('scripts/common/stubs/me/signin/data.json', credentials)
        .then(function (res) {
            Session.create(res.data.value[0].sessionId, res.data.value[0].id, res.data.value[0].roles);
            return res.data;
        });
    };

    authService.isAuthenticated = function () {
        return !!Session.userId;
    };

    authService.isAuthorized = function (accessLevel) {
        var accessMaskSum = 0;
        _.each(Session.userRoles, function(userRole) {
            accessMaskSum += userRole && accessLevel; 
        });

        return (authService.isAuthenticated() && accessMaskSum > 0); 
    };


    return authService;
});
'use strict';

var auth = angular.module('common.security.auth', []);

/**
 * Session service.
 */
auth.service('Session', function () {
  this.create = function (sessionId, userId, userRole) {
    this.id = sessionId;
    this.userId = userId;
    this.userRole = userRole;
  };
  this.destroy = function () {
    this.id = null;
    this.userId = null;
    this.userRole = null;
  };
  return this;
});


/**
 * Auth.
 */

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
      }[response.status], response);
      return $q.reject(response);
    }
  };
});


auth.factory('AuthService', function ($http, Session, USER_ROLES) {
  var authService = {};

  authService.signin = function (credentials) {
    return $http
      .get('scripts/common/stubs/me/signin/data.json', credentials)
      .then(function (res) {
        Session.create(res.data.value[0].sessionId, res.data.value[0].id,
                       res.data.value[0].role);
        return res.data;
      });
  };

  authService.isAuthenticated = function () {
    return !!Session.userId;
  };

  authService.isAuthorized = function (authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }

    if(authorizedRoles[0] == USER_ROLES.all) return true;

    // TODO: allow user with multiple roles.
    return (authService.isAuthenticated() &&
      authorizedRoles.indexOf(Session.userRole[0]) !== -1);
  };

  return authService;
});
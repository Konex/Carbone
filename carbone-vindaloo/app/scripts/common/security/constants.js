'use strict';

angular.module('common.security.constants', [])

.constant('AUTH_EVENTS', {
  signinSuccess: 'auth-login-success',
  signinFailed: 'auth-login-failed',
  signoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})

.constant('USER_ROLES', {
  all: '*',
  admin: 'admin',
  editor: 'editor',
  member: 'member',
  guest: 'guest'
});
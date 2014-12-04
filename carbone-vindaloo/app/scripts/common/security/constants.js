'use strict';

var securityConstants = angular.module('common.security.constants', [])

securityConstants.constant('AUTH_EVENTS', {
    signinSuccess: 'auth-login-success',
    signinFailed: 'auth-login-failed',
    signoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
});

securityConstants.constant('USER_ROLES', {
    all: '*',
    admin: 'admin',
    editor: 'editor',
    member: 'member',
    guest: 'guest'
});

securityConstants.constant('USER_ROLE_MASKS', {
    all: 1,
    member: 2,
    friend: 4,
    admin: 8
});

securityConstants.accessLevels = {
    ALL:     USER_ROLE_MASKS.all |
             USER_ROLE_MASKS.member |
             USER_ROLE_MASKS.friend |
             USER_ROLE_MASKS.admin,
    MEMBER:  USER_ROLE_MASKS.member |
             USER_ROLE_MASKS.admin, 
    FRIEND:  USER_ROLE_MASKS.friend |
             USER_ROLE_MASKS.admin,
    ADMIN:   USER_ROLE_MASKS.admin       
};
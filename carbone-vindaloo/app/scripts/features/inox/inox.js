'use strict';

var inox = angular.module('inox', [
  'inox.controller'
]);

inox.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('tab.inox', {
      url: '/inox',
      views: {
      'inox-tab': {
          templateUrl: 'templates/features/inox/inox.html',
          controller: 'InoxCtrl'
      }
    }
  })      
}]);
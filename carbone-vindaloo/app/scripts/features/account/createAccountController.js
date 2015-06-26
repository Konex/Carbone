'use strict';
var createAccountController = angular.module('createAccount.controller', []);

createAccountController.controller('CreateAccountCtrl', function($scope) {
	$scope.avatarClick = function () {
		angular.element(document.querySelector('#avatarSelector'))[0].click();;
	};  
});
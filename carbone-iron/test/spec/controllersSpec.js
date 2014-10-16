'use strict';

/* chai and mocha specs for controllers go here */
describe('CarboneIron controllers', function() {

  beforeEach(module('CarboneIron'));

  describe('Controller: PetIndexCtrl', function () {

    var should = chai.should();

    var PetIndexCtrl,
      scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      PetIndexCtrl = $controller('PetIndexCtrl', {
        $scope: scope
      });
    }));

    it('should attach a list of pets to the scope', function () {
      scope.pets.should.have.length(4);
    });

  });

});

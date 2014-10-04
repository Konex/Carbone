'use strict';

/* jasmine specs for controllers go here */
describe('CarboneIron controllers', function() {

  beforeEach(module('CarboneIron'));

  describe('SignInCtrl', function(){
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller){
      $httpBackend = _$httpBackend_;

      $httpBackend.when('GET', '/api/signin').
      respond([{userId: 'userX'}, {'token': 'xyz'}, {'message': ''}]);

      scope = $rootScope.$new();
      ctrl = $controller('SignInCtrl', {$scope: scope});

    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });


    // features
    it('should have a working SignInService service', inject(['SignInService',
      function(SignInService){
        expect(SignInService.isValidUsername).not.to.equal(null);


        // test cases - testing for success
        var validUsername = [
          'test@test.com',
          'test@test.co.uk',
          'test734ltylytkliytkryety9ef@jb-fe.com'
        ];

        // test cases - testing for failure
        var invalidUsername = [
          'test@testcom',
          'test@ test.co.uk',
          'ghgf@fe.com.co.',
          'tes@t@test.com',
          ''
        ];

        // you can loop through arrays of test cases like this
        for (var i in validUsername) {
          var valid = SignInService.isValidUsername(validUsername[i]);
          expect(valid).toBeTruthy();
        }
        for (var i in invalidUsername) {
          var valid = SignInService.isValidUsername(invalidUsername[i]);
          expect(valid).toBeFalsy();
        }
      }])
    );

    it('should get sign in success', inject(['SignInService',
      function(SignInService){

        $httpBackend.expect('POST', 'https://api.yiniski.com/signin')
          .respond(200, "[{ success : 'true', id : 123 }]");

        SignInService.login('test@test.com', 'password')
          .then(function(data) {
            expect(data.success).toBeTruthy();
        });

        $httpBackend.flush();
      }]));
  });


  describe('Controller: PetIndexCtrl', function () {

    var should = chai.should();

    // load the controller's module
    //beforeEach(module('CarboneIron'));

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

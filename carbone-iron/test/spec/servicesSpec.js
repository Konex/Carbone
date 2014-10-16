'use strict';

/* jasmine specs for services go here */
describe('SignInService', function() {
  var signInService, $httpBackend;

  beforeEach(module('CarboneIron'));

  beforeEach(inject(function(_signInService_, _$httpBackend_) {
    signInService = _signInService_;
    $httpBackend = _$httpBackend_;

    // define a general http mock here.
    $httpBackend.when('GET', '/api/auth')
      .respond([{userId: 'userX'}, {'token': 'xyz'}, {'message': ''}]);
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should get sign in successful', function() {
    $httpBackend.expect('GET', 'https://api.carboneiron.com/signin')
       .respond(200, "[{ success : 'true', id : 123 }]");

    signInService.signin('test@test.com', 'password')
       .then(function(data) {
         expect(data.success).toBeTruthy();
      });

    $httpBackend.flush();
  });

  it('should have a working SignInService service',
     inject(['SignInService', function(SignInService){
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

});

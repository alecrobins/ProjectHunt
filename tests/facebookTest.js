var Browser = require("zombie");
var assert = require('assert');
var request = require('superagent');
var expect = require('expect.js');

// var browser = new zombie.Browser({ debug: true });
Browser.localhost('example.com', 3000);
var browser = new Browser();

describe('Test Facebook Login', function(){

	// sign into facebook to create a session
	before(function() {
	 	browser.visit("http://localhost:3000/auth/facebook", function(err, browser, status) {
			browser
				.fill('#email', 'alecrobins@gmail.com')
				.fill('#pass', 'a119794a') // The password is correct, I'll change it when the issue is fixed
				.pressButton('#login_form input[type=submit]', function(err, browser, status) {
				   if(err) console.log(err.stack);
				   console.log(status);
				   console.log("Logged in Successfully");
				});
		});
	});

   it('should return the profile for alecrobins user', function(){
      request.get('http://localhost:3000/api/users/5654d8cc5dc498bd95514fe9').end(function(res){
    		expect(res).to.exist;
    		expect(res.status).to.equal(200);
    		done();
  		});
   }); 

});

describe('Test access to authorized info as non-authorized user', function(){

   it('should return the profile for alecrobins user', function(){
      request.get('http://localhost:3000/api/users/5654d8cc5dc498bd95514fe9').end(function(res){
    		expect(res).to.exist;
    		expect(res.status).to.equal(404);
    		done();
  		});
   }); 

});

describe('Test access to authorized info as non-authorized user', function(){
   it('should return the profile for alecrobins user', function(){
      request.get('http://localhost:3000/api/users/5654d8cc5dc498bd95514fe9').end(function(res){
        expect(res).to.exist;
        expect(res.status).to.equal(404);
        done();
      });
   }); 
});
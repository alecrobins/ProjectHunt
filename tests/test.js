var assert = require('assert');
var request = require('superagent');
var expect = require('expect.js');

describe('String#split', function(){
   it('should return an array', function(){
      assert(Array.isArray('a,b,c'.split(',')))
   }); 


   it('should return the same array', function(){
		assert.equal(['a','b','c'].length, 'a,b,c'.split(',').length, 'arrays have equal length');
		for (var i=0; i<['a','b','c'].length; i++) {
			assert.equal(['a','b','c'][i], 'a,b,c'.split(',')[i], i +'element is equal');
		};
  	});

   it ('should return status code of 200', function(done){
  		request.get('http://localhost:3000/api/test').end(function(res){
    		expect(res).to.exist;
    		done();
  		});
	});
});
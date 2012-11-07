var every = require('../fluent-time.js').every;
require('should');

describe("Interval", function() {

  describe("#cancel", function() {

    it("cancels the interval", function(done) {
      var counter = 0;
      
      every(10).milliseconds(function() {
        counter++;
      })
        .cancel();

      done();
    });

  });

  it("provides a counter to callback", function(done) {
    var counter = 0;

    every(10).milliseconds(function(times) {
      counter++;
      counter.should.equal(times);
    });

    done();
  });

});
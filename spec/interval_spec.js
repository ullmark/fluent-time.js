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

      setTimeout(function() {
        counter.should.equal(0);
        done();
      }, 15);
    });

  });

  it("executes the function on the provided interval", function(done) {
    var counter = 0;
    var interval = every(100).milliseconds(function() {
      counter++;
    });

    // after 350ms it should have executed three times...
    setTimeout(function() {
      interval.cancel();
      counter.should.equal(3);
      done();
    }, 350);
  });

  it("provides correct amount of times executed to callback", function(done) {
    var counter = 0;
    var interval = every(10).milliseconds(function(times) {
      counter++;
      counter.should.equal(times);
    });

    setTimeout(function() {
      interval.cancel();
      counter.should.equal(5);
      done();
    }, 55);
  });

});

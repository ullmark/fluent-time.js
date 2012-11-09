var every = require('../fluent-time.js').every;
require('should');

describe("Interval", function() {

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
    var interval = every(100).milliseconds(function(interval) {
      counter++;
      counter.should.equal(interval.times);
    });

    setTimeout(function() {
      interval.cancel();
      counter.should.equal(5);
      done();
    }, 550);
  });

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

  describe("#skip", function() {

    it("causes the function not to be executed the amount of times provided", function(done) {
      var counter = 0;
      every(50).milliseconds(function(interval) {
        counter++;

        // the second time it's been executed
        if (interval.times === 2) {
          // skip the next two intervals
          interval.skip(2);
        }

        // the tenth time, cancel the inteval
        if (interval.times === 10) {
          interval.cancel();
        }
      });

      // wait 800 ms, then the interval should have been hit 10 times. (since it was canceled after that)
      // but the counter should have only been increased 8 times.
      setTimeout(function() {
        counter.should.equal(8);
        done();
      }, 800);
    });

  });


});

var amd       = typeof(require) !== 'undefined',
    every     = amd ? require('../fluent-time.js').every : FluentTime.every,
    expect    = amd ? require('chai').expect : chai.expect;

describe("Interval", function() {

  it("executes the function on the provided interval", function(done) {
    var counter = 0;
    var interval = every(100).milliseconds(function() {
      counter++;
    });

    // after 350ms it should have executed three times...
    setTimeout(function() {
      interval.cancel();
      console.log(counter);
      expect(counter).to.equal(3);
      done();
    }, 350);
  });

  it("provides correct amount of times executed to callback", function(done) {
    var counter = 0;
    var interval = every(100).milliseconds(function(interval) {
      counter++;
      expect(counter).to.equal(interval.times);
    });

    setTimeout(function() {
      interval.cancel();
      expect(counter).to.equal(5);
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
        expect(counter).to.equal(0);
        done();
      }, 15);
    });
  });

  describe("#skip", function() {

    it("defaults to one skip if no number was provided", function(done) {
      var counter = 0;
      every(100).milliseconds(function(interval) {
        counter++;
        if (interval.times === 1) {
          interval.skip();
        }
      });

      // wait 750 ms, since we skipped the second execution and it runs
      // every 100 ms the counter should have been increased to 6
      setTimeout(function() {
        expect(counter).to.equal(6);
        done();
      }, 750);
    });

    it("causes the function not to be executed the amount of times provided", function(done) {
      var counter = 0;
      every(100).milliseconds(function(interval) {
        counter++;

        // the second time it's been executed
        if (interval.times === 2) {
          // skip the next two intervals
          interval.skip(3);
        }
      });

      // wait 800 ms, then the counter should have been increased 4 times. Because:
      // In 800ms the function will be called 7 times but we skip 3.
      setTimeout(function() {
        expect(counter).to.equal(4);
        done();
      }, 800);
    });

  });


});

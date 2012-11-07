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
      }, 110);
    });

  });

  it("provides a counter to callback");

});

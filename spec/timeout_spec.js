var after = require('../fluent-time.js').after;
require('should');

describe("Timeout", function() {

  it("executes the callback", function(done) {
    var wasExecuted = false;
    after(10).milliseconds(function() {
      wasExecuted = true;
    });

    setTimeout(function() {
      wasExecuted.should.equal(true);
      done();
    }, 15);
  });

  describe("#cancel", function() {

    it("stops the execusion", function(done) {
      var wasExecuted = false;
      var timeout = after(30).milliseconds(function() {
        wasExecuted = true;
      });

      setTimeout(function() {
        timeout.cancel();
        wasExecuted.should.equal(false);
        done();
      }, 10);
    });

    it("doesn't throw when canceling multiple times", function(done) {
      var timeout = after(10).milliseconds(function() {});
      (function() {
        timeout.cancel();
        timeout.cancel();
      }).should.not.throw();
      done();
    });

  });

});

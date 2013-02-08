var amd       = typeof(require) !== 'undefined';
var afters    = amd ? require('../fluent-time.js').after : FluentTime.after;
var expect    = amd ? require('chai').expect : chai.expect;

describe("Timeout", function() {

  it("executes the callback", function(done) {
    var wasExecuted = false;
    afters(10).milliseconds(function() {
      wasExecuted = true;
    });

    setTimeout(function() {
      expect(wasExecuted).to.be.true;
      done();
    }, 15);
  });

  describe("#cancel", function() {

    it("stops the execusion", function(done) {
      var wasExecuted = false;
      var timeout = afters(30).milliseconds(function() {
        wasExecuted = true;
      });

      setTimeout(function() {
        timeout.cancel();
        expect(wasExecuted).to.be.false;
        done();
      }, 10);
    });

    it("doesn't throw when canceling multiple times", function(done) {
      var timeout = afters(10).milliseconds(function() {});
      expect(function() {
        timeout.cancel();
        timeout.cancel();
        setTimeout(function() {
          done();
        }, 0);
      }).to.not.throw();
    });

  });

});

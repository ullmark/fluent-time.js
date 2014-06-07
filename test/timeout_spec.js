
describe("Timeout", function() {

  var after = FluentTime.after;

  beforeEach(function() {
    this.sandbox = sinon.sandbox.create();
    this.sandbox.useFakeTimers();
    this.cb = this.sandbox.stub();
  });

  it("executes the callback", function() {
    after(10).milliseconds(this.cb);

    this.sandbox.clock.tick(10);
    expect(this.cb).to.be.called;
  });

  describe("#cancel", function() {

    it("stops the execusion", function() {
      after(30).milliseconds(this.cb).cancel();

      this.sandbox.clock.tick(30);
      expect(this.cb).to.not.be.called;
    });

    it("doesn't throw when canceling multiple times", function() {
      expect(function() {
        after(10).milliseconds(this.cb).cancel().cancel();
      }).to.not.throw();
    });

  });

  afterEach(function() {
    this.sandbox.restore();
  });

});

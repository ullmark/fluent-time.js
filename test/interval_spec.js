
describe("Interval", function() {

  var every = FluentTime.every;

  beforeEach(function() {
    this.sandbox = sinon.sandbox.create();
    this.sandbox.useFakeTimers();
    this.cb = this.sandbox.stub();
  });

  it("executes the function on the provided interval", function() {
    every(100).milliseconds(this.cb);

    this.sandbox.clock.tick(350);
    expect(this.cb).callCount(3);
  });

  it("is possible to run multiple intervals at the same time", function() {
    var cb2 = this.sandbox.stub();

    every(50).milliseconds(this.cb);
    every(100).milliseconds(cb2);

    this.sandbox.clock.tick(1000);
    expect(this.cb).callCount(20);
    expect(cb2).callCount(10);
  });

  it("provides correct amount of times executed to callback", function() {
    var interval = every(100).milliseconds(this.cb);

    this.sandbox.clock.tick(550);
    expect(interval.times).to.eql(5);
  });

  describe("#cancel", function() {

    it("cancels the interval", function() {
      every(10).milliseconds(this.cb).cancel();
      this.sandbox.clock.tick(1000);
      expect(this.cb).callCount(0);
    });
  });

  describe("#skip", function() {

    it("defaults to one skip if no number was provided", function() {
      var cb = sinon.spy(function(interval) {
        if (interval.times === 1) { interval.skip(); }
      });

      every(100).milliseconds(cb);
      this.sandbox.clock.tick(750);
      expect(cb).callCount(6);
    });

    it("causes the callback not to be executed the amount of times provided", function() {
      var cb = sinon.spy(function(interval) {
        if (interval.times === 2) { interval.skip(3); }
      });

      every(100).milliseconds(cb);
      // 800ms has passed, so it should have been executed 8 times, but we skipped three so five
      this.sandbox.clock.tick(800);
      expect(cb).callCount(5);
    });

  });

  afterEach(function() {
    this.sandbox.restore();
  });

});

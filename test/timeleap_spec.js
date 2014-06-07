
describe("TimeLeap", function() {

  var TimeLeap = FluentTime.TimeLeap;

  it("calculates correct on milliseconds", function() {
    expect(new TimeLeap(10).milliseconds().ms).to.equal(10);
    expect(new TimeLeap(15).milliseconds().ms).to.equal(15);
  });

  it("calculates correct on seconds", function() {
    expect(new TimeLeap(10).seconds().ms).to.equal(10000);
    expect(new TimeLeap(15).seconds().ms).to.equal(15000);
  });

  it("calculates correct on minutes", function() {
    expect(new TimeLeap(1).minutes().ms).to.equal(60000);
    expect(new TimeLeap(7).minutes().ms).to.equal(420000);
  })

  it("calculates correct on hours", function() {
    expect(new TimeLeap(3).hours().ms).to.equal(10800000);
    expect(new TimeLeap(5).hours().ms).to.equal(18000000);
  });

  it("calculates correct on days", function() {
    expect(new TimeLeap(3).days().ms).to.equal(259200000);
    expect(new TimeLeap(5).days().ms).to.equal(432000000);
  });

  it("combines correct", function() {
    expect(new TimeLeap(3).hours().and(4).minutes().ms).to.equal(11040000);
    expect(new TimeLeap(3).hours().and(4).minutes().and(5).seconds().ms).to.equal(11045000);
  });

  it("calculates the leap occurance correctly", function() {
    var now = new Date(Date.now());
    var timeLeap = new TimeLeap(2).hours();
    var diff = timeLeap.occurs() - now;
    // we need check with a span since the EXACT ms can differ
    // depending on cpu speed etc...
    expect(diff).to.be.within(7199000, 7200100);
  });

});

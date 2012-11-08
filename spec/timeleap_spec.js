var FluentTime = require('../fluent-time.js');
require('should');

describe("TimeLeap", function() {

  it("calculates correct on milliseconds", function() {
    new FluentTime.TimeLeap(10).milliseconds().ms.should.equal(10);
    new FluentTime.TimeLeap(15).milliseconds().ms.should.equal(15);
  });

  it("calculates correct on seconds", function() {
    new FluentTime.TimeLeap(10).seconds().ms.should.equal(10000);
    new FluentTime.TimeLeap(15).seconds().ms.should.equal(15000);
  });

  it("calculates correct on minutes", function() {
    new FluentTime.TimeLeap(1).minutes().ms.should.equal(60000);
    new FluentTime.TimeLeap(7).minutes().ms.should.equal(420000);
  })

  it("calculates correct on hours", function() {
    new FluentTime.TimeLeap(3).hours().ms.should.equal(10800000);
    new FluentTime.TimeLeap(5).hours().ms.should.equal(18000000);
  });

  it("calculates correct on days", function() {
    new FluentTime.TimeLeap(3).days().ms.should.equal(259200000);
    new FluentTime.TimeLeap(5).days().ms.should.equal(432000000);
  });

  it("combines correct", function() {
    new FluentTime.TimeLeap(3).hours().and(4).minutes()
      .ms.should.equal(11040000);

    new FluentTime.TimeLeap(3).hours().and(4).minutes().and(5).seconds()
      .ms.should.equal(11045000);
  });

});

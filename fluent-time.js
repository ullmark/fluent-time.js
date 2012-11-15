
(function () {

  'use strict';

  // ### extends
  // a simple prototype *extender*
  var __extends = function(parent, child) {
    for(var key in parent.prototype) {
      child.prototype[key] = parent.prototype[key];
    }
  };

  // Fluent Time
  // ------------
  // our main object that exposes the starting points
  // of the fluent api.

  var FluentTime = {
    every: function(leap) {
      return new FluentTime.Interval(leap);
    },

    after: function(leap) {
      return new FluentTime.TimeOut(leap);
    }
  };

  // TimeLeap
  // --------
  // 

  FluentTime.TimeLeap = function(leap) {
    this.leap = leap;
    this.ms = 0;
  };

  // ### days

  FluentTime.TimeLeap.prototype.days = function(fn) {
    this.ms += this.leap * 86400000;
    this.leap = 0;
    this.finalizeIfCallback(fn);
    return this;
  };

  // ### hours
  FluentTime.TimeLeap.prototype.hours = function(fn) {
    this.ms += this.leap * 3600000;
    this.leap = 0;
    this.finalizeIfCallback(fn);
    return this;
  };

  // ### minutes
  FluentTime.TimeLeap.prototype.minutes = function(fn) {
    this.ms += this.leap * 60000;
    this.leap = 0;
    this.finalizeIfCallback(fn);
    return this;
  };

  // ### seconds
  FluentTime.TimeLeap.prototype.seconds = function(fn) {
    this.ms += this.leap * 1000;
    this.leap = 0;
    this.finalizeIfCallback(fn);
    return this;
  };

  // ### milliseconds
  FluentTime.TimeLeap.prototype.milliseconds = function(fn) {
    this.ms += this.leap;
    this.leap = 0;
    this.finalizeIfCallback(fn);
    return this;
  };

  // ### and
  FluentTime.TimeLeap.prototype.and = function(leap) {
    this.leap = leap;
    return this;
  };

  // ### finalizeIfCallback
  FluentTime.TimeLeap.prototype.finalizeIfCallback = function(fn) {
    if (fn && typeof(fn) === 'function') {
      this.schedule(fn, this.ms);
    }
  };

  // ### occurs
  // returns a `Date` object representing when the current leap
  // will occur
  FluentTime.TimeLeap.prototype.occurs = function() {
    return new Date(Date.now() + this.ms);
  };

  // ### schedule
  // this is an empty schedule function that will be overriden in
  // replaced in `TimeOut` and `Interval`.
  FluentTime.TimeLeap.prototype.schedule = function(fn) {};

  // TimeOut
  // -------

  FluentTime.TimeOut = function(leap){
    FluentTime.TimeLeap.apply(this, arguments);
  };

  __extends(FluentTime.TimeLeap, FluentTime.TimeOut);

  // ### schedule
  FluentTime.TimeOut.prototype.schedule = function(fn, timout) {
    var _this = this;
    this.timeout = setTimeout(function() {
      fn(_this);
    }, this.ms);
  };

  // ### cancel
  FluentTime.TimeOut.prototype.cancel = function() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  };

  // Interval
  // --------

  FluentTime.Interval = function(val) {
    FluentTime.TimeOut.apply(this, arguments);
    this.times = 0;
    this.skippingNext = 0;
  };

  __extends(FluentTime.TimeOut, FluentTime.Interval);

  // ### schedule
  // executes and schedules next occurance of the func.
  FluentTime.Interval.prototype.schedule = function(fn, timeout) {
    var _this = this;

    this.timeout = setTimeout(function() {
      // increase the number of times the interval has occured.
      _this.times++;
      // we keep track of when the timeout was executed.
      var pre = Date.now();
      // only run the code
      // when not supposed to skip.
      if (!_this.skippingNext) {
        fn(_this);
      } 

      // decrease the skip amount
      else {
        _this.skippingNext--;
      }

      // calculate when the function should be run the next time, taking into account
      // the time it took to run the function...
      var nextOccurrance = Math.max(0, (_this.ms - (Date.now() - pre)));
      // ... then use that number to schedule the next.
      _this.schedule(fn, nextOccurrance);
    }, timeout);
  };

  // ### skip
  FluentTime.Interval.prototype.skip = function(number) {
    if (typeof(number) === 'undefined') {
      number = 1;
    }

    if (typeof(number) !== 'number' || number < 1) {
      throw new Error('You must provide a non negative number');
    }

    this.skippingNext += number;
    return this;
  };

  if (module && module.exports) {
    module.exports = FluentTime;
  }

  else {
    window.FluentTime = FluentTime;
  }

}());

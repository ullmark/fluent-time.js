
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
  // ---------
  // Contains the calculations that transforms to *milliseconds* from
  // whatever time measurement that have been used.

  FluentTime.TimeLeap = function(leap) {
    this.leap = leap;
    this.ms = 0;
  };

  // ### days
  // appends the previous leap amount as *days*.
  FluentTime.TimeLeap.prototype.days = function(fn) {
    this.ms += this.leap * 86400000;
    this.leap = 0;
    this.finalizeIfCallback(fn);
    return this;
  };

  // ### hours
  // appends the previous leap amount as *hours*.
  FluentTime.TimeLeap.prototype.hours = function(fn) {
    this.ms += this.leap * 3600000;
    this.leap = 0;
    this.finalizeIfCallback(fn);
    return this;
  };

  // ### minutes
  // appends the previous leap amount as *minutes*
  FluentTime.TimeLeap.prototype.minutes = function(fn) {
    this.ms += this.leap * 60000;
    this.leap = 0;
    this.finalizeIfCallback(fn);
    return this;
  };

  // ### seconds
  // appends the previous leap amount as *seconds*
  FluentTime.TimeLeap.prototype.seconds = function(fn) {
    this.ms += this.leap * 1000;
    this.leap = 0;
    this.finalizeIfCallback(fn);
    return this;
  };

  // ### milliseconds
  // appends the previous leap amount as *milliseconds*
  FluentTime.TimeLeap.prototype.milliseconds = function(fn) {
    this.ms += this.leap;
    this.leap = 0;
    this.finalizeIfCallback(fn);
    return this;
  };

  // ### and
  // chains a new time leap to the total timeout.
  FluentTime.TimeLeap.prototype.and = function(leap) {
    this.leap = leap;
    return this;
  };

  // ### finalizeIfCallback
  // finalizes the leap if the a callback function is provided.
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

  // The Timeout represents a *once* call of the provided callback.
  // replaces `setTimout`

  FluentTime.TimeOut = function(leap){
    FluentTime.TimeLeap.apply(this, arguments);
  };

  __extends(FluentTime.TimeLeap, FluentTime.TimeOut);

  // ### schedule
  // schedules execution of the provided function in the
  // previously counted milliseconds.
  FluentTime.TimeOut.prototype.schedule = function(fn) {
    var _this = this;
    this.timeout = setTimeout(function() {
      fn(_this);
    }, this.ms);
  };

  // ### cancel
  // cancels the execution of timeout.
  FluentTime.TimeOut.prototype.cancel = function() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  };

  // Interval
  // --------

  // Helps sceduling a callback to be executed at an interval. Replaces
  // `setInterval`.

  FluentTime.Interval = function(val) {
    FluentTime.TimeOut.apply(this, arguments);
    this.times = 0;
    this.skippingNext = 0;
  };

  __extends(FluentTime.TimeOut, FluentTime.Interval);

  // ### schedule
  // executes (if no skip is assigned) and schedules next occurance of the func.
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
  // Skips the following **number** times of execution.
  // example:
  //
  //     every(10).seconds(function(interval) {
  //       // the 10:th time the code executes
  //       // skip the following 5 times.
  //       if (interval.times === 10) {
  //         interval.skip(5);
  //       }
  //
  //       // your interval code...
  //     });
  //
  FluentTime.Interval.prototype.skip = function(number) {
    if (typeof(number) === 'undefined') {
      number = 1;
    }

    else if (typeof(number) !== 'number' || number < 1) {
      throw new Error('You must provide a non negative number');
    }

    this.skippingNext += number;
    return this;
  };

  // In an **AMD** module environment like node.js or when require.js
  // exist
  if (module && module.exports) {
    module.exports = FluentTime;
  }

  // else just append it to the window
  else {
    window.FluentTime = FluentTime;
  }

}());

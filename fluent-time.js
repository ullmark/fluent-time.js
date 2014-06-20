
// Fluent Time
// ------------



// umd-module definition
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  }
  else if (typeof exports === 'object') {
    module.exports = factory();
  }
  else {
    root.FluentTime = factory();
  }
}(this, function() {

  'use strict';

  // ### extend
  var __extend = function() {
    var args = Array.prototype.slice.call(arguments);
    var target = args[0];
    var extenders = args.slice(1);
    for(var i=0; i< extenders.length; i++) {
      for(var key in extenders) {
        target[key] = extenders[i][key];
      }
    }
  };

  // TimeLeap
  // ---------
  // Contains the calculations that transforms to *milliseconds* from
  // whatever time measurement that have been used.

  var TimeLeap = function(leap) {
    this.leap = leap || 1;
    this.ms = 0;
  };

  __extend(TimeLeap.prototype, {

    // ### days
    // appends the previous leap amount as *days*.
    days: function(fn) {
      this.ms += this.leap * 86400000;
      this.leap = 0;
      this.finalizeIfCallback(fn);
      return this;
    },

    // ### day
    // alias for *days*.
    day: function(fn) {
      return this.days(fn);
    },

    // ### hours
    // appends the previous leap amount as *hours*.
    hours: function(fn) {
      this.ms += this.leap * 3600000;
      this.leap = 0;
      this.finalizeIfCallback(fn);
      return this;
    },

    // ### hour
    // alias for *hours*.
    hour: function(fn) {
      return this.hours(fn);
    },

    // ### minutes
    // appends the previous leap amount as *minutes*
    minutes: function(fn) {
      this.ms += this.leap * 60000;
      this.leap = 0;
      this.finalizeIfCallback(fn);
      return this;
    },

    // ### minute
    // alias for *minutes*.
    minute: function(fn) {
      return this.minutes(fn);
    },

    // ### seconds
    // appends the previous leap amount as *seconds*
    seconds: function(fn) {
      this.ms += this.leap * 1000;
      this.leap = 0;
      this.finalizeIfCallback(fn);
      return this;
    },

    // ### second
    // alias for *seconds*.
    second: function(fn) {
      return this.seconds(fn);
    },

    // ### milliseconds
    // appends the previous leap amount as *milliseconds*
    milliseconds: function(fn) {
      this.ms += this.leap;
      this.leap = 0;
      this.finalizeIfCallback(fn);
      return this;
    },

    // ### millisecond
    // alias for *millisecond*.
    millisecond: function(fn) {
      return this.milliseconds(fn);
    },

    // ### and
    // chains a new time leap to the total timeout.
    and: function(leap) {
      this.leap = leap;
      return this;
    },

    // ### finalizeIfCallback
    // finalizes the leap if the a callback function is provided.
    finalizeIfCallback: function(fn) {
      if (fn && typeof(fn) === 'function') {
        this.schedule(fn, this.ms);
      }
    },

    // ### occurs
    // returns a `Date` object representing when the current leap
    // will occur
    occurs: function() {
      return new Date(Date.now() + this.ms);
    },

    // ### schedule
    // this is an empty schedule function that will be overriden in
    // replaced in `TimeOut` and `Interval`.
    schedule: function(fn) {}

  });


  // TimeOut
  // -------

  // The Timeout represents a *once* call of the provided callback.
  // replaces `setTimout`

  var TimeOut = function(){
    TimeLeap.apply(this, arguments);
  };

  __extend(TimeOut.prototype, TimeLeap.prototype, {

    // ### schedule
    // schedules execution of the provided function in the
    // previously counted milliseconds.
    schedule: function(fn) {
      var _this = this;
      this.timeout = setTimeout(function() {
        fn(_this);
      }, this.ms);
    },

    // ### cancel
    // cancels the execution of timeout.
    cancel: function() {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      return this;
    }

  });


  // Interval
  // --------

  // Helps sceduling a callback to be executed at an interval. Replaces
  // `setInterval`.

  var Interval = function() {
    TimeOut.apply(this, arguments);
    this.times = 0;
    this.skippingNext = 0;
  };

  __extend(Interval.prototype, Timeout.prototype, {

    // ### schedule
    // executes (if no skip is assigned) and schedules next occurance of the func.
    schedule: function(fn, timeout) {
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
    },

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
    skip: function(number) {
      if (typeof(number) === 'undefined') {
        number = 1;
      }

      else if (typeof(number) !== 'number' || number < 1) {
        throw new Error('You must provide a non negative number');
      }

      this.skippingNext += number;
      return this;
    }
  });

  // our exported object.
  return {
    every: function(leap) {
      return new Interval(leap);
    },

    after: function(leap) {
      return new TimeOut(leap);
    },

    Interval: Interval,
    TimeOut: TimeOut,
    TimeLeap: TimeLeap
  };

}));

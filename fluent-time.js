
(function () {

  'use strict';

  // Fluent Time
  // ------------

  var FluentTime = {
    every: function(val) {
      return new FluentTime.Interval(val);
    },

    after: function(val) {
      return new FluentTime.TimeOut(val);
    }
  };

  // TimeLeap
  // --------

  FluentTime.TimeLeap = function(val) {
    this.leap = val;
    this.ms = 0;
  };

  // ### hours
  FluentTime.TimeLeap.prototype.hours = function(fn) {
    this.ms += this.leap * 3600000;
    return this;
  };

  // ### minutes
  FluentTime.TimeLeap.prototype.minutes = function(fn) {
    this.ms += this.leap * 60000;
    return this;
  };

  // ### seconds
  FluentTime.TimeLeap.prototype.seconds = function(fn) {
    this.ms += this.leap * 1000;
    return this;
  };

  FluentTime.TimeLeap.prototype.milliseconds = function(fn) {
    this.ms += this.leap;
    return this;
  };

  FluentTime.TimeLeap.prototype.and = function(val) {
    this.leap = val;
    return this;
  };

  // Interval
  // --------

  FluentTime.Interval = function(val) {

  };

  // TimeOut
  // -------

  FluentTime.TimeOut = function(val){

  };

  FluentTime.TimeOut.prototype.cancel = function() {

  };

  if (module && module.exports) {
    module.exports = FluentTime;
  } 

  else {
    window.FluentTime = FluentTime;
  }

}());
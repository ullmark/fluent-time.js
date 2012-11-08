
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

  FluentTime.TimeLeap = function(leap) {
    this.leap = leap;
    this.ms = 0;
  };

  // ### days
  FluentTime.TimeLeap.prototype.days = function(fn) {
    this.ms += this.leap * 86400000;
    return this;
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

  // ### milliseconds
  FluentTime.TimeLeap.prototype.milliseconds = function(fn) {
    this.ms += this.leap;
    return this;
  };

  // ### and
  FluentTime.TimeLeap.prototype.and = function(leap) {
    this.leap = leap;
    return this;
  };

  // TimeOut
  // -------

  FluentTime.TimeOut = function(leap){

  };

  __extends(FluentTime.TimeLeap, FluentTime.TimeOut);

  FluentTime.TimeOut.prototype.cancel = function() {

  };

  // Interval
  // --------

  FluentTime.Interval = function(val) {

  };

  __extends(FluentTime.TimeOut, FluentTime.Interval);

  FluentTime.Interval.prototype.nextScheduled = function() {

  };

  FluentTime.Interval.prototype.cancelAll = function() {

  };

  FluentTime.Interval.prototype.cancelNext = function() {

  };

  if (module && module.exports) {
    module.exports = FluentTime;
  }

  else {
    window.FluentTime = FluentTime;
  }

}());

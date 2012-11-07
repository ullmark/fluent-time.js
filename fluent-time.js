
(function () {

  'use strict';

  // Fluent Time
  // ------------

  var FluentTime = {

    VERSION: "0.0.1",

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

  FluentTime.TimeLeap.prototype.and = function(leap) {
    this.leap = leap;
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
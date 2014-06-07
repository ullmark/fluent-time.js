// Karma configuration
// Generated on Sat Jun 07 2014 17:10:07 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai', 'sinon', 'chai-sinon'],
    files: [
      'fluent-time.js',
      'test/**/*.js'
    ],
    exclude: [],
    preprocessors: {},
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true
  });
};

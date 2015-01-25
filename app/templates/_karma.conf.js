var webpackConfig = require('./webpack.config.js');
webpackConfig.watch = false;
webpackConfig.devtool = 'inline-source-map';

var path = require('path');
var testsIndex = path.join(__dirname, '<%= staticPath %>/js/tests/test_index.js');
var preprocessors = {};
preprocessors[testsIndex] = ['webpack', 'sourcemap'];

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine-ajax', 'jasmine'],

    // list of files / patterns to load in the browser
    files: [
      testsIndex
    ],

    // Allow us some time to build the sourcemaps.
    browserNoActivityTimeout: 20000,

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: preprocessors,

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    webpack: webpackConfig,

    webpackServer: {
        noInfo: true
    },

    singleRun: true,
    autoWatch: false,
  });
};

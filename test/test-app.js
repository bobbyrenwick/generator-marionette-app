'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('marionette-app:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({
        'skip-install': true
      })
      .withPrompt({
        'appName': 'Bobby',
        'staticPath': 'static',
        'publicPath': 'static',
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'package.json',
      '.editorconfig',
      '.jshintrc',
      'karma.conf.js',
      'webpack.config.js',
      'Gruntfile.js',
      'static/index.html',
      'static/js/app.js',
      'static/js/main.js',
      'static/js/tests/test_index.js',
      'static/js/tests/initial_test.js',
      'static/styles/main.less',
      'static/styles/normalize.less',
    ]);
  });
});

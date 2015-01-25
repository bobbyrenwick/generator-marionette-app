'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the wonderful ' + chalk.red('MarionetteApp') + ' generator!'
    ));

    var prompts = [
      {
        name: 'appName',
        message: 'Whats the name of your app?'
      },
      {
        name: 'staticPath',
        message: 'Relative to the project root where are your static files?',
        default: 'static'
      },
      {
        name: 'publicPath',
        message: 'Relative to the base URL, where will you serve your static files from?',
        default: 'static',
      }
    ];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;
      this.staticPath = props.staticPath;
      this.publicPath = props.publicPath;

      done();
    }.bind(this));
  },

  _getStaticPath: function(furtherPath) {
    return this.staticPath + '/' + furtherPath;
  },

  writing: function() {
      var templateContext = {
        appName: this.appName,
        staticPath: this.staticPath,
        publicPath: this.publicPath,
      };

      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        templateContext
      );

      this.fs.copyTpl(
        this.templatePath('_Gruntfile.js'),
        this.destinationPath('Gruntfile.js'),
        templateContext
      );

      this.fs.copyTpl(
        this.templatePath('_webpack.config.js'),
        this.destinationPath('webpack.config.js'),
        templateContext
      );

      this.fs.copyTpl(
        this.templatePath('_karma.conf.js'),
        this.destinationPath('karma.conf.js'),
        templateContext
      );

      this.fs.copyTpl(
        this.templatePath('_index.html'),
        this.destinationPath(this._getStaticPath('index.html')),
        templateContext
      );

      this.fs.copy(
        this.templatePath('js/app.js'),
        this.destinationPath(this._getStaticPath('js/app.js'))
      );

      this.fs.copy(
        this.templatePath('js/main.js'),
        this.destinationPath(this._getStaticPath('js/main.js'))
      );

      this.fs.copy(
        this.templatePath('js/tests/test_index.js'),
        this.destinationPath(this._getStaticPath('js/tests/test_index.js'))
      );

      this.fs.copy(
        this.templatePath('js/tests/initial_test.js'),
        this.destinationPath(this._getStaticPath('js/tests/initial_test.js'))
      );

      this.fs.copy(
        this.templatePath('styles/normalize.less'),
        this.destinationPath(this._getStaticPath('styles/normalize.less'))
      );

      this.fs.copy(
        this.templatePath('styles/main.less'),
        this.destinationPath(this._getStaticPath('styles/main.less'))
      );

      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );

      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
  },

  install: function () {
    this.npmInstall([
      'backbone.marionette',
      'backbone.select',
      'lodash',
      'traceur-loader',
      'handlebars-loader',
      'style-loader',
      'css-loader',
      'less-loader',
      'handlebars@^1.3.0', // needed because handlebars-loader doesn't yet support v2
      'jquery',
      'grunt-webpack',
      'grunt-contrib-jshint',
      'grunt-contrib-clean',
      'grunt-newer',
      'load-grunt-tasks',
      'extract-text-webpack-plugin',
      'grunt-karma',
      'karma',
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-jasmine-ajax',
      'karma-phantomjs-launcher',
      'karma-sourcemap-loader',
      'karma-webpack'
    ], { save: true });
  }
});

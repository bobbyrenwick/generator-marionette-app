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

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
    },

    scaffold: function() {
      this.fs.copyTpl(
        this.templatePath('_index.html'),
        this.destinationPath(this._getStaticPath('index.html')),
        {
          appName: this.appName,
          staticPath: this.staticPath,
          publicPath: this.publicPath,
        }
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
        this.templatePath('styles/normalize.css'),
        this.destinationPath(this._getStaticPath('styles/normalize.css'))
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    },

    gruntfile: function () {
      this.gruntfile.registerTask('lint', ['newer:jshint:all']);
    }
  },

  install: function () {
    this.npmInstall([
      'backbone.marionette',
      'backbone.select',
      'es6-loader',
      'handlebars',
      'jquery',
      'grunt-webpack',
      'grunt-contrib-jshint',
      'grunt-newer',
    ], { save: true });
  }
});

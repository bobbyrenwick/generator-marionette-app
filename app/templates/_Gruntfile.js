var path = require('path');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');

module.exports = function(grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: {
                src: path.join(__dirname, '<%= staticPath %>/js/**/*.js')
            }
        },
        clean: [path.join(__dirname, '<%= staticPath %>/dist/**/*')],
        webpack: {
            options: webpackConfig,
            dev: {
                cache: true,
                debug: true,
                failOnError: false, // don't report error to grunt if webpack find errors
                // Use this if webpack errors are tolerable and grunt should continue

                watch: true, // use webpacks watcher
                // You need to keep the grunt process alive

                keepalive: true, // don't finish the grunt task
                // Use this in combination with the watch option
            },
            prod: {
                plugins: webpackConfig.plugins.concat(
                    new webpack.optimize.OccurenceOrderPlugin(),
                    new webpack.optimize.DedupePlugin(),
                    new webpack.optimize.UglifyJsPlugin()
                )
            }
        }
    });

    grunt.registerTask('lint', ['newer:jshint:all']);
    grunt.registerTask('dev', ['clean', 'webpack:dev']);
    grunt.registerTask('build', ['webpack:prod']);
};
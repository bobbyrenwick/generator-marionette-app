'use strict';

var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, '<%= staticPath %>/js/main.js'),

    output: {
        path: path.join(__dirname, '<%= staticPath %>/dist/'),
        publicPath: '/<%= publicPath %>/dist/',
        filename: 'main.js',
        chunkFilename: '[id].main.[chunkhash].js'
    },

    resolve: {
        extensions: ['.js', ''],
    },

    module: {
        loaders: [
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader',
                query: {
                    helperDirs: [
                        path.join(__dirname, '<%= staticPath %>/js/templates/')
                    ]
                }
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            },
            {
                test: /\.js$/,
                loader: 'es6-loader'
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin('main.css', {
            allChunks: true
        })
    ]
};
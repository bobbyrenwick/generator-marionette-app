'use strict';

var path = require('path');

module.exports = {
    entry: path.join(__dirname, 'static/js/main.js'),

    output: {
        path: path.join(__dirname, 'static/dist/'),
        publicPath: '/static/dist/',
        filename: 'main.js',
        chunkFilename: '[id].main.[chunkhash].js'
    },

    resolve: {
        extensions: ['.js'],
    },

    module: {
        loaders: [
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader',
                query: {
                    helperDirs: [
                        path.join(__dirname, 'mercury/static/js/scripts/app/templates/')
                    ]
                }
            },
            {
                test: /\.js$/,
                loader: 'es6-loader'
            }
        ]
    },

    plugins: []
};
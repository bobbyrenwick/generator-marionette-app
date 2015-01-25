# generator-marionette-app [![Build Status](https://travis-ci.org/bobbyrenwick/generator-marionette-app.svg)](https://travis-ci.org/bobbyrenwick/generator-marionette-app)
Yeoman generator for generating marionette applications

## Features

* Uses `grunt dev` to build `LESS` and JS during dev and `grunt build` to build production versions of the same files. Uses `webpack` and `traceur-loader` so you can write ES6 code in your modules.
* Has `grunt test:dev` to allow debugging and `grunt test:prod` for CI. Using `karma`.
* Uses `LESS` for css, with `normalize.css` built in
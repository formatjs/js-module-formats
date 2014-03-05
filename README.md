Javascript Module Formats
=========================

[![Build Status](https://travis-ci.org/yahoo/js-module-formats.png?branch=master)](https://travis-ci.org/yahoo/js-module-formats)
[![Dependency Status](https://gemnasium.com/yahoo/js-module-formats.png)](https://gemnasium.com/yahoo/js-module-formats)
[![npm Version](https://badge.fury.io/js/js-module-formats.png)](https://npmjs.org/package/js-module-formats)

Microlibrary to detect different types of javascript modules formats from a javascript file.


Goals, Overview & Features
--------------------------

With the new ES Module syntax arrival, projects will comence the transition to write modules in ES format, and in some cases, rewrite/adjust modules to be ES module. As a result, complex applications might ended up having multiple module formats in their application, while the proper transpile process will be necessary. This microlibrary will help you to detect what type of module does a javascript file defines, and take the appropiate steps based on that information.


Installation
------------

Install using npm:

```shell
$ npm install js-module-formats
```


Usage
-----

### Detecting Module Format

To use Express State with an Express app, the app must first be extended. Use
the `extend()` method that Express State exports:

```javascript
var detect = require('js-module-formats').detect,

console.log(detect(__dirname + '/file.js')); // output: `amd` or `yui` or `es` or `undefined`
```

**Note:** ES modules without `import` or `export` statements will not be detected.


License
-------

This software is free to use under the Yahoo! Inc. BSD license.
See the [LICENSE file][] for license text and copyright information.

[LICENSE file]: https://github.com/yahoo/js-module-formats/blob/master/LICENSE

/*
 * Copyright (c) 2014, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

/*jslint node: true, nomen: true */

'use strict';

var libfs = require('fs'),
    vm = require('vm'),
    context = vm.createContext({});

module.exports = {
    detect: detect,
    extract: extract
};

/**
Analyze JavaScript source, collecting the module or modules information when possible.

@method extract
@default
@param {string} src The JavaScript source to be analyzed
@return {object|array} an object or a collection of object with the info gathered
    from the analysis, it usually includes objects with `type` and `name` per module.
**/
function extract(src) {
    var mods = [];

    /**
    YUI detection is based on a simple rule:
    - if `YUI.add()` is called
    **/
    context.YUI = {
        add: function (name, fn, version, config) {
            mods.push({
                type: 'yui',
                name: name,
                version: version,
                config: config
            });
        }
    };


    /**
    AMD detection is based on a simple rule:
    - if `define()` is called
    **/
    context.define = function (name, fn, version, config) {
        mods.push({
            type: 'amd',
            name: name,
            version: version,
            config: config
        });
    };


    /**
    CommonJS detection is based on simple rules:
    -    if the script calls `require()`
    - or if the script tries to export a function thru `module.exports`
    - or if the script tries to export an object thru `module.exports`
    - or if the script tries to export a function thru `exports`
    - or if the script tries to export an object thru `exports`
    - or if the script tries to add a new member to `module.exports`
    **/
    context.require = function () {
        mods.push({
            type: 'cjs'
        });
        throw new Error('Common JS script detected');
    };
    context.module = {
        exports: {}
    };
    context.exports = context.module.exports;


    // executing the JavaScript source into a new context to avoid leaking
    // globals during the detection process.
    try {
        vm.runInContext(src, context);
    } catch (e) {
        // console.log(e.stack || e);
        // very dummy detection process for ES modules
        if (e.toString() === 'SyntaxError: Unexpected reserved word') {
            mods.push({type: 'es'});
        }
    } finally {
        // very dummy detection process for CommonJS modules
        if (typeof context.module.exports === 'function'
            || typeof context.exports === 'function'
            || Object.keys(context.module.exports) > 0
            || Object.keys(context.exports) > 0) {
            mods.push({type: 'cjs'});
        }
    }

    // returning an array when more than one module is defined in the source
    return mods.length > 1 ? mods : mods[0];
}

/**
Analyze JavaScript source, detecting if the file is a YUI, AMD or ES module.

@method detect
@default
@param {string} src The JavaScript source to be analyzed
@return {string} `yui` or `amd` or `es`
**/
function detect(src) {
    var mod = extract(src);
    if (Array.isArray(mod)) {
        mod = mod.shift(); // picking up the first module from the list
    }
    return mod && mod.type;
}

/*
 * Copyright (c) 2014, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

/*jslint node: true, nomen: true */

'use strict';

var libfs = require('fs'),
    vm = require('vm'),
    contextForRunInContext = vm.createContext({
        require: null,
        module: null,
        console: {},
        window: {},
        document: {},
        global: {}
    });

module.exports = {
    detect: detect,
    extract: extract
};

/**
Analyze a javascript file, collecting the module or modules information when possible.

@method extract
@default
@param {string} file The filesystem path for the javascript to be analyzed
@return {object|array} an object or a collection of object with the info gathered
    from the analysis, it usually includes objects with `type` and `name` per module.
**/
function extract(file) {
    var mods = [];

    contextForRunInContext.YUI = {
        add: function (name, fn, version, config) {
            mods.push({
                type: 'yui',
                name: name,
                version: version,
                config: config
            });
        }
    };
    contextForRunInContext.define = function (name, fn, version, config) {
        mods.push({
            type: 'amd',
            name: name,
            version: version,
            config: config
        });
    };
    try {
        vm.runInContext(libfs.readFileSync(file, 'utf8'), contextForRunInContext, file);
    } catch (e) {
        // very dummy detection process for ES modules
        if (e.toString() === 'SyntaxError: Unexpected reserved word') {
            mods.push({type: 'es'});
        }
    }
    // returning an array when more than one module is defined in the file
    return mods.length > 1 ? mods : mods[0];
}

/**
Analyze a javascript file, detecting if the file is a YUI,
AMD or ES module.

@method detect
@default
@param {string} file The filesystem path for the javascript to be analyzed
@return {string} `yui` or `amd` or `es`
**/
function detect(file) {
    var mod = extract(file);
    if (mod instanceof Array) {
        mod = mod.shift(); // picking up the first module from the list
    }
    return mod && mod.type;
}

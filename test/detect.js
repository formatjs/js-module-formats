/* global describe, it, beforeEach */
'use strict';

var moduleFormats = require('../index'),
    expect = require('chai').expect,
    glob = require('glob'),
    libfs = require('fs'),
    libpath = require('path');

var detect = moduleFormats.detect,
    fixturesDir = libpath.join(__dirname, './fixtures/');

var fixtures = glob.sync('*.*', {
    cwd: fixturesDir
}).reduce(function (map, file) {
    map[file] = libfs.readFileSync(libpath.join(fixturesDir, file), 'utf8');
    return map;
}, {});

describe('detect', function () {

    it('should be a function', function () {
        expect(detect).to.be.a('function');
    });

    describe('undefined', function () {

        it('should return `undefined` for missing source', function () {
            expect(detect(fixtures['missing.js'])).to.be.equal(undefined);
        });

        it('should return `undefined` for non JavaScript source', function () {
            expect(detect(fixtures['weird.txt'])).to.be.equal(undefined);
        });

        it('should detect `undefined` for fixtures/simple.js', function () {
            expect(detect(fixtures['simple.js'])).to.be.equal(undefined);
        });

    });

    describe('yui', function () {

        // iterating over the fixtures for all yui*.js
        Object.keys(fixtures).forEach(function (file) {
            if (file.indexOf('yui') === 0) {
                it('should detect `yui` for fixtures/' + file, function () {
                    expect(detect(fixtures[file])).to.be.equal('yui');
                });
            }
        });

    });

    describe('ES', function () {

        // iterating over the fixtures for all es*.js
        Object.keys(fixtures).forEach(function (file) {
            if (file.indexOf('es') === 0) {
                it('should detect `yui` for fixtures/' + file, function () {
                    expect(detect(fixtures[file])).to.be.equal('es');
                });
            }
        });

    });

    describe('amd', function () {

        // iterating over the fixtures for all amd*.js
        Object.keys(fixtures).forEach(function (file) {
            if (file.indexOf('amd') === 0) {
                it('should detect `yui` for fixtures/' + file, function () {
                    expect(detect(fixtures[file])).to.be.equal('amd');
                });
            }
        });

    });

    describe('cjs', function () {

        // iterating over the fixtures for all cjs*.js
        Object.keys(fixtures).forEach(function (file) {
            if (file.indexOf('cjs') === 0) {
                it('should detect `yui` for fixtures/' + file, function () {
                    expect(detect(fixtures[file])).to.be.equal('cjs');
                });
            }
        });

    });

});

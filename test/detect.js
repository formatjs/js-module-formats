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

        it('should detect `yui` for fixtures/yui-foo.js', function () {
            expect(detect(fixtures['yui-foo.js'])).to.be.equal('yui');
        });

        it('should detect `yui` for fixtures/yui-foo-es6-transpiled.js', function () {
            expect(detect(fixtures['yui-foo-es6-transpiled.js'])).to.be.equal('yui');
        });

    });

    describe('ES', function () {

        it('should detect `es` for fixtures/es.js', function () {
            expect(detect(fixtures['es.js'])).to.be.equal('es');
        });

    });

    describe('amd', function () {

        it('should detect `amd` for fixtures/amd-foo.js', function () {
            expect(detect(fixtures['amd-foo.js'])).to.be.equal('amd');
        });

        it('should detect `amd` for fixtures/amd-foo-es6-transpiled.js', function () {
            expect(detect(fixtures['amd-foo-es6-transpiled.js'])).to.be.equal('amd');
        });

        it('should detect `amd` for fixtures/amd-foo-with-deps.js', function () {
            expect(detect(fixtures['amd-foo-with-deps.js'])).to.be.equal('amd');
        });

        it('should detect `amd` for fixtures/amd-anonymous-object.js', function () {
            expect(detect(fixtures['amd-anonymous-object.js'])).to.be.equal('amd');
        });

        it('should detect `amd` for fixtures/amd-anonymous-factory.js', function () {
            expect(detect(fixtures['amd-anonymous-factory.js'])).to.be.equal('amd');
        });

        it('should detect `amd` for fixtures/amd-anonymous-factory-with-deps.js', function () {
            expect(detect(fixtures['amd-anonymous-factory-with-deps.js'])).to.be.equal('amd');
        });

    });

    describe('cjs', function () {

        it('should detect `cjs` for fixtures/cjs.js', function () {
            expect(detect(fixtures['cjs.js'])).to.be.equal('cjs');
        });

        it('should detect `cjs` for fixtures/cjs-require.js', function () {
            expect(detect(fixtures['cjs-require.js'])).to.be.equal('cjs');
        });

        it('should detect `cjs` for fixtures/cjs-instance.js', function () {
            expect(detect(fixtures['cjs-instance.js'])).to.be.equal('cjs');
        });

        it('should detect `cjs` for fixtures/cjs-exports.js', function () {
            expect(detect(fixtures['cjs-exports.js'])).to.be.equal('cjs');
        });

        it('should detect `cjs` for fixtures/cjs-module-exports.js', function () {
            expect(detect(fixtures['cjs-module-exports.js'])).to.be.equal('cjs');
        });

    });

});

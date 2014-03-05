/* global describe, it, beforeEach */
'use strict';

var extract = require('../').extract,
    expect = require('chai').expect;

describe('extract', function () {

    it('should be a function', function () {
        expect(extract).to.be.a('function');
    });

});

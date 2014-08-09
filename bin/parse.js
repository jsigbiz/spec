'use strict';

var bl = require('bl');
var process = require('process');

var parser = require('../parser.js');

function parse(opts, cb) {
    if (process.stdin.isTTY) {
        var err = new Error('usage: cat docs.mli | jsig --depth=2');
        return cb(err);
    }

    process.stdin.pipe(bl(function onBody(err2, body) {
        if (err) {
            throw err;
        }

        var buf = String(body);

        parser(buf, cb);
    }));
}

module.exports = parse;

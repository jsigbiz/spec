#!/usr/bin/env node
'use strict';

var process = require('process');
var util = require('util');
var parseArgs = require('minimist');
var jsonBody = require('body/json');

module.exports = main;

if (require.main === module) {
    var argv = parseArgs(process.argv.slice(2));
    main(argv);
}

function main(opts) {
    var command = opts._.shift() || 'parse';

    if (command === 'parse') {
        var parse = require('./parse.js');
        parse(opts, function (err, result) {
            if (err) {
                throw err;
            }

            if (opts.json) {
                console.log(JSON.stringify(result, null, 4));
            } else {
                console.log(util.inspect(result, {
                    depth: opts.depth || 2
                }));
            }
        });
    } else if (command === 'serialize') {
        var serialize = require('../serialize.js');
        jsonBody(process.stdin, function (err, body) {
            if (err) {
                throw err;
            }

            console.log(serialize(body));
        });
    } else if (command === 'annotate') {
        var annotate = require('./annotate.js');
        annotate(opts, function (err) {
            if (err) {
                console.log('stack', new Error().stack);
                throw err;
            }
        });
    } else if (command === 'type-check') {
        var typeCheck = require('./type-check.js');
        typeCheck(opts, function (err, code) {
            if (err) {
                console.log('stack', new Error().stack);
                throw err;
            }

            console.log('code?', code);
        });
    }
}



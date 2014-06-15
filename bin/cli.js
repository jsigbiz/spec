#!/usr/bin/env node

var process = require('process');
var util = require('util');
var parseArgs = require('minimist');

var parse = require('./parse.js');
var annotate = require('./annotate.js');

module.exports = main

if (require.main === module) {
    var argv = parseArgs(process.argv.slice(2))
    main(argv)
}

function main(opts) {
    var command = opts._.shift() || 'parse';

    if (command === 'parse') {
        parse(opts, function (err, result) {
            if (err) {
                throw err
            }

            console.log(util.inspect(result, {
                depth: opts.depth || 2
            }))
        })
    } else if (command === 'annotate') {
        annotate(opts, function (err) {
            if (err) {
                throw err
            }
        })
    }
}



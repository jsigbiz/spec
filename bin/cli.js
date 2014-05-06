var process = require('process');
var Parsimmon = require('parsimmon');
var util = require('util');
var parseArgs = require('minimist');

var program = require('../parser/program.js');

function main(stdin, opts, cb) {
    if (typeof opts === 'function') {
        cb = opts
        opts = {}
    }

    var buf = ''

    stdin.on('data', function (c) {
        buf += String(c);
    })

    stdin.on('end', function () {
        var res = program.parse(buf);

        if (res.status) {
            return cb(null, res.value)
        }

        var message = Parsimmon.formatError(buf, res)
        cb(new Error(message));
    })
}

module.exports = main

if (require.main === module) {
    if (process.stdin.isTTY) {
        console.log('usage: cat docs.mli | jsig --depth=2')
        return process.exit(1)
    }

    var argv = parseArgs(process.argv.slice(2))

    main(process.stdin, function (err, result) {
        if (err) {
            throw err
        }

        console.log(util.inspect(result, {
            depth: argv.depth || 2
        }))
    })
}


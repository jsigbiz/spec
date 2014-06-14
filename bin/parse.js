var Parsimmon = require('parsimmon');
var body = require('body');
var process = require('process');

var program = require('../parser/program.js');

function parse(opts, cb) {
    if (process.stdin.isTTY) {
        var err = new Error('usage: cat docs.mli | jsig --depth=2')
        return cb(err)
    }

    body(process.stdin, function (err, body) {
        if (err) {
            throw err;
        }

        var buf = String(body);
        var res = program.parse(buf);

        if (res.status) {
            return cb(null, res.value)
        }

        var message = Parsimmon.formatError(buf, res)
        cb(new Error(message));
    })
}

module.exports = parse

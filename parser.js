'use strict';

var Parsimmon = require('parsimmon');
var program = require('./parser/program.js');

function parse(content, cb) {
    var res =  program.parse(content);

    if (res.status) {
        if (cb) {
            cb(null, res.value);
        }
        return res.value;
    }

    var message = Parsimmon.formatError(content, res);
    var error = new Error(message);
    if (cb) {
        return cb(error);
    }
    throw error;
}

module.exports = parse;

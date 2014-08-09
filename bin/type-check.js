'use strict';

var path = require('path');

var typeCheckAndVerify = require('../type-checker/');

module.exports = typeCheck;

function typeCheck(opts, cb) {
    var file = opts._[0];

    if (!file) {
        cb(new Error('must pass file argument'));
    }

    typeCheckAndVerify(path.resolve(file), cb);
}

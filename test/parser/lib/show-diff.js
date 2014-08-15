'use strict';

var console = require('console');
var difflet = require('difflet')({ indent: 1 });

var jsonDiff = require('json-diff');
var colorize = require('json-diff/lib/colorize');

module.exports = showDiff;

function showDiff(left, right, type) {
    var diffC;
    if (type === 'difflet') {
        difflet.compare(left, right);

        console.log(diffC);

        return diffC;
    } else {
        var diff = jsonDiff.diff(left, right);
        diffC = colorize.colorize(diff);

        console.log(diffC);

        return diffC;
    }
}

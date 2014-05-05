var jsonDiff = require('json-diff');
var colorize = require('json-diff/lib/colorize');

module.exports = showDiff

function showDiff(left, right) {
    var diff = jsonDiff.diff(left, right)

    var diffC = colorize.colorize(diff)

    console.log(diffC)

    return diffC
}

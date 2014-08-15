var format = require('util').format

var checkTypeLiteral = require('../checkers/type-literal.js');

module.exports = wrapTypeLiteral

function wrapTypeLiteral(expr, value, name) {
    var description = format('identifier %s', name)
    checkTypeLiteral(expr, value, description)
    return value
}

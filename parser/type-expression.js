var Parsimmon = require('parsimmon')

var typeLiteral = require('./type-literal.js')
var valueLiteral = require('./value-literal.js')

var typeOrValueLiteral = Parsimmon.alt(
    valueLiteral,
    typeLiteral
)

module.exports = typeOrValueLiteral;

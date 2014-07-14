var Parsimmon = require('parsimmon');

var typeDefinition = require('./type-definition.js')
var lexemes = require('./lexemes.js');
var typeLiteral = require('./type-literal.js')
var AST = require('../ast.js');
var join = require('./lib/join.js');

var genericExpression = lexemes.openAngularBrace
    .then(join(typeDefinition, lexemes.comma))
    .skip(lexemes.closeAngularBrace)

var genericLiteral = Parsimmon.seq(
    typeLiteral,
    genericExpression.times(0, 1)
).map(function (list) {
    if (list[1].length === 0) {
        return list[0]
    }

    return AST.generic(list[0], list[1][0])
})

module.exports = genericLiteral;

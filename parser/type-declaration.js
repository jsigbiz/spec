var Parsimmon = require('parsimmon');

var AST = require('../ast.js')
var typeDefinition = require('./type-definition.js');
var typeLiteral = require('./type-literal.js');
var join = require('./lib/join.js');

var identifier = Parsimmon.regex(/[a-z\-\/]*/i)
    .skip(Parsimmon.optWhitespace);

var genericArgs = Parsimmon.lazy(function () {
    return join(
        typeLiteral,
        Parsimmon.optWhitespace
            .then(Parsimmon.string(','))
            .then(Parsimmon.optWhitespace)
    );
})

var genericExpression = Parsimmon.string('<')
    .then(genericArgs)
    .skip(Parsimmon.string('>'))

var typeDeclaration = Parsimmon.string('type')
    .skip(Parsimmon.optWhitespace)
    .then(Parsimmon.seq(
        identifier,
        genericExpression.times(0, 1)
    ))
    .skip(Parsimmon.optWhitespace)
    .chain(function (list) {
        var identifier = list[0]
        var generics = list[1][0] || []

        return Parsimmon.string(':')
            .skip(Parsimmon.optWhitespace)
            .then(typeDefinition)
            .map(function (type) {
                return AST.typeDeclaration(identifier, type,
                    generics);
            })
    })

module.exports = typeDeclaration

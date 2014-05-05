var Parsimmon = require('parsimmon');

var AST = require('../ast.js');
var join = require('./lib/join.js');
var builtinTypes = require('./builtin-types.js')

var builtinType = Parsimmon.alt.apply(null,
    builtinTypes.map(function (str) {
        return Parsimmon.string(str)
    })
).map(function (type) {
    return AST.literal(type, true);
})

var customType = Parsimmon.regex(/[a-z]+/i)
    .map(function (type) {
        return AST.literal(type, false);
    })

var typeLiteral = Parsimmon.alt(
    builtinType,
    customType
)

var genericArgs = Parsimmon.lazy(function () {
    return join(
        typeDefinition,
        Parsimmon.optWhitespace
            .then(Parsimmon.string(','))
            .then(Parsimmon.optWhitespace)
    );
})

var genericExpression = Parsimmon.string('<')
    .then(genericArgs)
    .skip(Parsimmon.string('>'))

var genericLiteral = Parsimmon.seq(
    typeLiteral,
    genericExpression.times(0, 1)
).map(function (list) {
    if (list[1].length === 0) {
        return list[0]
    }

    return AST.generic(list[0], list[1][0])
})


module.exports = genericLiteral

var typeDefinition = require('./type-definition.js');

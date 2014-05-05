var Parsimmon = require('parsimmon');

var join = require('./lib/join.js');

var builtinTypes = [
    'String', 'Number', 'Object', 'void', 'Any', 'Array'
];

var builtinType = Parsimmon.alt.apply(null,
    builtinTypes.map(function (str) {
        return Parsimmon.string(str)
    })
).map(function (type) {
    return { 
        type: 'typeLiteral',
        builtin: true,
        name: type
    };
})

var customType = Parsimmon.regex(/[a-z]+/i)
    .map(function (type) {
        return {
            type: 'typeLiteral',
            builtin: false,
            name: type
        };
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

    return {
        type: 'genericLiteral',
        value: list[0],
        generics: list[1][0]
    }
})


module.exports = genericLiteral

var typeDefinition = require('./type-definition.js');

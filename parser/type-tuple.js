var Parsimmon = require('parsimmon');

var AST = require('../ast.js');
var join = require('./lib/join.js');

var tupleArgs = Parsimmon.lazy(function () {
    return join(
        typeDefinition,
        Parsimmon.optWhitespace
            .then(Parsimmon.string(','))
            .then(Parsimmon.optWhitespace)
    )
})


var typeTuple = Parsimmon.string('[')
    .then(Parsimmon.optWhitespace)
    .then(tupleArgs)
    .skip(Parsimmon.optWhitespace)
    .skip(Parsimmon.string(']'))
    .map(function (values) {
        return AST.tuple(values)
    })

module.exports = typeTuple

var typeDefinition = require('./type-definition.js')

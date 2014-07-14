var Parsimmon = require('parsimmon');

var lexemes = require('./lexemes.js');
var AST = require('../ast.js');
var join = require('./lib/join.js');

var tupleArgs = Parsimmon.lazy(function () {
    return join(
        typeDefinition,
        lexemes.comma
    )
})


var typeTuple = lexemes.openSquareBrace
    .then(tupleArgs)
    .skip(lexemes.closeSquareBrace)
    .map(function (values) {
        return AST.tuple(values)
    })

module.exports = typeTuple

var typeDefinition = require('./type-definition.js')

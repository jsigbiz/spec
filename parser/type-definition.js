var Parsimmon = require('parsimmon');

var typeDefinition = Parsimmon.lazy(function () {
    return Parsimmon.alt(
        typeLiteral,
        typeFunction,
        typeObject
    );
});

module.exports = typeDefinition;

var typeLiteral = require('./type-literal.js');
var typeFunction = require('./type-function.js');
var typeObject = require('./type-object.js');

var Parsimmon = require('parsimmon');

var typeDefinition = Parsimmon.lazy(function () {
    return typeLiteral
        .or(typeFunction);
});

module.exports = typeDefinition;

var typeLiteral = require('./type-literal.js');
var typeFunction = require('./type-function.js');

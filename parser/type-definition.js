var Parsimmon = require('parsimmon');

var AST = require('../ast.js')
var join = require('./lib/join.js')

var typeDefinition = Parsimmon.lazy(function () {
    return Parsimmon.alt(
        typeExpression,
        typeFunction,
        typeObject
    );
});

var unionType = join(typeDefinition,
    Parsimmon.optWhitespace
        .then(Parsimmon.string('|'))
        .skip(Parsimmon.optWhitespace)
).map(function (unions) {
    // wtf hack :(
    if (unions.length === 0) {
        return null
    }

    if (unions.length === 1) {
        return unions[0]
    }

    return AST.union(unions);
})

module.exports = unionType;

var typeExpression = require('./type-expression.js');
var typeFunction = require('./type-function.js');
var typeObject = require('./type-object.js');

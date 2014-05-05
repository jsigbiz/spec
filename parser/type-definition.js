var Parsimmon = require('parsimmon');

var AST = require('../ast.js')
var join = require('./lib/join.js')

// Label is a name : whitespace at most once
var label = Parsimmon.regex(/[a-z]*/i)
    .skip(Parsimmon.string(':'))
    .skip(Parsimmon.optWhitespace)
    .atMost(1)


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


var typeExpression = label
    .chain(function (labels) {
        return unionType.map(function (expr) {
            if (expr) {
                expr.label = labels[0] || null;
            }
            return expr;
        });
    });

module.exports = typeExpression;

var typeExpression = require('./type-expression.js');
var typeFunction = require('./type-function.js');
var typeObject = require('./type-object.js');

var Parsimmon = require('parsimmon');

var AST = require('../ast.js')
var join = require('./lib/join.js')

var typeDefinition = Parsimmon.lazy(function () {
    return Parsimmon.alt(
        typeExpression,
        typeFunction,
        typeObject,
        typeTuple
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

var intersectionType = join(unionType,
    Parsimmon.optWhitespace
        .then(Parsimmon.string('&'))
        .skip(Parsimmon.optWhitespace)
).map(function (intersections) {
    // wtf hack :(
    if (intersections.length === 0) {
        return null
    }

    if (intersections.length === 1) {
        return intersections[0]
    }

    return AST.intersection(intersections)
})


// Label is a name : whitespace at most once
var label = Parsimmon.regex(/[a-z\?]*/i)
    .skip(Parsimmon.string(':'))
    .skip(Parsimmon.optWhitespace)
    .atMost(1)

var typeExpression = label
    .chain(function (labels) {
        return intersectionType.map(function (expr) {
            var label = labels[0] || null;
            var optional = typeof label === 'string' &&
                label.charAt(label.length - 1) === '?'

            if (expr) {
                expr.label = label;
                expr.optional = optional;
            }

            return expr;
        });
    });

module.exports = typeExpression;

var typeExpression = require('./type-expression.js');
var typeFunction = require('./type-function.js');
var typeObject = require('./type-object.js');
var typeTuple = require('./type-tuple.js');

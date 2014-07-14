var Parsimmon = require('parsimmon');

var lexemes = require('./lexemes.js');
var AST = require('../ast.js')
var join = require('./lib/join.js')

var typeDefinition = Parsimmon.lazy(function () {
    return Parsimmon.alt(
        typeExpression,
        typeFunction,
        typeObject,
        typeTuple
    ).skip(Parsimmon.optWhitespace);
});

var unionType = join(typeDefinition,
    lexemes.unionSeperator
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
    lexemes.intersectionSeperator
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
var label = lexemes.labelName
    .skip(lexemes.labelSeperator)
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

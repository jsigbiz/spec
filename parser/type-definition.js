'use strict';

var Parsimmon = require('parsimmon');

var lexemes = require('./lexemes.js');
var AST = require('../ast.js');
var join = require('./lib/join.js');

var innerTypes = Parsimmon.lazy(lazyAlt);

var unionType = Parsimmon.alt(
    join(innerTypes, lexemes.unionSeperator, 1)
        .map(function unpackUnions(unions) {
            if (unions.length === 1) {
                return unions[0];
            }

            return AST.union(unions);
        }),
    innerTypes
);

var intersectionType = Parsimmon.alt(
    join(unionType, lexemes.intersectionSeperator, 1)
        .map(function unpackIntersections(intersections) {
            if (intersections.length === 1) {
                return intersections[0];
            }

            return AST.intersection(intersections);
        }),
    unionType
);

// Label is a name : whitespace at most once
var label = lexemes.labelName
    .skip(lexemes.labelSeperator)
    .atMost(1);

var typeDeclaration = label
    .chain(function captureLabels(labels) {
        return intersectionType.map(function toExpr(expr) {
            var label = labels[0] || null;
            var optional = typeof label === 'string' &&
                label.charAt(label.length - 1) === '?';

            if (expr) {
                expr.label = label;
                expr.optional = optional;
            }

            return expr;
        });
    });

module.exports = typeDeclaration;

var typeExpression = require('./type-expression.js');
var typeFunction = require('./type-function.js');
var typeObject = require('./type-object.js');
var typeTuple = require('./type-tuple.js');

function lazyAlt() {
    return Parsimmon.alt(
        typeExpression,
        typeFunction,
        typeObject,
        typeTuple
    ).skip(Parsimmon.optWhitespace);
}

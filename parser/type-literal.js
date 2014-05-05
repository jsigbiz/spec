var Parsimmon = require('parsimmon');

var builtinType = Parsimmon.string('String')
    .or(Parsimmon.string('Number'))
    .or(Parsimmon.string('Object'))
    .or(Parsimmon.string('void'))
    .map(function (type) {
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

var stringLiteral = Parsimmon.string('"')
    .then(Parsimmon.regex(/[a-z]+/i))
    .skip(Parsimmon.string('"'))
    .map(function (name) {
        return {
            type: 'stringLiteral',
            value: name
        }
    })

var typeExpression = Parsimmon.alt(
    builtinType,
    customType,
    stringLiteral
);

// Label is a name : whitespace at most once
var label = Parsimmon.regex(/[a-z]*/i)
    .skip(Parsimmon.string(':'))
    .skip(Parsimmon.optWhitespace)
    .atMost(1)

var typeLiteral = label
    .chain(function (labels) {
        return typeExpression.map(function (expr) {
            expr.label = labels[0] || null;
            return expr;
        });
    });

module.exports = typeLiteral;

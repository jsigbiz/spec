var Parsimmon = require('parsimmon')

var typeLiteral = require('./type-literal.js')
var valueLiteral = require('./value-literal.js')

// Label is a name : whitespace at most once
var label = Parsimmon.regex(/[a-z]*/i)
    .skip(Parsimmon.string(':'))
    .skip(Parsimmon.optWhitespace)
    .atMost(1)

var typeOrValueLiteral = Parsimmon.alt(
    valueLiteral,
    typeLiteral
)

var typeExpression = label
    .chain(function (labels) {
        return typeOrValueLiteral.map(function (expr) {
            expr.label = labels[0] || null;
            return expr;
        });
    });

module.exports = typeExpression;

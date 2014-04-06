var Parsimmon = require('parsimmon');

var typeExpression = (
    Parsimmon.string('String')
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
).or(
    Parsimmon.regex(/[a-z]+/i)
        .map(function (type) {
            return {
                type: 'typeLiteral',
                builtin: false,
                name: type
            };
        })
);

var typeLiteral = (
    Parsimmon.regex(/[a-z]*/i)
        .skip(Parsimmon.string(':'))
        .skip(Parsimmon.optWhitespace)
        .atMost(1)
        .then(function (labels) {
            return typeExpression.map(function (expr) {
                expr.label = labels[0] || null;
                return expr;
            });
        })
);

module.exports = typeLiteral;

'use strict';

var Parsimmon = require('parsimmon');

var lexemes = require('./lexemes.js');
var AST = require('../ast.js');

var valueLiterals = Parsimmon.alt(
    valueLiteral('string', lexemes.quote
        .then(lexemes.notAQuote)
        .skip(lexemes.quote)
        .map(function toString(str) {
            return '"' + str + '"';
        })),
    valueLiteral('number', lexemes.number),
    valueLiteral('null', lexemes.nullWord),
    valueLiteral('undefined', lexemes.undefinedWord)
);

module.exports = valueLiterals;

function valueLiteral(name, parser) {
    return parser.map(function toValue(value) {
        return AST.value(value, name);
    });
}

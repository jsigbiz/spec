var Parsimmon = require('parsimmon');

var AST = require('../ast.js')
var statement = require('./statement.js');

var line = statement
    .skip(Parsimmon.optWhitespace);

var program = line.many().map(function (statements) {
    return AST.program(statements);
});

module.exports = program;

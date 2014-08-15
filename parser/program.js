'use strict';

var Parsimmon = require('parsimmon');

var AST = require('../ast.js');
var statement = require('./statement.js');

var line = Parsimmon.optWhitespace
    .then(statement)
    .skip(Parsimmon.optWhitespace);

var program = line.many().map(function toProgram(statements) {
    return AST.program(statements);
});

module.exports = program;

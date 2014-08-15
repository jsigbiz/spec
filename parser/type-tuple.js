'use strict';

var lexemes = require('./lexemes.js');
var AST = require('../ast.js');
var join = require('./lib/join.js');
var typeDefinition = require('./type-definition.js');

var typeTuple = lexemes.openSquareBrace
    .then(join(typeDefinition, lexemes.comma ))
    .skip(lexemes.closeSquareBrace)
    .map(function toTuple(values) {
        return AST.tuple(values);
    });

module.exports = typeTuple;

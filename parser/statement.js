'use strict';

var Parsimmon = require('parsimmon');

var lexemes = require('./lexemes.js');
var AST = require('../ast.js');
var typeDefinition = require('./type-definition.js');
var typeLiteral = require('./type-literal.js');
var typeDeclaration = require('./type-declaration.js');
var join = require('./lib/join.js');

var renamedLiteral = typeLiteral
    .chain(function captureOriginal(original) {
        return lexemes.asWord
            .then(typeLiteral)
            .map(function toRenamedLiteral(literal) {
                return AST.renamedLiteral(literal, original);
            });
    });

var importStatement = lexemes.importWord
    .then(lexemes.openCurlyBrace)
    .then(join(Parsimmon.alt(
        renamedLiteral,
        typeLiteral
    ), lexemes.comma))
    .chain(function captureLiteral(importLiterals) {
        return lexemes.closeCurlyBrace
            .then(lexemes.fromWord)
            .then(lexemes.quote)
            .then(lexemes.moduleName)
            .skip(lexemes.quote)
            .map(function toImport(identifier) {
                return AST.importStatement(identifier,
                    importLiterals);
            });
    });

var assignment = lexemes.identifier
    .chain(function captureIdentifier(identifier) {
        return lexemes.labelSeperator
            .then(typeDefinition)
            .map(function toAssignment(type) {
                return AST.assignment(identifier, type);
            });
    });

var statement = Parsimmon.alt(
    importStatement,
    assignment,
    typeDeclaration
);

module.exports = statement;

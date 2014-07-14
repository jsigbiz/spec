'use strict';

var Parsimmon = require('parsimmon');

var lexemes = require('./lexemes.js');
var AST = require('../ast.js');
var typeDefinition = require('./type-definition.js');
var typeLiteral = require('./type-literal.js');
var typeDeclaration = require('./type-declaration.js');

var importStatement = lexemes.importWord
    .then(lexemes.openCurlyBrace)
    .then(typeLiteral)
    .chain(function captureLiteral(typeLiteralAst) {
        return lexemes.closeCurlyBrace
            .then(lexemes.fromWord)
            .then(lexemes.quote)
            .then(lexemes.identifier)
            .skip(lexemes.quote)
            .map(function toImport(identifier) {
                return AST.importStatement(identifier, [
                    typeLiteralAst
                ]);
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

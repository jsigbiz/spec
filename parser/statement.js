var Parsimmon = require('parsimmon');

var lexemes = require('./lexemes.js');
var AST = require('../ast.js')
var typeDefinition = require('./type-definition.js');
var typeLiteral = require('./type-literal.js');
var typeDeclaration = require('./type-declaration.js');

var importStatement = lexemes.importWord
    .then(lexemes.openCurlyBrace)
    .then(typeLiteral)
    .chain(function (typeLiteral) {
        return lexemes.closeCurlyBrace
            .then(lexemes.fromWord)
            .then(lexemes.quote)
            .then(lexemes.identifier)
            .skip(lexemes.quote)
            .map(function (identifier) {
                return AST.importStatement(identifier, [
                    typeLiteral
                ])
            })
    })

var assignment = lexemes.identifier
    .chain(function (identifier) {
        return lexemes.labelSeperator
            .then(typeDefinition)
            .map(function (type) {
                return AST.assignment(identifier, type);
            });
    });

var statement = Parsimmon.alt(
    importStatement,
    assignment,
    typeDeclaration
)

module.exports = statement;

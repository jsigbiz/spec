'use strict';

var Parsimmon = require('parsimmon');

var lexemes = require('./lexemes.js');
var AST = require('../ast.js');
var typeDefinition = require('./type-definition.js');
var typeLiteral = require('./type-literal.js');
var join = require('./lib/join.js');

var genericExpression = lexemes.openAngularBrace
    .then(join(
        typeLiteral,
        lexemes.comma
    ))
    .skip(lexemes.closeAngularBrace);

var typeDeclaration = lexemes.typeWord
    .then(Parsimmon.seq(
        lexemes.identifier,
        genericExpression.times(0, 1)
    ))
    .chain(function captureIdentifiers(list) {
        var identifier = list[0];
        var generics = list[1][0] || [];

        return lexemes.labelSeperator
            .then(typeDefinition)
            .map(function toTypeDeclaration(type) {
                return AST.typeDeclaration(identifier, type,
                    generics);
            });
    });

module.exports = typeDeclaration;

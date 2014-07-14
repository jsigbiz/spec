var Parsimmon = require('parsimmon');

var AST = require('../ast.js')
var typeDefinition = require('./type-definition.js');
var typeLiteral = require('./type-literal.js');
var typeDeclaration = require('./type-declaration.js');

var identifier = Parsimmon.regex(/[a-z\-\/]*/i)
    .skip(Parsimmon.optWhitespace);

var importStatement = Parsimmon.string('import')
    .then(Parsimmon.optWhitespace)
    .then(Parsimmon.string('{'))
    .then(Parsimmon.optWhitespace)
    .then(typeLiteral)
    .chain(function (typeLiteral) {
        return Parsimmon.optWhitespace
            .then(Parsimmon.string('}'))
            .then(Parsimmon.optWhitespace)
            .then(Parsimmon.string('from'))
            .then(Parsimmon.optWhitespace)
            .then(Parsimmon.string('"'))
            .then(identifier)
            .skip(Parsimmon.string('"'))
            .map(function (identifier) {
                return AST.importStatement(identifier, [
                    typeLiteral
                ])
            })
    })

var assignment = identifier
    .chain(function (identifier) {
        return Parsimmon.string(':')
            .skip(Parsimmon.optWhitespace)
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

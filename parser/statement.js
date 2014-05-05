var Parsimmon = require('parsimmon');

var AST = require('../ast.js')
var typeDefinition = require('./type-definition.js');

var identifier = Parsimmon.regex(/[a-z\-\/]*/i)
    .skip(Parsimmon.optWhitespace);

var assignment = identifier
    .chain(function (identifier) {
        return Parsimmon.string(':=')
            .skip(Parsimmon.optWhitespace)
            .then(typeDefinition)
            .map(function (type) {
                return AST.assignment(identifier, type);
            });
    });

var typeDeclaration = Parsimmon.string('type')
    .skip(Parsimmon.optWhitespace)
    .then(identifier)
    .chain(function (identifier) {
        return Parsimmon.string(':=')
            .skip(Parsimmon.optWhitespace)
            .then(typeDefinition)
            .map(function (type) {
                return AST.typeDeclaration(identifier, type);
            })
    })

var statement = Parsimmon.alt(
    assignment,
    typeDeclaration
)

module.exports = statement;

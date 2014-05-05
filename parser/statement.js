var Parsimmon = require('parsimmon');

var typeDefinition = require('./type-definition.js');

var identifier = Parsimmon.regex(/[a-z\-]*/i);

var statement = identifier
    .skip(Parsimmon.optWhitespace)
    .chain(function (identifier) {
        return Parsimmon.string(':=')
            .skip(Parsimmon.optWhitespace)
            .then(typeDefinition)
            .map(function (type) {
                return {
                    type: 'assignment',
                    identifier: identifier,
                    typeExpression: type
                };
            });
    });

module.exports = statement;

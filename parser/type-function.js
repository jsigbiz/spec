var Parsimmon = require('parsimmon');

var join = require('./lib/join.js');

var funcArgs = Parsimmon.lazy(function () {
    return join(
        typeDefinition,
        Parsimmon.optWhitespace
            .then(Parsimmon.string(','))
            .then(Parsimmon.optWhitespace)
    );
});

var typeFunction = Parsimmon.string('(')
    .then(funcArgs)
    .chain(function (args) {
        return Parsimmon.string(')')
            .then(Parsimmon.optWhitespace)
            .then(Parsimmon.string('=>'))
            .then(Parsimmon.optWhitespace)
            .chain(function () {
                return typeDefinition.map(function (def) {
                    return {
                        type: 'function',
                        args: args,
                        result: def
                    };
                });
            });
    });

module.exports = typeFunction;

var typeDefinition = require('./type-definition.js');


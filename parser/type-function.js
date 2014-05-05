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
    .skip(Parsimmon.optWhitespace)
    .then(funcArgs)
    .chain(function (args) {
        var thisArg = null;
        if (args[0] && args[0].label === 'this') {
            thisArg = args.shift()
        }

        return Parsimmon.optWhitespace
            .then(Parsimmon.string(')'))
            .then(Parsimmon.optWhitespace)
            .then(Parsimmon.string('=>'))
            .then(Parsimmon.optWhitespace)
            .chain(function () {
                return typeDefinition.map(function (def) {
                    return {
                        type: 'function',
                        args: args,
                        thisArg: thisArg,
                        result: def
                    };
                });
            });
    });

module.exports = typeFunction;

var typeDefinition = require('./type-definition.js');


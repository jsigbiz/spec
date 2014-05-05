var Parsimmon = require('parsimmon');

var AST = require('../ast.js');
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

        // wtf hack.
        // filter out any null arguments created by
        // union type
        args = args.filter(Boolean)

        return Parsimmon.optWhitespace
            .then(Parsimmon.string(')'))
            .then(Parsimmon.optWhitespace)
            .then(Parsimmon.string('=>'))
            .then(Parsimmon.optWhitespace)
            .chain(function () {
                return typeDefinition.map(function (def) {
                    return AST.functionType({
                        args: args,
                        thisArg: thisArg,
                        result: def
                    });
                });
            });
    });

module.exports = typeFunction;

var typeDefinition = require('./type-definition.js');


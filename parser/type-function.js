var Parsimmon = require('parsimmon');

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
    .then(function (args) {
        return Parsimmon.string(')')
            .then(Parsimmon.optWhitespace)
            .then(Parsimmon.string('=>'))
            .then(Parsimmon.optWhitespace)
            .then(function () {
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

function join(expr, seperator) {
    return expr.then(function (value) {
        return seperator
            .then(expr)
            .many().map(function (values) {
                return [value].concat(values);
            });
    }).or(Parsimmon.succeed([]));
}

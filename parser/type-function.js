var Parsimmon = require('parsimmon');

var lexemes = require('./lexemes.js');
var AST = require('../ast.js');
var join = require('./lib/join.js');

var funcArgs = Parsimmon.lazy(function () {
    return join(
        typeDefinition,
        lexemes.comma
    );
});

var typeFunction = lexemes.openRoundBrace
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

        return lexemes.closeRoundBrace
            .then(lexemes.arrow)
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


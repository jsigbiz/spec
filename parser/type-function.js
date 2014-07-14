var lexemes = require('./lexemes.js');
var AST = require('../ast.js');
var join = require('./lib/join.js');
var typeDefinition = require('./type-definition.js');

var typeFunction = lexemes.openRoundBrace
    .then(join(typeDefinition, lexemes.comma))
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



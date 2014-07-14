'use strict';

var lexemes = require('./lexemes.js');
var AST = require('../ast.js');
var join = require('./lib/join.js');
var typeDefinition = require('./type-definition.js');

var typeFunction = lexemes.openRoundBrace
    .then(join(typeDefinition, lexemes.comma))
    .chain(function captureArgs(args) {
        var thisArg = null;
        if (args[0] && args[0].label === 'this') {
            thisArg = args.shift();
        }

        return lexemes.closeRoundBrace
            .then(lexemes.arrow)
            .then(typeDefinition)
            .map(function toFunctionType(def) {
                return AST.functionType({
                    args: args,
                    thisArg: thisArg,
                    result: def
                });
            });
    });

module.exports = typeFunction;

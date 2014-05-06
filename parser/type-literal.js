var Parsimmon = require('parsimmon');

var AST = require('../ast.js');

var typeLiteral = Parsimmon.regex(/[a-z]+/i)
    .map(function (type) {
        return AST.literal(type);
    })

module.exports = typeLiteral

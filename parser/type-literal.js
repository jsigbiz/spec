var lexemes = require('./lexemes.js');
var AST = require('../ast.js');

var typeLiteral = lexemes.typeName
    .map(function (type) {
        return AST.literal(type);
    })

module.exports = typeLiteral

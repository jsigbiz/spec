var Parsimmon = require('parsimmon');

var lexemes = require('./lexemes.js');
var AST = require('../ast.js');
var join = require('./lib/join.js');

var objectKey = lexemes.labelName
    .skip(lexemes.labelSeperator)

var typeKeyValue = Parsimmon.lazy(function () {
    return objectKey
        .chain(function (keyName) {
            var optional = keyName[keyName.length - 1] === '?'
            return typeDefinition
                .map(function (keyValue) {
                    return AST.keyValue(keyName, keyValue, {
                        optional: optional
                    })
                })
        })
})

var typeKeyValues = join(typeKeyValue, lexemes.comma);

var typeObject = lexemes.openCurlyBrace
    .then(typeKeyValues)
    .skip(lexemes.closeCurlyBrace)
    .map(function (values) {
        return AST.object(values)
    })

module.exports = typeObject;

var typeDefinition = require('./type-definition.js');

'use strict';

var typeDefinition = require('./type-definition.js');
var lexemes = require('./lexemes.js');
var AST = require('../ast.js');
var join = require('./lib/join.js');

var objectKey = lexemes.labelName
    .skip(lexemes.labelSeperator);

var typeKeyValue = objectKey
    .chain(function captureOptional(keyName) {
        var optional = keyName[keyName.length - 1] === '?';
        return typeDefinition
            .map(function toKeyValue(keyValue) {
                return AST.keyValue(keyName, keyValue, {
                    optional: optional
                });
            });
    });

var typeKeyValues = join(typeKeyValue, lexemes.comma);

var typeObject = lexemes.openCurlyBrace
    .then(typeKeyValues)
    .skip(lexemes.closeCurlyBrace)
    .map(function toObject(values) {
        return AST.object(values);
    });

module.exports = typeObject;

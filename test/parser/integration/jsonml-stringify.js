'use strict';

var test = require('tape');
var fs = require('fs');
var path = require('path');

// var showDiff = require('../lib/show-diff.js');

var parse = require('../../../parser.js');
var AST = require('../../../ast.js');

var uri = path.join(__dirname, 'definitions',
    'jsonml-stringify.mli');
var content = fs.readFileSync(uri, 'utf8');

var ASTFixture = AST.program([
    AST.typeDeclaration('JsonMLSelector',
        AST.literal('String')),
    AST.typeDeclaration('JsonMLTextContent',
        AST.literal('String')),
    AST.typeDeclaration('JsonMLRawContent', AST.object({
        raw: AST.literal('String')
    })),
    AST.typeDeclaration('JsonMLFragment', AST.object({
        fragment: AST.generic(
            AST.literal('Array'),
            [AST.literal('JsonML')]
        )
    }))
]);

test('the jsonml-stringify type definition', function t(assert) {
    var result = parse(content);

    // showDiff(result, ASTFixture);
    assert.deepEqual(result, ASTFixture);

    assert.end();
});

/*
type JsonMLAttributeKey := String
type JsonMLAttributeValue := String | Number | Boolean
type JsonMLAttrs := Object<JsonMLAttributeKey, JsonMLAttributeValue>

type MaybeJsonML :=
    JsonMLTextContent |
    JsonMLRawContent |
    { fragment: Array<MaybeJsonML> } |
    [JsonMLSelector] |
    [JsonMLSelector, JsonMLRawContent] |
    [JsonMLSelector, { fragment: Array<MaybeJsonML> }] |
    [JsonMLSelector, Object] |
    [JsonMLSelector, JsonMLTextContent] |
    [JsonMLSelector, Array<MaybeJsonML>] |
    [JsonMLSelector, JsonMLAttrs, Array<MaybeJsonML>] |
    [JsonMLSelector, JsonMLAttrs, JsonMLTextContent] |
    [JsonMLSelector, JsonMLAttrs, { fragment: Array<MaybeJsonML> }] |
    [JsonMLSelector, JsonMLAttrs, JsonMLRawContent]

type JsonML :=
    JsonMLTextContent |
    JsonMLFragment |
    JsonMLRawContent |
    [
        JsonMLSelector,
        JsonMLAttrs,
        Array<JsonML>
    ]

jsonml-stringify := (jsonml: JsonML, opts: Object?) => String

jsonml-stringify/normalize := (MaybeJsonML) => JsonML

jsonml-stringify/dom := (jsonml: JsonML) => DOMElement

jsonml-stringify/attrs := (attributes: Object) => String

jsonml-stringify/unpack-selector :=
    (selector: String, attributes!: Object) => tagName: String

*/

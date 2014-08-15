'use strict';

var test = require('tape');
var fs = require('fs');
var path = require('path');

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
    })),
    AST.typeDeclaration('JsonMLAttributeKey',
        AST.literal('String')),
    AST.typeDeclaration('JsonMLAttributeValue', AST.union([
        AST.literal('String'),
        AST.literal('Number'),
        AST.literal('Boolean')
    ])),
    AST.typeDeclaration('JsonMLAttrs', AST.generic(
        AST.literal('Object'),
        [
            AST.literal('JsonMLAttributeKey'),
            AST.literal('JsonMLAttributeValue')
        ])
    ),
    AST.typeDeclaration('MaybeJsonML', AST.union([
        AST.literal('JsonMLTextContent'),
        AST.literal('JsonMLRawContent'),
        AST.object({
            'fragment': AST.generic(
                AST.literal('Array'),
                [AST.literal('MaybeJsonML')]
            )
        }),
        AST.tuple([AST.literal('JsonMLSelector')]),
        AST.tuple([
            AST.literal('JsonMLSelector'),
            AST.literal('JsonMLRawContent')
        ]),
        AST.tuple([
            AST.literal('JsonMLSelector'),
            AST.object({
                'fragment': AST.generic(
                    AST.literal('Array'),
                    [AST.literal('MaybeJsonML')]
                )
            })
        ]),
        AST.tuple([
            AST.literal('JsonMLSelector'),
            AST.literal('Object')
        ]),
        AST.tuple([
            AST.literal('JsonMLSelector'),
            AST.literal('JsonMLTextContent')
        ]),
        AST.tuple([
            AST.literal('JsonMLSelector'),
            AST.generic(
                AST.literal('Array'),
                [AST.literal('MaybeJsonML')]
            )
        ]),
        AST.tuple([
            AST.literal('JsonMLSelector'),
            AST.literal('JsonMLAttrs'),
            AST.generic(
                AST.literal('Array'),
                [AST.literal('MaybeJsonML')]
            )
        ]),
        AST.tuple([
            AST.literal('JsonMLSelector'),
            AST.literal('JsonMLAttrs'),
            AST.literal('JsonMLTextContent')
        ]),
        AST.tuple([
            AST.literal('JsonMLSelector'),
            AST.literal('JsonMLAttrs'),
            AST.object({
                'fragment': AST.generic(
                    AST.literal('Array'),
                    [AST.literal('MaybeJsonML')]
                )
            })
        ]),
        AST.tuple([
            AST.literal('JsonMLSelector'),
            AST.literal('JsonMLAttrs'),
            AST.literal('JsonMLRawContent')
        ])
    ])),
    AST.typeDeclaration('JsonML', AST.union([
        AST.literal('JsonMLTextContent'),
        AST.literal('JsonMLFragment'),
        AST.literal('JsonMLRawContent'),
        AST.tuple([
            AST.literal('JsonMLSelector'),
            AST.literal('JsonMLAttrs'),
            AST.generic(
                AST.literal('Array'),
                [AST.literal('JsonML')]
            )
        ])
    ])),
    AST.assignment('jsonml-stringify', AST.functionType({
        args: [
            AST.literal('JsonML', 'jsonml'),
            AST.literal('Object', true, {
                label: 'opts',
                optional: true
            })
        ],
        result: AST.literal('String')
    })),
    AST.assignment('jsonml-stringify/normalize', AST.functionType({
        args: [AST.literal('MaybeJsonML')],
        result: AST.literal('JsonML')
    })),
    AST.assignment('jsonml-stringify/dom', AST.functionType({
        args: [AST.literal('JsonML', 'jsonml')],
        result: AST.literal('DOMElement')
    })),
    AST.assignment('jsonml-stringify/attrs', AST.functionType({
        args: [AST.literal('Object', 'attributes')],
        result: AST.literal('String')
    })),
    AST.assignment('jsonml-stringify/unpack-selector',
        AST.functionType({
            args: [
                AST.literal('String', 'selector'),
                AST.literal('Object', 'attributes')
            ],
            result: AST.literal('String', 'tagName')
        }))
]);

test('the jsonml-stringify type definition', function t(assert) {
    var result = parse(content);

    // showDiff(result, ASTFixture);
    assert.deepEqual(result, ASTFixture);

    assert.end();
});

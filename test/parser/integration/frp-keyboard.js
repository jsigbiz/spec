'use strict';

var test = require('tape');
var fs = require('fs');
var path = require('path');

// var showDiff = require('../lib/show-diff.js')

var parse = require('../../../parser.js');
var AST = require('../../../ast.js');

var uri = path.join(__dirname, 'definitions', 'frp-keyboard.mli');
var content = fs.readFileSync(uri, 'utf8');

var ASTFixture = AST.program([
    AST.importStatement('observ', [ AST.literal('Observ') ]),
    AST.importStatement('dom-delegator', [ AST.literal('Delegator') ]),
    AST.typeDeclaration('KeyCode', AST.literal('Number')),
    AST.typeDeclaration('Direction', AST.union([
        AST.value('"left"', 'string'),
        AST.value('"right"', 'string'),
        AST.value('"up"', 'string'),
        AST.value('"down"', 'string'),
        AST.value('"void"', 'string')
    ])),
    AST.typeDeclaration('Coord', AST.object({
        'x': AST.literal('Number'),
        'y': AST.literal('Number'),
        'lastPressed': AST.literal('Direction')
    })),
    AST.typeDeclaration('NativeKeyboard', AST.object({
        'isDown': AST.functionType({
            args: [ AST.literal('KeyCode', 'keyCode') ],
            result: AST.generic(
                AST.literal('Observ'),
                [ AST.literal('Boolean') ])
        }),
        'keysDown': AST.generic(
            AST.literal('Observ'),
            [
                AST.generic(
                    AST.literal('Array'),
                    [ AST.literal('KeyCode', 'keyCode') ]
                )
            ]),
        'keyDown': AST.generic(
            AST.literal('Observ'),
            [ AST.literal('KeyCode', 'keyCode') ]),
        'lastPressed': AST.generic(
            AST.literal('Observ'),
            [ AST.literal('KeyCode', 'keyCode') ]),
        'directions': AST.functionType({
            args: [
                AST.literal('KeyCode', 'up'),
                AST.literal('KeyCode', 'down'),
                AST.literal('KeyCode', 'left'),
                AST.literal('KeyCode', 'right')
            ],
            result: AST.generic(
                AST.literal('Observ'),
                [ AST.literal('Coord') ])
        })
    })),
    AST.typeDeclaration('Keyboard', AST.intersection([
        AST.literal('NativeKeyboard'),
        AST.object({
            'arrows': AST.generic(
                AST.literal('Observ'),
                [ AST.literal('Coord') ]
            ),
            'wasd': AST.generic(
                AST.literal('Observ'),
                [ AST.literal('Coord') ]
            ),
            'ctrl': AST.generic(
                AST.literal('Observ'),
                [ AST.literal('Boolean') ]
            ),
            'shift': AST.generic(
                AST.literal('Observ'),
                [ AST.literal('Boolean') ]
            )
        })
    ])),
    AST.assignment('frp-keyboard', AST.functionType({
        args: [],
        result: AST.literal('Keyboard', 'cachedKeyboard')
    })),
    AST.assignment('frp-keyboard/keyboard', AST.functionType({
        args: [ AST.literal('Delegator') ],
        result: AST.literal('Keyboard')
    })),
    AST.assignment('frp-keyboard/native', AST.functionType({
        args: [ AST.literal('Delegator') ],
        result: AST.literal('NativeKeyboard')
    }))
]);

test('the frp-keyboard type definition', function (assert) {
    var result = parse(content);

    // showDiff(result, ASTFixture)
    assert.deepEqual(result, ASTFixture);

    assert.end();
});


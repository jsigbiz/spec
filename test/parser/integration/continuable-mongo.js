'use strict';

var test = require('tape');
var fs = require('fs');
var path = require('path');

// var showDiff = require('../lib/show-diff.js');

var parse = require('../../../parser.js');
var AST = require('../../../ast.js');

var uri = path.join(__dirname, 'definitions',
    'continuable-mongo.mli');
var content = fs.readFileSync(uri, 'utf8');

var ASTFixture = AST.program([
    AST.importStatement('node.jsig', [
        AST.literal('Stream')
    ]),
    AST.importStatement('continuable.jsig', [
        AST.literal('Continuable')
    ]),
    AST.importStatement('mongodb.jsig', [
        AST.renamedLiteral('MongoCursor', 'Cursor'),
        AST.renamedLiteral('MongoCollection', 'Collection'),
        AST.renamedLiteral('MongoDB', 'DB')
    ]),
    AST.typeDeclaration('Cursor',
        AST.intersection([
            AST.object({
                'toArray': AST.functionType({
                    result: AST.generic(
                        AST.literal('Continuable'),
                        [AST.generic(
                            AST.literal('Array'),
                            [AST.literal('T')]
                        )]
                    )
                }),
                'nextObject': AST.functionType({
                    result: AST.generic(
                        AST.literal('Continuable'),
                        [AST.union([
                            AST.literal('T'),
                            AST.value('null')
                        ])
                    ])
                }),
                'stream': AST.functionType({
                    result: AST.literal('Stream')
                })
            }),
            AST.functionType({
                args: [AST.generic(
                    AST.literal('Callback'),
                    [AST.literal('MongoCursor')]
                )],
                result: AST.literal('void')
            })
        ]),
        [AST.literal('T')]
    ),
    AST.typeDeclaration('Client', AST.intersection([
        AST.object({
            'close': AST.generic(
                AST.literal('Continuable'),
                [AST.literal('void')
            ]),
            'collection': AST.functionType({
                args: [AST.literal('String', 'name')],
                result: AST.literal('Collection')
            })
        }),
        AST.functionType({
            args: [AST.generic(
                AST.literal('Callback'),
                [AST.literal('MongoDB')]
            )],
            result: AST.literal('void')
        })
    ])),
    AST.typeDeclaration('Collection', AST.intersection([
        AST.object({
            'find': AST.functionType({
                args: [
                    AST.literal('Object', true, {
                        label: 'selector'
                    }),
                    AST.literal('Object', true, {
                        label: 'options',
                        optional: true
                    })
                ],
                result: AST.generic(
                    AST.literal('Cursor'),
                    [AST.literal('T')]
                )
            }),
            'findById': AST.functionType({
                args: [
                    AST.literal('String', true, {
                        label: 'id'
                    }),
                    AST.literal('Object', true, {
                        label: 'options',
                        optional: true
                    })
                ],
                result: AST.generic(
                    AST.literal('Continuable'),
                    [AST.literal('T')]
                )
            }),
            'findAndModify': AST.functionType({
                args: [
                    AST.literal('Object', true, {
                        label: 'selector'
                    }),
                    AST.literal('Array', true, {
                        label: 'sort',
                        optional: true
                    }),
                    AST.literal('Object', true, {
                        label: 'doc',
                        optional: true
                    }),
                    AST.literal('Object', true, {
                        label: 'options',
                        optional: true
                    })
                ],
                result: AST.generic(
                    AST.literal('Continuable'),
                    [AST.literal('T')]
                )
            }),
            'findAndRemove': AST.functionType({
                args: [
                    AST.literal('Object', true, {
                        label: 'selector'
                    }),
                    AST.literal('Array', true, {
                        label: 'sort',
                        optional: true
                    }),
                    AST.literal('Object', true, {
                        label: 'options',
                        optional: true
                    })
                ],
                result: AST.generic(
                    AST.literal('Continuable'),
                    [AST.literal('T')]
                )
            }),
            'findOne': AST.functionType({
                args: [
                    AST.literal('Object', true, {
                        label: 'selector'
                    }),
                    AST.literal('Object', true, {
                        label: 'options',
                        optional: true
                    })
                ],
                result: AST.generic(
                    AST.literal('Continuable'),
                    [AST.literal('T')]
                )
            }),
            'insert': AST.functionType({
                args: [
                    AST.generic(
                        AST.literal('Array'),
                        [AST.literal('T')],
                        'docs'
                    ),
                    AST.literal('Object', true, {
                        label: 'options',
                        optional: true
                    })
                ],
                result: AST.generic(
                    AST.literal('Continuable'),
                    [AST.generic(
                        AST.literal('Array'),
                        [AST.literal('T')]
                    )]
                )
            }),
            'mapReduce': AST.functionType({
                args: [
                    AST.literal('Function', true, {
                        label: 'map'
                    }),
                    AST.literal('Function', true, {
                        label: 'reduce'
                    }),
                    AST.literal('Object', true, {
                        label: 'options',
                        optional: true
                    })
                ],
                result: AST.generic(
                    AST.literal('Continuable'),
                    [AST.literal('Collection')]
                )
            }),
            'remove': AST.functionType({
                args: [
                    AST.literal('Object', true, {
                        label: 'selector'
                    }),
                    AST.literal('Object', true, {
                        label: 'options',
                        optional: true
                    })
                ],
                result: AST.generic(
                    AST.literal('Continuable'),
                    [AST.literal('Number')]
                )
            }),
            'update': AST.functionType({
                args: [
                    AST.literal('Object', true, {
                        label: 'selector'
                    }),
                    AST.literal('Object', true, {
                        label: 'doc',
                        optional: true
                    }),
                    AST.literal('Object', true, {
                        label: 'options',
                        optional: true
                    })
                ],
                result: AST.generic(
                    AST.literal('Continuable'),
                    [AST.literal('Number')]
                )
            })
        }),
        AST.functionType({
            args: [AST.generic(
                AST.literal('Callback'),
                [AST.literal('MongoCollection')]
            )],
            result: AST.literal('void')
        })
    ]), [ AST.literal('T') ]),
    AST.assignment('continuable-mongo/cursor', AST.functionType({
        args: [AST.generic(
            AST.literal('Collection'),
            [AST.literal('T')]
        )],
        result: AST.functionType({
            args: [
                AST.literal('Object', true, {
                    label: 'selector'
                }),
                AST.literal('Object', true, {
                    label: 'options',
                    optional: true
                })
            ],
            result: AST.generic(
                AST.literal('Cursor'),
                [AST.literal('T')]
            )
        })
    })),
    AST.assignment('continuable-mongo/collection',
        AST.functionType({
            args: [AST.literal('Client')],
            result: AST.functionType({
                args: [AST.literal('String', true, {
                    label: 'collectionName'
                })],
                result: AST.literal('Collection')
            })
        })),
    AST.assignment('continuable-mongo', AST.functionType({
        args: [
            AST.literal('String', true, {
                label: 'uri'
            }),
            AST.literal('Object', true, {
                label: 'options',
                optional: true
            })
        ],
        result: AST.literal('Client')
    }))
]);

test('the error type definition', function t(assert) {
    var result = parse(content);

    // showDiff(result, ASTFixture);
    assert.deepEqual(result, ASTFixture);

    assert.end();
});

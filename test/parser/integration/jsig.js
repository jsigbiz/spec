'use strict';

var test = require('tape');
var fs = require('fs');
var path = require('path');

// var showDiff = require('../lib/show-diff.js')

var parse = require('../../../parser.js');
var AST = require('../../../ast.js');

var uri = path.join(__dirname, 'definitions', 'jsig.mli');
var content = fs.readFileSync(uri, 'utf8');

var ASTFixture = AST.program([
    AST.typeDeclaration('GenericE', AST.object({
        'type': AST.value('"genericLiteral"', 'string'),
        'value': AST.literal('TypeExpression'),
        'generics': AST.generic(
            AST.literal('Array'),
            [ AST.literal('TypeExpression') ]
        ),
        'label': AST.union([
            AST.literal('String'),
            AST.value('null')
        ]),
        'optional': AST.literal('Boolean')
    })),
    AST.typeDeclaration('FunctionE', AST.object({
        'type': AST.value('"function"', 'string'),
        'args': AST.generic(
            AST.literal('Array'),
            [ AST.literal('TypeExpression') ]
        ),
        'result': AST.literal('TypeExpression'),
        'thisArg': AST.union([
            AST.literal('TypeExpression'),
            AST.value('null')
        ]),
        'label': AST.union([
            AST.literal('String'),
            AST.value('null')
        ]),
        'optional': AST.literal('Boolean')
    })),
    AST.typeDeclaration('ValueE', AST.object({
        'type': AST.value('"valueLiteral"', 'string'),
        'value': AST.literal('String'),
        'name': AST.literal('String'),
        'label': AST.union([
            AST.literal('String'),
            AST.value('null')
        ]),
        'optional': AST.literal('Boolean')
    })),
    AST.typeDeclaration('LiteralE', AST.object({
        'type': AST.value('"typeLiteral"', 'string'),
        'name': AST.literal('String'),
        'builtin': AST.literal('Boolean'),
        'label': AST.union([
            AST.literal('String'),
            AST.value('null')
        ]),
        'optional': AST.literal('Boolean')
    })),
    AST.typeDeclaration('UnionE', AST.object({
        'type': AST.value('"unionType"', 'string'),
        'unions': AST.generic(
            AST.literal('Array'),
            [ AST.literal('TypeExpression') ]
        ),
        'label': AST.union([
            AST.literal('String'),
            AST.value('null')
        ]),
        'optional': AST.literal('Boolean')
    })),
    AST.typeDeclaration('IntersectionE', AST.object({
        'type': AST.value('"intersectionType"', 'string'),
        'intersections': AST.generic(
            AST.literal('Array'),
            [ AST.literal('TypeExpression') ]
        ),
        'label': AST.union([
            AST.literal('String'),
            AST.value('null')
        ]),
        'optional': AST.literal('Boolean')
    })),
    AST.typeDeclaration('KeyValue', AST.object({
        'type': AST.value('"keyValue"', 'string'),
        'key': AST.literal('String'),
        'value': AST.literal('TypeExpression'),
        'optional': AST.literal('Boolean')
    })),
    AST.typeDeclaration('ObjectE', AST.object({
        'type': AST.value('"object"', 'string'),
        'keyValues': AST.generic(
            AST.literal('Array'),
            [ AST.literal('KeyValue') ]
        ),
        'label': AST.union([
            AST.literal('String'),
            AST.value('null')
        ]),
        'optional': AST.literal('Boolean')
    })),
    AST.typeDeclaration('TupleE', AST.object({
        'type': AST.value('"tuple"', 'string'),
        'values': AST.generic(
            AST.literal('Array'),
            [ AST.literal('TypeExpression') ]
        ),
        'label': AST.union([
            AST.literal('String'),
            AST.value('null')
        ]),
        'optional': AST.literal('Boolean')
    })),
    AST.typeDeclaration('TypeExpression', AST.union([
        AST.literal('ObjectE'),
        AST.literal('UnionE'),
        AST.literal('LiteralE'),
        AST.literal('FunctionE'),
        AST.literal('ValueE'),
        AST.literal('GenericE'),
        AST.literal('TupleE'),
        AST.literal('IntersectionE')
    ])),
    AST.typeDeclaration('Assignment', AST.object({
        'type': AST.value('"assignment"', 'string'),
        'identifier': AST.literal('String'),
        'typeExpression': AST.literal('TypeExpression')
    })),
    AST.typeDeclaration('TypeDeclaration', AST.object({
        'type': AST.value('"typeDeclaration"', 'string'),
        'identifier': AST.literal('String'),
        'typeExpression': AST.literal('TypeExpression'),
        'generics': AST.generic(
            AST.literal('Array'),
            [ AST.literal('LiteralE') ]
        )
    })),
    AST.typeDeclaration('Import', AST.object({
        'type': AST.value('"import"', 'string'),
        'dependency': AST.literal('String'),
        'types': AST.generic(
            AST.literal('Array'),
            [ AST.literal('LiteralE') ]
        )
    })),
    AST.typeDeclaration('Statement', AST.union([
        AST.literal('Import'),
        AST.literal('TypeDeclaration'),
        AST.literal('Assignment')
    ])),
    AST.typeDeclaration('Program', AST.object({
        'type': AST.value('"program"', 'string'),
        'statements': AST.generic(
            AST.literal('Array'),
            [ AST.literal('Statement') ]
        )
    })),
    AST.typeDeclaration('AST', AST.object({
        'program': AST.functionType({
            args: [ AST.generic(
                AST.literal('Array'),
                [ AST.literal('Statement') ]
            ) ],
            result: AST.literal('Program')
        }),
        'typeDeclaration': AST.functionType({
            args: [
                AST.literal('String'),
                AST.literal('TypeExpression')
            ],
            result: AST.literal('TypeDeclaration')
        }),
        'assignment': AST.functionType({
            args: [
                AST.literal('String'),
                AST.literal('TypeExpression')
            ],
            result: AST.literal('Assignment')
        }),
        'importStatement': AST.functionType({
            args: [
                AST.literal('String'),
                AST.generic(
                    AST.literal('Array'),
                    [ AST.literal('LiteralE') ]
                )
            ],
            result: AST.literal('Import')
        }),
        'object': AST.functionType({
            args: [
                AST.union([
                    AST.generic(
                        AST.literal('Array'),
                        [ AST.literal('KeyValue') ]
                    ),
                    AST.generic(
                        AST.literal('Object'),
                        [
                            AST.literal('String'),
                            AST.literal('TypeExpression')
                        ]
                    )
                ], 'keyValues'),
                AST.literal('String', 'label?', {
                    optional: true
                })
            ],
            result: AST.literal('ObjectE')
        }),
        'union': AST.functionType({
            args: [
                AST.generic(
                    AST.literal('Array'),
                    [ AST.literal('TypeExpression') ]
                ),
                AST.literal('String', 'label?', {
                    optional: true
                }),
                AST.object({
                    'optional': AST.literal('Boolean')
                }, 'opts?', { optional: true })
            ],
            result: AST.literal('UnionE')
        }),
        'intersection': AST.functionType({
            args: [
                AST.generic(
                    AST.literal('Array'),
                    [ AST.literal('TypeExpression') ]
                ),
                AST.literal('String', 'label?', {
                    optional: true
                }),
                AST.object({
                    'optional': AST.literal('Boolean')
                }, 'opts?', { optional: true })
            ],
            result: AST.literal('IntersectionE')
        }),
        'literal': AST.functionType({
            args: [
                AST.literal('String'),
                AST.literal('String', 'builtin?', {
                    optional: true
                }),
                AST.object({
                    'optional': AST.literal('Boolean')
                }, 'opts?', { optional: true })
            ],
            result: AST.literal('LiteralE')
        }),
        'keyValue': AST.functionType({
            args: [
                AST.literal('String'),
                AST.literal('TypeExpression')
            ],
            result: AST.literal('KeyValue')
        }),
        'value': AST.functionType({
            args: [
                AST.literal('String'),
                AST.literal('String', 'name'),
                AST.literal('String', 'label?', {
                    optional: true
                })
            ],
            result: AST.literal('ValueE')
        }),
        'functionType': AST.functionType({
            args: [ AST.object([
                AST.keyValue('args?', AST.generic(
                    AST.literal('Array'),
                    [ AST.literal('TypeExpression') ]
                ), { optional: true }),
                AST.keyValue('result', AST.literal('TypeExpression')),
                AST.keyValue('thisArg?',
                    AST.literal('TypeExpression'), {
                        optional: true
                    }),
                AST.keyValue('label?',
                    AST.literal('String'), {
                        optional: true
                    }),
                AST.keyValue('optional?',
                    AST.literal('Boolean'), {
                        optional: true
                    })
            ], 'opts') ],
            result: AST.literal('FunctionE')
        }),
        'generic': AST.functionType({
            args: [
                AST.literal('TypeExpression', 'value'),
                AST.generic(
                    AST.literal('Array'),
                    [ AST.literal('TypeExpression') ],
                    'generics'
                ),
                AST.literal('String', 'label?', {
                    optional: true
                })
            ],
            result: AST.literal('GenericE')
        }),
        'tuple': AST.functionType({
            args: [
                AST.generic(
                    AST.literal('Array'),
                    [ AST.literal('TypeExpression') ]
                ),
                AST.literal('String', 'label?', {
                    optional: true
                }),
                AST.object({
                    'optional': AST.literal('Boolean')
                }, 'opts?', { optional: true })
            ],
            result: AST.literal('TupleE')
        }),
    })),
    AST.assignment('jsig/ast', AST.literal('AST')),
    AST.assignment('jsig/parser', AST.functionType({
        args: [ AST.literal('String', 'content') ],
        result: AST.literal('Program')
    }))
]);

test('the jsig type definition', function (assert) {
    var result = parse(content);

//    showDiff(result, ASTFixture)
    assert.deepEqual(result, ASTFixture);

    assert.end();
});


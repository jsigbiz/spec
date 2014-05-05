var test = require('tape');
var fs = require('fs')
var path = require('path')

// var showDiff = require('../lib/show-diff.js')

var parse = require('../../parser.js');
var AST = require('../../ast.js')

var uri = path.join(__dirname, 'jsig.mli')
var content = fs.readFileSync(uri, 'utf8')

var ASTFixture = AST.program([
    AST.typeDeclaration('GenericE', AST.object({
        'type': AST.value('genericLiteral', 'string'),
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
        'type': AST.value('function', 'string'),
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
        'type': AST.value('valueLiteral', 'string'),
        'value': AST.literal('String'),
        'name': AST.literal('String'),
        'label': AST.union([
            AST.literal('String'),
            AST.value('null')
        ]),
        'optional': AST.literal('Boolean')
    })),
    AST.typeDeclaration('LiteralE', AST.object({
        'type': AST.value('typeLiteral', 'string'),
        'name': AST.literal('String'),
        'builtin': AST.literal('Boolean'),
        'label': AST.union([
            AST.literal('String'),
            AST.value('null')
        ]),
        'optional': AST.literal('Boolean')
    })),
    AST.typeDeclaration('UnionE', AST.object({
        'type': AST.value('unionType', 'string'),
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
    AST.typeDeclaration('KeyValue', AST.object({
        'type': AST.value('keyValue', 'string'),
        'key': AST.literal('String'),
        'value': AST.literal('TypeExpression')
    })),
    AST.typeDeclaration('ObjectE', AST.object({
        'type': AST.value('object', 'string'),
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
    AST.typeDeclaration('TypeExpression', AST.union([
        AST.literal('ObjectE'),
        AST.literal('UnionE'),
        AST.literal('LiteralE'),
        AST.literal('FunctionE'),
        AST.literal('ValueE'),
        AST.literal('GenericE')
    ])),
    AST.typeDeclaration('Assignment', AST.object({
        'type': AST.value('assignment', 'string'),
        'identifier': AST.literal('String'),
        'typeExpression': AST.literal('TypeExpression')
    })),
    AST.typeDeclaration('TypeDeclaration', AST.object({
        'type': AST.value('typeDeclaration', 'string'),
        'identifier': AST.literal('String'),
        'typeExpression': AST.literal('TypeExpression')
    })),
    AST.typeDeclaration('Statement', AST.union([
        AST.literal('TypeDeclaration'),
        AST.literal('Assignment')
    ])),
    AST.typeDeclaration('Program', AST.object({
        'type': AST.value('program', 'string'),
        'statements': AST.generic(
            AST.literal('Array'),
            [ AST.literal('Statement') ]
        )
    })),
    AST.assignment('jsig/ast', AST.literal('AST')),
    AST.assignment('jsig/parser', AST.functionType({
        args: [ AST.literal('String', 'content') ],
        result: AST.literal('Program')
    }))
])

// labeled unions dont parse properly
test('the jsig type definition', function (assert) {
    var result = parse(content)

    // showDiff(result, ASTFixture)
    assert.deepEqual(result, ASTFixture)

    assert.end()
})


'use strict';

var test = require('tape');
var fs = require('fs');
var path = require('path');

// var showDiff = require('../lib/show-diff.js')

var parse = require('../../../parser.js');
var AST = require('../../../ast.js');

var uri = path.join(__dirname, 'definitions', 'error.mli');
var content = fs.readFileSync(uri, 'utf8');

var ASTFixture = AST.program([
    AST.typeDeclaration('OptionError', AST.object({
        'option': AST.union([
            AST.literal('T'),
            AST.value('null')
        ]),
        'message': AST.literal('String'),
        'type': AST.value('"OptionError"', 'string')
    }), [ AST.literal('T') ]),
    AST.typeDeclaration('TypedError', AST.object({
        'message': AST.literal('String'),
        'type': AST.literal('T')
    }), [ AST.literal('T') ]),
    AST.typeDeclaration('ValidationError', AST.object({
        'errors': AST.generic(
            AST.literal('Array'),
            [ AST.literal('Error') ]
        ),
        'message': AST.literal('String'),
        'type': AST.value('"ValidationError"', 'string')
    })),
    AST.assignment('error/option', AST.functionType({
        args: [
            AST.literal('String'),
            AST.literal('T')
        ],
        result: AST.generic(
            AST.literal('OptionError'),
            [ AST.literal('T') ]
        )
    })),
    AST.assignment('error/typed', AST.functionType({
        args: [
            AST.object({
                'message': AST.literal('String'),
                'type': AST.literal('String')
            }, 'args')
        ],
        result: AST.functionType({
            args: [ AST.literal('Object', 'opts') ],
            result: AST.generic(
                AST.literal('TypedError'),
                [ AST.literal('String') ]
            )
        })
    })),
    AST.assignment('error/validation', AST.functionType({
        args: [
            AST.generic(
                AST.literal('Array'),
                [ AST.literal('Error') ]
            )
        ],
        result: AST.literal('ValidationError')
    }))
]);

test('the error type definition', function t(assert) {
    var result = parse(content);

    // showDiff(result, ASTFixture)
    assert.deepEqual(result, ASTFixture);

    assert.end();
});

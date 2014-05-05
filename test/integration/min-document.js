var test = require('tape');
var fs = require('fs')
var path = require('path')

// var showDiff = require('../lib/show-diff.js')

var parse = require('../../parser.js');
var AST = require('../../ast.js')

var uri = path.join(__dirname, 'min-document.mli')
var content = fs.readFileSync(uri, 'utf8')

var ASTFixture = AST.program([
    AST.typeDeclaration('DOMText', AST.object({
        'data': AST.literal('String'),
        'type':
            AST.value('DOMTextNode', 'string'),
        'length': AST.literal('Number'),
        'nodeType': AST.value('3', 'number'),
        'toString': AST.functionType(
            AST.literal('String'),
            AST.literal('DOMText', 'this')
        ),
        'replaceChild': AST.functionType(
            [
                AST.literal('Number', 'index'),
                AST.literal('Number', 'length'),
                AST.literal('String', 'value')
            ],
            AST.literal('void'),
            AST.literal('DOMText', 'this')
        )
    })),
    AST.typeDeclaration('DOMNode', AST.union([
        AST.literal('DOMText'),
        AST.literal('DOMElement'),
        AST.literal('DocumentFragment')
    ])),
    AST.typeDeclaration('DOMChild', AST.union([
        AST.literal('DOMText'),
        AST.literal('DOMElement')
    ]))
])

// {
//     type: 'typeDeclaration',
//     identifier: 'DOMElement',
//     typeExpression: {
//         type: 'object',
//         keyValues: [{
//             type: 'keyValue', key: 'tagName'
//         }, {
//             type: 'keyValue', key: 'className'
//         }, {
//             type: 'keyValue', key: 'dataset'
//         }, {
//             type: 'keyValue', key: 'childNodes'
//         }, {
//             type: 'keyValue', key: 'parentNode'
//         }, {
//             type: 'keyValue', key: ''
//         }]
//     }
// }

test('the min-document type definition', function (assert) {
    var result = parse(content)


    // showDiff(result, ASTFixture)
    assert.deepEqual(result, ASTFixture)


    assert.end()
})


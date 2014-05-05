var test = require('tape');

var parse = require('../../parser.js');

var content = 'type DOMText := {\n' +
    '    data: String,\n' +
    '    type: "DOMTextNode",\n' +
    '    length: Number,\n' +
    '    nodeType: 3,\n' +
    '\n' +
    '    toString: (this: DOMText) => String,\n' +
    '    replaceChild: (\n' +
    '        this: DOMText,\n' +
    '        index: Number,\n' +
    '        length: Number,\n' +
    '        value: String\n' +
    '    ) => void\n' +
    '}'

var ASTFixture = {
    type: 'program',
    statements: [{
        type: 'typeDeclaration',
        identifier: 'DOMText',
        typeExpression: {
            type: 'object',
            keyValues: [{
                type: 'keyValue', key: 'data',
                value: {
                    type: 'typeLiteral',
                    label: null,
                    name: 'String',
                    builtin: true
                }
            }, {
                type: 'keyValue', key: 'type',
                value: {
                    type: 'valueLiteral',
                    name: 'string',
                    label: null,
                    value: 'DOMTextNode'
                }
            }, {
                type: 'keyValue', key: 'length',
                value: {
                    type: 'typeLiteral',
                    label: null,
                    name: 'Number',
                    builtin: true
                }
            }, {
                type: 'keyValue', key: 'nodeType',
                value: {
                    type: 'valueLiteral',
                    name: 'number',
                    label: null,
                    value: '3'
                }
            }, {
                type: 'keyValue', key: 'toString',
                value: {
                    type: 'function',
                    thisArg: {
                        label: 'this',
                        type: 'typeLiteral',
                        builtin: false,
                        name: 'DOMText'
                    },
                    args: [],
                    result: {
                        label: null,
                        type: 'typeLiteral',
                        builtin: true,
                        name: 'String'
                    }
                }
            }, {
                type: 'keyValue', key: 'replaceChild',
                value: {
                    type: 'function',
                    thisArg: {
                        label: 'this',
                        type: 'typeLiteral',
                        builtin: false,
                        name: 'DOMText'
                    },
                    args: [{
                        label: 'index',
                        type: 'typeLiteral',
                        builtin: true,
                        name: 'Number'
                    }, {
                        label: 'length',
                        type: 'typeLiteral',
                        builtin: true,
                        name: 'Number'
                    }, {
                        label: 'value',
                        type: 'typeLiteral',
                        builtin: true,
                        name: 'String'
                    }],
                    result: {
                        label: null,
                        type: 'typeLiteral',
                        builtin: true,
                        name: 'void'
                    }
                }
            }]
        }
    }]
}

test('the min-document type definition', function (assert) {
    var result = parse(content)

    assert.deepEqual(result, ASTFixture)

    assert.end()
})


var test = require('tape');

var parse = require('../parser.js');

test('foo := (String, Number) => Object', function (assert) {
    var content = 'foo := (String, Number) => Object';
    var result = parse(content).statements[0];

    assert.equal(result.type, 'assignment');
    assert.equal(result.identifier, 'foo');
    assert.deepEqual(result.typeExpression, {
        type: 'function',
        thisArg: null,
        args: [{
            type: 'typeLiteral',
            builtin: true,
            label: null,
            name: 'String'
        }, {
            type: 'typeLiteral',
            builtin: true,
            label: null,
            name:'Number'
        }],
        result: {
            type: 'typeLiteral',
            builtin: true,
            label: null,
            name: 'Object'
        },
        label: null
    });

    assert.end();
});

test('foo := () => CustomType', function (assert) {
    var content = 'foo := () => CustomType';
    var result = parse(content).statements[0];

    assert.deepEqual(result, {
        type: 'assignment',
        identifier: 'foo',
        typeExpression: {
            type: 'function',
            args: [],
            thisArg: null,
            result: {
                type: 'typeLiteral',
                label: null,
                builtin: false,
                name: 'CustomType'
            },
            label: null
        }
    });

    assert.end();
});

test('foo := (tagName: String) => void', function (assert) {
    var content = 'foo := (tagName: String) => void';
    var result = parse(content).statements[0];

    assert.deepEqual(result, {
        type: 'assignment',
        identifier: 'foo',
        typeExpression: {
            type: 'function',
            args: [{
                type: 'typeLiteral',
                label: 'tagName',
                builtin: true,
                name: 'String'
            }],
            thisArg: null,
            result: {
                type: 'typeLiteral',
                builtin: true,
                label: null,
                name: 'void'
            },
            label: null
        }
    });

    assert.end();
});

test('foo := (this: DOMText, index: Number) => void', function (assert) {
    var content = 'foo := (this: DOMText, index: Number) => void'
    var result = parse(content).statements[0]

    assert.deepEqual(result, {
        type: 'assignment',
        identifier: 'foo',
        typeExpression: {
            type: 'function',
            args: [{
                type: 'typeLiteral',
                label: 'index',
                builtin: true,
                name: 'Number'
            }],
            thisArg: {
                type: 'typeLiteral',
                label: 'this',
                builtin: false,
                name: 'DOMText'
            },
            result: {
                type: 'typeLiteral',
                builtin: true,
                label: null,
                name: 'void'
            },
            label: null
        }
    })

    assert.end();
})

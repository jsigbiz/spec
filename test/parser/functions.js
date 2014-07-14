'use strict';

var test = require('tape');

var parse = require('../../parser.js');

test('foo : (String, Number) => Object', function t(assert) {
    var content = 'foo : (String, Number) => Object';
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
            optional: false,
            name: 'String'
        }, {
            type: 'typeLiteral',
            builtin: true,
            label: null,
            optional: false,
            name:'Number'
        }],
        result: {
            type: 'typeLiteral',
            builtin: true,
            label: null,
            name: 'Object',
            optional: false
        },
        label: null,
        optional: false
    });

    assert.end();
});

test('foo : () => CustomType', function t(assert) {
    var content = 'foo : () => CustomType';
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
                optional: false,
                builtin: false,
                name: 'CustomType'
            },
            label: null,
            optional: false
        }
    });

    assert.end();
});

test('foo : (tagName: String) => void', function t(assert) {
    var content = 'foo : (tagName: String) => void';
    var result = parse(content).statements[0];

    assert.deepEqual(result, {
        type: 'assignment',
        identifier: 'foo',
        typeExpression: {
            type: 'function',
            args: [{
                type: 'typeLiteral',
                label: 'tagName',
                optional: false,
                builtin: true,
                name: 'String'
            }],
            thisArg: null,
            result: {
                type: 'typeLiteral',
                builtin: true,
                label: null,
                optional: false,
                name: 'void'
            },
            label: null,
            optional: false
        }
    });

    assert.end();
});

test('foo : (this: DOMText, index: Number) => void', function t(assert) {
    var content = 'foo : (this: DOMText, index: Number) => void';
    var result = parse(content).statements[0];

    assert.deepEqual(result, {
        type: 'assignment',
        identifier: 'foo',
        typeExpression: {
            type: 'function',
            args: [{
                type: 'typeLiteral',
                label: 'index',
                optional: false,
                builtin: true,
                name: 'Number'
            }],
            thisArg: {
                type: 'typeLiteral',
                label: 'this',
                optional: false,
                builtin: false,
                name: 'DOMText'
            },
            result: {
                type: 'typeLiteral',
                builtin: true,
                label: null,
                optional: false,
                name: 'void'
            },
            label: null,
            optional: false
        }
    });

    assert.end();
});

test('foo : (id: String, parent?: Bar) => Baz', function t(assert) {
    var content = 'foo : (id: String, parent?: Bar) => Baz';
    var result = parse(content).statements[0];

    assert.deepEqual(result, {
        type: 'assignment',
        identifier: 'foo',
        typeExpression: {
            type: 'function',
            args: [{
                type: 'typeLiteral',
                label: 'id',
                builtin: true,
                optional: false,
                name: 'String'
            }, {
                type: 'typeLiteral',
                label: 'parent',
                builtin: false,
                optional: true,
                name: 'Bar'
            }],
            thisArg: null,
            result: {
                type: 'typeLiteral',
                builtin: false,
                optional: false,
                label: null,
                name: 'Baz'
            },
            optional: false,
            label: null
        }
    });

    assert.end();
});

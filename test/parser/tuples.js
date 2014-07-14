'use strict';

var test = require('tape');

var parse = require('../../parser.js');

test('foo : [Number, Number]', function t(assert) {
    var content = 'foo : [Number, Number]';
    var result = parse(content).statements[0];

    assert.equal(result.type, 'assignment');
    assert.equal(result.identifier, 'foo');
    assert.deepEqual(result.typeExpression, {
        type: 'tuple',
        values: [{
            type: 'typeLiteral',
            builtin: true,
            label: null,
            optional: false,
            name: 'Number'
        }, {
            type: 'typeLiteral',
            builtin: true,
            label: null,
            optional: false,
            name: 'Number'
        }],
        label: null,
        optional: false
    });

    assert.end();
});

test('bar : [String, Object, Array]', function t(assert) {
    var content = 'bar : [String, Object, Array]';
    var result = parse(content).statements[0];

    assert.equal(result.type, 'assignment');
    assert.equal(result.identifier, 'bar');
    assert.deepEqual(result.typeExpression, {
        type: 'tuple',
        values: [{
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
            name: 'Object'
        }, {
            type: 'typeLiteral',
            builtin: true,
            label: null,
            optional: false,
            name: 'Array'
        }],
        label: null,
        optional: false
    });

    assert.end();
});

var test = require('tape');

var parse = require('../parser.js');

test('foo := String', function (assert) {
    var content = 'foo := String';
    var result = parse(content).statements[0];

    assert.equal(result.type, 'assignment');
    assert.equal(result.identifier, 'foo');
    assert.deepEqual(result.typeExpression, {
        type: 'typeLiteral',
        builtin: true,
        label: null,
        name: 'String'
    });

    assert.end();
});

test('foo-bar := Number', function (assert) {
    var content = 'foo-bar := Number';
    var result = parse(content).statements[0];

    assert.equal(result.type, 'assignment');
    assert.equal(result.identifier, 'foo-bar');
    assert.deepEqual(result.typeExpression, {
        type: 'typeLiteral',
        builtin: true,
        label: null,
        name: 'Number'
    });

    assert.end();
});

test('foo := () => Number', function (assert) {
    var content = 'foo := () => Number';
    var result = parse(content).statements[0];

    assert.equal(result.type, 'assignment');
    assert.equal(result.identifier, 'foo');
    assert.deepEqual(result.typeExpression, {
        type: 'function',
        args: [],
        result: {
            type: 'typeLiteral',
            builtin: true,
            label: null,
            name: 'Number'
        }
    });

    assert.end();
});

test('two statements', function (assert) {
    var content = 'foo := () => Number\n' +
        'bar := String';
    var result = parse(content);

    assert.equal(result.type, 'program');
    assert.equal(result.statements.length, 2);

    assert.deepEqual(result.statements[0], {
        type: 'assignment',
        identifier: 'foo',
        typeExpression: {
            type: 'function',
            args: [],
            result: {
                type: 'typeLiteral',
                label: null,
                builtin: true,
                name: 'Number'
            }
        }
    });
    assert.deepEqual(result.statements[1], {
        type: 'assignment',
        identifier: 'bar',
        typeExpression: {
            type: 'typeLiteral',
            label: null,
            builtin: true,
            name: 'String'
        }
    });

    assert.end();
});

test('foo := (String, Number) => Object', function (assert) {
    var content = 'foo := (String, Number) => Object';
    var result = parse(content).statements[0];

    assert.equal(result.type, 'assignment');
    assert.equal(result.identifier, 'foo');
    assert.deepEqual(result.typeExpression, {
        type: 'function',
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
        }
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
            result: {
                type: 'typeLiteral',
                label: null,
                builtin: false,
                name: 'CustomType'
            }
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
            result: {
                type: 'typeLiteral',
                builtin: true,
                label: null,
                name: 'void'
            }
        } 
    });

    assert.end();
});

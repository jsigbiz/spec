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

test('foo := null', function (assert) {
    var content = 'foo := null';
    var result = parse(content).statements[0]

    assert.equal(result.type, 'assignment')
    assert.equal(result.identifier, 'foo')
    assert.deepEqual(result.typeExpression, {
        type: 'valueLiteral',
        name: 'null',
        value: 'null',
        label: null
    })

    assert.end()
})

test('foo := Any', function (assert) {
    var content = 'foo := Any'
    var result = parse(content).statements[0]

    assert.equal(result.type, 'assignment')
    assert.equal(result.identifier, 'foo')
    assert.deepEqual(result.typeExpression, {
        type: 'typeLiteral',
        name: 'Any',
        label: null,
        builtin: true
    })

    assert.end()
})

test('foo := Array', function (assert) {
    var content = 'foo := Array'
    var result = parse(content).statements[0]

    assert.equal(result.type, 'assignment')
    assert.equal(result.identifier, 'foo')
    assert.deepEqual(result.typeExpression, {
        type: 'typeLiteral',
        name: 'Array',
        label: null,
        builtin: true
    })

    assert.end()
})

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
        thisArg: null,
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
            thisArg: null,
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

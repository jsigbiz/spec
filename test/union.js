var test = require('tape');

var parse = require('../parser.js');

test('type Foo := Bar | Baz', function (assert) {
    var content = 'type Foo := Bar | Baz'
    var result = parse(content).statements[0]

    assert.equal(result.type, 'typeDeclaration')
    assert.equal(result.identifier, 'Foo')
    assert.deepEqual(result.typeExpression, {
        type: 'unionType',
        unions: [{
            type: 'typeLiteral',
            label: null,
            name: 'Bar',
            builtin: false
        }, {
            type: 'typeLiteral',
            label: null,
            name: 'Baz',
            builtin: false
        }],
        label: null
    })

    assert.end();
})

test('type Foo := (arg: Number | String) => void', function (assert) {
    var content = 'type Foo := (arg: Number | String) => void'
    var result = parse(content).statements[0]

    assert.equal(result.type, 'typeDeclaration')
    assert.equal(result.identifier, 'Foo')
    assert.deepEqual(result.typeExpression, {
        type: 'function',
        args: [{
            type: 'unionType',
            unions: [{
                type: 'typeLiteral',
                name: 'Number',
                builtin: true,
                label: null
            }, {
                type: 'typeLiteral',
                name: 'String',
                builtin: true,
                label: null
            }],
            label: 'arg'
        }],
        result: {
            type: 'typeLiteral',
            name: 'void',
            builtin: true,
            label: null
        },
        thisArg: null,
        label: null
    })

    assert.end()
})

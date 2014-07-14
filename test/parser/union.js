var test = require('tape');

var parse = require('../../parser.js');

test('type Foo : Bar || Baz', function (assert) {
    var content = 'type Foo : Bar || Baz'
    var result = parse(content).statements[0]

    assert.equal(result.type, 'typeDeclaration')
    assert.equal(result.identifier, 'Foo')
    assert.deepEqual(result.typeExpression, {
        type: 'unionType',
        unions: [{
            type: 'typeLiteral',
            label: null,
            optional: false,
            name: 'Bar',
            builtin: false
        }, {
            type: 'typeLiteral',
            label: null,
            optional: false,
            name: 'Baz',
            builtin: false
        }],
        label: null,
        optional: false
    })

    assert.end();
})

test('type A : ObjectE || C || D', function (assert) {
    var content = '\ntype A :\n     ObjectE || C || D'
    var result = parse(content).statements[0]

    assert.equal(result.type, 'typeDeclaration')
    assert.equal(result.identifier, 'A')
    assert.deepEqual(result.typeExpression, {
        type: 'unionType',
        unions: [{
            type: 'typeLiteral',
            label: null,
            optional: false,
            name: 'ObjectE',
            builtin: false
        }, {
            type: 'typeLiteral',
            label: null,
            optional: false,
            name: 'C',
            builtin: false
        }, {
            type: 'typeLiteral',
            label: null,
            optional: false,
            name: 'D',
            builtin: false
        }],
        label: null,
        optional: false
    })

    assert.end()
})

test('type Foo : (arg: Number || String) => void', function (assert) {
    var content = 'type Foo : (arg: Number || String) => void'
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
                label: null,
                optional: false
            }, {
                type: 'typeLiteral',
                name: 'String',
                builtin: true,
                label: null,
                optional: false
            }],
            label: 'arg',
            optional: false
        }],
        result: {
            type: 'typeLiteral',
            name: 'void',
            builtin: true,
            label: null,
            optional: false
        },
        thisArg: null,
        label: null,
        optional: false
    })

    assert.end()
})

var test = require('tape');

var parse = require('../../parser.js');

test('foo : { text: String }', function (assert) {
    var content = 'foo : { text: String }';
    var result = parse(content).statements[0]

    assert.equal(result.type, 'assignment')
    assert.equal(result.identifier, 'foo')
    assert.deepEqual(result.typeExpression, {
        type: 'object',
        keyValues: [{
            type: 'keyValue',
            key: 'text',
            value: {
                type: 'typeLiteral',
                builtin: true,
                label: null,
                optional: false,
                name: 'String'
            },
            optional: false
        }],
        label: null,
        optional: false
    })

    assert.end();
});

test('foo : { text: String, type: "DOMTextNode" }', function (assert) {
    var content = 'foo : {\n' +
        '    text: String,\n' +
        '    type: "DOMTextNode"\n' +
        '}'
    var result = parse(content).statements[0]

    assert.equal(result.type, 'assignment')
    assert.equal(result.identifier, 'foo')
    assert.deepEqual(result.typeExpression, {
        type: 'object',
        keyValues: [{
            type: 'keyValue',
            key: 'text',
            value: {
                type: 'typeLiteral',
                builtin: true,
                label: null,
                optional: false,
                name: 'String'
            },
            optional: false
        }, {
            type: 'keyValue',
            key: 'type',
            value: {
                type: 'valueLiteral',
                name: 'string',
                value: '"DOMTextNode"',
                label: null,
                optional: false
            },
            optional: false
        }],
        label: null,
        optional: false
    })

    assert.end();
});

test('foo : { nested: { nodeType: 3 } }', function (assert) {
    var content = 'foo : {\n' +
        '    nested: {\n' +
        '        nodeType: 3\n' +
        '    }\n' +
        '}'
    var result = parse(content).statements[0]

    assert.equal(result.type, 'assignment')
    assert.equal(result.identifier, 'foo')
    assert.deepEqual(result.typeExpression, {
        type: 'object',
        keyValues: [{
            type: 'keyValue',
            key: 'nested',
            value: {
                type: 'object',
                keyValues: [{
                    type: 'keyValue',
                    key: 'nodeType',
                    value: {
                        type: 'valueLiteral',
                        name: 'number',
                        value: '3',
                        label: null,
                        optional: false
                    },
                    optional: false
                }],
                label: null,
                optional: false
            },
            optional: false
        }],
        label: null,
        optional: false
    })

    assert.end();
})

test('foo : { bar?: Baz }', function (assert) {
    var content = 'foo : { bar?: Baz }'
    var result = parse(content).statements[0]

    assert.equal(result.type, 'assignment')
    assert.equal(result.identifier, 'foo')
    assert.deepEqual(result.typeExpression, {
        type: 'object',
        keyValues: [{
            type: 'keyValue',
            key: 'bar?',
            value: {
                type: 'typeLiteral',
                builtin: false,
                optional: false,
                label: null,
                name: 'Baz'
            },
            optional: true
        }],
        label: null,
        optional: false
    })

    assert.end()
})

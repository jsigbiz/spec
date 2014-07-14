'use strict';

var test = require('tape');

var parse = require('../../parser.js');

test('import { Foo } from "bar"', function t(assert) {
    var content = 'import { Foo } from "bar"';
    var result = parse(content).statements[0];

    assert.equal(result.type, 'import');
    assert.equal(result.dependency, 'bar');
    assert.deepEqual(result.types, [{
        type: 'typeLiteral',
        name: 'Foo',
        builtin: false,
        optional: false,
        label: null
    }]);

    assert.end();
});

test('import { Foo, Bar } from "bar"', function t(assert) {
    var content = 'import { Foo, Bar } from "bar"';
    var result = parse(content).statements[0];

    assert.equal(result.type, 'import');
    assert.equal(result.dependency, 'bar');
    assert.deepEqual(result.types, [{
        type: 'typeLiteral',
        name: 'Foo',
        builtin: false,
        optional: false,
        label: null
    }, {
        type: 'typeLiteral',
        name: 'Bar',
        builtin: false,
        optional: false,
        label: null
    }]);

    assert.end();
});

test('import { Foo as Bar } from "bar"', function t(assert) {
    var content = 'import { Foo as Bar } from "bar"';
    var result = parse(content).statements[0];

    assert.equal(result.type, 'import');
    assert.equal(result.dependency, 'bar');
    assert.deepEqual(result.types, [{
        type: 'renamedLiteral',
        name: 'Bar',
        builtin: false,
        optional: false,
        original: {
            type: 'typeLiteral',
            name: 'Foo',
            builtin: false,
            optional: false,
            label: null
        },
        label: null
    }]);

    assert.end();
});

'use strict';

var test = require('tape');

var parse = require('../../parser.js');

test('import { Foo } from "bar"', function t(assert) {
    var content = 'import { Foo } from "bar"';
    var result = parse(content).statements[0];

    assert.equal(result.type, 'import'),
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

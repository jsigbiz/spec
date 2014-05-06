var test = require('tape');
var fs = require('fs')
var path = require('path')

// var showDiff = require('../lib/show-diff.js')

var parse = require('../../parser.js');
var AST = require('../../ast.js')

var uri = path.join(__dirname, 'definitions', 'frp-keyboard.mli')
var content = fs.readFileSync(uri, 'utf8')

var ASTFixture = AST.program([

])

test('the frp-keyboard type definition', function (assert) {
    var result = parse(content)

    // showDiff(result, ASTFixture)
    assert.deepEqual(result, ASTFixture)

    assert.end()
})


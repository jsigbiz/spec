/* verify takes an AST node, a meta and a callback
    it will then verify that the AST node is type sound.

    It may return a Jsig AST node in the callback for type
    inference

*/
// break circular references
module.exports = verify

var verifiers = {
    'Program': require('./esprima-verifiers/program.js'),
    'VariableDeclaration':
        require('./esprima-verifiers/variable-declaration.js'),
    'VariableDeclarator':
        require('./esprima-verifiers/variable-declarator.js'),
    'CallExpression':
        require('./esprima-verifiers/call-expression.js'),
    'FunctionDeclaration':
        require('./esprima-verifiers/function-declaration.js'),
    'BlockStatement':
        require('./esprima-verifiers/block-statement.js'),
    'ReturnStatement':
        require('./esprima-verifiers/return-statement.js'),
    'BinaryExpression':
        require('./esprima-verifiers/binary-expression.js'),
    'ExpressionStatement':
        require('./esprima-verifiers/expression-statement.js'),
    'Literal':
        require('./esprima-verifiers/literal.js')
}

function verify(node, meta, callback) {
    if (verifiers[node.type]) {
        verifiers[node.type](node, meta, callback)
    } else {
        console.warn('skipping verify', node.type)
        callback(null)
    }
}

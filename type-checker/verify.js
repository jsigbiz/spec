/* verify takes an AST node, a meta and a callback
    it will then verify that the AST node is type sound.

    It may return a Jsig AST node in the callback for type
    inference

*/
// break circular references
module.exports = verify

var verifiers = {
    'Program': require('./verifiers/program.js'),
    'VariableDeclaration':
        require('./verifiers/variable-declaration.js'),
    'VariableDeclarator':
        require('./verifiers/variable-declarator.js'),
    'CallExpression':
        require('./verifiers/call-expression.js'),
    'FunctionDeclaration':
        require('./verifiers/function-declaration.js'),
    'BlockStatement':
        require('./verifiers/block-statement.js'),
    'ReturnStatement':
        require('./verifiers/return-statement.js')
}

function verify(node, meta, callback) {
    if (verifiers[node.type]) {
        verifiers[node.type](node, meta, callback)
    } else {
        console.warn('skipping verify', node.type)
        callback(null)
    }
}

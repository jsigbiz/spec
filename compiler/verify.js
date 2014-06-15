// break circular references
module.exports = verify

var verifyProgram = require('./verifiers/program.js')
var verifyVariableDeclaration =
    require('./verifiers/variable-declaration')
var verifyVariableDeclarator =
    require('./verifiers/variable-declarator')

function verify(node, meta, callback) {
    if (node.type === 'Program') {
        verifyProgram(node, meta, callback)
    } else if (node.type === 'VariableDeclaration') {
        verifyVariableDeclaration(node, meta, callback)
    } else if (node.type === 'VariableDeclarator') {
        verifyVariableDeclarator(node, meta, callback)
    } else {
        console.warn('skipping verify', node.type)
        callback(null)
    }
}

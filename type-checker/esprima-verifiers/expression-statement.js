var verify = require('../verify-esprima-ast.js')

module.exports = expressionStatement

function expressionStatement(node, meta, callback) {
    verify(node.expression, meta, callback)
}
